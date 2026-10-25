// First-restriction quartiles describe the dated sample, never the estimated dates.
export function firstRestrictionSample(firsts) {
  return {
    undated: firsts.filter(({ ch }) => ch.estimate).length,
    dated: firsts.filter(({ ch }) => !ch.estimate).map((f) => ({ ...f, year: +String(f.ch.date).slice(0, 4) })),
  };
}

// Topic groups include unscored reports and events. They do not measure legal direction.
export const HISTORY_TOPICS = [
  { id: "tightening", label: "Bans and tightening", cats: ["ban", "tightening", "death"], color: "var(--t1)" },
  { id: "enforcement", label: "Enforcement", cats: ["enforcement"], color: "var(--t0)" },
  { id: "easing", label: "Easing and legalisation", cats: ["easing", "legalisation"], color: "var(--t5)" },
  { id: "medical", label: "Medical and hemp", cats: ["medical", "hemp"], color: "var(--t4)" },
  { id: "debate", label: "Debate and culture", cats: ["debate", "culture"], color: "var(--t3)" },
  { id: "law", label: "Treaties and other law", cats: ["international", "other"], color: "var(--muted)" },
];
export function topicCounts(changes, decades) {
  return HISTORY_TOPICS.map((g) => decades.map((d) => changes.filter((ch) => g.cats.includes(ch.category) && !ch.estimate && +String(ch.date).slice(0, 4) >= d && +String(ch.date).slice(0, 4) < d + 10).length));
}

// Only internet has a dedicated map. Other development measures remain readable without a link.
export const DEVELOPMENT_MEASURES = [
  { label: "People using the internet", field: "internet", href: "map/internet/" },
  { label: "Living in towns and cities", field: "urban", href: null },
  { label: "Aged 65 or over", field: "aged_65", href: null },
  { label: "Life expectancy", field: "life_expectancy", href: null },
  { label: "Enrolled in higher education", field: "higher_education", href: null },
];

// Never combine a historical street price with a later wage: use the latest common year.
export function matchedPriceWage(prices = [], wages = []) {
  return prices.filter((p) => p.year >= 2018 && p.herb_eur > 0)
    .map((price) => ({ price, wage: wages.find((w) => w.year === price.year && w.monthly_eur > 0) }))
    .filter((p) => p.wage).sort((a, b) => b.price.year - a.price.year)[0];
}

// Hold membership constant at the countries reporting at both endpoints. Omit incomplete years.
export function matchedThcPanel(years) {
  if (!years.length) return { cohort: [], years: [] };
  const last = new Set(years.at(-1).rows.map((r) => r.c.id));
  const cohort = years[0].rows.map((r) => r.c.id).filter((id) => last.has(id));
  return { cohort, years: years.map((y) => ({ ...y, rows: y.rows.filter((r) => cohort.includes(r.c.id)) }))
    .filter((y) => cohort.length > 0 && y.rows.length === cohort.length) };
}

export function policeTrend(rows = []) {
  const usable = rows.filter((r) => r.year >= 2020 && Number.isFinite(r.offences)).sort((a, b) => a.year - b.year);
  if (usable.length < 2) return null;
  const first = usable.at(-2), last = usable.at(-1);
  return { first, last, change: first.offences > 0 ? (last.offences / first.offences - 1) * 100 : null };
}

// Croatia reports a stock of all clients, not the annual flow used in this table.
export function annualTreatment(country) {
  return country.id.toLowerCase() === 'hr' ? null : country.datasets.treatment;
}
