# Eswatini: the 1976 penalty order and the 1980s sentencing bands

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Eswatini profile and its seven history entries before
editing. No book was used. This pass closes the open 1952 score-triage item
as reviewed, fills the 1970s and 1980s with three entries, and writes two
articles. Cameroon and the other active country passes were left untouched.

## Sources actually read

- United Nations E/CN.7/286/Add.3 (1955), the Swaziland cannabis survey, in
  full via documents.un.org: statutory provisions (1922 Regulation as
  amended in 1931 and 1952), sections 2–9 and 13–14, the £500/three-year
  section 8 maxima, possession and use limits, 1945–1952 seizure and
  prosecution figures, smoker/trafficker sentencing practice, and the source
  list (1931 and 1952 amendment proclamations, High Commissioner's Notices).
- High Court of Swaziland, King v Phiri, SZHC 13 (19 November 1986), in
  full: the section 8(1) quotation (E2,000 fine or five years), the
  statement that the King's Order-in-Council No. 2 of 1976 raised the
  maxima from E500 and three years, the full sentencing bands
  (personal use, supply, wholesale, couriers, retail, isolated and social
  supply, motive, offender circumstances, public interest with black-market
  prices), and the substituted three-year sentence with eighteen months
  suspended for 14.85 kg of dagga.
- High Court of Swaziland, Magagula v King, SZHC 16 (judgment 7 June 1989),
  in full: the 9,705-plant field, the four-year magistrate sentence, the
  application of the Phiri bands, and the reduction to two years with one
  suspended. The case header carries an 18 September 1987 date while the
  judgment itself is dated 7 June 1989 in appeal 20/89; the entry uses the
  judgment date.
- The EswatiniLII 1922 Act page itself could not be read (Cloudflare wall);
  no claim rests on it alone. The profile's section 15 definition and
  section 8 account are consistent with the three read sources.

Deliberately not used: a CRL-gazette 1932 Dangerous Drugs Ordinance found
during Solomon Islands work (its enacting clause names Nyasaland, not
Swaziland); search snippets about a Pharmacy (Amendment) Act of 1992 as the
source of the five-year rule (the 1986 and 1987 judgments quote section 8
of the 1922 Act directly, which settles the authority).

## Score handling

- `swaziland-penalties-1952` was the one open triage item. It now carries
  an `unscored` reason: maxima rose, but the survey's own sentencing
  figures show fines remained typical for users, so no segment level
  changes. Reviewed, not scored.
- New `swaziland-penalty-increase-1976` (tightening, unscored): the
  E500/three-year to E2,000/five-year rise, with the same no-level-change
  reason grounded in the recording judgment's own account of fines
  remaining typical for users.
- New 1986 and 1989 entries are `enforcement` with court and sentencing
  tags; they move no scores.
- Chain unchanged: 1922 100→11, no flagged steps. `scores:triage sz`
  reports 1 scored, 0 open. Today's profile scores (total 11) did not
  change, so the profile file was not edited.

The timeline now has an entry in every decade from the 1920s to the 2020s
except the 1960s and 1970s-as-enacted (independence fell in 1968 with no
recovered cannabis-law change; the 1976 order's exact commencement day is
likewise unrecovered, so it is dated by year). The pre-1952 maxima and any
post-1976 amendment before the 2020s bills remain open.

## Article

- `articles/swaziland-penalty-increase-1976.md` (350 words): the 1976
  raise, the Phiri bands, and the 1989 application. It follows `WRITING.md`:
  plain headings, per-source citations, links to neighbouring entries and
  `/country/sz/`. No picture: no openly licensed image shows the subject
  itself.

The 1922 Act already has a compliant article from 13 October (370 words),
left untouched; this pass's entries link to it where relevant.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly three
  entries added and one entry revised (1952 `unscored`); no other
  country's entries changed, none removed.
- `node scripts/data-status.cjs chain sz`: no flagged steps.
  `npm run scores:triage -- sz`: 1 scored, 0 open.
- `npm run history:test`: 39 passed. `npm run answers:test`: 16 passed.
- Production build passed (4,207 pages). All three new history pages render
  with reference lists. Article: 350 words, three headings.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Eswatini hunks and files.
