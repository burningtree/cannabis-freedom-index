# Australia audit: hemp seed food added; legal timeline complete

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, the
`australia-social-clubs-2001` pattern entries, the Australia profile
(national and access segments) and the Wikipedia "Cannabis in Australia"
legal history as a lead list before editing. One missing history item
added; no scores, profiles or other timelines changed.

## Audit result

Wikipedia's dated legal events against the database:

- 1899 WA poison schedule, 1926 import controls, 1927 Victoria law,
  1967 Act, 1979 commission, 1987 expiation, 1992 ACT fines, 1996 NT
  notices, 2000/2001 NSW cautions, 2004 WA notices, 2011 WA repeal, 2016
  medical, 2020 ACT legalisation, 2023–2024 bills, 2025–2026 reforms —
  all present.
- 1991 first clubs: covered by the 2001 social-clubs entry (ARSEC founded
  early 1990s).
- 2015 Supreme Court club convictions: covered. The 2021 "loophole cut"
  report is the same doctrine applied, confirmed via the Business of
  Cannabis market review already cited on the 2015 entry — no separate
  unverified event added.
- 1938 press campaign, 1964 Hunter Valley eradication: no law changed;
  Hunter Valley is a possible enforcement item but rests on Wikipedia
  alone — left as a lead, not added.

## What changed

- Added `australia-hemp-seed-food-2017` (2017-11-12, hemp, context): hemp
  seed foods prohibited until the Food Standards Code amendments permitted
  retail sale subject to requirements. Sourced from the Queensland
  Government health page, read directly. Hemp context does not move
  cannabis-user segments, so no score change; pattern follows the
  existing hemp entries.

## Sources actually read

- Queensland Government, "Low THC hemp foods" (qld.gov.au): prohibition
  until 12 November 2017, Code amendments permitting retail sale with
  requirements, definition of hemp seed foods.
- Wikipedia "Cannabis in Australia" extract (lead list only).
- Business of Cannabis, "Is cannabis legal in Spain?" — no; Spain review
  used for the parallel audit (see Spain note below). For Australia, the
  BoC page confirmed the 2015-rulings doctrine behind the 2021 reports.

## Spain audit (same pass)

"Spanish" Wikipedia legal events all present: 1860 hashish control, 1928
restrictions, 1967 law, 1974/1983/1984/1985 rulings and plans, 1988
reforms, 1992 Corcuera law, 1993 magazine, 1997 ARSEC conviction, 2001
motions and clubs, 2005 Sativex, 2012 plantation debate, 2015 rulings and
public-safety law, 2017 Catalan law, 2021 motion, 2023 mayor pledge,
2024–2026 items. No missing dated legal event; no change made.

## Validation and tree note

- Chain `au`: 1926 100→11, 1987 11→19, 2016 19→22, 0 flagged steps.
  Entries 3257→3258.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,354 pages, complete.
- Commit stages only the new entry hunk plus this note, via patch
  filtering. Foreign work in the shared tree is excluded and preserved.
