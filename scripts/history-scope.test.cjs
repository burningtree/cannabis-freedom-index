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
  assert.match(uz.segments.possession.text, /article 273/i);
  assert.doesNotMatch(uz.summary, /five to seven years/);
  assert.equal(uz.scores.possession, 2);
  assert.match(uz.segments.possession.text, /administrative article 56/);
  assert.match(uz.segments.possession.text, /fifteen days/);
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

test("Estonia's quantity line and Hong Kong's cultivation penalty follow the texts that were read", () => {
  const ee = y.load(fs.readFileSync("countries/ee.yaml", "utf8"));
  const hk = y.load(fs.readFileSync("countries/hk.yaml", "utf8"));
  const misdemeanour = byId["estonia-misdemeanour-2002"];
  assert.match(ee.summary, /ten people/);
  assert.match(ee.summary, /one to ten years/);
  assert.doesNotMatch(ee.summary, /7\.5 g/);
  assert.match(ee.segments.possession.text, /ten people/);
  assert.match(ee.segments.possession.text, /one to ten years/);
  assert.match(ee.segments.possession.text, /7\.5 grams/);
  assert.doesNotMatch(ee.segments.possession.text, /up to five years/);
  assert.doesNotMatch(ee.context.visitors.text, /up to 7\.5 g/);
  assert.equal(ee.scores.possession, 3);
  assert.equal(misdemeanour.before.possession, 1);
  assert.match(misdemeanour.description, /does not fix that quantity at 7\.5 grams/);
  // the 15-year cultivation ceiling, kept apart from manufacturing's life maximum (#44)
  assert.match(hk.segments.cultivation.text, /(15|fifteen) years/);
  assert.match(hk.segments.cultivation.text, /HK\$100,000/);
  assert.match(hk.segments.cultivation.text, /separate offence/);
  assert.doesNotMatch(hk.segments.cultivation.text, /manufacturing a dangerous drug\n\s*carries up to life/);
  assert.match(hk.context.production.text, /separate offence/);
  assert.equal(hk.scores.cultivation, 0);
});

test("Colorado gifts and household plants, and D.C. indoor growing, follow the texts that were read", () => {
  const co = y.load(fs.readFileSync("countries/us/co.yaml", "utf8"));
  const dc = y.load(fs.readFileSync("countries/us/dc.yaml", "utf8"));
  assert.match(co.segments.sharing, /1 ounce/);
  assert.match(co.segments.sharing, /petty offence/);
  assert.doesNotMatch(co.segments.sharing, /up to 2 oz without payment are legal/);
  assert.match(co.segments.cultivation, /twelve/);
  assert.match(co.segments.cultivation, /not by itself a felony/);
  assert.match(co.segments.cultivation, /\$1,000/);
  assert.doesNotMatch(co.segments.cultivation, /More than six is a felony/);
  assert.equal(co.scores.sharing, 5);
  assert.equal(co.scores.cultivation, 4);
  assert.match(dc.summary, /principal/);
  assert.match(dc.segments.cultivation, /interior/);
  assert.match(dc.segments.cultivation, /12 plants/);
  assert.match(dc.segments.cultivation, /six of/);
  assert.doesNotMatch(dc.segments.cultivation, /^Six plants per adult, three mature\.$/);
  assert.equal(dc.scores.cultivation, 4);
  assert.equal(dc.scores.sharing, 5);
});

test("Canada's seed gifts, Nevada's 2024 limits, and Washington's medical grow follow the texts that were read", () => {
  const ca = y.load(fs.readFileSync("countries/ca/index.yaml", "utf8"));
  const nv = y.load(fs.readFileSync("countries/us/nv.yaml", "utf8"));
  const wa = y.load(fs.readFileSync("countries/us/wa.yaml", "utf8"));
  const nevada = byId["nevada-adult-limits-raised-2024"];
  assert.equal(ca.context.planting.seeds_trade, "regulated-sale-plus-gifts");
  assert.equal(ca.context.planting.clones_trade, "regulated-sale-plus-gifts");
  assert.match(ca.context.planting.text, /30 cannabis seeds/);
  assert.match(ca.context.planting.text, /four plants that are not budding or flowering/);
  assert.match(ca.context.planting.text, /Selling cannabis without authorisation is prohibited/);
  assert.match(ca.segments.cultivation.text, /does not know is illicit/);
  assert.match(ca.segments.cultivation.text, /Manitoba/);
  assert.equal(ca.scores.possession, 6);
  assert.equal(ca.scores.cultivation, 4);
  assert.equal(ca.scores.sharing, 5);
  assert.match(nv.segments.sharing, /2\.5 ounces/);
  assert.match(nv.segments.sharing, /one-fourth of an ounce/);
  assert.match(nv.segments.sharing, /not advertised or promoted/);
  assert.doesNotMatch(nv.segments.sharing, /1 oz of flower/);
  assert.match(nv.segments.cultivation, /no more than twelve/);
  assert.match(nv.segments.cultivation, /\$600/);
  assert.doesNotMatch(nv.segments.cultivation, /Twelve plants or more is a felony/);
  assert.equal(nv.scores.sharing, 5);
  assert.equal(nv.scores.cultivation, 2);
  assert.equal(nevada.date, "2024-01-01");
  assert.equal(nevada.before, undefined);
  assert.equal(nevada.subunit, "nv");
  assert.match(nevada.unscored, /national score does not move/);
  assert.match(wa.segments.cultivation, /four plants/);
  assert.match(wa.segments.cultivation, /not in the medical cannabis database/);
  assert.match(wa.segments.cultivation, /Schedule I/);
  assert.doesNotMatch(wa.segments.cultivation, /registered medical patient/);
  assert.match(wa.segments.sharing, /one-half ounce/);
  assert.match(wa.segments.sharing, /24-hour period/);
  assert.match(wa.segments.sharing, /original retailer packaging/);
  assert.doesNotMatch(wa.segments.possession, /24-hour mandatory/);
  assert.match(wa.segments.possession, /gross misdemeanour/);
  assert.equal(wa.scores.possession, 5);
  assert.equal(wa.scores.cultivation, 1);
  assert.equal(wa.scores.sharing, 4);
});

test("Maryland through Oklahoma state profiles follow the texts that were read", () => {
  const load = (id) => y.load(fs.readFileSync(`countries/us/${id}.yaml`, "utf8"));
  const md = load("md");
  const vt = load("vt");
  const or = load("or");
  const nm = load("nm");
  const me = load("me");
  const ny = load("ny");
  const ri = load("ri");
  const ct = load("ct");
  const ok = load("ok");
  assert.match(md.segments.cultivation, /up to four/);
  assert.match(md.segments.cultivation, /\$5,000/);
  assert.doesNotMatch(md.segments.cultivation, /More is a misdemeanour/);
  assert.equal(md.scores.cultivation, 3);
  assert.match(vt.segments.sharing, /1 ounce/);
  assert.match(vt.segments.sharing, /not advertised/);
  assert.doesNotMatch(vt.segments.sharing, /tolerated/);
  assert.doesNotMatch(vt.segments.possession, /felony with up to three years/);
  assert.match(vt.segments.possession, /civil-penalty/);
  assert.equal(vt.scores.sharing, 5);
  assert.match(or.segments.sharing, /1 ounce of usable marijuana/);
  assert.match(or.segments.sharing, /Class B misdemeanour/);
  assert.doesNotMatch(or.segments.sharing, /within the possession limits/);
  assert.equal(or.scores.sharing, 5);
  assert.match(nm.segments.cultivation, /six immature/);
  assert.match(nm.segments.cultivation, /\$50/);
  assert.doesNotMatch(nm.segments.cultivation, /More is a felony/);
  assert.equal(nm.scores.cultivation, 4);
  assert.match(me.segments.cultivation, /six mature/);
  assert.match(me.segments.cultivation, /unlimited seedlings/);
  assert.doesNotMatch(me.summary, /three mature/);
  assert.equal(me.scores.cultivation, 4);
  assert.match(ny.segments.cultivation, /six mature and six immature/);
  assert.match(ny.segments.possession, /\$125/);
  assert.doesNotMatch(ny.segments.possession, /\$150/);
  assert.equal(ny.scores.cultivation, 4);
  assert.match(ri.segments.possession, /\$150 civil/);
  assert.doesNotMatch(ri.segments.possession, /More than 1 oz is a misdemeanour/);
  assert.equal(ri.scores.possession, 6);
  assert.match(ct.segments.possession, /do not count/);
  assert.match(ct.segments.possession, /\$100 fine/);
  assert.match(ct.segments.possession, /8 ounces/);
  assert.equal(ct.scores.possession, 6);
  assert.match(ok.segments.sharing, /less than 3 grams/);
  assert.match(ok.segments.sharing, /\$400/);
  assert.doesNotMatch(ok.segments.sharing, /two years to life/);
  assert.equal(ok.scores.sharing, 1);
});

test("Romania's drug-driving ruling, Uruguay's possession exemption and Jamaica's visitor permit follow the texts that were read", () => {
  const ro = y.load(fs.readFileSync("countries/ro.yaml", "utf8"));
  const uy = y.load(fs.readFileSync("countries/uy.yaml", "utf8"));
  const jm = y.load(fs.readFileSync("countries/jm.yaml", "utf8"));
  const ruling = byId["romania-drug-driving-capacity-2025"];
  assert.equal(ro.context.driving.status, "capacity");
  assert.match(ro.context.driving.text, /capable of affecting/);
  assert.match(ro.context.driving.text, /one to five years/);
  assert.match(ro.context.driving.text, /two to seven years/);
  assert.doesNotMatch(ro.context.driving.text, /offence is committed if a controlled/);
  assert.equal(ro.scores.possession, 1);
  assert.equal(ruling.date, "2025-01-28");
  assert.equal(ruling.before, undefined);
  assert.equal(ruling.category, "easing");
  assert.match(ruling.unscored, /possession score does not move/);
  assert.match(uy.segments.possession.text, /40 g/);
  assert.match(uy.segments.possession.text, /pharmacy, a club or a/);
  assert.doesNotMatch(uy.segments.possession.text, /only 'legal'/);
  assert.match(uy.segments.enforcement.text, /whether or not/);
  assert.equal(uy.scores.possession, 6);
  assert.match(jm.segments.access.text, /voluntary declaration/);
  assert.match(jm.context.visitors.text, /Ministry of Health/);
  assert.doesNotMatch(jm.segments.access.text, /prescription from home can buy a permit/);
  assert.equal(jm.context.visitors.status, "open");
  assert.equal(jm.scores.access, 4);
});

test("Ethiopia, Uruguay gifts, Trinidad's uncommenced Act and Brazil's joint-use offence follow the texts that were read", () => {
  const et = y.load(fs.readFileSync("countries/et.yaml", "utf8"));
  const uy = y.load(fs.readFileSync("countries/uy.yaml", "utf8"));
  const tt = y.load(fs.readFileSync("countries/tt.yaml", "utf8"));
  const br = y.load(fs.readFileSync("countries/br.yaml", "utf8"));
  const act = byId["trinidad-cannabis-control-act-2022"];
  assert.match(et.segments.possession.text, /up to seven years/);
  assert.match(et.segments.possession.text, /50,000/);
  assert.match(et.segments.cultivation.text, /not less than five years/);
  assert.doesNotMatch(et.summary, /six months to five years/);
  assert.doesNotMatch(et.segments.enforcement.text, /five to ten/);
  assert.doesNotMatch(et.segments.cultivation.text, /fifteen/);
  assert.equal(et.scores.possession, 1);
  assert.equal(et.scores.enforcement, 1);
  assert.match(uy.segments.sharing.text, /not penalised/);
  assert.match(uy.segments.sharing.text, /20\.9%/);
  assert.doesNotMatch(uy.segments.sharing.text, /no general right/);
  assert.equal(uy.scores.sharing, 4);
  assert.equal(tt.medical, "limited");
  assert.match(tt.segments.access.text, /awaiting proclamation/);
  assert.doesNotMatch(tt.segments.access.text, /never became law/);
  assert.equal(tt.scores.access, 0);
  assert.equal(act.date, "2022-06-17");
  assert.equal(act.category, "other");
  assert.equal(act.before, undefined);
  assert.match(br.segments.sharing.text, /six months to one year/);
  assert.match(br.segments.sharing.text, /five to fifteen years/);
  assert.doesNotMatch(br.segments.sharing.text, /minimum of five years/);
  assert.equal(br.scores.sharing, 1);
});

test("Zambia's Cannabis Act stays uncommenced and the hemp Act starts on 3 January 2025", () => {
  const zm = y.load(fs.readFileSync("countries/zm.yaml", "utf8"));
  const enacted = byId["zambia-cannabis-act-2021"];
  const hemp = byId["zambia-industrial-hemp-commencement-2025"];
  const controlled = byId["zambia-controlled-substances-act-2026"];
  assert.equal(zm.medical, "limited");
  assert.equal(zm.scores.access, 0);
  assert.equal(zm.scores.possession, 0);
  assert.match(zm.summary, /has not come into force/);
  assert.match(zm.summary, /3 January 2025/);
  assert.match(zm.context.production.text, /has not come into force/);
  assert.match(zm.context.planting.text, /in force since 3 January 2025/);
  assert.doesNotMatch(zm.context.planting.text, /only on a date the minister appoints/);
  assert.doesNotMatch(zm.segments.cultivation.text, /offence under the Cannabis Act/);
  assert.match(zm.segments.cultivation.text, /ten years/);
  assert.match(zm.segments.possession.text, /1,200 penalty units/);
  assert.equal(enacted.date, "2021-05-20");
  assert.equal(enacted.before, undefined);
  assert.match(enacted.unscored, /scores do not move/);
  assert.equal(hemp.date, "2025-01-03");
  assert.equal(hemp.category, "hemp");
  assert.equal(hemp.before, undefined);
  assert.equal(controlled.date, "2026-01-16");
  assert.equal(controlled.category, "other");
  assert.equal(controlled.before, undefined);
});

test("El Salvador's own-use ruling, Manitoba's home grow and Portugal's influence report follow the texts that were read", () => {
  const sv = y.load(fs.readFileSync("countries/sv.yaml", "utf8"));
  const ca = y.load(fs.readFileSync("countries/ca/index.yaml", "utf8"));
  const pt = y.load(fs.readFileSync("countries/pt.yaml", "utf8"));
  const ruling = byId["el-salvador-personal-use-possession-2012"];
  const grow = byId["canada-manitoba-home-grow-2025"];
  const influence = byId["portugal-drug-influence-report-2024"];
  assert.match(sv.segments.possession.text, /outside criminal/);
  assert.match(sv.segments.possession.text, /less than 2 g/);
  assert.doesNotMatch(sv.summary, /Even under 2 g carries one to three years/);
  assert.equal(sv.scores.possession, 0);
  assert.equal(sv.scores.enforcement, 1);
  assert.equal(ruling.date, "2012-11-16");
  assert.equal(ruling.before, undefined);
  assert.match(ruling.unscored, /possession score stays/);
  assert.match(ca.segments.cultivation.text, /1 May 2025/);
  assert.match(ca.segments.cultivation.text, /indoors/);
  assert.doesNotMatch(ca.segments.cultivation.text, /Manitoba prohibit/);
  assert.equal(ca.scores.cultivation, 4);
  assert.equal(grow.date, "2025-05-01");
  assert.equal(grow.before, undefined);
  assert.match(grow.unscored, /national cultivation score does not move/);
  assert.equal(pt.context.driving.status, "impairment");
  assert.match(pt.context.driving.text, /medical or expert report/);
  assert.match(pt.context.driving.text, /0\.8 ng\/mL/);
  assert.doesNotMatch(pt.context.driving.text, /offence is committed if/);
  assert.equal(influence.date, "2024-07-15");
  assert.equal(influence.category, "other");
  assert.equal(influence.before, undefined);
});

test("South Africa's child-use order and uncommenced gift rule follow the texts that were read", () => {
  const za = y.load(fs.readFileSync("countries/za.yaml", "utf8"));
  const child = byId["south-africa-child-cannabis-2022"];
  assert.match(za.segments.enforcement.text, /no child may be arrested, prosecuted or diverted/);
  assert.doesNotMatch(za.segments.enforcement.text, /diverted rather than prosecuted/);
  assert.match(za.context.planting.text, /has not come into force/);
  assert.doesNotMatch(za.context.planting.text, /Adults may give cannabis to, or receive it from/);
  assert.equal(za.context.planting.seeds, "grey");
  assert.equal(za.scores.sharing, 3);
  assert.equal(za.scores.possession, 6);
  assert.equal(child.date, "2022-09-29");
  assert.equal(child.before, undefined);
  assert.match(child.unscored, /adult scores do not move/);
});

test("Latvia's drug-driving penalties and the UAE hemp law follow the texts that were read", () => {
  const lv = y.load(fs.readFileSync("countries/lv.yaml", "utf8"));
  const ae = y.load(fs.readFileSync("countries/ae.yaml", "utf8"));
  const hemp = byId["uae-industrial-hemp-2026"];
  assert.equal(lv.context.driving.status, "impairment");
  assert.match(lv.context.driving.text, /up to one year/);
  assert.doesNotMatch(lv.context.driving.text, /administrative arrest/);
  assert.doesNotMatch(lv.context.driving.text, /1,200 to 1,400/);
  assert.equal(lv.scores.possession, 2);
  assert.equal(ae.medical, "limited");
  assert.equal(ae.context.planting.seeds, "licensed");
  assert.equal(ae.context.planting.seeds_trade, "regulated");
  assert.match(ae.context.production.text, /0\.3%/);
  assert.equal(ae.scores.access, 0);
  assert.equal(hemp.date, "2026-01-01");
  assert.equal(hemp.category, "hemp");
  assert.equal(hemp.before, undefined);
});

test("Colorado hospitality sales and Nevada's 2021 lounge law replace the old clubs sentences", () => {
  const us = y.load(fs.readFileSync("countries/us/index.yaml", "utf8"));
  const lounges = byId["nevada-consumption-lounge-regulations-2022"];
  assert.match(us.context.clubs.text, /44-10-610/);
  assert.match(us.context.clubs.text, /Assembly Bill 341 of 2021/);
  assert.doesNotMatch(us.context.clubs.text, /no sales on site/);
  assert.doesNotMatch(us.context.clubs.text, /since a 2017 law/);
  assert.equal(us.context.clubs.status, "regulated");
  assert.equal(us.scores.access, 5);
  assert.equal(lounges.date, "2022-06-28");
  assert.equal(lounges.subunit, "nv");
  assert.equal(lounges.before, undefined);
});

test("Myanmar's 2025 amendment, Hungary's THC threshold and Kenya's fine alternative follow the texts that were read", () => {
  const mm = y.load(fs.readFileSync("countries/mm.yaml", "utf8"));
  const hu = y.load(fs.readFileSync("countries/hu.yaml", "utf8"));
  const ke = y.load(fs.readFileSync("countries/ke.yaml", "utf8"));
  const amend = byId["myanmar-narcotics-amendment-2025"];
  assert.match(mm.segments.consumption.text, /three months/);
  assert.match(mm.segments.consumption.text, /45 to 90 hours/);
  assert.match(mm.segments.possession.text, /more than 100 grams/);
  assert.equal(mm.scores.consumption, 2);
  assert.equal(amend.date, "2025-12-31");
  assert.equal(amend.before, undefined);
  assert.match(hu.segments.possession.text, /6 grams of total THC/);
  assert.doesNotMatch(hu.segments.possession.text, /1 g of THC/);
  assert.match(hu.segments.cultivation.text, /five plants/);
  assert.equal(hu.scores.possession, 1);
  assert.match(ke.summary, /or both/);
  assert.match(ke.context.visitors.text, /or both/);
  assert.doesNotMatch(ke.summary, /thirty years from a single gram/);
  assert.equal(ke.scores.possession, 1);
});

test("British Columbia's home cap, Victoria's fine and the Atlantic grow rules follow the texts that were read", () => {
  const bc = y.load(fs.readFileSync("countries/ca/bc.yaml", "utf8"));
  const nl = y.load(fs.readFileSync("countries/ca/nl.yaml", "utf8"));
  const nb = y.load(fs.readFileSync("countries/ca/nb.yaml", "utf8"));
  const vic = y.load(fs.readFileSync("countries/au/vic.yaml", "utf8"));
  const ca = y.load(fs.readFileSync("countries/ca/index.yaml", "utf8"));
  const indoor = byId["newfoundland-indoor-homegrow-2018"];
  assert.match(bc.segments.possession, /1,000 g/);
  assert.doesNotMatch(bc.segments.possession, /no provincial cap/);
  assert.equal(bc.scores.possession, 6);
  assert.match(vic.segments.possession, /five penalty units/);
  assert.doesNotMatch(vic.segments.possession, /two years/);
  assert.equal(vic.scores.possession, 2);
  assert.match(nl.segments.cultivation, /yard itself is excluded/);
  assert.match(nb.segments.cultivation, /1\.52 metres/);
  assert.equal(nl.scores.cultivation, 4);
  assert.equal(nb.scores.cultivation, 4);
  assert.match(ca.segments.cultivation.text, /1\.52 metres/);
  assert.equal(indoor.date, "2018-10-17");
  assert.equal(indoor.subunit, "nl");
  assert.equal(indoor.before, undefined);
});

test("Manitoba's indoor grow rule, Nunavut's 150 g limit and South Australia's expiation fees follow the texts that were read", () => {
  const mb = y.load(fs.readFileSync("countries/ca/mb.yaml", "utf8"));
  const nu = y.load(fs.readFileSync("countries/ca/nu.yaml", "utf8"));
  const sa = y.load(fs.readFileSync("countries/au/sa.yaml", "utf8"));
  const ca = y.load(fs.readFileSync("countries/ca/index.yaml", "utf8"));
  const cap = byId["nunavut-possession-limit-2020"];
  assert.match(mb.segments.cultivation, /securely locked/);
  assert.match(mb.segments.cultivation, /indoors/);
  assert.equal(mb.scores.cultivation, 4);
  assert.match(nu.segments.possession, /150 g/);
  assert.doesNotMatch(nu.segments.possession, /no provincial cap/);
  assert.match(nu.segments.possession, /not the household/);
  assert.equal(nu.scores.possession, 6);
  assert.match(sa.segments.possession, /\$250/);
  assert.match(sa.segments.possession, /\$400/);
  assert.doesNotMatch(sa.segments.possession, /\$150/);
  assert.match(sa.segments.cultivation, /\$400/);
  assert.equal(sa.scores.possession, 3);
  assert.equal(sa.scores.enforcement, 4);
  assert.match(ca.segments.possession.text, /150 g of dried cannabis/);
  assert.equal(cap.date, "2020-06-01");
  assert.equal(cap.subunit, "nu");
  assert.equal(cap.before, undefined);
});

test("Prince Edward Island's grow rules, Western Australia's intervention notice, Tasmania's penalty unit and the ACT access offences follow the texts that were read", () => {
  const pe = y.load(fs.readFileSync("countries/ca/pe.yaml", "utf8"));
  const wa = y.load(fs.readFileSync("countries/au/wa.yaml", "utf8"));
  const tas = y.load(fs.readFileSync("countries/au/tas.yaml", "utf8"));
  const act = y.load(fs.readFileSync("countries/au/act.yaml", "utf8"));
  assert.match(pe.segments.cultivation, /1\.52 metres/);
  assert.match(pe.segments.cultivation, /written permission/);
  assert.equal(pe.scores.cultivation, 4);
  assert.match(wa.segments.possession, /may issue/);
  assert.doesNotMatch(wa.summary, /leads to a one-off/);
  assert.equal(wa.scores.possession, 2);
  assert.equal(wa.scores.enforcement, 3);
  assert.match(tas.segments.possession, /50 penalty units/);
  assert.match(tas.segments.possession, /\$10,650/);
  assert.doesNotMatch(tas.segments.possession, /\$7,950/);
  assert.equal(tas.scores.possession, 2);
  assert.match(act.segments.cultivation, /public can/);
  assert.match(act.segments.possession, /children's reach/);
  assert.doesNotMatch(act.segments.enforcement, /Nothing within the limits/);
  assert.equal(act.scores.enforcement, 6);
  assert.equal(act.scores.cultivation, 3);
});

test("New Brunswick retail and consumption, Northwest Territories vendors and the NSW caution threshold follow the texts that were read", () => {
  const nb = y.load(fs.readFileSync("countries/ca/nb.yaml", "utf8"));
  const nt = y.load(fs.readFileSync("countries/ca/nt.yaml", "utf8"));
  const nsw = y.load(fs.readFileSync("countries/au/nsw.yaml", "utf8"));
  assert.match(nb.segments.access, /private retailers/);
  assert.match(nb.segments.access, /farmgate/);
  assert.doesNotMatch(nb.segments.access, /Government-operated/);
  assert.match(nb.segments.consumption, /campsite/);
  assert.match(nb.segments.consumption, /backyard/);
  assert.doesNotMatch(nb.segments.consumption, /residences only/);
  assert.equal(nb.scores.access, 6);
  assert.equal(nb.scores.consumption, 3);
  assert.match(nt.segments.access, /private shops/);
  assert.doesNotMatch(nt.summary, /Government-run/);
  assert.match(nt.segments.access, /store is operating/);
  assert.equal(nt.scores.access, 6);
  assert.match(nsw.segments.possession, /30 g of dried cannabis/);
  assert.doesNotMatch(nsw.summary, /15 g/);
  assert.doesNotMatch(nsw.segments.possession, /\$2,200/);
  assert.match(nsw.segments.possession, /20 penalty units/);
  assert.equal(nsw.scores.possession, 2);
  assert.equal(nsw.scores.enforcement, 3);
});

test("Nunavut housing, Atlantic and Yukon consumption places, and Queensland diversion limits follow the texts that were read", () => {
  const nu = y.load(fs.readFileSync("countries/ca/nu.yaml", "utf8"));
  const nl = y.load(fs.readFileSync("countries/ca/nl.yaml", "utf8"));
  const yt = y.load(fs.readFileSync("countries/ca/yt.yaml", "utf8"));
  const qld = y.load(fs.readFileSync("countries/au/qld.yaml", "utf8"));
  const housing = byId["nunavut-public-housing-smoking-2023"];
  const diversion = byId["queensland-drug-diversion-2024"];
  assert.match(nu.segments.consumption, /publicly funded housing provider/);
  assert.match(nu.segments.consumption, /lit or heated/);
  assert.doesNotMatch(nu.segments.consumption, /residences only/);
  assert.match(nu.segments.enforcement, /\$2,000/);
  assert.equal(nu.scores.consumption, 3);
  assert.equal(nu.scores.enforcement, 6);
  assert.match(nl.segments.consumption, /yard attached/);
  assert.match(nl.segments.consumption, /rented campsite/);
  assert.doesNotMatch(nl.summary, /only in private residences/);
  assert.equal(nl.scores.consumption, 3);
  assert.match(yt.segments.consumption, /registered campsite/);
  assert.match(yt.segments.consumption, /adjoining/);
  assert.doesNotMatch(yt.segments.consumption, /residences only/);
  assert.equal(yt.scores.consumption, 3);
  assert.match(qld.segments.possession, /not more than 50 g/);
  assert.match(qld.segments.possession, /three lifetime/);
  assert.doesNotMatch(qld.summary, /must offer a warning or a diversion programme for small amounts/);
  assert.doesNotMatch(qld.segments.possession, /under 50 g/);
  assert.equal(qld.scores.possession, 2);
  assert.equal(qld.scores.enforcement, 4);
  assert.equal(housing.date, "2023-05-31");
  assert.equal(housing.subunit, "nu");
  assert.equal(housing.before, undefined);
  assert.equal(housing.category, "tightening");
  assert.equal(diversion.date, "2024-05-03");
  assert.equal(diversion.subunit, "qld");
  assert.equal(diversion.before, undefined);
});

test("Maldives quantity presumptions, Kuwait decree-law 159, and Japan cultivation follow the texts that were read", () => {
  const mv = y.load(fs.readFileSync("countries/mv.yaml", "utf8"));
  const kw = y.load(fs.readFileSync("countries/kw.yaml", "utf8"));
  const jp = y.load(fs.readFileSync("countries/jp.yaml", "utf8"));
  const kuwait = byId["kuwait-drug-law-2025"];
  assert.match(mv.segments.possession.text, /not drug-dependent/);
  assert.match(mv.segments.possession.text, /fifteen years/);
  assert.match(mv.segments.possession.text, /three years/);
  assert.doesNotMatch(mv.segments.possession.text, /user threshold/);
  assert.doesNotMatch(mv.summary, /below the user threshold/);
  assert.equal(mv.scores.possession, 0);
  assert.match(kw.segments.possession.text, /159 of 2025/);
  assert.match(kw.segments.possession.text, /five years/);
  assert.match(kw.segments.possession.text, /KD ?5,000|5,000 dinars/);
  assert.doesNotMatch(kw.segments.possession.text, /no\. 59/);
  assert.doesNotMatch(kw.summary, /were not found/);
  assert.equal(kw.scores.possession, 0);
  assert.equal(kuwait.date, "2025-12-15");
  assert.match(kuwait.description, /159 of 2025/);
  assert.doesNotMatch(kuwait.description, /no\. 59/);
  assert.match(jp.segments.cultivation.text, /not less than one year and not more than ten years/);
  assert.doesNotMatch(jp.segments.cultivation.text, /seven years/);
  assert.match(jp.context.planting.text, /up to five years/);
  assert.equal(jp.scores.cultivation, 0);
});

test("Vietnam sale brackets, South Sudan's cannabis exclusion, and Bangladesh section 36A follow the texts that were read", () => {
  const vn = y.load(fs.readFileSync("countries/vn.yaml", "utf8"));
  const ss = y.load(fs.readFileSync("countries/ss.yaml", "utf8"));
  const bd = y.load(fs.readFileSync("countries/bd.yaml", "utf8"));
  const sale = byId["vietnam-sale-possession-penalties-2025"];
  const digital = byId["bangladesh-digital-drug-offence-2026"];
  assert.match(vn.segments.possession.text, /three to five years/);
  assert.doesNotMatch(vn.segments.possession.text, /one to five years/);
  assert.match(vn.segments.sharing.text, /30 kg/);
  assert.match(vn.segments.sharing.text, /150 kg/);
  assert.doesNotMatch(vn.segments.sharing.text, /death penalty applies from 5 kg/);
  assert.equal(vn.recreational, "death");
  assert.equal(vn.scores.possession, 1);
  assert.equal(sale.date, "2025-07-01");
  assert.equal(sale.category, "other");
  assert.match(ss.segments.sharing.text, /other than cannabis/);
  assert.match(ss.segments.sharing.text, /fourteen years/);
  assert.doesNotMatch(ss.summary, /life or death/);
  assert.equal(ss.recreational, "illegal");
  assert.equal(ss.scores.consumption, 0);
  assert.equal(ss.scores.sharing, 0);
  assert.match(bd.segments.sharing.text, /Section 36A/);
  assert.match(bd.segments.sharing.text, /2 million taka/);
  assert.match(bd.context.death_penalty.text, /not the penalty for ordinary possession/);
  assert.equal(bd.recreational, "death");
  assert.equal(bd.scores.possession, 0);
  assert.equal(digital.date, "2026-07-16");
  assert.equal(digital.category, "death");
  assert.equal(digital.before, undefined);
  assert.ok(digital.unscored);
});
