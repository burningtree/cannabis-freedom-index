// One small JSON file per country with its explanations and sources, generated from the
// YAML in /countries. The compare page fetches these on demand.
import { countries } from "../../lib/countries.js";

export function getStaticPaths() {
  return countries.map((c) => ({ params: { id: c.slug }, props: { c } }));
}

export function GET({ props }) {
  const { c } = props;
  const entry = ({ t, src }) => ({ t, src });
  const body = {
    id: c.id,
    note: c.note,
    reviewed: c.details.reviewed,
    segments: c.details.segments.map(entry),
    context: c.details.context.map(entry),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
