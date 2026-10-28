// Regions as pages of their own (/region/ and /region/<slug>/): the six continents every profile
// names under `region:`, and groupings of countries such as the European Union, listed here by
// country file name. For each: its countries and territories, the figures a page opens with, and
// its average score and score bands over time.
import { countries, places, changes, historyOf, worldAvg, REC_ORDER, MED_LABEL } from "./countries.js";

// Groupings beyond the continents. `members` are country file names; a new grouping needs only
// an entry here. Memberships as of 2026; `of` is the continent, left out for one that spans several.
const GROUPINGS = [
  {
    slug: "eu", name: "European Union", short: "EU", of: "Europe",
    about: "The 27 member states of the European Union. EU farm rules set a THC limit of 0.3% for hemp, while each member state writes its own criminal law on cannabis.",
    members: ["at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "ie", "it", "lv", "lt", "lu", "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se"],
  },
  {
    slug: "schengen", name: "Schengen Area", short: "Schengen", of: "Europe",
    about: "The 29 countries without border checks between them, Bulgaria and Romania fully since 2025: a traveller crosses from a country that tolerates cannabis into one that punishes it without a passport check.",
    members: ["at", "be", "bg", "hr", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "is", "it", "lv", "li", "lt", "lu", "mt", "nl", "no", "pl", "pt", "ro", "sk", "si", "es", "se", "ch"],
  },
  {
    slug: "nordic", name: "Nordic countries", short: "Nordic", of: "Europe",
    about: "Denmark, Finland, Iceland, Norway and Sweden, with Greenland and the Faroe Islands.",
    members: ["dk", "fi", "is", "no", "se", "gl", "fo"],
  },
  {
    slug: "asean", name: "ASEAN", short: "ASEAN", of: "Asia",
    about: "The 11 members of the Association of Southeast Asian Nations, Timor-Leste the newest since 2025.",
    members: ["bn", "kh", "id", "la", "my", "mm", "ph", "sg", "th", "vn", "tl"],
  },
  {
    slug: "gcc", name: "Gulf Cooperation Council", short: "Gulf", of: "Asia",
    about: "The six monarchies of the Gulf Cooperation Council: Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates.",
    members: ["ae", "bh", "kw", "om", "qa", "sa"],
  },
  {
    slug: "caricom", name: "Caribbean Community", short: "CARICOM", of: "North America",
    about: "The full members of the Caribbean Community, from the Bahamas to Suriname and Guyana. Montserrat, a British territory and also a member, has no profile here yet.",
    members: ["ag", "bs", "bb", "bz", "dm", "gd", "gy", "ht", "jm", "kn", "lc", "vc", "sr", "tt"],
  },
  {
    slug: "mercosur", name: "Mercosur", short: "Mercosur", of: "South America",
    about: "The full members of the Southern Common Market: Argentina, Bolivia, Brazil, Paraguay and Uruguay. Venezuela's membership is suspended.",
    members: ["ar", "bo", "br", "py", "uy"],
  },
  {
    slug: "g7", name: "Group of Seven", short: "G7",
    about: "The seven large economies of the G7: Canada, France, Germany, Italy, Japan, the United Kingdom and the United States.",
    members: ["ca", "fr", "de", "it", "jp", "gb", "us"],
  },
];

const slugOf = (name) => name.toLowerCase().replace(/\W+/g, "-");
const CONTINENTS = [...new Set(countries.map((c) => c.region))].sort().map((name) => ({ slug: slugOf(name), name, short: name, kind: "continent" }));

const median = (vs) => { const s = [...vs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

function build(r, list) {
  const members = list.filter((c) => !c.territory).sort((a, b) => b.raw - a.raw || a.name.localeCompare(b.name));
  const territories = list.filter((c) => c.territory).sort((a, b) => a.name.localeCompare(b.name));
  const ids = new Set(list.map((c) => c.id));
  const population = members.reduce((n, c) => n + c.population, 0);
  const users = members.reduce((n, c) => n + (c.use?.users ?? 0), 0);
  const avg = members.reduce((n, c) => n + c.raw, 0) / members.length;
  const avgByPeople = members.reduce((n, c) => n + c.raw * c.population, 0) / population;
  const count = (key, value) => members.filter((c) => c[key] === value).length;
  return {
    ...r, members, territories, all: [...members, ...territories], population, users, avg, avgByPeople, median: median(members.map((c) => c.raw)),
    vsWorld: avg - worldAvg,
    rec: REC_ORDER.map((k) => ({ key: k, n: count("rec", k) })).filter((x) => x.n),
    med: Object.keys(MED_LABEL).map((k) => ({ key: k, n: count("med", k) })).filter((x) => x.n),
    // the latest history entries in the region, newest first
    latest: changes.filter((ch) => ch.country && ids.has(ch.country.id) && !ch.estimate).slice(0, 12),
    series: historyOf(members),
  };
}

export const regions = [
  ...CONTINENTS.map((r) => build(r, places.filter((c) => c.region === r.name))),
  ...GROUPINGS.map((g) => build({ ...g, kind: "grouping" }, places.filter((c) => g.members.includes(c.slug)))),
];
export const regionBySlug = Object.fromEntries(regions.map((r) => [r.slug, r]));
// the region page of a profile's continent, and of each grouping a country belongs to
export const regionsOf = (c) => regions.filter((r) => r.all.some((x) => x.id === c.id));
export const continentSlug = slugOf;
