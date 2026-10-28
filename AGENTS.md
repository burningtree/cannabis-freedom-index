# Notes for agents

This repository is the Cannabis Freedom Index: country profiles (`countries/`), a history of
cannabis law (`changes.yaml`, `articles/`) and a cultural atlas (`culture/`), built with Astro.

- **To expand or research a country**, follow `docs/EXPAND-COUNTRY.md`. Start with
  `node scripts/country-gaps.cjs <id>`.
- **To work through several countries**, follow `docs/EXPAND-COUNTRIES.md`. Start with
  `node scripts/country-gaps.cjs --rank 25` (optionally `--region Africa`).
- **To solve GitHub issues** (bug reports about the data), follow `docs/SOLVE-ISSUES.md`. Start with
  `gh issue list --label bug --state open`.
- Data rules: `docs/DATA-MAINTENANCE.md`. How texts read: `docs/WRITING.md`. Atlas entries:
  `docs/CULTURE.md`.
- Others work here at the same time: check `git status` first, don't touch files with someone
  else's uncommitted changes, and commit only your own files.
- Don't start dev or preview servers. For country/content work and local frontend review, use
  `node scripts/build-pages.mjs country/<id> history/<entry-id> culture/<section>/<slug>` with
  the URL prefixes you changed, then inspect the HTML in `.cache/page-review/`. This runs all
  tests, validates all collections/citations and renders the selected pages. See `docs/BUILDS.md`.
- Use `npm run build` for a complete site and `npm run seo:audit` for site-wide links/SEO
  (required before deployment, or when changing routing/shared links). Full HTML is in `dist/`.
  `npm run build:quick` builds all pages without social cards. Builds lock automatically;
  if another build is running, wait and retry. Never delete another process's lock.
- Both builds run `npm test` first (answers, profile claims, history, charts, research, survey; a
  few seconds) and stop if a test fails. Run `npm test` alone for a quick check. A new test file
  goes into the `test` script in `package.json`.
