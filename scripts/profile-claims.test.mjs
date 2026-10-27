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
const files = [...walk(path.join(root, "countries")), ...walk(path.join(root, "articles")), ...walk(path.join(root, "culture")), path.join(root, "changes.yaml")];
// folded YAML breaks sentences across lines, so compare with the whitespace flattened
const texts = files.map((file) => [path.relative(root, file), fs.readFileSync(file, "utf8").replace(/\s+/g, " ")]);

const CLAIMS = [
  { claim: /taxed(?: it)? from\s+\[?1798/i, why: "Bengal’s 1798 Board letter recommended taxes; culture pages must not turn it into enacted taxation (#182)" },
  { claim: /India taxed cannabis from \[?1798/i, why: "the 1798 record is a Board recommendation, including Egypt-article cross-references (#145)" },
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

test('plant thresholds cannot conceal concentrate felonies (#161–163)', () => {
  const hi = country('us/hi'), wy = country('us/wy'), nc = country('us/nc');
  assert.match(hi.segments.possession, /3 g.*plant|plant.*3 g/);
  assert.match(hi.segments.possession, /⅛ oz.*class B.*1 oz.*class A/);
  assert.match(hi.answers.caught.text, /concentrates.*felonies/);
  assert.match(wy.segments.possession, /3 oz.*plant.*0\.3 g.*liquid.*3 g.*powder/);
  assert.match(wy.answers.caught.text, /0\.3 g.*liquid.*felony/);
  assert.match(nc.segments.possession, /3\/20 oz.*hashish.*any quantity.*isolated.*Class I felony/);
  assert.match(nc.answers.caught.text, /isolated THC.*felony/);
});

test('Philippine import and gathering rules survive the ordinary weight bands (#164–165)', () => {
  const ph = country('ph');
  assert.match(ph.segments.possession.text, /Section 13.*maximum Section 11.*at least two.*regardless of amount/);
  assert.match(ph.context.visitors.text, /importation.*life imprisonment.*regardless of quantity/);
  assert.match(ph.answers.caught.text, /importation.*life.*group possession/);
});

test('Samoa keeps the actual Class B plant listing rather than the reported Class C misreading (#166)', () => {
  const ws = country('ws');
  assert.match(ws.segments.possession.text, /Second Schedule \(Class B\), item 40/);
  assert.match(ws.segments.possession.text, /fourteen years/);
  assert.match(ws.sources.ag2023.url, /ag\.gov\.ws/);
});

test('Russian and Latvian oil thresholds remain distinct from dried flower (#167, #179)', () => {
  assert.match(country('ru').segments.possession.text, /6 g.*plant.*2 g.*hashish.*0\.4 g.*oil/);
  assert.match(country('ru').segments.possession.text, /100 g, 25 g and 5 g/);
  const lv = country('lv');
  assert.match(lv.segments.possession.text, /1 g.*dried.*5 g.*undried.*0\.1 g.*hashish.*0\.05 g.*oil/);
  assert.match(lv.answers.caught.text, /product-specific ceiling/);
});

test('Vietnam ordinary monitoring alone does not establish the rehabilitation-related use crime (#168)', () => {
  const vn = country('vn');
  assert.match(vn.segments.consumption.text, /management ends AND while under illicit-user management/);
  assert.match(vn.context.consequences.text, /ordinary one-year monitoring.*assessment.*requires.*rehabilitation-related/);
  const article = fs.readFileSync(path.join(root, 'articles/vietnam-repeat-use-crime-2025.md'), 'utf8');
  assert.match(article, /ordinary monitoring period alone does not establish that offence/i);
  assert.doesNotMatch(article, /exactly those the state already knows as users/);
});

test('aggravated use, distribution intent and border offences qualify personal-use summaries (#169–171)', () => {
  assert.match(country('fr').segments.possession.text, /public-authority.*five years.*€75,000.*outside.*fixed-fine/);
  assert.match(country('do').segments.possession.text, /intent to distribute or sell.*regardless of quantity/);
  assert.match(country('mx').context.visitors.text, /import.*export.*ten to twenty-five years/i);
  assert.match(country('mx').context.visitors.text, /named adult/);
});

test('New Zealand supply presumptions distinguish Class B preparations from Class C plant (#172)', () => {
  const s = country('nz').segments.sharing.text;
  assert.match(s, /28 g.*Class C.*5 g.*Class B.*250 mg/);
  assert.match(s, /rebuttable presumption.*not an automatic conviction/);
  assert.match(s, /fourteen years.*Class B.*eight years.*Class C/);
});

test('medical quantity and driving exceptions retain their qualifying conditions (#173–176)', () => {
  assert.match(country('hr').context.medical.text, /7\.5 g of THC per 30 days/);
  assert.doesNotMatch(country('hr').context.medical.text, /0\.75 g/);
  assert.match(country('ch').context.driving.text, /physician’s prescription.*exempt.*Actual unfitness/);
  assert.match(country('pe').segments.possession.text, /registered patient.*care or guardianship.*treatment need/);
  const no = country('no').context.driving.text;
  assert.match(no, /Fixed concentration rules do not apply.*prescription/);
  assert.match(no, /Sativex and Epidyolex.*group 1.*specialist/);
  assert.match(no, /Groups 2 and 3 do not qualify/);
});

test('Morocco use and holding penalties remain separate (#177)', () => {
  const text = country('ma').segments.possession.text;
  assert.match(text, /Article 2.*five to ten years.*5,000–50,000/);
  assert.match(text, /Article 8.*use.*500–5,000.*not a universal.*ceiling for possession/);
});

test('new pilot and resin permissions are recorded without inventing broad retail supply (#160, #178)', () => {
  const py = country('py'), mt = country('mt'), history = events();
  assert.match(py.context.medical.text, /488\/2025.*19 December 2025.*two-year.*pilot/);
  assert.match(py.context.products.text, /do not demonstrate.*currently in stock/);
  assert.match(mt.context.products.text, /solid solventless.*processing authorisation/);
  assert.match(mt.context.products.text, /33%.*34–66%.*above 66%/);
  for (const id of ['paraguay-medicinal-cannabinoid-pilot-2025', 'malta-solventless-resin-permission-2025']) {
    const e = history.find((e) => e.id === id);
    assert.equal(e.checked, true);
    assert.equal(e.before, undefined);
    assert.ok(e.unscored);
  }
});

test('Costa Rica permissions do not establish stocked THC patient medicines (#159)', () => {
  const cr = country('cr');
  assert.equal(cr.medical, 'limited');
  assert.equal(cr.scores.access, 0);
  assert.match(cr.context.medical.text, /Routine pharmacy availability.*has not been established/);
  assert.match(cr.context.medical.text, /personal imports.*unregistered/);
  assert.match(cr.context.products.text, /pharmacy-made.*exempt.*registration/);
  assert.match(cr.answers.buy.text, /has not been verified/);
  const e = events().find((e) => e.id === 'costa-rica-medical-2022');
  assert.equal(e.before, undefined);
  assert.match(e.unscored, /operating THC patient-supply/);
  const article = fs.readFileSync(path.join(root, 'articles/costa-rica-medical-2022.md'), 'utf8');
  assert.doesNotMatch(article, /Only access changes, from 0 to 1/);
});

test('India federal bhang exclusion does not override state prohibition (#180)', () => {
  const india = country('in');
  assert.match(india.summary, /state law differs.*Maharashtra/);
  assert.match(india.segments.possession.text, /only when not accompanied.*tops.*State laws still apply/);
  assert.doesNotMatch(india.segments.possession.text, /which is why bhang is legal/);
  assert.match(india.context.visitors.text, /does not authorise carrying it into another state/);
  assert.match(india.answers.buy.text, /states that permit it/);
  assert.match(india.segments.consumption.text, /six months.*₹10,000/);
  assert.equal(india.scores.access, 2);
  assert.equal(india.recreational, 'death');
});


test('San Marino distinguishes authorised flower from verified dispensing (#187)', () => {
  const sm = country('sm');
  assert.doesNotMatch(sm.context.products.text + sm.context.medical.text, /no flower/i);
  assert.match(sm.context.products.text, /medical framework includes cannabis flower/);
  assert.match(sm.context.products.text, /dispensing of flower has not been verified/);
  assert.match(sm.context.medical.text, /home growing remains illegal/);
  assert.match(sm.sources.l113english.locator, /Articles 1–3 and 9–11/);
  assert.match(sm.sources.asccfaq.locator, /Q3/);
  assert.equal(sm.medical, 'limited');
  assert.deepEqual(sm.scores, { possession: 1, cultivation: 1, enforcement: 2, sharing: 1, consumption: 1, access: 1 });
});

// Issue #186
test('GDELT observations are labelled as daily global shares, never local attention (#186)', () => {
  const news = yaml.load(fs.readFileSync(path.join(root, 'datasets/datasets.yaml'), 'utf8')).find(d => d.id === 'news');
  assert.match(news.about, /denominator stays global/);
  assert.match(news.profile.headline, /global news/);
  assert.match(news.origin, /arithmetic means of daily global-coverage percentages/);
  assert.match(news.map.lede, /not cannabis attention within its own press/);
  const chart = fs.readFileSync(path.join(root, 'src/pages/charts.astro'), 'utf8');
  assert.doesNotMatch(chart, /press talks about cannabis most|attention and the score go together/);
});

// Issue #192
test('US outdoor public-use permissions reach quick answers and scores (#192)', () => {
  for (const id of ['us/ct','us/ri','us/mn']) {
    const p = country(id);
    assert.equal(p.scores.consumption, 5);
    assert.equal(p.answers.public.answer, 'limited');
    assert.match(p.answers.public.text, /outdoor public/);
    assert.doesNotMatch(p.segments.consumption, /private only/i);
  }
  assert.equal(country('us/index').answers.public.answer, 'limited');
});

// Issue #193
test('Thailand medical-only flower status agrees with its explanation (#193)', () => {
  const th = country('th');
  assert.equal(th.recreational, 'illegal');
  assert.equal(th.medical, 'legal');
  assert.match(th.summary, /requires a prescription/);
  assert.match(th.summary, /Recreational use is officially no longer permitted/);
  assert.match(th.context.planting.text, /seed|plant/i);
});

// Issue #194
test('fixed THC classes require numerical evidence; Kenya remains unverified (#194)', () => {
  assert.equal(country('ke').context.driving.status, 'unknown');
  for (const name of fs.readdirSync(path.join(root,'countries')).filter(n=>n.endsWith('.yaml'))) {
    const p = country(name.slice(0,-5)), d = p.context?.driving;
    if (d?.status !== 'limit') continue;
    assert.match(d.text, /\d+(?:\.\d+)?\s*(?:nanograms?|microgram(?:me)?s?|ng|µg|mg)/i, name);
    assert.ok(d.sources.some(k => p.sources[k]?.url), name+' needs a source for its numerical rule');
  }
});

// Issue #195
test('PNG quantity tiers cannot hide the alternative forty-year charging route (#195)', () => {
  const pg = country('pg');
  for (const text of [pg.summary,pg.segments.possession.text,pg.segments.cultivation.text,pg.context.visitors.text]) {
    assert.match(text, /forty years|forty-year/);
  }
  assert.match(pg.segments.possession.text, /prevails where criminal laws conflict/);
  assert.match(pg.segments.enforcement.text, /three years in default/);
  assert.match(pg.sources.dda2021.locator, /13 January 2022/);
});

// Issue #196
test('Guyana visitors retain the noncustodial cannabis exception (#196)', () => {
  const gy = country('gy').context.visitors.text;
  assert.match(gy, /up to 30 g.*cannot bring imprisonment/);
  assert.doesNotMatch(gy, /minimum jail sentence.*3 years/);
  assert.match(gy, /does not authorise bringing cannabis across the border/);
});

// Issue #197
test('REPROCANN requires qualified, digitally registered prescribers (#197)', () => {
  const ar = country('ar').context.medical.text;
  assert.doesNotMatch(ar, /any doctor/);
  for (const rule of ['REFEPS','accredited academic training','digital signature','bilateral informed consent']) assert.ok(ar.includes(rule),rule);
});

// Issue #198
test('Greek dried hemp restrictions cover consumers and preserve product scope (#198)', () => {
  const gr = country('gr').context.products.text;
  assert.match(gr, /purchase and use by consumers of dried hemp flower/);
  assert.match(gr, /industrial-processing exception/);
  assert.match(gr, /Prescribed pharmaceutical cannabis is regulated separately/);
  assert.match(events().find(e=>e.id==='greece-hemp-flower-ban-2026').description, /consumers buying or using/);
});

// Issue #199
test('Dominican visitors see all three prison tiers and hashish thresholds (#199)', () => {
  const d = country('do').context.visitors.text;
  assert.match(d, /above one pound, five to twenty years/);
  assert.match(d, /Hashish uses lower boundaries: 5 g and one-quarter pound/);
  assert.match(d, /Distribution or sale intent.*any quantity/);
  assert.match(d, /exact pound-boundary/);
});

// Issue #201
test('South Dakota distinguishes ingestion sanctions from seized possession (#201)', () => {
  const sd = country('us/sd');
  for (const rule of ['mandatory evaluation','supervised probation','Class 6 felony','Class 5 felony','authorised use is excepted']) assert.ok(sd.segments.consumption.includes(rule),rule);
  assert.match(sd.segments.consumption, /ten years of the first conviction/);
  assert.match(sd.answers.caught.text, /Possession.*ingestion/);
});

// Issue #202
test('Grenada public use distinguishes tickets, courts and school-area prison (#202)', () => {
  const gd = country('gd');
  for (const text of [gd.summary,gd.segments.consumption.text,gd.context.visitors.text,gd.answers.public.text,gd.answers.caught.text]) assert.match(text,/twenty years/);
  assert.match(gd.segments.consumption.text, /optional EC\$300 notice/);
  assert.match(gd.segments.consumption.text, /EC\$5,000 fine/);
  assert.match(gd.segments.consumption.text, /100 yards during school operating hours/);
  assert.match(gd.segments.consumption.text, /Private dwellings.*excepted/);
  assert.match(events().find(e=>e.id==='grenada-decriminalisation-2026').description,/twenty years on indictment/);
});

// Issue #203
test('Malaysia section 39B preserves the statutory life alternative (#203)', () => {
  const text = country('my').segments.sharing.text;
  assert.match(text, /death or life imprisonment/);
  assert.match(text, /at least twelve strokes/);
  assert.doesNotMatch(text, /30 to 40|30–40/);
  const e = events().find(e=>e.id==='malaysia-mandatory-death-abolished-2023');
  assert.match(e.description,/death or life imprisonment/);
  assert.doesNotMatch(e.description,/30 to 40/);
});

// Issue #204
test('French B2 visibility has its own three-year clock and restricted audience (#204)', () => {
  const text = country('fr').context.consequences.text;
  assert.match(text, /bulletin no. 2.*three years from payment/);
  assert.match(text, /Only specified authorities/);
  assert.match(text, /Judicial exclusion can be requested/);
  assert.match(text, /ten years in a national database/);
  assert.match(events().find(e=>e.id==='france-fixed-fine-2026').description,/B2 criminal record for three years/);
});

// Issue #206
test('Saint Kitts separates the private-use ruling from later statutory bands (#206)', () => {
  const kn=country('kn');
  assert.doesNotMatch(kn.segments.possession.text,/Above that it is a criminal offence/);
  assert.match(kn.segments.possession.text,/any amount in private for their own private use/);
  assert.match(kn.segments.possession.text,/Parliament power to regulate quantities/);
  assert.match(kn.segments.possession.text,/56 g.*15 g/);
  assert.match(kn.segments.cultivation.text,/EC\$50 ticket.*five plants/);
  assert.match(kn.segments.enforcement.text,/three days in prison for default/);
  assert.match(kn.answers.carry.text,/separate from protection for private personal use/);
  assert.match(kn.context.visitors.text,/Importation and supply are outside/);
  assert.match(events().find(e=>e.id==='saint-kitts-decriminalisation-2019').description,/Parliament power to set quantity limits/);
  const article=fs.readFileSync(path.join(root,'articles/saint-kitts-decriminalisation-2019.md'),'utf8');
  assert.doesNotMatch(article,/is now treated as a minor infraction/);
  assert.deepEqual(kn.scores,{possession:4,cultivation:3,enforcement:5,sharing:1,consumption:3,access:1});
});

// Issue #207
test('South Carolina separates simple possession from an intent inference (#207)', () => {
  const sc=country('us/sc');
  assert.doesNotMatch(sc.segments.possession,/More than 1 oz is a felony/);
  assert.match(sc.segments.possession,/Simple possession above 1 oz is also a misdemeanour/);
  assert.match(sc.segments.possession,/prima facie evidence of intent to distribute/);
  assert.match(sc.segments.enforcement,/trafficking offence starts at 10 pounds/);
  assert.match(sc.answers.caught.text,/can support a felony intent-to-distribute charge/);
});

// Issue #208
test('Kansas possession explains the three qualifying-conviction bands (#208)', () => {
  const ks=country('us/ks');
  assert.doesNotMatch(ks.segments.possession,/Any amount is a misdemeanour/);
  assert.match(ks.segments.possession,/Class B.*six months/);
  assert.match(ks.segments.possession,/Class A.*one year/);
  assert.match(ks.segments.possession,/Two or more qualifying priors.*drug severity level 5 felony/);
  assert.match(ks.segments.possession,/out-of-state laws/);
  assert.match(ks.answers.caught.text,/third is a felony/);
  assert.match(ks.segments.access,/0.3% THC.*5% of its CBD/s);
});

// Issue #209
test('Maine carries, gifts and purchases retain the concentrate sub-limit (#209)', () => {
  const me=country('us/me');
  for(const text of [me.summary,me.segments.possession,me.segments.sharing,me.segments.access,me.answers.carry.text]) {
    assert.match(text,/2.5 oz/);
    assert.match(text,/at most 10 g/);
  }
  assert.match(me.segments.possession,/entire harvest.*residence or grow location/);
  assert.doesNotMatch(me.segments.possession,/From 2.5 to 8 oz is a crime/);
});

// Issue #210
test('Alaska protects lawful on-site harvest without extending carry limits (#210)', () => {
  const ak=country('us/ak');
  assert.match(ak.segments.possession,/no additional weight cap/);
  assert.match(ak.segments.possession,/does not authorise carrying the whole crop off-site/);
  assert.match(ak.segments.possession,/less than 4 oz at home/);
  assert.match(ak.segments.possession,/felony threshold does not override.*lawful on-site harvest/s);
  assert.match(ak.segments.cultivation,/twelve plants, six mature/);
  assert.match(ak.answers.carry.text,/carry 1 oz.*harvest may be kept where grown/);
  assert.deepEqual(ak.scores,{possession:5,cultivation:4,enforcement:6,sharing:5,consumption:4,access:6});
});
