import { test } from 'node:test';
import assert from 'node:assert/strict';
import { useFreedomRatio } from '../src/lib/use-freedom-ratio.js';

test('zero freedom is undefined; positive scores below one keep their real denominator (#191)', () => {
  assert.equal(useFreedomRatio(5, 0), null);
  assert.equal(useFreedomRatio(5, 0.5), 10);
  assert.equal(useFreedomRatio(5, 1), 5);
  assert.equal(useFreedomRatio(null, 1), null);
});
