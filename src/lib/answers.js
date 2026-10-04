// Five plain-language answers per country, read straight off the segment scores.
// Scores are in the order of segments.yaml: possession, cultivation, enforcement,
// sharing, consumption, access. See segments.yaml for what each level means.

export const ANSWER_LABEL = { yes: "Yes", limited: "Limited", no: "No" };

const pick = (score, steps) => steps.find(([min]) => score >= min).slice(1);

export const QUESTIONS = [
  { id: "carry", q: "Can I carry it?", seg: 0, steps: [
    [5, "yes", "Legal up to a limit"],
    [3, "limited", "Not a crime, but you can be fined"],
    [0, "no", "It is a crime"],
  ] },
  { id: "grow", q: "Can I grow it?", seg: 1, steps: [
    [4, "yes", "A few plants at home are legal"],
    [2, "limited", "A few plants are tolerated"],
    [0, "no", "It is a crime"],
  ] },
  { id: "buy", q: "Can I buy it?", seg: 5, steps: [
    [6, "yes", "In licensed shops"],
    [4, "yes", "Through clubs or state outlets"],
    [3, "limited", "Tolerated shops or clubs, or on prescription"],
    [1, "limited", "On prescription only"],
    [0, "no", "There is no legal source"],
  ] },
  { id: "public", q: "Can I use it in public?", seg: 4, steps: [
    [7, "yes", "Wherever smoking is allowed"],
    [5, "limited", "In some places, with many restrictions"],
    [3, "no", "In private only"],
    [0, "no", "Use itself is an offence"],
  ] },
  // Not a yes/no question, so each step carries its own short label.
  { id: "caught", q: "What if I'm caught?", seg: 2, steps: [
    [6, "yes", "If you stay within the limits", "Nothing"],
    [4, "limited", "Or a referral to treatment", "A fine"],
    [2, "limited", "Usually a fine; prison is possible", "Fine or prison"],
    [1, "no", "Users are routinely jailed", "Prison"],
    [0, "no", "Long sentences or worse", "Severe punishment"],
  ] },
];

// `s` is the array of six segment scores of a country, state or province.
export const answersFor = (s) =>
  QUESTIONS.map(({ id, q, seg, steps }) => {
    const [answer, text, label = ANSWER_LABEL[answer]] = pick(s[seg], steps);
    return { id, q, answer, text, label };
  });

