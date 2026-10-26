# Moldova: the 1974 possession step and the 2009 contravention reform

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Moldova profile and its timeline before editing. No book
was used. This pass adds the scored 1974 Soviet possession step on the
Latvia/Lithuania/Estonia/Russia/Armenia/Belarus convention and writes the
article for the checked 2009 Contravention Code reform. Cameroon and the
other active country passes were left untouched.

## Sources actually read

- Wikipedia, Drug policy of the Soviet Union, in full (1974 decree,
  Article 224 republic codes, up to three years).
- The Meganorm reprint of the 22 June 1987 edict No. 7226-XI, in Russian
  (edict header; amended Article 6 on first small-quantity possession).
- Wikipedia, Cannabis in Moldova, lede: use not a crime but an
  administrative offence under the 2008 code's Article 85 (figures there
  are stale; the Code text below governs).
- The Contravention Code 218/2008 itself (Moldovan government-agency PDF,
  Romanian): Article 85(1) small-quantity acquisition, keeping and
  consumption as contraventions, fine of three to ten conventional units
  or up to 40 hours of community work; Article 85(2) release on voluntary
  surrender or seeking medical help (marked as amended in 2013); Article 87
  illegal cultivation without alienation purpose, fine of thirty to fifty
  units; one conventional unit equals 20 lei; the Code enters into force
  on 31 May 2009.
- Article model tags in this pass's new articles were corrected from a
  copied `muse-wonder-1.0` to the actual `muse-spark-1.3` after a user
  correction, including the two already-committed Lithuania articles.

Deliberately not done: no changes to the checked 2009, 1999, 2006-threshold
or 1995 entries. The 1974 step's `after` state is forced by the checked
2009 `before` ({1,1,2,1,1,0}), locking in exactly as in Lithuania and
Estonia. MSSR-code text and the 1991–2009 transition remain open archival
work.

## What changed

- New `moldova-soviet-possession-crime-1974` (1974, tightening, scored,
  `before` {3,1,3,1,3,0}): union possession criminalisation, 20→11.
- New `articles/moldova-administrative-offence-2008.md` (357 words, three
  headings): the Article 85 contravention tier, the surrender-or-treatment
  exit, and the 11→19 jump. Links to the 1974 entry and `/country/md/`.
- Corrected `model:` frontmatter to `muse-spark-1.3` in all five articles
  authored this session (two Lithuania, one Serbia, one Estonia, one
  Moldova).
- Final chain: 1934 100→20, 1974 20→11, 2009 11→19. Today's profile scores
  are unchanged, so the profile file was not edited.

## Validation

- `node scripts/data-status.cjs chain md`: three steps, 0 flagged.
  `npm run scores:triage -- md`: 3 scored, 0 open.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; the new page and article render.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Moldova hunks and files.
