// What is still missing for one country, as a work list for expanding it (.claude/skills/expand-country).
//
//   node scripts/country-gaps.cjs ke          Kenya
//   node scripts/country-gaps.cjs us/ca       a state or province file
//
// Reads the files directly; run from the project root. Lists the profile's missing or thin context
// sections and statuses, penalty tables, texts without inline citations, sources that are only
// Wikipedia, the history by decade with its gaps, entries without a check or an article, and the
// atlas entries that belong to the country.
const fs = require("fs"), path = require("path"), y = require("js-yaml");

const id = process.argv[2];
if (!id) { console.error("usage: node scripts/country-gaps.cjs <country file name, e.g. ke or us/ca>"); process.exit(1); }
const file = fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`;
if (!fs.existsSync(file)) { console.error(`no profile at countries/${id}.yaml or countries/${id}/index.yaml`); process.exit(1); }
const p = y.load(fs.readFileSync(file, "utf8"));
const slug = id.split("/")[0];
const ctx = p.context ?? {};
const out = (s = "") => console.log(s);
const list = (label, items) => out(`  ${label}: ${items.length ? items.join(", ") : "none"}`);

out(`${p.name} (${file}), reviewed ${String(p.updated ?? "?").slice(0, 10)}, recreational ${p.recreational}, medical ${p.medical}`);
out();

// ── the profile ──
out("PROFILE");
// a state or province file holds its scores and segment texts only; the context is the country's
const unit = id.includes("/") && !file.endsWith("index.yaml");
if (unit) out(`  a state or province file: context sections live in countries/${slug}/index.yaml`);
const REQUIRED = ["recreational", "medical", "hemp", "production", "consequences"];
const RESEARCHED = ["clubs", "planting", "visitors", "driving", "black_market", "arrests"];
const OPTIONAL = ["culture", "research", "spotlights", "genetics"];
if (!unit) list("missing standard sections", REQUIRED.filter((k) => !ctx[k]));
if (!unit) list("missing researched sections", RESEARCHED.filter((k) => !ctx[k]));
if (!unit) list("optional sections not written", OPTIONAL.filter((k) => !ctx[k]));
if (p.recreational === "death" && !ctx.death_penalty) out("  ! recreational is \"death\" but there is no death_penalty section");
if (!unit && ctx.products) out("  products still present: fold it into recreational, medical and hemp, then delete it");
list("statuses not set", ["hemp", "production", "research"].filter((k) => ctx[k] && !ctx[k].status).map((k) => `${k}.status`));
if (!unit) list("penalty tables missing", ["possession", "cultivation"].filter((k) => p.segments?.[k] && !p.segments[k].penalties));
const blocks = [...Object.entries(p.segments ?? {}).map(([k, b]) => [`segments.${k}`, b]),
  ...Object.entries(ctx).flatMap(([k, b]) => (Array.isArray(b) ? b.map((x, i) => [`context.${k}[${i}]`, x]) : [[`context.${k}`, b]]))];
list("texts without inline citations", blocks.filter(([, b]) => b?.text && !/\[@/.test(b.text)).map(([k]) => k));
list("texts with no source at all", blocks.filter(([, b]) => b?.text && !(b.sources ?? []).length).map(([k]) => k));
const wiki = (key) => /wikipedia/i.test(p.sources?.[key]?.title ?? "") || /wikipedia\.org/.test(p.sources?.[key]?.url ?? "");
list("texts resting only on Wikipedia", blocks.filter(([, b]) => (b?.sources ?? []).length && b.sources.every(wiki)).map(([k]) => k));
const linked = blocks.filter(([, b]) => /\]\(\//.test(b?.text ?? "")).length;
out(`  internal links in texts: ${linked} of ${blocks.length} texts link to history or culture`);
out();

// ── the history ──
out("HISTORY");
const changes = (y.load(fs.readFileSync("changes.yaml", "utf8")) ?? []).filter((e) => e.country === slug);
const articles = new Set(fs.readdirSync("articles").map((f) => f.replace(/\.md$/, "")));
const year = (e) => parseInt(String(e.date), 10);
const dated = changes.filter((e) => year(e)).sort((a, b) => year(a) - year(b));
out(`  ${changes.length} entries, ${changes.filter((e) => e.before !== undefined && e.before !== null).length} that move the score, ${changes.filter((e) => articles.has(e.id)).length} with an article`);
if (dated.length) {
  const first = year(dated[0]), last = year(dated.at(-1));
  out(`  from ${first} to ${last}`);
  const decades = {};
  for (const e of dated) decades[Math.floor(year(e) / 10) * 10] = (decades[Math.floor(year(e) / 10) * 10] ?? 0) + 1;
  const row = [];
  for (let d = Math.min(1900, Math.floor(first / 10) * 10); d <= 2020; d += 10) row.push(`${d}s ${decades[d] ?? "—"}`);
  out(`  by decade: ${row.join(" · ")}`);
  const empty = [];
  for (let d = Math.max(1920, Math.floor(first / 10) * 10); d <= 2020; d += 10) if (!decades[d]) empty.push(`${d}s`);
  list("decades with nothing (look for laws, cases, raids, reports)", empty);
  const thisYear = new Date().getFullYear();
  if (last < thisYear - 1) out(`  ! nothing since ${last}: check recent news and law changes`);
}
list("not checked against a source", changes.filter((e) => !e.checked && !e.estimate).map((e) => e.id));
list("estimates (no source yet)", changes.filter((e) => e.estimate).map((e) => e.id));
const noArticle = changes.filter((e) => !articles.has(e.id) && e.before !== undefined && e.before !== null).map((e) => e.id);
list("score-moving entries without an article", noArticle);
out("  more article candidates, ranked: node scripts/article-backlog.cjs --country " + slug);
out();

// ── culture ──
out("CULTURE");
const culture = [];
for (const section of ["language", "traditions", "people"]) {
  for (const f of fs.readdirSync(path.join("culture", section)).filter((x) => x.endsWith(".md"))) {
    const fm = y.load(fs.readFileSync(path.join("culture", section, f), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "") ?? {};
    if ((fm.countries ?? []).includes(slug)) culture.push(`${section}/${f.slice(0, -3)}`);
  }
}
list("atlas entries for this country", culture);
if (ctx.culture) list("atlas entries the culture section does not link", culture.filter((c) => !ctx.culture.text.includes(`/culture/${c}/`)));
else if (culture.length) out("  ! atlas entries exist but there is no culture section to connect them");
