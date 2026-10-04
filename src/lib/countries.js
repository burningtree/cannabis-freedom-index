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
