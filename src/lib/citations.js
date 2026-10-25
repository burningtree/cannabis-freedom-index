// Every citation on the site, with who cites it and where. Used by /sources/ for its counts and by
// /sources/cited.json for the "cited in" lists under each book and website.
// One citation = one source listed once by an owner: a country profile (one of its sections, or its
// list of states), a state or province, a history entry, an article or a culture entry.
//   s: the source as written   where: the country it was cited for, "" for international ones
//   owner: { key, url, title, sub, flag, kind, order }   at: the sections of a country profile that cite it
import { getCollection } from "astro:content";
import { places, changes, SEGMENTS, CONTEXT } from "./countries.js";
import { cultureEntries, cultureSection } from "./culture.js";
import { archivedUrl } from "./archive.js";

const placeOf = new Map(places.map((c) => [c.slug, c]));
const changeOf = new Map(changes.map((ch) => [ch.id, ch]));
const SECTION_NAME = new Map([...SEGMENTS.map((s) => [s.id, s.name]), ...CONTEXT]);

const owners = new Map();
const owner = (key, make) => owners.get(key) ?? owners.set(key, { key, ...make() }).get(key);
const countryOwner = (c) => owner(`c:${c.slug}`, () => ({ kind: "country", url: `country/${c.slug}/`, title: c.name, flag: c.flag, order: c.name }));
const changeOwner = (ch, article) => owner(`${article ? "a" : "h"}:${ch.id}`, () => ({ kind: article ? "article" : "history", url: `history/${ch.id}/`, title: ch.title, sub: ch.date.slice(0, 4), flag: ch.place.flag, order: ch.date }));

export const cites = [];
for (const { id, data } of await getCollection("countries")) {
  const slug = id.split("/")[0], c = placeOf.get(slug);
  // which sections cite each source key
  const at = new Map();
  for (const [name, block] of Object.entries({ ...data.segments, ...data.context })) for (const key of block?.sources ?? []) at.set(key, [...(at.get(key) ?? []), SECTION_NAME.get(name) ?? name]);
  for (const [key, s] of Object.entries(data.sources)) cites.push({ s, where: slug, owner: c && countryOwner(c), at: at.get(key) ?? [] });
  for (const s of data.subunits?.sources ?? []) cites.push({ s, where: slug, owner: c && countryOwner(c), at: [`${data.subunits.plural.replace(/^./, (x) => x.toUpperCase())} overview`] });
}
for (const { id, data } of await getCollection("units")) {
  const [slug, unit] = id.split("/"), c = placeOf.get(slug);
  const o = c && owner(`u:${id}`, () => ({ kind: "country", url: `country/${slug}/${unit}/`, title: `${data.name}, ${c.name}`, flag: c.flag, order: `${c.name} ${data.name}` }));
  for (const s of data.sources) cites.push({ s, where: slug, owner: o, at: [] });
}
// the sources as written; `changes` holds them already shortened for display
for (const { data } of await getCollection("changes")) {
  const ch = changeOf.get(data.id);
  for (const s of data.sources) cites.push({ s, where: ch.country?.slug ?? "", owner: changeOwner(ch, false), at: [] });
}
for (const a of await getCollection("articles")) {
  const ch = changeOf.get(a.id);
  for (const s of a.data.sources) cites.push({ s, where: ch.country?.slug ?? "", owner: changeOwner(ch, true), at: [] });
}
for (const e of cultureEntries) {
  const o = owner(`u:${e.url}`, () => ({ kind: "culture", url: e.url, title: e.title, sub: cultureSection(e.section).name, flag: e.countries[0].flag, order: e.title }));
  for (const s of e.entry.data.sources) cites.push({ s, where: e.countries.length === 1 ? e.countries[0].slug : "", owner: o, at: [] });
}
export const isBook = (s) => s.type === "book" || s.type === "chapter" || Boolean(s.container);
// the same slug as in scripts/book-covers.cjs, which names the cover files by it
export const bookSlug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
export const domainOf = (url) => new URL(url).hostname.replace(/^www\./, "");

// Every web page cited, once, and how many have a copy in the Internet Archive (an archive.org page
// counts as one already). Only cited pages count: an address left in source-archive.json for a
// source that is no longer cited adds nothing (scripts/archive-sources.cjs prune forgets those).
export const citedUrls = new Set(cites.filter((x) => x.s.url).map((x) => x.s.url));
export const isArchived = (u) => Boolean(archivedUrl(u)) || /^https?:\/\/([a-z0-9-]+\.)?archive\.org\//i.test(u);
export const archivedCount = [...citedUrls].filter(isArchived).length;
