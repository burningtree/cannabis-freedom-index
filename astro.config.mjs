import { defineConfig } from "astro/config";

// Fully static output: one HTML file per page, including one per country.
//
// SITE and BASE_PATH are set by the GitHub Pages workflow (e.g. BASE_PATH="/cannabis-freedom-index"
// for a project site). Locally both are unset and the site is served from "/".
// The base always ends with a slash because links are built as `${base}country/…`.
const base = (process.env.BASE_PATH || "").replace(/\/+$/, "") + "/";

export default defineConfig({
  site: process.env.SITE || undefined,
  base,
});
