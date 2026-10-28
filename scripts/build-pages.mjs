// A real Astro build of selected URL prefixes, with the full tests and content sync.
// node scripts/build-pages.mjs country/de history/germany-cannabis-act-2024
// Output is deliberately separate from the deployable dist/ tree.
import { spawnSync } from "node:child_process";
import { build } from "astro";

const prefixes = process.argv.slice(2).map((s) => `/${s.replace(/^\/+|\/+$/g, "")}`);
if (!prefixes.length || prefixes.some((s) => /[?#*]|\.\./.test(s))) {
  console.error("Usage: node scripts/build-pages.mjs <URL prefix> [more prefixes]\nExample: node scripts/build-pages.mjs country/de history/germany-cannabis-act-2024");
  process.exit(1);
}
if (process.env.CI) throw new Error("Selected-page builds are for local review. CI must build the complete site.");
const test = spawnSync("npm", ["test"], { stdio: "inherit" });
if (test.status !== 0) process.exit(test.status ?? 1);

const base = (process.env.BASE_PATH || "").replace(/^\/+|\/+$/g, "");
await build({
  outDir: "./.cache/page-review/",
  integrations: [{
    name: "selected-page-review",
    hooks: {
      "astro:build:start": ({ setPrerenderer }) => {
        setPrerenderer((renderer) => ({
          ...renderer,
          async getStaticPaths() {
            const result = await renderer.getStaticPaths();
            const all = Array.isArray(result) ? result : result.paths;
            const matched = new Set();
            const paths = all.filter(({ pathname }) => {
              const url = `/${pathname.replace(/^\/+|\/+$/g, "")}`;
              let keep = false;
              for (const prefix of prefixes) {
                const target = base ? `/${base}${prefix === "/" ? "" : prefix}` : prefix;
                if (url === target || (prefix !== "/" && url.startsWith(`${target}/`))) {
                  matched.add(prefix);
                  keep = true;
                }
              }
              return keep;
            });
            const missing = prefixes.filter((p) => !matched.has(p));
            if (missing.length) throw new Error(`No pages matched: ${missing.join(", ")}`);
            console.log(`Reviewing ${paths.length} of ${all.length} outputs.`);
            return Array.isArray(result) ? paths : { ...result, paths };
          },
        }));
      },
    },
  }],
});
console.log("Review HTML: .cache/page-review/ (partial site; use npm run build for deployment and site-wide link/SEO checks).");
