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
