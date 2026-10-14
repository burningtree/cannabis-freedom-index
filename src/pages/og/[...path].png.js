// The social preview image of every page, at /og/<page path>.png (the home page is /og/index.png).
// Base.astro points each page's og:image here. Countries and states get their score, rank and
// six segment bars; history entries get the date, the place and how the score moved; every other
// page gets its name and a line about it. Drawn by src/og/render.js.
import { SEGMENTS, DATA_SNAPSHOT, REC_LABEL, MED_LABEL, countries, places, changes, articles, subunitsOf, worldAvg, changeDate, historyPeriods, CHANGE_CATEGORIES } from "../../lib/countries.js";
import { tierOf, tierIndex } from "../../lib/tiers.js";
import { MAP_VIEWS } from "../../lib/map-views.js";
import { CULTURE_SECTIONS, cultureEntries, cultureIn, cultureSection } from "../../lib/culture.js";
import { survey, results } from "../../lib/survey.js";
import { getFacts } from "../../lib/facts.js";
import { renderOg, flagOf, TIER_HEX } from "../../og/render.js";

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
    eyebrow: "HISTORY OF CANNABIS LAW",
    flag: ch.country ? flagOf(ch.country.id) : null, place: ch.place.name.toUpperCase(),
    date: changeDate(ch).toUpperCase(), kind: ch.kind.label.toUpperCase(),
    title: ch.title, article: articles.has(ch.id),
    score: ch.score && { ...ch.score, delta, beforeColor: hex(ch.score.before), afterColor: hex(ch.score.after), label: `${delta >= 0 ? "+" : "−"}${Math.abs(delta)} ${Math.abs(delta) === 1 ? "point" : "points"}` },
  }];
}
const page = (title, text, facts = [], eyebrow = BRAND) => ["page", { eyebrow, title, text, facts }];

const dated = changes.filter((ch) => !ch.estimate);
const scored = dated.filter((ch) => ch.score).length;
const indexFacts = [[String(places.length), "COUNTRIES AND TERRITORIES"], [worldAvg.toFixed(1), "WORLD AVERAGE OF 100"], [num(dated.length), "HISTORY ENTRIES"]];
const historyFacts = [[num(dated.length), "ENTRIES"], [num(scored), "MOVED A SCORE"], [num(articles.size), "ARTICLES"]];
const surveyFacts = results.mock ? [] : [[num(results.respondents), "RESPONDENTS"], [num(results.observations), "PLACE REPORTS"], [num(results.price_reports), "PRICE REPORTS"]];

// path (as in the address, without slashes at the ends) → [template, props]
const cards = {
  index: page("How free is cannabis in every country?", "Every country scored from 0 to 100 for how free you are to carry, grow, share and use cannabis.", indexFacts),
  history: page("A history of cannabis law", "The laws, court rulings and treaties that made cannabis legal or illegal, and how each moved a country's score.", historyFacts),
  about: page("What this is, and what it is for", "The law in every country, its history and the lives lived under it: sourced, open and corrected in public.", indexFacts, `ABOUT · ${BRAND}`),
  "can-i": page("Can I?", "Pick a country and get plain answers: can I carry it, grow it, buy it, use it in public, and what happens if I am caught?"),
  compare: page("Compare countries", "Up to six countries side by side: their scores, exact rules and sources in one table."),
  changelog: page("Changelog", "Every change to a score, newest first.", [[num(scored), "SCORE CHANGES"]]),
  data: page("Download the data", "Scores, history and a yearly panel since 1900 as CSV and JSON, free to reuse with attribution."),
  "did-you-know": page("Did you know?", "Strange rules, forgotten laws and what the scores show.", [[String(getFacts().length), "CURIOUS CASES"]]),
  articles: page("Articles", "Moments from the history of cannabis law told in full.", [[num(articles.size), "ARTICLES"]]),
  culture: page("A cultural atlas of cannabis", "The words people have for the plant, the rituals and traditions it belongs to, and the people behind the laws.", [[String(cultureEntries.length), "ENTRIES"]]),
  "culture/history": page("Culture in the history", "Social attitudes, propaganda and counterculture: where the record of laws shows what people thought.", [], `CULTURE · ${BRAND}`),
  "culture/stories": page("The people behind the laws", "A participatory anthropology project on how cannabis shapes, and is shaped by, society.", [], `CULTURE · ${BRAND}`),
  sources: page("What the index is built on", "Every source the index cites, counted by website and by country."),
  survey: page("State of Cannabis", "A yearly survey of what people do with cannabis, what they believe about it, and what they see in the countries they know.", surveyFacts, `SURVEY · ${survey.edition} EDITION`),
  "survey/take": page("Take the survey", "State of Cannabis: about ten minutes, no account, answers encrypted.", [], `STATE OF CANNABIS · ${survey.edition}`),
  "survey/me": page("Your submissions", "State of Cannabis: read, change or delete what you sent.", [], `STATE OF CANNABIS · ${survey.edition}`),
  research: page("Research progress", "How much of each country's profile and history has been researched.", [], `INTERNAL · ${BRAND}`),
  "survey/scan": page("Submission scanner", "What the survey's public relays hold, as anyone can see it.", [], `STATE OF CANNABIS · ${survey.edition}`),
};
for (const sec of CULTURE_SECTIONS.filter((x) => x.entries)) cards[`culture/${sec.id}`] = page(sec.name, sec.lede, [[String(cultureIn(sec.id).length), "ENTRIES"]], `CULTURE · ${BRAND}`);
for (const e of cultureEntries) cards[e.url.slice(0, -1)] = page(e.title, e.summary, [], `CULTURE · ${cultureSection(e.section).name.toUpperCase()}`);
for (const v of MAP_VIEWS) cards[v.slug ? `map/${v.slug}` : "map"] = page(v.title, v.lede, [], `MAP · ${BRAND}`);
for (const [kind, k] of Object.entries(CHANGE_CATEGORIES)) cards[`history/kind/${kind}`] = page(k.label, `${k.help}. Every such entry in the history of cannabis law.`, [[num(dated.filter((ch) => ch.category === kind).length), "ENTRIES"]], "HISTORY OF CANNABIS LAW");
for (const p of historyPeriods.slice(1)) cards[`history/period/${p.slug}`] = page(`History, ${p.label}`, `Cannabis laws, court rulings and treaties from ${p.from} to ${p.to}.`, [], "HISTORY OF CANNABIS LAW");
for (const ch of changes) cards[`history/${ch.id}`] = historyCard(ch); // estimated first bans have a page too
for (const c of places) {
  cards[`country/${c.slug}`] = countryCard(c);
  for (const sub of subunitsOf(c.id)?.units ?? []) cards[`country/${c.slug}/${sub.id}`] = countryCard(c, sub);
}

export const getStaticPaths = () => Object.entries(cards).map(([path, card]) => ({ params: { path }, props: { card } }));

export const GET = async ({ props }) => new Response(await renderOg(...props.card), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
