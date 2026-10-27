---
name: expand-countries
description: Expand several countries of the Cannabis Freedom Index in one batch - pick the countries that most need work (or a given region or list) and take each through the expand-country workflow, committing country by country. Use when asked to expand, deepen or research multiple countries, a region, or "the next batch" (e.g. "expand five African countries", "/expand-countries Africa 5").
---

Follow `docs/EXPAND-COUNTRIES.md`, and for each country `docs/EXPAND-COUNTRY.md`. They are the shared
guides for every agent working on this repository; this skill only points to them.

1. Read both guides.
2. Choose the batch: `node scripts/country-gaps.cjs --rank 25` (add `--region <Region>` when a region
   is given), or use the countries named in the arguments. Skip any marked BUSY.
3. Take the countries one at a time through `docs/EXPAND-COUNTRY.md`, building and committing each
   country (only your own files) before the next, and keep the batch's progress note in
   `docs/research/expansion-<date>.md`.
4. If you use subagents, follow section 4 of `docs/EXPAND-COUNTRIES.md`: each worker owns different
   countries and returns its history entries as a `history-batch.cjs` file; only you edit
   `changes.yaml`, build and commit.
