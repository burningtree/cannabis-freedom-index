// One small JSON file per country with its explanations and sources, generated from the
// YAML in /countries. The compare page fetches these on demand.
import { places } from "../../lib/countries.js";
import { flatLatestPricesFor } from "../../lib/prices.js";
import { SHOW_PRICES } from "../../lib/config.js";

export function getStaticPaths() {
  return places.map((c) => ({ params: { id: c.slug }, props: { c } }));
}

export function GET({ props }) {
  const { c } = props;
  const entry = ({ t, src }) => ({ t, src });
  const body = {
    id: c.id,
    note: c.note,
    reviewed: c.details.reviewed,
    ...(SHOW_PRICES && { prices: flatLatestPricesFor(c.id) }),
    segments: c.details.segments.map(entry),
    context: c.details.context.map((x) => x && entry(x)),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
