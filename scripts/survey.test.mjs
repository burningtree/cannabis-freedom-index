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
import { relayReason, deletionOutcome, publish, withRelayAttempt, withRelayResult, hasRemoteCopy, deletionRelays, applyDeletionOutcome, fetchRelay, mergeMine, mineFromRelays, startDeletion } from "../src/lib/survey-client.js";

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

const A="wss://a.test/", B="wss://b.test/";

test("deletion requires the same relay identities, never an equal ACK count (#140, #181)", () => {
  const gone = [{ id: "a", relays: 1, relayUrls: [A] }, { id: "b", relays: 2, relayUrls: [A,B] }, { id: "local", relays: 0 }];
  const swapped=deletionOutcome(gone,[{relays:1,acceptedRelays:[B]}, {relays:1,acceptedRelays:[A]}]);
  assert.deepEqual(swapped.done,["local"]);
  assert.equal(swapped.pending[0].reached,0);
  assert.equal(swapped.pending[1].reached,1);
  assert.deepEqual(deletionOutcome([gone[0]],[{acceptedRelays:[A]}]).done,["a"]);
  // The last result is a NIP-09 request, not an ACK for a replacement.
  assert.deepEqual(deletionOutcome([gone[0]],[{acceptedRelays:[]},{acceptedRelays:[A]}]).done,[]);
});

test("legacy count-only records remain unconfirmed even when today's relays ACK (#181)", () => {
  const legacy={id:"old",relays:1};
  const result=deletionOutcome([legacy],[{acceptedRelays:[A,B]}],{relays:[A,B]});
  assert.deepEqual(result.done,[]);
  assert.equal(result.pending[0].unknown,true);
  assert.equal(hasRemoteCopy({relays:[]},legacy),true);
});

test("publish records exactly which relay accepted, and normalises duplicate URLs (#181)", async () => {
  let closed;
  const pool={publish: (destinations) => {
    assert.deepEqual(destinations,[A,B]);
    return destinations.map(url=>url===A ? Promise.reject(new Error('no')) : Promise.resolve('saved'));
  },close: dest=>{closed=dest;}};
  const [sent]=await publish({relays:[A,B,'wss://a.test']},[{id:'event'}],{pool});
  assert.equal(sent.relays,1);assert.deepEqual(sent.acceptedRelays,[B]);
  assert.deepEqual(sent.attemptedRelays,[A,B]);assert.deepEqual(closed,[A,B]);
});

test("attempted destinations and older holders survive edits, failed writes and reloads (#181)", () => {
  const cfg={relays:[B]},old={id:'a',relays:1,relayUrls:[A]};
  const attempted=withRelayAttempt(cfg,{id:'a',relays:0},old);
  const saved=JSON.parse(JSON.stringify(withRelayResult(attempted,{relays:0,acceptedRelays:[],attemptedRelays:[B]})));
  assert.equal(hasRemoteCopy(cfg,saved),true);
  assert.deepEqual(deletionRelays(cfg,[saved]),[B,A]);
  assert.deepEqual(deletionOutcome([saved],[{acceptedRelays:[B]}],cfg).done,[]);
});

test("partial deletion ACKs survive reload and a retry to the remaining relay (#181)", () => {
  const item={id:'a',relays:2,relayUrls:[A,B],deleting:{replacement:{id:'tombstone'},acceptedRelays:[]}};
  assert.deepEqual(deletionOutcome([item],[{id:'different-event',acceptedRelays:[A,B]}]).done,[]);
  const partial=applyDeletionOutcome({items:[item]},deletionOutcome([item],[{id:'tombstone',acceptedRelays:[A]}]));
  const reloaded=JSON.parse(JSON.stringify(partial));
  assert.deepEqual(reloaded.items[0].deleting.replacement,{id:'tombstone'});
  assert.deepEqual(deletionOutcome(reloaded.items,[{id:'tombstone',acceptedRelays:[B]}]).done,['a']);
});

test("relay snapshots distinguish EOSE from connection failures, CLOSED and timeout (#181)", async () => {
  const poolFor=action=>({ensureRelay:async()=>({subscribe:(_,callbacks)=>{queueMicrotask(()=>action(callbacks));}}),close:()=>{}});
  assert.equal((await fetchRelay(A,{}, {pool:poolFor(c=>c.oneose()),timeout:10})).ok,true);
  assert.equal((await fetchRelay(A,{}, {pool:poolFor(c=>c.onclose('denied')),timeout:10})).ok,false);
  assert.equal((await fetchRelay(A,{}, {pool:poolFor(()=>{}),timeout:5})).ok,false);
  assert.equal((await fetchRelay(A,{}, {pool:{ensureRelay:async()=>{throw Error('offline');},close:()=>{}},timeout:10})).ok,false);
});

test("offline, partial and empty complete sync keep pending records in the actual page merge (#181)", async () => {
  const item={id:'a',relays:1,relayUrls:[A],event:{id:'original',created_at:10},deleting:{replacement:{id:'empty',created_at:11},acceptedRelays:[],relayUrls:[A],reached:0,of:1}};
  const me=fs.readFileSync('src/pages/survey/me.astro','utf8');
  const branch=me.match(/else if \(act === "sync"\) \{([\s\S]*?)\} else if \(act === "backup"\)/)[1];
  const runSync=new (Object.getPrototypeOf(async function(){}).constructor)('client','cfg','draw','say',branch);
  for(const relays of [[{url:A,ok:false}],[{url:A,ok:false},{url:B,ok:true}],[{url:A,ok:true}]]) {
    let stored=JSON.parse(JSON.stringify({items:[item]}));
    const fake={fetchMine:async()=>({items:[],relays}),mine:()=>stored,mergeMine,remember:(_,value)=>{stored=JSON.parse(JSON.stringify(value));return true;}};
    await runSync(fake,{relays:[A,B]},()=>{},()=>{});
    assert.deepEqual(stored.items,[item]);
  }
});

test("sync keeps holders of old versions, including when a tombstone is only on another relay (#181)", () => {
  const cfg={edition:2026},original={id:'a',created_at:10,tags:[['d','test:response']],content:JSON.stringify({edition:2026,type:'response',answers:{residence:'DE'}})};
  const edited={...original,id:'b',created_at:11};
  const open=e=>JSON.parse(e.content);
  const snapshot=mineFromRelays(cfg,[{url:A,ok:true,events:[original]},{url:B,ok:true,events:[edited]}],open);
  assert.deepEqual(snapshot.items[0].relayUrls,[A,B]);
  assert.equal(snapshot.items[0].event.id,'b');
  const tombstone={...edited,id:'deleted',content:JSON.stringify({edition:2026,type:'response',deleted:true})};
  const partial=mineFromRelays(cfg,[{url:A,ok:true,events:[original]},{url:B,ok:true,events:[tombstone]}],open);
  assert.equal(partial.items[0].deleting.replacement.id,'deleted');
  assert.deepEqual(partial.items[0].deleting.acceptedRelays,[B]);
  assert.deepEqual(deletionOutcome(partial.items,[{id:'deleted',acceptedRelays:[A]}]).done,['response']);
});

test("a newer edit invalidates earlier deletion ACKs; replacements are strictly newer (#181)", () => {
  const cfg={relays:[A]},item={id:'a',event:{id:'old',created_at:10},relays:1,relayUrls:[A],deleting:{replacement:{id:'tombstone',created_at:11},acceptedRelays:[A]}};
  const found={...item,deleting:undefined,event:{id:'new',created_at:12}};
  const merged=mergeMine(cfg,{items:[item]},{items:[found],relays:[]});
  assert.equal(merged.items[0].deleting.replacement,null);
  assert.deepEqual(merged.items[0].deleting.acceptedRelays,[]);
  const previousStorage=globalThis.localStorage,storage=new Map();
  globalThis.localStorage={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)};
  try {
    const future=Math.floor(Date.now()/1000)+1;
    const pending=startDeletion({kind:30078,edition:2026,topic:'test',relays:[A]},{type:'response',id:'response',event:{created_at:future},relayUrls:[A]});
    assert.equal(pending.deleting.replacement.created_at,future+1);
    assert.equal(startDeletion(cfg,pending).deleting.replacement.id,pending.deleting.replacement.id);
  } finally {globalThis.localStorage=previousStorage;}
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
