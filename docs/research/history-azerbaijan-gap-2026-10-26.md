# Azerbaijan: the 1974 possession step

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Azerbaijan profile and its timeline before editing. No
book was used. This pass adds the scored 1974 Soviet possession step on
the Baltic convention. The 2001 reform already has a peer article, which
this pass leaves untouched (checked first this time). Cameroon and the
other active country passes were left untouched.

## Sources actually read

- Wikipedia, Drug policy of the Soviet Union, in full: the 1974 decree
  criminalised possession without intent to sell (up to three years) and
  raised production and trafficking to ten to fifteen years.
- The Meganorm reprint of the 22 June 1987 edict No. 7226-XI, in Russian
  (edict header; amended Article 6 on first small-quantity possession).
- The English translation of Azerbaijan's 2000 Code of Administrative
  Offences (WHO extranet PDF): Article 68-1 personal-use
  production/purchase/storage/transport/use (fine of 300–400 manats or 15
  days' arrest; voluntary surrender exempts) and Article 123-1
  sowing/growing/gathering in personal-needs amounts (fine of 10–15
  manats).
- Wikipedia, Cannabis in Azerbaijan, lede: illicit cultivation in the
  south; medieval medical-text references (background only).

Deliberately not done: no new article (the peer's 2001 piece covers the
checked entry in depth, including the current Article 208 and criminal
Article 237); no changes to any checked entry. The 1974 step's `after`
state is forced by the checked 2001 `before` ({1,0,2,1,1,0}): unlike the
Baltic inserts, cultivation moves 1→0 here, attributed to the edict's
ten-to-fifteen-year production range. AzSSR-code text remains open
archival work.

## What changed

- New `azerbaijan-soviet-possession-crime-1974` (1974, tightening,
  scored, `before` {3,1,3,1,3,0}): union possession criminalisation with
  the production-range clause, 20→9.
- Final chain: 1934 100→20, 1974 20→9, 2001 9→14. Today's profile scores
  are unchanged, so the profile file was not edited.

## Validation

- `node scripts/data-status.cjs chain az`: three steps, 0 flagged.
  `npm run scores:triage -- az`: 3 scored, 0 open.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; the new history page renders.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Azerbaijan hunks and files.
