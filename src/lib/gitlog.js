// The changelog: every commit in the repository's history, read from git at build time, with what
// it changed in terms a reader can follow, not only which files moved.
//   - history entries (changes.yaml): added, removed, and the fields that changed, word by word
//   - countries and states (countries/**.yaml): score moves and the texts that changed
//   - articles and culture entries (Markdown): new, removed, and their text word by word
//   - datasets (CSV): rows added or removed
//   - everything else (code, design, docs): the changed lines, shortened
// A commit never changes once made, so each one is worked out once and kept in .cache/changelog.
// The build needs the full history (the deploy workflow checks out with fetch-depth: 0); without
// git, or in a shallow copy, the changelog simply lists what is there.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { diffWords } from "diff";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, ".cache", "changelog");
const VERSION = "3"; // raise to work every commit out again after changing this file
const git = (...args) => {
  try { return execFileSync("git", args, { cwd: ROOT, maxBuffer: 1 << 29, stdio: ["ignore", "pipe", "ignore"] }).toString(); } catch { return null; }
};
// WORKTREE stands for the files as they are on disk, for the uncommitted changes shown locally
const WORKTREE = "WORKTREE";
// git diff --no-index exits with 1 when files differ, which is the normal case here
const gitAny = (...args) => {
  try { return execFileSync("git", args, { cwd: ROOT, maxBuffer: 1 << 29, stdio: ["ignore", "pipe", "ignore"] }).toString(); } catch (e) { return e.stdout?.toString() || null; }
};
const at = (rev, file) => {
  if (rev !== WORKTREE) return git("show", `${rev}:${file}`);
  const p = path.join(ROOT, file);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
};

// Word-level difference of two texts: [[kind, text]], kind "=" same, "+" added, "-" removed. Long
// unchanged stretches are cut to their ends, so a one-word fix in a long text stays short.
function words(a, b) {
  const out = [];
  for (const p of diffWords(a ?? "", b ?? "")) {
    const kind = p.added ? "+" : p.removed ? "-" : "=";
    let t = p.value;
    if (kind === "=" && t.length > 220) t = `${t.slice(0, 90)} … ${t.slice(-90)}`;
    out.push([kind, t]);
  }
  return out;
}
// a value as a reader would write it: lists joined, scores as "possession 2 · cultivation 1"
const plain = (v) => v == null ? "" : typeof v !== "object" ? String(v)
  : Array.isArray(v) ? v.map((x) => (x && typeof x === "object" ? x.title ?? plain(x) : String(x))).join(", ")
  : Object.entries(v).map(([k, x]) => `${k.replace(/_/g, " ")} ${plain(x)}`).join(" · ");
// a list of sources: which came and which went, one per line, by title
const sourceParts = (a, b) => {
  const key = (x) => (x && typeof x === "object" ? x.url ?? x.title : String(x));
  const name = (x) => (x && typeof x === "object" ? x.title ?? x.url : String(x));
  const A = new Map((Array.isArray(a) ? a : Object.values(a ?? {})).map((x) => [key(x), x]));
  const B = new Map((Array.isArray(b) ? b : Object.values(b ?? {})).map((x) => [key(x), x]));
  const parts = [];
  for (const [k, x] of B) if (!A.has(k)) parts.push(["+", `${name(x)}\n`]);
  for (const [k, x] of A) if (!B.has(k)) parts.push(["-", `${name(x)}\n`]);
  const kept = [...B.keys()].filter((k) => A.has(k)).length;
  if (kept) parts.push(["=", `${kept} unchanged`]);
  return parts;
};
const changedFields = (a, b, skip = []) => {
  const fields = [];
  for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) {
    if (skip.includes(k)) continue;
    if (JSON.stringify(a?.[k]) === JSON.stringify(b?.[k])) continue;
    if (k === "sources" && (typeof a?.[k] === "object" || typeof b?.[k] === "object")) { const parts = sourceParts(a?.[k], b?.[k]); if (parts.some(([t]) => t !== "=")) fields.push({ name: k, parts }); continue; }
    const x = plain(a?.[k]), y = plain(b?.[k]);
    if (x !== y) fields.push({ name: k, parts: words(x, y) });
  }
  return fields;
};

// changes.yaml: the entries by id, before and after
function historyDiff(rev, parent) {
  const load = (r) => { const t = r && at(r, "changes.yaml"); try { return t ? yaml.load(t) ?? [] : []; } catch { return []; } };
  const before = new Map(load(parent).map((e) => [e.id, e])), after = new Map(load(rev).map((e) => [e.id, e]));
  const added = [], removed = [], changed = [];
  for (const [id, e] of after) {
    const old = before.get(id);
    if (!old) added.push({ id, title: e.title, date: String(e.date ?? ""), country: e.country ?? null });
    else {
      const fields = changedFields(old, e, ["id"]);
      if (fields.length) changed.push({ id, title: e.title, fields });
    }
  }
  for (const [id, e] of before) if (!after.has(id)) removed.push({ id, title: e.title });
  return { added, removed, changed };
}

// a country or state file: its scores and texts, flattened to "segments.possession" and the like
const flatten = (d) => {
  const out = {};
  const walk = (v, key) => {
    if (v && typeof v === "object" && !Array.isArray(v) && key !== "sources" && key.split(".").length < 3) for (const [k, x] of Object.entries(v)) walk(x, key ? `${key}.${k}` : k);
    else out[key] = v;
  };
  walk(d ?? {}, "");
  return out;
};
function placeDiff(rev, parent, file) {
  const load = (r) => { const t = r && at(r, file); try { return t ? yaml.load(t) : null; } catch { return null; } };
  const a = load(parent), b = load(rev);
  const name = (b ?? a)?.name ?? file;
  const slug = file.replace(/^countries\//, "").replace(/(\/index)?\.yaml$/, "");
  if (!a || !b) return { file, slug, name, status: a ? "removed" : "added", before: a?.scores ?? null, after: b?.scores ?? null };
  const scores = Object.keys({ ...a.scores, ...b.scores }).filter((k) => a.scores?.[k] !== b.scores?.[k]).map((k) => ({ name: k, before: a.scores?.[k] ?? null, after: b.scores?.[k] ?? null }));
  const fa = flatten(a), fb = flatten(b);
  delete fa.scores; delete fb.scores;
  for (const k of Object.keys({ ...fa, ...fb })) if (k.startsWith("scores.")) { delete fa[k]; delete fb[k]; }
  const fields = changedFields(fa, fb, ["updated", "reviewed"]).map((f) => (f.name === "sources" ? f : /\.sources$/.test(f.name) ? { ...f, name: f.name } : f));
  return { file, slug, name, status: "changed", scores, fields, before: a.scores ?? null, after: b.scores ?? null };
}

// a Markdown file: its front matter title, and the body word by word
function textDiff(rev, parent, file) {
  const split = (t) => { const m = t?.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/); let fm = {}; try { fm = m ? yaml.load(m[1]) ?? {} : {}; } catch {} return { fm, body: m ? m[2] : t ?? "" }; };
  const a = parent ? at(parent, file) : null, b = at(rev, file);
  const A = split(a), B = split(b);
  const title = B.fm.title ?? A.fm.title ?? path.basename(file, ".md");
  const kind = file.startsWith("articles/") ? "article" : file.startsWith("culture/") ? "culture" : "doc";
  const url = kind === "article" ? `history/${path.basename(file, ".md")}/` : kind === "culture" ? `culture/${file.slice(8, -3)}/` : null;
  if (a == null || b == null) return { file, title, kind, url: b == null ? null : url, status: a == null ? "added" : "removed", words: (b ?? a ?? "").split(/\s+/).length };
  const fields = changedFields(A.fm, B.fm, ["written"]);
  if (A.body !== B.body) fields.unshift({ name: "text", parts: words(A.body, B.body) });
  return { file, title, kind, url, status: "changed", fields };
}

// a CSV: how many rows came and went
function dataDiff(rev, parent, file) {
  const rows = (t) => (t ? t.trim().split("\n").length - 1 : 0);
  const a = parent ? at(parent, file) : null, b = at(rev, file);
  return { file, status: a == null ? "added" : b == null ? "removed" : "changed", before: rows(a), after: rows(b) };
}

// anything else: the changed lines, at most a few hundred per commit
const QUIET = /(^|\/)(package-lock\.json|source-archive\.json)$|\.(png|jpe?g|webp|gif|svg|mp4|mkv|woff2?|ico|pdf|epub|xls|vtt)$/i;
function codeDiff(rev, parent, file, budget) {
  if (QUIET.test(file) || budget.left <= 0) return { file, lines: null };
  const out = rev !== WORKTREE ? git("diff", "--no-renames", "-U2", parent ?? "4b825dc642cb6eb9a060e54bf8d69288fbee4904", rev, "--", file)
    : git("diff", "--no-renames", "-U2", parent, "--", file) || gitAny("diff", "--no-index", "-U2", "/dev/null", file);
  if (out == null) return { file, lines: null };
  const lines = out.split("\n").filter((l) => !/^(diff --git|index |--- |\+\+\+ |new file|deleted file|similarity|rename )/.test(l));
  const shown = lines.slice(0, Math.min(budget.left, 160));
  budget.left -= shown.length;
  return { file, lines: shown, more: lines.length - shown.length };
}

function workOut(c) {
  const file = path.join(CACHE, `${VERSION}-${c.hash}.json`);
  const keep = c.hash !== WORKTREE; // the uncommitted changes change all the time
  if (keep && existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const parent = c.parent;
  const groups = { history: null, places: [], texts: [], data: [], code: [] };
  const budget = { left: 600 };
  for (const f of c.files) {
    if (f.file === "changes.yaml") groups.history = historyDiff(c.hash, parent);
    else if (/^countries\/.*\.yaml$/.test(f.file)) groups.places.push(placeDiff(c.hash, parent, f.file));
    else if (/^(articles|culture)\/.*\.md$/.test(f.file)) groups.texts.push(textDiff(c.hash, parent, f.file));
    else if (/^datasets\/.*\.csv$/.test(f.file)) groups.data.push(dataDiff(c.hash, parent, f.file));
    else groups.code.push({ ...codeDiff(c.hash, parent, f.file, budget), add: f.add, del: f.del });
  }
  if (keep) { mkdirSync(CACHE, { recursive: true }); writeFileSync(file, JSON.stringify(groups)); }
  return groups;
}

// every commit, newest first: { hash, short, date, subject, body, parent, files, add, del }
function readLog() {
  const SEP = "\u001e", END = "\u001f";
  const out = git("log", "--no-renames", "--numstat", `--format=${END}%H${SEP}%P${SEP}%aI${SEP}%s${SEP}%b${SEP}`);
  if (!out) return [];
  return out.split(END).filter(Boolean).map((chunk) => {
    const [hash, parents, date, subject, body, stat] = chunk.split(SEP);
    const files = (stat ?? "").trim().split("\n").filter(Boolean).map((l) => {
      const [add, del, ...f] = l.split("\t");
      return { file: f.join("\t"), add: add === "-" ? 0 : +add, del: del === "-" ? 0 : +del };
    });
    return {
      hash, short: hash.slice(0, 7), date, subject: subject.trim(), body: (body ?? "").replace(/\n?Co-Authored-By:.*$/gim, "").trim(),
      parent: parents.split(" ")[0] || null, files,
      add: files.reduce((s, f) => s + f.add, 0), del: files.reduce((s, f) => s + f.del, 0),
    };
  });
}

// Built on this computer (not by the deploy workflow, which sets CI), the changes not yet committed
// come first, as one more change: { hash: "WORKTREE", short: "uncommitted", ... }
// The dev server keeps this module loaded, so that snapshot would stay as it was when the server
// started. The changelog pages call reloadUncommitted() on each request, and the page has a Reload
// button for when it is left open while files change.
function uncommitted() {
  if (process.env.CI) return [];
  const head = git("rev-parse", "HEAD")?.trim();
  if (!head) return [];
  const files = (git("diff", "--no-renames", "--numstat", "HEAD") ?? "").trim().split("\n").filter(Boolean).map((l) => {
    const [add, del, ...f] = l.split("\t");
    return { file: f.join("\t"), add: add === "-" ? 0 : +add, del: del === "-" ? 0 : +del };
  });
  for (const f of (git("ls-files", "--others", "--exclude-standard") ?? "").trim().split("\n").filter(Boolean)) {
    const text = at(WORKTREE, f);
    files.push({ file: f, add: text && !text.includes("\u0000") ? text.split("\n").length : 0, del: 0 });
  }
  if (!files.length) return [];
  return [{
    hash: WORKTREE, short: "uncommitted", date: new Date().toISOString(), subject: "Uncommitted changes", body: "Work on this computer that is not committed yet. Shown only in local builds.",
    parent: head, files, add: files.reduce((s, f) => s + f.add, 0), del: files.reduce((s, f) => s + f.del, 0), local: true,
  }];
}
export const commits = [...uncommitted(), ...readLog()].map((c) => ({ ...c, groups: workOut(c) }));

const EMPTY = { history: null, places: [], texts: [], data: [], code: [] };

// Read the working tree again and put that in front of `commits`. Null when everything is committed.
export function reloadUncommitted() {
  if (!import.meta.env.DEV) return commits.find((c) => c.local) ?? null;
  const [c] = uncommitted();
  const fresh = c ? { ...c, groups: workOut(c) } : null;
  const i = commits.findIndex((x) => x.local);
  if (fresh && i >= 0) commits[i] = fresh;
  else if (fresh) commits.unshift(fresh);
  else if (i >= 0) commits.splice(i, 1);
  return fresh;
}

export { EMPTY as emptyGroups };

// one line of what a commit did: [[count, label, the id of its section on the commit's page]]
export function summaryOf(c) {
  const g = c.groups, out = [];
  const n = (x, one, many, at) => x && out.push([x, x === 1 ? one : many, `gl-${at}`]);
  n(g.history?.added.length, "history entry added", "history entries added", "history-added");
  n(g.history?.changed.length, "history entry edited", "history entries edited", "history-edited");
  n(g.history?.removed.length, "history entry removed", "history entries removed", "history-removed");
  n(g.places.filter((p) => p.scores?.length).length, "score changed", "scores changed", "scores");
  n(g.places.filter((p) => p.status === "changed" && !p.scores?.length).length, "country profile edited", "country profiles edited", "places");
  n(g.places.filter((p) => p.status === "added").length, "place added", "places added", "places");
  n(g.texts.filter((t) => t.kind === "article" && t.status === "added").length, "article written", "articles written", "texts");
  n(g.texts.filter((t) => t.kind === "article" && t.status === "changed").length, "article edited", "articles edited", "texts");
  n(g.texts.filter((t) => t.kind === "culture" && t.status === "added").length, "atlas entry written", "atlas entries written", "texts");
  n(g.texts.filter((t) => t.kind === "culture" && t.status === "changed").length, "atlas entry edited", "atlas entries edited", "texts");
  n(g.data.length, "dataset updated", "datasets updated", "data");
  n(g.code.length, "file of code, design or docs", "files of code, design or docs", "code");
  return out;
}
