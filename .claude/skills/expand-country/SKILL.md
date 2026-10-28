---
name: expand-country
description: Expand one country in the Cannabis Freedom Index - find missing history entries, write articles, fill missing context sections, penalty tables and links. Use when asked to expand, deepen, fill in or research a specific country (e.g. "expand Kenya", "/expand-country ke").
---

Follow `docs/EXPAND-COUNTRY.md` exactly. It is the shared guide for every agent working on this
repository; this skill only points to it.

1. Read `docs/EXPAND-COUNTRY.md`, then the parts of `docs/DATA-MAINTENANCE.md` and `docs/WRITING.md`
   it names.
2. Run `node scripts/country-gaps.cjs <id>` and `node scripts/article-backlog.cjs --country <id>` for
   the country in the arguments (a profile file name such as `ke`, `de` or `us/ca`).
3. Work through the guide's steps in order: current law and penalty tables, history, articles,
   context sections, culture and the country's words for cannabis, sources, then build and commit
   only your own files.
   Add a history entry to `changes.yaml` before you write its article (`articles/<entry id>.md`) or
   link to it; an article or link without its entry stops the build for everyone. Run `npm test`
   before you finish: it names any that are missing.
