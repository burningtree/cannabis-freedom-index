// The survey in the browser: the respondent's key, their stored submissions, and the relays.
// Loaded only when it is needed (on "Submit", and on /survey/me/).
//
// A respondent has one Nostr key, made in their browser the first time they submit and kept in
// its local storage. It is a pseudonym: nothing ties it to a person, but it does tie together the
// messages signed with it, which is what lets someone come back, correct an answer or delete it.
// Each part of a submission (the personal answers, and every place described) is one replaceable
// event (NIP-78, kind 30078) under its own `d` tag; publishing it again replaces it. The content
// is encrypted (NIP-44) between the respondent's key and the project's, so the relays store
// ciphertext that only those two can read.
import { generateSecretKey, getPublicKey, finalizeEvent } from "nostr-tools/pure";
import { encrypt, decrypt, getConversationKey } from "nostr-tools/nip44";
import { nsecEncode, npubEncode, naddrEncode, decode } from "nostr-tools/nip19";
import { SimplePool } from "nostr-tools/pool";

const KEY = "cfi-survey-key";
const toHex = (u8) => Array.from(u8, (b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (h) => Uint8Array.from(h.match(/../g).map((x) => parseInt(x, 16)));
const get = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); return true; } catch { return false; } };

// For trying the whole flow against a relay of your own before the survey opens: put
// {"pubkey": "<hex>", "relays": ["ws://localhost:7447"]} under "cfi-survey-test" in local storage.
export function effective(cfg) {
  try {
    const t = JSON.parse(get("cfi-survey-test") ?? "null");
    if (/^[0-9a-f]{64}$/.test(t?.pubkey ?? "") && t.relays?.length) return { ...cfg, pubkey: t.pubkey, relays: t.relays, open: true, test: true };
  } catch {}
  return cfg;
}

// ── The key ──
export const hasKey = () => /^[0-9a-f]{64}$/.test(get(KEY) ?? "");
function secret(create = false) {
  if (hasKey()) return fromHex(get(KEY));
  if (!create) return null;
  const sk = generateSecretKey();
  if (!set(KEY, toHex(sk))) throw new Error("this browser does not allow storing the key");
  return sk;
}
export function identity() {
  const sk = secret();
  if (!sk) return null;
  const pubkey = getPublicKey(sk);
  return { pubkey, npub: npubEncode(pubkey) };
}
export const backup = () => nsecEncode(secret());
export function restore(text) {
  const value = text.trim();
  let sk;
  if (/^[0-9a-f]{64}$/.test(value)) sk = fromHex(value);
  else { const d = decode(value); if (d.type !== "nsec") throw new Error("that is not a secret key (it should start with nsec1)"); sk = d.data; }
  getPublicKey(sk); // throws if it is not a valid key
  set(KEY, toHex(sk));
}
export const forget = () => set(KEY, null);

// ── What this browser knows about its own submissions ──
// { items: [{ type: "response" | "observation" | "price", id, answers, updated, event, relays }] }
const storeKey = (cfg) => `cfi-survey-${cfg.edition}-mine`;
export function mine(cfg) { try { return JSON.parse(get(storeKey(cfg)) ?? "null") ?? { items: [] }; } catch { return { items: [] }; } }
export const remember = (cfg, store) => set(storeKey(cfg), JSON.stringify(store));
export const newId = () => toHex(crypto.getRandomValues(new Uint8Array(6)));

// ── Events ──
// one `d` tag per part: the yearly survey, each place report, each price report
const SLOT = { observation: "place", price: "price" };
const dTag = (cfg, item) => `${cfg.topic}:${item.type === "response" ? "response" : `${SLOT[item.type]}:${item.id}`}`;
// `removed` signs an empty replacement, which overwrites the earlier version on the relays
export function sign(cfg, item, removed = false) {
  const sk = secret(true);
  const plain = JSON.stringify(removed ? { type: item.type, edition: cfg.edition, deleted: true } : { type: item.type, edition: cfg.edition, answers: item.answers });
  const tags = [["d", dTag(cfg, item)], ["t", cfg.topic], ["alt", `State of Cannabis ${cfg.edition}: an anonymous survey answer`]];
  if (cfg.pubkey) tags.push(["p", cfg.pubkey]);
  return finalizeEvent({ kind: cfg.kind, created_at: Math.floor(Date.now() / 1000), tags, content: cfg.pubkey ? encrypt(plain, getConversationKey(sk, cfg.pubkey)) : plain }, sk);
}
// a deletion request (NIP-09) for events of ours, for relays that honour it
export function deletion(cfg, events) {
  const sk = secret();
  const tags = events.flatMap((e) => [["e", e.id], ["a", `${cfg.kind}:${e.pubkey}:${e.tags.find((t) => t[0] === "d")[1]}`]]);
  return finalizeEvent({ kind: 5, created_at: Math.floor(Date.now() / 1000), tags: [...tags, ["k", String(cfg.kind)]], content: "" }, sk);
}

// Where a stored part can be looked at from outside: its event id, and its address on njump.me,
// a public Nostr viewer. The address names the replaceable event (kind, key and `d` tag), so the
// link keeps pointing at the newest version after an edit. The viewer shows only ciphertext.
export function reference(cfg, item) {
  const e = item.event;
  if (!e) return null;
  const naddr = naddrEncode({ kind: e.kind, pubkey: e.pubkey, identifier: e.tags.find((t) => t[0] === "d")?.[1] ?? "", relays: (cfg.relays ?? []).slice(0, 2) });
  return { id: e.id, url: `https://njump.me/${naddr}` };
}

// ── Relays ──
const within = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error("timed out")), ms))]);
// Offers every event to every relay; returns for each event how many relays stored it.
export async function publish(cfg, events) {
  const pool = new SimplePool();
  try {
    return await Promise.all(events.map(async (event) => {
      const results = await Promise.allSettled(pool.publish(cfg.relays, event).map((p) => within(p, 8000)));
      return { id: event.id, relays: results.filter((r) => r.status === "fulfilled").length, error: results.find((r) => r.status === "rejected")?.reason?.message ?? null };
    }));
  } finally { pool.close(cfg.relays); }
}
// What the relays hold under this browser's key, decrypted: the newest version of each part, and
// on how many relays that version sits. Each relay is asked by itself, so that one slow or
// unreachable relay neither hides the others nor inflates the count.
export async function fetchMine(cfg) {
  const sk = secret();
  if (!sk || !cfg.open) return [];
  const filter = { kinds: [cfg.kind], authors: [getPublicKey(sk)], "#t": [cfg.topic] };
  const perRelay = await Promise.all(cfg.relays.map(async (url) => {
    const pool = new SimplePool();
    try { return await within(pool.querySync([url], filter), 8000); } catch { return []; } finally { pool.close([url]); }
  }));
  const newest = new Map(); // d tag → { event, relays }
  for (const events of perRelay) {
    for (const e of events) {
      const d = e.tags.find((t) => t[0] === "d")?.[1];
      if (!d) continue;
      const had = newest.get(d);
      if (!had || had.event.created_at < e.created_at) newest.set(d, { event: e, relays: 1 });
      else if (had.event.id === e.id) had.relays++;
    }
  }
  const out = [];
  for (const [d, { event, relays }] of newest) {
    try {
      const p = JSON.parse(event.content.startsWith("{") ? event.content : decrypt(event.content, getConversationKey(sk, cfg.pubkey)));
      if (p.deleted || p.edition !== cfg.edition) continue;
      out.push({ type: p.type, id: p.type === "response" ? "response" : d.split(/:(?:place|price):/)[1], answers: p.answers, updated: event.created_at, event, relays });
    } catch {}
  }
  return out;
}

// ── The public view ──
// Everything a stranger can learn from the relays without any key: which messages exist, under
// which pseudonymous keys, of which kind, how large and when. Used by /survey/scan/. Each relay
// is asked by itself and timed; the contents stay encrypted and are not touched.
export async function scan(cfg) {
  const filter = { kinds: [cfg.kind], "#t": [cfg.topic] };
  const relays = await Promise.all(cfg.relays.map(async (url) => {
    const pool = new SimplePool(), started = Date.now();
    try { const events = await within(pool.querySync([url], filter), 10000); return { url, ok: true, ms: Date.now() - started, events }; }
    catch (e) { return { url, ok: false, ms: Date.now() - started, error: String(e.message ?? e), events: [] }; }
    finally { pool.close([url]); }
  }));
  const byId = new Map();
  for (const r of relays) for (const e of r.events) {
    const d = e.tags.find((t) => t[0] === "d")?.[1] ?? "";
    const part = d.slice(cfg.topic.length + 1).split(":")[0]; // response | place | price
    const row = byId.get(e.id) ?? {
      id: e.id, pubkey: e.pubkey, npub: npubEncode(e.pubkey), created_at: e.created_at, part, d,
      bytes: e.content.length, encrypted: !e.content.startsWith("{"), relays: [],
      url: `https://njump.me/${naddrEncode({ kind: e.kind, pubkey: e.pubkey, identifier: d, relays: [r.url] })}`,
    };
    row.relays.push(r.url);
    byId.set(e.id, row);
  }
  // a replaced version may linger on one relay: keep only the newest message per key and part
  const newest = new Map();
  for (const row of byId.values()) { const slot = `${row.pubkey}:${row.d}`; if (!newest.has(slot) || newest.get(slot).created_at < row.created_at) newest.set(slot, row); }
  const events = [...newest.values()].sort((a, b) => b.created_at - a.created_at);
  return { relays: relays.map(({ events: found, ...r }) => ({ ...r, count: found.length })), events, stale: byId.size - events.length };
}
