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
const fs = require("fs"), path = require("path"), y = require("js-yaml");
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
// the newest copy the Internet Archive holds, or null
async function lookup(url) {
  const r = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`);
  if (!r.ok) throw new Error(`availability ${r.status}`);
  const snap = (await r.json()).archived_snapshots?.closest;
  return snap?.available && String(snap.status).startsWith("2") ? snap.url.replace(/^http:/, "https:") : null;
}

(async () => {
  if (what === "status") return;
  if (!["check", "save"].includes(what)) return console.log("unknown command: use status, check or save");
  const pending = all.filter(what === "check" ? stale : (u) => !archive[u]?.archived);
  const todo = (random ? shuffle(pending) : pending).slice(0, limit);
  let found = 0, failed = 0;
  for (const url of todo) {
    try {
      let copy = await lookup(url);
      if (!copy && what === "save") {
        // Save Page Now: without an account the Archive accepts only a few requests a minute
        const r = await fetch(`https://web.archive.org/save/${url}`, { redirect: "follow" });
        console.log(`  save ${r.status} ${url}`);
        await sleep(15000);
        copy = await lookup(url);
      }
      archive[url] = { archived: copy, checked: today };
      if (copy) found++;
    } catch (e) {
      failed++;
      console.log(`  failed ${url}: ${e.message}`);
    }
    write();
    await sleep(what === "check" ? 1200 : 1000);
  }
  console.log(`${what}: handled ${todo.length} | copies recorded ${found} | failed ${failed} | still to do ${all.filter(what === "check" ? stale : (u) => !archive[u]?.archived).length}`);
})();
