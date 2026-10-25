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
