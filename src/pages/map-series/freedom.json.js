// Every place's index and segment scores at the end of each year, for the year control on the
// map's Freedom views (HomePage.astro): { "DE": [[1800, 100, 10, 10, 10, 10, 10, 10], …], … },
// [year, index, the six segments in SEGMENTS order], only in the years a score changed.
// Rebuilt from the history like the yearly panel (see exports.js), but from 1800; fetched on first use.
import { mapRows } from "../../lib/exports.js";
import { SEGMENTS } from "../../lib/countries.js";

export const GET = () => {
  const out = {};
  for (const r of mapRows) {
    const point = [r.year, r.score, ...SEGMENTS.map((seg) => r[seg.id])];
    const list = (out[r.id] ??= []);
    const last = list.at(-1);
    if (!last || last.slice(1).some((v, i) => v !== point[i + 1])) list.push(point);
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
};
