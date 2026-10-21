// Every year of one dataset's map figure, for the year slider under the map (HomePage.astro):
// { "DE": [[2015, 5451, "5,451"], [2016, …], …], … } with the figure as drawn and as written.
// One file per dataset, fetched only when its view is open, so the map itself stays light.
import { places } from "../../lib/countries.js";
import { MAPPED, yearsOf } from "../../lib/datasets.js";

export const getStaticPaths = () => MAPPED.filter((d) => yearsOf(d)).map((d) => ({ params: { id: d.id }, props: { d } }));

export const GET = ({ props: { d } }) => {
  const out = {};
  for (const c of places) {
    const points = (c.series[d.id] ?? [])
      .filter((r) => r.year != null && r[d.map.field] != null)
      .map((r) => {
        const v = d.map.value(r, c);
        return [r.year, +v.toPrecision(6), d.map.format(v)];
      });
    if (points.length) out[c.id] = points;
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
};
