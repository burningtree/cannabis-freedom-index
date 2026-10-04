// Where the data stands: node scripts/data-status.cjs [unchecked|estimates|thin|weak]
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
