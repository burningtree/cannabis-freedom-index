# San Marino: the 1981 schedule, the 1988 tightening and the 1997 rewrite

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the San Marino profile and its seven history entries before
editing. No book was used. This pass fills the 1956–2000 gap with three
dated entries and one article. Cameroon and the other active country passes
were left untouched.

## Sources actually read

- United Nations E/NL.1988/42, San Marino's Law No. 32 of 7 March 1988, in
  full (4-page English reproduction): articles 1–13 — second-degree
  imprisonment for production, introduction, possession for sale and supply;
  simple possession punished the same with the 1956 law's lighter treatment
  and all its other provisions annulled; personal-use mitigation, treatment
  probation, aggravating factors, expert opinions, the article 11 drug
  tables (cannabis group: marijuana, hashish, THC, hashish oil,
  sinsemilla), transitional and retroactivity rules, and the 15-day
  commencement clause. Signed 10 March 1988.
- San Marino Law No. 139 of 26 November 1997, in full from the Consiglio
  Grande e Generale site (Italian PDF): articles 1–14 — repeal of the 1956
  and 1988 laws, the same supply and simple-possession structure, the
  Social Security Institute prescription/recognition exception, probation
  and procedure, the cannabis list, and the 15-day commencement clause.
  Passed 26 November, signed 27 November 1997.
- San Marino Law No. 113 of 18 August 2021 (Italian PDF, read for the
  preamble only): article 21's reference to Law 139/1997, which is how the
  1997 law was found; 2021/2023 entries otherwise untouched.

Deliberately not used: search snippets about Italian DPR 309/1990 applying
in San Marino (no evidence found that Italian drug law applies there; the
republic legislates its own), and secondary cannabis-site summaries of
Sammarinese penalties (weaker than the two statutes read).

## What changed

- New `san-marino-drug-schedule-1981` (1981-02-10, `other`, unscored):
  Captains Regent Decree No. 13's drug tables, reproduced in the 1988 law,
  as the instrument that names the cannabis group.
- New `san-marino-narcotics-additions-1988` (1988-03, tightening,
  unscored): simple possession raised to second-degree imprisonment, the
  1956 law annulled. Unscored because penalties are expressed in
  Sammarinese degrees with no mapped user-level change against the 1956
  treatment — no segment moves.
- New `san-marino-drugs-law-1997` (1997-11, `other`, unscored): repeal and
  re-enactment with procedure and alcohol provisions; the narrow
  institute-recognition exception carries no implemented access step, which
  sits with the 2016 medical entry.
- `san-marino-narcotics-law-1956`: related link to the 1988 entry. No
  scores touched; today's profile scores did not change, so the profile
  file was not edited.

The timeline now has an entry in the 1980s and 1990s. The 1956 law's own
text remains unread (the entry still rests on the 1973 US report via
Wikipedia); the exact 1988 and 1997 publication dates, which set their
15-day commencements, are unrecovered, so both entries are dated by
approval month. The two open 2021/2023 medical triage items belong to the
modern medical story and are left for it.

## Article

- `articles/san-marino-narcotics-additions-1988.md` (354 words, four
  headings): the 1988 hinge — equal punishment for possession and supply,
  treatment exits, procedure, and the 1997 rewrite. Links to `/country/sm/`.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly three
  entries added and one entry revised (related link); no other country's
  entries changed, none removed.
- `node scripts/data-status.cjs chain sm`: no flagged steps.
  `npm run scores:triage -- sm`: the two open items are the pre-existing
  2021/2023 medical entries, untouched by this pass.
- `npm run history:test`: 39 passed. `npm run answers:test`: 16 passed.
- Production build passed (4,218 pages). All three new history pages render.
  Article: 352 words, four headings.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the San Marino hunks and files.
