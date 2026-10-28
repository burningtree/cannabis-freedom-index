// How the outside datasets read for one country: the figures written out as datasets.yaml sets
// under `profile`, the headline figure over the years, where the country stands among all the
// countries a dataset covers, and which group and colours it takes. Shared by the profile's
// Datasets section (CountryDatasetTab.astro) and the compare page's data (src/pages/api/[id].json.js).
import { places } from "./countries.js";
import { useAges } from "./use-labels.js";

const num = (n) => n.toLocaleString("en-GB");
const FORMAT = {
  number: (v) => num(v),
  percent: (v) => `${v}%`,
  decimal: (v) => v.toFixed(2),
  rank: (v, d) => `#${v} of ${d.total}`,
  text: (v, d, f) => f.values?.[v] ?? String(v).replace(/(\d)-(\d)/g, "$1–$2"),
};
// one figure of a row, written out; undefined when the row lacks it
export const figure = (c, d, row, name) => {
  if (name === "per") return d.map?.per ? d.map.format(d.map.value(row, c)) : undefined;
  const f = d.fields[name];
  if (!f) return row[name] != null ? String(row[name]) : undefined; // a series' year
  return row[name] == null ? undefined : FORMAT[f.format ?? (f.type === "text" ? "text" : "number")](row[name], d, f);
};
// a template such as "{users} people · survey {period}": each part whose figures are all there
export const fill = (c, d, row, template = "") => template.split(" · ").map((part) => {
  let missing = false;
  const text = part.replace(/\{(\w+)\}/g, (_, name) => figure(c, d, row, name) ?? ((missing = true), ""));
  return missing ? null : text.trim();
}).filter(Boolean).join(" · ");
// the headline's first figure, with any sign before it ("€"), is set large: [figure, the words after it]
export const headline = (c, d, row) => {
  if (d.id === "cannabis_use") return [figure(c, d, row, "prevalence"), `of people aged ${useAges(row)}`];
  const m = d.profile.headline.match(/^([^{]*)\{(\w+)\}(.*)$/);
  return m ? [m[1] + (figure(c, d, row, m[2]) ?? ""), fill(c, d, row, m[3])] : ["", fill(c, d, row, d.profile.headline)];
};
// the field a headline is about
export const headField = (d) => (d.profile.headline.match(/\{(\w+)\}/) ?? [])[1];
// the number a headline field stands for, for charts and comparisons
export const valueOf = (c, d, row, name = headField(d)) => (name === "per" ? d.map.value(row, c) : row?.[name]);

// What a higher figure means for people who use cannabis, for the colours: 1 freer (green, as the
// index's free end), -1 harsher (red, as its prohibition end), with the words for the two ends of
// the scale; a dataset not listed (use, research, hemp …) is neither, and takes the map's blue scale.
export const TONES = {
  hfi: [1, "Less free", "Freer"], civil_liberties: [1, "Fewer liberties", "More liberties"],
  osm_shops: [1, "Fewer shops", "More shops"], canada_sourcing: [1, "Less legal", "More legal"],
  pew_marijuana: [-1, "Fewer disapprove", "More disapprove"], police_possession: [-1, "Fewer", "More"],
  cannabis_offences: [-1, "Fewer", "More"], seizures: [-1, "Less seized", "More seized"],
};
export const POLARITY = Object.fromEntries(Object.entries(TONES).map(([id, [sign]]) => [id, sign]));
// a position from 0 (lowest) to 1 (highest) as one of the index's colours, --t1 (harsh) to --t5 (free)
export const toneAt = (at, polarity) => `var(--t${1 + Math.round((polarity > 0 ? at : 1 - at) * 4)})`;
// the chart on the Charts page that uses the dataset
export const CHART_OF = {
  cannabis_use: "use", pew_marijuana: "opinion", cannabis_offences: "punished", prices_europe: "price", potency_europe: "thc-per-euro",
  hemp: "hemp", research_papers: "research", hfi: "freedom", espad_availability: "easy-to-get", wastewater: "wastewater",
  colonial_links: "empire", canada_sourcing: "sourcing", canada_revenue: "state-merchant", population: "users-treemap",
  espad_lifetime: "teen-trends", alcohol: "alcohol", government_effectiveness: "state-capacity", minimum_wage: "work-for-a-gram",
  corruption: "corruption", religion: "religion", gdp: "what-goes-with-it", development: "what-goes-with-it",
  wikipedia_views: "looked-it-up", clinical_trials: "trials", cannabis_parties: "parties", treatment: "punish-or-treat",
  gallup_us: "opinion-gap", news: "in-the-news",
};
export const GROUPS = ["Use", "Law", "Society", "Plant and market"];
// datasets without a map view of their own sit with the views they belong to
const GROUP_OF = { cannabis_use: "Use", youth_use: "Use", canada_sourcing: "Use", canada_revenue: "Society", colonial_links: "Society", religion: "Society", population: "Society", book_words: "Society", gallup_us: "Society", wikipedia_views: "Society", cannabis_parties: "Society" };
export const groupOf = (d) => GROUP_OF[d.id] ?? d.map?.group ?? "Plant and market";

// Where the country stands among every place the dataset covers, by its headline figure (the
// latest year of a series): the share of them with a lower figure. Null for text and ranks.
export const standing = (c, d) => {
  if (d.id === "cannabis_use") return null; // differing survey ages cannot support a country percentile
  const name = headField(d), f = d.fields[name];
  if (!name || (f && (f.type === "text" || f.format === "rank"))) return null;
  const latest = (place) => {
    const data = d.values[place.slug];
    if (!data) return null;
    const row = Array.isArray(data) ? data.findLast((r) => r[name] != null || name === "per") : data;
    return row ? valueOf(place, d, row, name) : null;
  };
  const all = places.filter((x) => !x.territory).map(latest).filter((v) => Number.isFinite(v));
  const mine = latest(c);
  const mapValue = (() => { if (!d.map) return null; const data = d.values[c.slug]; const row = Array.isArray(data) ? data.findLast((r) => r[d.map.field] != null) : data; return row ? d.map.value(row, c) : null; })();
  if (!Number.isFinite(mine) || all.length < 5) return null;
  const below = all.filter((v) => v < mine).length, same = all.filter((v) => v === mine).length;
  const at = (below + same / 2) / all.length;
  // its colour step, 0 to 4, as on the dataset's map view (--u0…--u4); without a map, its fifth of the countries
  let step = Math.min(4, Math.floor(at * 5));
  if (Number.isFinite(mapValue)) { step = 0; while (step < 4 && mapValue >= d.map.steps[step + 1][0]) step++; }
  return { at, n: all.length, below: Math.round((below / all.length) * 100), step, label: d.map ? d.map.steps[step][1] : null };
};
