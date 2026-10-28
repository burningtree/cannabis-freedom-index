// The social preview image of every page, at /og/<page path>.png (the home page is /og/index.png).
// Base.astro points each page's og:image here. Countries and states get their score, rank and
// six segment bars; history entries get the date, the place and how the score moved; culture
// entries with a lead picture get it beside their name and summary; every other
// page gets its name and a line about it. Drawn by src/og/render.js.
import { SEGMENTS, DATA_SNAPSHOT, REC_LABEL, MED_LABEL, countries, places, changes, articles, subunitsOf, worldAvg, changeDate, historyPeriods, CHANGE_CATEGORIES, CHANGE_TAGS } from "../../lib/countries.js";
import { tierOf, tierIndex } from "../../lib/tiers.js";
import { MAP_VIEWS } from "../../lib/map-views.js";
import { CULTURE_SECTIONS, cultureEntries, cultureIn, cultureSection } from "../../lib/culture.js";
import { contextTopics } from "../../lib/contexts.js";
import { datasetPages } from "../../lib/dataset-pages.js";
import { survey, results } from "../../lib/survey.js";
import { getFacts } from "../../lib/facts.js";
import { renderOg, flagOf, photoOf, collageOf, TIER_HEX } from "../../og/render.js";
import { openExhibitions, exhibitionPath } from "../../lib/exhibitions.js";
import { commits, summaryOf, pageCount, pageOf, PAGE_SIZE } from "../../lib/gitlog.js";

const BRAND = `CANNABIS FREEDOM INDEX · ${DATA_SNAPSHOT}`;
const num = (n) => n.toLocaleString("en-GB");
const hex = (score) => TIER_HEX[tierIndex(score)];
const bars = (s) => SEGMENTS.map((seg, i) => ({ name: seg.name.replace(/^Punishment & /, "").replace(/^Personal /, "").replace(/ & gifting$/, "").toUpperCase(), value: s[i], color: hex(s[i] * 10) }));

function countryCard(c, sub) {
  const x = sub ?? c;
  return ["country", {
    eyebrow: sub ? `${c.name.toUpperCase()} · ${BRAND}` : BRAND,
    name: x.name, flag: flagOf(c.id), score: x.score, tier: tierOf(x.raw).name.toUpperCase(), color: hex(x.raw),
    rank: sub ? "" : c.rank ? `#${c.rank} OF ${countries.length}` : "DISPUTED TERRITORY",
    statuses: `Recreational: ${REC_LABEL[x.rec].toLowerCase()} · Medical: ${MED_LABEL[x.med].toLowerCase()}`,
    segments: bars(x.s),
  }];
}
function historyCard(ch) {
  const delta = ch.score ? ch.score.after - ch.score.before : 0;
  return ["history", {
    eyebrow: "HISTORY OF CANNABIS",
    flag: ch.country ? flagOf(ch.country.id) : null, place: ch.place.name.toUpperCase(),
    date: changeDate(ch).toUpperCase(), kind: ch.kind.label.toUpperCase(),
    title: ch.title, article: articles.has(ch.id),
    score: ch.score && { ...ch.score, delta, beforeColor: hex(ch.score.before), afterColor: hex(ch.score.after), label: `${delta >= 0 ? "+" : "−"}${Math.abs(delta)} ${Math.abs(delta) === 1 ? "point" : "points"}` },
  }];
}
const page = (title, text, facts = [], eyebrow = BRAND) => ["page", { eyebrow, title, text, facts }];
// a sentence that ends itself
const sentence = (s) => /[.!?]$/.test(s) ? s : `${s}.`;
const yearsOf = (d) => d.fileInfo.years && (d.fileInfo.years[0] === d.fileInfo.years[1] ? `${d.fileInfo.years[0]}` : `${d.fileInfo.years[0]}–${d.fileInfo.years[1]}`);

const dated = changes.filter((ch) => !ch.estimate);
const scored = dated.filter((ch) => ch.score).length;
const indexFacts = [[String(places.length), "COUNTRIES AND TERRITORIES"], [worldAvg.toFixed(1), "WORLD AVERAGE OF 100"], [num(dated.length), "HISTORY ENTRIES"]];
const historyFacts = [[num(dated.length), "ENTRIES"], [num(scored), "MOVED A SCORE"], [num(articles.size), "ARTICLES"]];
const surveyFacts = results.mock ? [] : [[num(results.respondents), "RESPONDENTS"], [num(results.observations), "PLACE REPORTS"], [num(results.price_reports), "PRICE REPORTS"]];
const contextWritten = contextTopics.reduce((n, t) => n + t.filled, 0);
const datasetFigures = datasetPages.reduce((n, p) => n + p.rows.length, 0);

// path (as in the address, without slashes at the ends) → [template, props]
const cards = {
  index: page("How free is cannabis in every country?", "Every country scored from 0 to 100 for how free you are to carry, grow, share and use cannabis.", indexFacts),
  history: page("A history of cannabis", "Laws, rulings and treaties, raids, campaigns, trade and culture, country by country, and how each change moved a country's score.", historyFacts),
  about: page("What this is, and what it is for", "The law in every country, its history and the lives lived under it: sourced, open and corrected in public.", indexFacts, `ABOUT · ${BRAND}`),
  "can-i": page("Can I?", "Pick a country and get plain answers: can I carry it, grow it, buy it, use it in public, and what happens if I am caught?"),
  compare: page("Compare countries", "Up to six countries side by side: their scores, exact rules and sources in one table."),
  "score-changes": page("Score changes", "Every change to a score, newest first.", [[num(scored), "SCORE CHANGES"]]),
  changelog: page("Changelog", "Every change to the site, its data and its text, and exactly what changed.", [], `CHANGELOG · ${BRAND}`),
  data: page("Download the data", "Scores, history and a yearly panel since 1900 as CSV and JSON, free to reuse with attribution."),
  glossary: page("Glossary", "The words of cannabis law explained in plain language, and the words for cannabis from around the world."),
  "did-you-know": page("Did you know?", "Strange rules, forgotten laws and what the scores show.", [[String(getFacts().length), "CURIOUS CASES"]]),
  articles: page("Articles", "Moments from the history of cannabis law told in full.", [[num(articles.size), "ARTICLES"]]),
  charts: page("Cannabis (un)freedom in charts", "How prohibition spread after 1860, the waves of law, the regions, use and the law, drawn from the index's scores and history.", indexFacts, `CHARTS · ${BRAND}`),
  exhibitions: page("Exhibitions", "Self-contained experiences, each about one strange episode in humanity's relationship with cannabis.", [], `EXHIBITIONS · ${BRAND}`),
  culture: page("A cultural atlas of cannabis", "The words people have for the plant, the rituals and traditions it belongs to, and the people behind the laws.", [[String(cultureEntries.length), "ENTRIES"]]),
  "culture/stories": page("The people behind the laws", "A participatory anthropology project on how cannabis shapes, and is shaped by, society.", [], `CULTURE · ${BRAND}`),
  sources: page("What the index is built on", "Every source the index cites, counted by website and by country."),
  survey: page("State of Cannabis", "A yearly survey of what people do with cannabis, what they believe about it, and what they see in the countries they know.", surveyFacts, `SURVEY · ${survey.edition} EDITION`),
  "survey/take": page("Take the survey", "State of Cannabis: about ten minutes, no account, answers encrypted.", [], `STATE OF CANNABIS · ${survey.edition}`),
  "survey/me": page("Your submissions", "State of Cannabis: read, change or delete what you sent.", [], `STATE OF CANNABIS · ${survey.edition}`),
  research: page("Research progress", "How much of each country's profile and history has been researched.", [], `INTERNAL · ${BRAND}`),
  "survey/scan": page("Submission scanner", "What the survey's public relays hold, as anyone can see it.", [], `STATE OF CANNABIS · ${survey.edition}`),
};
for (const sec of CULTURE_SECTIONS.filter((x) => x.entries)) cards[`culture/${sec.id}`] = page(sec.name, sec.lede, [[String(cultureIn(sec.id).length), "ENTRIES"]], `CULTURE · ${BRAND}`);
// entries with a lead picture show it beside the text; the picture is read and shrunk when the image is drawn
for (const e of cultureEntries) {
  const eyebrow = `CULTURE · ${cultureSection(e.section).name.toUpperCase()}`;
  cards[e.url.slice(0, -1)] = e.image?.src?.fsPath
    ? ["culture", { eyebrow, title: e.title, text: e.summary, photo: { file: e.image.src.fsPath, fit: e.image.fit }, credit: e.image.credit }]
    : page(e.title, e.summary, [], eyebrow);
}
// the context topics, each compared across every country
cards.context = page("Beyond the score", "What the score does not show, compared across every country: medicine, clubs, arrests, driving and more.", [[String(contextTopics.length), "TOPICS"], [num(contextTopics[0].total), "PLACES"], [num(contextWritten), "SECTIONS WRITTEN"]], `CONTEXT · ${BRAND}`);
for (const t of contextTopics) cards[`context/${t.slug}`] = page(t.name, sentence(t.help),
  [[num(t.filled), "PROFILES WITH THIS SECTION"], [num(t.notApplicable), "EXPLAINED AS NOT APPLICABLE"], [num(t.missing), "NOT RESEARCHED YET"]], `CONTEXT · ${BRAND}`);
// the outside datasets, each with a map and every place's figure
cards.datasets = page("Datasets", "What others count about cannabis, country by country: use, offences, prices, potency, opinion and freedom.", [[String(datasetPages.length), "DATASETS"], [num(datasetFigures), "COUNTRY FIGURES"]], `DATASETS · ${BRAND}`);
for (const p of datasetPages) {
  const years = yearsOf(p.d);
  const n = p.rows.length;
  cards[`datasets/${p.slug}`] = page(p.d.name, sentence(`${p.d.publisher} · ${p.d.when}`), p.d.worldwide
    ? [["Worldwide", "NOT COUNTRY BY COUNTRY"], ...(years ? [[years, "YEARS IN THE FILE"]] : [])]
    : [[num(n), n === places.length ? "PLACES COVERED" : n === 1 ? "PLACE COVERED" : `OF ${places.length} PLACES COVERED`], ...(years ? [[years, "YEARS IN THE FILE"]] : [])], `DATASETS · ${BRAND}`);
}
// each open exhibition in its own look, with one of its posters
for (const e of openExhibitions) if (e.og) cards[exhibitionPath(e).slice(0, -1)] = ["exhibition", {
  no: e.no, theme: e.theme.toUpperCase(), title: e.title, line: e.line, rooms: e.og.rooms, address: `cannabisfreedom.fyi/${exhibitionPath(e)}`.replace(/\/$/, ""),
  photo: { collage: e.og.posters },
}];
// each change in the changelog
// the changelog's later pages
for (let n = 2; n <= pageCount(); n++) cards[`changelog/page/${n}`] = page(`Changelog, page ${n}`, `Commits ${(n - 1) * PAGE_SIZE + 1}–${(n - 1) * PAGE_SIZE + pageOf(n).length}, from ${pageOf(n).at(-1)?.date.slice(0, 10)} to ${pageOf(n)[0]?.date.slice(0, 10)}.`, [], `CHANGELOG · ${BRAND}`);
for (const c of commits) cards[`changelog/${c.short}`] = page(c.subject, summaryOf(c).map(([n, w]) => `${n} ${w}`).join(" · ") || "Changes to the site.", [], `CHANGELOG · ${c.date.slice(0, 10)}`);
for (const v of MAP_VIEWS) cards[v.slug ? `map/${v.slug}` : "map"] = page(v.title, v.lede, [], `MAP · ${BRAND}`);
for (const [kind, k] of Object.entries(CHANGE_CATEGORIES)) cards[`history/kind/${kind}`] = page(k.label, `${k.help}. Every such entry in the history of cannabis.`, [[num(dated.filter((ch) => ch.category === kind).length), "ENTRIES"]], "HISTORY OF CANNABIS");
for (const [tag, t] of Object.entries(CHANGE_TAGS)) cards[`history/tag/${tag}`] = page(t.label, `${t.help}. Every entry with this tag in the history of cannabis.`, [[num(dated.filter((ch) => ch.tags.some((x) => x.key === tag)).length), "ENTRIES"]], "HISTORY OF CANNABIS");
for (const p of historyPeriods) cards[`history/period/${p.slug}`] = page(`History, ${p.label}`, `Cannabis laws, court rulings and treaties from ${p.from} to ${p.to}.`, [], "HISTORY OF CANNABIS");
for (const ch of changes) cards[`history/${ch.id}`] = historyCard(ch); // estimated first bans have a page too
for (const c of places) {
  cards[`country/${c.slug}`] = countryCard(c);
  for (const sub of subunitsOf(c.id)?.units ?? []) cards[`country/${c.slug}/${sub.id}`] = countryCard(c, sub);
}

// `npm run build:quick` (SKIP_OG=1) draws no cards, to check a small change fast; the deploy always draws them
export const getStaticPaths = () => process.env.SKIP_OG ? [] : Object.entries(cards).map(([path, card]) => ({ params: { path }, props: { card } }));

const draw = async ([kind, props]) => kind === "culture" ? renderOg(kind, { ...props, photo: await photoOf(props.photo.file, props.photo.fit) })
  : kind === "exhibition" ? renderOg(kind, { ...props, photo: await collageOf(props.photo.collage, 480, 630) })
  : renderOg(kind, props);
export const GET = async ({ props }) => new Response(await draw(props.card), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
