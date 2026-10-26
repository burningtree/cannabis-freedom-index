// Sentences found to be false in the profiles and the history, which must not come back: copied
// from an old source, or left behind when the law changed. Each names where it was reported.
// Add one whenever a factual error turns out to be a phrase that was repeated across files.
//   node --test scripts/profile-claims.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : /\.(ya?ml|md)$/.test(e.name) ? [path.join(dir, e.name)] : []);
const files = [...walk(path.join(root, "countries")), ...walk(path.join(root, "articles")), path.join(root, "changes.yaml")];
// folded YAML breaks sentences across lines, so compare with the whitespace flattened
const texts = files.map((file) => [path.relative(root, file), fs.readFileSync(file, "utf8").replace(/\s+/g, " ")]);

const CLAIMS = [
  { claim: /Before Law 242 Panama had no lawful cannabis of any kind/i, why: "the 2021 framework did not establish operational supply (#128)" },
  // Malta (2021) and Germany (2024) license non-profit associations: issue #127
  { claim: /prohibited throughout the European Union/i, why: "clubs are not prohibited EU-wide: Malta and Germany license associations (#127)" },
  // Italy's 2024 drug-driving reform as read by the Constitutional Court, Judgment 10/2026: issue #124
  { claim: /positive test is enough, without proof of impairment/i, why: "since Judgment 10/2026 a positive test alone is not enough in Italy (#124)" },
  // New Zealand allows notified low-THC hemp growing since 28 May 2026: issue #125
  { claim: /Growing any cannabis plant is a criminal offence/i, only: "countries/nz.yaml", why: "New Zealand allows notified hemp growing since May 2026 (#125)" },
];

test("no profile, article or history entry repeats a sentence known to be false", () => {
  const found = CLAIMS.flatMap(({ claim, only, why }) => texts
    .filter(([file, text]) => (!only || file === only) && claim.test(text))
    .map(([file]) => `${file}: ${why}`));
  assert.deepEqual(found, []);
});

import yaml from 'js-yaml';
const country = (id) => yaml.load(fs.readFileSync(path.join(root, 'countries', `${id}.yaml`), 'utf8'));
const events = () => yaml.load(fs.readFileSync(path.join(root, 'changes.yaml'), 'utf8'));

test('India remains visible to death-penalty filters while bhang and scores stay explicit (#133)', () => {
  const india = country('in');
  assert.equal(india.recreational, 'death');
  assert.match(india.summary, /bhang/i);
  assert.match(india.context.death_penalty.text, /20 kg.*500 g/);
  assert.deepEqual(india.scores, { possession: 1, cultivation: 1, enforcement: 2, sharing: 1, consumption: 1, access: 2 });
  const home = fs.readFileSync(path.join(root, 'src/components/HomePage.astro'), 'utf8');
  assert.match(home, /count\(\(c\) => c.rec === "death"\)/);
  assert.match(home, /death: 0/);
});

test('medical access dates actual supply rather than enabling statutes (#128–129)', () => {
  const history = events(), get = (id) => history.find((e) => e.id === id);
  assert.equal(get('panama-medical-2021').before, undefined);
  assert.equal(country('pa').scores.access, 0);
  assert.equal(get('greece-medical-2018').before, undefined);
  assert.equal(get('greece-prescriptions-2024').date, '2024-02');
  assert.equal(get('greece-prescriptions-2024').before.access, 0);
  assert.equal(country('gr').scores.access, 1);
});

test('hemp crop and product limits and conditional Kenyan forfeiture remain distinct (#130, #132)', () => {
  const hemp = country('lt').context.planting.text;
  assert.match(hemp, /0.3% THC/);
  assert.match(hemp, /finished hemp goods.*0.2% total THC/);
  const kenya = country('ke');
  assert.match(kenya.segments.cultivation.text, /without that involvement.*returns to the owner/);
  assert.match(kenya.context.consequences.text, /notice.*heard/);
  assert.doesNotMatch(kenya.segments.cultivation.text, /court must also order the land forfeited/);
});

test('Trinidad quick answers retain the location offence and US firearm claims retain Hemani (#134–135)', () => {
  const tt = country('tt');
  assert.equal(tt.answers.carry.answer, 'limited');
  assert.match(tt.answers.caught.text, /school bus.*five years/);
  assert.match(tt.segments.possession.text, /5C\(b\).*TT\$250,000.*five years/);
  assert.match(tt.segments.possession.text, /5\(7\).*excludes.*5\(2\)/);
  const us = country('us/index').context.consequences.text;
  assert.match(us, /Hemani/);
  assert.match(us, /did not decide purchases or transfers/);
  assert.match(country('se').context.products.text, /14 July 2026/);
});

test('New Zealand planting statuses include conditional hemp plant supply (#137)', () => {
  const nz = country('nz'), p = nz.context.planting;
  assert.equal(p.seeds, 'conditional');
  assert.equal(p.clones, 'conditional');
  assert.equal(p.seeds_trade, 'conditional');
  assert.equal(p.clones_trade, 'conditional');
  assert.match(p.text, /high-THC cultivars are not hemp/i);
  assert.match(p.text, /legally entitled/);
  assert.match(p.text, /Importing or exporting.*licence/);
  assert.deepEqual(nz.scores, { possession: 2, cultivation: 1, enforcement: 4, sharing: 1, consumption: 1, access: 2 });
  assert.equal(events().find((e) => e.id === 'new-zealand-hemp-notification-2026').checked, true);
});

test('Cambodia custodial possession penalties are not classified as typical fines (#138)', () => {
  const kh = country('kh'), law = events().find((e) => e.id === 'cambodia-drug-control-law-2012');
  assert.equal(kh.scores.enforcement, 1);
  assert.equal(law.before.enforcement, 2);
  assert.match(kh.segments.enforcement.text, /article 28/i);
  assert.match(kh.segments.enforcement.text, /do not establish a cannabis-only sentencing rate/);
  assert.doesNotMatch(kh.segments.enforcement.text, /fines (are )?typical|usually (a )?fine|cannabis users are routinely jailed/i);
  const rubric = yaml.load(fs.readFileSync(path.join(root, 'segments.yaml'), 'utf8')).find((s) => s.id === 'enforcement');
  assert.equal(rubric.levels.find((l) => l.score === 1).text, 'Custodial penalties for users');
});

test('Fiji and Slovenia visitor guidance keeps judicial and superseding-law limits (#144, #146)', () => {
  const fj = country('fj'), si = country('si');
  assert.match(fj.context.visitors.text, /100 g.*guidelines favour.*worst cases/);
  assert.doesNotMatch(fj.context.visitors.text, /any amount.*three.month|mandatory/i);
  for (const t of [si.segments.possession.text, si.segments.enforcement.text, si.context.visitors.text]) {
    assert.doesNotMatch(t, /tolars|five days|five-day/);
    assert.match(t, /2005/);
  }
  assert.match(si.segments.possession.text, /€41\.73–208\.65.*2023/);
  assert.match(si.answers.caught.text, /non-criminal.*removed in 2005/);
});

test('the 1798 homepage fact stays a Bengal Board recommendation (#145)', () => {
  const facts = fs.readFileSync(path.join(root, 'src/lib/facts.js'), 'utf8');
  const fact = facts.split('\n').find((l) => l.includes('kicker: "1798 · India"'));
  assert.match(fact, /Bengal.*Board recommended taxing/);
  assert.doesNotMatch(fact, /British Parliament|1838|1871|1877/);
  assert.equal(events().find((e) => e.id === 'india-bhang-tax-1798').category, 'debate');
});

test('Illinois adult limits and lawful gifts reach the state profile (#147)', () => {
  const il = country('us/il');
  assert.match(il.segments.possession, /60 g.*10 g.*1,000/);
  assert.match(il.segments.possession, /non-residents have half.*cumulative/);
  assert.match(il.segments.sharing, /non-commercial gifts.*21\+.*possession limits/);
  assert.equal(il.scores.sharing, 5);
  assert.equal(il.scores.possession, 6);
  const e = events().find((e) => e.id === 'illinois-doubled-possession-limits-2026');
  assert.equal(e.date, '2026-06-12');
  assert.equal(e.subunit, 'il');
  assert.equal(e.before, undefined); // a subunit must not inject state scores into the national chain
});

test('Louisiana school-zone custody is visible in both quick answers (#148)', () => {
  const la = country('us/la');
  assert.match(la.segments.possession, /2,000 feet.*school buses.*colleges/);
  assert.match(la.answers.carry.text, /school-zone.*one year/);
  assert.match(la.answers.caught.text, /school-zone.*one year/);
  assert.equal(la.scores.enforcement, 2);
  assert.equal(events().find((e) => e.id === 'louisiana-school-zone-marijuana-2026').subunit, 'la');
});

test('Montana residency and Missouri growth stages survive abbreviated answers (#149, #151)', () => {
  const mt = country('us/mt'), mo = country('us/mo');
  assert.match(mt.segments.cultivation, /Montana residents 21\+; visitors may not grow/);
  assert.match(mt.segments.cultivation, /written permission.*cannabis business/);
  assert.match(mt.answers.grow.text, /residents 21\+/);
  assert.match(mo.segments.cultivation, /six flowering.*six non-flowering.*six clones.*18 plants/);
  assert.match(mo.segments.cultivation, /12 of each stage, 36/);
  assert.match(mo.answers.grow.text, /six flowering.*six larger non-flowering.*six clones/);
});

test('Tanzania records enacted seed controls separately from the proposal (#150)', () => {
  const tz = country('tz'), history = events();
  assert.equal(tz.context.planting.seeds, 'illegal');
  assert.equal(tz.context.planting.seeds_trade, 'banned');
  assert.match(tz.context.planting.text, /2 October 2026.*minimum sentence is thirty years/);
  assert.doesNotMatch(tz.context.planting.text, /not.*passed|excluding.*seeds/);
  const e = history.find((e) => e.id === 'tanzania-seed-possession-law-2026');
  assert.equal(e.date, '2026-10-02');
  assert.equal(e.checked, true);
  assert.ok(history.find((e) => e.id === 'tanzania-seed-possession-bill-2026').related.includes(e.id));
  const article = fs.readFileSync(path.join(root, 'articles/tanzania-seed-possession-bill-2026.md'), 'utf8');
  assert.doesNotMatch(article, /bill is not law|If the bill passes/);
});

test('New Hampshire distinguishes criminal status from imprisonment (#152)', () => {
  const nh = country('us/nh');
  assert.match(nh.segments.possession, /fourth offence.*class B misdemeanour.*three.*three years/);
  assert.match(nh.segments.possession, /fine-only, with no jail/);
  assert.match(nh.answers.carry.text, /fourth.*criminal/);
  assert.match(nh.answers.caught.text, /criminal.*no jail/);
});

test('Ukraine access begins at verified dispensing, rather than framework enactment (#153)', () => {
  const ua = country('ua'), history = events();
  assert.match(ua.segments.access.text, /11 June 2026.*six operating pharmacies/);
  assert.doesNotMatch(ua.context.medical.text, /prescriptions depend on imports|not yet.*dispens/i);
  assert.equal(history.find((e) => e.id === 'ukraine-medical-2024').before, undefined);
  const first = history.find((e) => e.id === 'ukraine-first-medical-dispensing-2026');
  assert.equal(first.date, '2026-06-11');
  assert.equal(first.before.access, 0);
  assert.equal(ua.scores.access, 1);
});

test('South African hemp and Oregon premises keep their distinct legal channels (#154, #155)', () => {
  const za = country('za'), us = country('us/index');
  assert.match(za.context.production.text, /1 December 2025.*2% delta-9 THC/);
  assert.doesNotMatch(za.context.black_market.text, /only legal route|everything bought is bought outside the law/);
  assert.match(us.context.clubs.text, /Oregon does not license.*members-only businesses/);
  assert.doesNotMatch(us.context.clubs.text, /Oregon permits cannabis social clubs/);
});

test('Irish referrals and Turkish product permission do not imply legal retail supply (#156, #157)', () => {
  const ie = country('ie'), tr = country('tr');
  assert.match(ie.segments.possession.text, /1 September 2026.*over 18.*first drug offence.*consent/);
  assert.match(ie.answers.caught.text, /discretionary health referral.*remains criminal/);
  assert.doesNotMatch(ie.segments.enforcement.text, /Most people.*court/i);
  assert.match(tr.context.medical.text, /special import list.*red prescription.*31 January 2026/);
  assert.match(tr.context.medical.text, /availability has not been verified/);
  assert.doesNotMatch(tr.context.medical.text, /distribution.*from 2025/);
  assert.match(tr.answers.buy.text, /special import route.*stock has not been verified/);
});

test('Florida small-flower exceptions never silently include resin (#158)', () => {
  const fl = country('us/fl');
  assert.match(fl.segments.possession, /20 g.*plant material.*resin.*felony at any weight/);
  assert.match(fl.segments.sharing, /Resin.*excluded.*gifting a concentrate can be a felony/);
  assert.match(fl.answers.caught.text, /concentrate possession can be a felony at any weight/);
});
