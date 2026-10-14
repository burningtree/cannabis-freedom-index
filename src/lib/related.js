// Related history entries, shown under an entry's sources. Only entries that are really tied to it:
// - named in either entry's `related` list in changes.yaml (the way to add a tie by hand)
// - one entry's article links to the other
// - an atlas entry that belongs to both
// - a source both cite that few other entries cite
// - the same law number in both (Law 50-88)
// - wording so close that both tell the same story, words weighed by how rare they are and place
//   names left out, so that two entries are not tied only by happening in the same country
// Most entries have none, and then the section is not shown.
import { changes, articles } from "./countries.js";

for (const ch of changes) for (const id of ch.related ?? []) if (!changes.some((x) => x.id === id)) throw new Error(`changes.yaml: "${ch.id}" names an unknown related entry "${id}"`);
import { cultureOfChange } from "./culture.js";

// wording alone must be this close (cosine of the weighted words) to count as the same story
const SAME_STORY = 0.35;
// words reduced to a rough stem, so that "rescheduled" and "rescheduling" count as one
const stem = (w) => { const s = w.replace(/'s$/, "").replace(/(ings|ing|ed|es|e|s)$/, ""); return s.length >= 4 ? s : w; };
// words of four letters or more, and acronyms such as DEA or UN
const STOP = new Set("about above after again against also among another around because been before being below between both but called could does done down during each even every first from further have having here into itself just last later many more most much must never next none once only other over said same says several should since some still such than that their them then there these they this those through thus under until upon very were what when where whether which while whose will with within without would year years".split(" "));
// and law numbers such as 50-88 or 19.172, which name one law exactly
const words = (text) => [
  ...(text.match(/[\p{L}][\p{L}']*/gu) ?? [])
    .filter((w) => (w.length >= 4 && !STOP.has(w.toLowerCase())) || /^[A-Z]{2,}$/.test(w) && !/^[IVX]+$/.test(w))
    .map((w) => stem(w.toLowerCase())),
  ...(text.match(/\b\d+(?:[-./]\d+)+\b/g) ?? []).map((n) => `#${n}`),
];
const dated = changes.filter((ch) => !ch.estimate);
const placeWords = (ch) => new Set(words(`${ch.place.name} ${ch.country?.name ?? ""}`));

// document frequency of each word, over every entry
const docs = new Map(dated.map((ch) => [ch, new Set(words(`${ch.title} ${ch.description}`))]));
// a word in the title counts double
const titles = new Map(dated.map((ch) => [ch, new Set(words(ch.title))]));
const df = new Map();
for (const set of docs.values()) for (const w of set) df.set(w, (df.get(w) ?? 0) + 1);
const N = dated.length;
// common words carry no meaning here; a word in more than one entry in twenty is ignored
const weight = (w) => { const n = df.get(w) ?? 0; return n < 2 || n > N / 20 ? 0 : Math.log(N / n); };
const vectors = new Map([...docs].map(([ch, set]) => {
  const own = placeWords(ch);
  const v = new Map([...set].filter((w) => !own.has(w)).map((w) => [w, weight(w) * (titles.get(ch).has(w) ? 2 : 1)]).filter(([, x]) => x > 0));
  return [ch, { v, norm: Math.sqrt([...v.values()].reduce((a, x) => a + x * x, 0)) }];
}));

// a source counts only when few entries cite it: a general overview cited for dozens of entries
// says nothing about how two of them are related
const sourceUse = new Map();
for (const ch of dated) for (const k of new Set(ch.sources.map((s) => s[3]))) sourceUse.set(k, (sourceUse.get(k) ?? 0) + 1);
const sourceKeys = new Map(dated.map((ch) => [ch, new Set(ch.sources.map((s) => s[3]).filter((k) => sourceUse.get(k) <= 6))]));
const culture = new Map(dated.map((ch) => [ch, new Set(cultureOfChange(ch))]));
const linksTo = new Map(dated.map((ch) => {
  const body = articles.get(ch.id)?.body ?? "";
  return [ch, new Set([...body.matchAll(/\]\(\/history\/([^/)#]+)/g)].map((m) => m[1]))];
}));
const year = (ch) => +ch.date.slice(0, 4);

// How strongly two entries are tied, and why. Only real ties count: a link one way or the other,
// a custom both belong to, a little-cited source both rest on, or wording close enough that both
// plainly tell the same story (the same law, ruling or case).
export function tie(a, b) {
  const why = [];
  if (a.related?.includes(b.id) || b.related?.includes(a.id)) why.push(["named", 10]);
  if (linksTo.get(a).has(b.id) || linksTo.get(b).has(a.id)) why.push(["article", 6]);
  for (const e of culture.get(a)) if (culture.get(b).has(e)) why.push([`atlas:${e.slug}`, 4]);
  let shared = 0;
  for (const k of sourceKeys.get(a)) if (sourceKeys.get(b).has(k)) shared++;
  if (shared) why.push(["source", 3 * Math.min(shared, 2)]);
  const va = vectors.get(a), vb = vectors.get(b);
  // the same law number in both names the same law
  for (const w of docs.get(a)) if (w.startsWith("#") && docs.get(b).has(w)) { why.push([`law:${w.slice(1)}`, 6]); break; }
  if (va.norm && vb.norm) {
    let dot = 0;
    for (const [w, x] of va.v) { const y = vb.v.get(w); if (y) dot += x * y; }
    const cos = dot / (va.norm * vb.norm);
    // only within one country: across countries, near-identical wording marks a template (one more
    // country joining a treaty), not a shared story
    if (cos >= SAME_STORY && a.country && a.country === b.country) why.push([`wording:${cos.toFixed(2)}`, 10 * cos]);
  }
  // Within one country any tie counts. Across countries it takes two different kinds of tie, a tie
  // named by hand, or an article link to or from an international entry such as a treaty.
  const kinds = new Set(why.map(([k]) => k.split(":")[0]));
  const same = a.country && a.country === b.country;
  const intl = !a.country || !b.country;
  // A single shared source is usually a country's general overview, too broad to tie two entries
  // on its own; two shared sources, or a source with any other tie, count.
  const onlyOneSource = kinds.size === 1 && kinds.has("source") && shared < 2;
  const counts = same ? why.length > 0 && !onlyOneSource : kinds.has("named") || kinds.size >= 2 || (intl && kinds.has("article"));
  return { why, score: counts ? why.reduce((n, [, x]) => n + x, 0) : 0 };
}

// up to `limit` entries related to `ch`, leaving out those in `skip`, oldest first
export function relatedTo(ch, skip = [], limit = 5) {
  if (ch.estimate) return [];
  return dated
    .filter((x) => x !== ch && !skip.includes(x))
    .map((x) => [x, tie(ch, x).score])
    .filter(([, s]) => s > 0)
    .sort((x, y) => y[1] - x[1])
    .slice(0, limit)
    .map(([x]) => x)
    .sort((x, y) => x.date.localeCompare(y.date));
}
