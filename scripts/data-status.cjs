// Where the data stands: node scripts/data-status.cjs [unchecked|estimates|thin|weak|chain [id]]
// Run from the project root. Needs js-yaml (already in node_modules).
const fs = require("fs"), y = require("js-yaml");
const changes = y.load(fs.readFileSync("changes.yaml", "utf8"));
const file = (id) => (fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`);
const ids = fs.readdirSync("countries").map((f) => f.replace(".yaml", ""));
const country = Object.fromEntries(ids.map((id) => [id, y.load(fs.readFileSync(file(id), "utf8"))]));
const what = process.argv[2];

const unchecked = changes.filter((e) => !e.checked && !e.estimate);
const estimates = changes.filter((e) => e.estimate);
console.log(`history: ${changes.length} entries | checked ${changes.filter((e) => e.checked).length} | unchecked ${unchecked.length} | estimated first bans ${estimates.length}`);

if (what === "unchecked") for (const e of unchecked) console.log([e.country || "--", e.date, e.id, e.sources[0].url].join(" | "));
if (what === "estimates") console.log(estimates.map((e) => `${e.country}${e.window ? `[${e.window}]` : ""}`).join(" "));
if (what === "thin") {
  const n = {};
  for (const e of changes) if (e.country) n[e.country] = (n[e.country] || 0) + 1;
  for (const k of [0, 1, 2]) console.log(`${k} entries:`, ids.filter((id) => (n[id] || 0) === k).map((id) => `${id}:${country[id].name}`).join(", "));
}
if (what === "weak") {
  // Profiles whose scored segments rest only on sites that proved unreliable.
  const weak = /cannabisregulations\.ai|tripbase\.com/;
  for (const id of ids) {
    const c = country[id];
    const bad = Object.entries(c.sources || {}).filter(([, s]) => weak.test(s.url)).map(([k]) => k);
    const only = Object.entries(c.segments || {}).filter(([, s]) => s.sources?.length && s.sources.every((k) => bad.includes(k))).map(([k]) => k);
    if (only.length) console.log(`${id} ${c.name}: ${only.join(", ")}`);
  }
}

if (what === "chain") {
  // The score timeline of each country: every scored entry with the index before and after it.
  // Flags steps that do not make sense. `chain de` prints one country in full.
  const segs = y.load(fs.readFileSync("segments.yaml", "utf8"));
  const K = segs.map((s) => s.id);
  const total = (s) => Math.round(segs.reduce((sum, seg) => sum + (s[seg.id] * seg.weight) / 10, 0));
  const T = (d) => Date.parse(d.length === 4 ? d + "-07-01" : d.length === 7 ? d + "-15" : d);
  const UP = new Set(["easing", "legalisation", "medical"]);
  const DOWN = new Set(["ban", "tightening", "death"]);
  const only = process.argv[3];
  let flagged = 0;
  for (const id of ids) {
    if (only && id !== only) continue;
    const scored = changes.filter((e) => e.country === id && e.before).sort((a, b) => T(a.date) - T(b.date));
    const lines = [];
    scored.forEach((e, i) => {
      const after = scored[i + 1] ? scored[i + 1].before : country[id].scores;
      const b = total(e.before), a = total(after);
      const flags = [];
      if (K.every((k) => e.before[k] === after[k])) flags.push("no change");
      if (UP.has(e.category) && a < b) flags.push(`${e.category} but the score falls`);
      if (DOWN.has(e.category) && a > b) flags.push(`${e.category} but the score rises`);
      if (i === 0 && b < 90 && !e.estimate) flags.push("starts below the unregulated state: fine only if an earlier licensed or restricted regime is documented");
      if (flags.length) flagged++;
      lines.push(`  ${e.date.padEnd(10)} ${String(b).padStart(3)} -> ${String(a).padStart(3)}  ${e.id}${e.estimate ? " (estimate)" : ""}${flags.length ? "   <-- " + flags.join("; ") : ""}`);
    });
    if (only || lines.some((l) => l.includes("<--"))) console.log(`${id} ${country[id].name} (today ${total(country[id].scores)})\n${lines.join("\n")}`);
  }
  console.log(`${flagged} step(s) flagged`);
}
