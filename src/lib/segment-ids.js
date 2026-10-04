// The scored segments, in display order, and the unscored context sections.
// Shared by the data schema and the loader so the two cannot drift apart.
export const SEGMENT_IDS = ["possession", "cultivation", "enforcement", "sharing", "consumption", "access"];
export const CONTEXT_IDS = ["production", "products", "medical", "consequences"];
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
  other: { emoji: "📜", label: "Other law", help: "Other laws and rulings, including hemp and CBD rules" },
};
