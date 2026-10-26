# Lithuania: the 1987 use decree, the 1990 ruling, and the 2006 close-out

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Lithuania profile and its timeline before editing. No book
was used. This pass closes the one open 2006 score-triage item as reviewed
and fills the 1980s and 1990s of the 1940–1994 gap with two union-measure
entries and one article. Cameroon and the other active country passes were
left untouched.

## Sources actually read

- Human Rights Watch, Rehabilitation Required (2007), background chapter and
  its footnotes, in full: the 22 June 1987 Presidium decree making drug use
  a misdemeanour and repeat use a crime; the 1985 expansion of LTP
  committal; simplified LTP proceedings without appeal; the 25 October 1990
  Committee for Constitutional Supervision Conclusion No. 8 declaring
  criminal liability for illicit drug use unconstitutional.
- Wikipedia, Drug policy of the Soviet Union, in full: the 1974 decree
  reproduced in Article 224 of all republics' codes (possession without
  intent, up to three years; production/trafficking ten to fifteen; seducing
  and theft offences), the 1987 repeat-offence escalation, and the post-Soviet
  addiction rise. Used only where HRW corroborates the union-level facts;
  scored RU entries already rest on this page.
- The 2006 entry's own sources were re-read in place (Seimas Law X-711,
  original Code Article 265); no new source was needed to close it.

Deliberately not done: no scored 1974 Soviet-possession step for Lithuania.
The RU/BY/LV/AM copies of that step rest on the union decree plus each
republic's reconstructed earlier code; Lithuania's LSSR code text was not
recoverable from here (VU dissertation unreachable, no online LSSR code),
so no republic-level allocation is asserted. The 1987/1990 entries are
likewise recorded as union measures with explicit `unscored` reasons.

## What changed

- `lithuania-cultivation-penalty-amendment-2006`: `unscored` reason added —
  only the large-quantity maximum rose with non-custodial alternatives
  retained, so no segment moves. Triage now reports 0 open for Lithuania.
- New `lithuania-soviet-use-decree-1987` (1987-06-22, tightening,
  unscored): the union use decree as it applied in the LSSR.
- New `lithuania-soviet-use-ruling-1990` (1990-10-25, easing, unscored):
  the constitutional conclusion removing the use offence.
- `lithuania-single-convention-1994`: related link to the 1990 entry.
  No scores touched; the chain (1940 100→17, 2017 17→11, 2019 11→12) and
  today's profile scores are unchanged, so the profile file was not edited.

## Article

- `articles/lithuania-soviet-use-decree-1987.md` (366 words, three
  headings): the 1987 decree, the 1974 possession backdrop, LTP compulsion,
  the 1990 rejection, and the line to 1994/2003/2017. Links to the 1994
  convention entry and `/country/lt/`.

## Still open

- The 1940 imposition entry (still Wikipedia-only and openly uncertain),
  the LSSR code's own cannabis provisions, and any republic-level 1974
  allocation: all require Lithuanian or Russian archival sources not
  reachable in this pass.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly two
  entries added and two entries revised (2006 `unscored`, 1994 `related`);
  no other country's entries changed, none removed.
- `node scripts/data-status.cjs chain lt`: no flagged steps.
  `npm run scores:triage -- lt`: 3 scored, 0 open.
- `npm run history:test`: 39 passed. `npm run answers:test`: 27 passed.
  `npm run scores:triage -- lt`: 3 scored, 0 open.
- Production build passed (4,225 pages). Both new history pages render.
  Article: 362 words, three headings.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Lithuania hunks and files.
