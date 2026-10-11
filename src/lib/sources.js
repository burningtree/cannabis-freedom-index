// Normalise source records for templates, exports and counting. Derived source values remain
// arrays for compatibility: [title, optional URL, formatted bibliography, stable identity].
const names = (xs) => xs?.join(", ") ?? "";

export function sourceBibliography(s) {
  const parts = [];
  if (s.authors?.length) parts.push(names(s.authors));
  if (s.container) {
    const editors = s.editors?.length ? `, edited by ${names(s.editors)}` : "";
    parts.push(`In ${s.container}${editors}`);
  } else if (s.editors?.length) {
    parts.push(`${names(s.editors)}, ed${s.editors.length > 1 ? "s" : ""}.`);
  }
  if (s.publisher) parts.push(s.publisher);
  if (s.year) parts.push(String(s.year));
  if (s.locator) parts.push(s.locator);
  if (s.isbn) parts.push(`ISBN ${s.isbn}`);
  return parts.join(" · ");
}

export function sourceKey(s) {
  return s.url ?? [s.type, s.title, names(s.authors), s.container, s.year, s.locator, s.isbn].filter(Boolean).join("|");
}

export function sourceTuple(s) {
  return [s.title, s.url ?? null, sourceBibliography(s), sourceKey(s)];
}
