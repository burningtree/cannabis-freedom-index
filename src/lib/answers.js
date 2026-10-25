// Five plain-language answers per country, state or province, on its profile, on /can-i/ and in
// the structured data of its page.
//
// They are read off the segment scores (possession, cultivation, enforcement, sharing, consumption,
// access; see segments.yaml for what each level means), but a score is coarse: one band can hold
// places whose law reads quite differently. Possession 3, for instance, is both "decriminalised"
// (Portugal) and "a crime that is not prosecuted" (the Netherlands). So:
// - each step says only what is true of every place in its band, never a legal category the
//   band does not guarantee;
// - a step can ask for a fact the score does not hold (`when`, on the place's statuses), and is
//   skipped otherwise: a place with no medical programme is never told "on prescription";
// - where the band still cannot say it right, the profile states the answer itself, under
//   `answers` in its YAML file (see "Quick answers" in docs/DATA-MAINTENANCE.md).
// scripts/answers.test.mjs checks every profile's answers against its own text.

import { SEGMENT_IDS } from "./segment-ids.js";

export const ANSWER_LABEL = { yes: "Yes", limited: "Limited", no: "No" };

// `p` in `when` is the place: { rec, med } as in countries.js ("legal", "partial", "decrim",
// "illegal", "death"; "yes", "limited", "no").
const hasMedical = (p) => p.med !== "no";

export const QUESTIONS = [
  { id: "carry", q: "Can I carry it?", seg: 0, steps: [
    { min: 5, answer: "yes", text: "Legal up to a limit", when: (p) => p.rec === "legal" },
    // Decriminalised (an administrative fine, or a heavy one), legal at home only, or a crime that
    // is not prosecuted: all of these sit here, so the answer names none of them.
    { min: 3, answer: "limited", text: "Usually no criminal charge for a small amount, but it can still be seized or penalised" },
    // an administrative fine, a crime, or a judge deciding whether it was for personal use
    { min: 2, answer: "no", text: "Even a small amount can bring a fine or a charge" },
    { min: 0, answer: "no", text: "It is a crime" },
  ] },
  { id: "grow", q: "Can I grow it?", seg: 1, steps: [
    { min: 4, answer: "yes", text: "A few plants at home are legal" },
    // tolerated, an administrative fine, or a lesser crime: all of these sit here
    { min: 2, answer: "limited", text: "A few plants are treated far more leniently than dealing" },
    { min: 0, answer: "no", text: "It is a crime" },
  ] },
  { id: "buy", q: "Can I buy it?", seg: 5, steps: [
    { min: 6, answer: "yes", text: "In licensed shops", when: (p) => p.rec === "legal" },
    // Clubs, pharmacies, state outlets or tolerated shops: which one is the profile's to say, in
    // its own answer. A 3 is also a working medical route, or tolerated clubs (Spain).
    { min: 4, answer: "yes", text: "From a legal or tolerated source, with limits" },
    { min: 3, answer: "limited", text: "On prescription, without great difficulty", when: hasMedical },
    { min: 1, answer: "limited", text: "On prescription only", when: hasMedical },
    { min: 0, answer: "no", text: "There is no legal source" },
  ] },
  { id: "public", q: "Can I use it in public?", seg: 4, steps: [
    { min: 7, answer: "yes", text: "Wherever smoking is allowed" },
    { min: 5, answer: "limited", text: "In some places, with many restrictions" },
    { min: 3, answer: "no", text: "In private only" },
    // Using it is not always an offence in itself (Italy), and private use is sometimes left alone
    // (Belgium), but nowhere in this band does the law protect it.
    { min: 1, answer: "no", text: "Not in public, and even at home the law does not protect it" },
    { min: 0, answer: "no", text: "Use itself is a crime" },
  ] },
  // Not a yes/no question, so each step carries its own short label.
  { id: "caught", q: "What if I'm caught?", seg: 2, steps: [
    { min: 6, answer: "yes", text: "If you stay within the limits", label: "Nothing" },
    // fines, tickets, diversion, suspended documents, or nothing below a threshold: all sit here
    { min: 4, answer: "limited", text: "For a small amount, usually a fine, a referral to treatment or nothing at all; prison is rare", label: "A light penalty" },
    { min: 2, answer: "limited", text: "Usually a fine; prison is possible", label: "Fine or prison" },
    { min: 1, answer: "no", text: "Users are routinely jailed", label: "Prison" },
    { min: 0, answer: "no", text: "Long sentences or worse", label: "Severe punishment" },
  ] },
];

// `place` is a country, state or province as countries.js builds it: its six scores `s`, `rec`,
// `med`, and `answers`, the answers its profile states itself ({ carry: { answer, text, label? } }).
// `seg` in the result is the id of the segment the answer was read from; `own` marks an answer
// that the profile states rather than one read from the score.
export const answersFor = (place) =>
  QUESTIONS.map(({ id, q, seg, steps }) => {
    const own = place.answers?.[id];
    const step = own ?? steps.find((x) => place.s[seg] >= x.min && (!x.when || x.when(place)));
    return { id, q, answer: step.answer, text: step.text, label: step.label ?? ANSWER_LABEL[step.answer], seg: SEGMENT_IDS[seg], own: !!own };
  });
