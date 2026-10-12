// Builds the city lists the survey form suggests from:  node scripts/survey-cities.cjs [world-cities.csv]
// Source: https://github.com/datasets/world-cities (cities above 15,000 inhabitants, from GeoNames,
// CC BY 4.0). Without a file the list is fetched from GitHub. One small file per country of the
// index is written to public/survey-cities/<ID>.json as [[city, state or region], …], and the
// form loads the one for the country a respondent has picked. Run it again to refresh the lists.
//
// Parts of cities are left out (Bohnice is Prague, not a place of its own). The dataset does not
// say which entries those are, but GeoNames does: survey/city-districts.json lists the ids it
// marks as a section of a city, a historical place or an abandoned one. To refresh that list,
// unzip https://download.geonames.org/export/dump/cities15000.zip and add
//   --geonames path/to/cities15000.txt
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.join(__dirname, "..");
const URL = "https://raw.githubusercontent.com/datasets/world-cities/main/data/world-cities.csv";
// names the dataset uses that differ from the names in /countries
const ALIAS = {
  "Czech Republic": "Czechia", "Russian Federation": "Russia", "Ivory Coast": "Côte d'Ivoire", "Cote d'Ivoire": "Côte d'Ivoire",
  "Republic of the Congo": "Congo", "Congo Republic": "Congo", "DR Congo": "DR Congo", "Democratic Republic of the Congo": "DR Congo",
  "Macedonia": "North Macedonia", "Swaziland": "Eswatini", "Cape Verde": "Cabo Verde", "East Timor": "Timor-Leste",
  "Burma": "Myanmar", "The Gambia": "Gambia", "The Bahamas": "Bahamas", "Türkiye": "Turkey", "Turkiye": "Turkey",
  "Vatican": "Vatican City", "Palestinian Territory": "Palestine", "State of Palestine": "Palestine", "Brunei Darussalam": "Brunei",
  "Lao People's Democratic Republic": "Laos", "Syrian Arab Republic": "Syria", "Korea, Republic of": "South Korea", "Micronesia": "Micronesia",
  "Sao Tome and Principe": "São Tomé and Príncipe", "Saint Kitts and Nevis": "Saint Kitts and Nevis", "Viet Nam": "Vietnam",
};

// the dataset's formal names for countries of the index, straight to their ids
const ID = {
  "Iran, Islamic Republic of": "IR", "Tanzania, United Republic of": "TZ", "Venezuela, Bolivarian Republic of": "VE",
  "Congo, The Democratic Republic of the": "CD", "Korea, Democratic People's Republic of": "KP", "Taiwan, Province of China": "TW",
  "Palestine, State of": "PS", "Bolivia, Plurinational State of": "BO", "Moldova, Republic of": "MD", "Micronesia, Federated States of": "FM",
  "No country found for alpha-2 code: XK": "XK", "Holy See (Vatican City State)": "VA",
};

// a line of the CSV: commas inside quotes belong to the value
function split(line) {
  const out = []; let cur = "", quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (quoted && line[i + 1] === '"') { cur += '"'; i++; } else quoted = !quoted; }
    else if (ch === "," && !quoted) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  return [...out, cur];
}

(async () => {
  const args = process.argv.slice(2);
  const districtsFile = path.join(ROOT, "survey", "city-districts.json");
  if (args.includes("--geonames")) {
    // column 1 is the id, column 8 the feature code: PPLX a section of a populated place,
    // PPLH historical, PPLQ abandoned, PPLW destroyed
    const rows = fs.readFileSync(args[args.indexOf("--geonames") + 1], "utf8").split("\n").map((l) => l.split("\t"));
    const marked = rows.filter((r) => ["PPLX", "PPLH", "PPLQ", "PPLW"].includes(r[7])).map((r) => +r[0]);
    // GeoNames also lists some districts as ordinary places (Řepy and Stodůlky in Prague). Those
    // are caught where a region is in effect one city: a place of 300,000 or more that holds
    // three quarters of the region's listed population swallows the others within 20 km of it.
    // Regions with several real cities (Madrid, Tokyo, São Paulo state) fall outside the rule.
    const km = (a, b) => { const R = Math.PI / 180, x = (b[5] - a[5]) * R * Math.cos(((+a[4] + +b[4]) / 2) * R), y = (b[4] - a[4]) * R; return Math.sqrt(x * x + y * y) * 6371; };
    const groups = {};
    for (const r of rows.filter((r) => r.length > 14 && !marked.includes(+r[0]))) (groups[`${r[8]}.${r[10]}`] ??= []).push(r);
    const swallowed = [];
    for (const g of Object.values(groups)) {
      const big = g.reduce((a, b) => (+b[14] > +a[14] ? b : a)), total = g.reduce((a, r) => a + +r[14], 0);
      if (g.length > 1 && +big[14] >= 300000 && +big[14] / total >= 0.75) for (const r of g) if (r !== big && km(big, r) <= 20) swallowed.push(+r[0]);
    }
    const ids = [...new Set([...marked, ...swallowed])].sort((a, b) => a - b);
    console.log(`districts: ${marked.length} marked by GeoNames, ${swallowed.length} more inside one-city regions`);
    fs.writeFileSync(districtsFile, JSON.stringify(ids));
    console.log(`districts: ${ids.length} ids → survey/city-districts.json`);
  }
  const districts = new Set(fs.existsSync(districtsFile) ? JSON.parse(fs.readFileSync(districtsFile, "utf8")) : []);
  const file = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--geonames");
  const csv = file ? fs.readFileSync(file, "utf8") : await (await fetch(URL)).text();
  const idOf = {}; // country name → id
  for (const f of fs.readdirSync(path.join(ROOT, "countries"))) {
    const p = f.endsWith(".yaml") ? path.join(ROOT, "countries", f) : path.join(ROOT, "countries", f, "index.yaml");
    if (fs.existsSync(p) && fs.statSync(p).isFile()) idOf[yaml.load(fs.readFileSync(p, "utf8")).name] = f.replace(/\.yaml$/, "").toUpperCase();
  }
  const known = new Set(Object.values(idOf));
  const cities = {}, unknown = {};
  let skipped = 0;
  for (const line of csv.split(/\r?\n/).slice(1).filter(Boolean)) {
    const [name, country, sub, geonameid] = split(line);
    if (districts.has(+geonameid)) { skipped++; continue; }
    const id = idOf[country] ?? idOf[ALIAS[country]] ?? (known.has(ID[country]) ? ID[country] : undefined);
    if (!id) { unknown[country] = (unknown[country] ?? 0) + 1; continue; }
    (cities[id] ??= []).push([name, sub]);
  }
  const dir = path.join(ROOT, "public", "survey-cities");
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  let total = 0;
  for (const [id, list] of Object.entries(cities)) {
    list.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
    fs.writeFileSync(path.join(dir, `${id}.json`), JSON.stringify(list));
    total += list.length;
  }
  console.log(`cities: ${total} in ${Object.keys(cities).length} countries → public/survey-cities/ (${skipped} parts of cities left out)`);
  const missed = Object.entries(unknown).sort((a, b) => b[1] - a[1]);
  if (missed.length) console.log(`not in the index (${missed.reduce((a, [, n]) => a + n, 0)} cities): ${missed.map(([c, n]) => `${c} ${n}`).join(", ")}`);
  const without = Object.values(idOf).filter((id) => !cities[id]);
  if (without.length) console.log(`countries of the index with no city in the list: ${without.sort().join(", ")}`);
})();
