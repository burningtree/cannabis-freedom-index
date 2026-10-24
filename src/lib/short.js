// A long text cut to what fits in a hover box: on the home page's map (map-notes.json.js) and on
// a federation's map of its states or provinces (CountryArticle.astro).
const LIMIT = 220;

// The first sentences of a text, as many as fit in about LIMIT characters; a first sentence that
// is longer than that is cut at a word and ends in an ellipsis.
export function short(text) {
  if (!text) return undefined;
  const flat = text.replace(/\s+/g, " ").trim();
  // a sentence ends at . ! or ? followed by a space and a capital, digit or quote, so "7.5 g" stays whole
  const sentences = flat.split(/(?<=[.!?])\s+(?=[A-Z0-9“"'(])/);
  let out = "";
  for (const s of sentences) {
    if (out && out.length + 1 + s.length > LIMIT) break;
    out = out ? `${out} ${s}` : s;
  }
  if (out.length <= LIMIT + 40) return out;
  return out.slice(0, LIMIT).replace(/\s+\S*$/, "") + "…";
}
