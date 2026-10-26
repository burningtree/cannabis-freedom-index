# Jersey, 1955 to 1998: filling the 64-year gap

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Jersey profile and its eight history entries before editing.
No book was used. Jersey had the longest modern gap in the history: no entry
between the 1954 dangerous drugs law and the 2018 medical-prescribing vote.
This pass adds six entries, gives the 2019 medical order the score step it was
missing, verifies the one unchecked Jersey entry (the 2024 Centenier fines),
re-dates and rewrites the 1954 entry, and writes two articles. Cameroon was
left to another agent; nothing outside Jersey was touched.

## Sources actually read

Jersey Law refuses plain fetches (it returns a block page), so the enacted
PDFs were read through Wayback copies of the same `jerseylaw.je` addresses,
then extracted with `pdftotext`. What was read in full:

- Dangerous Drugs (Jersey) Law, 1954 (L.5/1954): arrangement, Articles 1–4
  (Part I: raw opium, coca leaves, Indian hemp and resin preparations;
  import/export only under licence, through St Helier or the airport),
  Article 3 (Committee power to control production, possession, sale and
  distribution by order), Article 10 (extracts and tinctures of Indian hemp
  in Part III), Article 14(2) (fine up to £1,000, ten years, or both, plus
  forfeiture), Article 21 (repeal of the Loi passed 1 October 1923 and
  confirmed 19 December 1923) and Article 22 (commencement by appointed day).
- Dangerous Drugs (Jersey) Law, 1954 (Commencement) Act, 1954 (R&O 3503):
  the law came into force on 1 January 1955; repeal of four named provisions
  of the 1923 Loi waited until 1 January 1957.
- Dangerous Drugs (Amendment) (Jersey) Law, 1965 (L.17/1965): Article 2
  (Indian hemp becomes cannabis and cannabis resin), Article 7 (occupier
  permitting premises for smoking or dealing) and Article 8 (knowing
  cultivation except under licence). Sanctioned 18 September 1965,
  registered 5 November 1965; the law has no separate commencement article,
  so the entry is dated by year only.
- Dangerous Drugs (General Provisions) (Jersey) Order, 1966 (R&O 4779):
  Articles 1–4 (supply, procuring, advertising and possession of cannabis
  other than extracts and tinctures, except as authorised or licensed;
  general authority for practitioners, veterinary surgeons, authorised
  sellers of poisons and hospital pharmacists), Article 12 (authorised
  sellers may still make and dispense extracts and tinctures), and
  Article 32 (made 18 April 1966, in force 1 May 1966).
- Misuse of Drugs (Jersey) Law, 1978 (L.10/1978): Second Schedule Part II
  (cannabis and cannabis resin, Class B), cannabinol in Class A, Fourth
  Schedule penalties (Class B possession five years, supply and intent
  fourteen) and Fifth Schedule repeals (1954, 1965, 1964 and 1972 laws).
- Misuse of Drugs (Jersey) Law, 1978 (Appointed Day) (No. 2) Act, 1980
  (R&O 6797): everything not already in force came into force on
  1 May 1980. The endnotes of the consolidated law record the first
  appointed day (Articles 2 and 30 and Schedule 1, 1 January 1979,
  R&O 6603); only the 1980 date is used in the entry.
- Crime (Public Order) (Jersey) Law 2024 (L.9/2024): Article 13(3) inserting
  Article 28A into the 1978 law (Centenier level 1 fine for Class B/C
  possession accepted by the person charged); adopted 7 February 2024,
  registered 11 October, in force 18 October 2024.
- Attorney General's Directive 1/2015 letter and Centenier Written Caution
  Guidelines (gov.je, read through Wayback): the 2015 directive replaces
  the 1998 guidance; the guidelines set cannabis at up to 15 g, Class B,
  for a written caution.
- Cannevi, *Cannabis Prohibition in Jersey* (read in full as text): the
  1923 Loi's opium-and-cocaine focus, the Home Office letter of
  30 January 1939 calling it "much out of date", the 1971 modification
  order's schedule text, and the 1980 designation order. Cross-checked
  against End Cannabis Prohibition Jersey, *Legal Status of Cannabis in
  Jersey* v1.4 (11 December 2025, read in full), whose timeline agrees on
  1954/55, 1965, 1966, 1971, 1978/80, 1998 and 2015.

Search snippets were leads only. The 1971 order's own PDF (R&O 5492) is not
in the Wayback Machine, so the 1971 entry rests on the two read secondary
accounts that reproduce its schedule; it is a context entry.

## What changed

- `jersey-dangerous-drugs-law-1954` keeps its id but is now dated
  1955-01-01, the commencement the old entry skipped in favour of the
  sanction date (13 April 1954). Its old description claimed the law
  "controlled the import, export, production and sale" of Indian hemp;
  the text controls import and export directly and only empowers orders
  for the rest. Rewritten, with the repeal of the 1923 Loi stated.
- New scored steps: 1965 cultivation and premises offences, the
  1 May 1966 possession and supply ban (the large drop), the 1998
  Attorney General caution directive, and the 2019 medical order, which
  previously had no `before` although it is the step behind today's
  access score.
- New context entries: the 1971 cannabinol listing, the 1978 law as it
  took full effect on 1 May 1980 (mixed: possession maximum fell from ten
  years to five while supply rose to fourteen, so `other` with an
  `unscored` reason), and the 2015 caution guidelines (wider amount, same
  handling, so `unscored`).
- `jersey-centenier-drug-fines-2024` was the last unchecked Jersey entry.
  The 2024 law was read; the entry is now `checked: true` with the
  commencement date and a locator.
- `jersey-local-medical-prescribing-2020` got an `unscored` reason (first
  local clinic, not the legal step), clearing Jersey's score triage.

## Score handling

The old chain dropped 100 to 16 in one step at 1954 and credited the 1955
position with today's access score. The rebuilt chain is:

1955 100→97 (border licensing only) · 1965 97→70 (growing and smoking
premises) · 1966 70→12 (possession and supply) · 1998 12→14 (Parish Hall
caution) · 2019 14→16 (medical access 1→3) · 2024 16→19 (today).

Access is 1, not 0, after 1966 because authorised sellers of poisons could
still make and dispense cannabis extracts and tinctures. Today's profile
scores did not change, so the profile file was not edited. `data-status
chain je` reports no flagged step; `scores:triage je` reports no open
entry. Silent decades fall from six (1960s–2000s except the 2010s) to
none between the 1950s and the 2020s.

## Articles

- `articles/jersey-possession-ban-1966.md` (the 58-point drop).
- `articles/jersey-dangerous-drugs-law-1954.md` (the first restriction).

Both follow `WRITING.md`: 350–500 words, plain headings, per-source
citations, links to the neighbouring entries and `/country/je/`. No
picture: no openly licensed image shows the subject itself.

## Still open

- The 1923 Loi's text is not online (a government FOI answer says the same),
  so its lack of a cannabis offence rests on Cannevi's research and the
  1954 law's structure, not on the Loi itself.
- The 1965 law's exact commencement day: the entry uses the year.
- Parish Hall practice before 1998 (police annual reports quoted by
  Cannevi were not opened) and the 2019 second-offence extension and 2022
  consolidated guidance, which would extend the caution story.
- Guernsey's first loi is dated 1931 by Cannevi and 1934 by the legal-status
  paper; that disagreement was noted and not used anywhere.

## Validation

- Parsed-history comparison against the pre-edit snapshot
  (`/tmp/je-base/changes-before.yaml`): exactly six entries added and four
  Jersey entries changed (1954 rewrite, 2019 `before`, 2024
  checked/citations, 2020 `unscored`); no other country's entries changed,
  none removed. Total history 3,159 → 3,165 entries.
- `node scripts/data-status.cjs chain je`: no flagged steps;
  `npm run scores:triage -- je`: 0 open entries.
- `npm run history:test`: 38 passed. `npm run answers:test`: 16 passed.
- Production build passed (4,160 pages). The two new article pages and
  `/country/je/` were spot-checked in `dist/`: titles, dates, score steps
  and reference lists render.
- Articles checked at 361 and 353 words, three headings each, every
  citation mark naming a listed source.
- The other agent's Cameroon commit (`dd17a4e`) landed during this pass;
  its remaining uncommitted `source-archive.json` work was left untouched
  and is not part of this commit.
