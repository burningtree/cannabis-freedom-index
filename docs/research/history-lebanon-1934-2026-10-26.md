# Research pass: Lebanon 1934 article; 1907/1929/1934 entries cited from Ram ch.1

Research checked on 26 October 2026. Ram's Chapter 1 ("The Drug Trade in
the Levant", local EPUB chapter0007, extracted and read) verifies three
Lebanon entries at once: the 1907 growing start, the 1929 Baalbek
resistance, and the 1934 French tightening. One new article, three entries
garnished with per-sentence citations and precise locators. No scores,
profiles or timelines changed.

## What was verified (all sources actually read)

- Haggai Ram, Intoxicating Zion (SUP 2020), ch. 1: Russell's 1902-entry
  Greece account and ~1907 Lebanon-district experiments; Greek decline and
  Lebanese boom; notables/ministers ordering peasant cultivation; French
  1929 frankness on peasant livelihoods and August 1929 Baalbek report
  (proprietors refusing destruction, blocking peasant cutters); 50–60 ton
  annual Egypt-bound output; Russell's personal League complaint to shame
  Paris plus possession-criminalisation demand; French response (uniform
  narcotics legislation near the 1925 Convention, regional Sûreté Générale
  antidrug squad, harder field destruction); temporary "diminution in
  Syrian arrivals" (CNIB satisfaction); Turkish-hashish replacement
  (Pyrrhic victory); 1939 relapse complaint (broken tear-up/confiscation
  assurances; governing classes planting vast areas).
- New `articles/lebanon-narcotics-decree-1934.md` (~350w body, 4 sections,
  single book source). Entries `lebanon-narcotics-decree-1934`,
  `lebanon-landowners-resist-destruction-1929` and
  `lebanon-hashish-growing-begins-1907` all gain [@1] markers; the shared
  vague locator replaced with three chapter-split locators (line-targeted
  edit, YAML re-validated).
- The 1934 entry's "issued a new decree" softened to "introduced stricter
  prohibitive regulations ... uniform narcotics legislation", matching
  Ram's wording; the 1939 relapse and temporary-diminution claims kept as
  written (both verified).

Claim boundaries: no French decree text read — the article stays inside
Ram's account and its archival citations, not behind them. The 1926
Lebanon hashish ban (related entry) untouched.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/lebanon-narcotics-decree-1934/` citation marks
  checked.
- Commit limited to own work: the three Lebanon hunks in changes.yaml,
  the new article, this note, via pathspec. Foreign staged/worktree files
  excluded and preserved.
