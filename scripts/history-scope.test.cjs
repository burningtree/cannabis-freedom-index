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

test("scored dates follow commencement, not assent", () => {
  for (const id of [
    "uganda-narcotics-act-2024",
    "uganda-narcotics-commencement-2025",
    "india-ndps-amendment-assent-2001",
    "india-ndps-amendment-2001",
    "new-zealand-dangerous-drugs-1927",
    "new-zealand-dangerous-drugs-commencement-1928",
    "portugal-personal-use-quantity-2023",
  ]) {
    assert.equal(changes.filter((e) => e.id === id).length, 1, id);
  }
  const ugandaAssent = byId["uganda-narcotics-act-2024"];
  const ugandaStart = byId["uganda-narcotics-commencement-2025"];
  assert.equal(ugandaAssent.before, undefined);
  assert.match(ugandaAssent.unscored, /14 April 2025/);
  assert.equal(ugandaStart.date, "2025-04-14");
  assert.equal(total(ugandaStart.before), 9);
  assert.equal(total(scoreAt("ug", 2024)), 9);
  assert.equal(total(scoreAt("ug", 2025)), total(y.load(fs.readFileSync("countries/ug.yaml", "utf8")).scores));

  const indiaAssent = byId["india-ndps-amendment-assent-2001"];
  const indiaBands = byId["india-ndps-amendment-2001"];
  assert.equal(indiaAssent.date, "2001-05-09");
  assert.equal(indiaAssent.before, undefined);
  assert.equal(indiaBands.date, "2001-10-02");
  assert.equal(indiaBands.before.possession, 0);

  const nzAssent = byId["new-zealand-dangerous-drugs-1927"];
  const nzStart = byId["new-zealand-dangerous-drugs-commencement-1928"];
  assert.equal(nzAssent.before, undefined);
  assert.match(nzAssent.unscored, /1 January 1928/);
  assert.equal(scored("nz")[0].id, "new-zealand-dangerous-drugs-commencement-1928");
  assert.equal(nzStart.date, "1928-01-01");
  assert.deepEqual(scoreAt("nz", 1927), FREE);
  assert.equal(total(scoreAt("nz", 1928)), 11);

  const portugal = byId["portugal-personal-use-quantity-2023"];
  assert.equal(portugal.date, "2023-10-01");
  assert.equal(portugal.before, undefined);
  assert.match(portugal.unscored, /administrative/);
  const pt = y.load(fs.readFileSync("countries/pt.yaml", "utf8"));
  assert.match(pt.segments.possession.text, /1 October 2023/);
  assert.match(pt.segments.possession.text, /25 g/);
  assert.equal(pt.scores.possession, 3);
  assert.equal(pt.scores.enforcement, 5);
});
