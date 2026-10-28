// The world maps drawn at build time on the context, dataset and region pages (siteMap() in
// world-map.js): zoom and pan by wheel, drag or the + − ⟲ buttons, as on the home page's map, with
// the small countries' dots keeping their size. A map whose coloured places sit in one region
// (Europe, the United States) opens on them, and reset returns there. Imported by a page's script;
// works on every `[data-ctxp-map]` figure.
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import "d3-transition";

for (const figure of document.querySelectorAll("[data-ctxp-map]")) {
  const svg = select(figure.querySelector("svg"));
  const g = svg.select(".ctxp-zoom");
  const [, , w, h] = figure.querySelector("svg").getAttribute("viewBox").split(" ").map(Number);
  const dots = g.selectAll("circle").each(function () { this.dataset.r = this.getAttribute("r"); });
  // the box around the coloured places, if it is much smaller than the world. A country spread
  // over oceans (France with its overseas regions) is left out of the box.
  const boxes = g.selectAll(".has-data").nodes().map((n) => n.getBBox());
  const box = (boxes.filter((b) => b.width < w * 0.12).length ? boxes.filter((b) => b.width < w * 0.12) : boxes)
    .reduce((a, b) => (a ? { x0: Math.min(a.x0, b.x), y0: Math.min(a.y0, b.y), x1: Math.max(a.x1, b.x + b.width), y1: Math.max(a.y1, b.y + b.height) } : { x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height }), null);
  const k = box ? Math.min(6, 0.85 / Math.max((box.x1 - box.x0) / w, (box.y1 - box.y0) / h)) : 1;
  const home = k > 1.6 ? zoomIdentity.translate(w / 2, h / 2).scale(k).translate(-(box.x0 + box.x1) / 2, -(box.y0 + box.y1) / 2) : zoomIdentity;
  const z = zoom().scaleExtent([1, 10]).translateExtent([[0, 0], [w, h]]).on("zoom", (e) => {
    g.attr("transform", e.transform);
    dots.attr("r", function () { return this.dataset.r / Math.sqrt(e.transform.k); });
  });
  svg.call(z);
  z.transform(svg, home);
  const act = { in: () => z.scaleBy(svg.transition().duration(250), 1.8), out: () => z.scaleBy(svg.transition().duration(250), 1 / 1.8), reset: () => z.transform(svg.transition().duration(250), home) };
  figure.querySelectorAll("[data-zoom]").forEach((b) => b.addEventListener("click", act[b.dataset.zoom]));
}
