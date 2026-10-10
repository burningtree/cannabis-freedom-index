// Every page of the site, for search engines. Linked from robots.txt.
import { places, countries, changes, subunitsOf, historyPeriods, CHANGE_CATEGORIES } from "../lib/countries.js";
import { SITE } from "../lib/exports.js";

export function GET({ site }) {
  const root = (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
  const latest = places.map((c) => c.details.reviewed).sort().at(-1);
  // [path, last change (YYYY-MM-DD, optional), priority]
  const pages = [
    ["", latest, 1],
    ["can-i/", latest, 0.8],
    ["history/", latest, 0.8],
    ["compare/", latest, 0.6],
    ["changelog/", latest, 0.5],
    ["data/", latest, 0.5],
    ...places.map((c) => [`country/${c.slug}/`, c.details.reviewed, 0.9]),
    ...countries.flatMap((c) => (subunitsOf(c.id)?.units ?? []).map((sub) => [`country/${c.slug}/${sub.id}/`, c.details.reviewed, 0.7])),
    ...historyPeriods.slice(1).map((p) => [`history/period/${p.slug}/`, null, 0.4]),
    ...Object.keys(CHANGE_CATEGORIES).map((kind) => [`history/kind/${kind}/`, null, 0.4]),
    ...changes.map((ch) => [`history/${ch.id}/`, null, 0.5]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, mod, pri]) => `  <url><loc>${root}${path}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}<priority>${pri}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
