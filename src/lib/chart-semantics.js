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
