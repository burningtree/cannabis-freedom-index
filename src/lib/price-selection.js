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
