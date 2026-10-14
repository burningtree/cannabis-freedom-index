import { defineConfig } from "astro/config";

// Fully static output: one HTML file per page, including one per country.
//
// SITE and BASE_PATH are set by the GitHub Pages workflow from the repository's Pages settings.
// The site lives at https://cannabisfreedom.fyi/, so BASE_PATH is empty there; it would be
// "/cannabis-freedom-index" on the default github.io address. Locally both are unset.
// The base always ends with a slash because links are built as `${base}country/…`.
const base = (process.env.BASE_PATH || "").replace(/\/+$/, "") + "/";

// Links written in Markdown (articles, culture entries): one that leaves the site opens in a new
// tab and is marked `ext`, so the stylesheet can give it the arrow-in-a-square sign; one that
// starts with "/" is a page of this site and gets the base path in front.
function markdownLinks() {
  const walk = (node) => {
    if (node.tagName === "a" && typeof node.properties?.href === "string") {
      const href = node.properties.href;
      if (/^https?:\/\//.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
        node.properties.className = [...(node.properties.className ?? []), "ext"];
      } else if (href.startsWith("/") && !href.startsWith("//")) {
        node.properties.href = base + href.slice(1);
      }
    }
    node.children?.forEach(walk);
  };
  return walk;
}

// A picture in Markdown whose title has the form "Caption | Credit | https://link-to-file" becomes
// a figure with that caption and credit underneath. The image itself stays a Markdown image, so
// Astro still finds the local file and optimises it like an <Image />.
function markdownFigures() {
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return (tree) => {
    tree.children = tree.children.flatMap((node) => {
      const img = node.type === "paragraph" && node.children.length === 1 && node.children[0].type === "image" ? node.children[0] : null;
      const parts = img?.title?.split(" | ");
      if (!parts || parts.length !== 3) return [node];
      const [caption, credit, link] = parts;
      img.title = null;
      return [
        { type: "html", value: "<figure>" },
        node,
        { type: "html", value: `<figcaption>${esc(caption)} <span><a href="${esc(link)}" target="_blank" rel="noopener noreferrer">${esc(credit)}</a></span></figcaption></figure>` },
      ];
    });
  };
}

export default defineConfig({
  // also the address used in canonical links, the sitemap and structured data
  site: process.env.SITE || "https://cannabisfreedom.fyi",
  base,
  markdown: { remarkPlugins: [markdownFigures], rehypePlugins: [markdownLinks] },
  // pictures in Markdown get a set of widths, so a phone does not download the 1280-pixel file
  image: { layout: "constrained" },
  // A build keeps its own Vite cache. Sharing the dev server's would wipe the dependencies the
  // running dev server has prepared (Fuse, nostr-tools), and its lazy imports would then fail
  // until it is restarted.
  vite: { cacheDir: process.argv.includes("build") ? "node_modules/.vite-build" : "node_modules/.vite" },
});
