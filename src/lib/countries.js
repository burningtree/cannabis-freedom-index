// Derived data: index scores, ranks and averages computed once at build time.
import { SEGMENTS, COUNTRIES } from "../data/data.js";

const totalWeight = SEGMENTS.reduce((a, s) => a + s.weight, 0);
const flagOf = (id) => String.fromCodePoint(...[...id].map((ch) => 0x1f1a5 + ch.charCodeAt(0)));

// Points a segment contributes to the 0–100 index.
export const segmentPoints = (segIndex, value) => (SEGMENTS[segIndex].weight * value) / totalWeight * 10;
export const segmentMax = (segIndex) => (SEGMENTS[segIndex].weight / totalWeight) * 100;

export const countries = COUNTRIES.map((c) => {
  const raw = c.s.reduce((a, v, i) => a + segmentPoints(i, v), 0);
  return { ...c, raw, score: Math.round(raw), flag: flagOf(c.id), slug: c.id.toLowerCase() };
}).sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));

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
import { SUBUNITS } from "../data/subunits.js";
import { SUBUNIT_DETAILS, unitSource } from "../data/subunit-details.js";
import { DETAILS } from "../data/details.js";

const scoreOf = (s) => s.reduce((a, v, i) => a + segmentPoints(i, v), 0);

// Review dates are stored as YYYY-MM-DD; this is how they are shown everywhere.
export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// The most recent review date across every country and state entry.
export const lastUpdated = [
  ...Object.values(DETAILS).map((d) => d.reviewed),
  ...Object.values(SUBUNITS).map((g) => g.reviewed),
].filter(Boolean).sort().at(-1);

// For a country id, returns { label, plural, intro, sources, units } with each unit scored,
// ranked within its country, and placed where it would sit among countries. Undefined if none.
export function subunitsOf(id) {
  const group = SUBUNITS[id];
  if (!group) return undefined;
  const units = group.units
    .map((x) => {
      const raw = scoreOf(x.s);
      const own = unitSource(id, x);
      return {
        ...x, raw, score: Math.round(raw),
        worldRank: 1 + countries.filter((c) => c.raw > raw).length,
        seg: SUBUNIT_DETAILS[id]?.[x.id] ?? null,           // six explanations, in SEGMENTS order
        sources: [...(own ? [own] : []), ...group.sources],  // the unit's own source first
      };
    })
    .sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));
  units.forEach((x, i) => (x.rank = i + 1));
  return { ...group, units };
}
