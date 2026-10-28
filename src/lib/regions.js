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
    slug: "brics", name: "BRICS", short: "BRICS",
    about: "The ten members of BRICS: Brazil, Russia, India, China and South Africa, joined by Egypt, Ethiopia, Iran and the United Arab Emirates in 2024 and Indonesia in 2025.",
    members: ["br", "ru", "in", "cn", "za", "eg", "et", "ir", "ae", "id"],
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
