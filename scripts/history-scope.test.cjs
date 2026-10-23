const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const y = require("js-yaml");

const changes = y.load(fs.readFileSync("changes.yaml", "utf8"));
const segments = y.load(fs.readFileSync("segments.yaml", "utf8"));
const FREE = { possession: 10, cultivation: 10, enforcement: 10, sharing: 10, consumption: 10, access: 10 };
const total = (s) => Math.round(segments.reduce((sum, seg) => sum + (s[seg.id] * seg.weight) / 10, 0));
const when = (d) => Date.parse(d.length === 4 ? d + "-07-01" : d.length === 7 ? d + "-15" : d);
const byId = Object.fromEntries(changes.map((e) => [e.id, e]));

function scored(country) {
  return changes.filter((e) => e.country === country && e.before).sort((a, b) => when(a.date) - when(b.date));
}

function scoreAt(country, year) {
  const steps = scored(country);
  const hit = steps.filter((e) => Number(String(e.date).slice(0, 4)) <= year);
  if (!hit.length) return steps.length ? { ...steps[0].before } : null;
  const i = steps.indexOf(hit.at(-1));
  const next = steps[i + 1];
  if (next) return { ...next.before };
  const file = fs.existsSync(`countries/${country}.yaml`) ? `countries/${country}.yaml` : `countries/${country}/index.yaml`;
  return { ...y.load(fs.readFileSync(file, "utf8")).scores };
}

test("Madagascar's 1787 royal ban does not carry modern national penalties", () => {
  const royal = byId["madagascar-merina-ban-1787"];
  assert.equal(royal.before, undefined);
  assert.match(royal.unscored, /Imerina/);
  const then = scoreAt("mg", 1787);
  assert.deepEqual(then, FREE);
  assert.equal(total(then), 100);
  const profile = y.load(fs.readFileSync("countries/mg.yaml", "utf8")).scores;
  assert.notDeepEqual(then, profile);
  const first = scored("mg")[0];
  assert.equal(first.id, "madagascar-colonial-rongony-ban-1915");
  assert.deepEqual(first.before, FREE);
  const colony = scoreAt("mg", 1915);
  assert.equal(colony.possession, 10);
  assert.equal(colony.cultivation, 10);
  assert.ok(colony.consumption < 10);
  const modern = scoreAt("mg", 1997);
  assert.deepEqual(modern, profile);
});

test("India's provincial excise events do not move the national score", () => {
  const licensed = { possession: 5, cultivation: 2, enforcement: 5, sharing: 3, consumption: 4, access: 5 };
  for (const id of ["india-bengal-ganja-licences-1793", "india-act-xii-1896", "india-central-provinces-charas-1925"]) {
    assert.equal(byId[id].before, undefined, id);
    assert.match(byId[id].unscored, /Provincial|Bengal|Central Provinces|territories/);
  }
  assert.match(byId["india-act-xii-1896"].description, /North-Western Provinces/);
  assert.doesNotMatch(byId["india-act-xii-1896"].description, /all of British India|nationwide/);
  const first = scored("in")[0];
  assert.equal(first.id, "india-ndps-act-1985");
  assert.deepEqual(first.before, licensed);
  assert.equal(total(licensed), 40);
  assert.deepEqual(scoreAt("in", 1793), licensed);
  assert.deepEqual(scoreAt("in", 1896), licensed);
});

test("South Africa's national score starts at the 1922 ban, not one colony", () => {
  for (const id of ["orange-river-colony-dagga-ordinance-1903", "cape-colony-dagga-poison-listing-1905", "south-africa-natal-1870"]) {
    assert.equal(byId[id].before, undefined, id);
    assert.match(byId[id].unscored, /Colony|Natal/);
  }
  const first = scored("za")[0];
  assert.equal(first.id, "south-africa-national-ban-1922");
  assert.deepEqual(first.before, FREE);
  assert.deepEqual(scoreAt("za", 1903), FREE);
  assert.equal(total(scoreAt("za", 1922)), 11);
});

test("known regional events are not the first scored step for their modern country", () => {
  const blocked = new Set([
    "madagascar-merina-ban-1787",
    "india-bengal-ganja-licences-1793",
    "india-act-xii-1896",
    "india-central-provinces-charas-1925",
    "orange-river-colony-dagga-ordinance-1903",
    "cape-colony-dagga-poison-listing-1905",
    "south-africa-natal-1870",
  ]);
  const countries = new Set(changes.map((e) => e.country).filter(Boolean));
  for (const id of countries) {
    const first = scored(id)[0];
    if (first) assert.equal(blocked.has(first.id), false, `${id} starts at ${first.id}`);
  }
  for (const id of blocked) assert.equal(byId[id].before, undefined, id);
});
