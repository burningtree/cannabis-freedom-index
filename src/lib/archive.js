// Archived copies of the sources, so that a dead link does not take the evidence with it.
// source-archive.json maps a source address to its copy in the Internet Archive:
//   { "<url>": { "archived": "https://web.archive.org/web/<timestamp>/<url>", "checked": "YYYY-MM-DD" } }
// It is filled by scripts/archive-sources.cjs and never edited by hand.
import archive from "../../source-archive.json";

export const archivedUrl = (url) => archive[url]?.archived ?? null;
// how many of the cited sources have a copy: archivedCount in citations.js
