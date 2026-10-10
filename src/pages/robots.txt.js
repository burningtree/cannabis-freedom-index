// Everything may be crawled; the sitemap lists every page.
import { SITE } from "../lib/exports.js";

export function GET({ site }) {
  const root = (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${root}sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
