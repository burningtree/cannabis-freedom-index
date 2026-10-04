// Loads the YAML data (see /countries and /segments.yaml) and derives everything the
// pages need: index scores, ranks, averages. Runs once at build time.
import { getCollection } from "astro:content";
import { SEGMENT_IDS } from "./segment-ids.js";

export const DATA_SNAPSHOT = "2026";
export const REC_LABEL = { legal: "Legal", partial: "Partly legal / tolerated", decrim: "Decriminalised", illegal: "Illegal" };
export const MED_LABEL = { yes: "Legal", limited: "Limited", no: "None" };
// Explanations that exist for each country but are not part of the score.
const CONTEXT = [["production", "Commercial production"], ["products", "Products"], ["medical", "Medical use"], ["consequences", "Other consequences"]];
export const CONTEXT_NAMES = CONTEXT.map(([, name]) => name);

// File values → short codes used in class names and filters.
const REC_CODE = { legal: "legal", partial: "partial", decriminalised: "decrim", illegal: "illegal" };
const MED_CODE = { legal: "yes", limited: "limited", none: "no" };
const isoDate = (d) => d.toISOString().slice(0, 10);
const pair = (s) => [s.title, s.url];

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
export const countries = (await getCollection("countries"))
  .map(({ id: slug, data }) => {
    const id = slug.toUpperCase();
    const s = scoreList(data.scores);
    const raw = scoreOf(s);
    const cited = (block) => ({ t: block.text, src: block.sources.map((key) => pair(data.sources[key])) });
    return {
      id, slug, raw, s,
      score: Math.round(raw),
      flag: flagOf(id),
      num: data.iso_numeric ?? null,
      name: data.name,
      region: data.region,
      rec: REC_CODE[data.recreational],
      med: MED_CODE[data.medical],
      note: data.summary,
      details: {
        reviewed: isoDate(data.updated),
        segments: SEGMENTS.map((seg) => cited(data.segments[seg.id])), // in SEGMENTS order
        context: CONTEXT.map(([key, name]) => ({ name, ...cited(data.context[key]) })),
        sources: Object.values(data.sources).map(pair),
      },
      subunitMeta: data.subunits ?? null,
    };
  })
  .sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));

countries.forEach((c, i) => (c.rank = i + 1));
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

// Review dates are stored as YYYY-MM-DD; this is how they are shown everywhere.
export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// The most recent review date across every country and state file.
export const lastUpdated = [
  ...countries.map((c) => c.details.reviewed),
  ...unitEntries.map((e) => isoDate(e.data.updated)),
].sort().at(-1);
