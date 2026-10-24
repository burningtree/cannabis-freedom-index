// What the map's hover box says in words: for every place, a short form of its summary, of each
// segment's explanation and of the context sections the map can be coloured by. Fetched once, the
// first time a country is hovered, so the home page itself carries only scores.
//   n: summary   s: the six segment explanations, in SEGMENTS order
//   x: context sections by key (planting, medical, clubs, driving, visitors)
// States and provinces are keyed like their map shapes ("us/ca") and carry n and s only.
import { places, countries, subunitsOf } from "../lib/countries.js";
import { short } from "../lib/short.js";

const MAP_CONTEXT = ["planting", "medical", "clubs", "driving", "visitors"];

const notes = {};
for (const c of places) {
  const x = {};
  for (const ctx of c.details.context) if (ctx && MAP_CONTEXT.includes(ctx.key)) x[ctx.key] = short(ctx.t);
  notes[c.id] = { n: short(c.note), s: c.details.segments.map((seg) => short(seg.t)), x };
}
for (const c of countries) {
  for (const u of subunitsOf(c.id)?.units ?? []) {
    notes[`${c.slug}/${u.id}`] = { n: short(u.note), s: u.seg.map((seg) => short(seg?.text ?? seg)) };
  }
}

export const GET = () => new Response(JSON.stringify(notes), { headers: { "Content-Type": "application/json" } });
