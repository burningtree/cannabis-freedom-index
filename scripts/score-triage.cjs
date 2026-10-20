// Context entries that sound like a real change: a ban, tightening, death penalty, easing,
// legalisation or medical law with no `before`. Each is either a score step still to add or a
// context entry that should say why it moves nothing (`unscored: <reason>` in changes.yaml).
//
//   node scripts/score-triage.cjs              every country with open entries, fewest scored steps first
//   node scripts/score-triage.cjs de           one country's timeline: scored steps and open entries in order
//   node scripts/score-triage.cjs batch [n]    the timelines of the first n countries in that order (default 5)
//
// Entries with `unscored` are counted as reviewed and not listed again.
const fs = require("fs"), y = require("js-yaml");

const changes = y.load(fs.readFileSync("changes.yaml", "utf8"));
const segs = y.load(fs.readFileSync("segments.yaml", "utf8"));
const file = (id) => (fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`);
const ids = fs.readdirSync("countries").map((f) => f.replace(".yaml", ""));
const country = Object.fromEntries(ids.map((id) => [id, y.load(fs.readFileSync(file(id), "utf8"))]));
const total = (s) => Math.round(segs.reduce((sum, seg) => sum + (s[seg.id] * seg.weight) / 10, 0));
const T = (d) => Date.parse(d.length === 4 ? d + "-07-01" : d.length === 7 ? d + "-15" : d);

const DIRECTIONAL = new Set(["ban", "tightening", "death", "easing", "legalisation", "medical"]);
const candidate = (e) => e.country && !e.before && DIRECTIONAL.has(e.category);
const open = changes.filter((e) => candidate(e) && !e.unscored);
const reviewed = changes.filter((e) => candidate(e) && e.unscored);

const rows = ids
  .map((id) => ({
    id,
    scored: changes.filter((e) => e.country === id && e.before).length,
    open: open.filter((e) => e.country === id),
  }))
  .filter((r) => r.open.length)
  .sort((a, b) => a.scored - b.scored || b.open.length - a.open.length || a.id.localeCompare(b.id));

function timeline(id) {
  const scored = changes.filter((e) => e.country === id && e.before).sort((a, b) => T(a.date) - T(b.date));
  const after = (e) => { const i = scored.indexOf(e); return scored[i + 1] ? scored[i + 1].before : country[id].scores; };
  const items = [...scored, ...open.filter((e) => e.country === id)].sort((a, b) => T(a.date) - T(b.date) || (a.before ? -1 : 1));
  // The score in force when each open entry happened: the "after" of the last scored step before it.
  let now = scored.length ? total(scored[0].before) : total(country[id].scores);
  console.log(`\n${id} ${country[id].name} (today ${total(country[id].scores)}, ${scored.length} scored, ${items.length - scored.length} open)`);
  for (const e of items) {
    if (e.before) {
      now = total(after(e));
      console.log(`    ${e.date.padEnd(10)} ${String(total(e.before)).padStart(3)} -> ${String(now).padStart(3)}  ${e.category.padEnd(12)} ${e.id}`);
    } else {
      console.log(`  ? ${e.date.padEnd(10)}   at ${String(now).padStart(3)}  ${e.category.padEnd(12)} ${e.id}${e.checked ? "" : " (unchecked)"}`);
      console.log(`                              ${e.title}`);
    }
  }
}

const what = process.argv[2];
console.log(`directional context entries: ${open.length + reviewed.length} | open ${open.length} | reviewed (unscored) ${reviewed.length} | countries with open entries ${rows.length}`);
if (!what) {
  for (const r of rows) {
    const by = {};
    for (const e of r.open) by[e.category] = (by[e.category] || 0) + 1;
    const kinds = Object.entries(by).map(([k, n]) => `${k} ${n}`).join(", ");
    console.log(`${r.id.padEnd(3)} ${country[r.id].name.padEnd(28)} scored ${String(r.scored).padStart(2)}  open ${String(r.open.length).padStart(2)}  (${kinds})`);
  }
} else if (what === "batch") {
  for (const r of rows.slice(0, Number(process.argv[3]) || 5)) timeline(r.id);
} else if (country[what]) {
  timeline(what);
} else {
  console.error(`unknown country or command "${what}"`);
  process.exit(1);
}
