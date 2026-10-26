# Georgia: the 1974 possession step and the 2015 Tsikarishvili article

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Georgia profile and its timeline before editing. No book
was used. This pass adds the scored 1974 Soviet possession step on the
Baltic convention. The 2015 judgment already has a peer article, which this
pass leaves untouched after an accidental overwrite was reverted.
Cameroon and the other active country passes were left untouched.

## Sources actually read

- Wikipedia, Drug policy of the Soviet Union, in full (1974 decree,
  republic codes, up to three years).
- The Meganorm reprint of the 22 June 1987 edict No. 7226-XI, in Russian
  (edict header; amended Article 6 on first small-quantity possession).
- Constitutional Court of Georgia, Judgment N1/4/592 (24 October 2015),
  Tsikarishvili v. Parliament, in full on the Court's site: the 69-gram
  charge under Article 260(2) (7 to 14/15 years), the proportionality
  challenge expressly not seeking general decriminalisation, the operative
  holding declaring the prison wording unconstitutional for up to 70 grams
  of personal-use possession, and the recorded dissent.
- Wikipedia, Cannabis in Georgia (country): the December 2016 use ruling,
  the 30 July 2018 consumption ruling and abolished fines, and the Girchi
  campaign context.

Deliberately not done: no changes to any checked modern entry (2015,
2017, 2018, 2025). The 1974 step's `after` state is forced by the checked
2015 `before` ({1,1,1,1,1,0}), matching the Belarus/Russia pattern of an
enforcement 3→1 move. GSSR-code text remains open archival work.

## What changed

- New `georgia-soviet-possession-crime-1974` (1974, tightening, scored,
  `before` {3,1,3,1,3,0}): union possession criminalisation, 20→9.
- The 2015 Tsikarishvili judgment's full text was read on the
  Constitutional Court's site (69-gram charge, proportionality holding for
  up to 70 grams, recorded dissent, December 2016 and July 2018 follow-ups
  from the encyclopedia article). A same-named peer article already covers
  the case; an accidental overwrite of it was reverted byte-for-byte, so
  this pass adds no article file.
- Final chain: 1934 100→20, 1974 20→9, 2015 9→14, 2017 14→19,
  2018 19→22, 2025 22→16. Today's profile scores are unchanged, so the
  profile file was not edited.

## Validation

- `node scripts/data-status.cjs chain ge`: six steps, 0 flagged.
  `npm run scores:triage -- ge`: 6 scored, 0 open.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; the new history page renders alongside the
  pre-existing peer article.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Georgia hunks and files.
