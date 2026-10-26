# Research pass: Brunei 1978 article; Yugoslav code and Curaçao held

Research checked on 26 October 2026. Brunei's Wiki-only first ban becomes a
properly-sourced article from the Act itself; the Yugoslav-code cluster and
Curaçao stay untouched after primary searches came up short. No scores,
profiles or timelines changed.

## What was verified (all sources actually read)

- Laws of Brunei Revised Edition 2001, Cap. 27, Misuse of Drugs Act, via the
  UNODC copy of Brunei's E/NL.2008/7 communication (68 pp. PDF, read in
  extracted text): long title, 1 July 1978 commencement, ss. 5–8 (import/
  export, possession/consumption, paraphernalia, cannabis/opium/coca
  cultivation), s. 9 premises liability, s. 2 cannabis and cannabis-resin
  definitions, s. 15 trafficking presumption (15g cannabis, 10g resin),
  First Schedule Part II Class B list ("Cannabis and cannabis resin";
  cannabinol Class A only outside cannabis/resin), Second Schedule
  trafficking bands (cannabis 330–500g: 20–30 years + 15 strokes; over 500g:
  death; resin 130–200g / over 200g). New
  `articles/brunei-misuse-of-drugs-1978.md` (~380w body, 4 sections).
  Entry `brunei-misuse-of-drugs-1978` rewritten with per-sentence [@1] and
  the Wikipedia source replaced by the Act.
- Correction: the old entry said cannabis "was reclassified as Class B in
  2001". The consolidation's amendment markers date the class structure to
  S 28/94 and S 42/98 (1994/1998), so the article and entry now say only
  that the 2001 consolidation lists cannabis as Class B — no year-of-change
  claim.

Claim boundaries: the Class B label describes the consolidated schedule,
not necessarily the Act's first day; the note flags that explicitly.

## Dead ends recorded, not forced

- Yugoslav 1929/1930 code text: searched (Serbian terms, wikisource-style
  queries) with no readable code text found. Read Medarević & Đorđić 2024
  (Vojnosanitetski pregled 81(04), via SCIndeks OJS download endpoint) in
  full instead: it documents hashish/asrar use culture in Belgrade across
  1918–1941 (Skadarlija, Terazije, Vreme reportage) but says nothing about
  the code's drug provisions, so it cannot support the seven sibling entries
  (`rs/hr/si/ba/me/mk/xk-yugoslav-code-1930`) and they were left untouched.
  The 1929-enactment / 1-Jan-1930-force dates from the earlier pass stand.
- Curaçao 1929 ordinance (P.B. 1940 no. 138): Dutch-language primary search
  returned only mainland Opium Law material and League-era diplomacy; no
  Antillean gazette text. Entry left as-is.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/brunei-misuse-of-drugs-1978/` citation marks checked.
- Commit limited to own work: the Brunei hunk in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
