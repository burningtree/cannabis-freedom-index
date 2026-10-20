// What the hover previews show (see the script in Base.astro): one file per kind of page, fetched
// the first time a link of that kind is hovered. Keys are the part of the address after the base.
//   country:  country/de/             history: history/<id>/        culture: culture/language/bhang/
import { getImage } from "astro:assets";
import { places, changes, articles, changeDate, REC_LABEL, MED_LABEL, estimateNote } from "../../lib/countries.js";
import { cultureEntries, cultureSection } from "../../lib/culture.js";
import { tierOf, tierColor } from "../../lib/tiers.js";
import { file } from "../../lib/exports.js";

export const getStaticPaths = () => ["country", "history", "culture"].map((kind) => ({ params: { kind } }));

// cut a text at a word boundary
const cut = (t, n) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n)).replace(/[,;:.]$/, "") + "…");

async function build(kind) {
  if (kind === "country") {
    const entries = new Map();
    for (const ch of changes) if (ch.country && !ch.estimate) entries.set(ch.country.slug, (entries.get(ch.country.slug) ?? 0) + 1);
    return Object.fromEntries(places.map((c) => [`country/${c.slug}/`, {
      f: c.flag, n: c.name, r: c.region, s: c.score, c: tierColor(c.raw), t: tierOf(c.raw).name,
      k: c.territory ? null : c.rank, of: places.filter((x) => !x.territory).length,
      rec: [REC_LABEL[c.rec], c.rec], med: [MED_LABEL[c.med], c.med], x: cut(c.note, 230), h: entries.get(c.slug) ?? 0, ...(estimateNote(c) && { fe: estimateNote(c) }),
    }]));
  }
  if (kind === "history") {
    return Object.fromEntries(changes.map((ch) => [`history/${ch.id}/`, {
      d: changeDate(ch), k: `${ch.kind.emoji} ${ch.kind.label}`, p: `${ch.place.flag} ${ch.place.name}${ch.unit ? ` · ${ch.unit.name}` : ""}`, t: ch.title, x: cut(ch.description, 240),
      ...(ch.score && { b: [ch.score.before, tierColor(ch.score.before)], a: [ch.score.after, tierColor(ch.score.after)] }),
      ...(articles.has(ch.id) && { ar: 1 }), cf: [ch.confidence.mark, ch.confidence.label, ch.confidence.key],
    }]));
  }
  const out = {};
  for (const e of cultureEntries) {
    const img = e.image && (await getImage({ src: e.image.src, width: 360, height: 180, fit: "cover", format: "webp" }));
    out[e.url] = {
      sec: cultureSection(e.section).name, t: e.title, o: e.origin ?? null, sp: e.spelling?.[0]?.text.toLowerCase() !== e.title.toLowerCase() ? e.spelling?.[0]?.text ?? null : null,
      x: cut(e.summary, 220), i: img?.src ?? null, fl: e.countries.slice(0, 10).map((c) => c.flag).join(" "), n: e.countries.length,
    };
  }
  return out;
}

export async function GET({ params }) {
  return file(JSON.stringify(await build(params.kind)), "application/json");
}
