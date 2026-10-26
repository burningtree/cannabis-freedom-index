// Keep all observations in history, but only eligible observations can colour a country or
// supply its price headline. The caller supplies history newest first.
export function latestComparablePrices(history) {
  const latest = {};
  for (const price of history) {
    if (price.comparison === false) continue;
    latest[price.market] ??= price;
  }
  return latest;
}

// Source product caveats must not silently become flower prices, even as retained observations.
export const isMixedCannabisPrice = (note = "") => /both herb and resin|herb\s*\+\s*resin|does not separate herb from resin|combined herb and resin/i.test(note);
