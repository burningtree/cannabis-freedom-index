# Taiwan: the 1973 treatment amendment and the 1992 rewrite

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Taiwan profile and its nine history entries before editing.
No book was used. This pass fills the 1970s and 1990s of the 1955–1998 gap
with two dated entries and one article. Cameroon and the other active
country passes were left untouched.

## Sources actually read

- Wikisource 戡亂時期肅清煙毒條例 (民國44年): the 1955 original, in full —
  Article 4's one-month self-report window, Articles 5/7/9/10/14 penalty
  structure (cannabis sale death-or-life, use 1–3 years, possession
  6 months–2 years), martial-law purpose.
- Wikisource 戡亂時期肅清煙毒條例 (民國62年): the 1973 revision, in full —
  legislated 12 June, promulgated 21 June 1973, amending Articles 4 and 9.
  Article 4 reopened treatment-before-discovery without the one-month limit;
  Article 9's use ranges are textually identical to 1955 apart from
  rewording, including treatment-first, the two-thirds aggravator and the
  third-offence death penalty.
- Wikisource 肅清煙毒條例 (1992 revision): the current-page text, in full —
  legislated 3 July, promulgated 27 July 1992, renaming to the Narcotics
  Elimination Act. Purpose de-martial-lawed; Article 4 treatment exits
  widened (designated centres, non-addict surrender); death penalties
  softened to death-or-life in Articles 5, 9 and 14; fines redenominated in
  New Taiwan dollars; cannabis use and possession ranges unchanged;
  observation detention and sentence credit added.
- MOJ legislative history (English): the amendment list confirming the
  1973 Articles 4/9 amendment, the 1992 renaming and amended articles, and
  the 1998 full revision. Used only as an index, not for content.

## What changed

- New `taiwan-voluntary-treatment-1973` (1973-06-21, easing, unscored):
  the reopened treatment exemption; penalties unchanged so no segment
  moves. Fills the 1970s.
- New `taiwan-narcotics-revision-1992` (1992-07-27, `other`, unscored):
  the de-martial-lawed rewrite with wider treatment exits and softened
  death penalties; cannabis ranges unchanged so no segment moves. Fills
  the 1990s.
- `taiwan-narcotics-act-rewritten-1998`: related link to the 1992 entry.
  No scores touched — both new entries are scoreless context, and the
  timeline's single scored step (1955 100→2) is unchanged, so the profile
  file was not edited.

## Article

- `articles/taiwan-narcotics-revision-1992.md` (369 words, four headings):
  the purpose rewrite, treatment exits, softened deaths, sentence-credit
  mechanics, and the bridge to 1998. Links to `/country/tw/`.

## Still open

- The exact promulgation-day gazette citations for 1973 and 1992 (dates
  rest on the statutes' own legislative/promulgation lines, which is
  standard for this file).
- Whether the 蔴煙 reading bears on the 1955 scores; out of scope here.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly two
  entries added and one entry revised (related link); no other country's
  entries changed, none removed.
- `node scripts/data-status.cjs chain tw`: single scored step, no flags.
  `npm run scores:triage -- tw`: no open items from this pass (both new
  entries carry `unscored` reasons; the 2009 entry was already reviewed).
- `npm run history:test`: 39 passed. `npm run answers:test`: 27 passed.
  `npm run scores:triage -- tw`: 1 scored, 0 open.
- Production build passed (4,222 pages). Both new history pages render.
  Article: 369 words, four headings.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Taiwan hunks and files.
