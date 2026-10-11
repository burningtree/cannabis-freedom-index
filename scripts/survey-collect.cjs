// Turns submitted survey answers into the counted results the site publishes:
//   node scripts/survey-collect.cjs                       fetch from the relays in survey/<year>.yaml
//   node scripts/survey-collect.cjs --from events.jsonl   read saved events instead
// The secret key is read from SURVEY_SECRET_KEY, in the environment or in the git-ignored .env.
// Add --out <file> to write somewhere other than survey/results-<year>.json.
// Every event is checked (signature, kind, topic), decrypted with the project's secret key, cleaned
// against the questionnaire and counted by survey-lib.cjs. Only survey/results-<year>.json is
// written: counts, never single answers. Free text is printed to the terminal with --text, for
// the researchers, and is stored nowhere by this script. The secret key is read from the
// environment and must never be put in a file of this repository.
const fs = require("fs");
const path = require("path");
const { verifyEvent } = require("nostr-tools/pure");
const { decrypt, getConversationKey } = require("nostr-tools/nip44");
const { ROOT, loadSurvey, loadRegions, clean, aggregate } = require("./survey-lib.cjs");

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
  const responses = [], observations = [], texts = [];
  const dropped = { invalid: 0, superseded: 0, deleted: 0, unreadable: 0, other: 0 };
  // Each part of a submission is a replaceable event: only the newest version under one key and
  // one `d` tag counts, whatever older copies a relay still returns.
  const newest = new Map();
  for (const ev of await fetchEvents()) {
    const d = ev.tags?.find((t) => t[0] === "d")?.[1];
    if (ev.kind !== kind || !d?.startsWith(`${topic}:`) || !ev.tags.some((t) => t[0] === "t" && t[1] === topic) || !verifyEvent(ev)) { dropped.invalid++; continue; }
    const slot = `${ev.pubkey}:${d}`, had = newest.get(slot);
    if (had) dropped.superseded++;
    if (!had || had.created_at < ev.created_at) newest.set(slot, ev);
  }
  for (const ev of newest.values()) {
    let payload;
    try {
      const plain = ev.content.startsWith("{") ? ev.content : decrypt(ev.content, getConversationKey(secret, ev.pubkey));
      payload = JSON.parse(plain);
    } catch { dropped.unreadable++; continue; }
    if (payload?.deleted) { dropped.deleted++; continue; } // the respondent removed this part
    if (payload?.edition !== EDITION || typeof payload.answers !== "object") { dropped.other++; continue; }
    if (payload.type === "response") {
      const r = clean(survey.all, payload.answers, countries);
      // the two questions without which an answer cannot be placed in any group
      if (!r.residence || !r.relation) { dropped.other++; continue; }
      responses.push(r);
    } else if (payload.type === "observation") {
      const o = clean(survey.territory.questions, payload.answers, countries);
      if (!o.country || !o.tie) { dropped.other++; continue; }
      observations.push(o);
    } else { dropped.other++; continue; }
    for (const q of [...survey.all, ...survey.territory.questions].filter((q) => q.type === "text")) if (payload.answers[q.id]) texts.push([q.id, String(payload.answers[q.id]).slice(0, 4000)]);
  }
  const out = aggregate(survey, responses, observations, countries, { mock: false, generated: new Date().toISOString().slice(0, 10) });
  const file = args.includes("--out") ? args[args.indexOf("--out") + 1] : path.join(ROOT, "survey", `results-${EDITION}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 1) + "\n");
  console.log(`collected: ${responses.length} responses, ${observations.length} observations | dropped: ${JSON.stringify(dropped)} → ${path.relative(ROOT, file)}`);
  if (args.includes("--text")) for (const [id, text] of texts) console.log(`\n[${id}] ${text}`);
})();
