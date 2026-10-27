// One small JSON file per country with its explanations and sources, generated from the
// YAML in /countries, and what the compare page shows beside them: the score year by year, the
// changes in the history that moved it, and the latest figure of every outside dataset that
// covers the country. The compare page fetches these on demand.
import { places, changes } from "../../lib/countries.js";
import { mapRows } from "../../lib/exports.js";
import { DATASETS } from "../../lib/datasets.js";
import { headline, headField, valueOf, standing } from "../../lib/dataset-text.js";
import { flatLatestPricesFor } from "../../lib/prices.js";
import { SHOW_PRICES } from "../../lib/config.js";

export function getStaticPaths() {
  return places.map((c) => ({ params: { id: c.slug }, props: { c } }));
}

export function GET({ props }) {
  const { c } = props;
  const entry = ({ t, src, seeds, seeds_trade, clones, clones_trade, kind, status, penalties }) => ({ t, src, ...(seeds && { seeds, seeds_trade, clones, clones_trade }), ...(status && { kind, status }), ...(penalties && { penalties }) });
  const body = {
    id: c.id,
    note: c.note,
    reviewed: c.details.reviewed,
    ...(SHOW_PRICES && { prices: flatLatestPricesFor(c.id) }),
    segments: c.details.segments.map(entry),
    context: c.details.context.map((x) => x && entry(x)),
    // the score at the end of each year from 1860, only the years it changed: [year, score]
    scores: mapRows.filter((r) => r.id === c.id && r.year >= 1860).sort((a, b) => a.year - b.year)
      .map((r) => [r.year, Math.round(r.score * 10) / 10]).filter(([, v], i, all) => i === 0 || v !== all[i - 1][1]),
    // the dated changes that moved it, oldest first: [date, title, before, after, id]
    changes: changes.filter((ch) => ch.country === c && ch.score && !ch.estimate).reverse()
      .map((ch) => [String(ch.date), ch.title, ch.score.before, ch.score.after, ch.id]),
    // every outside dataset that covers it: { id: [the headline figure, its words, year, number, [[year, number]…], standing] }
    datasets: Object.fromEntries(Object.values(DATASETS).filter((d) => d.profile && d.values[c.slug]).map((d) => {
      const data = d.values[c.slug], series = Array.isArray(data) ? data : [data], name = headField(d);
      const row = series.findLast((r) => r[name] != null || name === "per") ?? series.at(-1);
      const points = series.filter((r) => r.year != null && Number.isFinite(valueOf(c, d, r, name))).map((r) => [r.year, +(+valueOf(c, d, r, name)).toPrecision(4)]);
      const st = standing(c, d);
      return [d.id, [...headline(c, d, row), row.year ?? null, Number.isFinite(valueOf(c, d, row, name)) ? +(+valueOf(c, d, row, name)).toPrecision(4) : null, points.slice(-40), st && { at: +st.at.toFixed(3), below: st.below, n: st.n, step: st.step }]];
    })),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
