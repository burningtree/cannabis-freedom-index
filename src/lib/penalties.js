// Penalty steps for a segment (possession, cultivation): what happens at each amount, in a shape
// that can be shown as a table and compared between countries. Written in the profile as
//   penalties: [{ upto: "5 g", treatment: tolerated, … }, { over: "30 g", treatment: criminal, prison: "2 years", fine: 110000 }]
// Amounts and terms are written as a reader would say them and converted here to grams, plants
// and days. `treatment` is the only judgement and means the same everywhere; `term` is the law's
// own word and is shown, never compared.

export const TREATMENT = {
  legal: { label: "Legal", tone: "legal", help: "Allowed by law" },
  tolerated: { label: "Tolerated", tone: "decrim", help: "Against the law, but not prosecuted as a matter of policy" },
  civil: { label: "Administrative", tone: "partial", help: "An administrative or civil offence, outside the criminal record: usually a fine, in some countries a few days' arrest" },
  criminal: { label: "Criminal", tone: "illegal", help: "A criminal offence, which can lead to a record and, where the law says so, prison" },
};

const GRAMS = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };
const DAYS = { day: 1, week: 7, month: 30, year: 365 };

// Keep statutory cents after currency conversion; whole-number fines stay compact.
export function formatFine(value, currency) {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency", currency, minimumFractionDigits: 0,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  });
  return currency === "XCG"
    ? formatter.formatToParts(value).map((part) => part.type === "currency" ? "Cg" : part.value).join("")
    : formatter.format(value);
}

// "1 oz" → { value: 1, unit: "oz", grams: 28.35 }; "5 plants" → { value: 5, unit: "plants", plants: 5 }
export function parseAmount(text) {
  const m = /^(\d+(?:\.\d+)?)\s*(g|kg|oz|lb|plants?)$/.exec(String(text).trim());
  if (!m) return null;
  const value = +m[1], unit = m[2] === "plant" ? "plants" : m[2];
  return unit === "plants" ? { value, unit, plants: value } : { value, unit, grams: value * GRAMS[unit] };
}

// "3 months" → { text: "3 months", days: 90 }
export function parseDuration(text) {
  const m = /^(\d+(?:\.\d+)?)\s*(day|week|month|year)s?$/.exec(String(text).trim());
  return m ? { text: String(text).trim(), days: Math.round(+m[1] * DAYS[m[2]]) } : null;
}

// how an amount reads in the table: "30 g", "5 kg", "5 plants"; ounces and pounds also in grams, "1 oz (28 g)"
const shown = (a) => (a.unit === "oz" || a.unit === "lb" ? `${a.value} ${a.unit} (${Math.round(a.grams)} g)` : `${a.value} ${a.unit}`);

// one row as the page shows it
export function penaltyRow(row) {
  const upto = row.upto ? parseAmount(row.upto) : null, over = row.over ? parseAmount(row.over) : null;
  // `over: 0 plants` (or 0 g) is a step with no lower limit at all: "Any amount", "Any plant"
  const any = over && over.value === 0 && !upto ? (over.unit === "plants" ? "Any plant" : "Any amount") : null;
  const amount = row.label ?? any ?? (over && upto ? `Over ${shown(over)}, up to ${shown(upto)}` : upto ? `Up to ${shown(upto)}` : over ? `Over ${shown(over)}` : "");
  return {
    amount: row.repeat > 1 ? `${amount} (${row.repeat === 2 ? "second" : row.repeat === 3 ? "third" : `${row.repeat}th`} offence)` : amount,
    upto, over, repeat: row.repeat ?? 1,
    treatment: row.treatment, term: row.term ?? null,
    prison: row.prison ? parseDuration(row.prison) : null,
    prisonMin: row.prison_min ? parseDuration(row.prison_min) : null,
    caning: row.caning ?? null, // [fewest, most] strokes of the cane
    death: row.death === true,
    life: row.life ?? null,
    fine: row.fine ?? null,
    fineMin: row.fine_min ?? null,
    note: row.note ?? null,
  };
}

// How the punishment reads in the table: "Up to 3 years", "At least 5 years", "6 months – 5 years", "10–20 years",
// "Death penalty"; strokes of the cane go on their own line (punishmentExtra)
export function punishmentText(r) {
  if (r.death) {
    const alternatives = [r.life && "life imprisonment", r.prison && punishmentText({ ...r, death: false, life: null })].filter(Boolean);
    return alternatives.length === 2 ? `Death, ${alternatives[0]} or ${alternatives[1]}` : alternatives.length ? `Death or ${alternatives[0]}` : "Death penalty";
  }
  if (r.life === "mandatory") return "Life imprisonment";
  if (r.life === "possible") {
    if (r.prison) return `${punishmentText({ ...r, life: null })} or life imprisonment`;
    return r.prisonMin ? `${r.prisonMin.text} to life imprisonment` : "Life imprisonment possible";
  }
  if (!r.prison) return r.prisonMin ? `At least ${r.prisonMin.text}` : null; // a minimum with no maximum set
  if (!r.prisonMin) return `Up to ${r.prison.text}`;
  if (r.prisonMin.days === r.prison.days) return r.prison.text;
  const [a, ua] = r.prisonMin.text.split(" "), [b, ub] = r.prison.text.split(" ");
  return ua.replace(/s$/, "") === ub.replace(/s$/, "") ? `${a}–${b} ${ub}` : `${r.prisonMin.text} – ${r.prison.text}`;
}
export const punishmentExtra = (r) => (r.caning ? `and ${r.caning[0] === r.caning[1] ? r.caning[0] : `${r.caning[0]}–${r.caning[1]}`} strokes of the cane` : null);

// The figures that compare between countries, from the first-offence rows, in grams or plants:
// the most a person may have without being prosecuted, where it becomes a crime, the longest
// prison term the law allows for a small amount (5 g, or one plant), and whether the ladder
// reaches caning or the death penalty.
export function penaltySummary(rows) {
  const first = rows.filter((r) => r.repeat === 1);
  const size = (a) => a && (a.grams ?? a.plants);
  const small = first[0]?.upto?.plants != null || first[0]?.over?.plants != null ? 1 : 5;
  const free = first.filter((r) => r.treatment === "legal" || r.treatment === "tolerated").map((r) => size(r.upto)).filter((x) => x != null);
  const crime = first.find((r) => r.treatment === "criminal" && (r.upto || r.over));
  // a row about an amount that includes the small one; a labelled row ("growing as a business") is not
  const covers = (r) => (r.upto || r.over) && (size(r.over) ?? 0) < small && (size(r.upto) ?? Infinity) >= small;
  const smallRows = first.filter(covers), smallLife = smallRows.some((r) => r.life);
  return {
    freeUpTo: free.length ? Math.max(...free) : 0,
    crimeFrom: crime ? size(crime.over) ?? 0 : null,
    smallPrisonDays: smallLife ? null : smallRows.reduce((m, r) => Math.max(m, r.prison?.days ?? r.prisonMin?.days ?? 0), 0),
    smallPrisonLife: smallLife,
    life: rows.some((r) => r.life),
    // whether any step of the ladder allows caning or the death penalty
    caning: rows.some((r) => r.caning),
    death: rows.some((r) => r.death),
  };
}
