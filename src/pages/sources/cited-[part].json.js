// Where each book and each website is cited, for the "cited in" lists on /sources/: cited-books.json
// and cited-sites.json. Each is fetched the first time one of its lists is opened.
//   o: the owners, [address under the site root, title, small line, flag, kind]
//   k: book slug or website domain → [[owner, sections, details]]
// sections: the parts of a country profile that cite it, joined by " · "; details: the chapters
// and pages of a book, or the addresses of a website's pages. Owners come in the order
// countries, history, articles, culture, each sorted by name or date.
import { cites, isBook, bookSlug, domainOf } from "../../lib/citations.js";
import { file } from "../../lib/exports.js";

const KIND_ORDER = { country: 0, history: 1, article: 2, culture: 3 };
const PARTS = {
  books: { key: (x) => isBook(x.s) && bookSlug(x.s.container ?? x.s.title), detail: (s) => [s.container && s.title, s.locator].filter(Boolean).join(", ") },
  sites: { key: (x) => !isBook(x.s) && x.s.url && domainOf(x.s.url), detail: (s) => s.url },
};

export const getStaticPaths = () => Object.keys(PARTS).map((part) => ({ params: { part } }));

export function GET({ params }) {
  const { key, detail } = PARTS[params.part];
  const mine = cites.filter((x) => x.owner && key(x));
  const owners = [...new Set(mine.map((x) => x.owner))].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.order.localeCompare(b.order));
  const index = new Map(owners.map((o, i) => [o, i]));
  const out = {};
  for (const x of mine) {
    const rows = (out[key(x)] ??= new Map());
    const row = rows.get(x.owner) ?? { at: new Set(), details: new Set() };
    x.at.forEach((a) => row.at.add(a));
    const d = detail(x.s);
    if (d) row.details.add(d);
    rows.set(x.owner, row);
  }
  const k = Object.fromEntries(Object.entries(out).map(([name, rows]) => [name,
    [...rows].sort((a, b) => index.get(a[0]) - index.get(b[0])).map(([o, r]) => [index.get(o), [...r.at].join(" · "), [...r.details]]),
  ]));
  return file(JSON.stringify({ o: owners.map((o) => [o.url, o.title, o.sub ?? "", o.flag ?? "", o.kind]), k }), "application/json");
}
