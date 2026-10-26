# Cuba, Qatar and Dominican Republic: closing seven triage items as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the three country profiles and their timelines before
editing. No book was used. This pass reviews seven open entries — Cuba's
1999 death-penalty extension and 2022 Penal Code, Qatar's three death
sentences, and the Dominican Republic's 1988 and 1990 drug laws — and
records `unscored` reasons. All sit within already floor-scored bands or
are case outcomes under existing law. No scores change. Cameroon and the
other active country passes were left untouched.

## Sources actually read

- Cuba's 2022 Penal Code (Gaceta Oficial, 1 September 2022 PDF), Articles
  235–236: trafficking/production/possession-for-trafficking/growing and
  seed possession at four to ten years; aggravated (officials,
  international, minors, institutions, organised crime, large quantities,
  priors) at ten to thirty years, life or death; simple cannabis
  possession at six months to two years or a fine — matching the checked
  2022 entry exactly.
- The 1999 Law 87 Gaceta PDF could not be fetched (empty response); its
  reason follows the checked entry's penalty description.
- Wikipedia, Cannabis in the Dominican Republic: Law 50-88 weight grades
  (20 g or less, 20 g to a pound, over a pound as trafficking) with the
  stated minima, corroborating the checked 1988 entry. The FC Abogados
  law text is JavaScript-walled; not read.
- The Qatar sentence entries' own checked descriptions (Hands Off Cain,
  Doha News, The Peninsula): 160 kg import attempt, 600 kg speedboat,
  120 kg at sea — trafficking cases under the 1987 law.

## What changed

- `cuba-law-87-1999`: `unscored` — death penalty extended to trafficking
  variants within an already floor-scored regime.
- `cuba-penal-code-2022`: `unscored` — recodification within floor bands,
  verified against the Code text read in full.
- Three Qatar death-sentence entries: `unscored` — individual
  trafficking sentences under the 1987 law; no law change and no segment
  movement.
- `dominican-republic-law-50-88-1988` and `dominican-republic-law-35-90-1990`:
  `unscored` — weight-graded scheme consistent with scored bands;
  procedural/precursor/arming amendments without user-band movement.
- Triage now reports CU, QA and DO each 1 scored, 0 open; open entries
  overall fall 487→480. No articles: reasons-only pass.

## Validation

- Chains unchanged (CU 1919 estimate 100→3; QA 1987 100→2; DO 1925
  estimate 100→6), 0 steps flagged.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the CU/QA/DO hunks and files.
