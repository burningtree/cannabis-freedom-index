# Earliest cannabis prohibitions — 15 October 2026

Subsequently extended and corrected by the [article/source pass](earliest-ban-articles-2026-10-15.md):
Cafour is now dated by 1244, Baybars to 1266, with existing page IDs retained.
The follow-up supersedes the unresolved leads below where it records new evidence.

Read `docs/DATA-MAINTENANCE.md` before editing. Database is `changes.yaml`;
existing Rio 1830, Mauritius 1840 and Merina 1787 entries were identified before
adding anything. No duplicate modern bans were created.

## Changes

Four new context records: Cairo/Cafour 1253, Damascus/Baybars 1265, Cairo 1324,
and Egyptian suppression in 1378. The titles and descriptions distinguish
attributed historical accounts from an independently verified first national ban.
Corrected `egypt-french-ban-1800` to 8 October and named Menou, replacing its
Wikipedia-only sourcing with David Guba's archival research. Corrected its existing
article's opening, attribution and imprisonment wording. Retained its original
written date; updated its model field for the revision.

Renamed the title of `egypt-first-ban-1868` to avoid implying there were no earlier
restrictions. Kept the existing ID so links and its article continue to resolve.

## What was actually read

- Ernest L. Abel, *Marihuana: The First Twelve Thousand Years* (1980), chapter 2,
  “Hashish and the Arabs,” subsection “The Gardens of Cafour,” online transcription:
  https://www.druglibrary.drugsense.org/schaffer/hemp/history/first12000/2.htm
  Relevant subsection read in full. This is a later account; no medieval manuscript
  or full-book review is claimed. Its sensational analogies and broad claims about
  Sufism are not adopted. No page number invented for the HTML transcription.
- Sami Hamarneh, “Pharmacy in Medieval Islam and the History of Drug Addiction,”
  *Medical History* 16(3), 1972, pp. 236–237, full PDF accessed through Cambridge:
  https://www.cambridge.org/core/services/aop-cambridge-core/content/view/F7B7D4562BFC3B03B874D0D972E5E772/S0025727300017725a.pdf/pharmacy-in-medieval-islam-and-the-history-of-drug-addiction.pdf
  Relevant two-page section read. Its conversion of 664 AH to 1265 CE is suspect;
  1265 is stored as the author's stated year, with the discrepancy explicit in
  the description and locator. His printed reign dates and sweeping explanations
  of civilisational decline are not adopted. The earlier chat called this a firm
  1265–1266 event; the database records the narrower attributed evidence.
- David A. Guba Jr., “The Real History of France’s First Anti-Drug Law,” *Points*,
  9 August 2016, updated 29 August 2023:
  https://www.pointshistory.org/post/the-real-history-of-france-s-first-anti-drug-law
  Full discussion and archival notes read. The original military manuscript was
  not examined independently.

`checked: true` means the entries were checked against those read accounts, not
that the underlying medieval sources or manuscript were independently inspected.
No search-result-only claim is promoted to a checked entry. The MDPI Baybars
article could not be opened (web error and HTTP 403); it is not used as a database
source. The chat's reported 1244 alternative remains an unverified lead, so no
separate 1244 event was manufactured. Rosenthal's *The Herb* remains a follow-up.

## Scope and scores

No country profiles or scores changed, and no score timelines were re-based.
The Cairo records describe local or episodic enforcement, while the Baybars
account lacks a verified continuing regime and end date. Assigning their effects
through to modern first-ban records would fabricate centuries of national scores.
The existing temporary-occupation treatment of 1800 is retained. A future scored
reconstruction needs evidence of scope, intervening licensing/repeal, and duration.

Rio's exact October date and conflicting three/eight-day punishment reports were
not resolved here; its existing qualified description was preserved. Mauritius
already has book-supported coverage and its 1883 repeal. Merina's exact 1787 date
still needs stronger sourcing and was not silently re-certified.

## Verification

- `npm run build` passed: 3,027 pages.
- Egypt and Syria chain checks each reported zero flagged steps; no scored
  entry or country profile was changed.
- Browser checked Egypt's History tab (26 entries), the new Baybars page's
  citation/date caveat, and the before-1860 history listing.
- Generated `dist/data/history.json` contains all four new IDs and Menou's
  corrected `1800-10-08` date (2,368 entries overall).
- `git diff --check` passed. No full-file history re-sort, commit or deployment.
- The pre-existing staged changes in `source-archive.json` were left untouched.
  Archive lookup/save remains a follow-up for the newly introduced URLs; the
  shared archive file was not rewritten during this pass.
