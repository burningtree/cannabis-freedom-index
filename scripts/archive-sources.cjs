// Archived copies of the sources: node scripts/archive-sources.cjs [status|check|save] [limit] [--random]
// Run from the project root. Needs js-yaml (already in node_modules) and Node 18+ (fetch).
//
//   status  how many source addresses there are and how many have a recorded copy (no network)
//   check   ask the Internet Archive which sources it already holds, and record those copies
//   save    ask the Internet Archive to save the sources it does not hold yet, then record them
//
// `limit` caps how many addresses one run handles (default 50), so a run stays short and polite;
// run it again to continue. Results go to source-archive.json, which the site reads:
//   { "<url>": { "archived": "https://web.archive.org/web/<timestamp>/<url>", "checked": "YYYY-MM-DD" } }
// An address with no copy is recorded with "archived": null and is tried again after 30 days.
// `--random` takes the addresses of a run in random order instead of the order they appear in the
// data. `save` always starts from the same addresses otherwise, so the ones the Archive keeps
// refusing would fill every run.
// With IA_ACCESS_KEY and IA_SECRET_KEY in .env (keys from archive.org/account/s3.php), `save` uses the
// logged-in Save Page Now, which accepts far more captures, and skips the availability lookup.
const fs = require("fs"), path = require("path"), y = require("js-yaml");
try {
  process.loadEnvFile(".env");
} catch {}
const KEYS = process.env.IA_ACCESS_KEY && process.env.IA_SECRET_KEY ? `LOW ${process.env.IA_ACCESS_KEY}:${process.env.IA_SECRET_KEY}` : null;
const FILE = "source-archive.json";
const archive = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : {};
const args = process.argv.slice(2);
const random = args.includes("--random");
const [what = "status", count] = args.filter((a) => !a.startsWith("--"));
const limit = +count || 50;
const today = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Fisher–Yates
const shuffle = (xs) => {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
  return xs;
};

// every source address in the data: history entries, country profiles and articles
const urls = new Set();
for (const e of y.load(fs.readFileSync("changes.yaml", "utf8"))) for (const s of e.sources || []) if (s.url) urls.add(s.url);
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((f) => (f.isDirectory() ? walk(path.join(dir, f.name)) : [path.join(dir, f.name)]));
for (const f of walk("countries").filter((f) => f.endsWith(".yaml"))) {
  const d = y.load(fs.readFileSync(f, "utf8"));
  for (const s of Object.values(d.sources || {})) if (s.url) urls.add(s.url);
  for (const s of d.subunits?.sources || []) if (s.url) urls.add(s.url);
}
for (const f of fs.existsSync("articles") ? walk("articles").filter((f) => f.endsWith(".md")) : []) {
  const head = fs.readFileSync(f, "utf8").match(/^---\n([\s\S]*?)\n---/);
  for (const s of (head && y.load(head[1])?.sources) || []) if (s.url) urls.add(s.url);
}
const all = [...urls].filter((u) => /^https?:\/\//.test(u) && !u.includes("web.archive.org"));
const stale = (u) => !archive[u] || (!archive[u].archived && Date.now() - Date.parse(archive[u].checked) > 30 * 864e5);
const have = all.filter((u) => archive[u]?.archived).length;
console.log(`sources: ${all.length} addresses | with a recorded copy ${have} | without ${all.length - have}`);

// written to a temporary file first and then renamed, so a full disk or a crash cannot leave half a file
const write = () => {
  fs.writeFileSync(FILE + ".tmp", JSON.stringify(Object.fromEntries(Object.entries(archive).sort(([a], [b]) => a.localeCompare(b))), null, 1) + "\n");
  fs.renameSync(FILE + ".tmp", FILE);
};
// fetch, waiting and trying again while the Archive answers 429 (too many requests) or 5xx
// (or the connection drops); it waits as long as Retry-After asks, otherwise 30 s, 60 s, 120 s, 240 s
class Throttled extends Error {}
async function politeFetch(address, options) {
  for (let attempt = 0; ; attempt++) {
    // a dropped connection is tried again like a 5xx
    const r = await fetch(address, options).catch((e) => ({ status: e.cause?.code || e.message, headers: new Headers() }));
    if (typeof r.status === "number" && r.status !== 429 && r.status < 500) return r;
    if (attempt === 4) throw new (r.status === 429 ? Throttled : Error)(`${r.status} after ${attempt + 1} tries`);
    const wait = (+r.headers.get("retry-after") || 30 * 2 ** attempt) * 1000;
    console.log(`  ${r.status}, waiting ${wait / 1000} s`);
    await sleep(wait);
  }
}
// the newest copy the Internet Archive holds, or null
// (from the CDX index: the availability API answers 429 far sooner, logged in or not)
async function lookup(url) {
  const q = new URLSearchParams({ url, output: "json", filter: "statuscode:2..", limit: "-1", fl: "timestamp,original" });
  const r = await politeFetch(`https://web.archive.org/cdx/search/cdx?${q}`, KEYS ? { headers: { Authorization: KEYS } } : undefined);
  if (!r.ok) throw new Error(`cdx ${r.status}`);
  const text = await r.text();
  const [, row] = text.trim() ? JSON.parse(text) : [];
  return row ? `https://web.archive.org/web/${row[0]}/${row[1]}` : null;
}

// A refusal because the Archive captured the page recently ("The same snapshot had been made 130
// hours, 9 minutes ago") means a copy exists: take it from the index, or, while the index has not
// caught up, address it by the time the message gives (the Wayback Machine opens the nearest copy).
async function recentCopy(url, message) {
  const m = /same snapshot had been made (?:(\d+) hours?)?,? ?(?:(\d+) minutes?)? ago/i.exec(message || "");
  if (!m) return null;
  const found = await lookup(url).catch(() => null);
  if (found) return found;
  const at = new Date(Date.now() - ((+m[1] || 0) * 60 + (+m[2] || 0)) * 60000);
  return `https://web.archive.org/web/${at.toISOString().replace(/\D/g, "").slice(0, 14)}/${url}`;
}

// logged-in Save Page Now: start a capture, then follow it until it ends; the new copy or null
async function saveLoggedIn(url) {
  const headers = { Accept: "application/json", Authorization: KEYS };
  const r = await politeFetch("https://web.archive.org/save", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ url, if_not_archived_within: "30d" }),
  });
  const job = await r.json().catch(() => ({}));
  if (!job.job_id) {
    const recent = await recentCopy(url, job.message);
    console.log(`  save refused ${url}: ${job.message || r.status}${recent ? " (recorded the existing copy)" : ""}`);
    return recent;
  }
  for (let i = 0; i < 30; i++) {
    await sleep(5000);
    const st = await (await politeFetch(`https://web.archive.org/save/status/${job.job_id}`, { headers })).json();
    if (st.status === "pending") continue;
    console.log(`  save ${st.status} ${url}${st.message ? ": " + st.message : ""}`);
    if (st.status === "success" && st.timestamp) return `https://web.archive.org/web/${st.timestamp}/${st.original_url || url}`;
    return recentCopy(url, st.message);
  }
  console.log(`  save still pending after 150 s ${url}`);
  return null;
}

(async () => {
  if (what === "status") return;
  if (what === "save") console.log(KEYS ? "save: logged in" : "save: anonymous (no IA_ACCESS_KEY / IA_SECRET_KEY in .env)");
  if (!["check", "save"].includes(what)) return console.log("unknown command: use status, check or save");
  const pending = all.filter(what === "check" ? stale : (u) => !archive[u]?.archived);
  const todo = (random ? shuffle(pending) : pending).slice(0, limit);
  let found = 0, failed = 0;
  for (const url of todo) {
    try {
      // logged in, the save itself reports a copy the Archive already holds, so no lookup is needed
      let copy = what === "save" && KEYS ? await saveLoggedIn(url) : await lookup(url);
      if (!copy && what === "save" && !KEYS) {
        // Save Page Now: without an account the Archive accepts only a few requests a minute
        const r = await politeFetch(`https://web.archive.org/save/${url}`, { redirect: "follow" });
        console.log(`  save ${r.status} ${url}`);
        await sleep(15000);
        copy = await lookup(url);
      }
      archive[url] = { archived: copy, checked: today };
      if (copy) found++;
    } catch (e) {
      failed++;
      console.log(`  failed ${url}: ${e.message}`);
      // still throttled after the long waits: stop instead of failing every address that is left
      if (e instanceof Throttled) {
        console.log("  the Archive keeps refusing requests; stopping. Run again later.");
        break;
      }
    }
    write();
    await sleep(what === "check" ? 3000 : 1000);
  }
  console.log(`${what}: handled ${todo.length} | copies recorded ${found} | failed ${failed} | still to do ${all.filter(what === "check" ? stale : (u) => !archive[u]?.archived).length}`);
})();
