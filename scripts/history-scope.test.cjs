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

test("current-law profile corrections keep the statute and the score scale apart", () => {
  const ba = y.load(fs.readFileSync("countries/ba.yaml", "utf8"));
  const kz = y.load(fs.readFileSync("countries/kz.yaml", "utf8"));
  const mx = y.load(fs.readFileSync("countries/mx.yaml", "utf8"));
  assert.match(ba.segments.possession.text, /article 239\(3\)/);
  assert.match(ba.segments.possession.text, /one year/);
  assert.match(ba.summary, /criminal offence/);
  assert.equal(ba.scores.possession, 1);
  assert.equal(ba.scores.enforcement, 2);
  assert.match(kz.summary, /Article 296/);
  assert.match(kz.summary, /criminal offence/);
  assert.doesNotMatch(kz.summary, /administrative offence/);
  assert.equal(kz.scores.possession, 2);
  assert.doesNotMatch(mx.segments.possession.text, /28 g/);
  assert.doesNotMatch(mx.segments.cultivation.text, /six plants/);
  assert.match(mx.segments.possession.text, /5 g/);
  assert.match(mx.context.visitors.text, /named adult/);
  assert.equal(mx.scores.possession, 3);
  assert.equal(mx.scores.cultivation, 3);
});

test("Uzbekistan and Honduras profiles follow the current criminal codes", () => {
  const uz = y.load(fs.readFileSync("countries/uz.yaml", "utf8"));
  const hn = y.load(fs.readFileSync("countries/hn.yaml", "utf8"));
  assert.match(uz.segments.possession.text, /article 276/);
  assert.match(uz.segments.possession.text, /article 273/);
  assert.doesNotMatch(uz.summary, /five to seven years/);
  assert.equal(uz.scores.possession, 1);
  assert.equal(uz.scores.enforcement, 1);
  assert.match(hn.summary, /25 June 2020/);
  assert.match(hn.segments.possession.text, /Article 311/);
  assert.doesNotMatch(hn.summary, /compulsory rehabilitation/);
  assert.equal(hn.scores.possession, 1);
  const code = byId["honduras-penal-code-2020"];
  assert.equal(code.date, "2020-06-25");
  assert.equal(code.before, undefined);
});

test("Ghana distinguishes the personal-possession fine from buying for personal use", () => {
  const gh = y.load(fs.readFileSync("countries/gh.yaml", "utf8"));
  assert.match(gh.summary, /four to ten years/);
  assert.match(gh.segments.possession.text, /section 45\(2\)/);
  assert.match(gh.segments.possession.text, /200 to 500/);
  assert.match(gh.context.visitors.text, /four to ten years/);
  assert.equal(gh.scores.possession, 2);
  assert.equal(gh.scores.enforcement, 3);
  const act = byId["ghana-narcotics-commission-act-2020"];
  assert.equal(act.date, "2020-05-11");
  assert.match(act.description, /2,000 to 10,000/);
  assert.equal(act.before.possession, 0);
});

test("France's 2026 fine and Ireland's driving limits follow the statutes", () => {
  const fr = y.load(fs.readFileSync("countries/fr.yaml", "utf8"));
  const ie = y.load(fs.readFileSync("countries/ie.yaml", "utf8"));
  assert.match(fr.summary, /€500/);
  assert.match(fr.segments.possession.text, /€400/);
  assert.match(fr.segments.possession.text, /€1,000/);
  assert.doesNotMatch(fr.segments.possession.text, /50 g/);
  assert.match(fr.context.consequences.text, /three years/);
  assert.equal(fr.scores.enforcement, 3);
  const fine = byId["france-fixed-fine-2026"];
  assert.equal(fine.date, "2026-08-20");
  assert.equal(fine.category, "tightening");
  assert.equal(fine.before, undefined);
  assert.match(fine.unscored, /fixed-fine procedure/);
  assert.match(ie.context.driving.text, /5 nanograms/);
  assert.match(ie.context.driving.text, /medical exemption certificate/);
  assert.doesNotMatch(ie.context.driving.text, /treated as impaired/);
});

test("China visitor fines and Nepal possession bands follow the statutes", () => {
  const cn = y.load(fs.readFileSync("countries/cn.yaml", "utf8"));
  const np = y.load(fs.readFileSync("countries/np.yaml", "utf8"));
  assert.match(cn.context.visitors.text, /3,000 yuan/);
  assert.match(cn.context.visitors.text, /one to five years/);
  assert.match(cn.context.visitors.text, /ten years/);
  assert.doesNotMatch(cn.context.visitors.text, /2,000 yuan/);
  assert.doesNotMatch(cn.segments.possession.text, /deported and often/);
  assert.equal(cn.scores.possession, 2);
  assert.match(np.segments.possession.text, /three months/);
  assert.match(np.segments.possession.text, /50 grams/);
  assert.match(np.segments.consumption.text, /one month/);
  assert.match(np.context.visitors.text, /three months/);
  assert.doesNotMatch(np.segments.possession.text, /up to a month in jail/);
  assert.equal(np.scores.possession, 1);
  assert.equal(np.scores.enforcement, 2);
});

test("Croatia's misdemeanour and the West Bank personal-use offence keep their scores", () => {
  const hr = y.load(fs.readFileSync("countries/hr.yaml", "utf8"));
  const ps = y.load(fs.readFileSync("countries/ps.yaml", "utf8"));
  assert.match(hr.summary, /90 days/);
  assert.match(hr.segments.possession.text, /90 days/);
  assert.match(hr.context.visitors.text, /90 days/);
  assert.doesNotMatch(hr.segments.enforcement.text, /rather than prison/);
  assert.equal(hr.scores.enforcement, 3);
  assert.equal(hr.scores.possession, 3);
  assert.match(ps.summary, /six months to two years/);
  assert.match(ps.segments.possession.text, /article 17/);
  assert.match(ps.segments.cultivation.text, /article 17/);
  assert.doesNotMatch(ps.segments.cultivation.text, /at least ten years/);
  assert.match(ps.segments.consumption.text, /article 17/);
  assert.equal(ps.scores.possession, 1);
  assert.equal(ps.scores.cultivation, 0);
});

test("Oman's death penalty and unpaid supply follow the 2026 narcotics law", () => {
  const om = y.load(fs.readFileSync("countries/om.yaml", "utf8"));
  const law = byId["oman-narcotics-law-2026"];
  assert.match(om.segments.enforcement.text, /death or life imprisonment/);
  assert.match(om.context.death_penalty.text, /death or by life imprisonment/);
  assert.doesNotMatch(om.segments.enforcement.text, /aggravated cases/);
  assert.doesNotMatch(om.context.death_penalty.text, /aggravated cases/);
  assert.match(om.segments.sharing.text, /without payment/);
  assert.match(om.segments.sharing.text, /seven to fifteen years/);
  assert.match(om.segments.sharing.text, /fifteen years/);
  assert.match(law.description, /death or life imprisonment/);
  assert.match(law.description, /seven to fifteen years/);
  assert.equal(om.scores.enforcement, 1);
  assert.equal(om.scores.sharing, 0);
});

test("Qatar's personal-use sentence and the Philippine middle band follow the statutes", () => {
  const qa = y.load(fs.readFileSync("countries/qa.yaml", "utf8"));
  const ph = y.load(fs.readFileSync("countries/ph.yaml", "utf8"));
  const amended = byId["qatar-personal-use-penalty-2020"];
  assert.match(qa.segments.possession.text, /six months to three years/);
  assert.match(qa.segments.consumption.text, /six months to three years/);
  assert.match(qa.context.visitors.text, /six months to three years/);
  assert.doesNotMatch(qa.segments.possession.text, /two to five years/);
  assert.doesNotMatch(qa.segments.consumption.text, /or either/);
  assert.equal(amended.date, "2020-02-18");
  assert.match(amended.unscored, /does not move/);
  assert.equal(qa.scores.possession, 0);
  assert.equal(qa.scores.enforcement, 1);
  assert.match(ph.segments.possession.text, /300 g up to but not including 500 g/);
  assert.match(ph.segments.possession.text, /20 years and one day to life/);
  assert.match(ph.summary, /300 g of marijuana or 5 g of resin/);
  assert.match(ph.context.visitors.text, /300 g/);
  assert.equal(ph.scores.possession, 0);
  assert.equal(ph.scores.enforcement, 0);
});

test("2026 backfill records the licences, bills and delays without moving scores", () => {
  const gh = y.load(fs.readFileSync("countries/gh.yaml", "utf8"));
  const ar = y.load(fs.readFileSync("countries/ar.yaml", "utf8"));
  const us = y.load(fs.readFileSync("countries/us/index.yaml", "utf8"));
  const co = y.load(fs.readFileSync("countries/co.yaml", "utf8"));
  const licences = byId["ghana-first-cultivation-licences-2026"];
  const hemp = byId["argentina-horticultural-hemp-licences-2026"];
  const seeds = byId["argentina-medicinal-propagation-licence-2026"];
  const delay = byId["us-hemp-definition-delay-2026"];
  const bill = byId["colombia-adult-use-constitution-bill-2026"];
  const mo = byId["missouri-low-thc-genetics-variance-2026"];
  const tea = byId["eu-hemp-leaf-tea-thc-2027"];
  assert.equal(licences.date, "2026-07-31");
  assert.equal(licences.category, "hemp");
  assert.match(licences.description, /MG Adom Limited and Juliopta Limited/);
  assert.match(licences.description, /0\.3 per cent THC/);
  assert.match(licences.unscored, /stay illegal/);
  assert.match(gh.context.production.text, /31 July 2026/);
  assert.equal(gh.scores.possession, 2);
  assert.equal(gh.scores.cultivation, 1);
  assert.equal(hemp.date, "2026-10");
  assert.notEqual(hemp.date, "2026-09-03");
  assert.match(hemp.description, /30 administrative working days/);
  assert.match(hemp.unscored, /publication day/);
  assert.equal(seeds.date, "2026-06-30");
  assert.equal(seeds.category, "medical");
  assert.match(seeds.description, /1 March 2027/);
  assert.match(seeds.description, /Selling flowers/);
  assert.match(seeds.unscored, /propagation licence/);
  assert.equal(ar.scores.possession, 3);
  assert.equal(ar.scores.cultivation, 3);
  assert.match(delay.description, /11 December/);
  assert.match(delay.description, /12 November/);
  assert.match(delay.unscored, /not repealed/);
  assert.match(us.context.products.text, /passed/);
  assert.doesNotMatch(us.context.products.text, /signed/);
  assert.equal(us.scores.possession, 4);
  assert.equal(bill.category, "debate");
  assert.equal(bill.date, "2026-07-20");
  assert.equal(bill.before, undefined);
  assert.equal(co.scores.possession, 4);
  assert.equal(co.scores.access, 1);
  assert.equal(mo.date, "2026-10-21");
  assert.equal(mo.subunit, "mo");
  assert.equal(mo.before, undefined);
  assert.match(mo.description, /12 November/);
  assert.equal(tea.country, undefined);
  assert.equal(tea.date, "2027-01-01");
  assert.match(tea.description, /1 January 2027/);
  assert.match(tea.description, /40 mg\/kg/);
  assert.match(tea.unscored, /member state/);
});

test("Gandaki, Ohio gifts and Singapore resin thresholds follow the texts that were read", () => {
  const np = y.load(fs.readFileSync("countries/np.yaml", "utf8"));
  const oh = y.load(fs.readFileSync("countries/us/oh.yaml", "utf8"));
  const sg = y.load(fs.readFileSync("countries/sg.yaml", "utf8"));
  const gandaki = byId["nepal-gandaki-cannabis-law-2026"];
  const gift = byId["ohio-gift-limits-2026"];
  assert.doesNotMatch(np.context.production.text, /now licenses/);
  assert.doesNotMatch(np.segments.cultivation.text, /legalised licensed/);
  assert.doesNotMatch(np.context.medical.text, /now in Gandaki/);
  assert.match(np.segments.cultivation.text, /13 October/);
  assert.match(gandaki.description, /section 1\(2\)/);
  assert.match(gandaki.unscored, /not yet commenced/);
  assert.equal(np.scores.cultivation, 1);
  assert.equal(np.scores.access, 0);
  assert.match(oh.segments.sharing, /privately owned land/);
  assert.match(oh.segments.sharing, /15 grams of extract/);
  assert.match(oh.segments.possession, /licensed Ohio dispensary/);
  assert.equal(gift.date, "2026-03-20");
  assert.equal(gift.subunit, "oh");
  assert.equal(gift.before, undefined);
  assert.match(gift.unscored, /scores stay/);
  assert.equal(oh.scores.sharing, 5);
  assert.equal(oh.scores.possession, 5);
  assert.match(sg.summary, /200 g of cannabis resin/);
  assert.match(sg.summary, /1,000 g of cannabis mixture/);
  assert.match(sg.segments.possession.text, /330 g/);
  assert.match(sg.segments.possession.text, /5 strokes/);
  assert.match(sg.segments.consumption.text, /at least one year/);
  assert.match(sg.context.death_penalty.text, /200 g of cannabis resin/);
  assert.equal(sg.scores.possession, 0);
  assert.equal(sg.scores.enforcement, 0);
});

test("Spain, Poland, Germany, Liechtenstein and Canada follow the texts that were read", () => {
  const es = y.load(fs.readFileSync("countries/es.yaml", "utf8"));
  const pl = y.load(fs.readFileSync("countries/pl.yaml", "utf8"));
  const de = y.load(fs.readFileSync("countries/de.yaml", "utf8"));
  const li = y.load(fs.readFileSync("countries/li.yaml", "utf8"));
  const ca = y.load(fs.readFileSync("countries/ca/index.yaml", "utf8"));
  const flower = byId["germany-flower-reimbursement-ended-2026"];
  assert.equal(es.context.driving.status, "zero");
  assert.match(es.context.driving.text, /doctor's prescription/);
  assert.match(es.context.driving.text, /1,000 euros/);
  assert.match(es.context.driving.text, /six licence points/);
  assert.equal(pl.context.driving.status, "consumption");
  assert.match(pl.context.driving.text, /article 87/);
  assert.match(pl.context.driving.text, /inactive THC metabolite/);
  assert.equal(pl.scores.possession, 1);
  assert.match(de.context.medical.text, /30 July 2026/);
  assert.match(de.context.medical.text, /six-month trial/);
  assert.match(de.context.medical.text, /continue without the trial/);
  assert.equal(flower.date, "2026-07-30");
  assert.equal(flower.before, undefined);
  assert.equal(de.scores.possession, 5);
  assert.match(li.segments.possession.text, /50,000 francs/);
  assert.match(li.segments.possession.text, /six months/);
  assert.doesNotMatch(li.segments.possession.text, /one year/);
  assert.equal(li.scores.possession, 1);
  assert.doesNotMatch(ca.segments.possession.text, /licensed source/);
  assert.match(ca.segments.possession.text, /knows is illicit/);
  assert.match(ca.segments.possession.text, /grown at home/);
  assert.equal(ca.scores.possession, 6);
  assert.equal(ca.scores.cultivation, 4);
  assert.equal(ca.scores.sharing, 5);
});

test("Bulgaria's hemp permit follows the 2023 ordinance and records the statutory conflict", () => {
  const bg = y.load(fs.readFileSync("countries/bg.yaml", "utf8"));
  const permit = byId["bulgaria-hemp-permit-threshold-2023"];
  assert.match(bg.context.production.text, /below 0\.3% THC/);
  assert.match(bg.context.production.text, /below 0\.2%/);
  assert.match(bg.context.production.text, /criminal liability/);
  assert.doesNotMatch(bg.context.production.text, /less than 0\.2% THC/);
  assert.match(bg.context.planting.text, /below 0\.3% THC/);
  assert.match(bg.context.planting.text, /below 0\.2%/);
  assert.equal(permit.date, "2023-05-05");
  assert.equal(permit.before, undefined);
  assert.match(permit.description, /0\.3%/);
  assert.match(permit.description, /0\.2%/);
  assert.match(permit.unscored, /scores do not move/);
  assert.equal(bg.scores.cultivation, 0);
  assert.equal(bg.scores.access, 0);
});
