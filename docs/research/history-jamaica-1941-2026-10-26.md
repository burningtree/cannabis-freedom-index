# Research pass: Jamaica 1941 mandatory-prison article; entry re-sourced

Research checked on 26 October 2026. The Jamaica 1941 entry — previously
sourced but without a single inline citation — gains per-sentence markers
and a stronger source set, plus a new article. No scores, profiles or
timelines changed.

## What was verified (all sources actually read)

- V. J. Hanson, "Jamaica's experience", in Legalizing Cannabis:
  Experiences, Lessons and Scenarios (2020), printed pp. 376–378 (PDF via
  cannalib.eu, found through the HRI study's footnote 3): 1913 ordinance
  (£100/12 months, Hague ratification, evangelical alarm at East Indian
  ganja smoking); Depression-era global tightening reaching Jamaica;
  Rastafari/Maroon targeting; 1941 amendment's mandatory one-year term for
  cultivation, possession and use; post-colonial retention and 1964 raid
  powers; 1972 removal of mandatory sentencing with releases. Hanson cites
  Rubin & Comitas (1975) throughout for the historical claims.
- HRI Jamaica case study 2025 (PDF, read in extracted text): 1913
  criminalisation; 1941 one-year term for possession, use, cultivation;
  Rastafari/Maroon impact; 1972 amendment; prison doubling 1972–2014;
  15,000 arrests and ~$64M costs in 2014.
- New `articles/jamaica-mandatory-prison-1941.md` (~380w body, 4 sections,
  both sources). Entry `jamaica-mandatory-prison-1941` repaired: Wikipedia
  replaced by Hanson as [@1], HRI kept as [@2] with a locator, Rubin kept
  as [@3], per-sentence markers throughout.

Claim boundaries (trimmed, recorded): the old text's "American
anti-marijuana publicity", "up to two years for a second" offence and
"any amount implies intent to sell" were cut — Hanson verifies the
Depression-era global tightening and the mandatory one-year term but not
those specifics, and the Rubin pages were not re-read this pass. Rubin &
Comitas was accordingly removed from the entry's sources (an uncited
third source fails the build); re-reading Rubin ch. 3/appendix II would
be the way to restore the trimmed specifics. Three YAML-colon breaks
were fixed along the way (Hanson and HRI titles in changes.yaml and the
article front matter now quoted).

## Dead ends and parks recorded, not forced

- Rubin & Comitas full text and "The Law Against Ganja in Jamaica" are
  borrow-restricted on archive.org (401 on the OCR endpoint); not forced.
- Kazakhstan 1934 article skipped: the Uzbek 1934 piece already covers the
  decree in depth and names Kazakhstan as covered.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/jamaica-mandatory-prison-1941/` citation marks
  checked.
- Commit limited to own work: the Jamaica 1941 hunk in changes.yaml, the
  new article, this note, via pathspec. Foreign staged/worktree files
  excluded and preserved.
