// When a file last changed in git: "YYYY-MM-DD", or null when git or the full history is not
// available (a shallow checkout), so a caller can leave the date out instead of inventing one.
// Read once per build, for the sitemap's <lastmod> and the dateModified of articles.
import { execFileSync } from "node:child_process";

const dates = new Map();
try {
  // newest first: the first date seen for a file is its last change
  const log = execFileSync("git", ["log", "--format=@%cs", "--name-only", "--no-renames"], { cwd: process.cwd(), maxBuffer: 1 << 29, stdio: ["ignore", "pipe", "ignore"] }).toString();
  const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() === "true";
  if (!shallow) {
    let date = null;
    for (const line of log.split("\n")) {
      if (line.startsWith("@")) date = line.slice(1);
      else if (line && !dates.has(line)) dates.set(line, date);
    }
  }
} catch {}

// the last change of a file, or the latest of several (paths from the repository root)
export const lastChanged = (...files) => files.map((f) => dates.get(f)).filter(Boolean).sort().at(-1) ?? null;
