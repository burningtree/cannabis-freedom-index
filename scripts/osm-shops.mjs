// Counts the places tagged shop=cannabis in OpenStreetMap by country, for the osm_shops dataset.
//
//   node scripts/osm-shops.mjs            fetch every such place worldwide, then count
//   node scripts/osm-shops.mjs <file>     count from a saved Overpass answer (JSON)
//
// One Overpass query returns every element tagged shop=cannabis with a point (its centre for a
// building or area). Each point is placed in a country with the same shapes and rules as the
// site's map: the Natural Earth atlas in world-atlas (countries-50m), matched to the country files
// by ISO numeric code with the map's aliases, and the small shapes of Transnistria and Abkhazia
// first. A point off a simplified coastline, or on an island the atlas leaves out, goes to the
// nearest country whose outline passes within 80 km.
// Writes a new edition, datasets/osm-cannabis-shops-<date>.csv; add it to `file` of osm_shops in
// datasets/datasets.yaml, keeping the older ones, so the counts become a series.
// Map data © OpenStreetMap contributors (ODbL). Run from the project root.
import fs from "node:fs";
import { geoContains, geoBounds, geoDistance, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import * as yaml from "js-yaml";

const SERVERS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"];
const QUERY = "[out:json][timeout:360];nwr[shop=cannabis];out center qt;";
const MAP_ALIASES = { Kosovo: "xk", Somaliland: "xs", "N. Cyprus": "xn" }; // as in HomePage.astro
const NEAR_KM = 80; // small islands the atlas leaves out, such as Ko Tao

async function fetchAll() {
  for (let attempt = 0; attempt < 9; attempt++) {
    const url = SERVERS[attempt % SERVERS.length];
    try {
      const r = await fetch(url, { method: "POST", body: new URLSearchParams({ data: QUERY }), headers: { "User-Agent": "cannabis-freedom-index dataset script" }, signal: AbortSignal.timeout(420000) });
      if (r.ok) return r.json();
      console.error(`  ${url}: ${r.status}, trying the next`);
    } catch (err) {
      console.error(`  ${url}: ${err.message}, trying the next`);
    }
    await new Promise((res) => setTimeout(res, 10000 * (attempt + 1)));
  }
  throw new Error("every Overpass server is busy; run again later");
}

const answer = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], "utf8")) : await fetchAll();
const points = answer.elements.map((e) => ({ type: e.type, at: e.type === "node" ? [e.lon, e.lat] : e.center && [e.center.lon, e.center.lat] })).filter((p) => p.at);

// the country files, by ISO numeric code
const byNum = new Map();
for (const f of fs.readdirSync("countries")) {
  const path = f.endsWith(".yaml") ? `countries/${f}` : `countries/${f}/index.yaml`;
  if (!fs.existsSync(path)) continue;
  const d = yaml.load(fs.readFileSync(path, "utf8"));
  if (d.iso_numeric != null) byNum.set(+d.iso_numeric, f.replace(".yaml", ""));
}
const atlas = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const shapes = [
  ...JSON.parse(fs.readFileSync("src/data/territories.geo.json", "utf8")).features.map((f) => ({ f, id: f.id.toLowerCase() })),
  ...feature(atlas, atlas.objects.countries).features.map((f) => ({ f, id: MAP_ALIASES[f.properties.name] ?? byNum.get(+f.id) })),
].filter((s) => s.id);
for (const s of shapes) { s.box = geoBounds(s.f); s.centre = geoCentroid(s.f); }
const inBox = ([x, y], [[x0, y0], [x1, y1]]) => y >= y0 - 0.3 && y <= y1 + 0.3 && (x0 <= x1 ? x >= x0 - 0.3 && x <= x1 + 0.3 : x >= x0 - 0.3 || x <= x1 + 0.3);

const counts = {}, missed = [];
const add = (id, p) => { const c = (counts[id] ??= { shops: 0, points: 0, buildings: 0 }); c.shops++; p.type === "node" ? c.points++ : c.buildings++; };
for (const p of points) {
  const hit = shapes.find((s) => inBox(p.at, s.box) && geoContains(s.f, p.at));
  if (hit) { add(hit.id, p); continue; }
  // off a simplified coastline or on a small island: the nearest outline within 80 km
  let best = null;
  for (const s of shapes.filter((s) => inBox(p.at, s.box))) {
    const coords = s.f.geometry.type === "Polygon" ? [s.f.geometry.coordinates] : s.f.geometry.coordinates;
    for (const poly of coords) for (const ring of poly) for (const v of ring) {
      const km = geoDistance(p.at, v) * 6371;
      if (km < NEAR_KM && (!best || km < best.km)) best = { id: s.id, km };
    }
  }
  if (best) add(best.id, p); else missed.push(p.at);
}

const today = new Date().toISOString().slice(0, 10);
const out = `datasets/osm-cannabis-shops-${today}.csv`;
const rows = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([id, c]) => [id, c.shops, c.points, c.buildings].join(","));
fs.writeFileSync(out, ["country,shops,points,buildings", ...rows].join("\n") + "\n");
console.log(`${points.length} places, ${points.length - missed.length} placed in ${rows.length} countries, written to ${out}`);
if (missed.length) console.log(`${missed.length} not in any country on the map (at sea or in a place the site does not cover), e.g. ${missed.slice(0, 5).map((p) => p.map((v) => v.toFixed(2)).join(" ")).join("; ")}`);
