// Everything may be crawled; the sitemap lists every page, and llms.txt is the guide for language models.
import { SITE } from "../lib/exports.js";

export function GET({ site }) {
  const root = (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
  return new Response(`User-agent: *\nAllow: /\n\n# For language models: ${root}llms.txt (guide) and ${root}llms-full.txt (everything as text)\nSitemap: ${root}sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
