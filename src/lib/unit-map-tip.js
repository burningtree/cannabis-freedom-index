// The hover box of a map drawn at build time — a federation's map of its states or provinces
// (CountryArticle.astro), and the world map of a context topic (data-map-tips): the same box as on
// the home page's map. Each one is written into the page beside the map, in a <template>,
// and shown under the pointer. Listened for on the document, so that it also works in a profile
// fetched into the home page's drawer.
let open = null;
const hide = () => {
  if (open) open.hidden = true;
  open = null;
};
document.addEventListener("pointermove", (e) => {
  const a = e.pointerType === "touch" ? null : e.target.closest?.(".unit-map a[data-tip], [data-map-tips] a[data-tip]");
  const figure = a?.closest(".unit-map, [data-map-tips]");
  const tip = figure?.querySelector(".tooltip");
  const content = figure?.querySelector(`template[data-tip-for="${a.dataset.tip}"]`);
  if (!tip || !content) return hide();
  if (tip.dataset.for !== a.dataset.tip) {
    tip.replaceChildren(content.content.cloneNode(true));
    tip.dataset.for = a.dataset.tip;
  }
  if (open !== tip) hide();
  tip.hidden = false;
  open = tip;
  // above the pointer where there is room, below it otherwise; never past the map's edges
  const box = figure.getBoundingClientRect();
  const x = e.clientX - box.left, y = e.clientY - box.top;
  const w = tip.offsetWidth, h = tip.offsetHeight;
  tip.style.left = Math.max(8, Math.min(x + 16, box.width - w - 8)) + "px";
  tip.style.top = (y - h - 14 >= 8 ? y - h - 14 : y + 18) + "px";
}, { passive: true });
document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) hide(); });
