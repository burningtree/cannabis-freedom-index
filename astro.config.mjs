import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import icon from "astro-icon";
import { markTerms } from "./src/lib/terms.js";

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

// Words for cannabis and jargon in articles and culture entries, marked once per text as the page
// is built (src/lib/terms.js): a word with a Culture/Language entry links to it, a glossary word gets
// a dashed underline and its explanation on hover. Links, headings, code and citations are left alone,
// and an atlas entry's own word is not marked on its own page.
function markdownTerms() {
  const SKIP = new Set(["a", "code", "pre", "sup", "h1", "h2", "h3", "h4", "h5", "h6", "figcaption", "button"]);
  return (tree, file) => {
    const src = String(file?.path ?? file?.history?.[0] ?? "").replace(/\\/g, "/");
    const m = src.match(/culture\/(language|traditions|people)\/([^/]+)\.md$/);
    const here = m ? `culture/${m[1]}/${m[2]}/` : "";
    const seen = new Set();
    const walk = (node) => {
      if (node.type === "element" && SKIP.has(node.tagName)) return;
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text") { walk(child); return [child]; }
        const parts = markTerms(child.value, seen, here);
        if (parts.length === 1 && !parts[0].term) return [child];
        return parts.map((w) => !w.term ? { type: "text", value: w.t }
          : w.term.kind === "language"
            ? { type: "element", tagName: "a", properties: { href: base + w.term.url, className: ["term", "term-l"] }, children: [{ type: "text", value: w.t }] }
            : { type: "element", tagName: "span", properties: { className: ["term", "term-g"], tabIndex: 0, role: "button", dataTitle: w.term.title, dataText: w.term.text }, children: [{ type: "text", value: w.t }] });
      });
    };
    walk(tree);
  };
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

// Inline citations in Markdown (articles, culture entries), Wikipedia style: [@2] or [@1,3] marks the
// sources, by their place in the front matter's `sources` list, that support what comes before it.
// Each becomes a superscript number linked to the page's list of references; sources are numbered by
// their first citation. A text with no marks yet cites all its sources after its last paragraph. The
// order is left in the front matter as `citeOrder` for the page that lists the references
// (src/lib/cite.js does the same for texts kept in YAML).
function markdownCitations() {
  const MARK = /\s?\[@([^\]]+)\]/g;
  const sup = (n) => `<sup class="cite"><a href="#ref-${n}" aria-label="Source ${n}">[${n}]</a></sup>`;
  return (tree, file) => {
    const fm = file.data.astro?.frontmatter;
    const count = fm?.sources?.length ?? 0;
    if (!count) return;
    const where = file.history?.[0]?.split("/").slice(-2).join("/") ?? "a Markdown file";
    const order = [];
    const numberOf = (i) => {
      if (!Number.isInteger(i) || i < 1 || i > count) throw new Error(`${where}: the citation [@${i}] names no source (it has ${count})`);
      if (!order.includes(i)) order.push(i);
      return order.indexOf(i) + 1;
    };
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text" || !child.value.includes("[@")) { walk(child); return [child]; }
        const out = [];
        let last = 0;
        for (const m of child.value.matchAll(MARK)) {
          if (m.index > last) out.push({ type: "text", value: child.value.slice(last, m.index) });
          out.push({ type: "html", value: m[1].split(",").map((x) => sup(numberOf(Number(x.trim())))).join("") });
          last = m.index + m[0].length;
        }
        if (last < child.value.length) out.push({ type: "text", value: child.value.slice(last) });
        return out;
      });
    };
    walk(tree);
    if (order.length) {
      const missing = Array.from({ length: count }, (_, i) => i + 1).filter((i) => !order.includes(i));
      if (missing.length) throw new Error(`${where}: cites inline but never cites ${missing.map((i) => `[@${i}]`).join(", ")}`);
    } else {
      // not yet cited inline: all the sources after the last paragraph
      const paragraphs = tree.children.filter((n) => n.type === "paragraph" && !(n.children.length === 1 && n.children[0].type === "image"));
      const target = paragraphs.at(-1);
      for (let i = 1; i <= count; i++) order.push(i);
      if (target) target.children.push({ type: "html", value: order.map((i) => sup(i)).join("") });
    }
    fm.citeOrder = order;
  };
}

export default defineConfig({
  // also the address used in canonical links, the sitemap and structured data
  site: process.env.SITE || "https://cannabisfreedom.fyi",
  base,
  // exhibitions moved from culture/exhibitions/ to exhibitions/, and each one to the shortest address, <slug>/
  redirects: { "/culture/exhibitions": "/exhibitions", "/culture/exhibitions/reefer-madness": "/reefer-madness" },
  // Icons are Iconoir (https://iconoir.com/), through astro-icon and Iconify: `<Icon name="iconoir:…" />`
  // inlines the SVG at build time, so only the icons a page uses end up in it.
  integrations: [icon()],
  markdown: {
    processor: unified({ remarkPlugins: [markdownFigures, markdownCitations], rehypePlugins: [markdownLinks, markdownTerms] }),
  },
  // pictures in Markdown get a set of widths, so a phone does not download the 1280-pixel file
  image: { layout: "constrained" },
  // A build keeps its own Vite cache. Sharing the dev server's would wipe the dependencies the
  // running dev server has prepared (Fuse, nostr-tools), and its lazy imports would then fail
  // until it is restarted.
  vite: {
    cacheDir: process.argv.includes("build") ? "node_modules/.vite-build" : "node_modules/.vite",
    server: { watch: { ignored: ["**/tmp/**"] } },
  },
});
