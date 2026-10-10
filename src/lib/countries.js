// Loads the YAML data (see /countries and /segments.yaml) and derives everything the
// pages need: index scores, ranks, averages. Runs once at build time.
import { getCollection } from "astro:content";
import { CHANGE_CATEGORIES, SEGMENT_IDS, STATUS_SECTIONS } from "./segment-ids.js";
export { CHANGE_CATEGORIES };

export const DATA_SNAPSHOT = "2026";
export const REC_LABEL = { legal: "Legal", partial: "Partly legal / tolerated", decrim: "Decriminalized", illegal: "Illegal", death: "Death penalty" };
// from most to least free; also what each status means, shown as a tooltip
export const REC_ORDER = ["legal", "partial", "decrim", "illegal", "death"];
export const REC_HELP = {
  legal: "Adults may legally possess cannabis, within limits",
  partial: "Legal in part of the country or in some settings, or openly tolerated",
  decrim: "Still prohibited, but small amounts bring at most a fine",
  illegal: "A crime, punished with anything from a fine to prison",
  death: "A crime, and the law allows the death penalty for cannabis offences, in practice trafficking",
};
export const MED_LABEL = { yes: "Legal", limited: "Limited", no: "None" };
// Explanations that exist for each country but are not part of the score.
// "Death penalty" comes first and exists only for countries whose law provides for it;
// "Seeds and clones" exists only where it has been researched and carries a status for each.
const CONTEXT = [["death_penalty", "Death penalty"], ["production", "Commercial production"], ["products", "Products"], ["planting", "Seeds and clones"], ["medical", "Medical use"], ["clubs", "Cannabis clubs"], ["black_market", "Black market"], ["driving", "Driving"], ["visitors", "Visitors and foreigners"], ["arrests", "Arrests and prisoners"], ["consequences", "Other consequences"]];
export const CONTEXT_NAMES = CONTEXT.map(([, name]) => name);

// File values → short codes used in class names and filters.
const REC_CODE = { legal: "legal", partial: "partial", decriminalised: "decrim", illegal: "illegal", death: "death" };
const MED_CODE = { legal: "yes", limited: "limited", none: "no" };
const isoDate = (d) => d.toISOString().slice(0, 10);
const pair = (s) => [s.title, s.url];
const plantingOf = ({ seeds, seeds_trade, clones, clones_trade }) => ({ seeds, seeds_trade, clones, clones_trade });

// ── Segments ──────────────────────────────────────────
// Collections come back in no particular order, so put the segments in display order.
export const SEGMENTS = (await getCollection("segments"))
  .map(({ data: s }) => ({ id: s.id, name: s.name, weight: s.weight, desc: s.description, levels: s.levels.map((l) => [l.score, l.text]) }))
  .sort((a, b) => SEGMENT_IDS.indexOf(a.id) - SEGMENT_IDS.indexOf(b.id));
if (SEGMENTS.length !== SEGMENT_IDS.length) throw new Error("segments.yaml must define each of: " + SEGMENT_IDS.join(", "));
const totalWeight = SEGMENTS.reduce((a, s) => a + s.weight, 0);
if (totalWeight !== 100) throw new Error(`segments.yaml: weights add up to ${totalWeight}, expected 100`);

// Points a segment contributes to the 0–100 index.
export const segmentPoints = (segIndex, value) => (SEGMENTS[segIndex].weight * value) / totalWeight * 10;
export const segmentMax = (segIndex) => (SEGMENTS[segIndex].weight / totalWeight) * 100;
const scoreOf = (s) => s.reduce((a, v, i) => a + segmentPoints(i, v), 0);
const scoreList = (scores) => SEGMENTS.map((seg) => scores[seg.id]);
const flagOf = (id) => String.fromCodePoint(...[...id].map((ch) => 0x1f1a5 + ch.charCodeAt(0)));

// ── Countries ─────────────────────────────────────────
// Every file in /countries, scored. Recognised countries and disputed territories are split below.
const everyPlace = (await getCollection("countries"))
  .map(({ id: slug, data }) => {
    const id = slug.toUpperCase();
    const s = scoreList(data.scores);
    const raw = scoreOf(s);
    const cited = (block) => ({ t: block.text, src: block.sources.map((key) => pair(data.sources[key])) });
    return {
      id, slug, raw, s,
      score: Math.round(raw),
      flag: data.flag ?? flagOf(id),
      disputed: data.disputed ?? null, // { part_of, note } for a territory that is not a recognised state
      num: data.iso_numeric ?? null,
      populationByYear: Object.entries(data.population).map(([y, v]) => [+y, v]).sort((a, b) => a[0] - b[0]),
      population: data.population[Object.keys(data.population).sort().at(-1)], // the latest figure
      use: data.cannabis_use, // { prevalence, year?, estimate?, users }
      name: data.name,
      region: data.region,
      rec: REC_CODE[data.recreational],
      med: MED_CODE[data.medical],
      note: data.summary,
      details: {
        reviewed: isoDate(data.updated),
        segments: SEGMENTS.map((seg) => cited(data.segments[seg.id])), // in SEGMENTS order
        context: CONTEXT.map(([key, name]) => (data.context[key] ? { key, name, ...cited(data.context[key]), ...(key === "planting" && plantingOf(data.context[key])), ...(STATUS_SECTIONS[key] && { kind: key, status: data.context[key].status }) } : null)), // null: no such section
        sources: Object.values(data.sources).map(pair),
      },
      planting: data.context.planting ? plantingOf(data.context.planting) : null,
      // one status per section in STATUS_SECTIONS (clubs, driving, visitors), null until researched
      ...Object.fromEntries(Object.keys(STATUS_SECTIONS).map((key) => [key, data.context[key]?.status ?? null])),
      subunitMeta: data.subunits ?? null,
    };
  })
  .sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));

// The index ranks recognised countries. Disputed territories are scored the same way and shown
// alongside, but they take no rank and do not count towards any average.
export const countries = everyPlace.filter((c) => !c.disputed);
export const territories = everyPlace.filter((c) => c.disputed);
export const places = everyPlace; // both, by score: for pages, the map and the table
countries.forEach((c, i) => (c.rank = i + 1));
territories.forEach((t) => {
  t.rank = null;
  t.worldRank = 1 + countries.filter((c) => c.raw > t.raw).length; // where it would sit among countries
  t.disputed.country = countries.find((c) => c.slug === t.disputed.part_of);
  if (!t.disputed.country) throw new Error(`countries/${t.slug}.yaml: disputed.part_of "${t.disputed.part_of}" is not a country`);
});
countries.forEach((c) => {
  const inRegion = countries.filter((x) => x.region === c.region);
  c.regionRank = inRegion.indexOf(c) + 1;
  c.regionCount = inRegion.length;
});

export const regions = [...new Set(countries.map((c) => c.region))].sort();
export const segAvg = SEGMENTS.map((_, i) => countries.reduce((a, c) => a + c.s[i], 0) / countries.length);
export const worldAvg = countries.reduce((a, c) => a + c.raw, 0) / countries.length;

// ── States, provinces and territories of federations ──
const unitEntries = await getCollection("units");

// For a country id, returns { label, plural, intro, sources, units } with each unit scored,
// ranked within its country, and placed where it would sit among countries. Undefined if none.
export function subunitsOf(id) {
  const country = countries.find((c) => c.id === id);
  const meta = country?.subunitMeta;
  if (!meta) return undefined;
  const groupSources = meta.sources.map(pair);
  const units = unitEntries
    .filter((e) => e.id.startsWith(`${country.slug}/`))
    .map(({ id: path, data }) => {
      const s = scoreList(data.scores);
      const raw = scoreOf(s);
      return {
        id: path.split("/")[1], raw, s,
        score: Math.round(raw),
        name: data.name,
        rec: REC_CODE[data.recreational],
        med: MED_CODE[data.medical],
        note: data.summary,
        reviewed: isoDate(data.updated),
        worldRank: 1 + countries.filter((c) => c.raw > raw).length,
        seg: SEGMENTS.map((seg) => data.segments[seg.id]),          // six explanations, in SEGMENTS order
        sources: [...data.sources.map(pair), ...groupSources],      // the unit's own source first
      };
    })
    .sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));
  units.forEach((x, i) => (x.rank = i + 1));
  return { label: meta.label, plural: meta.plural, intro: meta.intro, sources: groupSources, units };
}

// Where no first law is known for a country, its first restriction is an estimate: it is assumed
// to have come by default between the 1925 Geneva convention and the 1961 Single Convention.
// An entry can narrow this with its own `window`.
export const ESTIMATE_WINDOW = [1925, 1961];
// How far an entry can be trusted. Before-scores are editorial estimates in every case.
export const CONFIDENCE = {
  checked: { key: "checked", mark: "✓", label: "Checked", help: "The date and the event were compared with a source that was read" },
  unchecked: { key: "unchecked", mark: "?", label: "Not yet checked", help: "Written from general knowledge; the source listed has not been checked against it" },
  estimated: { key: "estimated", mark: "≈", label: "Estimated", help: "No first law is recorded; the date is an assumption" },
};
// ── Changes: developments that moved a score, newest first ──
// Each entry records the segment scores before the change. The scores after it are the "before"
// of the same country's next change, or the country's current scores if there is none.
// Where a date falls on a time axis: the middle of the month or year when that is all we know.
// Entries are ordered by this everywhere, so a bare year never sorts ahead of where it is drawn.
export const dateTime = (iso) => Date.parse(iso.length === 4 ? `${iso}-07-01` : iso.length === 7 ? `${iso}-15` : iso);
const changeEntries = (await getCollection("changes")).map(({ data }) => data).sort((a, b) => dateTime(a.date) - dateTime(b.date) || a.id.localeCompare(b.id));
export const changes = changeEntries
  .map((data, i) => {
    const country = data.country ? places.find((c) => c.slug === data.country) : null; // a country or a disputed territory
    if (data.country && !country) throw new Error(`changes.yaml: "${data.id}" refers to unknown country "${data.country}"`);
    // context only (a treaty, report or ruling): part of the history, but it moves no score
    const kind = CHANGE_CATEGORIES[data.category]; // { emoji, label, help }
    if (!data.before) return { ...data, kind, country, place: country ?? { flag: "🌐", name: "International" }, sources: data.sources.map(pair), source: pair(data.sources[0]), confidence: CONFIDENCE[data.estimate ? "estimated" : data.checked ? "checked" : "unchecked"], score: null, segments: [] };
    const next = changeEntries.slice(i + 1).find((x) => x.country === data.country && x.before);
    const before = scoreList(data.before);
    const after = next ? scoreList(next.before) : country.s;
    if (before.every((v, k) => v === after[k])) throw new Error(`changes.yaml: "${data.id}" has the same scores before and after`);
    return {
      ...data,
      kind,
      window: data.estimate ? data.window ?? ESTIMATE_WINDOW : null, // the years an estimate is spread over
      country,
      place: country,
      latest: !next, // the country's most recent change: "after" is its current score
      sources: data.sources.map(pair), source: pair(data.sources[0]), confidence: CONFIDENCE[data.estimate ? "estimated" : data.checked ? "checked" : "unchecked"],
      raw: { before: scoreOf(before), after: scoreOf(after) },
      score: { before: Math.round(scoreOf(before)), after: Math.round(scoreOf(after)) },
      // every segment, with its score before and after
      segments: SEGMENTS.map((seg, k) => ({ name: seg.name, weight: seg.weight, before: before[k], after: after[k] })),
    };
  })
  .reverse();


// A country's population at a moment in time, on a straight line between its snapshots.
const MS_YEAR = 365.25 * 24 * 3600 * 1000;
function populationAt(c, t) {
  const year = 1970 + t / MS_YEAR;
  const snaps = c.populationByYear;
  if (year <= snaps[0][0]) return snaps[0][1];
  if (year >= snaps.at(-1)[0]) return snaps.at(-1)[1];
  const i = snaps.findIndex(([y]) => y > year);
  const [y0, v0] = snaps[i - 1], [y1, v1] = snaps[i];
  return v0 + ((v1 - v0) * (year - y0)) / (y1 - y0);
}

// A country's score at a moment in time, from its recorded changes. A change with a known date is
// a step. An estimated one rises or falls in a straight line across the estimate window, so that
// a guess never shows up as a sudden drop on one day.
const scoredByCountry = new Map(countries.map((c) => [c, changes.filter((ch) => ch.country === c && ch.score).reverse()])); // oldest first
function scoreAt(c, t) {
  let value = c.raw;
  const list = scoredByCountry.get(c);
  if (list.length) value = list[0].raw.before;
  for (const ch of list) {
    if (ch.estimate) {
      const [from, to] = ch.window.map((y) => Date.UTC(y, 0, 1));
      if (t <= from) break;
      value = t >= to ? ch.raw.after : ch.raw.before + ((ch.raw.after - ch.raw.before) * (t - from)) / (to - from);
    } else if (t >= dateTime(ch.date)) value = ch.raw.after;
    else break;
  }
  return value;
}

// World average over time, oldest first. `weight(country, time)` gives each country's share:
// the same for all in the plain average, or its population at that time.
// There is a point at every dated change, and one each New Year so that slow shifts (estimated
// changes, and populations growing at different rates) show up as well.
const CHART_FROM = 1900;
function averageOverTime(weight) {
  const at = (t) => {
    let sum = 0, total = 0;
    for (const c of countries) {
      const w = weight(c, t);
      sum += scoreAt(c, t) * w;
      total += w;
    }
    return sum / total;
  };
  const events = changes.filter((ch) => ch.score && !ch.estimate && !ch.country.disputed).map((ch) => ({ change: ch, date: ch.date, t: dateTime(ch.date) }));
  for (let year = CHART_FROM; year <= +DATA_SNAPSHOT; year++) events.push({ change: null, date: `${year}-01-01`, t: Date.UTC(year, 0, 1) });
  events.sort((a, b) => a.t - b.t);
  // changes on the same day are applied one after another, in a fixed order
  return events.map((e) => {
    if (!e.change) return { change: null, date: e.date, before: at(e.t - 1), after: at(e.t) };
    const c = e.change.country;
    const w = weight(c, e.t);
    let total = 0;
    for (const x of countries) total += weight(x, e.t);
    const after = at(e.t);
    return { change: e.change, date: e.date, before: after - ((e.change.raw.after - e.change.raw.before) * w) / total, after };
  });
}
export const averageHistory = averageOverTime(() => 1);
export const averageHistoryByPopulation = averageOverTime(populationAt);

// ── History pages ──
// The History list is split into periods so that no page is too long or too short. It starts from
// decades: a crowded decade is cut into two halves, and quiet decades are merged with their
// neighbours until a page has enough on it. Estimated entries have no real date and are left out.
const PAGE_MIN = 24, PAGE_MAX = 60;
export const historyPeriods = (() => {
  const dated = changes.filter((ch) => !ch.estimate); // newest first
  const year = (ch) => +ch.date.slice(0, 4);
  const thisYear = +DATA_SNAPSHOT;
  const count = (from, to) => dated.filter((ch) => year(ch) >= from && year(ch) <= to).length;
  // decades from the current one back to the oldest entry, crowded ones in two halves
  const spans = [];
  for (let d = Math.floor(thisYear / 10) * 10; d >= Math.floor(year(dated.at(-1)) / 10) * 10; d -= 10) {
    if (count(d, d + 9) > PAGE_MAX) spans.push([d + 5, d + 9], [d, d + 4]);
    else spans.push([d, d + 9]);
  }
  // merge quiet spans into the one before them in time order (walking from newest to oldest)
  const merged = [];
  for (const [from, to] of spans) {
    const last = merged.at(-1);
    if (last && count(last.from, last.to) < PAGE_MIN) last.from = from;
    else merged.push({ from, to });
  }
  // a quiet tail (the oldest entries) joins the period after it
  if (merged.length > 1 && count(merged.at(-1).from, merged.at(-1).to) < PAGE_MIN) merged.at(-2).from = merged.pop().from;
  return merged.map(({ from, to }, i) => {
    const items = dated.filter((ch) => year(ch) >= from && year(ch) <= to);
    const first = i === merged.length - 1 ? year(items.at(-1)) : from; // the oldest page starts at its first entry
    const end = Math.min(to, thisYear);
    const label = first % 10 === 0 && end === first + 9 ? `${first}s` : `${first}–${end}`;
    return { slug: `${first}-${end}`, label, from: first, to: end, items };
  });
})();

// Review dates are stored as YYYY-MM-DD; this is how they are shown everywhere.
// A date without a day ("2026-02") is shown as month and year, and a bare year as the year.
export const formatDate = (iso) =>
  iso.length === 4 ? iso : new Date(`${iso.length === 7 ? iso + "-01" : iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: iso.length === 7 ? undefined : "numeric", month: "long", year: "numeric", timeZone: "UTC" });
// How an entry's date is shown: an estimated one as its window.
export const changeDate = (ch) => (ch.estimate ? `Between ${ch.window[0]} and ${ch.window[1]} (estimate)` : formatDate(ch.date));


// The most recent review date across every country and state file.
export const lastUpdated = [
  ...countries.map((c) => c.details.reviewed),
  ...unitEntries.map((e) => isoDate(e.data.updated)),
].sort().at(-1);
