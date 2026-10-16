// Fetches the covers of the books the index cites, for the Books list on /sources/.
//   node scripts/book-covers.cjs           fetch the covers that are still missing
//   node scripts/book-covers.cjs --list    only print which books have a cover and which do not
// Covers come from Open Library (by ISBN, else by title and author) and are saved as
// src/assets/book-covers/<slug>.jpg, where the page finds them by the same slug. A book without
// one gets a printed-style cover drawn by the page. A wrong cover is fixed by replacing or
// deleting its file; a deleted one is fetched again on the next run unless listed in SKIP.
// Some covers were taken by hand from the EPUBs in the private books/ folder (Global Histories,
// Cannabis: non solo fumo, História da maconha no Brasil, The Flowers of Good), 180 pixels wide.
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/assets/book-covers");
// books whose only cover found is wrong or blank, and that are better with the drawn cover
const SKIP = new Set(["cannabis-britannica-empire-trade-and-prohibition-1800-1928"]);

// the same slug as bookSlug() in src/pages/sources/index.astro
const slug = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

// every source in the countries, the history and the articles, found by its shape
function sourcesIn(node, out = []) {
  if (Array.isArray(node)) node.forEach((x) => sourcesIn(x, out));
  else if (node && typeof node === "object") {
    if (typeof node.title === "string" && (node.type === "book" || node.type === "chapter")) out.push(node);
    else Object.values(node).forEach((x) => sourcesIn(x, out));
  }
  return out;
}
const files = [
  ...fs.readdirSync(path.join(ROOT, "countries"), { recursive: true }).filter((f) => f.endsWith(".yaml")).map((f) => path.join(ROOT, "countries", f)),
  path.join(ROOT, "changes.yaml"),
  ...fs.readdirSync(path.join(ROOT, "articles")).filter((f) => f.endsWith(".md")).map((f) => path.join(ROOT, "articles", f)),
];
const books = new Map(); // slug → { title, isbn, author }
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const data = f.endsWith(".md") ? yaml.load(text.split(/^---$/m)[1] ?? "") : yaml.load(text);
  for (const s of sourcesIn(data)) {
    const title = s.container ?? s.title;
    const b = books.get(slug(title)) ?? { title };
    b.isbn ??= s.isbn;
    b.author ??= (s.container ? s.editors : s.authors)?.[0];
    books.set(slug(title), b);
  }
}

async function fetchCover(b) {
  const tries = [];
  if (b.isbn) tries.push(`https://covers.openlibrary.org/b/isbn/${b.isbn.replace(/[^0-9X]/gi, "")}-M.jpg?default=false`);
  const q = new URLSearchParams({ title: b.title.replace(/\s*\(.*?\)\s*$/, "").split(":")[0], limit: "1", fields: "cover_i,title" });
  if (b.author) q.set("author", b.author.split(" ").pop());
  const found = await fetch(`https://openlibrary.org/search.json?${q}`).then((r) => r.json()).catch(() => null);
  if (found?.docs?.[0]?.cover_i) tries.push(`https://covers.openlibrary.org/b/id/${found.docs[0].cover_i}-M.jpg?default=false`);
  for (const url of tries) {
    const r = await fetch(url, { redirect: "follow" });
    const type = r.headers.get("content-type") ?? "";
    if (!r.ok || !type.startsWith("image/")) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 2000) return buf; // Open Library's empty placeholder is a few hundred bytes
  }
  return null;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const listOnly = process.argv.includes("--list");
  for (const [s, b] of [...books].sort((x, y) => x[1].title.localeCompare(y[1].title))) {
    const file = path.join(OUT, `${s}.jpg`);
    if (fs.existsSync(file)) { console.log(`have     ${b.title}`); continue; }
    if (listOnly || SKIP.has(s)) { console.log(`drawn    ${b.title}`); continue; }
    const buf = await fetchCover(b);
    if (buf) fs.writeFileSync(file, buf);
    console.log(`${buf ? "fetched " : "none    "} ${b.title}`);
  }
})();
