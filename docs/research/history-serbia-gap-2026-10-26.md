# Serbia: the 2003 possession criminalisation and the 2006 softening

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Serbia profile and its timeline before editing. No book
was used. This pass fills the 1950–2009 gap — 59 years with no entry — with
two scored steps and one article. Cameroon and the other active country
passes were left untouched.

## Sources actually read

- Kolarić & Marković, "Two Decades of Criminal Justice Reforms in the
  Field of Combating Illegal Drugs" (University of Criminal Investigation
  and Police Studies, Belgrade; PDF via the university repository), in
  full: the 1976 SFRY Code's two drug articles (Art 245 production/sale,
  Art 246 enabling use) with no possession offence; the 1990 equipment
  offence; the 2003 FRY amendments (Official Gazette RS 39/2003) first
  criminalising non-sale possession (fine or up to three years), renaming
  the offence and raising production/sale minimums to five and seven years;
  court use of the summary offence against dealers; the 2005/2006 Code's
  more lenient penalties with remission for personal-use possession and
  disclosure; the 2009 narrowing to small-quantity personal possession.
- Serbia Constitutional Court Bulletin 2/2009 (Serbian), the drug-offence
  section: pre-2009 Art 246 paras 1–7 structure, possession with remission,
  and the 72/09 amendments entering into force on 11 September 2009.
- WIPO Lex record for the Serbian Criminal Code: adopted 29 September
  2005, entry into force 1 January 2006 (Gazettes 85/2005 and others).
- VERTIC English translation of the 2009 amendments: Articles 95–96 split
  Art 246/246a, raised the production minimum from two to three years, set
  the 6-month-to-5-year cultivation offence and the small-possession
  fine-or-up-to-three-years offence with remission; Article 190 gives
  eighth-day entry into force (consistent with 11 September 2009).
- The English Wikipedia "Cannabis in Serbia" history section: the 1929
  Code passed 27 January 1929 and in force 1 January 1930, corroborating
  the existing 1930 entry's date.

Deliberately not done: no scored 1974 Soviet-possession step for Serbia.
Unlike the Baltic entries, the Yugoslav successor chain cannot take one
without re-scoring the checked 1950 federal-act step (its after-state is
shared by seven successor states). The SFRY 1990 equipment offence and the
1964/1990 SFRY convention ratifications are noted here but left out as too
small or covered by succession convention.

## What changed

- New `serbia-possession-criminalised-2003` (2003, tightening, scored,
  `before` {1,1,2,1,1,0}): first criminalisation of non-sale possession,
  enforcement 2→1. Step 11→9.
- New `serbia-new-criminal-code-2006` (2006-01-01, easing, scored,
  `before` {1,1,1,1,1,0}): lenient penalties plus personal-use and
  disclosure remission, enforcement 1→2. Step 9→11.
- The 2009 `other` entry is left untouched: its narrowing is real but
  moves no segment at this scale, and the 2006-after state already equals
  the 2019 `before`.
- Final chain: 1930 100→14, 1950 14→11, 2003 11→9, 2006 9→11, 2019 11→9.
  Today's profile scores are unchanged, so the profile file was not edited.

## Article

- `articles/serbia-possession-criminalised-2003.md` (356 words, three
  headings): the possession-free 1976 code, the 2003 first criminalisation,
  and the 2006–2009–2019 pendulum with the 11→9→11→9 round trip. Links to
  the 2006 and 2019 entries and `/country/rs/`.

## Validation

- `node scripts/data-status.cjs chain rs`: five steps, 0 flagged.
  `npm run scores:triage -- rs`: 5 scored, 0 open.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; both new pages render.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Serbia hunks and files.
