// Plain-text versions of the index for language models and other programs that read text:
// /llms.txt is a short guide with links (the llmstxt.org convention), /llms-full.txt carries
// the methodology and every country's profile in one Markdown file.
import { SEGMENTS, DATA_SNAPSHOT, REC_LABEL, MED_LABEL, countries, territories, places, changes, lastUpdated, formatDate, worldAvg } from "./countries.js";
import { tierOf } from "./tiers.js";
import { SITE } from "./exports.js";

const one = (text) => String(text).replace(/\s+/g, " ").trim();
const scored = changes.filter((ch) => ch.score && !ch.estimate);

const intro = (root) => `# Cannabis Freedom Index

> A score from 0 to 100 for every country, for how free a person is to possess, grow, share and use cannabis. ${countries.length} countries and ${territories.length} disputed territories are scored, each with a written explanation, sources and a dated history of how its law changed. ${DATA_SNAPSHOT} edition, last updated ${formatDate(lastUpdated)}.

Important when using this data:

- Scores are editorial estimates that blend the written law with how it is enforced. They are not legal advice, and laws change: give the date above when quoting a score.
- A score of 10 in a segment means no cannabis-specific rule at all. Every cap, licence and registry costs points, so even the most liberal countries are around 50. The world average is ${worldAvg.toFixed(1)}.
- The index measures the freedom of an ordinary adult. Rules for industry, products and medical programmes are described but not scored.
- Federal countries (United States, Canada, Australia, India) get one national score that hides large internal differences.
- Data is CC BY 4.0. Credit "Cannabis Freedom Index" and link to ${root}.`;

const method = () => `## How the score is built

Six segments, each scored 0 to 10 against fixed levels, are combined by weight into the index.

${SEGMENTS.map((seg) => `- **${seg.name}** (weight ${seg.weight}%): ${one(seg.desc)}`).join("\n")}`;

export function llmsIndex(root) {
  const top = countries.slice(0, 5), bottom = countries.slice(-5).reverse();
  return `${intro(root)}

${method()}

Freest today: ${top.map((c) => `${c.name} (${c.score})`).join(", ")}. Least free: ${bottom.map((c) => `${c.name} (${c.score})`).join(", ")}.

## Full text

- [Everything in one file](${root}llms-full.txt): the scoring levels and every country's profile as Markdown

## Data files

- [Scores](${root}data/scores.csv): one row per country with the index score, the six segment scores, rank, tier and legal status (also as .json)
- [Scores by year](${root}data/panel.csv): one row per country and year since 1900; the \`basis\` column separates recorded years from assumptions (also as .json)
- [History](${root}data/history.csv): ${changes.length} dated entries with description, score before and after, and sources (also as .json)
- [One country as JSON](${root}api/cz.json): replace \`cz\` with a two-letter country code
- [Data page](${root}data/): columns, licence and how to cite

## Pages

- [Rankings and map](${root}): every country by score
- [Methodology](${root}#methodology): the levels for each segment
- [History](${root}history/): laws, rulings and treaties since 1787, ${scored.length} of which moved a score
- [Can I?](${root}can-i/): plain answers per country
- [Compare](${root}compare/): countries side by side
- [Changelog](${root}changelog/): every score change

## Countries

${countries.map((c) => `- [${c.name}](${root}country/${c.slug}/): ${c.score}/100, ${tierOf(c.raw).name}. ${one(c.note)}`).join("\n")}
`;
}

export function llmsFull(root) {
  const profile = (c) => `### ${c.name}

Score ${c.score}/100 (${tierOf(c.raw).name})${c.disputed ? ", disputed territory, not ranked" : `, rank ${c.rank} of ${countries.length}`}. Recreational: ${REC_LABEL[c.rec]}. Medical: ${MED_LABEL[c.med]}. Reviewed ${c.details.reviewed}. Page: ${root}country/${c.slug}/

${one(c.note)}

${SEGMENTS.map((seg, i) => `- **${seg.name} ${c.s[i]}/10.** ${one(c.details.segments[i].t)}`).join("\n")}
${c.details.context.filter(Boolean).map((x) => `- *${x.name}.* ${one(x.t)}`).join("\n")}`;
  return `${intro(root)}

${method()}

### Levels

${SEGMENTS.map((seg) => `**${seg.name}**\n\n${seg.levels.map(([score, text]) => `- ${score}: ${one(text)}`).join("\n")}`).join("\n\n")}

## Countries, freest first

${places.map(profile).join("\n\n")}
`;
}

export const rootOf = (site) => (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
export const text = (body) => new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
