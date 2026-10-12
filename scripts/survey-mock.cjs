// Invented survey answers, so that /survey/ can be designed and tested before the survey opens:
//   node scripts/survey-mock.cjs [respondents]
// Writes survey/results-<edition>.json with "mock": true, which the page announces loudly. The
// answers are random draws shaped by each country's index score; they are NOT findings. The same
// counting code (survey-lib.cjs) is used for real answers, so the file has the real shape.
const fs = require("fs");
const path = require("path");
const { ROOT, loadSurvey, loadRegions, clean, aggregate } = require("./survey-lib.cjs");

const EDITION = 2026;
const N = +process.argv[2] || 2600;
const survey = loadSurvey(EDITION);
const countries = loadRegions();

// a fixed seed: the same invented data on every run
let seed = 20261012;
const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) * 0.87;
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const scale = (x) => clamp(Math.round(x), 1, 5);
function pick(weights) { // {option: weight}
  let r = rnd() * Object.values(weights).reduce((a, b) => a + b, 0);
  for (const [k, w] of Object.entries(weights)) if ((r -= w) <= 0) return k;
  return Object.keys(weights)[0];
}
const some = (probs) => Object.entries(probs).filter(([, p]) => rnd() < p).map(([k]) => k);

const WEIGHTS = { possession: 25, cultivation: 25, enforcement: 20, sharing: 10, consumption: 10, access: 10 };
const score = (id) => Object.entries(WEIGHTS).reduce((a, [k, w]) => a + (countries[id].scores[k] * w) / 10, 0); // 0–100

// who answers a web survey in English: mostly Europe and the Americas, a long tail elsewhere
const HOME = { US: 300, DE: 260, GB: 170, CA: 150, CZ: 140, NL: 110, ES: 110, FR: 100, PL: 95, IT: 90, AU: 85, BR: 70, MX: 60, CH: 55, AT: 50, PT: 45, TH: 45, ZA: 45, IN: 45, SE: 35, UY: 30, AR: 35, CO: 30, IE: 30, BE: 30, DK: 28, NO: 22, FI: 22, IL: 25, JP: 22, NZ: 22, GR: 18, HU: 18, RO: 16, TR: 16, MA: 14, NG: 14, KE: 10, PH: 12, ID: 10, SG: 6, KR: 8, EG: 6, AE: 5, JM: 12, CL: 20, MT: 10, LU: 8 };
for (const id of Object.keys(HOME)) if (!countries[id]) delete HOME[id];
const ANY = Object.fromEntries(Object.keys(countries).filter((id) => countries[id].scores).map((id) => [id, HOME[id] ? HOME[id] / 4 + 3 : 1]));
// an invented street price per country, cheaper where cannabis is freer or grown locally
const basePrice = Object.fromEntries(Object.keys(ANY).map((id) => [id, clamp(13 - score(id) * 0.09 + gauss() * 4, 1.5, 28)]));

// each country also differs from what its law predicts, so the dots do not fall on a line
const quirk = Object.fromEntries(Object.keys(ANY).map((id) => [id, { a: gauss() * 0.55, e: gauss() * 0.6, x: gauss() * 0.5 }]));
const responses = [], observations = [], prices = [];
for (let i = 0; i < N; i++) {
  const home = pick(HOME), s = score(home) / 100; // 0–1, how free the law is at home
  const liberal = gauss(); // the person's own leaning
  const r = { residence: home };
  r.age = pick({ a16: 3, a18: 21, a25: 33, a35: 21, a45: 12, a55: 7, a65: 3 });
  r.gender = pick({ man: 62, woman: 30, other: 4, skip: 4 });
  r.setting = pick({ city: 52, town: 33, rural: 15 });
  const kind = pick({ use: 68, past: 12, never: 14, study: 6 });
  r.relation = kind === "use" ? ["use"] : kind === "past" ? ["past"] : kind === "never" ? ["never"] : ["research", ...(rnd() < 0.5 ? ["use"] : ["never"])];
  const uses = r.relation.includes("use");
  if (uses && rnd() < 0.14 + s * 0.3) r.relation.push("grow");
  if (uses && rnd() < 0.12) r.relation.push("patient");
  if (rnd() < 0.05) r.relation.push("work");

  if (uses || kind === "past") {
    r.frequency = uses ? pick({ daily: 30, weekly: 30, monthly: 20, yearly: 20 }) : pick({ none: 80, yearly: 20 });
    r.first_age = pick({ u15: 12, a15: 38, a18: 28, a21: 14, o25: 8 });
    r.methods = some({ joint_tobacco: home === "US" || home === "CA" ? 0.1 : 0.55, joint_pure: 0.45, pipe: 0.3, vaporiser: 0.28 + s * 0.2, edibles: 0.2 + s * 0.25, oil: 0.12, concentrates: 0.06 + s * 0.15 });
    r.products = some({ flower: 0.9, hashish: ["MA", "ES", "FR", "NL", "DK", "PT"].includes(home) ? 0.6 : 0.2, edibles: 0.2 + s * 0.3, cartridges: 0.08 + s * 0.3, extracts: 0.1, cbd: 0.25 });
    r.reasons = some({ relax: 0.8, social: 0.5, sleep: 0.45, pain: 0.25, creative: 0.3, ritual: 0.08, habit: 0.2 });
    r.company = pick({ alone: 30, others: 30, both: 40 });
  }
  if (r.relation.includes("grow")) {
    r.grow_years = pick({ y1: 20, y3: 38, y10: 28, y10p: 14 });
    r.grow_where = some({ indoor: 0.55, balcony: 0.3, outdoor: 0.4 });
    r.grow_plants = pick({ p2: 35, p5: 40, p10: 15, p10p: 10 });
    r.grow_reasons = some({ quality: 0.7, cost: 0.6, market: 0.5, enjoy: 0.65, medical: 0.2, share: 0.25 });
    r.grow_challenges = some({ law: 0.75 - s * 0.6, neighbours: 0.4, pests: 0.45, cost: 0.3, knowledge: 0.25, seeds: 0.25 - s * 0.15 });
    r.grow_legal = countries[home].scores.cultivation >= 4 ? pick({ legal: 80, tolerated: 10, unsure: 10 }) : pick({ illegal: 65, tolerated: 20, unsure: 15 });
  }
  if (uses) {
    const legalShop = countries[home].scores.access >= 4;
    r.source = some({ shop: legalShop ? 0.6 : 0.03, club: ["ES", "DE", "UY", "MT"].includes(home) ? 0.3 : 0.02, own: r.relation.includes("grow") ? 0.9 : 0, gift: 0.3, friends: 0.45, dealer: legalShop ? 0.2 : 0.55, online: 0.1 });
    r.spend = pick({ s0: 12, s25: 28, s75: 32, s150: 18, s150p: 10 });
    r.affordable = scale(3.2 + gauss());
  }
  r.acceptance = scale(1.6 + s * 3 + quirk[home].a + liberal * 0.3 + gauss() * 0.8);
  r.versus_alcohol = pick({ more: 6 + s * 20, same: 20 + s * 30, less: 74 - s * 50 });
  if (uses || kind === "past") {
    r.family = pick({ open: 20 + s * 40, some: 40, hidden: 35 - s * 25, na: 5 });
    r.work = pick({ yes: 10 + s * 35, maybe: 35, no: 50 - s * 35, na: 5 });
    const hit = some({ family: 0.3 - s * 0.15, job: 0.1 - s * 0.05, doctor: 0.15, housing: 0.05, friends: 0.08 });
    r.stigma = hit.length ? hit : ["none"];
  }
  r.tradition = ["IN", "MA", "JM", "NP", "ZA", "MX", "TH", "NG"].includes(home) ? pick({ yes: 65, no: 15, unsure: 20 }) : pick({ yes: 12, no: 55, unsure: 33 });
  r.generations = pick({ more: 70, same: 22, less: 8 });
  r.taught = some({ family: 0.55, school: 0.45, religion: 0.15 + (1 - s) * 0.15, media: 0.5, friends: 0.6, state: 0.3 + (1 - s) * 0.2, doctors: 0.1, self: uses ? 0.7 : 0.1 });
  r.taught_message = pick({ dangerous: 45 - s * 20, immoral: 14 - s * 8, mixed: 22, fine: 5 + s * 20, silence: 14 });
  r.law_moral = uses ? pick({ much: 8, some: 22, no: 40, opposite: 30 }) : pick({ much: 30, some: 35, no: 28, opposite: 7 });
  r.abroad = pick({ more: 38, less: 3, no: 34, never: 25 });
  r.law_or_attitudes = pick({ law: 18, attitudes: 34, both: 42, neither: 6 });
  r.law_known = scale(3.4 + (uses ? 0.5 : -0.4) + gauss() * 0.9);
  r.law_fair = scale(1.3 + s * 2.6 - liberal * 0.5 + (kind === "never" ? 1 : 0) + gauss() * 0.8);
  r.obey = uses ? pick({ obey: 2, change: 9, protest: 6, risk: 22, quiet: 40, open: 8, depends: 13 }) : pick({ obey: 26, change: 24, protest: 8, risk: 18, quiet: 8, open: 1, depends: 15 });
  r.police_trust = scale(3 - (uses ? 0.6 : 0) - (1 - s) * 0.6 + gauss());
  r.police_contact = uses ? pick({ none: 52 + s * 20, stopped: 24 - s * 8, fined: 14 - s * 6, arrested: 7 - s * 4, convicted: 3 - s * 2 }) : pick({ none: 92, stopped: 6, fined: 2 });
  r.who_decides = pick({ person: 55 + liberal * 12, doctors: 12, voters: 14, parliament: 16, tradition: 3 });
  r.policy = kind === "never" ? pick({ ban: 14, medical: 30, decrim: 20, regulated: 30, free: 6 }) : pick({ ban: 1, medical: 5, decrim: 14, regulated: 55, free: 25 });
  r.opinion_change = pick({ more: 58, same: 34, less: 8 });
  responses.push(clean(survey.all, r, countries));

  // one observation of home, and for some people one or two of places they visited
  const places = [[home, "live"], ...Array.from({ length: pick({ 0: 45, 1: 35, 2: 20 }) | 0 }, () => [pick(ANY), pick({ visited: 75, lived: 25 })])];
  for (const [id, tie] of places) {
    if (id === home && tie !== "live") continue;
    const t = score(id) / 100, legal = countries[id].scores.access >= 4;
    const o = { country: id, tie, when: tie === "live" ? "y0" : pick({ y0: 22, y1: 22, y5: 32, y10: 14, older: 10 }) };
    o.t_duration = tie === "visited" ? pick({ days: 45, weeks: 40, months: 15 }) : pick({ months: 8, years: 27, long: 65 });
    o.t_acceptance = scale(1.6 + t * 3 + quirk[id].a + gauss() * 0.8);
    o.t_enforcement = scale(4.3 - t * 3 + quirk[id].e + gauss() * 0.8);
    o.t_access = scale(2.2 + t * 2.6 + quirk[id].x + gauss() * 0.8);
    o.t_public = pick({ open: 4 + t * 55, discreet: 30, hidden: 45 - t * 35, rare: 21 - t * 18 });
    // price reports are separate: some people give one, a few give several, some an odd one out
    for (let k = rnd() < 0.55 ? (rnd() < 0.15 ? 2 : 1) : 0; k > 0; k--) {
      const market = legal && rnd() < 0.6 ? pick({ shop: 80, club: 20 }) : pick({ dealer: 65, friend: 35 });
      const grams = pick({ 1: 60, 3.5: 12, 5: 14, 10: 10, 28: 4 }) * 1;
      const perGram = clamp(basePrice[id] * (["shop", "club"].includes(market) ? 0.9 : 1) * (1 + gauss() * 0.25) * (rnd() < 0.02 ? 6 : 1), 0.5, 150);
      prices.push(clean(survey.prices.questions, { p_country: id, p_product: rnd() < 0.9 ? "flower" : "hashish", p_price: Math.round(perGram * grams * 10) / 10, p_currency: "USD", p_grams: grams, p_market: market, p_when: pick({ y0: 45, y1: 30, y5: 20, older: 5 }) }, countries));
    }
    observations.push(clean(survey.territory.questions, o, countries));
  }
}

const out = aggregate(survey, responses, observations, prices, countries, { mock: true, generated: "2026-10-12" });
const file = path.join(ROOT, "survey", `results-${EDITION}.json`);
fs.writeFileSync(file, JSON.stringify(out, null, 1) + "\n");
console.log(`mock: ${out.respondents} respondents, ${out.observations} place reports, ${out.price_reports} price reports, ${out.territories.length} countries published → ${path.relative(ROOT, file)} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
