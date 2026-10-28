// Every indexable page of the site, for search engines. Linked from robots.txt.
// `lastmod` is given only where it is known what last changed the page, and is then that date:
//   - a country or state: the date its profile was last reviewed
//   - a page made from every profile (home, rankings, maps, comparisons, downloads): the latest review
//   - a page whose content is one file (an article, a culture entry, the about page): that file's
//     last commit (src/lib/lastmod.js); an article's history entry the same
//   - a changelog page: its commit
// Lists of history entries (decades, kinds, tags) and other hubs get no date: no single change
// stands for them, and a date that is not the page's own would mislead. No <priority>: search
// engines ignore it. Pages marked noindex (research, the survey scanner, "your submissions") are
// left out. scripts/seo-audit.mjs checks after the build that this list and the site agree.
import { openExhibitions, exhibitionPath } from "../lib/exhibitions.js";
import { places, countries, changes, articles, subunitsOf, historyPeriods, CHANGE_CATEGORIES, CHANGE_TAGS } from "../lib/countries.js";
import { SITE } from "../lib/exports.js";
import { MAP_VIEWS } from "../lib/map-views.js";
import { CULTURE_SECTIONS, cultureEntries } from "../lib/culture.js";
import { contextTopics } from "../lib/contexts.js";
import { datasetPages } from "../lib/dataset-pages.js";
import { regions } from "../lib/regions.js";
import { commits, pageCount, pageOf } from "../lib/gitlog.js";
import { lastChanged } from "../lib/lastmod.js";

export function GET({ site }) {
  const root = (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
  const latest = places.map((c) => c.details.reviewed).sort().at(-1);
  const page = (file) => lastChanged(`src/pages/${file}`);
  const later = (...dates) => dates.filter(Boolean).sort().at(-1) ?? null;
  const committed = commits.filter((c) => c.short !== "uncommitted");
  // [path, last change (YYYY-MM-DD) or null]
  const pages = [
    // made from every profile
    ["", latest],
    ["can-i/", latest],
    ["compare/", latest],
    ["score-changes/", latest],
    ["data/", latest],
    ["map/poster/", latest],
    ...MAP_VIEWS.map((v) => [v.slug ? `map/${v.slug}/` : "map/", latest]),
    ["context/", latest],
    ...contextTopics.map((t) => [`context/${t.slug}/`, latest]),
    ["datasets/", latest],
    ...datasetPages.map((p) => [`datasets/${p.slug}/`, latest]),
    ["region/", latest],
    ...regions.map((r) => [`region/${r.slug}/`, latest]),
    // profiles
    ...places.map((c) => [`country/${c.slug}/`, c.details.reviewed]),
    ...countries.flatMap((c) => (subunitsOf(c.id)?.units ?? []).map((sub) => [`country/${c.slug}/${sub.id}/`, sub.reviewed])),
    // pages whose text is their own file
    ["about/", page("about.astro")],
    ["survey/", page("survey/index.astro")],
    ["survey/take/", page("survey/take.astro")],
    ["culture/stories/", page("culture/stories.astro")],
    ...openExhibitions.map((e) => [exhibitionPath(e), null]),
    // hubs and lists
    ["history/", null],
    ["charts/", null],
    ["articles/", null],
    ["sources/", null],
    ["exhibitions/", null],
    ["culture/", null],
    ["did-you-know/", null],
    ["glossary/", null],
    // stories is a section too, listed above with its own file's date
    ...CULTURE_SECTIONS.filter((x) => !x.soon && x.id !== "stories").map((x) => [`culture/${x.id}/`, null]),
    ...historyPeriods.map((p) => [`history/period/${p.slug}/`, null]),
    ...Object.keys(CHANGE_CATEGORIES).map((kind) => [`history/kind/${kind}/`, null]),
    ...Object.keys(CHANGE_TAGS).map((tag) => [`history/tag/${tag}/`, null]),
    // the atlas and the history: a culture entry is its file; an entry with a long read, its article
    ...cultureEntries.map((e) => [e.url, later(lastChanged(`culture/${e.entry.id}.md`), e.written?.toISOString().slice(0, 10))]),
    ...changes.map((ch) => [`history/${ch.id}/`, articles.has(ch.id) ? lastChanged(`articles/${ch.id}.md`) : null]),
    // the changelog
    ["changelog/", committed[0]?.date.slice(0, 10) ?? null],
    // its later pages, each dated by the newest commit it lists
    ...Array.from({ length: pageCount() - 1 }, (_, i) => [`changelog/page/${i + 2}/`, pageOf(i + 2)[0]?.date.slice(0, 10) ?? null]),
    ...committed.map((c) => [`changelog/${c.short}/`, c.date.slice(0, 10)]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, mod]) => `  <url><loc>${root}${path}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
