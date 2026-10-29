// The quick answers ("Can I carry it?", src/lib/answers.js) of every country, state and province,
// checked against the profile's own statuses and text. An answer is read from a score band, and a
// band can hold places whose law reads differently; these checks catch an answer that says what
// the profile's text denies. Fix such a case with an `answers` entry in the profile, worded from
// its own rules (see "Quick answers" in docs/DATA-MAINTENANCE.md), or fix the score.
//   npm run answers:test
//   node scripts/answers.test.mjs --list [carry|grow|buy|public|caught]   every answer, for review
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { answersFor } from "../src/lib/answers.js";
import { SEGMENT_IDS } from "../src/lib/segment-ids.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "countries");
// the codes countries.js gives the statuses
const REC = { legal: "legal", partial: "partial", decriminalised: "decrim", illegal: "illegal", death: "death" };
const MED = { legal: "yes", limited: "limited", none: "no" };

const files = fs.readdirSync(root).flatMap((f) => {
  const p = path.join(root, f);
  return fs.statSync(p).isDirectory() ? fs.readdirSync(p).filter((g) => g.endsWith(".yaml")).map((g) => path.join(p, g)) : f.endsWith(".yaml") ? [p] : [];
});
const places = files.map((file) => {
  const d = yaml.load(fs.readFileSync(file, "utf8"));
  const id = path.relative(root, file).replace(/(\/index)?\.yaml$/, "");
  // a country's segment is { text, sources }; a state's is its text alone
  const text = Object.fromEntries(SEGMENT_IDS.map((seg) => [seg, String(d.segments[seg]?.text ?? d.segments[seg] ?? "").replace(/\s+/g, " ")]));
  const place = { id, name: d.name, s: SEGMENT_IDS.map((seg) => d.scores[seg]), rec: REC[d.recreational], med: MED[d.medical], answers: d.answers ?? null };
  return { ...place, text, result: Object.fromEntries(answersFor(place).map((x) => [x.id, x])) };
});
const placeOf = (id) => places.find((p) => p.id === id);
const said = (x) => `${x.label} — ${x.text}`;

// Each rule: a question, what about its answer and the profile cannot both be true, and why.
const RULES = [
  { q: "buy", why: "says prescription, but the profile has no medical programme",
    bad: (p, x) => /prescription/i.test(x.text) && p.med === "no" },
  { q: "buy", why: "says prescription, but the access text says there is no legal source",
    bad: (p, x) => /prescription/i.test(x.text) && /\bno (legal|lawful) (source|supply|route)\b/i.test(p.text.access) && !/prescri|medic|pharmac/i.test(p.text.access) },
  { q: "buy", why: "names licensed shops, but recreational cannabis is not legal",
    bad: (p, x) => /^in licensed shops/i.test(x.text) && p.rec !== "legal" },
  { q: "carry", why: "says legal, but recreational cannabis is not legal",
    bad: (p, x) => x.answer === "yes" && p.rec !== "legal" },
  { q: "carry", why: "says possession is not a crime, but the possession text calls it one",
    bad: (p, x) => /not a crime/i.test(x.text) && /\b(remains|is still|is) (formally )?(illegal|a (criminal )?offen[cs]e|a crime)\b/i.test(p.text.possession) },
  { q: "carry", why: "says small amounts are not prosecuted, but the possession text says they are",
    bad: (p, x) => /not prosecuted/i.test(x.text) && /\b(routinely|regularly|usually|still) (prosecuted|charged|jailed)\b/i.test(p.text.possession) },
  { q: "grow", why: "says growing is legal, but the cultivation text says it is not",
    bad: (p, x) => x.answer === "yes" && /\b(not legal|illegal|is a crime|criminal offen[cs]e)\b/i.test(p.text.cultivation) && !/\b(legal|allowed|permitted|may grow)\b/i.test(p.text.cultivation.replace(/\b(not legal|illegal)\b/gi, "")) },
  { q: "public", why: "calls use itself an offence, but the consumption text says it is not",
    bad: (p, x) => /use itself/i.test(x.text) && /\b(use|using|consumption)( itself)? is not (an? )?(criminal )?(offen[cs]e|crime|illegal)\b/i.test(p.text.consumption) },
  { q: "caught", why: "mentions a fine, but the profile says there is no fine",
    bad: (p, x) => /\bfine\b/i.test(said(x)) && /\b(there is )?no fine\b/i.test(`${p.text.possession} ${p.text.enforcement}`) },
];

if (process.argv.includes("--list")) {
  const only = process.argv[process.argv.indexOf("--list") + 1];
  for (const p of places) for (const x of Object.values(p.result)) {
    if (only && x.id !== only) continue;
    console.log(`${p.id.padEnd(8)} ${x.id.padEnd(7)} ${String(p.s[SEGMENT_IDS.indexOf(x.seg)]).padEnd(3)} ${(p.rec + "/" + p.med).padEnd(14)} ${x.own ? "own " : ""}${said(x)}`);
  }
  process.exit(0);
}

test("every answer agrees with its profile", () => {
  const wrong = places.flatMap((p) => RULES.filter((r) => r.bad(p, p.result[r.q])).map((r) => `${p.id} (${p.name}), ${r.q}: "${said(p.result[r.q])}" ${r.why}`));
  assert.deepEqual(wrong, []);
});

test("a profile's own answers are used as written", () => {
  for (const p of places.filter((x) => x.answers)) {
    for (const [q, own] of Object.entries(p.answers)) {
      assert.equal(p.result[q].text, own.text, `${p.id} ${q}`);
      assert.equal(p.result[q].own, true, `${p.id} ${q}`);
    }
  }
});

// The cases reported in issues #121, #122 and #123.
test("Cambodia, with no medical programme, is not told it can buy on prescription", () => {
  assert.equal(placeOf("kh").result.buy.answer, "no");
  assert.doesNotMatch(placeOf("kh").result.buy.text, /prescription/i);
});
test("the Netherlands: possession is not called legal or decriminalised, and buying names coffeeshops", () => {
  const nl = placeOf("nl").result;
  assert.doesNotMatch(said(nl.carry), /not a crime|\blegal\b|decriminali/i);
  assert.doesNotMatch(said(nl.buy), /clubs|state outlets/i);
  assert.match(nl.buy.text, /coffeeshop/i);
});
test("Italy: use is not called an offence, and being caught does not mean a fine", () => {
  const it = placeOf("it").result;
  assert.doesNotMatch(it.public.text, /use itself/i);
  assert.doesNotMatch(said(it.caught), /\bfine\b/i);
});

// Issue #31: a national estimate is not a single jurisdiction's legal rule.
test("US national possession names both state and federal criminal exposure", () => {
  const us = placeOf('us').result;
  assert.equal(us.carry.own, true);
  assert.equal(us.carry.answer, 'limited');
  assert.match(us.carry.text, /state and federal law/i);
  assert.match(us.carry.text, /can be a crime/);
  assert.doesNotMatch(us.carry.text, /not a crime|usually no criminal charge/i);
  assert.match(us.grow.text, /one plant.*crime/);
});

test("the federation audit keeps Australia conditional and Canada's Quebec growing exception visible", () => {
  const au = placeOf('au').result, ca = placeOf('ca').result;
  assert.match(au.carry.text, /ACT.*exemption/);
  assert.match(au.carry.text, /charges.*Commonwealth/);
  assert.equal(ca.carry.answer, 'yes'); // the national adult quantity permission is real
  assert.equal(ca.grow.answer, 'limited');
  assert.match(ca.grow.text, /Quebec bans/);
});

test("China's small-possession answer describes administrative detention rather than a criminal conviction", () => {
  const cn = placeOf('cn').result;
  assert.equal(cn.carry.answer, 'no');
  assert.match(cn.carry.text, /administrative offence.*detention/);
  assert.match(cn.carry.text, /larger amounts can be criminal/);
  assert.doesNotMatch(cn.carry.text, /It is a crime|not a crime, but you can be fined/);
  assert.equal(cn.caught.label, 'Administrative detention');
  assert.match(cn.grow.text, /administrative penalties/);
  assert.match(cn.public.text, /administrative detention/);
});

test('custodial enforcement band does not manufacture an imprisonment frequency (#138)', () => {
  const p = { s: [1, 1, 1, 1, 1, 0], rec: 'illegal', med: 'no' };
  const caught = answersFor(p).find((x) => x.id === 'caught');
  assert.match(caught.text, /prison or compulsory detention/);
  assert.doesNotMatch(caught.text, /routinely|usually|typical/);
  assert.equal(placeOf('kh').result.caught.label, 'Prison');
});

// The public glossary also feeds the enforcement tracker's multilingual source check.
test("glossary API exports sourced multilingual cannabis vocabulary and inflection rules", async () => {
  const { glossaryAPI } = await import("../src/lib/glossary-api.js");
  const data = glossaryAPI(path.resolve(root, ".."));
  assert.equal(data.version, 1);
  assert.ok(data.entries.some(e => e.kind === "glossary" && e.id === "THC"));
  assert.ok(data.entries.some(e => e.kind === "country-word" && e.word === "konopa" && e.sources.length));
  for (const word of ["marihuana", "konopí", "大麻", "กัญชา"]) assert.ok(data.recognition.words.includes(word), word);
  assert.ok(data.recognition.prefixes.includes("konop"));
  assert.ok(data.recognition.prefixes.includes("marihuan"));
  assert.ok(!data.recognition.words.includes("decriminalised"));
});
