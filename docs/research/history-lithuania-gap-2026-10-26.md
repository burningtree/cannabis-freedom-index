# Lithuania: the 1974 possession step, the 2003 easing, and the Soviet use measures

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Lithuania profile and its timeline before editing. No book
was used. This pass closes the one open 2006 score-triage item as reviewed,
fills the 1980s and 1990s of the 1940–1994 gap with two union-measure
entries, then reconstructs the full score chain with a scored 1974 step and
a re-scored 2003 easing, plus a second article. Cameroon and the other
active country passes were left untouched.

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

- The 1987 edict itself (Meganorm reprint of No. 7226-XI), read in Russian:
  edict header and amended Article 6 — first small-quantity possession
  without intent to sell draws an administrative penalty, repeat within a
  year up to three years. Added as a source to the 1987 entry.
- The Constitutional Court ruling of 15 June 2006 (English text), confirming
  Law VIII-1968 of 26 September 2000 and the new Code entering into force
  on 1 May 2003.
- Liberties, "Harsher Punishments for Sharing Drugs in Lithuania"
  (5 December 2017), in full: post-2017 small possession draws a fine,
  arrest or up to two years; administrative penalties existed until 2017
  and were abolished from then on.
- Latvia's chain (`1940 100→20`, `1974 20→14`) as the project convention
  for the union possession step, mirrored for Lithuania.

Reconstruction rationale (reversing the earlier caution): the checked 2017
entry's `before` ({2,1,3,1,2,0}) already encodes the post-2003 misdemeanour
state, so a scored 1974 step and a scored 2003 easing lock in with zero
changes to any checked step's endpoints. The 1940 step moves 100→17 to
100→20 (possession/use unpunished until 1974, as in Latvia); 1974 goes
20→11; 2003 goes 11→17, exactly reversing the checked 2017 17→11. The
1987/1990 use-policy entries stay unscored union measures with explicit
reasons.

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
- Reconstruction: new `lithuania-soviet-possession-crime-1974` (1974,
  tightening, scored, `before` {3,1,3,1,3,0}, after the 2017 `before`
  state); `lithuania-criminal-code-possession-2003` re-scored from `other`
  to easing with `before` {1,1,2,1,1,0}; Meganorm 1987-edict source and
  the 1974 related link added to the 1987 entry. Final chain: 1940
  100→20, 1974 20→11, 2003 11→17, 2017 17→11, 2019 11→12. Today's
  profile scores are unchanged, so the profile file was not edited.

## Articles

- `articles/lithuania-soviet-use-decree-1987.md` (362 words, three
  headings): the 1987 decree, the 1974 possession backdrop, LTP compulsion,
  the 1990 rejection, and the line to 1994/2003/2017. Links to the 1994
  convention entry and `/country/lt/`.
- `articles/lithuania-criminal-code-possession-2003.md` (380 words, three
  headings): the 2003 misdemeanour tier, the fourteen-year administrative
  period, and the 11→17→11 round trip with 2017. Links to the 1974 and
  2017 entries and `/country/lt/`.

## Still open

- The 1940 imposition entry (still Wikipedia-only and openly uncertain)
  and the LSSR code's own cannabis provisions: both require Lithuanian or
  Russian archival sources not reachable in this pass. The 1974 step now
  follows the Latvia/Russia/Armenia/Belarus convention (union-wide
  application) rather than a recovered republic text.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly two
  entries added and two entries revised (2006 `unscored`, 1994 `related`);
  no other country's entries changed, none removed.
- After reconstruction: `node scripts/data-status.cjs chain lt` shows
  1940 100→20, 1974 20→11, 2003 11→17, 2017 17→11, 2019 11→12 with
  0 flagged steps. `npm run scores:triage -- lt`: 5 scored, 0 open.
- `npm run history:test`: 39 passed. `npm run answers:test`: 27 passed.
- Production build passed. All new history pages render.
  Articles: 362 and 380 words, three headings each.
- Concurrent agents' work in shared files is untouched; commits stage
  only the Lithuania hunks and files.
