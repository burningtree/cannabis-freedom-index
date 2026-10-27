// The term layer: words a reader may not know, marked in running text when the pages are built.
// The source texts are not changed. Two kinds:
//   language: a word for cannabis with an entry in Culture/Language (bhang, dagga): it links to the
//             entry, which brings the usual preview card
//   glossary: jargon from glossary.yaml (decriminalised, per se limit): a dashed word that shows
//             its explanation on hover, focus or tap (the small script in src/layouts/Base.astro)
// Each word is marked once per page, where it first appears. Used by Cited.astro (profile sections,
// history entries) and by the Markdown plugin in astro.config.mjs (articles, atlas entries).
// Reads the files directly, so the Markdown plugin, which runs outside Astro's collections, can use it.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
// language entries too common to mark, and forms of the others that are everyday words
const SKIP_ENTRIES = new Set(["cannabis", "hemp", "grass", "pot", "joint", "dope", "marijuana"]);
const SKIP_FORMS = new Set(["bang", "hemp", "hanf", "flower", "jay", "j", "tea", "viper", "hybrid", "weed", "hash", "accession",
  "novel food", "hemp extract", "doped", "dispo", "maría", "juana", "pacheco", "toque", "churro", "grifo", "moto", "beng", "sır",
  "ciga", "chimique", "candia", "hindu kush", "roach", "mezz", "d8", "geras", "alaf", "sensi", "sinse"]);
const clean = (w) => String(w).replace(/\s*\(.*\)$/, "").trim();

function load() {
  const dir = path.join(ROOT, "culture", "language");
  const language = readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const fm = yaml.load(readFileSync(path.join(dir, f), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "") ?? {};
    const slug = f.slice(0, -3);
    return { slug, title: clean(fm.title ?? slug), url: `culture/language/${slug}/`, forms: [fm.title, ...(fm.also ?? [])] };
  }).filter((e) => !SKIP_ENTRIES.has(e.slug));
  const glossary = (yaml.load(readFileSync(path.join(ROOT, "glossary.yaml"), "utf8")) ?? []).map((g) => ({ title: g.id, text: g.text, forms: [g.id, ...(g.also ?? [])] }));
  // every form once, to the first entry that claims it as its own title, else to the first that lists it
  const owner = new Map();
  const titles = new Set(language.map((e) => e.title.toLowerCase()));
  const add = (form, item) => {
    const w = clean(form ?? "");
    if (w.length < 2 || SKIP_FORMS.has(w.toLowerCase())) return;
    const key = w.length < 4 ? w : w.toLowerCase();
    if (titles.has(w.toLowerCase()) && item.kind === "language" && item.title.toLowerCase() !== w.toLowerCase()) return;
    if (!owner.has(key)) owner.set(key, { w, item });
  };
  language.forEach((e) => e.forms.forEach((f) => add(f, { kind: "language", key: `l:${e.slug}`, title: e.title, url: e.url })));
  glossary.forEach((g) => g.forms.forEach((f) => add(f, { kind: "glossary", key: `g:${g.title}`, title: g.title, text: g.text })));
  const all = [...owner.values()].sort((a, b) => b.w.length - a.w.length);
  const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // forms of four letters or more match in any case; shorter ones (CBD, 420) only as written
  const long = all.filter((x) => x.w.length >= 4).map((x) => esc(x.w)), short = all.filter((x) => x.w.length < 4).map((x) => esc(x.w));
  const edge = "(^|[^\\p{L}\\p{N}])", end = "(?![\\p{L}\\p{N}])";
  return {
    owner,
    res: [long.length && new RegExp(`${edge}(${long.join("|")})${end}`, "giu"), short.length && new RegExp(`${edge}(${short.join("|")})${end}`, "gu")].filter(Boolean),
  };
}
let cache = null;
const terms = () => (cache ??= load());

// A plain text split into parts: { t } plain, { t, term } a marked word, where term is
// { kind: "language", url, title } or { kind: "glossary", title, text }. `seen` holds the keys of
// the words already marked on this page; `here` is the page's own path ("culture/language/bhang/"),
// whose own word is not marked.
export function markTerms(text, seen, here = "") {
  const { owner, res } = terms();
  const parts = [];
  let rest = text ?? "";
  for (;;) {
    let best = null;
    for (const re of res) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(rest))) {
        const hit = owner.get(m[2].length < 4 ? m[2] : m[2].toLowerCase());
        if (hit && !seen.has(hit.item.key) && hit.item.url !== here) {
          const at = m.index + m[1].length;
          if (!best || at < best.at) best = { at, form: m[2], item: hit.item };
          break;
        }
      }
    }
    if (!best) break;
    seen.add(best.item.key);
    if (best.at > 0) parts.push({ t: rest.slice(0, best.at) });
    parts.push({ t: best.form, term: best.item });
    rest = rest.slice(best.at + best.form.length);
  }
  if (rest) parts.push({ t: rest });
  return parts;
}
