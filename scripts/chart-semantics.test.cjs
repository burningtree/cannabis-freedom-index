const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const yaml = require('js-yaml');
const semantics = import('../src/lib/chart-semantics.js');

test('first restriction statistics exclude estimates from their denominator', async () => {
  const { firstRestrictionSample } = await semantics;
  const sample = firstRestrictionSample([{ ch: { date: '1921' } }, { ch: { date: '1937' } }, { ch: { date: '1925', estimate: true } }]);
  assert.equal(sample.dated.length, 2);
  assert.equal(sample.undated, 1);
  assert.deepEqual(sample.dated.map((x) => x.year), [1921, 1937]);
  const page = fs.readFileSync('src/pages/charts.astro', 'utf8');
  assert.match(page, /Among \{dated.length\} countries with dated first restrictions/);
  assert.match(page, /Only former colonies with a dated first restriction are counted/);
});

test('history topic counts keep medical, enforcement and legal-direction topics separate', async () => {
  const { topicCounts, HISTORY_TOPICS } = await semantics;
  const fixture = ['medical', 'hemp', 'enforcement', 'easing', 'tightening'].map((category) => ({ category, date: '2026' }));
  fixture.push({ category: 'ban', date: '1925', estimate: true });
  const counts = topicCounts(fixture, [1920, 2020]);
  const count = (id) => counts[HISTORY_TOPICS.findIndex((g) => g.id === id)];
  assert.deepEqual(count('medical'), [0, 2]);
  assert.deepEqual(count('enforcement'), [0, 1]);
  assert.deepEqual(count('easing'), [0, 1]);
  assert.deepEqual(count('tightening'), [0, 1]);
  assert.doesNotMatch(fs.readFileSync('src/pages/charts.astro', 'utf8'), /easing outweighs tightening|easeNow|tightNow/);
});

test('development links match the field actually mapped', async () => {
  const { DEVELOPMENT_MEASURES } = await semantics;
  const datasets = yaml.load(fs.readFileSync('datasets/datasets.yaml', 'utf8'));
  const development = Array.isArray(datasets) ? datasets.find((d) => d.id === 'development') : datasets.development;
  for (const measure of DEVELOPMENT_MEASURES) {
    if (measure.href) {
      assert.equal(measure.field, development.map.field);
      assert.equal(measure.href, `map/${development.map.slug}/`);
    } else assert.notEqual(measure.field, 'internet');
  }
  assert.equal(DEVELOPMENT_MEASURES.filter((m) => m.href).length, 1);
});

test('chart claims match categorical religion data and observational price data', () => {
  const page = fs.readFileSync('src/pages/charts.astro', 'utf8');
  assert.doesNotMatch(page, /Muslim.majority|Christian majority|does not make cannabis dearer|have no majority faith/);
  assert.match(page, /Muslims are the largest group/);
  assert.match(page, /Across \{priced.length\} countries, cannabis price and the score show/);
});

const csv = (file) => {
  const [head, ...lines] = fs.readFileSync(`datasets/${file}`, 'utf8').trim().split(/\r?\n/).map((r) => r.split(','));
  return lines.map((r) => Object.fromEntries(head.map((h, i) => [h, h === 'country' ? r[i] : r[i] === '' ? null : +r[i]])));
};

test('affordability uses an actual common price/wage year, including stale-price countries (#136)', async () => {
  const { matchedPriceWage } = await semantics;
  const prices = csv('euda-cannabis-prices.csv'), wages = csv('eurostat-minimum-wages.csv');
  let n = 0;
  for (const id of new Set(prices.map((r) => r.country))) {
    const pair = matchedPriceWage(prices.filter((r) => r.country === id), wages.filter((r) => r.country === id));
    if (pair) { n++; assert.equal(pair.price.year, pair.wage.year); }
    if (['lv', 'ie', 'lt'].includes(id) && pair) assert.ok(pair.wage.year < 2026);
  }
  assert.ok(n > 10);
  assert.equal(matchedPriceWage([{ year: 2018, herb_eur: 7 }], [{ year: 2026, monthly_eur: 780 }]), undefined);
});

test('THC trend holds the endpoint cohort constant and omits incomplete years (#136)', async () => {
  const { matchedThcPanel } = await semantics;
  const prices = csv('euda-cannabis-prices.csv'), potency = csv('euda-cannabis-potency.csv');
  const years = Array.from({ length: 23 }, (_, i) => 2002 + i).map((year) => ({ year, rows: prices.filter((p) => p.year === year && p.herb_eur > 0).flatMap((p) => {
    const t = potency.find((t) => t.country === p.country && t.year === year && t.herb_thc > 0);
    return t ? [{ c: { id: p.country }, mg: t.herb_thc * 10 / p.herb_eur }] : [];
  }) }));
  assert.equal(years[0].rows.length, 9);
  assert.equal(years.at(-1).rows.length, 16);
  const panel = matchedThcPanel(years);
  assert.deepEqual([...panel.cohort].sort(), ['es', 'nl', 'pt', 'tr']);
  assert.ok(panel.years.length > 2);
  for (const y of panel.years) assert.deepEqual(y.rows.map((r) => r.c.id).sort(), [...panel.cohort].sort());
});

test('police comparisons are within country and treatment stocks are excluded (#136)', async () => {
  const { policeTrend, annualTreatment } = await semantics;
  assert.deepEqual(policeTrend([{ year: 2023, offences: 100 }, { year: 2024, offences: 150 }]).change, 50);
  assert.equal(policeTrend([{ year: 2024, offences: 150 }]), null);
  assert.equal(annualTreatment({ id: 'HR', datasets: { treatment: { cannabis: 474 } } }), null);
  const page = fs.readFileSync('src/pages/charts.astro', 'utf8');
  assert.doesNotMatch(page, /punishSpread|punishMore|Treats more than it punishes|read the order, not the decimals|its people looked it up/);
  assert.match(page, /not geolocated/);
  assert.match(page, /w\.r\.served/);
  assert.match(page, /w\.r\.cities/);
  assert.match(page, /w\.r\.year/);
  assert.match(page, /Croatia is excluded/);
});

test('survey labels preserve child-inclusive age bands without adult claims (#183)', async () => {
  const { useAges, useShareLabel, USE_COMPARISON_NOTE } = await import('../src/lib/use-labels.js');
  const text = fs.readFileSync('datasets/unodc-cannabis-use.csv', 'utf8').trim().split(/\r?\n/);
  const header = text.shift().split(',');
  const rows = text.map((line) => Object.fromEntries(line.split(',').map((v, i) => [header[i], v])));
  for (const [country, ages, prevalence] of [['bd', '7+', '3.1'], ['in', '10–75', '2.83'], ['au', '14+', '11.5'], ['co', '12–65', '2.68']]) {
    const row = rows.filter((r) => r.country === country).at(-1);
    assert.equal(useAges(row), ages);
    assert.equal(row.prevalence, prevalence);
    assert.equal(useShareLabel(row), `${prevalence}% of people aged ${ages}`);
    assert.doesNotMatch(useShareLabel(row), /adult/i);
  }
  assert.match(useAges({}), /assumed/);
  assert.match(USE_COMPARISON_NOTE, /not age-standardised/);
  const defs = yaml.load(fs.readFileSync('datasets/datasets.yaml', 'utf8'));
  const use = defs.find((d) => d.id === 'cannabis_use');
  assert.doesNotMatch(use.profile.headline + use.about + use.fields.prevalence.about, /of adults/i);
  const charts = fs.readFileSync('src/pages/charts.astro', 'utf8');
  assert.doesNotMatch(charts, /share of adults who used cannabis|Past-year use among adults|Share of adults<|Adults who use cannabis/);
  assert.match(charts, /useAges\(c.use\)/);
  assert.match(charts, /USE_COMPARISON_NOTE/);
});

test('compact prevalence cells and profiles keep age and sampling detail in tooltips (#183)', () => {
  const home = fs.readFileSync('src/components/HomePage.astro', 'utf8');
  const share = home.match(/<td[^>]*data-col="share"[^]*?<\/td>/)[0];
  assert.match(share, /title=\{useNote\(c\)\}/);
  assert.doesNotMatch(share, /<small>|useAges/);
  assert.match(home, /useShareLabel\(c.use\)/);
  assert.match(home, /useDetail\(c\).*USE_COMPARISON_NOTE/);
  const profile = fs.readFileSync('src/components/CountryArticle.astro', 'utf8');
  assert.match(profile, /<dt>Past-year share<\/dt>/);
  assert.match(profile, /<SourceTip><span>Past-year cannabis use among people aged \{useAges\(use\)\}/);
  assert.doesNotMatch(profile, /<p>\{USE_COMPARISON_NOTE\}<\/p>/);
});

test('sentinel observations stay in history but cannot replace country comparison prices (#184)', async () => {
  const { latestComparablePrices } = await import('../src/lib/price-selection.js');
  const observations = yaml.load(fs.readFileSync('prices.yaml', 'utf8'));
  const australian = observations.filter((p) => p.country === 'au' && p.market === 'street');
  const idrs = australian.find((p) => p.id === 'au-street-2026');
  assert.equal(idrs.price, 20);
  assert.equal(idrs.usd, 13.88);
  assert.equal(idrs.comparison, false);
  assert.match(idrs.note, /sentinel sample.*people who regularly inject illicit drugs/s);
  assert.match(idrs.note, /capital cities.*Not a representative national street price/s);
  assert.equal(latestComparablePrices(australian).street, undefined);
  const older = { market: 'street', date: '2025', usd: 10 };
  const medical = { market: 'medical', usd: 9 };
  const sentinel = { market: 'street', date: '2026', usd: 20, comparison: false };
  assert.deepEqual(latestComparablePrices([sentinel, medical, older]), { medical, street: older });
  assert.deepEqual(latestComparablePrices([sentinel]), {});
  assert.equal(australian.length, 1); // retained, rather than deleted or given a made-up replacement
  const loader = fs.readFileSync('src/lib/prices.js', 'utf8');
  assert.match(loader, /return latestComparablePrices\(priceHistoryFor\(id\)\)/);
  assert.match(fs.readFileSync('src/lib/exports.js', 'utf8'), /comparison: p.comparison/);
});

test('raw survey rates do not acquire country percentiles or comparison deltas (#183)', () => {
  const text = fs.readFileSync('src/lib/dataset-text.js', 'utf8');
  assert.match(text, /if \(d.id === "cannabis_use"\) return null/);
  const compare = fs.readFileSync('src/pages/compare.astro', 'utf8');
  assert.match(compare, /id !== "cannabis_use" && k > 0 && first \? diff/);
  assert.match(compare, /META.useComparisonNote/);
});
