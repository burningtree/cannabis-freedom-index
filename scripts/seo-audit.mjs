// A check of the built site (dist/) for what search engines and link previews read, run after the
// build in the deploy workflow:
//   - the sitemap lists every indexable page, and no page marked noindex or missing from the build
//   - each page has a title, a description and a canonical address that is its own
//   - every og:image a page advertises exists in the build as a PNG
//   - every JSON-LD block parses, and every URL in it on this site resolves
//   - internal links point at pages that exist
//   - sitemap dates are real dates no later than today
// It prints counts with a few examples, and exits with 1 when something is wrong.
//   npm run build && npm run seo:audit
//   node scripts/seo-audit.mjs dist --all      every example, not the first eight
import fs from "node:fs";
import path from "node:path";

const ALL = process.argv.includes("--all");
const DIST = path.resolve(process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "dist");
const SITE = (process.env.SITE ?? "https://cannabisfreedom.fyi").replace(/\/$/, "");
const BASE = ("/" + (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "") + "/").replace("//", "/");
const ORIGIN_BASE = SITE + BASE.replace(/\/$/, "");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const files = walk(DIST);
const exists = new Set(files.map((f) => "/" + path.relative(DIST, f).split(path.sep).join("/")));
// the address of a built page: dist/country/de/index.html → /country/de/
const urlOf = (file) => "/" + path.relative(DIST, file).split(path.sep).join("/").replace(/index\.html$/, "").replace(/\.html$/, "/");
// does an address on this site lead to a built file?
const resolves = (p) => {
  const clean = decodeURI(p.split(/[?#]/)[0]);
  if (!clean.startsWith(BASE)) return true; // another site on the same domain: not ours to check
  const rel = "/" + clean.slice(BASE.length);
  return exists.has(rel) || exists.has(rel.replace(/\/?$/, "/index.html")) || exists.has(rel + ".html");
};

const problems = {};
const report = (kind, example) => { (problems[kind] ??= []).push(example); };
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`))?.slice(1).find((x) => x != null);
const meta = (html, key, value) => { for (const m of html.matchAll(/<meta\b[^>]*>/g)) if (attr(m[0], key) === value) return attr(m[0], "content"); return null; };
const unescape = (s) => s?.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// ── the sitemap ──
const sitemap = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const entries = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => [m[1].replace(SITE, ""), m[2] ?? null]);
const listed = new Map(entries);
for (const [loc] of entries.filter(([loc], i) => entries.findIndex(([x]) => x === loc) !== i)) report("sitemap lists a page twice", loc);
// a commit's date is its author's local day, which can be a day ahead of UTC
const today = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
for (const [loc, mod] of listed) {
  if (!resolves(loc)) report("sitemap lists a page that was not built", loc);
  if (mod && (!/^\d{4}-\d{2}-\d{2}$/.test(mod) || mod > today)) report("sitemap date that is not a past date", `${loc} ${mod}`);
}
if (/<priority>/.test(sitemap)) report("sitemap carries <priority>, which search engines ignore", "sitemap.xml");

// ── every page ──
const pages = files.filter((f) => f.endsWith(".html"));
const indexable = new Set();
const descriptions = new Map();
let checkedLinks = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) continue; // a fragment loaded into another page
  const url = BASE.replace(/\/$/, "") + urlOf(file);
  const robots = meta(html, "name", "robots") ?? "";
  const noindex = /noindex/.test(robots);
  if (/<meta http-equiv="refresh"/i.test(html)) continue; // a redirect
  if (!noindex) indexable.add(url);
  if (noindex && listed.has(url)) report("sitemap lists a noindex page", url);
  if (!noindex && !listed.has(url)) report("indexable page missing from the sitemap", url);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) report("page without a title", url);
  if (noindex) continue; // a page kept out of search needs a title, not the rest
  const description = unescape(meta(html, "name", "description"));
  if (!description) report("page without a description", url);
  else (descriptions.get(description) ?? descriptions.set(description, []).get(description)).push(url);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) report("page without a canonical address", url);
  else if (canonical.replace(SITE, "").replace(/^https?:\/\/[^/]+/, "") !== url) report("canonical address that is not the page's own", `${url} → ${canonical}`);

  const og = meta(html, "property", "og:image");
  if (!og) report("page without og:image", url);
  else {
    const p = og.replace(/^https?:\/\/[^/]+/, "");
    const rel = "/" + decodeURI(p).slice(BASE.length);
    if (!exists.has(rel)) report("og:image that was not built", `${url} → ${p}`);
    else if (rel.endsWith(".png")) {
      const head = Buffer.alloc(8);
      const fd = fs.openSync(path.join(DIST, rel), "r"); fs.readSync(fd, head, 0, 8, 0); fs.closeSync(fd);
      if (head.toString("hex") !== "89504e470d0a1a0a") report("og:image that is not a PNG", `${url} → ${p}`);
    }
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { report("JSON-LD that does not parse", url); continue; }
    for (const u of JSON.stringify(data).match(/https?:\/\/[^"\s]+/g) ?? []) {
      if (u.startsWith(ORIGIN_BASE) && !resolves(u.replace(/^https?:\/\/[^/]+/, ""))) report("JSON-LD link to a page that was not built", `${url} → ${u}`);
    }
  }

  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = unescape(m[1]);
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/.test(href) || !href.startsWith("/")) continue;
    checkedLinks++;
    if (!resolves(href)) report("internal link to a page that was not built", `${url} → ${href}`);
  }
}
for (const [description, urls] of descriptions) if (urls.length > 3) report("description shared by more than three pages", `${urls.length}× ${urls[0]} … "${description.slice(0, 60)}"`);

// ── the report ──
const kinds = Object.keys(problems);
console.log(`${pages.length} HTML files, ${indexable.size} indexable pages, ${listed.size} sitemap entries, ${checkedLinks} internal links checked`);
for (const kind of kinds) {
  const list = [...new Set(problems[kind])];
  console.log(`\n✗ ${kind}: ${list.length}`);
  const shown = ALL ? list : list.slice(0, 8);
  for (const x of shown) console.log(`    ${x}`);
  if (list.length > shown.length) console.log(`    … and ${list.length - shown.length} more`);
}
if (!kinds.length) console.log("✓ no problems found");
process.exit(kinds.length ? 1 : 0);
