// What is still missing for a country, as a work list for expanding it (docs/EXPAND-COUNTRY.md),
// or a ranking of all countries by how much is missing (docs/EXPAND-COUNTRIES.md).
//
//   node scripts/country-gaps.cjs ke                      one country's work list
//   node scripts/country-gaps.cjs us/ca                   a state or province file
//   node scripts/country-gaps.cjs --rank                  the 25 countries that most need work
//   node scripts/country-gaps.cjs --rank 50 --region Africa
//
// Reads the files directly; run from the project root. The work list names the profile's missing or
// thin context sections and statuses, penalty tables, texts without inline citations, texts resting
// only on Wikipedia, the history by decade with its gaps, entries without a check or an article, and
// the atlas entries that belong to the country. The ranking weighs the same gaps by population and
// marks countries whose files someone has uncommitted changes in ("busy"), which should be skipped.
const fs = require("fs"), path = require("path"), y = require("js-yaml"), { execFileSync } = require("child_process");

const REQUIRED = ["recreational", "medical", "hemp", "production", "consequences"];
const RESEARCHED = ["clubs", "planting", "visitors", "driving", "black_market", "arrests"];
const OPTIONAL = ["culture", "research", "spotlights", "genetics"];
const fileOf = (id) => (fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`);

// loaded once: the history, the articles, the atlas entries by country, the populations
const CHANGES = y.load(fs.readFileSync("changes.yaml", "utf8")) ?? [];
const ARTICLES = new Set(fs.readdirSync("articles").map((f) => f.replace(/\.md$/, "")));
const ATLAS = {};
for (const section of ["language", "traditions", "people"]) {
  for (const f of fs.readdirSync(path.join("culture", section)).filter((x) => x.endsWith(".md"))) {
    const fm = y.load(fs.readFileSync(path.join("culture", section, f), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "") ?? {};
    for (const c of fm.countries ?? []) (ATLAS[c] ??= []).push(`${section}/${f.slice(0, -3)}`);
  }
}
const POP = {};
for (const line of fs.readFileSync("datasets/population.csv", "utf8").trim().split("\n").slice(1)) {
  const [c, yr, n] = line.split(",");
  if (!POP[c] || +yr > POP[c][0]) POP[c] = [+yr, +n];
}
const year = (e) => parseInt(String(e.date), 10);
const THIS_YEAR = new Date().getFullYear();

// Everything missing for one profile file
function gapsOf(id) {
  const file = fileOf(id);
  const p = y.load(fs.readFileSync(file, "utf8"));
  const slug = id.split("/")[0], ctx = p.context ?? {};
  // a state or province file holds its scores and segment texts only; the context is the country's
  const unit = id.includes("/") && !file.endsWith("index.yaml");
  const blocks = [...Object.entries(p.segments ?? {}).map(([k, b]) => [`segments.${k}`, b]),
    ...Object.entries(ctx).flatMap(([k, b]) => (Array.isArray(b) ? b.map((x, i) => [`context.${k}[${i}]`, x]) : [[`context.${k}`, b]]))];
  const wiki = (key) => /wikipedia/i.test(p.sources?.[key]?.title ?? "") || /wikipedia\.org/.test(p.sources?.[key]?.url ?? "");
  const changes = CHANGES.filter((e) => e.country === slug && (!unit || e.subunit === id.split("/")[1] || !e.subunit));
  const dated = changes.filter((e) => year(e)).sort((a, b) => year(a) - year(b));
  const decades = {};
  for (const e of dated) decades[Math.floor(year(e) / 10) * 10] = (decades[Math.floor(year(e) / 10) * 10] ?? 0) + 1;
  const first = dated.length ? year(dated[0]) : null, last = dated.length ? year(dated.at(-1)) : null;
  const empty = [];
  if (first) for (let d = Math.max(1920, Math.floor(first / 10) * 10); d <= 2020; d += 10) if (!decades[d]) empty.push(`${d}s`);
  const atlas = ATLAS[slug] ?? [];
  const scored = (e) => e.before !== undefined && e.before !== null;
  return {
    id, file, unit, name: p.name, region: p.region, updated: String(p.updated ?? "?").slice(0, 10), rec: p.recreational, med: p.medical,
    missingRequired: unit ? [] : REQUIRED.filter((k) => !ctx[k]),
    missingResearched: unit ? [] : RESEARCHED.filter((k) => !ctx[k]),
    missingOptional: unit ? [] : OPTIONAL.filter((k) => !ctx[k]),
    // a state's own sections; the rest are shown from its country
    unitOwn: unit ? Object.keys(ctx) : [],
    unitBorrowed: unit ? [...REQUIRED, ...RESEARCHED].filter((k) => !ctx[k]) : [],
    deathWithoutSection: p.recreational === "death" && !ctx.death_penalty,
    products: !unit && Boolean(ctx.products),
    statuses: ["hemp", "production", "research"].filter((k) => ctx[k] && !ctx[k].status).map((k) => `${k}.status`),
    penalties: ["possession", "cultivation"].filter((k) => p.segments?.[k] && !(typeof p.segments[k] === "object" && p.segments[k].penalties)),
    uncited: blocks.filter(([, b]) => b?.text && !/\[@/.test(b.text)).map(([k]) => k),
    unsourced: blocks.filter(([, b]) => b?.text && !(b.sources ?? []).length).map(([k]) => k),
    wikiOnly: blocks.filter(([, b]) => (b?.sources ?? []).length && b.sources.every(wiki)).map(([k]) => k),
    linked: blocks.filter(([, b]) => /\]\(\//.test(b?.text ?? "")).length, texts: blocks.length,
    entries: changes.length, scoredEntries: changes.filter(scored).length, withArticle: changes.filter((e) => ARTICLES.has(e.id)).length,
    first, last, decades, empty, stale: last !== null && last < THIS_YEAR - 1,
    unchecked: changes.filter((e) => !e.checked && !e.estimate).map((e) => e.id),
    estimates: changes.filter((e) => e.estimate).map((e) => e.id),
    noArticle: changes.filter((e) => !ARTICLES.has(e.id) && scored(e)).map((e) => e.id),
    atlas, unlinkedAtlas: ctx.culture ? atlas.filter((c) => !ctx.culture.text.includes(`/culture/${c}/`)) : [],
    atlasWithoutCulture: !ctx.culture && atlas.length > 0,
    // the words people use for cannabis, shown in the profile's opening (DATA-MAINTENANCE.md, "Words for cannabis")
    words: unit ? null : (p.words ?? []).map((w) => w.word),
  };
}

// How much work a country still needs, before weighing by population
const workOf = (g) => g.missingRequired.length * 4 + g.missingResearched.length * 1.5 + (g.products ? 2 : 0) + g.statuses.length
  + g.penalties.length * 2 + g.uncited.length * 0.3 + g.unsourced.length * 2 + g.wikiOnly.length + (g.deathWithoutSection ? 4 : 0)
  + g.empty.length * 1.5 + (g.stale ? 3 : 0) + (g.entries < 5 ? 5 - g.entries : 0) + g.unchecked.length + g.estimates.length * 2
  + g.noArticle.length * 1.5 + (g.atlasWithoutCulture ? 2 : 0) + g.unlinkedAtlas.length * 0.5 + (g.words && !g.words.length ? 1 : 0);

// files someone has uncommitted changes in: those countries are being worked on now
function busy() {
  try {
    const out = execFileSync("git", ["status", "--porcelain"], { stdio: ["ignore", "pipe", "ignore"] }).toString();
    return new Set(out.split("\n").map((l) => l.slice(3).trim()).filter((f) => f.startsWith("countries/")).map((f) => f.replace(/^countries\//, "").replace(/(\/index)?\.yaml$/, "").split("/")[0]));
  } catch { return new Set(); }
}

function printOne(g) {
  const out = (s = "") => console.log(s);
  const list = (label, items) => out(`  ${label}: ${items.length ? items.join(", ") : "none"}`);
  out(`${g.name} (${g.file}), reviewed ${g.updated}, recreational ${g.rec}, medical ${g.med}`);
  out();
  out("PROFILE");
  if (g.unit) {
    out(`  a state or province file: sections it does not write are shown from countries/${g.id.split("/")[0]}/index.yaml`);
    list("its own context sections", g.unitOwn);
    list("shown from the country (write where the state differs)", g.unitBorrowed);
  }
  if (!g.unit) { list("missing standard sections", g.missingRequired); list("missing researched sections", g.missingResearched); list("optional sections not written", g.missingOptional); }
  if (g.deathWithoutSection) out("  ! recreational is \"death\" but there is no death_penalty section");
  if (g.products) out("  products still present: fold it into recreational, medical and hemp, then delete it");
  list("statuses not set", g.statuses);
  list("penalty tables missing", g.penalties);
  list("texts without inline citations", g.uncited);
  list("texts with no source at all", g.unsourced);
  list("texts resting only on Wikipedia", g.wikiOnly);
  out(`  internal links in texts: ${g.linked} of ${g.texts} texts link to history or culture`);
  out();
  out("HISTORY");
  out(`  ${g.entries} entries, ${g.scoredEntries} that move the score, ${g.withArticle} with an article`);
  if (g.first) {
    out(`  from ${g.first} to ${g.last}`);
    const row = [];
    for (let d = Math.min(1900, Math.floor(g.first / 10) * 10); d <= 2020; d += 10) row.push(`${d}s ${g.decades[d] ?? "—"}`);
    out(`  by decade: ${row.join(" · ")}`);
    list("decades with nothing (look for laws, cases, raids, reports)", g.empty);
    if (g.stale) out(`  ! nothing since ${g.last}: check recent news and law changes`);
  }
  list("not checked against a source", g.unchecked);
  list("estimates (no source yet)", g.estimates);
  list("score-moving entries without an article", g.noArticle);
  out("  more article candidates, ranked: node scripts/article-backlog.cjs --country " + g.id.split("/")[0]);
  out();
  out("CULTURE");
  list("atlas entries for this country", g.atlas);
  if (g.unlinkedAtlas.length) list("atlas entries the culture section does not link", g.unlinkedAtlas);
  if (g.atlasWithoutCulture) out("  ! atlas entries exist but there is no culture section to connect them");
  if (g.words) out(g.words.length ? `  words for cannabis: ${g.words.join(", ")}` : "  ! no words for cannabis yet: add `words` (DATA-MAINTENANCE.md, \"Words for cannabis\")");
}

function printRank(limit, region) {
  const now = busy();
  const ids = fs.readdirSync("countries").map((f) => f.replace(/\.yaml$/, "")).filter((id) => fs.existsSync(fileOf(id)));
  const rows = ids.map(gapsOf).filter((g) => !region || g.region === region).map((g) => {
    const pop = POP[g.id]?.[1] ?? 1e5;
    // more work and more people come first; a log scale keeps small places in view
    return { g, work: workOf(g), priority: workOf(g) * (1 + Math.log10(Math.max(pop, 1e4) / 1e4)), pop, busy: now.has(g.id) };
  }).sort((a, b) => b.priority - a.priority);
  console.log(`${rows.length} ${region ? region + " " : ""}countries; the ${Math.min(limit, rows.length)} that most need work, by gaps weighed by population.`);
  console.log(`Skip the ones marked busy: someone has uncommitted changes in their files. Then run node scripts/country-gaps.cjs <id> for each.\n`);
  for (const { g, work, priority, pop, busy: b } of rows.slice(0, limit)) {
    const bits = [
      g.missingRequired.length && `${g.missingRequired.length} standard sections missing`,
      g.products && "products to fold",
      g.penalties.length && "no penalty tables",
      g.empty.length && `${g.empty.length} empty decades`,
      g.stale && `nothing since ${g.last}`,
      g.entries < 5 && `only ${g.entries} history entries`,
      g.noArticle.length && `${g.noArticle.length} key entries without article`,
      g.wikiOnly.length && `${g.wikiOnly.length} Wikipedia-only texts`,
      g.unchecked.length && `${g.unchecked.length} unchecked`,
    ].filter(Boolean);
    const people = pop >= 1e6 ? `${Math.round(pop / 1e6)}M` : `${Math.round(pop / 1e3)}k`;
    console.log(`${String(Math.round(priority)).padStart(4)}  ${g.id.padEnd(3)} ${g.name.padEnd(28).slice(0, 28)} ${people.padStart(5)}  work ${work.toFixed(0).padStart(2)}${b ? "  BUSY" : ""}`);
    console.log(`        ${bits.join(" · ") || "only small gaps"}`);
  }
}

const args = process.argv.slice(2);
if (args[0] === "--rank") {
  const limit = Number(args.find((a, i) => i > 0 && /^\d+$/.test(a) && args[i - 1] !== "--region")) || 25;
  const ri = args.indexOf("--region");
  printRank(limit, ri >= 0 ? args[ri + 1] : null);
} else if (args[0]) {
  if (!fs.existsSync(fileOf(args[0]))) { console.error(`no profile at countries/${args[0]}.yaml or countries/${args[0]}/index.yaml`); process.exit(1); }
  printOne(gapsOf(args[0]));
} else {
  console.error("usage: node scripts/country-gaps.cjs <id>   |   node scripts/country-gaps.cjs --rank [N] [--region Africa]");
  process.exit(1);
}
