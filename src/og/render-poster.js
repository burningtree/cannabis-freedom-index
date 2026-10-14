// Draws the map poster images (/map/poster/<size>.png) at build time, like render.js draws the
// social previews but at sizes of their own, from src/og/poster.astro. Kept apart from
// render.js because every image that file draws is cached under a hash of the file itself.
import { readFileSync } from "node:fs";
import path from "node:path";
import { satoriAstro } from "x-satori/astro";
import { Resvg } from "@resvg/resvg-js";

const ROOT = process.cwd();
const font = (pkg, file) => readFileSync(path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file));
const fonts = [
  ["Instrument Serif", "instrument-serif", 400], ["Inter", "inter", 400], ["Inter", "inter", 600], ["JetBrains Mono", "jetbrains-mono", 400], ["JetBrains Mono", "jetbrains-mono", 500],
].flatMap(([name, pkg, weight]) => ["latin", "latin-ext"].map((set) => ({ name, data: font(pkg, `${pkg}-${set}-${weight}-normal.woff`), weight, style: "normal" })));

// The map goes through the template as this one-pixel stand-in and is put into the finished SVG
// afterwards: satori would take long to parse a megabyte of base64 in the template's HTML.
const STAND_IN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// The text reaches satori as HTML, where ' and & arrive as entities it draws letter for letter
// ("d&#39;Ivoire"), so they go in as their typographic forms, as in render.js.
const plain = (v, key) => key === "flag" ? v : typeof v === "string" ? v.replace(/'/g, "\u2019").replace(/ & /g, " and ").replace(/&/g, "+")
  : Array.isArray(v) ? v.map((x) => plain(x)) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plain(x, k)])) : v;

export async function renderPoster(props, map, width, height) {
  const source = readFileSync(path.join(ROOT, "src", "og", "poster.astro"), "utf8");
  const svg = (await satoriAstro({ width, height, fonts, props: { ...plain(props), map: STAND_IN } }, source)).replaceAll(STAND_IN, map);
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}
