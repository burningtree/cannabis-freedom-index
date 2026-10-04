import { defineConfig } from "astro/config";

// Fully static output: one HTML file per page, including one per country.
//
// SITE and BASE_PATH are set by the GitHub Pages workflow from the repository's Pages settings.
// The site lives at https://cannabisfreedom.fyi/, so BASE_PATH is empty there; it would be
// "/cannabis-freedom-index" on the default github.io address. Locally both are unset.
// The base always ends with a slash because links are built as `${base}country/…`.
const base = (process.env.BASE_PATH || "").replace(/\/+$/, "") + "/";

export default defineConfig({
  site: process.env.SITE || undefined,
  base,
});
