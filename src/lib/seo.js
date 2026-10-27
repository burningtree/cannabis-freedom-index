// Wording and structured data for search engines: titles that match what people type
// ("is weed legal in Germany"), and schema.org objects for the pages.
import { REC_LABEL, REC_HELP } from "./countries.js";
import { SEGMENT_IDS } from "./segment-ids.js";
import { answersFor } from "./answers.js";
import { SITE } from "./exports.js";
import { lastChanged } from "./lastmod.js";

const THE = /^(United |Netherlands|Bahamas|Philippines|Maldives|Gambia|Dominican Republic|Central African Republic|Comoros|Seychelles|Solomon Islands|Marshall Islands|DR Congo)/;
// "the Netherlands", "Germany"
export const theName = (name) => `${THE.test(name) ? "the " : ""}${name}`;
// "in the Netherlands", "in Germany"
export const inPlace = (name) => `in ${theName(name)}`;

const root = (site) => (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
const QUESTION = {
  carry: (where) => `Can I carry cannabis ${where}?`,
  grow: (where) => `Can I grow cannabis ${where}?`,
  buy: (where) => `Can I buy cannabis ${where}?`,
  public: (where) => `Can I use cannabis in public ${where}?`,
  caught: (where) => `What happens if I'm caught with cannabis ${where}?`,
};
const crumbs = (site, trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: root(site) + path })),
});

// The search-result description of a country or state: the answer first. Its status in a
// sentence, then two of the quick answers (answers.js, checked against each profile): whether you
// can carry it, and whether you can buy it or, where there is no legal source, what happens if you
// are caught. Then the medical status and when the profile was reviewed; the score only while the
// whole stays short. Nothing is cut to fit: where that runs long or reads badly, the profile
// writes its own `seo_description` (the review date is still added here, so it cannot go stale).
const REC_SENTENCE = {
  legal: "is legal for adults, within limits",
  partial: "is partly legal or tolerated",
  decrim: "is decriminalised but still prohibited",
  illegal: "is illegal",
  death: "is illegal, with the death penalty for trafficking",
};
const MED_SENTENCE = { yes: "Medical cannabis: legal.", limited: "Medical cannabis: limited.", no: "No patient cannabis treatment route verified." };
const monthYear = (iso) => new Date(iso).toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const lower = (s) => s[0].toLowerCase() + s.slice(1);
export function placeDescription(x, name, reviewed) {
  if (x.seoDescription) return `${x.seoDescription} Reviewed ${monthYear(reviewed)}.`;
  const a = Object.fromEntries(answersFor(x).map((q) => [q.id, q]));
  // the carry and buy texts stand alone ("legal up to a limit"); "if caught" keeps its label ("Prison")
  const second = a.buy.answer === "no" ? `If caught: ${lower(a.caught.label)}; ${lower(a.caught.text)}.` : `Buying: ${lower(a.buy.text)}.`;
  const parts = [`Recreational cannabis ${inPlace(name)} ${REC_SENTENCE[x.rec]}.`, `Carrying: ${lower(a.carry.text)}.`, second, MED_SENTENCE[x.med], `Reviewed ${monthYear(reviewed)}.`];
  const text = parts.join(" ");
  const score = ` Freedom score ${x.score}/100.`;
  return text.length + score.length <= 230 ? text + score : text;
}

// A country page: title, description and structured data (the questions the page answers).
export function countrySeo(c, site) {
  const where = inPlace(c.name);
  const year = c.details.reviewed.slice(0, 4);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: c.details.reviewed,
    mainEntity: [
      { q: `Is weed legal ${where}?`, a: `${REC_LABEL[c.rec]}: ${REC_HELP[c.rec].toLowerCase()}. ${c.note}` },
      ...answersFor(c).map((x) => ({ q: QUESTION[x.id](where), a: `${x.label}. ${x.text}. ${c.details.segments[SEGMENT_IDS.indexOf(x.seg)].t}` })),
    ].map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return {
    seoTitle: `Is weed legal ${where}? Cannabis laws ${year}`,
    description: placeDescription(c, c.name, c.details.reviewed),
    jsonld: [faq, crumbs(site, [["Cannabis Freedom Index", ""], [c.name, `country/${c.slug}/`]])],
  };
}

// A state or province page.
export function subunitSeo(c, sub, site) {
  return {
    description: placeDescription(sub, `${sub.name}, ${c.name}`, sub.reviewed),
    seoTitle: `Is weed legal in ${sub.name}? Cannabis laws in ${sub.name}, ${c.name}`,
    jsonld: [crumbs(site, [["Cannabis Freedom Index", ""], [c.name, `country/${c.slug}/`], [sub.name, `country/${c.slug}/${sub.id}/`]])],
  };
}

// A page of the history or the cultural atlas as an Article: what it is about, the works it cites,
// and dates only where they are known: a long read has the day it was written and its file's last
// change; an entry without one has no dates at all (changes.yaml keeps none per entry).
const isoDay = (d) => d && (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);
const cites = (sources) => sources.filter(([, url]) => url).map(([name, url]) => ({ "@type": "CreativeWork", name, url }));
function article(site, path, { headline, description, about, sources, written, modified }) {
  const url = root(site) + path;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    image: `${root(site)}og/${path.replace(/\/$/, "")}.png`,
    isPartOf: { "@type": "WebSite", name: "Cannabis Freedom Index", url: root(site) },
    publisher: { "@type": "Organization", name: "Cannabis Freedom Index", url: root(site) },
    ...(about.length && { about: about.map((name) => ({ "@type": "Place", name })) }),
    ...(written && { datePublished: written }),
    ...(modified && { dateModified: modified }),
    ...(sources.length && { citation: cites(sources) }),
  };
}

// A history entry, with its long read when it has one (`long`, from articles/<id>.md).
export function historySeo(ch, long, site) {
  const written = isoDay(long?.data.written);
  const modified = long ? [lastChanged(`articles/${ch.id}.md`), written].filter(Boolean).sort().at(-1) : null;
  const path = `history/${ch.id}/`;
  return [
    article(site, path, { headline: ch.title, description: ch.description, about: ch.country ? [ch.unit ? `${ch.unit.name}, ${ch.country.name}` : ch.country.name] : [],
      sources: [...(long?.data.sources ?? []).map((s) => [s.title, s.url]), ...ch.sources], written, modified }),
    crumbs(site, [["Cannabis Freedom Index", ""], ["History", "history/"], [ch.title, path]]),
  ];
}

// An entry of the cultural atlas.
export function cultureSeo(e, section, site) {
  const written = isoDay(e.written);
  const modified = [lastChanged(`culture/${e.entry.id}.md`), written].filter(Boolean).sort().at(-1) ?? null;
  return [
    article(site, e.url, { headline: e.title, description: e.summary, about: e.countries.map((c) => c.name), sources: e.sources, written, modified }),
    crumbs(site, [["Cannabis Freedom Index", ""], ["Culture", "culture/"], [section.name, `culture/${section.id}/`], [e.title, e.url]]),
  ];
}

// The home page: the site itself and the dataset behind it.
export function homeSeo(site, count) {
  const url = root(site);
  return [
    { "@context": "https://schema.org", "@type": "WebSite", name: "Cannabis Freedom Index", url, description: `Cannabis laws and legality in ${count} countries, scored from 0 to 100.` },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Cannabis Freedom Index",
      description: `A score from 0 to 100 for how free cannabis is in each of ${count} countries, covering possession, home growing, enforcement, sharing, consumption and legal access, with sources and the history of each country's law.`,
      url,
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
      keywords: ["cannabis laws", "cannabis legality by country", "marijuana legalization", "decriminalization", "medical cannabis"],
      creator: { "@type": "Organization", name: "Cannabis Freedom Index", url },
      distribution: [
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${url}data/scores.csv` },
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${url}data/scores.json` },
      ],
    },
  ];
}
