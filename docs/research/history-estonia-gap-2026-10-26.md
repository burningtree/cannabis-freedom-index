# Estonia: the 1974 possession step and the 2002 misdemeanour reform

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Estonia profile and its timeline before editing. No book
was used. This pass adds the scored 1974 Soviet possession step on the
Latvia/Russia/Armenia/Belarus/Lithuania convention and writes the article
for the checked 2002 misdemeanour reform. Cameroon and the other active
country passes were left untouched.

## Sources actually read

- Wikipedia, Drug policy of the Soviet Union, in full (1974 decree,
  Article 224 republic codes, up to three years).
- The Meganorm reprint of the 22 June 1987 edict No. 7226-XI, in Russian
  (edict header; amended Article 6 on first small-quantity possession).
- Wikipedia, Cannabis in Estonia, lede: up to 7.5 grams for personal use
  punished with a fine; large amounts and distribution criminal with up
  to five years.
- Wikipedia, Narcotic Drugs and Psychotropic Substances Act (Estonia):
  stub confirming the 1997 Act's scheduling system.
- The checked 2002 entry's Riigi Teataja and Supreme Court sources could
  not be opened from here (JavaScript-walled pages); their facts (large
  quantity intoxicating at least ten people; 7.5 g at 7–10% THC treated as
  large in the 2014 judgment) are restated from the checked entry and
  re-cited in the article frontmatter, not independently verified.

Deliberately not done: no changes to the checked 2002 or 2019 entries.
The 1974 step's `after` state is forced by the checked 2002 `before`
({1,1,2,1,1,0}), which locks in exactly as with Lithuania. ESSR-code
text and the 1991–2002 transition remain open archival work.

## What changed

- New `estonia-soviet-possession-crime-1974` (1974, tightening, scored,
  `before` {3,1,3,1,3,0}): union possession criminalisation, 20→11.
- New `articles/estonia-misdemeanour-2002.md` (350 words, three
  headings): the 2002 Penal Code split, the ten-person boundary, and the
  11→19 jump. Links to the 1974 entry and `/country/ee/`.
- Final chain: 1940 100→20, 1974 20→11, 2002 11→19, 2019 19→20.
  Today's profile scores are unchanged, so the profile file was not edited.

## Validation

- `node scripts/data-status.cjs chain ee`: four steps, 0 flagged.
  `npm run scores:triage -- ee`: 4 scored, 0 open.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes; the new page and article render.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Estonia hunks and files.
