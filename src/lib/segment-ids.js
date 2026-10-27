// The scored segments, in display order, and the unscored context sections.
// Shared by the data schema and the loader so the two cannot drift apart.
export const SEGMENT_IDS = ["possession", "cultivation", "enforcement", "sharing", "consumption", "access"];
export const CONTEXT_IDS = ["production", "products", "medical", "consequences"];
// Seeds and clones: an optional context section. Not part of the score. Each has two statuses:
// whether an adult may have and plant them (PLANTING_STATUS) and whether they may be sold or
// handed on (PLANTING_TRADE). `help` is [what it means for seeds, what it means for clones].
export const PLANTING_STATUS = {
  legal: { label: "Legal", tone: "legal", help: ["Adults may buy, hold and sow them", "Adults may buy and keep cuttings"] },
  grey: { label: "Grey area", tone: "decrim", help: ["Sold or held openly, but germinating them is an offence or the law is silent", "Tolerated, or legal only until the plant flowers"] },
  conditional: { label: "Permitted purposes", tone: "partial", help: ["May be held or planted for specified purposes under legal conditions, such as cultivation notification", "May be held or grown for specified purposes under legal conditions, such as cultivation notification"] },
  licensed: { label: "Licence only", tone: "partial", help: ["Only for licensed growers, such as hemp, medical or registered clubs", "Only for licensed growers, such as hemp, medical or registered clubs"] },
  illegal: { label: "Illegal", tone: "illegal", help: ["Treated as cannabis or expressly banned", "Treated as plants under the cultivation ban"] },
};
export const PLANTING_TRADE = {
  open: { label: "Sold freely", tone: "legal", help: ["Anyone may sell them, in shops or online", "Anyone may sell them, in shops or online"] },
  "regulated-sale-plus-gifts": { label: "Licensed sales and gifts", tone: "partial", help: ["Licensed sellers may sell them, and adults may also give a limited amount away", "Licensed sellers may sell them, and adults may also give a limited amount away"] },
  conditional: { label: "Permitted purposes", tone: "partial", help: ["May be sold or supplied for specified purposes to people legally entitled to receive them", "May be sold or supplied for specified purposes to people legally entitled to receive them"] },
  regulated: { label: "Regulated sellers only", tone: "partial", help: ["Only licensed sellers, clubs or the state may sell or hand them out, often with limits", "Only licensed sellers, clubs or the state may sell or hand them out, often with limits"] },
  gift: { label: "Gifts only", tone: "decrim", help: ["May be given away between adults, but not sold", "May be given away between adults, but not sold"] },
  unclear: { label: "Not settled", tone: "decrim", help: ["The law does not say whether they may be sold", "The law does not say whether they may be sold"] },
  banned: { label: "Banned", tone: "illegal", help: ["Selling or handing them on is an offence", "Selling or handing them on is an offence"] },
};
// Cannabis clubs: an optional context section with one status, the footing clubs stand on.
// Not part of the score. Licensed shops and pharmacies are not clubs.
export const CLUBS_STATUS = {
  regulated: { label: "Regulated by law", tone: "legal", help: "A law provides for clubs: they are licensed or registered and work within set limits" },
  tolerated: { label: "Tolerated", tone: "decrim", help: "No law provides for clubs, but they operate fairly openly and are mostly left alone" },
  underground: { label: "Underground", tone: "partial", help: "Clubs exist but are treated as illegal: they are raided or their organisers prosecuted" },
  none: { label: "None known", tone: "illegal", help: "No clubs are known, or the law leaves no room for them" },
};
// Driving after use: what the law needs to convict a driver. Not part of the score.
export const DRIVING_STATUS = {
  unknown: { label: "Drug-driving trigger unverified", tone: "grey", help: "Drug-driving rules were reviewed, but no cannabis-specific offence trigger or THC cutoff was established" },
  impairment: { label: "Impairment must be shown", tone: "legal", help: "The reviewed driving offence requires evidence of drug influence or impairment; additional offences may apply" },
  capacity: { label: "Capable of affecting driving", tone: "decrim", help: "A conviction needs the drug in a biological sample and proof it was capable of affecting driving. A driving mistake is outside that proof" },
  limit: { label: "Fixed THC limit", tone: "decrim", help: "A set THC level in blood or saliva is an offence by itself, whether or not the driver is impaired" },
  consumption: { label: "After consumption", tone: "partial", help: "The statute prohibits driving after drug consumption; this does not establish a laboratory THC cutoff" },
  zero: { label: "Zero tolerance", tone: "illegal", help: "Any detectable THC is an offence, however long ago the cannabis was used" },
};
// Visitors and foreigners: whether someone who does not live in the country can get cannabis legally.
export const VISITORS_STATUS = {
  open: { label: "Same as residents", tone: "legal", help: "Visitors may buy and carry cannabis on the same terms as residents" },
  residents: { label: "Residents only", tone: "partial", help: "Legal supply is reserved for residents; a visitor has no legal way to buy" },
  none: { label: "No legal access", tone: "illegal", help: "There is no legal recreational supply for anyone; visitors face the same penalties as locals, often with deportation on top" },
};
// Context sections that carry one status each: the label on the page, the vocabulary, the map
// colour of each status (a tier number, 5 green to 0 red) and the wording around the map.
export const STATUS_SECTIONS = {
  clubs: { name: "Cannabis clubs", chip: "Clubs", statuses: CLUBS_STATUS, tiers: { regulated: 5, tolerated: 4, underground: 2, none: 0 },
    sub: "Green means cannabis clubs are regulated or tolerated, orange that they work underground, red that none are known.",
    note: "The footing cannabis clubs stand on. Licensed shops and pharmacies are not counted as clubs." },
  driving: { name: "Driving", chip: "Driving", statuses: DRIVING_STATUS, tiers: { impairment: 5, capacity: 4, limit: 3, consumption: 2, zero: 0, unknown: null },
    sub: "Green marks a drug-influence or impairment offence, light green a rule that needs proof the drug could affect driving, yellow a fixed THC limit, orange a prohibition after consumption, and red a detectable-THC offence. Hatched means the cannabis-specific trigger is unverified. Read each profile for additional rules.",
    note: "What the law needs to convict a driver who has used cannabis." },
  visitors: { name: "Visitors and foreigners", chip: "Visitors", statuses: VISITORS_STATUS, tiers: { open: 5, residents: 3, none: 0 },
    sub: "Green means visitors can buy on the same terms as residents, yellow that legal supply is for residents only, red that nobody has legal access.",
    note: "Whether someone who does not live in the country can get cannabis legally." },
};
// What kind of event a History entry is, in the order the legend lists them. `icon` is shown on
// the site; `emoji` stands in where only text fits (the chart tooltips, previews, OG pictures).
// `help` says what the kind is in a few words; `includes` lists what is filed under it, for the
// filter's tooltip and the top of the kind's page
export const CHANGE_CATEGORIES = {
  ban: { emoji: "⛔", icon: "iconoir:prohibition", label: "Ban", help: "Cannabis is prohibited or restricted for the first time, or banned again", includes: "First national or colonial bans, and bans brought back after a legal period" },
  tightening: { emoji: "👎", icon: "iconoir:thumbs-down", label: "Tightening", help: "Harsher penalties, new offences or a crackdown", includes: "Higher penalties, new offences, lower thresholds, and rulings or decrees that make the law harsher" },
  death: { emoji: "☠️", icon: "iconoir:warning-triangle", label: "Death penalty", help: "The death penalty is introduced, used, limited or removed", includes: "The death penalty for cannabis introduced, extended, carried out, limited or abolished" },
  enforcement: { emoji: "🚔", icon: "iconoir:shield-alert", label: "Enforcement", help: "Raids, seizures, arrests, single cases and how a law was applied, without a change in the law", includes: "Raids and seizures, arrest and prosecution figures, single cases and sentences, police practice" },
  easing: { emoji: "👍", icon: "iconoir:thumbs-up", label: "Easing", help: "Decriminalisation, lighter penalties or a ruling that protects users", includes: "Decriminalisation, lighter penalties, fines instead of prison, and rulings that protect users" },
  legalisation: { emoji: "✅", icon: "iconoir:check-circle", label: "Legalisation", help: "Possession, growing or sales become legal for adults", includes: "Legal possession, home growing, clubs or shops for adults" },
  medical: { emoji: "💊", icon: "iconoir:pharmacy-cross-circle", label: "Medical", help: "Medical cannabis is allowed, widened or refused", includes: "Medical programmes, prescriptions, cannabis medicines, and patient access widened, narrowed or refused" },
  hemp: { emoji: "🌿", icon: "iconoir:leaf", label: "Hemp", help: "Fibre and food hemp, CBD, low-THC products and seeds: their rules and their industry", includes: "Fibre and food hemp, THC limits, CBD and low-THC products, seed rules and the hemp industry" },
  debate: { emoji: "🗳️", icon: "iconoir:chat-lines", label: "Debate", help: "Reports, commissions, votes and plans that changed no rule by themselves", includes: "Bills and drafts, reports and commissions, campaigns and marches, referendums and failed votes" },
  culture: { emoji: "📚", icon: "iconoir:book", label: "Culture & science", help: "Traditions, trade, books, research, discoveries and organisations", includes: "Traditions, trade and markets, books, films and music, research, discoveries and archaeology" },
  international: { emoji: "🌐", icon: "iconoir:globe", label: "International", help: "Treaties and decisions of international bodies", includes: "UN and League of Nations treaties, countries joining them, and decisions of the UN, WHO and other bodies" },
  other: { emoji: "📜", icon: "iconoir:page", label: "Other law", help: "Laws and rulings that do not clearly make things harsher or milder", includes: "New drug laws and codes that keep the same rules, reorganised agencies and mixed reforms" },
};
// Optional tags on a history entry, for grouping deeper than its one category. An entry may have
// several. Only these keys are accepted, so the same thing is always tagged the same way; add a
// key here before using it. Each tag has its own page at /history/tag/<key>/.
export const CHANGE_TAGS = {
  court: { label: "Court ruling", help: "A court decides a case or the validity of a law" },
  referendum: { label: "Referendum", help: "A popular vote or a petition for one" },
  ratification: { label: "Treaty ratification", help: "A country joins or leaves an international drug treaty" },
  trafficking: { label: "Trafficking", help: "Trafficking and smuggling: the laws against it, its penalties and its cases" },
  trade: { label: "Imports and exports", help: "Cannabis trade across borders: import bans, export licences and trade routes" },
  thresholds: { label: "Thresholds", help: "Gram and plant limits, personal doses and the quantities that divide users from dealers" },
  hemp: { label: "Hemp", help: "Fibre, food or industrial hemp and its THC limits" },
  cbd: { label: "CBD", help: "CBD and low-THC products" },
  seeds: { label: "Seeds", help: "Selling, holding or planting cannabis seeds" },
  food: { label: "Food", help: "Cannabis or hemp in food and drink" },
  "home-growing": { label: "Home growing", help: "Growing cannabis at home for yourself" },
  clubs: { label: "Cannabis clubs", help: "Social clubs and collective growing" },
  retail: { label: "Shops and sales", help: "Coffeeshops, dispensaries, licensed sales and their rules" },
  taxes: { label: "Taxes and monopolies", help: "Taxes on cannabis and state monopolies over its trade" },
  advertising: { label: "Advertising and paraphernalia", help: "Bans on promoting cannabis, and on pipes, grow shops and literature" },
  enforcement: { label: "Enforcement", help: "Arrests, raids, seizures, crackdowns and how a law was applied" },
  "police-powers": { label: "Police powers", help: "Searches, drug dogs, surveillance and drug tests" },
  eradication: { label: "Eradication", help: "Destroying cannabis crops, and plans to replace them" },
  sentencing: { label: "Sentencing", help: "Prison terms and fines given or set for cannabis" },
  amnesty: { label: "Amnesty and pardons", help: "Pardons, amnesties, resentencing and clearing records" },
  patients: { label: "Patients", help: "People using cannabis as medicine: their cases, groups and campaigns" },
  treatment: { label: "Treatment", help: "Forced or offered treatment for drug users" },
  driving: { label: "Driving", help: "Cannabis and driving" },
  youth: { label: "Youth", help: "Young people, students, minors and age limits" },
  visitors: { label: "Visitors", help: "Rules for tourists and foreigners" },
  traditional: { label: "Traditional use", help: "Local cannabis cultures and preparations: bhang, ganja, kif, dagga, takrouri, religious and ritual use" },
  religion: { label: "Religion", help: "Religious use of cannabis and religious rules on it" },
  race: { label: "Race and migration", help: "Laws and fears aimed at immigrants and minorities" },
  colonial: { label: "Colonial rule", help: "Laws made or enforced by a colonial power" },
  military: { label: "Military", help: "Armies and soldiers, military governments and war" },
  madness: { label: "Madness and psychiatry", help: "Claims that cannabis causes insanity, asylums and psychiatry" },
  campaign: { label: "Campaigns", help: "Activists, parties and movements for or against reform" },
  famous: { label: "Famous people", help: "Well-known people and cannabis: arrests, trials and campaigns" },
  science: { label: "Science and medicine", help: "Research, studies and medical knowledge" },
};
