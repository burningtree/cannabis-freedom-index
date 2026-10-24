// The years each country has History entries in, for the country filter of the continuous list at
// /history/ (HistoryList.astro): { "NL": [[2024, 3, 1], …], … }, [year, all, moved a score], newest
// first, like the list's own year index. A federation's states are counted with it. Fetched on first use.
import { historyYears } from "../../../lib/countries.js";

export const GET = () => {
  const out = {};
  for (const { year, items } of historyYears) {
    const per = new Map();
    for (const ch of items) {
      if (!ch.country) continue;
      const n = per.get(ch.country.id) ?? [year, 0, 0];
      n[1]++;
      if (ch.score) n[2]++;
      per.set(ch.country.id, n);
    }
    for (const [id, n] of per) (out[id] ??= []).push(n);
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
};
