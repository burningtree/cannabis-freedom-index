# Article batch: Morocco 1888 and Colombia 1928 first-ban articles

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, `WRITING.md`
and `BOOKS.md`, the two history entries with their profiles, and the linked
entries before writing. No web search was needed: both articles rest on
chapters in locally held books, re-read in the local copies for this pass.
No `changes.yaml` entry was added, corrected or re-scored; two articles were
added for entries in the backlog top 30 without one. No profiles, scores or
score timelines changed.

## Articles added

- `articles/morocco-hassan-kif-ban-1888.md` (~370 words, opening plus three
  sections, single Duvall chapter source cited throughout). The 1844 tobacco
  monopoly, the 1856 British treaty exception, the 1860 kif monopoly, the
  1870s Rif farming permission, the 1888 executive ban with public burning
  and the Rif exception, the 1896 restoration, and the line through 1910,
  1914, 1922 and 1954 to the 1956 independence ban. Links the 1890
  regulations article, the 1896 restoration entry, the 1956 ban article and
  `/country/ma/`.
- `articles/colombia-first-marijuana-law-1928.md` (~355 words, opening plus
  three sections, single Partridge chapter source cited throughout). The
  failed Spanish hemp introductions, the cabuya and cotton barriers, the
  Caribbean-coast arrival with Panama Canal labour movement, the 1928
  dating with the Costa Rica comparison, the c.1945 press reports, the 1939
  eradication turn and the 1970s Santa Marta cash-crop economy. Links the
  Costa Rica 1928 decree article, the 1939 restrictions article, the Santa
  Marta field-study article and `/country/co/`.

## Sources actually read

- Chris S. Duvall, The African Roots of Marijuana, ch. 9 "Buying and
  Banning" (local PDF): printed pp. 192–194 re-read on 26 October 2026 —
  figures 9.1–9.2 captions skipped as non-factual. Hassan I's 1888
  executive ban after consulting a cleric, public burning of stocks,
  continued Rif farming, the 1896 restoration, and the 1910/1914/1922/1954
  sequence. Edition and pagination as catalogued in `docs/books.yaml`
  (verified metadata, unchanged file hash assumed — see validation).
- William L. Partridge, "Cannabis and Cultural Groups in a Colombian
  Municipio", in Cannabis and Culture, ed. Vera Rubin (local PDF):
  printed pp. 148–149 and 155 re-read the same day. The 1928 dating via
  Colombian historians, the Caribbean-port and Magdalena-valley route, the
  1945 press threshold, the coffee-versus-cannabis prices and the
  cannabis-growing police commissioner. The chapter's Decree 1699/1964
  penalties were not used, per the catalogue's existing follow-up.

## Dating note (Colombia and Costa Rica)

Partridge pairs Colombia's 1928 law with Costa Rica's 1927 law. The site's
checked Costa Rica timeline distinguishes the two instruments: Decree No. 3
of March 1927 regulated opium, while marijuana was banned by Decree No. 5
of 24 October 1928. The article states both instruments' dates and links
the Costa Rica 1928 decree article; the Colombia 1928 entry text, which
faithfully reports Partridge's pairing, was left unchanged.

## Not verified in this pass

- Duvall's ch. 9 endnotes (nn. 79–90) behind the Morocco passage were not
  re-read; the article attributes the account to Duvall throughout.
- The 1919 Cuba law-and-regulations booklet, the 1966 Finland decree
  number, Syria 1943, Guatemala 1932, Uganda's 1902 ordinance text and the
  Austrian 1928 domestic rules remain untraced (RIS and ALEX both
  bot-walled; archive.org/Gallica routes exhausted in earlier passes).
- Scores, profiles and timelines are untouched, including the pre-existing
  India chain warning.

## Validation and tree note

- `node -e` YAML load of changes.yaml and docs/books.yaml clean (no entry
  edits in this pass). `npm run books:report` refreshed the generated
  report (applied-target counts 40→41 and 27→28); `npm run books:check`
  agrees with the local inventory, hashes match.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,343 pages, complete.
- Rendered `/history/morocco-hassan-kif-ban-1888/` shows reference marks
  with 14 `[1]` citations; outbound links to the 1890, 1896, 1922 and 1956
  entries all resolve. The Colombia page links the 1939, Santa Marta and
  Costa Rica 1928 entries. Chains `ma` and `co` unchanged, 0 flagged
  steps; both entries cleared from the article backlog.
- Commit stages only the two new articles, this note, the two
  `books.yaml` applied_to hunks and the regenerated report. Foreign work
  in the shared tree (Bermuda entries, staged `source-archive.json`) is
  excluded and preserved.
