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

// the states and provinces of the federations the index scores one by one: { US: Set(ak, al, …) }
const FEDERATIONS = Object.fromEntries(fs.readdirSync(path.join(ROOT, "countries"), { withFileTypes: true }).filter((d) => d.isDirectory())
  .map((d) => [d.name.toUpperCase(), new Set(fs.readdirSync(path.join(ROOT, "countries", d.name)).filter((f) => f !== "index.yaml").map((f) => f.replace(/\.yaml$/, "")))]));

// Keep only what the questionnaire allows: known ids, known options, numbers in range.
function clean(questions, raw, countries) {
  const out = {};
  for (const q of questions) {
    const v = raw?.[q.id];
    if (v == null || v === "") continue;
    if (q.type === "single" && typeof v === "string" && v in q.options) out[q.id] = v;
    else if (q.type === "multi" && Array.isArray(v)) {
      let xs = [...new Set(v.filter((x) => typeof x === "string" && x in q.options))];
      // options that cannot stand together: the excluding one gives way ("never used it" beside "I use it")
      for (const [one, others] of Object.entries(q.excludes ?? {})) if (xs.includes(one) && others.some((o) => xs.includes(o))) xs = xs.filter((x) => x !== one);
      if (xs.length) out[q.id] = xs;
    } else if (q.type === "scale" && Number.isInteger(v) && v >= 1 && v <= 5) out[q.id] = v;
    else if (q.type === "number" && typeof v === "number" && v > 0 && v < 1e7) out[q.id] = v;
    else if (q.type === "currency" && typeof v === "string" && USD[v]) out[q.id] = v;
    else if (q.type === "country" && typeof v === "string" && countries[v.toUpperCase()]) out[q.id] = v.toUpperCase();
    else if (q.type === "text" && typeof v === "string") out[q.id] = v.slice(0, 4000);
    // a state must belong to the country answered just before it; a city is free text, kept short
    else if (q.type === "region" && typeof v === "string" && FEDERATIONS[out[q.of]]?.has(v.toLowerCase())) out[q.id] = v.toLowerCase();
    else if (q.type === "city" && typeof v === "string" && v.trim()) out[q.id] = v.trim().replace(/\s+/g, " ").slice(0, 80);
  }
  return out;
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const round = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

// How much a place report counts towards its country's averages: someone who lived there for
// years has seen more than a weekend visitor. Without a stated duration, the tie decides.
const WEIGHT = { days: 1, weeks: 1, months: 2, years: 3, long: 4 };
const weightOf = (o) => WEIGHT[o.t_duration] ?? (o.tie === "visited" ? 1 : 3);
const quantile = (sorted, q) => { const i = (sorted.length - 1) * q, lo = Math.floor(i); return sorted[lo] + (sorted[Math.min(lo + 1, sorted.length - 1)] - sorted[lo]) * (i - lo); };
// Prices far from the rest (beyond 1.5 times the middle spread) are left out once there are
// enough to judge by; one slip or one joke should not move a country's median.
function trimmed(xs) {
  if (xs.length < 8) return xs;
  const s = [...xs].sort((a, b) => a - b), q1 = quantile(s, 0.25), q3 = quantile(s, 0.75), reach = 1.5 * (q3 - q1);
  return s.filter((x) => x >= q1 - reach && x <= q3 + reach);
}

// responses: cleaned personal answers; observations: cleaned place reports; prices: cleaned price reports
function aggregate(survey, responses, observations, prices, countries, extra = {}, limits = {}) {
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
  for (const q of survey.all.filter((q) => !["text", "region", "city"].includes(q.type))) {
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

  const byCountry = {}, pricesBy = {};
  for (const o of observations) (byCountry[o.country] ??= []).push(o);
  // a price per gram of flower in US dollars at the rates on file; a price with no currency was
  // given in dollars; hashish and anything outside 20 cents to 200 dollars a gram are left out
  for (const p of prices) {
    const usd = (p.p_price * USD[p.p_currency ?? "USD"]) / (p.p_grams ?? 1);
    if ((p.p_product ?? "flower") === "flower" && usd >= 0.2 && usd <= 200) (pricesBy[p.p_country] ??= []).push({ usd, legal: ["shop", "club"].includes(p.p_market), known: Boolean(p.p_market) });
  }
  // averages of the 1–5 scales, weighted by how well the reporter knows the place
  const avg = (os, id) => {
    const xs = os.filter((o) => o[id] != null);
    const w = xs.reduce((a, o) => a + weightOf(o), 0);
    return xs.length ? round(xs.reduce((a, o) => a + o[id] * weightOf(o), 0) / w) : null;
  };
  const med = (xs) => (xs.length >= MIN_TERRITORY ? round(median(trimmed(xs))) : null);
  const territories = [...new Set([...Object.keys(byCountry), ...Object.keys(pricesBy)])]
    .map((country) => ({ country, os: byCountry[country] ?? [], ps: pricesBy[country] ?? [] }))
    .filter(({ os, ps }) => os.length >= MIN_TERRITORY || ps.length >= MIN_TERRITORY)
    .map(({ country, os, ps }) => {
      const enough = os.length >= MIN_TERRITORY;
      const count = (id) => { const c = {}; for (const o of os) if (o[id]) c[o[id]] = (c[o[id]] ?? 0) + 1; return c; };
      return {
        country, n: os.length, tie: enough ? count("tie") : {},
        // how many of the reports come from people who lived there, not passed through
        residents: os.filter((o) => o.tie !== "visited").length,
        acceptance: enough ? avg(os, "t_acceptance") : null, enforcement: enough ? avg(os, "t_enforcement") : null, access: enough ? avg(os, "t_access") : null,
        public: enough ? count("t_public") : {},
        price: med(ps.map((p) => p.usd)), price_n: ps.length,
        price_legal: med(ps.filter((p) => p.known && p.legal).map((p) => p.usd)),
        price_illegal: med(ps.filter((p) => p.known && !p.legal).map((p) => p.usd)),
      };
    })
    .sort((a, b) => b.n - a.n || b.price_n - a.price_n);

  return {
    edition: survey.edition, ...extra,
    respondents: responses.length, observations: observations.length, price_reports: prices.length,
    countries_lived: new Set(responses.map((r) => r.residence).filter(Boolean)).size,
    countries_described: new Set([...Object.keys(byCountry), ...Object.keys(pricesBy)]).size,
    thresholds: { segment: MIN_SEGMENT, territory: MIN_TERRITORY }, rates_date: money.date,
    segments, questions, territories,
  };
}

// ── Which events count, and as what ──
// Every part of a submission is a replaceable event under its own `d` tag, and the tag decides
// what the part is: `<topic>:response` is the one personal survey of a key, `<topic>:place:<id>`
// and `<topic>:price:<id>` its reports (the id as the browser makes it, 12 hex characters). The
// decrypted content must say the same type as its slot. So a key is one respondent, however many
// events it signs: another slot claiming to be a survey is dropped, not counted as a second person.
// A key can file many reports, but past MAX_REPORTS of a kind only the newest count; the rest are
// counted as excess, for the person running the collection to look at.
const REPORT_ID = /^[0-9a-f]{12}$/;
const MAX_REPORTS = 25;
const SLOT_TYPE = { place: "observation", price: "price" };
function slotType(topic, d) {
  if (d === `${topic}:response`) return "response";
  if (!d?.startsWith(`${topic}:`)) return null;
  const [slot, id, ...rest] = d.slice(topic.length + 1).split(":");
  return SLOT_TYPE[slot] && REPORT_ID.test(id ?? "") && !rest.length ? SLOT_TYPE[slot] : null;
}
// events: as fetched from the relays. verify(ev): its signature holds. open(ev): its decrypted
// payload (throws when it cannot be read). Returns the payloads to count, by type, and what was
// dropped and why.
function collect(events, { kind, topic, edition, verify, open }) {
  const dropped = { invalid: 0, superseded: 0, deleted: 0, unreadable: 0, mismatched: 0, excess: 0, other: 0 };
  // only the newest version under one key and one `d` tag counts, whatever older copies a relay keeps
  const newest = new Map();
  for (const ev of events) {
    const d = ev.tags?.find((t) => t[0] === "d")?.[1];
    if (ev.kind !== kind || !slotType(topic, d) || !ev.tags.some((t) => t[0] === "t" && t[1] === topic) || !verify(ev)) { dropped.invalid++; continue; }
    const slot = `${ev.pubkey}:${d}`, had = newest.get(slot);
    if (had) dropped.superseded++;
    if (!had || had.created_at < ev.created_at) newest.set(slot, ev);
  }
  const out = { response: [], observation: [], price: [] };
  const reports = new Map(); // key:type → [{ created_at, payload }]
  for (const ev of newest.values()) {
    const type = slotType(topic, ev.tags.find((t) => t[0] === "d")[1]);
    let payload;
    try { payload = open(ev); } catch { dropped.unreadable++; continue; }
    if (payload?.deleted) { dropped.deleted++; continue; } // the respondent removed this part
    if (payload?.edition !== edition || typeof payload.answers !== "object" || payload.answers === null) { dropped.other++; continue; }
    if (payload.type !== type) { dropped.mismatched++; continue; }
    if (type === "response") out.response.push(payload);
    else { const k = `${ev.pubkey}:${type}`; (reports.get(k) ?? reports.set(k, []).get(k)).push({ created_at: ev.created_at, payload }); }
  }
  for (const [k, list] of reports) {
    list.sort((a, b) => b.created_at - a.created_at);
    dropped.excess += Math.max(0, list.length - MAX_REPORTS);
    for (const { payload } of list.slice(0, MAX_REPORTS)) out[k.split(":")[1]].push(payload);
  }
  return { ...out, dropped };
}

module.exports = { ROOT, loadSurvey, loadRegions, clean, aggregate, collect, slotType, MAX_REPORTS };
