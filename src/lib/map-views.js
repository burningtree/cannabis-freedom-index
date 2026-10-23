// Every way the world map can be coloured, each with its own page under /map/ that shows just
// the map, large, so a view can be linked to directly. `metric` is the value the map script uses.
// The overall index is at /map/ itself.
import { SEGMENTS } from "./countries.js";
import { STATUS_SECTIONS } from "./segment-ids.js";
import { PRICE_MARKETS, PRICE_MARKET_LABEL } from "./prices.js";
import { SHOW_PRICES } from "./config.js";
import { MAPPED } from "./datasets.js";

const segmentSlug = { possession: "possession", cultivation: "cultivation", enforcement: "enforcement", sharing: "sharing", consumption: "consumption", access: "access" };

export const MAP_VIEWS = [
  { slug: "", metric: "index", title: "World map of cannabis freedom",
    lede: "Every country coloured by its Cannabis Freedom Index score, from 0 to 100. Red means prison risk, green means free." },
  ...SEGMENTS.map((s, i) => ({
    slug: segmentSlug[s.id], metric: String(i), column: `s${i}`,
    title: `${s.name}: cannabis laws by country`,
    lede: `${s.desc} Every country scored from 0 to 10 on this one part of the index. Red means prison risk, green means free.`,
  })),
  { slug: "users", metric: "users", title: "Cannabis users by country",
    lede: "How many people used cannabis in the past year. Each survey rate is applied to a population of the same age band. The stronger the blue, the more users." },
  { slug: "share-of-adults", metric: "prevalence", title: "Share of adults who use cannabis, by country",
    lede: "The share of adults who used cannabis in the past year, from each country's latest national survey (most ask people aged 15 to 64). The stronger the blue, the higher the share." },
  { slug: "use-against-freedom", metric: "ratio", title: "Cannabis use against cannabis freedom, by country",
    lede: "The share of people who use cannabis divided by the country's index score: where use runs far ahead of what the law allows." },
  { slug: "culture", metric: "culture", title: "Cannabis culture around the world",
    lede: "How much of each country's cannabis culture the atlas covers: the words for the plant, the customs and faiths it belongs to, and the people who shaped its laws. The stronger the blue, the more entries." },
  { slug: "recreational", metric: "status:rec", title: "Where recreational cannabis is legal",
    lede: "The legal status of cannabis for adults in every country: legal, tolerated, decriminalised, illegal, or punishable by death." },
  { slug: "medical", metric: "status:med", title: "Where medical cannabis is legal",
    lede: "Whether patients can get cannabis legally in each country: a full programme, limited access, or none." },
  // the outside datasets (datasets.js), one view each
  ...MAPPED.map((ds) => ({ slug: ds.map.slug, metric: `data:${ds.id}`, title: ds.map.title, lede: ds.map.lede })),
  ...(SHOW_PRICES ? PRICE_MARKETS.map((market) => ({ slug: `price-${market}`, metric: `price:${market}`, title: `Cannabis prices by country: ${PRICE_MARKET_LABEL[market].toLowerCase()}`,
    lede: "The latest sourced retail price of a gram of flower in each country, in US dollars." })) : []),
  { slug: "seeds", metric: "plant:seeds", column: "seeds", title: "Where cannabis seeds are legal",
    lede: "Whether an adult may have and sow cannabis seeds in each country. Hatched countries have not been researched yet." },
  { slug: "seed-sales", metric: "plant:seeds_trade", column: "seeds_trade", title: "Where cannabis seeds can be sold",
    lede: "Whether cannabis seeds may be sold or handed on in each country: freely, by regulated sellers only, as gifts, or not at all." },
  { slug: "clones", metric: "plant:clones", column: "clones", title: "Where cannabis clones are legal",
    lede: "Whether an adult may have and grow cannabis cuttings in each country. Hatched countries have not been researched yet." },
  { slug: "clone-sales", metric: "plant:clones_trade", column: "clones_trade", title: "Where cannabis clones can be sold",
    lede: "Whether cannabis cuttings may be sold or handed on in each country." },
  ...Object.entries(STATUS_SECTIONS).map(([key, section]) => ({
    slug: key, metric: `status:${key}`, column: key,
    title: { clubs: "Cannabis clubs by country", driving: "Cannabis and driving: the rule in every country", visitors: "Can visitors buy cannabis? Country by country" }[key] ?? `${section.name} by country`,
    lede: section.sub,
  })),
];
export const viewByMetric = Object.fromEntries(MAP_VIEWS.map((v) => [v.metric, v]));
