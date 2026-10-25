# Madagascar: reading the 1962 UN scan, 25 October 2026

The 21 October pass added Madagascar's 1958 and 1960 rongony entries but left both unchecked. It
had read only indexed text of UN document E/NL.1962/8; the PDF scan would not download. This pass
recovered the two-page scan, read it both as extracted text and as an image, and used it to verify
the entries. No scores changed.

## The document

**United Nations, E/NL.1962/8, 6 August 1962, French only.** The document communicates Madagascar's
Ordinance 60-073 to the Secretary-General under the 1931 Narcotics Convention, as amended by the
1946 Protocol. Its two pages reproduce the ordinance from the *Journal officiel de la République
malgache*, no. 113 of 6 August 1960, p. 1372.

Page 1, explanatory memorandum:

- Paragraph 1(a) describes the decree of 9 October 1915, promulgated by an order of 3 December
  1915 and published in the colonial official journal on 11 December 1915, p. 1222. It punished
  preparation, peddling, sale and consumption with a fine of 100 to 3,000 francs and six days to
  twelve months in prison, or one of those penalties alone.
- Paragraph 1(b) describes order 145-CG of 23 May 1958, which made deliberation 58-34/AR of
  17 April 1958 enforceable. It added cultivation and possession to the earlier offences and set
  eleven days to one month in prison and a fine of 36,001 to 60,000 metropolitan francs; repeat
  offences could bring two months and 100,000 francs. The order was published in the *Journal
  officiel* of 31 May 1958, pp. 1241–1242.
- Paragraph 2 argues that the existing maximum of one year was disproportionate, that rongony was
  a narcotic classified in France in Table B, that its effects were analogous to opium, and that a
  kilogram of rongony cost twenty times less than a kilogram of opium. It cites police reports of
  spreading consumption.

Page 2 gives the ordinance's operative articles:

- Article 1 prohibits cannabis cultivation throughout the territory.
- Article 2 prohibits preparation, transport, sale, possession and consumption.
- Article 3 sets six months to five years in prison and a fine of 10,000 to 1,000,000 francs, or
  one of those penalties alone.
- Article 4 applies the same penalties to anyone facilitating an offence by providing a vehicle or
  premises, for payment or free, or by any other means. The court must confiscate the vehicle or
  close the premises, and a residence ban follows automatically.
- Article 5 repeals contrary provisions, in particular the 1915 decree and the 1958 deliberation
  made enforceable by order 145-CG.
- Article 6 provides for publication in the *Journal officiel* and execution as a law of the
  Malagasy state. The ordinance is signed at Tananarive on 28 July 1960 by President Philibert
  Tsiranana, Justice Minister René Rakotobe and Interior Minister André Resampa.

The extracted text has OCR errors, especially around accents and the abbreviation for francs. The
penalty figures were checked against the page images.

## Database changes

- `madagascar-cultivation-possession-penalties-1958` is now `checked: true`. The description names
  the Representative Assembly, gives the fine range of 36,001 to 60,000 francs, and records the
  repeat-offence maximum of two months and 100,000 francs. The locator points to PDF p. 1,
  paragraph 1(b), and the *Journal officiel* pages.
- `madagascar-rongony-penalties-raised-1960` is now `checked: true`. The description gives the
  fine range of 10,000 to 1,000,000 francs and says "or either punishment alone". The locator points
  to PDF pp. 1–2, memorandum paragraphs 1–2 and Articles 1–6, and the *Journal officiel* page.
- The 1915 entry was not changed. Its description already matched the memorandum's account of the
  1915 decree, including the 100 to 3,000 franc fine and the six-day to twelve-month prison range.
- `articles/madagascar-rongony-penalties-raised-1960.md` now has per-sentence citations. Its first
  source locator records that the scan was read, and its country link was corrected from Myanmar to
  Madagascar.

## Why the scores did not move

The existing vectors already describe the changes the scan confirms:

- 1958 takes possession and cultivation from 10 to 1. Before the 1958 order, the 1915 decree
  covered preparation, sale and consumption but not cultivation or possession. The order added
  those offences with a maximum of one month and a substantial fine.
- 1960 takes possession and cultivation from 1 to 0 and enforcement from 2 to 1. The maximum rose
  to five years, so prison became a realistic outcome for a user, while the law still allowed a
  fine alone. Sharing and consumption stayed at their previous scores; the ordinance applied the
  same penalty clause to sale, possession and consumption but did not create a separate sharing
  offence.

The chain remains `1915 100 → 55`, `1958 55 → 10`, `1960 10 → 3`, `1997 3 → 9`, with no direction
flags.

## Remaining gaps

- The original 1958 deliberation and order 145-CG were not recovered. The 1960 memorandum is a
  government account written two years later, and the entry says so. The penalties and the date
  are verified from that account, not from the 1958 gazette itself.
- The 1960 ordinance is dated 28 July 1960 and published on 6 August. The entry keeps the signature
  date, consistent with the existing Madagascar timeline; the article says "signed", not that the
  ordinance became enforceable that day. A commencement notice or the gazette's own effective-date
  rule would settle the point.
- The 1997 law is still read from the Ministry of Commerce reproduction, not a complete original
  gazette. The article uses it only for the repeal and the separate personal-quantity sentences.
- The 1915 local promulgation order of 3 December 1915 was not independently read; the 1960
  memorandum is the source for that date.

## Validation

`node scripts/data-status.cjs chain mg` gives the four steps above with no flagged changes.
`npm run history:test` passed 38 tests, `npm run answers:test` passed 16, and `npm run build`
built 4,142 pages. The 1960, 1958 and 1915 history pages were checked in the built output: every
citation mark resolves, and the internal links to 1915, 1958, 1997 and Madagascar resolve. The 1960
page cites all three of its sources.
