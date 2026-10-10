// Wording and structured data for search engines: titles that match what people type
// ("is weed legal in Germany"), and schema.org objects for the pages.
import { REC_LABEL, REC_HELP, MED_LABEL } from "./countries.js";
import { SEGMENT_IDS } from "./segment-ids.js";
import { answersFor } from "./answers.js";
import { SITE } from "./exports.js";

const THE = /^(United |Netherlands|Bahamas|Philippines|Maldives|Gambia|Dominican Republic|Central African Republic|Comoros|Seychelles|Solomon Islands|Marshall Islands|DR Congo)/;
// "in the Netherlands", "in Germany"
export const inPlace = (name) => `in ${THE.test(name) ? "the " : ""}${name}`;

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

// A country page: title, description and structured data (the questions the page answers).
export function countrySeo(c, site) {
  const where = inPlace(c.name);
  const year = c.details.reviewed.slice(0, 4);
  const status = `Recreational cannabis: ${REC_LABEL[c.rec].toLowerCase()}. Medical: ${MED_LABEL[c.med].toLowerCase()}.`;
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: c.details.reviewed,
    mainEntity: [
      { q: `Is weed legal ${where}?`, a: `${REC_LABEL[c.rec]}: ${REC_HELP[c.rec].toLowerCase()}. ${c.note}` },
      ...answersFor(c.s).map((x) => ({ q: QUESTION[x.id](where), a: `${x.label}. ${x.text}. ${c.details.segments[SEGMENT_IDS.indexOf(x.seg)].t}` })),
    ].map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return {
    seoTitle: `Is weed legal ${where}? Cannabis laws ${year}`,
    description: `${status} ${c.note} Cannabis freedom score: ${c.score} out of 100${c.rank ? `, #${c.rank} in the world` : ""}.`,
    jsonld: [faq, crumbs(site, [["Cannabis Freedom Index", ""], [c.name, `country/${c.slug}/`]])],
  };
}

// A state or province page.
export function subunitSeo(c, sub, site) {
  return {
    seoTitle: `Is weed legal in ${sub.name}? Cannabis laws in ${sub.name}, ${c.name}`,
    jsonld: [crumbs(site, [["Cannabis Freedom Index", ""], [c.name, `country/${c.slug}/`], [sub.name, `country/${c.slug}/${sub.id}/`]])],
  };
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
