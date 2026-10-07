// Loads append-only flower-price observations and derives each country's latest market price.
import { getCollection } from "astro:content";
import { places, dateTime } from "./countries.js";

export const PRICE_MARKETS = ["street", "medical"];
export const PRICE_MARKET_LABEL = { street: "Street flower", medical: "Medical flower" };

const bySlug = new Map(places.map((c) => [c.slug, c]));
export const priceObservations = (await getCollection("prices"))
  .map(({ data }) => {
    const country = bySlug.get(data.country);
    if (!country) throw new Error(`prices.yaml refers to unknown country "${data.country}"`);
    return { ...data, country };
  })
  .sort((a, b) => dateTime(b.date) - dateTime(a.date));

const seen = new Set();
for (const p of priceObservations) {
  const key = `${p.country.slug}/${p.market}/${p.date}`;
  if (seen.has(key)) throw new Error(`prices.yaml has duplicate observation "${key}"`);
  seen.add(key);
}

export function priceHistoryFor(id) {
  const slug = id.toLowerCase();
  return priceObservations.filter((p) => p.country.slug === slug);
}

export function latestPricesFor(id) {
  const latest = {};
  for (const p of priceHistoryFor(id)) {
    latest[p.market] ??= p;
  }
  return latest;
}

export function flatLatestPricesFor(id) {
  const latest = latestPricesFor(id);
  return Object.fromEntries(PRICE_MARKETS.flatMap((market) => {
    const p = latest[market];
    return p ? [[market, { usd: p.usd, price: p.price, currency: p.currency, date: p.date }]] : [];
  }));
}

export const formatPrice = (p) => p ? `${p.price.toLocaleString("en-GB", { maximumFractionDigits: 2 })} ${p.currency}/g` : "—";
export const formatUsdPrice = (p) => p ? `$${p.usd.toFixed(2)}/g` : "—";
