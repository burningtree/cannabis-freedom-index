# Solomon Islands: the 1949 amendment and the 1965 convention extension

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Solomon Islands profile and its five history entries before
editing. No book was used. This pass fills the 1940s and 1960s of the
1941–1982 gap with two dated entries and one article. Cameroon, Vietnam and
the other active country passes were left untouched.

## Sources actually read

- The Dangerous Drugs (Amendment) Regulation 1949, No. 8 of 1949, as
  reproduced in E/NL.1950/25 (United Nations legislative series under the
  1931 Limitation Convention, communicated by the United Kingdom). Read the
  full three-page PDF: made by the High Commissioner for the Western Pacific
  on 27 October 1949, published and exhibited the same day, amending
  section 39 of the Dangerous Drugs Regulation 1941 (No. 4 of 1941) by
  inserting non-compliance with any provision into a court
  compliance-order power. No definition or penalty changes.
- UN Treaty Collection, Single Convention on Narcotic Drugs 1961,
  multilateral treaties volume chapter VI-15 (PDF, read the parties and
  territorial-application pages): United Kingdom notification of
  26 January 1965, territorial application expressly listing the British
  Solomon Islands among some thirty territories (Fiji, Tonga and the
  Gilbert and Ellice Islands alongside Caribbean and African possessions).
- The UNTC Single Convention status page (already cited by the 1982 entry):
  independent Solomon Islands' succession deposited 17 March 1982.
- The authorised Cap. 98 reprint (already in the file): sections 2, 4–8
  (Indian hemp offences) and 39 (penalties) for the continuity claims.

Deliberately not used: E/NL.1955/39 and E/NL.1955/43 (both read; they extend
Part III to synthetic opioids, not cannabis); E/NL.1956/93 (read the head;
it is Aden's ordinance, not the Solomons'); a CRL-gazette 1932 Dangerous
Drugs Ordinance initially mistaken for a Solomons text (its enacting clause
names Nyasaland — kept out of this pass entirely); search-result snippets
about territorial succession mechanics (not relied on for any entry or
article claim).

## What changed

- New `solomon-islands-dangerous-drugs-amendment-1949` (1949-10-27,
  `other`, unscored): the procedural section-39 widening, with an explicit
  no-cannabis-change reason. Fills the 1940s.
- New `solomon-islands-single-convention-extension-1965` (1965-01-26,
  `international`): the UK ratification's territorial application to the
  British Solomon Islands, noting the 1982 succession. Fills the 1960s.
- `solomon-islands-dangerous-drugs-act-1941`: related link to the 1949
  entry. `solomon-islands-single-convention-1982`: one sentence noting the
  earlier British cover, plus a related link. No scores touched — both new
  entries are scoreless context, and today's profile scores did not change,
  so the profile file was not edited.

The timeline now has an entry in every decade from the 1940s except the
1970s (independence fell in 1978 with no recovered cannabis-law change) and
the still-estimated first restriction. The 1953, 1967 and 1968 amendments
and the 1978 legal notices listed in the reprint's endnotes remain
unrecovered; their contents are not described anywhere.

## Article

- `articles/solomon-islands-single-convention-extension-1965.md` (359
  words, three headings): the extension, what it required, and the path
  from British cover to 1982 succession, with links to the 1982 entry and
  `/country/sb/`. No picture: no openly licensed image shows the subject
  itself.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly two
  entries added and two entries revised (related links plus one sentence);
  no other country's entries changed, none removed.
- `node scripts/data-status.cjs chain sb`: estimate only, no flagged steps.
  `npm run scores:triage -- sb`: 1 scored, 0 open (the 1949 entry counts
  as reviewed/unscored).
- `npm run history:test`: 39 passed. `npm run answers:test`: 16 passed.
- Production build passed (4,200 pages). Both new history pages render
  with reference lists. Article: 359 words, three headings.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Solomon Islands hunks and files.
