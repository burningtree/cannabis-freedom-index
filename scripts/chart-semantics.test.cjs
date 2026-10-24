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
