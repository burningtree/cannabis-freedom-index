# Mozambique 1941: regulation text read, closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), the 1914 and 1941 entries with the profile and timeline,
the 1941 regulation text itself, and the 1957 UN Mozambique survey before
editing. One open triage item closed with an `unscored` reason plus a
source upgrade; no scores, profiles or other timelines changed.

## What changed

- `mozambique-pharmacy-regulations-1941` (1941-12-24, tightening):
  `unscored` — absolute prohibition restates the 1914 colonial ban; no
  segment-band movement is established against it, and the profile
  reflects the later 1997 law. Description converted to a per-sentence
  citation and the existing UN source gained a locator (Chapter V,
  Article 59; Legislative Decree No. 775 of 24 December 1941).

Triage now reports MZ at 0 open (1914 100→11, today 11).

## Sources actually read

- UN E/NL.1948/9 via documents.un.org (works; digitallibrary blocked):
  "Regulations for the Practice of Pharmacy", adopted by Legislative
  Decree No. 775 of 24 December 1941 — Chapter V, Article 59: importation,
  cultivation, sale and consumption of Cannabis sativa (bange, suruma)
  absolutely prohibited.
- UN E/CN.7/286/Add.10 (1957 Mozambique survey) via documents.un.org:
  p. 6 assumes (without confirming) that the legislation in force
  prohibits cultivation, importation, sale and consumption — so the survey
  does not resolve whether the 1914 order already covered consumption.

## Why not scored

Whether the 1914 Portaria covered consumption is unestablished from the
recovered texts (the order itself and its full scope were not recovered;
the 1957 survey only assumes the package). Without a consumption
before-state, no scored step can be built; both instruments sit inside a
total colonial prohibition with no demonstrated band-level change.

## Validation and tree note

- Chain `mz`: unchanged, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,361 pages, complete.
- Commit stages only the 1941 hunk plus this note, via patch filtering.
  Foreign work in the shared tree is excluded and preserved.
