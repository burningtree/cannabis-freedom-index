# Greek public-use orders: distinguishing circulars from blanket bans

16 October 2026. **Two new records and articles; one corrected record and rewritten
article.** No current country profile or score values changed.

## Substantive reading

Read Konstantinos Gkotsinas, *Poisons sociaux: Histoire des stupéfiants en Grèce
(1875–1950)*, École française d’Athènes, **2022**, print ISBN **978-2-86958-575-1**;
online edition **2023**. The publisher title page establishes these dates.

The relevant source is [chapter 1, “Les acteurs sur scène (1875–1920)”](https://books.openedition.org/efa/15566),
**paragraphs 44–48**, especially **45** and **notes 108–110**. Also read relevant
parts of chapter 3, paragraph 4 (municipal police/public use), and the chronological
annex and source bibliography.

The web text tool encountered Anubis on the chapter pages. Normal navigation in
the in-app browser loaded the complete readable text. The chapter's actual
paragraphs and footnotes were read through its accessibility tree, rather than
promoting search snippets. No CAPTCHA or paywall was bypassed. Only relevant
sections were reviewed, not the entire book. The online book was not represented
as a newly supplied local library file.

The legal account distinguishes:

- **27 March 1890**, source-reported date: Interior Minister Stéphanos Dragoumis
  asks prefects to obtain municipal/police orders against hashish use in cafés
  and elsewhere. Note 108 cites *Elliniki Georgia*, **1892, pp. 525–526**.
- **September 1891**: Athens–Piraeus administrative-police order. Note 110 identifies
  **No. 13509/30.09.1891**, citing the same periodical, **1892, p. 526**. It concerns
  public use, closure of supplying establishments, seizure of sale proceeds and
  destruction of smoking equipment.
- **1897**: the same note identifies a further order with the same content and
  cites **Voultsos 1901, pp. 220–221**. No exact day or order number is established
  by the passage read.

Neither the original instruments nor the cited periodical and 1901 compilation
were independently retrieved. The new records explicitly state that distinction.
The book's account rests on early sources and supplies a traceable research
basis; it is not itself the original enactment.

## Independent contemporary account

Read [*Report of the Indian Hemp Drugs Commission*, volume I, chapter XIV](https://abuse-drug.com/lib/Indian-Hemp-Commission-Report/chapter-xiv.html),
**paragraphs 557, 560 and 562**. Paragraph 557 says the relevant Greek information
came from British representatives' correspondence in **1892**. Paragraph 560
reports a **1891** café sale-and-consumption restriction in Athens and Piraeus,
while reporting commerce in the product as merchandise was permitted. It does
not claim a measured result of the order. The transcription has OCR defects;
these were not treated as intentional legal wording.

This is useful contemporary evidence for a narrower public-premises rule. It
cannot independently verify the **1897** order, which postdates the report.

## Database decisions and calendar limits

Corrected `greece-hashish-ban-1890`: title, category `tightening`, description,
new citations and related link; rewrote article. Existing ID, source-reported
**1890-03-27** date and all score values remain. Older broad accounts, including
the previously reviewed Stefanis/Ballas/Madianou chapter, remain in the event's
source history. Their cultivation/import/use-ban description is now explicitly
qualified against the newer archival account and contemporary commission.

Added `greece-athens-piraeus-public-hashish-order-1891` and
`greece-athens-piraeus-hashish-order-renewal-1897`, unscored, checked against the
limited claims in the sources actually read. Each has an article.

The new 1891 record uses **year precision** while its text gives the historian's
reported order date. Greek historical documents require Julian/Gregorian care;
this pass did not silently convert the dates. The 1897 record likewise has no
unsupported precise day. The original 1890 date is explicitly identified as
source-reported rather than independently calendar-normalized.

**Score-history limit:** the existing scored 1890 event implies a large drop in
national freedom. Narrowing its legal scope means that allocation requires
reconstruction against later legislation. This pass preserves the numbers and
flags the issue; a structural chain check cannot certify their historical accuracy.

## Prison circular: unresolved date, no new entry

Chapter 1 paragraph 45 places the Justice Ministry's prohibition on introducing
hashish into prisons “a few days” after the March 1890 circular. Note 109 cites
**Liakopoulos 1894, pp. 67–71**. The [chronological table](https://books.openedition.org/efa/15606),
however, groups the prison-introduction measure under **1891**. Both were read in
the browser. The source bibliography identifies Ilias Liakopoulos's 1894 *Code
of Greek Legislation* as the early source, but its relevant pages were not retrieved.

Blog extracts supplying **6 April 1890**, circular **6348**, or an exact 1897
police-order date were not treated as verified instruments. No prison record was
added from this unresolved chronology. This is a concrete next retrieval target.

## Validation

- `npm run build` passed: **3,060 pages**.
- All three generated article pages and corresponding JSON export records were
  inspected for IDs, dates and titles.
- Greece’s structural score-chain check has zero flagged steps, while the
  historical allocation of its 1890 score drop remains explicitly unresolved.
- Existing 1890 `before` values were compared against the index and preserved.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned a copy of the scholarly chapter and none for
  the commission transcription. Existing archive records were preserved.
