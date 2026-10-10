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
  licensed: { label: "Licence only", tone: "partial", help: ["Only for licensed growers, such as hemp, medical or registered clubs", "Only for licensed growers, such as hemp, medical or registered clubs"] },
  illegal: { label: "Illegal", tone: "illegal", help: ["Treated as cannabis or expressly banned", "Treated as plants under the cultivation ban"] },
};
export const PLANTING_TRADE = {
  open: { label: "Sold freely", tone: "legal", help: ["Anyone may sell them, in shops or online", "Anyone may sell them, in shops or online"] },
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
  impairment: { label: "Impairment must be shown", tone: "legal", help: "Driving is an offence only when the driver is shown to be impaired" },
  limit: { label: "Fixed THC limit", tone: "decrim", help: "A set THC level in blood or saliva is an offence by itself, whether or not the driver is impaired" },
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
  driving: { name: "Driving", chip: "Driving", statuses: DRIVING_STATUS, tiers: { impairment: 5, limit: 3, zero: 0 },
    sub: "Green means a driver must be shown to be impaired, yellow that a fixed THC limit applies, red that any trace of THC is an offence.",
    note: "What the law needs to convict a driver who has used cannabis." },
  visitors: { name: "Visitors and foreigners", chip: "Visitors", statuses: VISITORS_STATUS, tiers: { open: 5, residents: 3, none: 0 },
    sub: "Green means visitors can buy on the same terms as residents, yellow that legal supply is for residents only, red that nobody has legal access.",
    note: "Whether someone who does not live in the country can get cannabis legally." },
};
// What kind of event a History entry is, in the order the legend lists them.
export const CHANGE_CATEGORIES = {
  ban: { emoji: "⛔", label: "Ban", help: "Cannabis is prohibited or restricted for the first time, or banned again" },
  tightening: { emoji: "👎", label: "Tightening", help: "Harsher penalties, new offences or a crackdown" },
  death: { emoji: "☠️", label: "Death penalty", help: "The death penalty is introduced, used, limited or removed" },
  easing: { emoji: "👍", label: "Easing", help: "Decriminalisation, lighter penalties or a ruling that protects users" },
  legalisation: { emoji: "✅", label: "Legalisation", help: "Possession, growing or sales become legal for adults" },
  medical: { emoji: "💊", label: "Medical", help: "Medical cannabis is allowed, widened or refused" },
  debate: { emoji: "🗳️", label: "Debate", help: "Reports, commissions, votes and plans that changed no rule by themselves" },
  international: { emoji: "🌐", label: "International", help: "Treaties and decisions of international bodies" },
  other: { emoji: "📜", label: "Other law", help: "Other laws and rulings, including hemp, CBD and seed rules" },
};
