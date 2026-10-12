// Draws the social preview images (Open Graph, 1200 × 630 PNG) at build time.
// x-satori turns one of the .astro templates beside this file into SVG with satori, and resvg
// turns the SVG into a PNG. Fonts are the site's own, read from the @fontsource packages; flags
// come from flag-icons, since satori cannot draw flag emoji.
import { readFile } from "node:fs/promises";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { satoriAstro } from "x-satori/astro";
import { Resvg } from "@resvg/resvg-js";

const ROOT = process.cwd();
const font = (pkg, file) => readFileSync(path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file));
// the Latin files first, then Latin Extended for names such as Łódź or Türkiye
const fonts = [
  ["Instrument Serif", "instrument-serif", 400], ["Inter", "inter", 400], ["Inter", "inter", 600], ["JetBrains Mono", "jetbrains-mono", 400], ["JetBrains Mono", "jetbrains-mono", 500],
].flatMap(([name, pkg, weight]) => ["latin", "latin-ext"].map((set) => ({ name, data: font(pkg, `${pkg}-${set}-${weight}-normal.woff`), weight, style: "normal" })));
const templates = new Map();
const template = async (name) => {
  if (!templates.has(name)) templates.set(name, await readFile(path.join(ROOT, "src", "og", `${name}.astro`), "utf8"));
  return templates.get(name);
};

// the tier colours of the dark theme, as plain values (satori knows no CSS variables)
export const TIER_HEX = ["#a3121f", "#dc4a2a", "#f08c3a", "#f0cf4a", "#9ccc55", "#2e9e4f"];

// a country's flag as an image address satori can embed; nothing for places without one
const flags = new Map();
export function flagOf(id) {
  const code = id.toLowerCase();
  if (!flags.has(code)) {
    const file = path.join(ROOT, "node_modules", "flag-icons", "flags", "4x3", `${code}.svg`);
    flags.set(code, existsSync(file) ? `data:image/svg+xml;base64,${readFileSync(file).toString("base64")}` : null);
  }
  return flags.get(code);
}

// Drawing 1,500 images takes minutes, and between two builds almost none of them change. Each
// finished image is kept in .cache/og (git-ignored; the deploy workflow saves and restores it) under a hash of everything that went into
// it (the template, the props, this file), and reused while that hash stays the same.
const CACHE = path.join(ROOT, ".cache", "og");
const self = readFileSync(new URL(import.meta.url));
// The template's text reaches satori as HTML, where ' " & < > arrive as entities that satori
// draws letter for letter ("d&#39;Ivoire"). Typographic forms of the same characters pass through.
const plain = (v) => typeof v === "string" ? v.replace(/'/g, "\u2019").replace(/"([^"]*)"/g, "\u201C$1\u201D").replace(/"/g, "\u201D").replace(/ & /g, " and ").replace(/&/g, "+").replace(/</g, "\u2039").replace(/>/g, "\u203A")
  : Array.isArray(v) ? v.map(plain) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "flag" ? x : plain(x)])) : v;

export async function renderOg(kind, rawProps) {
  const props = plain(rawProps);
  const source = await template(kind);
  const file = path.join(CACHE, `${createHash("sha1").update(self).update(source).update(JSON.stringify(props)).digest("hex")}.png`);
  if (existsSync(file)) return readFileSync(file);
  const svg = await satoriAstro({ width: 1200, height: 630, fonts, props }, source);
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(file, png);
  return png;
}
