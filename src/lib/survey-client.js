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
import { normalizeURL } from "nostr-tools/utils";

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
// `relays` is a display count; `relayUrls` keeps known/possible destinations across versions.
// `deleting` persists the replacement and per-relay ACKs until delivery is confirmed everywhere.
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
  return finalizeEvent({ kind: cfg.kind, created_at: Math.max(Math.floor(Date.now() / 1000), (item.event?.created_at ?? 0) + 1), tags, content: cfg.pubkey ? encrypt(plain, getConversationKey(sk, cfg.pubkey)) : plain }, sk);
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
const within = async (p, ms) => {
  let timer;
  try { return await Promise.race([p, new Promise((_, no) => { timer = setTimeout(() => no(new Error("timed out")), ms); })]); }
  finally { clearTimeout(timer); }
};
const urls = (...lists) => [...new Set(lists.flat().filter(Boolean).map(normalizeURL))];
const unknownRelays = (item) => !!(item.relayUnknown || item.deleting?.unknown || (item.relays > 0 && !Array.isArray(item.relayUrls)));
export const relayTargets = (cfg, item) => urls(item.relayUrls ?? [], item.deleting?.relayUrls ?? [], unknownRelays(item) ? cfg.relays : []);
export const hasRemoteCopy = (cfg, item) => unknownRelays(item) || relayTargets(cfg, item).length > 0;
// Save possible destinations BEFORE sending: a timeout or a reload can hide a successful write.
// Old count-only records have unknown destinations and cannot be confirmed deleted automatically.
export const withRelayAttempt = (cfg, item, previous = item) => ({ ...item, relayUrls: urls(relayTargets(cfg, previous), cfg.relays), relayUnknown: unknownRelays(previous) });
export const withRelayResult = (item, sent) => ({ ...item, relays: sent.relays, relayUrls: urls(item.relayUrls ?? [], sent.attemptedRelays, sent.acceptedRelays) });
export const deletionRelays = (cfg, items) => urls(cfg.relays, ...items.map((i) => relayTargets(cfg, i)));

// Offers every event to every configured relay. Counts are for display; identities decide deletion.
export async function publish(cfg, events, { pool = new SimplePool(), timeout = 8000 } = {}) {
  const destinations = urls(cfg.relays);
  try {
    return await Promise.all(events.map(async (event) => {
      const results = await Promise.allSettled(pool.publish(destinations, event).map((p) => within(p, timeout)));
      const acceptedRelays = destinations.filter((_, k) => results[k].status === "fulfilled");
      return { id: event.id, relays: acceptedRelays.length, acceptedRelays, attemptedRelays: destinations,
        error: results.find((r) => r.status === "rejected")?.reason?.message ?? null };
    }));
  } finally { pool.close(destinations); }
}
// A relay's reason is untrusted text, never HTML.
export const relayReason = (sent) => {
  const text = sent.find((r) => r.error)?.error;
  return text ? String(text).replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 160) : null;
};

// Reuse the same replacement across retries; ACKs accumulated across reloads concern this event.
export function startDeletion(cfg, item) {
  const relayUrls = relayTargets(cfg, item);
  if (item.deleting?.replacement) return { ...item, deleting: { ...item.deleting, relayUrls, of: relayUrls.length } };
  return { ...item, deleting: { relayUrls, unknown: unknownRelays(item), acceptedRelays: [],
    reached: 0, of: relayUrls.length, replacement: sign(cfg, item, true) } };
}
// Only an ACK for the replacement from EACH possible holder counts. NIP-09 ACKs alone never do.
export function deletionOutcome(gone, sent, cfg = { relays: [] }) {
  const done = [], pending = [];
  gone.forEach((item, k) => {
    const relayUrls = relayTargets(cfg, item), unknown = unknownRelays(item);
    const result = sent[k], replacement = item.deleting?.replacement;
    const acceptedRelays = urls(item.deleting?.acceptedRelays ?? [], !replacement || result?.id === replacement.id ? result?.acceptedRelays ?? [] : []).filter((u) => relayUrls.includes(u));
    if (!unknown && acceptedRelays.length === relayUrls.length) done.push(item.id);
    else pending.push({ ...item.deleting, id: item.id, relayUrls, acceptedRelays, unknown, reached: acceptedRelays.length, of: relayUrls.length });
  });
  return { done, pending };
}
export function applyDeletionOutcome(store, { done, pending }) {
  const waiting = new Map(pending.map(({ id, ...state }) => [id, state]));
  return { ...store, items: store.items.filter((i) => !done.includes(i.id)).map((i) => waiting.has(i.id) ? { ...i, deleting: waiting.get(i.id) } : i) };
}

// querySync treats a closed/timed-out subscription like EOSE. Use a single relay subscription,
// with our deadline earlier than the library's synthetic EOSE timeout, to distinguish real EOSE.
export async function fetchRelay(url, filter, { pool = new SimplePool(), timeout = 8000 } = {}) {
  const events = [];
  try {
    const relay = await within(pool.ensureRelay(url, { connectionTimeout: timeout }), timeout);
    await within(new Promise((yes, no) => relay.subscribe([filter], {
      onevent: (event) => events.push(event), oneose: yes,
      onclose: (reason) => no(new Error(reason)), eoseTimeout: timeout * 2,
    })), timeout);
    return { url: normalizeURL(url), ok: true, events };
  } catch (e) { return { url: normalizeURL(url), ok: false, error: String(e.message ?? e), events }; }
  finally { pool.close([url]); }
}
const newer = (a, b) => !b || a.created_at > b.created_at || (a.created_at === b.created_at && a.id < b.id);
// Keep holders of older versions too: a newer response on B does not erase the copy on A.
export function mineFromRelays(cfg, perRelay, open) {
  const slots = new Map();
  for (const { url, events } of perRelay) for (const event of events) {
    const d = event.tags.find((t) => t[0] === "d")?.[1];
    if (!d) continue;
    const slot = slots.get(d) ?? new Map();
    const relayUrl = normalizeURL(url);
    if (newer(event, slot.get(relayUrl))) slot.set(relayUrl, event);
    slots.set(d, slot);
  }
  const items = [];
  for (const [d, versions] of slots) {
    try {
      const all = [...versions].map(([url, event]) => ({ url, event, p: open(event) })).filter(({ p }) => p.edition === cfg.edition);
      const latest = all.reduce((best, v) => newer(v.event, best?.event) ? v : best, null);
      if (!latest) continue;
      // A tombstone on B must not hide an older response still visible on A after key restore.
      const live = latest.p.deleted ? all.filter(({ p }) => !p.deleted).reduce((best, v) => newer(v.event, best?.event) ? v : best, null) : latest;
      if (!live) continue;
      const { event, p } = live, relayUrls = urls(all.map((v) => v.url));
      const id = p.type === "response" ? "response" : d.split(/:(?:place|price):/)[1];
      if (!id || !["response", "observation", "price"].includes(p.type)) continue;
      const deleting = latest.p.deleted ? { relayUrls, unknown: false, replacement: latest.event,
        acceptedRelays: all.filter((v) => v.event.id === latest.event.id).map((v) => v.url),
        reached: all.filter((v) => v.event.id === latest.event.id).length, of: relayUrls.length } : null;
      items.push({ type: p.type, id, answers: p.answers, updated: event.created_at, event, relays: relayUrls.length, relayUrls, ...(deleting ? { deleting } : {}) });
    } catch {}
  }
  return { items, relays: perRelay.map(({ events, ...status }) => status) };
}
export async function fetchMine(cfg) {
  const sk = secret();
  if (!sk || !cfg.open) return { items: [], relays: [] };
  const known = mine(cfg).items.flatMap((i) => relayTargets(cfg, i));
  const filter = { kinds: [cfg.kind], authors: [getPublicKey(sk)], "#t": [cfg.topic] };
  const perRelay = await Promise.all(urls(cfg.relays, known).map((url) => fetchRelay(url, filter)));
  return mineFromRelays(cfg, perRelay, (event) => JSON.parse(event.content.startsWith("{") ? event.content : decrypt(event.content, getConversationKey(sk, cfg.pubkey))));
}
// Sync never infers erasure from absence. Pending deletions keep their original response,
// replacement and relay identities, even on a complete empty snapshot; retries confirm delivery.
export function mergeMine(cfg, store, snapshot) {
  const merged = new Map(store.items.map((i) => [i.id, i]));
  for (const found of snapshot.items) {
    const local = merged.get(found.id);
    if (!local) { merged.set(found.id, found); continue; }
    let item = local.deleting || !newer(found.event, local.event) ? local : found;
    if (found.deleting && !local.deleting) item = found;
    if (local.deleting && newer(found.event, local.deleting.replacement ?? local.event)) {
      // A newer edit needs a newer replacement; earlier deletion ACKs no longer suffice.
      item = { ...found, deleting: { ...local.deleting, replacement: null, acceptedRelays: [], reached: 0 } };
    }
    merged.set(found.id, { ...item, relays: Math.max(local.relays ?? 0, found.relays ?? 0), relayUrls: urls(relayTargets(cfg, local), found.relayUrls), relayUnknown: unknownRelays(local) });
  }
  return { ...store, items: [...merged.values()] };
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
