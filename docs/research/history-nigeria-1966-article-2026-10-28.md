# Nigeria 1966: overwrite reverted, chapter details merged instead

Research checked on 28 October 2026. Read `DATA-MAINTENANCE.md`,
`WRITING.md`, the Nigeria timeline, and the Klantschnig chapter (local EPUB,
1960s boom, decree, doctors and conclusion passages in full). No entries,
scores or profiles changed.

## What happened

- A prior commit overwrote the existing `articles/nigeria-indian-hemp-decree-1966.md`
  (2026-10-11, opus-5.5) with a fresh draft. The old version was better
  integrated: it links the 1927, 1935, 1953, 1962-seizures, Lambo-1965 and
  1975 entries, which all exist.
- Reverted the overwrite (restored the committed version) and merged in only
  the chapter-read additions: 300-500 yearly arrests, the cocoa downturn and
  cocoa belt, ex-soldier/port-worker spread with Lagos price fraction, Daily
  Times lurid coverage, and the schoolchildren indiscipline quote — each
  cited to the chapter ([@1], already a frontmatter source). Article now 421
  words.

## New gap found (not added)

- The chapter states the decree "was amended in 1975 and its penalties were
  reduced" — the 1975 amendment entry exists per the old article's links;
  confirmed present, so no gap after all.

## Validation and tree note

- `history:test`, `answers:test`, `books:check`, production build, chain
  `ng` to be run before commit.
- This commit restores and enriches one article file; `changes.yaml`
  untouched this round.
