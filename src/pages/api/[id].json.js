// One small JSON file per country with its explanations and sources.
// The compare page fetches these on demand instead of shipping every write-up up front.
import { SEGMENTS, CONTEXT } from "../../data/data.js";
import { DETAILS } from "../../data/details.js";
import { countries } from "../../lib/countries.js";

export function getStaticPaths() {
  return countries.map((c) => ({ params: { id: c.slug }, props: { c } }));
}

export function GET({ props }) {
  const { c } = props;
  const d = DETAILS[c.id];
  const entry = (k) => d && { t: d.seg[k].t, src: d.seg[k].src.map((key) => d.sources[key]) };
  const body = {
    id: c.id,
    note: c.note,
    reviewed: d?.reviewed ?? null,
    segments: SEGMENTS.map((s) => entry(s.detail)),
    context: CONTEXT.map(([, k]) => entry(k)),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
