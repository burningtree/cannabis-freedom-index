# Japan: triage closed plus Wikipedia audit and 1968 primary upgrade

Research checked on 27 October 2026. Read `DATA-MAINTENANCE.md`, the Japan
timeline and profile, the English Wikipedia History and Legal-status
sections in full (used as an audit checklist), and the Nagahama 1968 UN
Bulletin article (read in full on UNODC). No scores or profiles changed.

## What changed

- Four triage opens closed as unscored with reasons: Hokkaido 2003 wild
  eradication; Tottori 2016 prefectural hemp-licensing ban; 2021 panel
  recommendation (superseded); 2023 reform passage (scored at 2024
  commencement).
- `japan-foreign-violators-1968`: first sentence converted to per-sentence
  citation on the Nagahama primary (read; confirms foreign-origin wording
  verbatim with the Vietnam-leave detail); stats sentence stays
  Wikipedia-sourced. (Also fixed an unquoted-colon YAML bug the test
  caught.)

## Wikipedia audit result (no missing dated events)

Our timeline already covers everything dated in the article: 1948 Act, 1950
farms, 1968 foreigners, 1980 McCartney, 1982 definition, 1985 upholding, 2003
Hokkaido, 2008 sumo and drug strategy, 2016 Tottori, 2021 panel, 2023 reform,
2024 use crime, plus the conventions.

## Lead resolutions (27 October 2026, second pass)

- Hirohito's 1947 Tochigi visit is now `japan-hirohito-hemp-assurance-1947`
  (culture/hemp context: changed no law). Sourced from Stars and Stripes
  "Reefer gladness" (Wayback 2022 capture, read in full: 1947 photo, "it is
  said" assurance account, 25,000 pre-ban farms, licence costs and chemical
  fibres) plus the audit-read Wikipedia. The Japan Times piece stays unread
  behind paywall; the entry hedges with "its director says".
- dappo-habu (2010s "loophole herb" driving incidents and crackdowns):
  CLOSED as out of scope. Dappo habu is synthetic cannabinoids sprayed on
  herbs; herbal cannabis was already banned since 1948, and no dappo measure
  changed cannabis rules. No entry (cf. Cuba Dictamen 476 handling).

## Validation and tree note

- Chain `jp`, `history:test` 40/40, `answers:test`, production build to be
  run before commit.
- Commit stages only these five hunks plus this note, via patch filtering
  without stashing. Foreign work in the shared tree stays untouched.
