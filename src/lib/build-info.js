// What the footer says about this build: the commit it was built from and the day. Read once per
// build. The deploy workflow sets GITHUB_SHA; locally git is asked; without either, no commit.
import { execFileSync } from "node:child_process";

const sha = process.env.GITHUB_SHA || (() => {
  try { return execFileSync("git", ["rev-parse", "HEAD"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return ""; }
})();

const built = new Date();
export const build = {
  sha,
  short: sha.slice(0, 7),
  date: built.toISOString().slice(0, 10),
  label: built.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};
