# Iraq: recovering the controls before the 1965 law

26 October 2026. Continued the open Iraqi chronology identified in the 21 and
23 October notes. The previous goal turn made progress by committing the New Zealand
and Cambodia issue fixes. This pass returns to the larger history objective.
Read `docs/WRITING.md`, the history/category/score/workflow sections of
`docs/DATA-MAINTENANCE.md`, `docs/BOOKS.md` and the catalogue overview before writing.
No local book was newly read or recatalogued.

Baseline: 3,159 events, 910 articles; Iraq 21 events and seven articles. Research
downloads, text extractions, page renders, baseline and validation logs are kept in
ignored `tmp/history-iraq-early-2026-10-26/`. The source archive was already dirty,
including staged changes at the start; it is outside this commit.

## What the opened sources establish

### The 1930 postal guide records an earlier import control

Opened the Qatar Digital Library's title page, folio 2r, and printed pages 56–57,
folios 41v–42r, of the *Iraqi Post and Telegraph Guide 1930*, British Library
IOR/L/PS/12/4114B. The title page says published under the authority of the
Director-General, Posts and Telegraphs. Section 170 begins on p. 56 and concerns
articles prohibited from import **by foreign parcel post**. Item 9(b), p. 57, names
ganja, bhang, charas, hashish and other intoxicating hemp preparations, with a special
import-authorisation exception from the Director of Health Service.

- [Title page](https://www.qdl.qa/en/archive/81055/vdc_100060655692.0x000004)
- [Section heading, p. 56](https://www.qdl.qa/en/archive/81055/vdc_100060655692.0x000056)
- [Cannabis item, p. 57](https://www.qdl.qa/en/archive/81055/vdc_100060655692.0x000057)

The new event dates the guide's record, not the enactment of its underlying rule.
It is `other`, with an explicit unscored reason. Do not generalise parcel rules to
all imports, treat the title as a commencement date or claim the 1933 law introduced
the first cannabis restriction. The archive file spans approximately 1930–1939 and
includes later loose amendments; this passage is in the printed guide. IIIF image
downloads returned 403, so the archive's page transcriptions and title-page record
were read, without claiming visual verification of these three pages.

### 1949: what happened to drugs confiscated by courts

Downloaded and read the actual English government communication in
[E/NL.1950/98–99](https://digitallibrary.un.org/record/1296974/files/e-nl-1950-98-99-e.pdf),
especially printed p. 3 (PDF p. 3), and visually checked that page. Regulation 36
was made on 22 May but began on **13 June 1949**, its Gazette publication date
(issue 2749), under article 3. Articles 1–2 send court-confiscated drugs to the health
directorate for destruction or medical/scientific use in government health institutions.
Destruction requires two health-directorate doctors and police/customs representatives,
with a report and certificate to the Ministry of Social Affairs.

Cannabis coverage comes from article 2 of the parent 1938 law, independently reopened
in the official Iraqi Legislation Database. The new history entry and article cite
both sources. The regulation supplies administration of an existing confiscation
power, not evidence that government institutions actually used seized cannabis for
patients. The accompanying 1949 notification concerns metopon; it is not added as
a cannabis event.

### 1955: a missing replacement penalty

Downloaded the actual one-page [E/NL.1956/117](https://digitallibrary.un.org/record/1296975/files/e-nl-1956-117-e.pdf)
with the `?download=1` suffix after ordinary fetches failed. Read the entire English
government communication and visually checked its text, title and publication notice.
The UN transmitted it on 8 January 1957, but the law is **64 of 1955**, effective
on publication in Gazette issue 3642 on **14 June 1955**. Those three dates must
not be collapsed.

It replaces article 13 with a general 100–1,000-dinar fine, six months–five years
in prison, or both, plus confiscation of materials/articles seized in the offender's
actual use. It does not state a mandatory prison sentence in every case. Article 7
of the 1938 law makes unauthorised possession an offence and article 2 expressly
includes cannabis; the two sources establish the cannabis application together.

Reread the original 1965 law's retained text, especially articles 14–16 and reasons,
and the 1967 amendment's replacement article 14. The 1965 original kept the same
general fine/prison range, while 1967 distinguished personal-use possession/growing
(one–five years **and** a fine) from supply, including gifts. New articles connect
these stages. Three misplaced references in the existing 1965 article now cite its
own explanation of the Single Convention and reasons, instead of the 1938 law.

## Score reconstruction remains open

The existing chart puts all six segments at zero from the 1933 cultivation law to
2017. Its 1933 source does not substantiate that full vector. This pass did **not**
repair it or change present-day scores. The new import-control record also shows
why treating 1933 as the first restriction needs review.

The [official 1938 view](https://iraqld.msla.iq/legislations/showlegislation?sc=290920052658504)
again displayed articles 1–9 only. No original penalty or operative commencement
clause was recovered. Direct `lawbookid` views, including the previously read 1933
law, were blocked by the site's security policy in both ordinary fetching and the
in-app browser. The browser displayed the block; it was not bypassed. Existing
1933 facts are retained rather than described as freshly verified.

The 1955 entry is `other`: replacement of the penalty is certain, but its direction
relative to the original 1938 penalty is unverified. Its explicit unscored reason
records that and the unresolved inherited vector. The 1949 administrative change
and 1930 guide record also have reasons for carrying no score. Do not interpret a
passing chain diagnostic as validation of the historical vector.

Concrete next retrieval: the complete original 1938 law, particularly article 13
and commencement. A catalogue identifies the government communication as League
document **C.483.M.326.1938.XI, 1 December 1938**; the underlying document was not
retrieved, so the catalogue is a lead only. Secondary search results also suggest
an earlier hemp-cultivation prohibition and a June 1938 start; neither is added as
a verified event or used to move a score without its primary source.

## Deliverables and checks

Three new history records (1930, 1949, 1955), two new articles (1949 and 1955), an
expanded 1938 article and corrected 1965 inline references. The new articles have
four sections each and 373/371 whitespace-delimited words. Current profiles and
all existing score snapshots are preserved.

Verification completed:

- Required history tests: 39 passed; quick-answer/profile tests: 16 passed.
- Production build: 4,164 pages, 46.90 seconds. This combined checkout includes
  separately committed Jersey work; it is not a count of Iraqi pages alone.
- Preservation checks compare every pre-existing score snapshot and all 21
  pre-existing Iraqi events against the saved baseline; all are identical.
- Article length, section count, source-index coverage, related IDs and internal
  history links passed. All five touched article/event pages resolve their
  numbered reference links, with no raw citation syntax in visible text.
- New records appear in the country page, decade pages and history JSON export;
  the API retains Iraq's current total of 2. The chain diagnostic reports zero
  mechanical flags, subject to the substantive score limitation above.
- The in-app browser checked both new articles, the filtered global history
  showing all three additions, and the country History tab and score chart.

The temporary compiled site is removed after verification. Source PDFs, extracts,
page renders, baseline, scripts and logs remain as research materials.
