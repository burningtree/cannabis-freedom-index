// How the research grew, read from git: at every commit, how many history entries there were (and
// how many of them checked against a source), long-read articles, culture entries, and distinct web
// pages cited by the profiles, the history, the articles and the atlas. For the chart on
// /research/. Counted straight from each commit's files without parsing them (a history entry is a
// line "- id:", a cited page a `url:` field), so it stays quick; a commit never changes, so each is
// counted once and kept in .cache/progress. Without git, or in a shallow copy, the chart shows the
// commits there are.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, ".cache", "progress");
const VERSION = "1"; // raise to count every commit again after changing what is counted
const git = (...args) => {
  try { return execFileSync("git", args, { cwd: ROOT, maxBuffer: 1 << 29, stdio: ["ignore", "pipe", "ignore"] }).toString(); } catch { return ""; }
};
const lines = (text) => text.split("\n").filter(Boolean);

// the counts at one commit
function countAt(hash) {
  const file = path.join(CACHE, `${VERSION}-${hash}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const entries = +git("grep", "-h", "-c", "^- id:", hash, "--", "changes.yaml").trim() || 0;
  const checked = +git("grep", "-h", "-c", "^  checked: true", hash, "--", "changes.yaml").trim() || 0;
  const md = (dir) => lines(git("ls-tree", "-r", "--name-only", hash, "--", dir)).filter((f) => f.endsWith(".md")).length;
  // a `url:` field holds its address on the same line, or on the next when folded (url: >-)
  const urls = new Set();
  const found = lines(git("grep", "-h", "-E", "-A1", "^\\s*(- )?url:", hash, "--", "changes.yaml", "countries", "articles", "culture"));
  found.forEach((line, i) => {
    const m = line.match(/url:\s*(.*)$/);
    if (!m) return;
    const value = /^>-?$/.test(m[1].trim()) ? (found[i + 1] ?? "").trim() : m[1].trim();
    const url = value.replace(/^["']|["']$/g, "");
    if (/^https?:\/\//.test(url)) urls.add(url);
  });
  const counts = { entries, checked, articles: md("articles"), culture: md("culture"), sources: urls.size };
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(file, JSON.stringify(counts));
  return counts;
}

// every commit, oldest first: [time (ms), entries, checked, articles, culture, sources, short hash, subject]
// (the short hash is the changelog's: its first seven characters, so each moment links to its page)
export const progress = lines(git("log", "--reverse", "--format=%H %cI %s"))
  .map((line) => {
    const [hash, date, ...subject] = line.split(" ");
    const c = countAt(hash);
    return [Date.parse(date), c.entries, c.checked, c.articles, c.culture, c.sources, hash.slice(0, 7), subject.join(" ")];
  })
  // a commit before the history existed says nothing about it
  .filter((p) => p[1] > 0);
