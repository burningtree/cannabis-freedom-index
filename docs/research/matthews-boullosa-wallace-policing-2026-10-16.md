# Matthews and Boullosa/Wallace: policing and border enforcement

Second research pass on the new library, 16 October 2026. Coverage is recorded in
`docs/books.yaml`. Book files and extractions remain local and ignored.

## What was read

- Patrick Matthews, *Cannabis Culture*, Bloomsbury, updated paperback 2003,
  ISBN 0-7475-6614-3: *Afterword: A Potted Sequel*, printed [223]–236,
  PDF 235–248. Remaining pp. 237–254 are not credited as read. No clinical
  claims adopted from the later pages.
- Carmen Boullosa and Mike Wallace, *A Narco History*, OR Books, 2015,
  ebook ISBN 9781939293800: complete chapter 3, *1960s–1970s*, including
  notes 7–9. Reflowable EPUB, `OEBPS/10_ch03.xhtml`; no invented print pages.

## UK: a pilot before reclassification

Matthews pp. 232–234 describes the Lambeth experiment and the political arguments
around reclassification. Added the context event
`uk-lambeth-cannabis-warning-pilot-2001` and its article; expanded the existing
2004 article with the link and corrected the Runciman report year.

Primary checks:

- [Paddick’s memorandum to the Home Affairs Committee, October 2001](https://publications.parliament.uk/pa/cm200102/cmselect/cmhaff/318/318ap15.htm)
  describes the pilot as an exercise of existing arrest discretion. It gives
  1 July as the start.
- [Ainsworth’s written answer, 29 October 2001](https://api.parliament.uk/historic-hansard/written-answers/2001/oct/29/cannabis)
  gives 2 July. Retained **month precision** for the new event rather than hiding
  the one-day difference. The answer also links evaluation to the future
  reclassification decision.
- [Police Foundation publication record](https://www.police-foundation.org.uk/publication/inquiry-into-drugs-and-the-law/)
  dates its inquiry report to **28 March 2000**. The existing 2004 article had
  wrongly said 1999. Matthews p. 230 also says March 2000.
- [SI 2003/3201](https://www.legislation.gov.uk/uksi/2003/3201/made)
  expressly states commencement on **29 January 2004**. The web reader failed
  on XHTML, so the official `/made/data.xml` text was retrieved and examined
  locally. It confirms both the made date and commencement date.

Matthews p. 226 speaks of cannabis as already Class C. The 2003 book cannot fix
commencement independently of the statutory order. Page 232 also places the June
2001 election after the July pilot; that reversed sequence is not imported.
His initial impression of street dealing and a resident’s rebuttal show the limits
of a visit as causal evidence. His descriptions of projected Swiss reforms and
medical products are period accounts, not later outcomes or current law.

**Pagination correction:** the contents lists the afterword as starting at 225,
but PDF 235 contains its opening and PDF 236 is explicitly numbered 224.
The actual opening is therefore unnumbered printed **[223]**. Visually inspected
both leaves and the Brixton passage on PDF 244 / printed 232. Corrected the
catalogue’s start from 225 to 223 and recorded the discrepancy; did not transfer
reading credit to unexamined pages.

No national score change was assigned to the local pilot. This was not a new
statutory possession exemption or a lawful supply market.

## Mexico: Operation Intercept, checked against diplomatic records

Chapter 3 supports a fuller account of an existing event rather than a second
event for the same September 1969 operation. Created
`articles/mexico-operation-intercept-1969.md` and replaced the event’s Wikipedia-only
bibliography with the book and three contemporary US records:

1. [Vaky to Kissinger, 30 September 1969, FRUS E–10 document 442](https://history.state.gov/historicaldocuments/frus1969-76ve10/d442).
   Records the 21 September start and the ensuing diplomatic protests.
2. [Richardson and Mitchell to Nixon, 20 October 1969, FRUS E–1 document 146](https://history.state.gov/historicaldocuments/frus1969-76ve01/d146).
   Its Mexico section identifies the reciprocal travel/enforcement commitments
   of Cooperation and the proposed assistance against opium and cannabis.
3. [McBride to Rogers, 31 December 1969, FRUS E–10 document 447](https://history.state.gov/historicaldocuments/frus1969-76ve10/d447).
   Reports the 27–30 October talks and the ensuing joint working group.

These are US officials’ records and assessments. They support the diplomatic
sequence, not an independent measurement of trafficking or Mexico’s experience.
The article keeps the book’s broad interpretation distinct from these records.
The October 20 document calls Intercept an initiative announced September 27;
Vaky’s near-contemporary chronology and McBride both identify the operational
start as September 21. Preserved the existing start date.

Removed the old event summary’s uncorroborated crossing count, trade-loss figure,
seizure comparison and exact October endpoint from this sourced revision.
The book says twenty days; the original documents examined here establish the
September start and October replacement, without independently settling each
crossing’s operational end. No new offence or score step inferred.

## Leads kept open

- The chapter connects Cooperation to CANADOR and discusses later Mexican
  Operation Condor. Retrieve original Mexican programme records before treating
  their starts, renaming or scope as settled. The Mexican eradication operation
  and South American political repression operation sharing the Condor name
  must not be conflated.
- Troop totals, market shares, plantation values, protected-field allegations and
  specific abuses remain claims requiring their own underlying evidence.
- The chapter compresses the Shafer Commission sequence and describes the 1971
  presidential rhetoric alongside findings published in 1972. Use the existing
  commission record and original report before any new application.
- Matthews’s remaining afterword pages and *Cup Fever* pp. 161–164 remain open.
- Next substantial library priority: Carneiro chapters 2, 8 and 9, or
  Boullosa/Wallace chapter 12 on reform. Index entries alone are not reading.

## Verification

Catalogue hashes and chapter reading locators checked with `npm run books:check`.
Build and generated-page checks are recorded below after completion. No books,
full text, page scans, country scores or live-law claims added to public assets.

Validation completed: the catalogue check passed; the Astro build completed
successfully (3,091 pages in this workspace snapshot). Verified both new history
articles and the revised UK article in generated HTML. Confirmed each affected
event ID exists exactly once, neither event has a score step, all catalogue note
links resolve, and staged/unstaged whitespace checks pass. No commit or deployment
performed.
