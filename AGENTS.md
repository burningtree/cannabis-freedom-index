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
- Don't start dev or preview servers; check with `npm run build` (one build at a time) and the
  HTML in `dist/`. For a small frontend change, `npm run build:quick` skips the preview images.
- Both builds run `npm test` first (answers, profile claims, history, charts, research, survey; a
  few seconds) and stop if a test fails. Run `npm test` alone for a quick check. A new test file
  goes into the `test` script in `package.json`.
