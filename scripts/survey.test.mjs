// The survey's safety and counting rules, checked without a browser or a relay:
//   #139 a relay's free-text reason is shown as text, never put into HTML
//   #140 a deletion that no relay (or too few) confirmed is not reported as done, and is kept
//   #141 one key counts as one respondent, whatever slots it signs
//   node --test scripts/survey.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { generateSecretKey, finalizeEvent, verifyEvent } from "nostr-tools/pure";
import { relayReason, deletionOutcome } from "../src/lib/survey-client.js";

const require = createRequire(import.meta.url);
const { collect, MAX_REPORTS } = require("./survey-lib.cjs");

test("a relay's reason is cleaned text, and no survey page puts a relay error into HTML (#139)", () => {
  const reason = relayReason([{ relays: 0, error: '<img src=x onerror="alert(1)">\n' + "x".repeat(400) }]);
  assert.ok(reason.length <= 160);
  assert.doesNotMatch(reason, /[\n\r]/);
  assert.equal(relayReason([{ relays: 2, error: null }]), null);
  for (const file of fs.readdirSync("src/pages/survey").map((f) => `src/pages/survey/${f}`)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n").filter((l) => /innerHTML\s*[+]?=/.test(l))) {
      // an escaped value, esc(...), is text; anything else from an error must not be there
      assert.doesNotMatch(line.replace(/esc\([^)]*\)/g, ""), /\.(error|message)\b/, `${file}: a relay or error message inside innerHTML`);
    }
  }
});

test("a deletion no relay confirmed stays pending, and only confirmed ones are done (#140)", () => {
  const gone = [{ id: "a", relays: 3 }, { id: "b", relays: 2 }, { id: "c", relays: 0 }];
  // offline: no relay accepted anything
  assert.deepEqual(deletionOutcome(gone, [{ relays: 0 }, { relays: 0 }, { relays: 0 }]), { done: ["c"], pending: [{ id: "a", reached: 0, of: 3 }, { id: "b", reached: 0, of: 2 }] });
  // partial: a reached every relay that held it, b only one of two
  assert.deepEqual(deletionOutcome(gone, [{ relays: 3 }, { relays: 1 }, { relays: 0 }]), { done: ["a", "c"], pending: [{ id: "b", reached: 1, of: 2 }] });
  // the page uses the outcome and no longer reports success unconditionally
  const me = fs.readFileSync("src/pages/survey/me.astro", "utf8");
  assert.match(me, /client\.deletionOutcome\(/);
  assert.doesNotMatch(me, /cannot be brought back|for good/);
});

const TOPIC = "test-survey", KIND = 30078, EDITION = 2026;
const event = (sk, d, payload, at = 1000) => finalizeEvent({ kind: KIND, created_at: at, tags: [["d", d], ["t", TOPIC]], content: JSON.stringify(payload) }, sk);
const run = (events) => collect(events, { kind: KIND, topic: TOPIC, edition: EDITION, verify: verifyEvent, open: (ev) => JSON.parse(ev.content) });

test("one key is one respondent, however many slots claim to be a survey (#141)", () => {
  const sk = generateSecretKey();
  const survey = { type: "response", edition: EDITION, answers: { residence: "DE" } };
  const got = run([
    event(sk, `${TOPIC}:response`, survey),
    event(sk, `${TOPIC}:place:aaaaaaaaaaaa`, survey), // a report slot claiming to be a survey
    event(sk, `${TOPIC}:response:2`, survey), // not a slot the survey uses
    event(sk, `${TOPIC}:place:not-an-id`, { ...survey, type: "observation" }),
    event(sk, `${TOPIC}:response`, survey, 900), // an older version of the same slot
  ]);
  assert.equal(got.response.length, 1);
  assert.equal(got.dropped.mismatched, 1);
  assert.equal(got.dropped.invalid, 2);
  assert.equal(got.dropped.superseded, 1);
  // two keys are two respondents
  assert.equal(run([event(sk, `${TOPIC}:response`, survey), event(generateSecretKey(), `${TOPIC}:response`, survey)]).response.length, 2);
});

test("reports beyond the limit under one key are not counted (#141)", () => {
  const sk = generateSecretKey();
  const many = Array.from({ length: MAX_REPORTS + 5 }, (_, i) => event(sk, `${TOPIC}:place:${String(i).padStart(12, "0")}`, { type: "observation", edition: EDITION, answers: { country: "DE" } }, 1000 + i));
  const got = run(many);
  assert.equal(got.observation.length, MAX_REPORTS);
  assert.equal(got.dropped.excess, 5);
  // the survey page states the same limit
  assert.match(fs.readFileSync("src/pages/survey/index.astro", "utf8"), new RegExp(`at most ${MAX_REPORTS} place reports and ${MAX_REPORTS} price reports`));
});
