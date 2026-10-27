# Notes for agents

This repository is the Cannabis Freedom Index: country profiles (`countries/`), a history of
cannabis law (`changes.yaml`, `articles/`) and a cultural atlas (`culture/`), built with Astro.

- **To expand or research a country**, follow `docs/EXPAND-COUNTRY.md`. Start with
  `node scripts/country-gaps.cjs <id>`.
- Data rules: `docs/DATA-MAINTENANCE.md`. How texts read: `docs/WRITING.md`. Atlas entries:
  `docs/CULTURE.md`.
- Others work here at the same time: check `git status` first, don't touch files with someone
  else's uncommitted changes, and commit only your own files.
- Don't start dev or preview servers; check with `npm run build` (one build at a time) and the
  HTML in `dist/`.
