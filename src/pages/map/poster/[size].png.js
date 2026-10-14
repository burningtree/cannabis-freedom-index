// The world map as an image to share, in three sizes: /map/poster/wide.png (1600 × 900, for
// X, LinkedIn and slides), square.png (1080 × 1080) and portrait.png (1080 × 1350, for
// Instagram). Drawn by src/og/render-poster.js from src/og/poster.astro.
import { DATA_SNAPSHOT } from "../../../lib/countries.js";
import { worldMapSvg, posterFacts, MAP_RATIO } from "../../../lib/world-map.js";
import { flagOf } from "../../../og/render.js";
import { renderPoster } from "../../../og/render-poster.js";

export const SIZES = {
  wide: { W: 1600, H: 900, wide: true, mapH: 560, rows: 0 },
  square: { W: 1080, H: 1080, wide: false, mapH: 385, rows: 5 },
  portrait: { W: 1080, H: 1350, wide: false, mapH: 500, rows: 8 },
};

export function getStaticPaths() {
  return Object.keys(SIZES).map((size) => ({ params: { size } }));
}

export async function GET({ params, site }) {
  const { W, H, wide, mapH: maxH, rows } = SIZES[params.size];
  const pad = wide ? 56 : 52;
  // the map as large as fits the space left for it, in its own proportions
  const mapW = Math.round(Math.min(W - 2 * pad, maxH * MAP_RATIO));
  const mapH = Math.round(mapW / MAP_RATIO);
  // drawn at twice the size, so the borders stay fine when the image is scaled
  const svg = worldMapSvg(mapW * 2, mapH * 2);
  const f = posterFacts(rows || 5);
  const host = new URL(site).host.toUpperCase();
  const png = await renderPoster({
    W, H, wide, mapW, mapH,
    eyebrow: `CANNABIS FREEDOM INDEX · ${DATA_SNAPSHOT} EDITION`,
    title: "How free is cannabis?",
    sub: `${f.total} countries scored from 0 to 100 for how free you are to carry, grow, share and use it.`,
    tiers: f.tiers.map((t) => ({ ...t, count: `${t.count} ${t.count === 1 ? "country" : "countries"}` })),
    top: f.top.map(({ c, ...r }) => ({ ...r, flag: flagOf(c.id) })),
    bottom: f.bottom.map(({ c, ...r }) => ({ ...r, flag: flagOf(c.id) })),
    avg: f.avg,
    site: host,
    note: `DATA AS OF ${f.date.toUpperCase()} · ${host}/MAP/`,
  }, `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, W, H);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
}
