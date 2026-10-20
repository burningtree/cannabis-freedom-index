// What the search dialog (⌘K, in Base.astro) looks through: every country and state, every history
// entry and every page (map views, history kinds and periods included), as short rows. Fetched once, the first time the dialog is opened.
//   t: kind (c country, a history entry with an article, h history entry, p page, u culture entry)
//   img: a small picture, shown in place of the flag (culture entries)
//   ic: an Iconoir icon, shown in place of the flag (pages); a history entry shows its kind's icon with the flag small in its corner
//   n: what is shown and matched   s: the smaller second line, matched too   u: address under the site root
//   g: words matched but not shown (a history entry's tags)
import { places, countries, subunitsOf, changes, articles, historyPeriods, CHANGE_CATEGORIES, CHANGE_TAGS, estimateNote } from "../lib/countries.js";
import { MAP_VIEWS } from "../lib/map-views.js";
import { CULTURE_SECTIONS, cultureEntries, cultureSection } from "../lib/culture.js";
import { tierOf } from "../lib/tiers.js";
import { file } from "../lib/exports.js";
import { getImage } from "astro:assets";
import { PAGE_ICONS, CULTURE_SECTION_ICON, MAP_VIEW_ICON, PERIOD_ICON, TAG_ICON } from "../lib/search-icons.js";

const rows = [
  ...places.map((c) => ({ t: "c", n: c.name, s: `${c.score}/100 · ${tierOf(c.raw).name}${estimateNote(c) ? ` · ${estimateNote(c).toLowerCase()}` : ""}`, u: `country/${c.slug}/`, f: c.flag })),
  // states, provinces and territories of the federations
  ...countries.flatMap((c) => (subunitsOf(c.id)?.units ?? []).map((sub) => ({ t: "c", n: sub.name, s: `${c.name} · ${sub.score}/100 · ${tierOf(sub.raw).name}`, u: `country/${c.slug}/${sub.id}/`, f: c.flag }))),
  ...[
    ["Map", "World map of scores", "#map"], ["Rankings", "Every country by score", "#rankings"], ["Methodology", "How the scores are made", "#methodology"],
    ["History", "Laws, rulings and treaties", "history/"], ["Can I?", "Plain answers per country", "can-i/"], ["Compare", "Countries side by side", "compare/"],
    ["Download the data", "Scores, history and yearly panel", "data/"], ["Changelog", "Every score change", "changelog/"],
    ["Articles", "The longer reads on single events", "articles/"], ["About", "What the project is, its aims and commitments", "about/"], ["Did you know?", "Curious cases from the index", "did-you-know/"], ["State of Cannabis", "The yearly survey and its results", "survey/"], ["Take the survey", "Anonymous, about ten minutes", "survey/take/"], ["Culture", "A cultural atlas of cannabis", "culture/"], ["Culture: People", "Officials, preachers, scientists and presidents", "culture/people/"], ["Culture: Stories", "The people behind the laws", "culture/stories/"], ["Sources", "Every source the index cites", "sources/"],
  ].map(([n, s, u]) => ({ t: "p", n, s, u, ic: PAGE_ICONS[u] })),
  // the cultural atlas: its parts that hold entries, then every word and tradition, findable by its other names too
  ...CULTURE_SECTIONS.filter((x) => x.entries).map((x) => ({ t: "p", n: `Culture: ${x.name}`, s: x.lede, u: `culture/${x.id}/`, ic: CULTURE_SECTION_ICON })),
  // culture entries show their picture, small, where they have one
  ...(await Promise.all(cultureEntries.map(async (e) => ({
    t: "u", n: e.title, s: [cultureSection(e.section).name, ...(e.spelling ?? []).map((w) => w.text), ...(e.also ?? [])].join(" · "), u: e.url, f: e.countries[0].flag,
    ...(e.image && { img: (await getImage({ src: e.image.src, width: 96, height: 96, fit: "cover", format: "webp" })).src }),
  })))),
  // every map view, history kind, history tag and history period has its own page
  ...MAP_VIEWS.filter((v) => v.slug).map((v) => ({ t: "p", n: v.title, s: "Map", u: `map/${v.slug}/`, ic: MAP_VIEW_ICON })),
  ...Object.entries(CHANGE_CATEGORIES).map(([kind, k]) => ({ t: "p", n: `History: ${k.label}`, s: k.help, u: `history/kind/${kind}/`, ic: k.icon })),
  // the tags in use, with how many entries carry each
  ...Object.entries(CHANGE_TAGS).map(([key, t]) => [key, t, changes.filter((ch) => !ch.estimate && ch.tags.some((x) => x.key === key)).length])
    .filter(([, , n]) => n > 0)
    .map(([key, t, n]) => ({ t: "p", n: `History: ${t.label}`, s: `Tag · ${n} ${n === 1 ? "entry" : "entries"} · ${t.help}`, u: `history/tag/${key}/`, ic: TAG_ICON })),
  ...historyPeriods.map((p) => ({ t: "p", n: `History, ${p.label}`, s: "Laws, rulings and treaties of the period", u: `history/period/${p.slug}/`, ic: PERIOD_ICON })),
  // newest first, as in `changes`; estimates have no real date and no page worth finding
  ...changes.filter((ch) => !ch.estimate).map((ch) => ({ t: articles.has(ch.id) ? "a" : "h", n: ch.title, s: `${ch.date.slice(0, 4)} · ${ch.place.name}${ch.unit ? ` · ${ch.unit.name}` : ""}`, u: `history/${ch.id}/`, f: ch.place.flag, ic: ch.kind.icon, ...(ch.tags.length && { g: ch.tags.map((t) => t.label).join(" ") }) })),
];

export const GET = () => file(JSON.stringify(rows), "application/json");
