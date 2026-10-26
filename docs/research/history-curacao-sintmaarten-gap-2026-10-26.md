# Curaçao and Sint Maarten: replacing the 1928 estimates with the 1929 ordinance

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, both island profiles and their timelines before editing. No
book was used. This pass replaces the two 1928 first-restriction
estimates (window 1928–1960) with the dated 30 July 1929 Antillean drug
ordinance. Cameroon and the other active country passes were left
untouched.

## Sources actually read

- Netherlands Antilles archived Opium Ordinance consolidation
  (repository.officiele-overheidspublicaties.nl, CVDR/1718/1): the notes
  state the 1960 ordinance replaces the ordinance of 30 July 1929
  (P.B. 1940, no. 138) on opium and other narcotics.
- Overheid.nl commencement history (CVDR142115): the 1960 ordinance
  signed 28 March 1960 (P.B. 1960, no. 65), in force 1 June 1964 under
  decree of 29 April 1964.
- The joint PG prosecution guideline 2018/01 for Curaçao, Sint Maarten
  and BES (Dutch PDF, in force 1 Dec 2018, replacing the 1 July 2015
  guideline): the cannabis table — 0–25 g seizure plus (conditional)
  dismissal, 25–50 g fine up to NAF 500, 50 g+ halved hard-drug demand,
  listed exceptions, cultivation by individual assessment. Corroborates
  the checked 2018 entries; no entry changes made on its basis (it
  renews, not introduces, the bands).
- Dutch Wikipedia Opiumwet: the 1928 Act (12 May 1928, in force 1 October
  1928, scope the Netherlands) was read, but its hemp clause could not be
  pinned down on the page, so no Netherlands-1928 claim is carried into
  the new entries.

Deliberately not done: no new article. The modern arc (2018 guidelines,
2024 ordinance and reform debates) already has peer articles; the 1929
ordinance is a single dated fact. No changes to any checked entry; the
1964 entries already describe the 1929→1960 replacement consistently.

## What changed

- Removed `cw-first-restriction-estimate` and
  `sx-first-restriction-estimate` (no live references existed).
- New `curacao-first-drug-ordinance-1929` (1929-07-30, ban, scored,
  `before` FREE): 100→25. Related to the 1964 replacement entry.
- New `sint-maarten-first-drug-ordinance-1929` (1929-07-30, ban, scored,
  `before` FREE): 100→24. Related to the 1964 ordinance entry.
- Chain shape unchanged apart from the sharpened date (1928→1929);
  estimated first bans fall from 62 to 60. Today's profile scores are
  unchanged.

## Validation

- `node scripts/data-status.cjs chain cw/sx`: one step each, 0 flagged.
  Triage: 1 scored, 0 open each.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; both new history pages render.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Dutch Caribbean hunks and files.
