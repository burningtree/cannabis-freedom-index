# Aruba 1929: estimate replaced with the dated Antillean drug ordinance

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, the Aruba
entries with the profile, the Curaçao and Sint Maarten 1929 twin entries
and the consolidation sources before editing. No `changes.yaml` entry was
corrected or re-scored apart from the replacement; no profiles, scores or
other timelines changed.

## What changed

- Replaced `aw-first-restriction-estimate` (window [1928,1960]) with
  `aruba-first-drug-ordinance-1929` (1929-07-30, ban, scored, before FREE),
  mirroring the committed Curaçao/Sint Maarten 1929 pass. Chain is now
  1929 100→21, 2025 21→24, 0 flagged steps. Estimated first bans 60→59.
- No article added: the twin islands' articles were handled in the earlier
  pass; Aruba's 1929 event carries the same ordinance text.

## Sources actually read

- CVDR/1718/1 consolidation notes (Dutch original, via repository.
  officiele-overheidspublicaties.nl): the 1960 Opium Ordinance replaces
  the ordinance of 30 July 1929 (P.B. 1940, no. 138) on opium and other
  narcotics; the regulation is of the Nederlandse Antillen.
- Overheid.nl CVDR142115 commencement history: the 1960 original signed
  28 March 1960 (P.B. 1960, no. 65), in force 1 June 1964 under decree of
  29 April 1964.
- English Wikipedia "Netherlands Antilles" (API extract): the Antilles
  (1954–2010) comprised Aruba, Bonaire, Curaçao, Saba, Sint Eustatius and
  Sint Maarten as successor of the Dutch colony of Curaçao and
  Dependencies, with Aruba leaving in 1986 — the scope clause only.

## Scope reasoning

The 1929 ordinance was colony-wide (colony gazette P.B.), and Aruba was
part of the colony until 1986. No Aruba-specific application instrument
was needed: the same inheritance covers Curaçao and Sint Maarten in the
twin entries.

## Not done here

- No Aruba 1960/1964 replacement entry: the 1990 Aruba consolidation's OCR
  is unusable for lineage and the 2012 amendment text recites no 1929/1960
  ancestry, so an Aruba-specific commencement claim would be unverified.
  The 1960 replacement is already documented in the entry via the official
  consolidation notes.
- The old estimate's "Netherlands banned trade in Indian hemp in 1928"
  clause was dropped with it, matching the twin pass (no read source was
  found for a metropolitan 1928 hemp-trade ban).

## Validation and tree note

- `node scripts/data-status.cjs chain aw`: 1929 100→21, 2025 21→24, 0
  flagged. Estimates list no longer contains `aw`.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,352 pages, complete.
- Commit stages only the changes.yaml replacement hunk plus this note, via
  patch filtering. Foreign work in the shared tree is excluded and
  preserved.
