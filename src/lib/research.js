// How far the research on each country has come: a list of checks on its profile and on its
// history, each worth some points, and the share of the points it has. The page /research/
// shows the result. A check can only see what is in the files, so on its own it never reaches
// 100%: that needs `complete: <date>` in the country file, set by hand once someone has gone
// through the country and found nothing left to add.
import { getCollection } from "astro:content";
import { SEGMENTS, dateTime, articles } from "./countries.js";
import { CONTEXT_IDS, STATUS_SECTIONS } from "./segment-ids.js";
import { archivedUrl } from "./archive.js";

// sites that proved unreliable, and the encyclopedia: fine as a lead, not enough on their own
const WEAK = /cannabisregulations\.ai|tripbase\.com|sensiseeds\.com/;
const WIKI = /wikipedia\.org/;
const solid = (src) => src && (!src.url || !(WEAK.test(src.url) || WIKI.test(src.url))); // a book has no url
const SECTIONS = [...CONTEXT_IDS, "planting", ...Object.keys(STATUS_SECTIONS), "black_market", "arrests"];
const NOW = new Date();
const THIS_YEAR = NOW.getFullYear();
const total = (scores) => SEGMENTS.reduce((sum, seg) => sum + (scores[seg.id] * seg.weight) / 10, 0);
const UP = new Set(["easing", "legalisation", "medical"]), DOWN = new Set(["ban", "tightening", "death"]);

const entries = (await getCollection("changes")).map(({ data }) => data);
const flagOf = (id) => String.fromCodePoint(...[...id.toUpperCase()].map((ch) => 0x1f1a5 + ch.charCodeAt(0)));

export const research = (await getCollection("countries")).map(({ id: slug, data }) => {
  const checks = []; // { part, label, got, of, missing: [..] }
  const add = (part, label, got, of, missing = []) => checks.push({ part, label, got, of, missing });
  const src = (keys) => keys.map((k) => data.sources[k]);

  // ── the profile ──
  const uncited = SEGMENTS.filter((seg) => !data.segments[seg.id].sources.length);
  add("profile", "Every score is cited", SEGMENTS.length - uncited.length, SEGMENTS.length, uncited.map((s) => `${s.name}: no source`));
  const soft = SEGMENTS.filter((seg) => data.segments[seg.id].sources.length && !src(data.segments[seg.id].sources).some(solid));
  add("profile", "Every score rests on more than Wikipedia", SEGMENTS.length - uncited.length - soft.length, SEGMENTS.length, soft.map((s) => `${s.name}: only Wikipedia or a weak site`));
  const empty = SECTIONS.filter((k) => !data.context[k]?.sources.length);
  add("profile", "Context sections researched", SECTIONS.length - empty.length, SECTIONS.length, empty.map((k) => `${k.replace("_", " ")}: ${data.context[k] ? "no source" : "missing"}`));
  const use = data.cannabis_use;
  add("profile", "Use is a measured figure", use.year && !use.estimate ? 1 : 0, 1, use.year && !use.estimate ? [] : ["prevalence of use is an estimate"]);
  const age = (NOW - data.updated) / 864e5;
  add("profile", "Reviewed in the last year", age <= 365 ? 1 : 0, 1, age <= 365 ? [] : [`last reviewed ${data.updated.toISOString().slice(0, 10)}`]);
  const urls = Object.values(data.sources).map((s) => s.url).filter(Boolean);
  const saved = urls.filter((u) => archivedUrl(u)).length;
  add("profile", "Sources archived", urls.length ? (2 * saved) / urls.length : 0, 2, saved < urls.length ? [`${urls.length - saved} of ${urls.length} sources have no archived copy`] : []);

  // ── the history ──
  const own = entries.filter((e) => e.country === slug).sort((a, b) => dateTime(a.date) - dateTime(b.date));
  const dated = own.filter((e) => !e.estimate);
  const scored = own.filter((e) => e.before);
  const first = scored[0];
  add("history", "The first restriction is dated", first && !first.estimate ? 3 : 0, 3, first && !first.estimate ? [] : [first ? "the first ban is an estimate" : "no first ban recorded"]);
  const unchecked = dated.filter((e) => !e.checked);
  add("history", "Entries checked against a source", dated.length ? (2 * (dated.length - unchecked.length)) / dated.length : 0, 2, unchecked.map((e) => `not checked: ${e.id}`));
  const flags = [];
  scored.forEach((e, i) => {
    const b = total(e.before), a = total(scored[i + 1] ? scored[i + 1].before : data.scores);
    if (UP.has(e.category) && a < b) flags.push(`${e.id}: ${e.category}, but the score falls`);
    if (DOWN.has(e.category) && a > b) flags.push(`${e.id}: ${e.category}, but the score rises`);
    if (i === 0 && b < 90 && !e.estimate) flags.push(`${e.id}: the timeline starts below the unregulated state`);
  });
  add("history", "The score timeline makes sense", scored.length && !flags.length ? 2 : 0, 2, scored.length ? flags : ["no scored entry"]);
  // a decade with no entry at all, between the first dated entry (1900 at the earliest) and now
  const years = dated.map((e) => +e.date.slice(0, 4));
  const from = years.length ? Math.max(1900, Math.floor(Math.min(...years) / 10) * 10) : 1900;
  const decades = [];
  for (let d = from; d <= THIS_YEAR; d += 10) decades.push(d);
  const silent = decades.filter((d) => !years.some((y) => y >= d && y < d + 10));
  add("history", "No decade without an entry", years.length ? (6 * (decades.length - silent.length)) / decades.length : 0, 6, years.length ? silent.map((d) => `${d}s: nothing recorded`) : ["no dated entry"]);
  const recent = years.some((y) => y >= THIS_YEAR - 3);
  add("history", "Followed up to the present", recent ? 1 : 0, 1, recent ? [] : [`nothing since ${years.length ? Math.max(...years) : "ever"}`]);
  add("history", "Depth (15 entries or more)", (4 * Math.min(dated.length, 15)) / 15, 4, dated.length < 15 ? [`${dated.length} dated entries`] : []);
  const thin = dated.filter((e) => !e.sources.some(solid));
  add("history", "Entries rest on more than Wikipedia", dated.length ? (3 * (dated.length - thin.length)) / dated.length : 0, 3, thin.length ? [`${thin.length} entries cite only Wikipedia or a weak site`] : []);
  const told = scored.filter((e) => articles.has(e.id));
  add("history", "An article for every score change", scored.length ? (3 * told.length) / scored.length : 0, 3, scored.filter((e) => !articles.has(e.id)).map((e) => `no article: ${e.id}`));

  const share = (part) => { const cs = checks.filter((c) => !part || c.part === part); return cs.reduce((a, c) => a + c.got, 0) / cs.reduce((a, c) => a + c.of, 0); };
  const signed = data.complete ? data.complete.toISOString().slice(0, 10) : null;
  // every check passed is 99%; the last point is the signature
  const pct = signed && share() === 1 ? 100 : Math.min(99, Math.floor(share() * 100));
  const gaps = years.slice(1).map((y, i) => y - years[i]);
  return {
    slug, name: data.name, flag: data.flag ?? flagOf(slug), region: data.region, disputed: Boolean(data.disputed),
    population: data.population[Object.keys(data.population).sort().at(-1)],
    pct, profile: Math.floor(share("profile") * 100), history: Math.floor(share("history") * 100), signed,
    entries: own.length, scored: scored.length, articles: own.filter((e) => articles.has(e.id)).length,
    first: first ? (first.estimate ? "est." : first.date.slice(0, 4)) : "—",
    gap: gaps.length ? Math.max(...gaps) : null, silent: silent.length,
    reviewed: data.updated.toISOString().slice(0, 10),
    checks,
  };
}).sort((a, b) => b.pct - a.pct || b.entries - a.entries || a.name.localeCompare(b.name));

export const researchTotals = {
  places: research.length,
  average: Math.round(research.reduce((a, r) => a + r.pct, 0) / research.length),
  // the same, counted by people: a well-researched large country weighs more
  byPopulation: Math.round(research.reduce((a, r) => a + r.pct * r.population, 0) / research.reduce((a, r) => a + r.population, 0)),
  complete: research.filter((r) => r.pct === 100).length,
  good: research.filter((r) => r.pct >= 75).length,
  poor: research.filter((r) => r.pct < 40).length,
  entries: entries.length,
  estimates: research.filter((r) => r.first === "est.").length,
};
