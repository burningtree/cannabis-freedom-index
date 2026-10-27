// Inline citations, Wikipedia style: a text marks where a source supports it with [@n] (the n-th
// source in its own list, for history entries, articles and culture entries) or [@key] (a source key
// of a country file), several at once as [@1,3] or [@bmg, kcang]. The page shows each mark as a
// superscript number, [1], linked to a numbered list of references at the end of the section or
// page; the same source keeps the same number wherever it is cited again.
//
// A text with no marks yet is cited as a whole: its sources' numbers follow its last sentence. Texts
// are moved to per-sentence citations progressively (docs/WRITING.md, Citations).

export const CITE_MARK = /\s?\[@([^\]]+)\]/g;

// A Markdown link in a text, [name](url), to a full URL or a page of this site ("/culture/…").
// A citation mark is never one: its brackets start with "@" and are not followed by "(".
export const LINK_MARK = /\[([^\]@][^\]]*)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g;

// a plain stretch of text split into text and links: [{ t }, { t, href }, …]
export function linkParts(text) {
  const out = [];
  let last = 0;
  for (const m of (text ?? "").matchAll(LINK_MARK)) {
    if (m.index > last) out.push({ t: text.slice(last, m.index) });
    out.push({ t: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < (text ?? "").length) out.push({ t: text.slice(last) });
  return out;
}

// the text without its marks, and its links reduced to their names, for every place that shows it
// as plain text (lists, previews, search)
export const stripCites = (text) => (text ?? "").replace(CITE_MARK, "").replace(LINK_MARK, "$1");

// the keys a text cites, in order of first appearance; null when it has no marks at all
export function citedKeys(text) {
  const keys = [];
  for (const [, inner] of (text ?? "").matchAll(CITE_MARK)) for (const k of inner.split(",").map((x) => x.trim())) if (k && !keys.includes(k)) keys.push(k);
  return keys.length ? keys : null;
}

// A set of numbered references for one section or page. `cite(source)` gives the source its number
// (a new one the first time) and returns it; `list` holds them in order, each with the anchor its
// marks point to. `scope` keeps the anchors of two lists on one page apart.
export function references(scope = "ref") {
  const list = [];
  const at = new Map();
  return {
    scope,
    list,
    cite(source) {
      const id = source[3] ?? source[1] ?? source[0];
      if (!at.has(id)) {
        list.push({ n: list.length + 1, source, id: `${scope}-${list.length + 1}` });
        at.set(id, list.at(-1));
      }
      return at.get(id);
    },
  };
}

// Split a text into plain parts and citation parts for a template: [{ t }, { refs: [{ n, id }] }, ...].
// `resolve(key)` turns a key into a source; `all` lists the keys to cite at the end when the text
// has no marks yet. A key that resolves to nothing is an error, so a typo cannot pass unnoticed.
export function citeParts(text, refs, resolve, all, where = "") {
  const parts = [];
  const push = (keys) => parts.push({ refs: keys.map((k) => {
    const s = resolve(k);
    if (!s) throw new Error(`${where}: the citation [@${k}] names no source`);
    return refs.cite(s);
  }) });
  if (!citedKeys(text)) {
    parts.push({ t: text ?? "" });
    if (all.length) push(all);
    return parts;
  }
  let last = 0;
  for (const m of (text ?? "").matchAll(CITE_MARK)) {
    parts.push({ t: text.slice(last, m.index) });
    push(m[1].split(",").map((x) => x.trim()).filter(Boolean));
    last = m.index + m[0].length;
  }
  parts.push({ t: text.slice(last) });
  // every source of a text that cites inline must be cited somewhere in it
  const used = new Set(citedKeys(text));
  const missing = all.filter((k) => !used.has(String(k)));
  if (missing.length) throw new Error(`${where}: cites inline but never cites ${missing.map((k) => `[@${k}]`).join(", ")}`);
  return parts;
}
