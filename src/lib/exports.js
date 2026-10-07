// The data offered for download and in the feed, built from the same objects the pages use.
import { SEGMENTS, REC_LABEL, MED_LABEL, places, changes, formatDate, dateTime } from "./countries.js";
import { tierOf } from "./tiers.js";
import { priceObservations } from "./prices.js";

export const SITE = "https://cannabisfreedom.fyi";

// One row per country or disputed territory.
export const scoreRows = places.map((c) => ({
  id: c.id,
  name: c.name,
  region: c.region,
  disputed: Boolean(c.disputed),
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
  source_urls: ch.sources.map(([, url]) => url).join(" | "),
}));

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
