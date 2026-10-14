// The cultural atlas: culture/<section>/<slug>.md, loaded and tied to the rest of the site.
// Every entry names the countries where the word is said or the custom kept, and the history
// entries it touches; both must exist, so a typing mistake stops the build.
import { getCollection } from "astro:content";
import { places, changes } from "./countries.js";
import { sourceTuple } from "./sources.js";

// The parts of the atlas, in menu order. `entries: true` means the section is made of files in
// /culture/<id>/; the others are single pages. `soon` marks a part with nothing to read yet.
// `short` is the one line shown for the part on the Culture page; `lede` heads its own page.
export const CULTURE_SECTIONS = [
  { id: "language", name: "Language", short: "Words for the plant, where they come from and where they are said.",  entries: true, one: "word", lede: "Bhang, charas, dagga, ganja, kif, 420: the words people have for the plant, where each comes from and where it is said.", intro: "A name for cannabis is rarely only a name. It says which part of the plant is meant, who brought it, and often what the people in charge thought of those who used it." },
  { id: "traditions", name: "Traditions", short: "Rituals, customs and places shaped by cannabis.",  entries: true, one: "tradition", lede: "Rituals, faiths, customs and gathering places, and what the law made of each.", intro: "Where cannabis belongs to a festival, a faith, a daily habit or a neighbourhood's social life, the law has had to decide what to do about it: write an exception, look away, or prosecute." },
  { id: "history", name: "History", short: "Attitudes, propaganda and counterculture in the record of laws.",  lede: "Social attitudes, propaganda and counterculture: the places where the record of laws shows what people thought." },
  { id: "people", name: "People", short: "Icons, activists and historical figures.",  soon: true, lede: "Cultural icons, activists and historical figures." },
  { id: "stories", name: "Stories", short: "Experiences told by the people who live with these laws.",  lede: "Personal experiences and ethnographic accounts, gathered from the people who live with these laws." },
];
export const cultureSection = (id) => CULTURE_SECTIONS.find((s) => s.id === id);

export const cultureEntries = (await getCollection("culture"))
  .map((entry) => {
    const [section, slug] = entry.id.split("/");
    const file = `culture/${entry.id}.md`;
    if (!cultureSection(section)?.entries) throw new Error(`${file}: "${section}" is not a section that holds entries`);
    const d = entry.data;
    const countries = d.countries.map((code) => {
      const c = places.find((x) => x.slug === code);
      if (!c) throw new Error(`${file}: there is no country "${code}"`);
      return c;
    });
    const history = d.history.map((id) => {
      const ch = changes.find((x) => x.id === id);
      if (!ch) throw new Error(`${file}: there is no history entry "${id}"`);
      return ch;
    }).sort((a, b) => a.date.localeCompare(b.date));
    // links in the text to pages of this site must lead somewhere
    for (const [, kind, id] of (entry.body ?? "").matchAll(/\]\(\/(history|country)\/([^/)#]+)\/?[^)]*\)/g)) {
      const found = kind === "history" ? changes.some((x) => x.id === id) : places.some((x) => x.slug === id);
      if (!found) throw new Error(`${file}: the text links to /${kind}/${id}/, which does not exist`);
    }
    return { entry, section, slug, url: `culture/${section}/${slug}/`, ...d, countries, history, sources: d.sources.map(sourceTuple) };
  })
  // featured entries first, by rank; then the rest alphabetically
  .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity) || a.title.localeCompare(b.title));
// and so must links from one entry to another
for (const e of cultureEntries) for (const [, path] of (e.entry.body ?? "").matchAll(/\]\(\/(culture\/(?:language|traditions)\/[^/)#]+)\/?[^)]*\)/g)) {
  if (!cultureEntries.some((x) => x.url === path + "/")) throw new Error(`culture/${e.entry.id}.md: the text links to /${path}/, which does not exist`);
}

export const cultureIn = (section) => cultureEntries.filter((e) => e.section === section);
// what the atlas has on one country, for its page
export const cultureOf = (c) => cultureEntries.filter((e) => e.countries.includes(c));
