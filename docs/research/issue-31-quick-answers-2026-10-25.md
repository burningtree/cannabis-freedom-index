# Issue 31: national quick answers and administrative detention

Reviewed 25 October 2026 against DATA-MAINTENANCE.md's quick-answer rules and WRITING.md.
The recent `0b03109` rewrite removed the old “Not a crime” answer and added explicit
profile overrides. It did not give the United States its own possession answer: the
national possession score of four still produced “Usually no criminal charge”.

This fix uses those existing overrides, shared by country pages, `/can-i/` and FAQ
structured data. No numeric scores or historical score chains change.

- **US:** explicitly name possible state and federal criminal liability, including where
  state law permits possession. Also make home-growing depend on state law. Add the
  official [21 USC 844(a)](https://uscode.house.gov/us/usc/119-118/t21/s844/) source to the
  possession explanation. Its first-offence provision permits up to a year in prison.
  The [DEA rescheduling page](https://www.dea.gov/marijuana-rescheduling-regulatory-actions)
  was opened as context; this fix does not reinterpret the profile's rescheduling history.
- **Australia:** explicitly name the ACT's local adult exemption, possible charges
  elsewhere and continuing Commonwealth law. [ACT Policing's current guidance](https://police.act.gov.au/community-safety/alcohol-and-drugs/drugs-and-the-law)
  was read: the cannabis rules and final Commonwealth-law paragraph support this wording.
- **Canada:** the generic adult possession permission remains appropriate. The cultivation
  answer did hide Quebec's ban; now explicitly name that exception and provincial conditions,
  using the existing sourced cultivation account. The profile cites LégisQuébec section 10;
  its direct endpoint returned 502 during this pass. Health Canada's laws/regulations landing
  page was opened; no new Canadian legal claim or score change is introduced.
- **China (issue comment):** make small possession's administrative offence and detention
  explicit, with criminal liability distinguished for larger amounts. Also align cultivation,
  consumption and the “caught” label with the same distinction in the detailed profile.
  Read the official [2025 Public Security Administration Punishments Law](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_8a1c722747214869b28c0ad7a0f8bb7a.html),
  especially articles 3, 10, 83, 84 and 144. Replace the Wikisource URL with that official
  reproduction. This does not imply that administrative detention is a harmless warning.

Federation quick-answer sections now link directly to the existing state/province selector.
Regression tests cover the US national distinction, Australia, Canada's Quebec growing
exception and China's administrative penalties. Browser checks cover profile answers,
`/can-i/`, FAQ data and the picker links at desktop and mobile widths.

The initial shared-checkout build was blocked by invalid source types in an unrelated
uncommitted Singapore history edit. Verify a snapshot of HEAD plus only this issue's files,
leaving that history edit and the background source archive outside this commit.

Validation: 13 answer/profile regression tests passed. The clean-snapshot build and
Chrome checks at 1280 px and 390 px verified all four country pages, FAQ data and
`/can-i/`; federation picker links work and no horizontal overflow was found. The four
numeric score objects were also compared directly with HEAD and are unchanged.
