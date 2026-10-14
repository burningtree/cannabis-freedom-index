// "Did you know?" on the home page: short curious cases, each linked into the site.
// Four groups: computed from the scores (so they stay true when the data changes), curated
// from the country write-ups, drawn from the history in /changes.yaml, and drawn from the
// cultural atlas in /culture. Keep the curated, history and culture ones in step with the files
// they come from.
//
// Links are written inline: [[DE|Germany]] opens a country, [[h:canada-ban-1923|banned it]]
// opens a history entry, [[c:language/bhang|bhang]] opens an atlas entry. A term that has an
// atlas entry is linked to it on its first use in a fact. `kicker` is the small label above the
// fact; `history` adds a "the full story" link to that entry and `culture` a "read the entry"
// link to an atlas entry. Unknown countries or entries stop the build.
import { SEGMENTS, countries, changes, regions, segAvg, worldAvg } from "./countries.js";
import { cultureEntries } from "./culture.js";

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
  { kicker: "Uruguay", text: "[[UY|Uruguay]] was [[h:uruguay-legalisation-2013|the first country to legalise]], in 2013, under [[c:people/jose-mujica|José Mujica]]. Buyers register with the state and are verified by fingerprint at the pharmacy; tourists are not allowed to buy." },
  { kicker: "Japan", text: "Until December 2024, [[JP|Japan]] punished possessing cannabis but not using it. The law now [[h:japan-use-criminalised-2024|makes use itself a crime]], with up to seven years in prison for possession." },
  { kicker: "North Korea", text: "[[KP|North Korea]] is often called a cannabis paradise online. Its penal code actually lists cannabis alongside cocaine and heroin; the myth probably comes from legal hemp and a rough local tobacco." },
  { kicker: "Colombia", text: "[[CO|Colombia]] lets adults grow up to 20 plants with no licence or registration — one of the most generous home-grow allowances anywhere — yet has no legal shops.", history: "colombia-twenty-plants-2015" },
  { kicker: "Switzerland", text: "[[CH|Switzerland]] has an unusual sharing rule: handing up to 10 g to another adult for free, to consume together, is not punishable. And since 2023 police [[h:switzerland-possession-legal-2023|may not even confiscate]] that amount." },
  { kicker: "Palau", text: "In [[PW|Palau]], giving away less than an ounce is punished like simple possession, with a fine, rather than as trafficking." },
  { kicker: "Fiji", text: "[[FJ|Fiji]]'s Court of Appeal has told judges not to jail people for up to 100 g of cannabis: fines, community service or a warning instead." },
  { kicker: "Nauru", text: "[[NR|Nauru]], population about 12,000, has the harshest rule in the Pacific islands: a mandatory minimum of 12 months in prison for possessing any illicit drug." },
  { kicker: "India", text: "In [[IN|India]] the flowers and resin are banned, but [[c:language/bhang|bhang]], made from cannabis leaves, is legal and sold in government-licensed shops in several states." },
  { kicker: "Malta", text: "[[MT|Malta]] was [[h:malta-legalisation-2021|the first EU country to legalise]], in 2021 — but there are no shops, only [[c:traditions/cannabis-social-clubs|non-profit associations]] capped at 500 members each." },
];

// Curious cases from the history. Each one restates its entry in /changes.yaml.
const fromHistory = [
  { kicker: "1563 · England", history: "england-hemp-mandate-1563", text: "In 1563 Elizabeth I ordered every landowner with 60 acres or more in England to grow hemp, or pay a fine of five pounds. The navy needed rope. The same country, the [[GB|United Kingdom]], [[h:uk-ban-1928|banned cannabis]] in 1928." },
  { kicker: "1787 · Madagascar", history: "madagascar-merina-ban-1787", text: "One of the earliest national bans on record is from [[MG|Madagascar]]: in 1787 King Andrianampoinimerina prohibited cannabis across the Merina kingdom, with death as the penalty." },
  { kicker: "1798 · India", history: "india-bhang-tax-1798", text: "In 1798 the British Parliament taxed [[c:language/bhang|bhang]], [[c:language/ganja|ganja]] and [[c:language/charas|charas]] in [[IN|India]], saying the aim was to reduce consumption. Attempts to make cannabis a crime in 1838, 1871 and 1877 were never enacted." },
  { kicker: "1800 · Egypt", history: "egypt-french-ban-1800", text: "In October 1800 the French army occupying [[EG|Egypt]] banned [[c:traditions/hashish-in-egypt|hashish]], alarmed by its use among its own troops." },
  { kicker: "1874 · Egypt", history: "egypt-import-tax-1874", text: "[[EG|Egypt]] forbade importing cannabis in [[h:egypt-first-ban-1868|1868]]. Six years later it put a tax on those same imports." },
  { kicker: "1830 · Brazil", history: "brazil-rio-pango-ban-1830", text: "Rio de Janeiro's council banned cannabis in 1830. A seller paid a fine of 20 milreis; a slave or anyone else caught using it faced up to three days in prison. [[BR|Brazil]]'s other councils followed." },
  { kicker: "1894 · India", history: "india-hemp-drugs-commission-1894", text: "After hearing nearly 1,200 witnesses, the Indian Hemp Drugs Commission concluded in 1894 that moderate use does practically no harm and that a ban would be unjustified. [[IN|India]] taxed and licensed cannabis until 1985." },
  { kicker: "1915 · Trinidad", history: "trinidad-ganja-licensing-1915", text: "[[TT|Trinidad and Tobago]] set up licensed [[c:language/ganja|ganja]] sellers in 1915. Ten years later it [[h:trinidad-ganja-ordinance-1925|banned the plant outright]]." },
  { kicker: "1922 · Ten tons", history: "de-monfreid-ten-tons-1922", text: "In 1922 a French adventurer shipped ten tons of Indian cannabis out of Bombay, labelled as insecticide. British officials watched it for two years, from the Seychelles to Hamburg. When the bags were finally opened, they held fertiliser." },
  { kicker: "1920 · United Kingdom", history: "uk-dangerous-drugs-act-1920", text: "When the [[GB|United Kingdom]] wrote its first Dangerous Drugs Act in 1920, cannabis was not left out on purpose: the committee never discussed it. Police asked for hashish to be added and were told there was no evidence that the habit was at all common." },
  { kicker: "1925 · United Kingdom", history: "uk-cannabis-poison-schedule-1925", text: "When cannabis was declared a poison in the [[GB|United Kingdom]] in 1925, the only objection raised in Parliament was about corn plasters: manufacturers who used it in them had five weeks to relabel millions of packets." },
  { kicker: "1923 · Canada", history: "canada-ban-1923", text: `[[CA|Canada]]${countries[0].id === "CA" ? ", today's highest-scoring country," : ""} banned cannabis in 1923 without a word of debate in Parliament. Nobody has established why: there was almost no use, and the first seizure came nine years later.` },
  { kicker: "1923 · South Africa", history: "south-africa-league-request-1923", text: `It was [[ZA|South Africa]] that asked the League of Nations in 1923 to treat cannabis like opium and cocaine. A century later it ranks #${byId("ZA")?.rank} in the world for cannabis freedom.` },
  { kicker: "1934 · China", history: "china-xinjiang-hashish-trade-ended-1934", text: "Until 1934 [[c:language/hashish|hashish]] was exported legally from Xinjiang in [[CN|China]] to British India, under a tariff." },
  { kicker: "1937 · Uruguay", history: "uruguay-narcotics-law-1937", text: "[[UY|Uruguay]] made [[c:language/hashish|hashish]] a state monopoly sold only by pharmacies in 1937. Eighty years later its pharmacies [[h:uruguay-pharmacy-sales-2017|started selling cannabis again]] — this time without a prescription." },
  { kicker: "1940 · Mexico", history: "mexico-brief-legalisation-1940", text: "For five months in 1940 [[MX|Mexico]], following the ideas of the psychiatrist [[c:people/leopoldo-salazar-viniegra|Leopoldo Salazar Viniegra]], let doctors prescribe drugs to users through state dispensaries. The United States cut off its exports of medical narcotics, and Mexico [[h:mexico-regulation-suspended-1940|suspended the rule]]." },
  { kicker: "1942 · United States", history: "us-hemp-for-victory-1942", text: "Five years after the [[h:us-marihuana-tax-act-1937|Marihuana Tax Act]], the government of the [[US|United States]] made a film called Hemp for Victory and asked farmers to grow it for the war. They planted about 400,000 acres." },
  { kicker: "1944 · United States", history: "us-la-guardia-report-1944", text: "A five-year study ordered by the mayor of New York found in 1944 that [[c:language/marijuana|marijuana]] did not lead to addiction, crime or harder drugs. [[c:people/harry-anslinger|The federal narcotics bureau]] attacked it, and [[US|US]] law did not change." },
  { kicker: "1948 · Kiribati and Tuvalu", history: "gilbert-islands-dangerous-drugs-1948", text: "One British colonial ordinance banned ‘[[c:language/indian-hemp|Indian hemp]]’, its resin and even its seeds across the Gilbert and Ellice Islands. Separate versions still govern [[KI|Kiribati]] and [[h:ellice-islands-dangerous-drugs-1948|Tuvalu]]." },
  { kicker: "1948 · Japan", history: "japan-cannabis-control-act-1948", text: "[[JP|Japan]]'s 1948 ban on cannabis did not punish using it, which shielded [[c:language/hemp|hemp]] farmers who might breathe in their crop. The country had about 25,000 hemp farms in 1950 and 37 in 2016." },
  { kicker: "1953 · Netherlands", history: "netherlands-possession-ban-1953", text: "The [[NL|Netherlands]] only made possessing cannabis an offence in 1953 — just over twenty years before it [[h:netherlands-toleration-1976|became known for tolerating it]]." },
  { kicker: "1954 · United States", history: "us-toklas-cookbook-1954", text: "Alice B. Toklas's 1954 cookbook contained a recipe for hashish fudge, \"easy to whip up on a rainy day\". It was cut from the first American edition." },
  { kicker: "1961 · Sri Lanka", history: "sri-lanka-ayurveda-act-1961", text: "In [[LK|Sri Lanka]] the only people who may legally sell cannabis are Ayurvedic practitioners, and their only legal supplier is a state corporation that gets most of it from police seizures." },
  { kicker: "1966 · Nigeria", history: "nigeria-indian-hemp-decree-1966", text: "[[NG|Nigeria]]'s 1966 [[c:language/indian-hemp|Indian Hemp]] Decree set death or 21 years for growing cannabis and at least ten years for possessing it. The death penalty [[h:nigeria-death-penalty-removed-1975|was dropped in 1975]]." },
  { kicker: "1970 · France", history: "france-use-criminalised-1970", text: "Until the last day of 1970, [[FR|France]] punished drug use only when it happened in company. Using alone has been a crime ever since." },
  { kicker: "1971 · Finland", history: "finland-use-criminalised-1972", text: "[[FI|Finland]] made using drugs a crime in itself after a vote of 92 to 80. In 2026 its parliament [[h:finland-legalisation-initiative-rejected-2026|rejected legalisation]] by 145 to 18." },
  { kicker: "1973 · Nepal", history: "nepal-shops-closed-1973", text: "Kathmandu had [[c:traditions/freak-street|licensed cannabis shops]] until 16 July 1973, when [[NP|Nepal]] cancelled every licence under pressure from the United States and the United Nations." },
  { kicker: "1975 · Comoros", history: "comoros-legalisation-1975", text: "Cannabis was legal in the [[KM|Comoros]] for three years: President Ali Soilih lifted the ban in 1975, and the government that overthrew him [[h:comoros-ban-restored-1978|restored it in 1978]]." },
  { kicker: "1985 · Poland", history: "poland-drug-prevention-act-1985", text: "From 1985 to 1997 possessing drugs was not an offence in [[PL|Poland]] in any quantity: police could confiscate them and nothing more. Since [[h:poland-criminalisation-2000|December 2000]] any amount has been a crime." },
  { kicker: "1975 · United States", history: "us-ravin-v-state-1975", text: "Since 1975 Alaska's constitution has protected having cannabis at home: the state's Supreme Court found it in the right to privacy." },
  { kicker: "1976 · South Korea", history: "south-korea-cannabis-control-act-1976", text: "Koreans grew hemp for [[c:traditions/sambe|cloth]] for centuries and smoking it was no offence until 1976. Today [[KR|South Korea]] [[h:south-korea-abroad-warning-2018|warns its citizens]] that using cannabis abroad, even where it is legal, can be punished when they come home." },
  { kicker: "1976 · United States", history: "us-randall-ruling-1976", text: "After [[c:people/robert-randall|a glaucoma patient]] won in court in 1976, the federal government of the [[US|United States]] began supplying patients with cannabis it grew itself. In 2011 four people were still receiving it." },
  { kicker: "1980 · Japan", history: "japan-mccartney-arrest-1980", text: "[[JP|Japan]] held Paul McCartney for ten days in 1980 over 219 grams found in his luggage at Tokyo airport, then deported him without charge." },
  { kicker: "1988 · United States", history: "us-dea-judge-young-1988", text: "In 1988 the drug agency's own judge in the [[US|United States]] ruled that cannabis should be rescheduled, calling it one of the safest therapeutically active substances known. The agency's head rejected the ruling." },
  { kicker: "1989 · Bangladesh", history: "bangladesh-ban-1989", text: "[[BD|Bangladesh]] had government-approved [[c:language/ganja|ganja]] shops until 1989, a leftover of colonial excise law." },
  { kicker: "1989 · Bhutan", history: "bhutan-first-arrest-1989", text: "In [[BT|Bhutan]] cannabis grows prolifically and was long seen mainly as fodder for fattening pigs. The country's first drug arrest came only in 1989." },
  { kicker: "1993 · Sweden", history: "sweden-prison-for-use-1993", text: "[[SE|Sweden]] added a prison term for drug use in 1993 for a practical reason: an offence that carries prison lets police take a suspect in for a urine or blood test." },
  { kicker: "2003 · Portugal", history: "portugal-seeds-law-2003", text: "[[PT|Portugal]]'s drug law controls one very specific thing: since 2003 its list has included \"cannabis seeds not intended for sowing\"." },
  { kicker: "2003 · Switzerland", history: "switzerland-operation-indoor-2003", text: "For seven years shops in the Swiss canton of Ticino sold cannabis as scented sachets for wardrobes. When police ended it in 2003 they seized 198,000 plants — and thieves then stole three vanloads of it back from a military depot in [[CH|Switzerland]]." },
  { kicker: "2012 · Spain", history: "spain-rasquera-plantation-2012", text: "A village of 960 people in [[ES|Spain]] held a referendum in 2012 on renting land to a [[c:traditions/cannabis-social-clubs|cannabis club]] for 1.3 million euros, about the size of its debt. A court cancelled the deal." },
  { kicker: "2012 · Italy", history: "italy-seeds-ruling-2012", text: "[[IT|Italy]]'s top court ruled in 2012 that selling cannabis seeds is not a crime, because what the buyer will do with them cannot be known." },
  { kicker: "2014 · Italy", history: "italy-army-cannabis-2014", text: "[[IT|Italy]]'s medical cannabis is grown by the army, at a military pharmaceutical plant in Florence. Its two varieties are called FM1 and FM2: Farmaceutico Militare." },
  { kicker: "2014 · Albania", history: "albania-lazarat-operation-2014", text: "When more than 800 police moved on the cannabis-growing village of Lazarat in [[AL|Albania]] in 2014, residents answered with rocket-propelled grenades and mortars." },
  { kicker: "2016 · United Kingdom", history: "uk-largest-legal-producer-2016", text: "In 2016 the [[GB|United Kingdom]] was the world's largest producer of legal cannabis, 95 tonnes of it, while its government held that cannabis had no therapeutic value." },
  { kicker: "2017 · Indonesia", history: "indonesia-fidelis-case-2017", text: "In [[ID|Indonesia]] a man was jailed for eight months in 2017 for growing cannabis to treat his wife. She died while he was detained." },
  { kicker: "2018 · Poland", history: "poland-first-pharmacy-cannabis-2018", text: "[[PL|Poland]]'s parliament [[h:poland-medical-2017|legalised medical cannabis]] by 440 votes to 2. The first delivery, a year later, was seven kilograms for the whole country and sold out within days." },
  { kicker: "2018 · Georgia", history: "georgia-constitutional-court-2018", text: "In [[GE|Georgia]] using cannabis in private has been legal since a court ruling in 2018. Growing it and selling it are still crimes, so there is no lawful way to get any." },
  { kicker: "2021 · Rwanda", history: "rwanda-medical-2021", text: "[[RW|Rwanda]] licenses companies to grow cannabis for export. For anyone else, producing or selling it carries [[h:rwanda-penal-law-2018|twenty years to life]]." },
  { kicker: "2022 · Italy", history: "italy-referendum-blocked-2022", text: "More than 600,000 people in [[IT|Italy]] signed for a referendum on decriminalising home growing. The Constitutional Court ruled the question inadmissible, and no vote was held." },
  { kicker: "2022 · Russia", history: "russia-griner-sentence-2022", text: "[[RU|Russia]] sentenced an American basketball player to nine years in 2022 for 0.7 grams of cannabis oil. She was freed in a prisoner exchange that December." },
  { kicker: "2025 · Lebanon", history: "lebanon-cannabis-authority-2025", text: "[[LB|Lebanon]] became the first Arab country to [[h:lebanon-medical-cultivation-2020|legalise growing cannabis]] in 2020. It took five more years to appoint the regulator that issues the licences." },
  { kicker: "2022–2025 · Thailand", history: "thailand-prescription-only-2025", text: "[[TH|Thailand]] went from [[h:thailand-decriminalisation-2022|thousands of open dispensaries]] to prescription-only in three years. Since June 2025 cannabis flower officially requires a prescription." },
  { kicker: "2024 · Morocco", history: "morocco-royal-pardon-2024", text: "[[MA|Morocco]]'s sultan [[h:morocco-hassan-regulations-1890|licensed tribes of the Rif to grow]] [[c:language/kif|kif]] in 1890. In 2024 its king pardoned 4,831 people convicted, prosecuted or wanted over growing it." },
];

// Curious cases from the cultural atlas. Each one restates its entry in /culture.
const fromCulture = [
  { kicker: "Words · 420", culture: "language/420", text: "[[c:language/420|420]], the worldwide code for cannabis and the date of its yearly demonstrations, began as the meeting time of five schoolboys in California in 1971." },
  { kicker: "Words · Arabic", culture: "language/hashish", text: "[[c:language/hashish|Hashish]] is simply Arabic for dried grass. It became the word for cannabis resin from Morocco to Afghanistan." },
  { kicker: "Words · Turkish", culture: "language/esrar", text: "The everyday Turkish word for cannabis, [[c:language/esrar|esrar]], is Arabic for ‘secrets’. A dervish poet who died about 1444 already wrote of eating it." },
  { kicker: "Words · Spanish", culture: "language/mota", text: "In old Spanish a [[c:language/mota|mota]] is a speck or a tuft of fluff left over from making linen. Since the end of the nineteenth century, in [[MX|Mexico]], it has meant marijuana; nobody knows how." },
  { kicker: "Words · Hawaiian", culture: "language/pakalolo", text: "The Hawaiian name for cannabis, [[c:language/pakalolo|pakalolo]], means ‘numbing tobacco’." },
  { kicker: "Words · Réunion", culture: "language/zamal", text: "On Réunion, part of [[FR|France]], cannabis is [[c:language/zamal|zamal]], and a man losing his temper is said to have ‘his zamal rising’." },
  { kicker: "Words · Malawi", culture: "language/chamba", text: "[[MW|Malawi]] has three famous C's: its fish, its tea and its [[c:language/chamba|chamba]], the country's word for cannabis." },
  { kicker: "Words · Mezz", culture: "language/reefer", text: "In the jazz slang of the 1930s, cannabis could be called ‘mezz’, after Mezz Mezzrow, a clarinettist at least as well known in the jazz world for supplying it. See [[c:language/reefer|reefer]]." },
  { kicker: "Religion · Brazil", culture: "traditions/santa-maria-in-santo-daime", text: "One branch of [[BR|Brazil]]'s ayahuasca church, Santo Daime, took up cannabis in the 1970s and named it [[c:traditions/santa-maria-in-santo-daime|Santa Maria]], after the Virgin. Its users called themselves marianos." },
  { kicker: "Religion · Réunion", culture: "traditions/zamal-on-reunion", text: "In Tamil temples on Réunion, a possessed priest smokes cannabis the gods ask for, and must show no effect at all: [[c:traditions/zamal-on-reunion|his indifference proves the god is in him]]." },
  { kicker: "Religion · Japan", culture: "traditions/hemp-in-shinto", text: "Shinto priests in [[JP|Japan]] [[c:traditions/hemp-in-shinto|purify with hemp fibre]], the symbol of purity, while the plant itself is under one of the strictest drug laws in the world." },
  { kicker: "Religion · Nepal", culture: "traditions/shivaratri-at-pashupatinath", history: "nepal-pashupati-distribution-ended-1995", text: "Until 1995 the trust that runs [[NP|Nepal]]'s Pashupatinath temple handed holy men marijuana at the [[c:traditions/shivaratri-at-pashupatinath|Shivaratri festival]] — taken from the Home Ministry's confiscated stock." },
  { kicker: "Festival · Bengal", culture: "traditions/bhang-at-bijoya", text: "In 1890s Bengal, on the last day of Durga Puja, every visitor was offered [[c:traditions/bhang-at-bijoya|a cup of bhang with sweets]], drunk, an excise officer told the Hemp Drugs Commission, like ‘drinking health’ in Europe." },
  { kicker: "Customs · Korea", culture: "traditions/sambe", text: "[[KR|Korea]] dresses its dead, and those who mourn them, in [[c:traditions/sambe|hemp cloth]]. The plant that makes it has been tightly controlled since 1976." },
  { kicker: "Customs · Poland", culture: "traditions/siemieniotka", text: "In Silesia, [[c:traditions/siemieniotka|hemp-seed soup]] is one of the dishes of Christmas Eve." },
  { kicker: "Customs · Scotland", culture: "traditions/halloween-hemp-seed-divination", text: "Robert Burns recorded [[c:traditions/halloween-hemp-seed-divination|a Halloween charm]] in which sowing hemp seed was supposed to reveal a future lover." },
  { kicker: "Medicine · Taiwan", culture: "traditions/hemp-seed-in-chinese-medicine", text: "In [[TW|Taiwan]] [[c:traditions/hemp-seed-in-chinese-medicine|hemp seed sold as medicine]] is legal and hemp seed that can sprout is a drug. A court in 2023 settled one case by asking whether the buyer's seeds had grown." },
  { kicker: "Places · Harlem", culture: "traditions/the-tea-pads-of-harlem", text: "Investigators for New York's 1944 La Guardia report counted about 500 [[c:traditions/the-tea-pads-of-harlem|tea pads]] in Harlem. In one, on a rooftop, smokers sat in pup tents, then came out to talk about the stars." },
  { kicker: "Places · Copenhagen", culture: "traditions/pusher-street", history: "denmark-pusher-street-closed-2024", text: "For half a century [[c:language/hashish|hashish]] was sold openly from stalls on [[c:traditions/pusher-street|Pusher Street]] in Christiania, the freetown in the capital of [[DK|Denmark]]. In 2024, after a series of gang shootings, the residents dug up the street themselves." },
  { kicker: "Archaeology · China", culture: "traditions/cannabis-in-the-graves-of-xinjiang", history: "china-jirzankal-study-2019", text: "In a grave in Turpan, western [[CN|China]], about 2,500 years old, a man was buried under [[c:traditions/cannabis-in-the-graves-of-xinjiang|a shroud of thirteen cannabis plants]]. Far to the west, in the Pamirs, mourners burnt it in wooden braziers." },
  { kicker: "History · DR Congo", culture: "traditions/bena-riamba", history: "dr-congo-bena-riamba-1881", text: "Nineteenth-century visitors recorded a cannabis-centred movement among the Bashilenge in today's [[CD|DR Congo]]. Its members called themselves [[c:traditions/bena-riamba|Bena Riamba]] — ‘sons of hemp’ — and used a communal pipe for holidays, trade agreements and peace settlements." },
  { kicker: "People · Israel", culture: "people/raphael-mechoulam", history: "israel-mechoulam-thc-1964", text: "[[c:people/raphael-mechoulam|The chemist who first isolated THC]] got his material from the police: 11 pounds of seized Lebanese hashish, which he carried to his laboratory in [[IL|Israel]] on a public bus." },
  { kicker: "People · Mexico", culture: "people/leopoldo-salazar-viniegra", history: "mexico-salazar-marijuana-myth-1938", text: "In 1938 [[c:people/leopoldo-salazar-viniegra|a Mexican psychiatrist]] told the Academy of Medicine that marijuana madness was a myth. A newspaper reported that he ended by handing his colleagues cigarettes that turned out to contain it." },
  { kicker: "People · India", culture: "people/william-oshaughnessy", text: "[[c:people/william-oshaughnessy|The doctor who brought cannabis into Western medicine]], in Calcutta in 1839, was knighted not for that but for building [[IN|India]]'s telegraph." },
  { kicker: "People · Uruguay", culture: "people/jose-mujica", history: "uruguay-incb-criticism-2013", text: "When the head of the UN drug board said [[UY|Uruguay]]'s cannabis law showed a ‘pirate attitude’, its president, [[c:people/jose-mujica|José Mujica]], told him to stop lying and come and see for himself." },
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
    if (m[1].startsWith("c:")) {
      const entry = cultureEntries.find((e) => e.url === `culture/${m[1].slice(2)}/`);
      if (!entry) throw new Error(`facts.js: unknown atlas entry "${m[1].slice(2)}"`);
      return { label: m[2], entry };
    }
    const country = byId(m[1]);
    if (!country) throw new Error(`facts.js: unknown country "${m[1]}"`);
    return { label: m[2], country };
  });
}

export function getFacts() {
  // `group` says where a fact comes from; the /did-you-know/ page lists them under it.
  const all = [...fromHistory.map((f) => ({ ...f, group: "history" })), ...curated.map((f) => ({ ...f, group: "countries" })), ...computed().map((f) => ({ ...f, group: "scores" })), ...fromCulture.map((f) => ({ ...f, group: "culture" }))];
  return all.map((f) => {
    const history = f.history ? changes.find((ch) => ch.id === f.history) : null;
    if (f.history && !history) throw new Error(`facts.js: unknown history entry "${f.history}"`);
    const culture = f.culture ? cultureEntries.find((e) => e.url === `culture/${f.culture}/`) : null;
    if (f.culture && !culture) throw new Error(`facts.js: unknown atlas entry "${f.culture}"`);
    return { kicker: f.kicker, parts: parse(f.text), history, culture, group: f.group };
  });
}
