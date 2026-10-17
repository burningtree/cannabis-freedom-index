// The data offered for download and in the feed, built from the same objects the pages use.
import { SEGMENTS, DATA_SNAPSHOT, REC_LABEL, MED_LABEL, places, changes, formatDate, dateTime, segmentPoints } from "./countries.js";
import { archivedUrl } from "./archive.js";
import { tierOf } from "./tiers.js";
import { priceObservations } from "./prices.js";

export const SITE = "https://cannabisfreedom.fyi";

// One row per country, disputed territory or dependency.
export const scoreRows = places.map((c) => ({
  id: c.id,
  iso_numeric: c.num ?? "", // ISO 3166-1 numeric, for joining with other datasets; empty for disputed territories
  name: c.name,
  region: c.region,
  disputed: Boolean(c.disputed),
  dependency_of: c.dependency?.of ?? "", // a Crown Dependency or overseas territory: the country that answers for it
  rank: c.rank ?? "",
  score: c.score,
  score_exact: c.raw,
  tier: tierOf(c.raw).name,
  ...Object.fromEntries(SEGMENTS.map((seg, i) => [seg.id, c.s[i]])),
  recreational: REC_LABEL[c.rec],
  medical: MED_LABEL[c.med],
  seeds: c.planting?.seeds ?? "", // empty until researched; see PLANTING_STATUS and PLANTING_TRADE
  seeds_trade: c.planting?.seeds_trade ?? "",
  clones: c.planting?.clones ?? "",
  clones_trade: c.planting?.clones_trade ?? "",
  clubs: c.clubs ?? "", // these three are empty until researched; see STATUS_SECTIONS
  driving: c.driving ?? "",
  visitors: c.visitors ?? "",
  population: c.population,
  users: c.use.users,
  users_share_percent: c.use.prevalence,
  users_estimated: Boolean(c.use.estimate),
  reviewed: c.details.reviewed,
}));

// One row per History entry, newest first. Entries with no real date (estimates) are marked.
export const historyRows = changes.map((ch) => ({
  id: ch.id,
  date: ch.date,
  country: ch.country?.id ?? "",
  place: ch.place.name,
  category: ch.category,
  title: ch.title,
  description: ch.description,
  score_before: ch.score?.before ?? "",
  score_after: ch.score?.after ?? "",
  confidence: ch.confidence.key,
  date_estimated: Boolean(ch.estimate),
  sources: ch.sources.map(([title]) => title).join(" | "),
  source_citations: ch.sources.map(([, , citation]) => citation).join(" | "),
  source_urls: ch.sources.map(([, url]) => url ?? "").join(" | "),
  source_archive_urls: ch.sources.map(([, url]) => archivedUrl(url) ?? "").join(" | "), // same order; empty where no copy is recorded
}));

// ── The panel: every place in every year ──
// One row per place and year, from 1900 to this edition: the six segment scores and the index
// score as they stood at the end of that year, rebuilt from the place's scored history entries.
// `basis` says what a row rests on:
//   recorded      after at least one dated change: the scores follow from entries with a date
//   interpolated  inside the window of an estimated first restriction: no date is known, and the
//                 scores move in a straight line across the window (see ESTIMATE_WINDOW)
//   baseline      before the place's first recorded change: its starting scores, an assumption
export const PANEL_FROM = 1900;
const scoredOf = new Map(places.map((c) => [c, changes.filter((ch) => ch.country === c && ch.score).reverse()])); // oldest first
function segmentsAt(c, t) {
  const list = scoredOf.get(c);
  let s = list.length ? list[0].segments.map((x) => x.before) : c.s;
  let basis = list.length ? "baseline" : "recorded"; // a place with no scored entry has only today's scores
  for (const ch of list) {
    const before = ch.segments.map((x) => x.before), after = ch.segments.map((x) => x.after);
    if (ch.estimate) {
      const [from, to] = ch.window.map((y) => Date.UTC(y, 0, 1));
      if (t <= from) break;
      if (t >= to) { s = after; basis = "recorded"; continue; }
      const share = (t - from) / (to - from);
      s = before.map((v, k) => v + (after[k] - v) * share);
      basis = "interpolated";
    } else if (t >= dateTime(ch.date)) { s = after; basis = "recorded"; }
    else break;
  }
  return { s, basis };
}
const round = (v, digits) => Math.round(v * 10 ** digits) / 10 ** digits;
export const panelRows = places.flatMap((c) => {
  const rows = [];
  for (let year = PANEL_FROM; year <= +DATA_SNAPSHOT; year++) {
    const { s, basis } = segmentsAt(c, Date.UTC(year, 11, 31, 23, 59, 59));
    rows.push({
      id: c.id,
      iso_numeric: c.num ?? "",
      name: c.name,
      year,
      score: round(s.reduce((a, v, k) => a + segmentPoints(k, v), 0), 1),
      ...Object.fromEntries(SEGMENTS.map((seg, k) => [seg.id, round(s[k], 2)])),
      basis,
      disputed: Boolean(c.disputed),
      dependency_of: c.dependency?.of ?? "",
    });
  }
  return rows;
});

// One row per sourced price observation, newest first. Older rows form the price history.
export const priceRows = priceObservations.map((p) => ({
  country: p.country.slug,
  place: p.country.name,
  date: p.date,
  market: p.market,
  price_per_gram: p.price,
  currency: p.currency,
  usd_per_gram: p.usd,
  note: p.note ?? "",
  source: p.source.title,
  source_url: p.source.url,
}));

// Changes that moved a score and have a real date: the changelog and the feed.
export const scoreChanges = changes.filter((ch) => ch.score && !ch.estimate);
export { formatDate, dateTime };

const cell = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export const toCsv = (rows) => [Object.keys(rows[0]).join(","), ...rows.map((r) => Object.values(r).map(cell).join(","))].join("\n") + "\n";
export const file = (body, type) => new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });
