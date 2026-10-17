// The world map drawn at build time, for the printable poster (/map/poster/) and its images.
// The same shapes and projection as the map on the home page (HomePage.astro), coloured by each
// country's tier. Each shape's path is returned as a string, so a page can inline it and the
// image renderer can wrap it in an SVG of its own.
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-50m.json";
import territories from "../data/territories.geo.json";
import { places, countries, worldAvg, lastUpdated, formatDate } from "./countries.js";
import { TIERS, tierIndex } from "./tiers.js";

// the tier colours as plain values, as in src/og/render.js (an image has no CSS variables)
export const TIER_HEX = ["#a3121f", "#dc4a2a", "#f08c3a", "#f0cf4a", "#9ccc55", "#2e9e4f"];
export const PAPER = { bg: "#f4f2eb", ink: "#11110f", muted: "#4b4a43", nodata: "#d9d5c8", land: "#e6e2d6" };

const byId = new Map(places.map((c) => [c.id, c]));
const byNum = new Map(places.filter((c) => c.num != null).map((c) => [c.num, c]));
// atlas shapes that take another entry's score, as on the home page
const ALIASES = { Kosovo: "XK", Somaliland: "XS", "N. Cyprus": "XN" };
const ANTARCTICA = "010";

const shapes = feature(world, world.objects.countries).features.map((f) => {
  const alias = ALIASES[f.properties.name] || ALIASES[+f.id];
  return { f, c: alias ? byId.get(alias) : byNum.get(+f.id), antarctica: f.id === ANTARCTICA };
});
// disputed territories the atlas has no shape for, drawn last, on top
shapes.push(...territories.features.map((f) => ({ f, c: byId.get(f.id) })).filter((s) => s.c));

const land = shapes.filter((s) => !s.antarctica);
// the box the map fits: its aspect ratio, so callers can size a frame for it
export const MAP_RATIO = (() => {
  const [[x0, y0], [x1, y1]] = geoPath(geoNaturalEarth1()).bounds({ type: "FeatureCollection", features: land.map((s) => s.f) });
  return (x1 - x0) / (y1 - y0);
})();

// width × height: the box the land (without Antarctica) is fitted into; `digits`, the decimals
// kept in the paths (none is plenty for a page, and keeps it light)
export function worldMap(width, height, digits = 1) {
  const projection = geoNaturalEarth1().fitSize([width, height], { type: "FeatureCollection", features: land.map((s) => s.f) });
  const path = geoPath(projection).digits(digits);
  const fill = (c) => (c ? TIER_HEX[tierIndex(c.raw)] : PAPER.nodata);
  // a scored place too small to see at this size (Singapore, Malta, the islands) also gets a dot
  const tiny = Math.max(4, (width * height) / 60000);
  const dots = land.filter((s) => s.c && path.area(s.f) < tiny).map((s) => {
    const [x, y] = path.centroid(s.f);
    return { x: +x.toFixed(1), y: +y.toFixed(1), fill: fill(s.c), c: s.c };
  }).filter((d) => Number.isFinite(d.x));
  return {
    shapes: land.map((s) => ({ d: path(s.f), fill: fill(s.c), c: s.c })).filter((s) => s.d),
    dots,
    r: Math.max(2, width / 520),
  };
}

// The map as a standalone SVG document, for the PNG images.
export function worldMapSvg(width, height) {
  const m = worldMap(width, height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`
    + m.shapes.map((s) => `<path d="${s.d}" fill="${s.fill}" stroke="${PAPER.bg}" stroke-width="0.5" stroke-linejoin="round"/>`).join("")
    + m.dots.map((d) => `<circle cx="${d.x}" cy="${d.y}" r="${m.r}" fill="${d.fill}" stroke="${PAPER.bg}" stroke-width="0.8"/>`).join("")
    + "</svg>";
}

// What the poster says beside the map: the tiers with how many countries are in each (the best
// first), the `n` most and least free, the world average and the date of the data.
export function posterFacts(n = 5) {
  const tiers = TIERS.map((t, i) => {
    const k = TIERS.length - 1 - i;
    const hi = i ? TIERS[i - 1].min - 1 : 100;
    return { name: t.name, range: `${t.min}–${hi}`, color: TIER_HEX[k], count: countries.filter((c) => tierIndex(c.raw) === k).length };
  });
  const row = (c) => ({ c, rank: c.rank, name: c.name, score: c.score, color: TIER_HEX[tierIndex(c.raw)] });
  return {
    tiers,
    top: countries.slice(0, n).map(row),
    bottom: countries.slice(-n).map(row),
    avg: worldAvg.toFixed(1),
    total: countries.length,
    date: formatDate(lastUpdated),
  };
}
