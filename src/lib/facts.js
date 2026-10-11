// "Did you know?" on the home page: short curious cases, each linked into the site.
// Three groups: computed from the scores (so they stay true when the data changes), curated
// from the country write-ups, and drawn from the history in /changes.yaml. Keep the curated
// and history ones in step with the files they come from.
//
// Links are written inline: [[DE|Germany]] opens a country, [[h:canada-ban-1923|banned it]]
// opens a history entry. `kicker` is the small label above the fact; `history` adds a
// "the full story" link to that entry. Unknown countries or entries stop the build.
import { SEGMENTS, countries, changes, regions, segAvg, worldAvg } from "./countries.js";

const seg = (id) => SEGMENTS.findIndex((s) => s.id === id);
const P = seg("possession"), C = seg("cultivation"), S = seg("sharing"), A = seg("access");
const list = (names) => names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];
const byId = (id) => countries.find((c) => c.id === id);
const link = (c) => `[[${c.id}|${c.name}]]`;

function computed() {
  const top = countries[0];
  const zero = countries.filter((c) => c.score === 0);
  const growers = countries.filter((c) => c.s[C] >= 4);
  const noShop = countries.filter((c) => c.s[P] >= 5 && c.s[A] <= 1);
  const lowest = segAvg.indexOf(Math.min(...segAvg));
  const medOnly = countries.filter((c) => ["illegal", "death"].includes(c.rec) && c.med !== "no");
  const regionAvg = regions
    .map((r) => {
      const cs = countries.filter((c) => c.region === r);
      return { r, avg: cs.reduce((a, c) => a + c.raw, 0) / cs.length };
    })
    .sort((a, b) => b.avg - a.avg);

  return [
    { kicker: "The ceiling", text: `The best score in the world is only ${top.score} out of 100. ${link(top)} leads the index, but its caps on how much you may carry and grow keep it barely past the halfway mark.` },
    { kicker: "The floor", text: `${zero.length} countries score exactly zero: ${list(zero.map(link))}. In each, even a small amount means prison or corporal punishment.` },
    { kicker: "Home growing", text: `Growing a few plants at home is legal in just ${growers.length} of ${countries.length} countries.` },
    { kicker: "Legal to have, nowhere to buy", text: `${noShop.length} countries let adults possess cannabis but offer no real legal way to obtain it — among them ${list(noShop.slice(0, 4).map(link))}.` },
    { kicker: "The rarest freedom", text: `${SEGMENTS[lowest].name} is the rarest freedom. The world average is ${segAvg[lowest].toFixed(1)} out of 10, lower than for any other segment.` },
    { kicker: "Medicine only", text: `${medOnly.length} countries allow some medical use of cannabis while keeping recreational use fully illegal.` },
    { kicker: "By region", text: `${regionAvg[0].r} is the freest region, averaging ${Math.round(regionAvg[0].avg)}. ${regionAvg.at(-1).r} is the strictest at ${Math.round(regionAvg.at(-1).avg)}. The world average is ${worldAvg.toFixed(1)}.` },
  ];
}

const curated = [
  { kicker: "Germany", text: "In [[DE|Germany]] you may grow three plants and carry 25 g — but giving any of it to a friend, even for free, is still a crime. That is why it scores 1 out of 10 for sharing.", history: "germany-cannabis-act-2024" },
  { kicker: "Singapore", text: "[[SG|Singapore]] prosecutes its citizens and permanent residents for using cannabis abroad, even in countries where it is legal, and can test them when they return." },
  { kicker: "Uruguay", text: "[[UY|Uruguay]] was [[h:uruguay-legalisation-2013|the first country to legalise]], in 2013. Buyers register with the state and are verified by fingerprint at the pharmacy; tourists are not allowed to buy." },
  { kicker: "Japan", text: "Until December 2024, [[JP|Japan]] punished possessing cannabis but not using it. The law now [[h:japan-use-criminalised-2024|makes use itself a crime]], with up to seven years in prison for possession." },
  { kicker: "North Korea", text: "[[KP|North Korea]] is often called a cannabis paradise online. Its penal code actually lists cannabis alongside cocaine and heroin; the myth probably comes from legal hemp and a rough local tobacco." },
  { kicker: "Colombia", text: "[[CO|Colombia]] lets adults grow up to 20 plants with no licence or registration — one of the most generous home-grow allowances anywhere — yet has no legal shops.", history: "colombia-twenty-plants-2015" },
  { kicker: "Switzerland", text: "[[CH|Switzerland]] has an unusual sharing rule: handing up to 10 g to another adult for free, to consume together, is not punishable. And since 2023 police [[h:switzerland-possession-legal-2023|may not even confiscate]] that amount." },
  { kicker: "Palau", text: "In [[PW|Palau]], giving away less than an ounce is punished like simple possession, with a fine, rather than as trafficking." },
  { kicker: "Fiji", text: "[[FJ|Fiji]]'s Court of Appeal has told judges not to jail people for up to 100 g of cannabis: fines, community service or a warning instead." },
  { kicker: "Nauru", text: "[[NR|Nauru]], population about 12,000, has the harshest rule in the Pacific islands: a mandatory minimum of 12 months in prison for possessing any illicit drug." },
  { kicker: "India", text: "In [[IN|India]] the flowers and resin are banned, but bhang, made from cannabis leaves, is legal and sold in government-licensed shops in several states." },
  { kicker: "Malta", text: "[[MT|Malta]] was [[h:malta-legalisation-2021|the first EU country to legalise]], in 2021 — but there are no shops, only non-profit associations capped at 500 members each." },
];

// Curious cases from the history. Each one restates its entry in /changes.yaml.
const fromHistory = [
  { kicker: "1787 · Madagascar", history: "madagascar-merina-ban-1787", text: "One of the earliest national bans on record is from [[MG|Madagascar]]: in 1787 King Andrianampoinimerina prohibited cannabis across the Merina kingdom, with death as the penalty." },
  { kicker: "1798 · India", history: "india-bhang-tax-1798", text: "In 1798 the British Parliament taxed bhang, ganja and charas in [[IN|India]], saying the aim was to reduce consumption. Attempts to make cannabis a crime in 1838, 1871 and 1877 were never enacted." },
  { kicker: "1800 · Egypt", history: "egypt-french-ban-1800", text: "In October 1800 the French army occupying [[EG|Egypt]] banned hashish, alarmed by its use among its own troops." },
  { kicker: "1874 · Egypt", history: "egypt-import-tax-1874", text: "[[EG|Egypt]] forbade importing cannabis in [[h:egypt-first-ban-1868|1868]]. Six years later it put a tax on those same imports." },
  { kicker: "1830 · Brazil", history: "brazil-rio-pango-ban-1830", text: "Rio de Janeiro's council banned cannabis in 1830. A seller paid a fine of 20 milreis; a slave or anyone else caught using it faced up to three days in prison. [[BR|Brazil]]'s other councils followed." },
  { kicker: "1894 · India", history: "india-hemp-drugs-commission-1894", text: "After hearing nearly 1,200 witnesses, the Indian Hemp Drugs Commission concluded in 1894 that moderate use does practically no harm and that a ban would be unjustified. [[IN|India]] taxed and licensed cannabis until 1985." },
  { kicker: "1915 · Trinidad", history: "trinidad-ganja-licensing-1915", text: "[[TT|Trinidad and Tobago]] set up licensed ganja sellers in 1915. Ten years later it [[h:trinidad-ganja-ordinance-1925|banned the plant outright]]." },
  { kicker: "1923 · Canada", history: "canada-ban-1923", text: `[[CA|Canada]]${countries[0].id === "CA" ? ", today's highest-scoring country," : ""} banned cannabis in 1923 without a word of debate in Parliament. Nobody has established why: there was almost no use, and the first seizure came nine years later.` },
  { kicker: "1923 · South Africa", history: "south-africa-league-request-1923", text: `It was [[ZA|South Africa]] that asked the League of Nations in 1923 to treat cannabis like opium and cocaine. A century later it ranks #${byId("ZA")?.rank} in the world for cannabis freedom.` },
  { kicker: "1934 · China", history: "china-xinjiang-hashish-trade-ended-1934", text: "Until 1934 hashish was exported legally from Xinjiang in [[CN|China]] to British India, under a tariff." },
  { kicker: "1937 · Uruguay", history: "uruguay-narcotics-law-1937", text: "[[UY|Uruguay]] made hashish a state monopoly sold only by pharmacies in 1937. Eighty years later its pharmacies [[h:uruguay-pharmacy-sales-2017|started selling cannabis again]] — this time without a prescription." },
  { kicker: "1940 · Mexico", history: "mexico-brief-legalisation-1940", text: "For five months in 1940 [[MX|Mexico]] let doctors prescribe drugs to users through state dispensaries. The United States cut off its exports of medical narcotics, and Mexico [[h:mexico-regulation-suspended-1940|suspended the rule]]." },
  { kicker: "1944 · United States", history: "us-la-guardia-report-1944", text: "A five-year study ordered by the mayor of New York found in 1944 that marijuana did not lead to addiction, crime or harder drugs. The federal narcotics bureau attacked it, and [[US|US]] law did not change." },
  { kicker: "1953 · Netherlands", history: "netherlands-possession-ban-1953", text: "The [[NL|Netherlands]] only made possessing cannabis an offence in 1953 — just over twenty years before it [[h:netherlands-toleration-1976|became known for tolerating it]]." },
  { kicker: "1966 · Nigeria", history: "nigeria-indian-hemp-decree-1966", text: "[[NG|Nigeria]]'s 1966 Indian Hemp Decree set death or 21 years for growing cannabis and at least ten years for possessing it. The death penalty [[h:nigeria-death-penalty-removed-1975|was dropped in 1975]]." },
  { kicker: "1973 · Nepal", history: "nepal-shops-closed-1973", text: "Kathmandu had licensed cannabis shops until 16 July 1973, when [[NP|Nepal]] cancelled every licence under pressure from the United States and the United Nations." },
  { kicker: "1975 · Comoros", history: "comoros-legalisation-1975", text: "Cannabis was legal in the [[KM|Comoros]] for three years: President Ali Soilih lifted the ban in 1975, and the government that overthrew him [[h:comoros-ban-restored-1978|restored it in 1978]]." },
  { kicker: "1988 · United States", history: "us-dea-judge-young-1988", text: "In 1988 the drug agency's own judge in the [[US|United States]] ruled that cannabis should be rescheduled, calling it one of the safest therapeutically active substances known. The agency's head rejected the ruling." },
  { kicker: "1995 · Nepal", history: "nepal-pashupati-distribution-ended-1995", text: "Until 1995 the trust that runs [[NP|Nepal]]'s Pashupatinath temple handed holy men marijuana at the Shivaratri festival — taken from the Home Ministry's confiscated stock." },
  { kicker: "2003 · Portugal", history: "portugal-seeds-law-2003", text: "[[PT|Portugal]]'s drug law controls one very specific thing: since 2003 its list has included \"cannabis seeds not intended for sowing\"." },
  { kicker: "2012 · Italy", history: "italy-seeds-ruling-2012", text: "[[IT|Italy]]'s top court ruled in 2012 that selling cannabis seeds is not a crime, because what the buyer will do with them cannot be known." },
  { kicker: "2017 · Indonesia", history: "indonesia-fidelis-case-2017", text: "In [[ID|Indonesia]] a man was jailed for eight months in 2017 for growing cannabis to treat his wife. She died while he was detained." },
  { kicker: "2022 · Russia", history: "russia-griner-sentence-2022", text: "[[RU|Russia]] sentenced an American basketball player to nine years in 2022 for 0.7 grams of cannabis oil. She was freed in a prisoner exchange that December." },
  { kicker: "2022–2025 · Thailand", history: "thailand-prescription-only-2025", text: "[[TH|Thailand]] went from [[h:thailand-decriminalisation-2022|thousands of open dispensaries]] to prescription-only in three years. Since June 2025 cannabis flower officially requires a prescription." },
  { kicker: "2024 · Morocco", history: "morocco-royal-pardon-2024", text: "[[MA|Morocco]]'s sultan [[h:morocco-hassan-regulations-1890|licensed tribes of the Rif to grow kif]] in 1890. In 2024 its king pardoned 4,831 people convicted, prosecuted or wanted over growing it." },
];

// Turn the inline [[…|…]] links into parts the component can render, checking each target.
function parse(text) {
  return text.split(/(\[\[[^\]]+\]\])/).filter(Boolean).map((part) => {
    const m = part.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
    if (!m) return part;
    if (m[1].startsWith("h:")) {
      const change = changes.find((ch) => ch.id === m[1].slice(2));
      if (!change) throw new Error(`facts.js: unknown history entry "${m[1].slice(2)}"`);
      return { label: m[2], change };
    }
    const country = byId(m[1]);
    if (!country) throw new Error(`facts.js: unknown country "${m[1]}"`);
    return { label: m[2], country };
  });
}

export function getFacts() {
  return [...fromHistory, ...curated, ...computed()].map((f) => {
    const history = f.history ? changes.find((ch) => ch.id === f.history) : null;
    if (f.history && !history) throw new Error(`facts.js: unknown history entry "${f.history}"`);
    return { kicker: f.kicker, parts: parse(f.text), history };
  });
}
