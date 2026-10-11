// Shared by survey-mock.cjs and survey-collect.cjs: reads the questionnaire of an edition
// (survey/<year>.yaml), cleans raw answers against it and counts them into the aggregated file
// that the site publishes (survey/results-<year>.json). Only counts leave this module: no free
// text, no single response, and nothing for a group too small to hide in.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.join(__dirname, "..");
// What is published: a filter (e.g. one region) only with this many respondents, a country only
// with this many observations. survey-collect.cjs can lower them for a look at early answers.
const DEFAULTS = { segment: 30, territory: 5 };

// US dollars for one unit of each currency a price may be given in (survey/currencies.yaml)
const money = yaml.load(fs.readFileSync(path.join(ROOT, "survey", "currencies.yaml"), "utf8"));
const USD = Object.fromEntries(Object.entries(money.per_eur).map(([code, perEur]) => [code, money.per_eur.USD / perEur]));

function loadSurvey(edition) {
  const survey = yaml.load(fs.readFileSync(path.join(ROOT, "survey", `${edition}.yaml`), "utf8"));
  survey.all = survey.sections.flatMap((s) => s.questions);
  return survey;
}

// region of every country of the index, for the regional filters
function loadRegions() {
  const dir = path.join(ROOT, "countries");
  const out = {};
  for (const f of fs.readdirSync(dir)) {
    const file = f.endsWith(".yaml") ? path.join(dir, f) : path.join(dir, f, "index.yaml");
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
    const d = yaml.load(fs.readFileSync(file, "utf8"));
    out[f.replace(/\.yaml$/, "").toUpperCase()] = d;
  }
  return out;
}

// Keep only what the questionnaire allows: known ids, known options, numbers in range.
function clean(questions, raw, countries) {
  const out = {};
  for (const q of questions) {
    const v = raw?.[q.id];
    if (v == null || v === "") continue;
    if (q.type === "single" && typeof v === "string" && v in q.options) out[q.id] = v;
    else if (q.type === "multi" && Array.isArray(v)) {
      const xs = [...new Set(v.filter((x) => typeof x === "string" && x in q.options))];
      if (xs.length) out[q.id] = xs;
    } else if (q.type === "scale" && Number.isInteger(v) && v >= 1 && v <= 5) out[q.id] = v;
    else if (q.type === "number" && typeof v === "number" && v > 0 && v < 1e7) out[q.id] = v;
    else if (q.type === "currency" && typeof v === "string" && USD[v]) out[q.id] = v;
    else if (q.type === "country" && typeof v === "string" && countries[v.toUpperCase()]) out[q.id] = v.toUpperCase();
    else if (q.type === "text" && typeof v === "string") out[q.id] = v.slice(0, 4000);
  }
  return out;
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const round = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

// responses: cleaned personal answers; observations: cleaned territory observations
function aggregate(survey, responses, observations, countries, extra = {}, limits = {}) {
  const MIN_SEGMENT = limits.segment ?? DEFAULTS.segment, MIN_TERRITORY = limits.territory ?? DEFAULTS.territory;
  const segmentsOf = (r) => {
    const rel = r.relation ?? [];
    const out = ["all"];
    if (rel.includes("use") || rel.includes("patient")) out.push("users");
    if (rel.includes("grow")) out.push("growers");
    if (rel.includes("never")) out.push("never");
    const region = countries[r.residence]?.region;
    if (region) out.push(`region:${region}`);
    return out;
  };
  const members = {};
  for (const r of responses) for (const s of segmentsOf(r)) (members[s] ??= []).push(r);
  const label = (id) => ({ all: "Everyone", users: "People who use it", growers: "Growers", never: "Never used it" })[id] ?? id.replace("region:", "");
  const segments = Object.entries(members)
    .filter(([id, rs]) => id === "all" || rs.length >= MIN_SEGMENT)
    .map(([id, rs]) => ({ id, label: label(id), n: rs.length }))
    .sort((a, b) => (a.id.startsWith("region:") - b.id.startsWith("region:")) || b.n - a.n);

  const questions = {};
  for (const q of survey.all.filter((q) => q.type !== "text")) {
    const entry = { n: {}, counts: {} };
    if (q.type === "scale") entry.mean = {};
    for (const { id } of segments) {
      const answers = members[id].map((r) => r[q.id]).filter((v) => v != null);
      entry.n[id] = answers.length;
      const counts = {};
      if (q.type === "scale") for (let k = 1; k <= 5; k++) counts[k] = 0;
      else if (q.options) for (const o of Object.keys(q.options)) counts[o] = 0;
      for (const v of answers) for (const x of [].concat(v)) counts[x] = (counts[x] ?? 0) + 1;
      entry.counts[id] = counts;
      if (q.type === "scale" && answers.length) entry.mean[id] = round(mean(answers));
    }
    questions[q.id] = entry;
  }

  const byCountry = {};
  for (const o of observations) (byCountry[o.country] ??= []).push(o);
  const avg = (os, id) => { const xs = os.map((o) => o[id]).filter((v) => v != null); return xs.length ? round(mean(xs)) : null; };
  const territories = Object.entries(byCountry)
    .filter(([, os]) => os.length >= MIN_TERRITORY)
    .map(([country, os]) => {
      // every price in US dollars at the rates on file; a price with no currency was asked in
      // dollars, and one outside 20 cents to 200 dollars a gram is taken for a slip and left out
      const prices = (src) => os.filter((o) => o.t_price != null && (!src || o.t_price_source === src))
        .map((o) => o.t_price * USD[o.t_currency ?? "USD"]).filter((usd) => usd >= 0.2 && usd <= 200);
      const count = (id) => { const c = {}; for (const o of os) if (o[id]) c[o[id]] = (c[o[id]] ?? 0) + 1; return c; };
      return {
        country, n: os.length, tie: count("tie"),
        acceptance: avg(os, "t_acceptance"), enforcement: avg(os, "t_enforcement"), access: avg(os, "t_access"),
        public: count("t_public"),
        price: prices().length >= MIN_TERRITORY ? round(median(prices())) : null, price_n: prices().length,
        price_legal: prices("legal").length >= MIN_TERRITORY ? round(median(prices("legal"))) : null,
        price_illegal: prices("illegal").length >= MIN_TERRITORY ? round(median(prices("illegal"))) : null,
      };
    })
    .sort((a, b) => b.n - a.n);

  return {
    edition: survey.edition, ...extra,
    respondents: responses.length, observations: observations.length,
    countries_lived: new Set(responses.map((r) => r.residence).filter(Boolean)).size,
    countries_described: Object.keys(byCountry).length,
    thresholds: { segment: MIN_SEGMENT, territory: MIN_TERRITORY }, rates_date: money.date,
    segments, questions, territories,
  };
}

module.exports = { ROOT, loadSurvey, loadRegions, clean, aggregate };
