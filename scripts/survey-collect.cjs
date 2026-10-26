// Turns submitted survey answers into the counted results the site publishes:
//   node scripts/survey-collect.cjs                       fetch from the relays in survey/<year>.yaml
//   node scripts/survey-collect.cjs --from events.jsonl   read saved events instead
// The secret key is read from SURVEY_SECRET_KEY, in the environment or in the git-ignored .env.
// Add --out <file> to write somewhere other than survey/results-<year>.json.
// Add --min <n> to publish groups and countries with as few as n answers, for a look at the first
// answers while testing. With real respondents leave it out: small groups can identify a person.
// Every event is checked (signature, kind, topic), decrypted with the project's secret key, cleaned
// against the questionnaire and counted by survey-lib.cjs. Only survey/results-<year>.json is
// written: counts, never single answers. Free text is printed to the terminal with --text, for
// the researchers, and is stored nowhere by this script. The secret key is read from the
// environment and must never be put in a file of this repository.
const fs = require("fs");
const path = require("path");
const { verifyEvent } = require("nostr-tools/pure");
const { decrypt, getConversationKey } = require("nostr-tools/nip44");
const { ROOT, loadSurvey, loadRegions, clean, aggregate, collect, MAX_REPORTS } = require("./survey-lib.cjs");

const EDITION = 2026;
const args = process.argv.slice(2);
const from = args.includes("--from") ? args[args.indexOf("--from") + 1] : null;
const survey = loadSurvey(EDITION);
const countries = loadRegions();
const { kind, topic, relays } = survey.nostr;
// the key comes from the environment, or from the git-ignored .env file beside package.json
const fromEnvFile = () => { try { return fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/^SURVEY_SECRET_KEY=([0-9a-f]{64})\s*$/m)?.[1]; } catch { return undefined; } };
const hex = process.env.SURVEY_SECRET_KEY ?? fromEnvFile();
if (hex && !/^[0-9a-f]{64}$/.test(hex)) { console.error("SURVEY_SECRET_KEY must be 64 hex characters"); process.exit(1); }
const secret = hex ? Uint8Array.from(Buffer.from(hex, "hex")) : null;

async function fetchEvents() {
  if (from) return fs.readFileSync(from, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  if (!relays.length) { console.error(`survey/${EDITION}.yaml lists no relays; use --from <file>`); process.exit(1); }
  const { SimplePool } = require("nostr-tools/pool");
  const pool = new SimplePool();
  const events = await pool.querySync(relays, { kinds: [kind], "#t": [topic] });
  pool.close(relays);
  return events;
}

(async () => {
  const responses = [], observations = [], prices = [], texts = [];
  // which events count, and as what: one survey per key, reports in their own slots (survey-lib.cjs)
  const picked = collect(await fetchEvents(), {
    kind, topic, edition: EDITION, verify: verifyEvent,
    open: (ev) => JSON.parse(ev.content.startsWith("{") ? ev.content : decrypt(ev.content, getConversationKey(secret, ev.pubkey))),
  });
  const { dropped } = picked;
  const keep = (list, questions, needed, payload) => {
    const x = clean(questions, payload.answers, countries);
    if (needed.some((id) => !x[id])) { dropped.other++; return; }
    list.push(x);
    for (const q of questions.filter((q) => q.type === "text")) if (payload.answers[q.id]) texts.push([q.id, String(payload.answers[q.id]).slice(0, 4000)]);
  };
  // the questions without which an answer cannot be placed in any group, or a report in any country
  for (const p of picked.response) keep(responses, survey.all, ["residence", "relation"], p);
  for (const p of picked.observation) keep(observations, survey.territory.questions, ["country", "tie"], p);
  for (const p of picked.price) keep(prices, survey.prices.questions, ["p_country", "p_price"], p);
  if (dropped.mismatched) console.warn(`warning: ${dropped.mismatched} parts claimed a type their slot does not allow (a second "survey" under one key, for instance) and were not counted`);
  if (dropped.excess) console.warn(`warning: ${dropped.excess} reports beyond ${MAX_REPORTS} of a kind under one key were not counted`);
  const min = args.includes("--min") ? Math.max(1, +args[args.indexOf("--min") + 1] || 1) : null;
  const out = aggregate(survey, responses, observations, prices, countries, { mock: false, generated: new Date().toISOString().slice(0, 10) }, min ? { segment: min, territory: min } : {});
  const file = args.includes("--out") ? args[args.indexOf("--out") + 1] : path.join(ROOT, "survey", `results-${EDITION}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1) + "\n");
  console.log(`collected: ${responses.length} responses, ${observations.length} place reports, ${prices.length} price reports | dropped: ${JSON.stringify(dropped)} → ${path.relative(ROOT, file)}`);
  if (args.includes("--text")) for (const [id, text] of texts) console.log(`\n[${id}] ${text}`);
})();
