// What the search dialog (⌘K, in Base.astro) looks through: every country and state, every history
// entry and every page (map views, history kinds and periods included), as short rows. Fetched once, the first time the dialog is opened.
//   t: kind (c country, a history entry with an article, h history entry, p page, u culture entry)
//   img: a small picture, shown in place of the flag (culture entries)
//   n: what is shown and matched   s: the smaller second line, matched too   u: address under the site root
import { places, countries, subunitsOf, changes, articles, historyPeriods, CHANGE_CATEGORIES } from "../lib/countries.js";
import { MAP_VIEWS } from "../lib/map-views.js";
import { CULTURE_SECTIONS, cultureEntries, cultureSection } from "../lib/culture.js";
import { tierOf } from "../lib/tiers.js";
import { file } from "../lib/exports.js";
import { getImage } from "astro:assets";

const rows = [
  ...places.map((c) => ({ t: "c", n: c.name, s: `${c.score}/100 · ${tierOf(c.raw).name}`, u: `country/${c.slug}/`, f: c.flag })),
  // states, provinces and territories of the federations
  ...countries.flatMap((c) => (subunitsOf(c.id)?.units ?? []).map((sub) => ({ t: "c", n: sub.name, s: `${c.name} · ${sub.score}/100 · ${tierOf(sub.raw).name}`, u: `country/${c.slug}/${sub.id}/`, f: c.flag }))),
  ...[
    ["Map", "World map of scores", "#map"], ["Rankings", "Every country by score", "#rankings"], ["Methodology", "How the scores are made", "#methodology"],
    ["History", "Laws, rulings and treaties", "history/"], ["Can I?", "Plain answers per country", "can-i/"], ["Compare", "Countries side by side", "compare/"],
    ["Download the data", "Scores, history and yearly panel", "data/"], ["Changelog", "Every score change", "changelog/"],
    ["Articles", "The longer reads on single events", "articles/"], ["About", "What the project is, its aims and commitments", "about/"], ["Did you know?", "Curious cases from the index", "did-you-know/"], ["State of Cannabis", "The yearly survey and its results", "survey/"], ["Take the survey", "Anonymous, about ten minutes", "survey/take/"], ["Culture", "A cultural atlas of cannabis", "culture/"], ["Culture: History", "Attitudes, propaganda and counterculture in the record of laws", "culture/history/"], ["Culture: Stories", "The people behind the laws", "culture/stories/"], ["Sources", "Every source the index cites", "sources/"],
  ].map(([n, s, u]) => ({ t: "p", n, s, u })),
  // the cultural atlas: its parts that hold entries, then every word and tradition, findable by its other names too
  ...CULTURE_SECTIONS.filter((x) => x.entries).map((x) => ({ t: "p", n: `Culture: ${x.name}`, s: x.lede, u: `culture/${x.id}/` })),
  // culture entries show their picture, small, where they have one
  ...(await Promise.all(cultureEntries.map(async (e) => ({
    t: "u", n: e.title, s: [cultureSection(e.section).name, ...(e.spelling ?? []).map((w) => w.text), ...(e.also ?? [])].join(" · "), u: e.url, f: e.countries[0].flag,
    ...(e.image && { img: (await getImage({ src: e.image.src, width: 96, height: 96, fit: "cover", format: "webp" })).src }),
  })))),
  // every map view, history kind and history period has its own page
  ...MAP_VIEWS.filter((v) => v.slug).map((v) => ({ t: "p", n: v.title, s: "Map", u: `map/${v.slug}/` })),
  ...Object.entries(CHANGE_CATEGORIES).map(([kind, k]) => ({ t: "p", n: `History: ${k.label}`, s: k.help, u: `history/kind/${kind}/`, f: k.emoji })),
  ...historyPeriods.slice(1).map((p) => ({ t: "p", n: `History, ${p.label}`, s: "Laws, rulings and treaties of the period", u: `history/period/${p.slug}/` })),
  // newest first, as in `changes`; estimates have no real date and no page worth finding
  ...changes.filter((ch) => !ch.estimate).map((ch) => ({ t: articles.has(ch.id) ? "a" : "h", n: ch.title, s: `${ch.date.slice(0, 4)} · ${ch.place.name}`, u: `history/${ch.id}/`, f: ch.place.flag })),
];

export const GET = () => file(JSON.stringify(rows), "application/json");
