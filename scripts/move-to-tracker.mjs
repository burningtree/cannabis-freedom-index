// Takes out of the history the entries that moved to the Cannabis Enforcement Tracker: every report
// there with a `cfi_id` (copied into src/data/tracker.json by scripts/sync-tracker.mjs). It removes the
// entry from changes.yaml and its article from articles/, drops it from other entries' `related`
// lists, and points every link to /history/<id>/ at the report on the tracker. The site also
// redirects the old addresses there (astro.config.mjs).
//
//   node scripts/sync-tracker.mjs && node scripts/move-to-tracker.mjs [--dry] [--mine]
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const DRY = process.argv.includes("--dry");
const TRACKER = "https://tracker.cannabisfreedom.fyi";
const { reports } = JSON.parse(fs.readFileSync("src/data/tracker.json", "utf8"));
const target = Object.fromEntries(reports.filter((r) => r.cfi_id).map((r) => [r.cfi_id, `${TRACKER}/report/${r.id}/`]));

// changes.yaml: an entry runs from its "- id:" line to the next line that starts at column 0 (the
// next entry or a comment); a moved id is also taken out of `related` lists
const lines = fs.readFileSync("changes.yaml", "utf8").split("\n");
const out = [];
let removed = 0, skipping = false, related = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const start = line.match(/^- id: ([a-z0-9-]+)\s*$/);
  if (start) skipping = start[1] in target;
  else if (/^\S/.test(line)) skipping = false;
  if (skipping) { if (start) removed++; continue; }
  const rel = line.match(/^    - ([a-z0-9-]+)\s*$/);
  if (rel && rel[1] in target && out.slice().reverse().find((l) => /^  \S/.test(l))?.startsWith("  related:")) { related++; continue; }
  out.push(line);
}
// related lists written on one line, `related: [a, b]`, lose the moved ids too
for (let i = 0; i < out.length; i++) {
  const m = out[i].match(/^  related: \[(.*)\]\s*$/);
  if (!m) continue;
  const ids = m[1].split(",").map((s) => s.trim()).filter(Boolean);
  const kept = ids.filter((id) => !(id in target));
  if (kept.length !== ids.length) { related += ids.length - kept.length; out[i] = kept.length ? `  related: [${kept.join(", ")}]` : null; }
}
// a `related:` left with no items goes too
const cleaned = out.filter((l, i) => l !== null && !(l.startsWith("  related:") && l.trim() === "related:" && !/^    - /.test(out[i + 1] ?? "")));

// the files that may link to a history entry
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(md|yaml|yml)$/.test(f.name)) files.push(p); } };
["articles", "culture", "countries", "datasets"].filter((d) => fs.existsSync(d)).forEach(walk);
// files someone else is editing (uncommitted changes) are left alone and listed, to be fixed later
const busy = new Set(execSync("git status --porcelain", { encoding: "utf8" }).split("\n").filter(Boolean).map((l) => l.slice(3)));
// --mine: the uncommitted changes in changes.yaml are this script's own, from an earlier run
if (busy.has("changes.yaml") && !process.argv.includes("--mine")) throw new Error("changes.yaml has uncommitted changes: wait until they are committed (or pass --mine if they are this script's own)");
const skipped = [];
const link = /(https:\/\/cannabisfreedom\.fyi)?\/history\/([a-z0-9-]+)\/?/g;
let links = 0, articles = 0;
const repoint = (text) => text.replace(link, (m, host, id) => (id in target ? (links++, target[id]) : m));

if (!DRY) {
  fs.writeFileSync("changes.yaml", repoint(cleaned.join("\n")));
  for (const id of Object.keys(target)) { const f = path.join("articles", `${id}.md`); if (fs.existsSync(f)) { fs.unlinkSync(f); articles++; } }
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const text = fs.readFileSync(f, "utf8"), next = repoint(text);
    if (next === text) continue;
    if (busy.has(f)) { skipped.push(f); continue; }
    fs.writeFileSync(f, next);
  }
} else {
  repoint(cleaned.join("\n"));
  for (const f of files) repoint(fs.readFileSync(f, "utf8"));
  articles = Object.keys(target).filter((id) => fs.existsSync(path.join("articles", `${id}.md`))).length;
}
if (skipped.length) console.log(`not touched, being edited by someone else (links to fix later): ${skipped.join(", ")}`);
console.log(`${DRY ? "(dry run) " : ""}removed ${removed} entries and ${articles} articles, ${related} related links, repointed ${links} links to the tracker`);
