import { test } from "node:test";
import assert from "node:assert/strict";
import { contextCoverage } from "../src/lib/context-coverage.js";
import { CONTEXT_RESEARCH_IDS, CONTEXT_IDS, OPTIONAL_CONTEXT_IDS, STATUS_SECTIONS } from "../src/lib/segment-ids.js";

const source = { title: "Reviewed official source", url: "https://example.org/law" };
const block = (text = "A licensed system governs cannabis production and sale.") => ({ text, sources: ["law"] });
const profile = (context = {}, context_not_applicable) => ({ context, sources: { law: source }, context_not_applicable });
const only = key => [[key, key]];

test("the target includes every current category, excluding the retired Products section", () => {
  const schemaKeys = [...new Set(["death_penalty", "planting", "spotlights", ...CONTEXT_IDS, ...OPTIONAL_CONTEXT_IDS, ...Object.keys(STATUS_SECTIONS)])].filter(key => key !== "products");
  assert.deepEqual([...CONTEXT_RESEARCH_IDS].sort(), schemaKeys.sort());
  assert.equal(CONTEXT_RESEARCH_IDS.length, 16);
});

test("missing sections remain gaps even where cannabis is banned", () => {
  const result = contextCoverage({ ...profile(), recreational: "illegal", medical: "none" });
  assert.equal(result.covered, 0);
  assert.equal(result.missing, 16);
  assert.equal(result.pct, 0);
});

test("all sixteen cited categories reach the coverage target", () => {
  const context = Object.fromEntries(CONTEXT_RESEARCH_IDS.map(key => [key, key === "spotlights" ? [{ title: "A local feature", ...block() }] : block()]));
  const result = contextCoverage(profile(context));
  assert.equal(result.filled, 16);
  assert.equal(result.notApplicable, 0);
  assert.equal(result.pct, 100);
});

test("legacy Products cannot fill recreational, medical or hemp coverage", () => {
  assert.equal(contextCoverage(profile({ products: block() })).covered, 0);
});

test("bare placeholders, empty text and missing or unknown references stay incomplete", () => {
  for (const text of ["", "  ", "None.", "None found.[@law]", "N/A", "Not applicable", "No data available."]) {
    assert.equal(contextCoverage(profile({ research: block(text) }), only("research")).covered, 0, text);
  }
  for (const sources of [[], ["unknown"], ["law", "unknown"]]) {
    assert.equal(contextCoverage(profile({ research: { ...block(), sources } }), only("research")).covered, 0);
  }
});

test("a sourced absence is content, while not-applicable explanations are counted separately", () => {
  const result = contextCoverage(profile({ production: block("Commercial cannabis cultivation is prohibited under the drug law.") }, {
    death_penalty: block("Cannabis offences are punishable by fines or imprisonment; the law provides no capital sentence."),
  }), [["production", "Industry"], ["death_penalty", "Death penalty"]]);
  assert.equal(result.filled, 1);
  assert.equal(result.notApplicable, 1);
  assert.equal(result.covered, 2);
  assert.equal(result.pct, 100);
  assert.match(result.sections[1].reason, /no capital sentence/);
});

test("an unexplained or uncited exception cannot inflate coverage", () => {
  for (const exception of [block("N/A"), { text: "This category does not apply because the law excludes it.", sources: [] }]) {
    assert.equal(contextCoverage(profile({}, { genetics: exception }), only("genetics")).covered, 0);
  }
});

test("content and a conflicting not-applicable claim cannot both count", () => {
  const result = contextCoverage(profile({ research: block() }, { research: block() }), only("research"));
  assert.equal(result.covered, 0);
  assert.equal(result.sections[0].state, "incomplete");
});

test("every spotlight needs its own explanation and sources", () => {
  const result = contextCoverage(profile({ spotlights: [{ title: "Complete", ...block() }, { title: "Unfinished", text: "", sources: [] }] }), only("spotlights"));
  assert.equal(result.covered, 0);
});
