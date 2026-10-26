# Senegal: closing the 1987, 1997 and 2007 triage items as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Senegal profile and its timeline before editing. No book
was used. This pass reviews the three open tightening entries against the
primary French texts and records `unscored` reasons: all three move only
trafficking-side or recodifying provisions while the cannabis personal-use
bands stay in the light Article 109 range. No scores change. Cameroon and
the other active country passes were left untouched.

## Sources actually read

- Law 97-18 of 1 December 1997 (Code des drogues, via the CILD site and
  its Wayback PDF), in the operative parts: Article 8 prohibiting
  cannabis cultivation; Articles 95–98 trafficking and facilitation
  penalties at five to ten years; Article 109 (small-quantity purchase,
  possession or cultivation for personal use: two months to one year plus
  triple-value fine, covering high-risk plants including cannabis oil,
  other cannabis-plant derivatives and lower-risk drugs, with exemption
  for minors, first-timers and sworn undertakings); definitions tying
  Tables I–IV to the UN conventions.
- The CILD Code-des-drogues page (Wayback): the 2007 law revising
  Articles 95–103 to ten to twenty years' forced labour (Article 99
  personal-use supply at five to ten years; Article 100 Tableau III
  personal-use supply at six months to two years); links to the 1997,
  2007 and decree PDFs.
- The DRI parliamentary file for Law 87-12 could not be re-read (the
  cited dri.gouv.sn PDF returns an error page — link rot since the entry
  was checked). The 1987 reason follows the checked entry's own text
  (two-to-ten-year mandatory trafficking penalties expressly excluding
  simple users) cross-checked against the 1997 Code's five-to-ten-year
  trafficking bands.

## What changed

- `senegal-trafficking-amendment-adopted-1987`: `unscored` reason —
  trafficking penalties expressly excluding simple users; cannabis user
  bands unchanged.
- `senegal-code-des-drogues-1997`: `unscored` reason — Code creation
  with cannabis personal use in Article 109's light band; recodification,
  no segment moves.
- `senegal-trafficking-law-2007`: `unscored` reason — Articles 95–103
  raised to ten-to-twenty-year forced labour; Article 109 untouched;
  cannabis bands unchanged.
- Triage now reports Senegal 1 scored, 0 open (was 3 open); open entries
  overall fall 503→500. No article: a reasons-only pass with no scored
  event.

## Validation

- `node scripts/data-status.cjs chain sn`: single 1916 step, 0 flagged.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Senegal hunks and files.
