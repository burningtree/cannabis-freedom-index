// The outside datasets as pages of their own (/datasets/ and /datasets/<slug>/): for each dataset,
// every place it covers with its latest headline figure written as on the profiles, a map colour,
// and the figures the page opens with. Built from datasets.js (the files) and dataset-text.js (how
// a figure reads).
import { places } from "./countries.js";
import { DATASETS } from "./datasets.js";
import { viewByMetric } from "./map-views.js";
import { fill, headline, headField, valueOf, groupOf, GROUPS, CHART_OF } from "./dataset-text.js";

const median = (vs) => { const s = [...vs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

// How a dataset's places are coloured: by its map view's five steps where it has one; a figure
// without a map view by fifths of the places; a figure in words (a religion, a former ruler) by
// its value, each counted in a table, with every place in one colour.
function colouring(d, rows) {
  const numeric = rows.filter((r) => Number.isFinite(r.value));
  if (d.map) {
    return {
      kind: "steps", legend: d.map.steps.map(([, label], i) => [`var(--u${i})`, label]),
      stepOf: (r) => { if (!Number.isFinite(r.mapValue)) return null; let s = 0; while (s < 4 && r.mapValue >= d.map.steps[s + 1][0]) s++; return s; },
    };
  }
  if (numeric.length >= 10) {
    const sorted = numeric.map((r) => r.value).sort((a, b) => a - b);
    const cuts = [1, 2, 3, 4].map((q) => sorted[Math.floor((q / 5) * sorted.length)]);
    const stepOf = (r) => (Number.isFinite(r.value) ? cuts.filter((c) => r.value >= c).length : null);
    return { kind: "fifths", legend: ["Lowest fifth", "Second fifth", "Middle fifth", "Fourth fifth", "Highest fifth"].map((l, i) => [`var(--u${i})`, l]), stepOf };
  }
  return { kind: "covered", legend: [["var(--u3)", "In the dataset"]], stepOf: (r) => (r.head[0] || r.head[1] ? 3 : null) };
}

export const datasetPages = Object.values(DATASETS).map((d) => {
  const slug = d.id.replace(/_/g, "-");
  const name = d.worldwide ? null : headField(d);
  const field = name && d.fields[name];
  const words = field?.type === "text" || field?.format === "text";
  const rows = d.worldwide ? [] : places.filter((c) => d.values[c.slug]).map((c) => {
    const series = d.values[c.slug];
    // the latest year with the headline's figure, as on the profile
    const row = series.findLast((r) => r[name] != null || name === "per") ?? series.at(-1);
    const mapRow = d.map ? series.findLast((r) => r[d.map.field] != null) : null;
    const value = words ? null : valueOf(c, d, row, name);
    return {
      c, row, year: row?.year ?? null, head: headline(c, d, row), details: fill(c, d, row, d.profile?.details),
      value: Number.isFinite(value) ? value : null,
      mapValue: mapRow && (!d.map.since || mapRow.year >= d.map.since) ? d.map.value(mapRow, c) : null,
      years: new Set(series.map((r) => r.year).filter((y) => y != null)).size,
    };
  }).sort((a, b) => a.c.name.localeCompare(b.c.name));
  const col = colouring(d, rows);
  for (const r of rows) r.step = col.stepOf(r);
  // a figure in words: how many places give each answer, the largest first
  const answers = words ? [...rows.reduce((m, r) => m.set(r.head[0] || r.head[1], (m.get(r.head[0] || r.head[1]) ?? 0) + 1), new Map())]
    .map(([label, n]) => ({ label, n })).sort((a, b) => b.n - a.n) : [];
  // the highest and the lowest, where countries can be compared (survey ages differ for cannabis use)
  const comparable = !words && field?.format !== "rank" && d.id !== "cannabis_use";
  const ranked = comparable ? rows.filter((r) => r.value != null && !r.c.territory).sort((a, b) => b.value - a.value) : [];
  const mapView = d.map ? viewByMetric[`data:${d.id}`] ?? null : null;
  const mapPage = mapView ? `map/${mapView.slug}/` : (d.pages ?? []).map((p) => p.path).find((p) => p.startsWith("map/")) ?? null;
  return {
    d, slug, group: groupOf(d), rows, colouring: col, words, answers, comparable,
    highest: ranked.slice(0, 3), lowest: ranked.slice(-3).reverse(),
    median: ranked.length >= 5 ? median(ranked.map((r) => r.value)) : null,
    series: rows.filter((r) => r.years > 1).length,
    mapPage, chart: CHART_OF[d.id] ?? null,
  };
});

export const datasetGroups = GROUPS.map((name) => ({ name, slug: name.toLowerCase().replace(/\W+/g, "-"), pages: datasetPages.filter((p) => p.group === name) })).filter((g) => g.pages.length);
