// Copies the reports of the Cannabis Enforcement Tracker (tracker.cannabisfreedom.fyi) into
// src/data/tracker.json: a short line per report for the Enforcement section of each country profile,
// and the history entries that moved there (their `cfi_id`), which the site redirects to the tracker.
//
// Raids, seizures, eradication, arrests, prosecutions and sentences that change no law are kept in the
// tracker, not in changes.yaml (docs/DATA-MAINTENANCE.md, "Enforcement events"). Run this after reports
// are added there:
//
//   node scripts/sync-tracker.mjs [path to the tracker checkout]   (default ../cannabis-freedom-index-tracker)
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const tracker = path.resolve(process.argv[2] || process.env.TRACKER_DIR || "../cannabis-freedom-index-tracker");
const dir = path.join(tracker, "reports");
if (!fs.existsSync(dir)) throw new Error(`no reports/ folder in ${tracker}`);

const reports = [];
for (const f of fs.readdirSync(dir, { recursive: true }).filter((f) => f.endsWith(".md"))) {
  const m = fs.readFileSync(path.join(dir, f), "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!m) continue;
  const d = yaml.load(m[1], { schema: yaml.JSON_SCHEMA });
  reports.push({
    id: path.basename(f, ".md"),
    ...(d.code && { code: d.code }),
    date: String(d.date).slice(0, 10),
    country: d.country, type: d.type,
    title: d.title, summary: String(d.summary).replace(/\s+/g, " ").trim(),
    ...(d.place && { place: d.place }),
    ...(d.cfi_id && { cfi_id: d.cfi_id }),
  });
}
reports.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
fs.writeFileSync("src/data/tracker.json", JSON.stringify({ synced: new Date().toISOString().slice(0, 10), reports }) + "\n");
console.log(`src/data/tracker.json: ${reports.length} reports, ${reports.filter((r) => r.cfi_id).length} moved from the history, from ${dir}`);
