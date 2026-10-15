// Which history entries most deserve an article next.
//
//   node scripts/article-backlog.cjs            top 50 entries without an article
//   node scripts/article-backlog.cjs 100        top 100
//   node scripts/article-backlog.cjs --all      include entries that already have one
//   node scripts/article-backlog.cjs --country mt
//
// Each entry gets points from what the data already says (below), summed to 0–100 and shown as
// importance 1–10. An `importance: 1–10` set by hand in changes.yaml replaces the computed value,
// for the cases the formula gets wrong (a context entry that set off a reform, say).
//
// Points:
//   score step       up to 30  the size of the index move, for entries with `before`; full at 25
//                              points, so a first ban and a big reform can count alike
//   kind             2–20      legalisation 20, ban and death 15, easing 12, tightening 10,
//                              medical 8, debate 6, other 4, international 2
//   first ban        10        a country's first scored entry
//   current law      8         a country's latest scored entry, the one behind today's score
//                              (not added again when it is also the first ban)
//   population       up to 15  log scale: 100,000 people 0, a billion 15
//   culture links    up to 12  4 for each atlas entry that lists it under `history`
//   article links    up to 8   2 for each history article that links to it
//   related          up to 6   2 for each entry tied to it by `related`
//   book source      5         a book or chapter among its sources, so there is material to write from
//   estimate         −20       an estimated first ban has no date or event to write about
//   shared event     −25       the same event filed under several countries (the Soviet ban of
//                              1934 for each republic): only the most populous copy keeps its
//                              points, since one article covers them all
const fs = require("fs"), y = require("js-yaml");

const args = process.argv.slice(2);
const all = args.includes("--all");
const only = args.includes("--country") ? args[args.indexOf("--country") + 1] : null;
const limit = Number(args.find((a) => /^\d+$/.test(a))) || 50;

const changes = y.load(fs.readFileSync("changes.yaml", "utf8"));
const segs = y.load(fs.readFileSync("segments.yaml", "utf8"));
const file = (id) => (fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`);
const ids = fs.readdirSync("countries").map((f) => f.replace(".yaml", ""));
const country = Object.fromEntries(ids.map((id) => [id, y.load(fs.readFileSync(file(id), "utf8"))]));
const total = (s) => segs.reduce((sum, seg) => sum + (s[seg.id] * seg.weight) / 10, 0);
const T = (d) => Date.parse(d.length === 4 ? d + "-07-01" : d.length === 7 ? d + "-15" : d);
const pop = (id) => { const p = country[id]?.population; return p ? p[Object.keys(p).sort().at(-1)] : 0; };

// Score steps, and each country's first and latest scored entry.
const step = {}, first = new Set(), latest = new Set();
for (const id of ids) {
  const scored = changes.filter((e) => e.country === id && e.before).sort((a, b) => T(a.date) - T(b.date));
  scored.forEach((e, i) => {
    const after = scored[i + 1] ? scored[i + 1].before : country[id].scores;
    step[e.id] = Math.abs(total(after) - total(e.before));
  });
  if (scored.length) { first.add(scored[0].id); latest.add(scored.at(-1).id); }
}

// Links from the atlas, from articles, and between entries.
const count = (map, id) => { map[id] = (map[id] || 0) + 1; };
const culture = {}, linked = {}, related = {};
for (const part of ["language", "traditions", "people"]) {
  for (const f of fs.readdirSync(`culture/${part}`).filter((f) => f.endsWith(".md"))) {
    const front = fs.readFileSync(`culture/${part}/${f}`, "utf8").split(/\n---\n/)[0];
    const m = front.match(/^history:\s*\[([^\]]*)\]/m);
    for (const id of m ? m[1].split(",").map((s) => s.trim()).filter(Boolean) : []) count(culture, id);
  }
}
const articles = new Set(fs.readdirSync("articles").filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)));
for (const a of articles) {
  const text = fs.readFileSync(`articles/${a}.md`, "utf8");
  for (const id of new Set([...text.matchAll(/\]\(\/history\/([a-z0-9-]+)\/?\)/g)].map((m) => m[1]))) if (id !== a) count(linked, id);
}
for (const e of changes) for (const r of e.related ?? []) { count(related, r); count(related, e.id); }

// Shared events: entries with the same date, category and first source, filed under different
// countries. The most populous one is the original; the rest point to it.
const copyOf = {};
const groups = {};
for (const e of changes) {
  if (!e.country) continue;
  const s = e.sources[0];
  const key = [e.date, e.category, s.url || s.title].join("|");
  (groups[key] ||= []).push(e);
}
for (const g of Object.values(groups)) {
  if (g.length < 2 || new Set(g.map((e) => e.country)).size < 2) continue;
  const main = [...g].sort((a, b) => pop(b.country) - pop(a.country))[0];
  for (const e of g) if (e !== main) copyOf[e.id] = main.id;
}

const KIND = { legalisation: 20, ban: 15, death: 15, easing: 12, tightening: 10, medical: 8, debate: 6, other: 4, international: 2 };
const rows = changes.map((e) => {
  const why = [];
  let pts = 0;
  const add = (n, label) => { if (n) { pts += n; why.push(label); } };
  if (step[e.id] !== undefined) add(Math.round((Math.min(step[e.id], 25) / 25) * 30), `step ${Math.round(step[e.id])}`);
  add(KIND[e.category] ?? 4, e.category);
  if (first.has(e.id)) add(10, "first ban");
  if (latest.has(e.id) && !first.has(e.id)) add(8, "current law");
  const p = e.country ? pop(e.country) : 0;
  if (p) add(Math.round(Math.max(0, Math.min(1, (Math.log10(p) - 5) / 4)) * 15), `pop ${p >= 1e6 ? Math.round(p / 1e6) + "M" : Math.round(p / 1e3) + "k"}`);
  if (culture[e.id]) add(Math.min(12, culture[e.id] * 4), `atlas ×${culture[e.id]}`);
  if (linked[e.id]) add(Math.min(8, linked[e.id] * 2), `linked ×${linked[e.id]}`);
  if (related[e.id]) add(Math.min(6, related[e.id] * 2), `related ×${related[e.id]}`);
  if (e.sources.some((s) => s.type === "book" || s.type === "chapter")) add(5, "book");
  if (e.estimate) add(-20, "estimate");
  if (copyOf[e.id]) add(-25, `copy of ${copyOf[e.id]}`);
  const computed = Math.max(1, Math.min(10, Math.round(pts / 10)));
  return { e, pts, computed, importance: e.importance ?? computed, manual: e.importance !== undefined, why, has: articles.has(e.id) };
});

const shown = rows
  .filter((r) => (all || !r.has) && (!only || r.e.country === only))
  .sort((a, b) => b.importance - a.importance || b.pts - a.pts || T(b.e.date) - T(a.e.date));

const withArticle = rows.filter((r) => r.has).length;
console.log(`${rows.length} entries, ${withArticle} with an article. Showing ${Math.min(limit, shown.length)} of ${shown.length}${all ? "" : " without one"}${only ? ` in ${only}` : ""}.`);
console.log(`importance: ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => `${n}:${rows.filter((r) => r.importance === n).length}`).join(" ")}`);
for (const r of shown.slice(0, limit)) {
  const tag = r.manual ? `${r.importance}*` : String(r.importance);
  console.log(`${tag.padStart(3)} ${String(r.pts).padStart(3)}  ${(r.e.country || "--")} ${r.e.date.padEnd(10)} ${r.e.id}${r.has ? " [article]" : ""}\n          ${r.e.title}\n          ${r.why.join(", ")}`);
}
