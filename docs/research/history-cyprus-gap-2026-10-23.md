# Cyprus history expansion, 23 October 2026

The previous country-coverage goal turn made verified progress on Belarus. This batch
continues the same open goal. A fresh worktree and backlog inspection found Cyprus among
the largest countries-by-entry-count with no articles: nine events, zero articles.

Cyprus now has fifteen events and eight articles. Project totals are **2,855 events and
730 articles**, against 2,849 and 722 at the start of this batch.

## Editorial and data changes

Re-read `docs/WRITING.md` and the current category instructions in
`docs/DATA-MAINTENANCE.md`. All ten added or revised events have country-first titles under
eighty characters and checked tags from the existing vocabulary. The eight articles have
unheaded openings, four sections each, and 385–406 words after editorial revision.

New events cover:

- **20 March 1992:** the special one-year prison ceiling and summary procedure for qualifying
  young first-time personal users. The broader amendment also changed drug controls; the
  event concerns this particular sentencing protection.
- **21 January 2000:** seed supply, offers and sales where the supplier knows the recipient
  intends illegal cultivation. Category `hemp`, following the seed-rule category instructions.
- **18 July 2003:** rebuttable supply presumptions at thirty grams or three plants, and the
  replacement of the young-person ceiling with two years for eligible under-25s.
- **25 April 2016:** licensed industrial-hemp production/trade and the companion narcotics
  exemption, initially at no more than 0.2% THC.
- **25 March 2021:** Panaxia’s announced delivery under a government medical-oil order.
- **16 February 2024:** publication of the agricultural hemp-definition amendment, referring
  to the EU’s 0.3% standard and expressly deemed effective from 7 December 2021.
- **27 October 2025:** Volt’s adult-market proposal, filed under `debate`, not legalisation.

Revised the existing 1977 law, January 2017 oil-access announcement and 2019 medical
framework entries. The latter now uses the regulations’ 6 March publication date and the
substance of the actual text, rather than an unsourced list of qualifying conditions.

Removed **`cyprus-medical-sales-2022`**. Its sole Wikipedia source describes **HHC retail
sales** in late 2022, not the start of medical-cannabis sales. No article, related-entry or
source-code link referenced that ID. The independently sourced 2021 supply event has its
own accurate ID. The source did not justify simply changing the old medical-sales claim
to a different medical milestone in December 2022.

## Sources and what was actually checked

Primary PDFs, extracted text, selected rendered pages, original snapshots, source metadata
and the verifier are retained under `tmp/history-cyprus-gap-2026-10-23/`. HTML in CyLaw is
Windows-1253; the first UTF-8 extraction was corrected from the saved original bytes.

| Source | Evidence used |
| --- | --- |
| CyLaw consolidated 1977 drug law | Sections 2, 5–8, 10, 30, 30A and penalty table: possession, supply, growing, use, young-person ceiling and presumptions. |
| Original 1977 gazette | Publication on 10 June, later-appointed commencement under section 38, and replacement of the 1967 law under section 39. The event retains year precision and says published/adopted, not that every clause operated on publication. |
| Original 1992 amendment | Section 13 inserts the one-year protection for a person no older than twenty-five with no previous drug-law conviction and exclusively personal-use offending. |
| Original 2000 amendment | New section 7A; knowledge requirement, covered seed transactions, eight-year/CYP 1,500 alternatives and regulatory exceptions. The fine is historical currency, not a converted current euro figure. |
| Original 2003 amendment | Replacement of the age/sentencing proviso and new section 30A, including the quantity table and ability to rebut supply intent in court. |
| Original 2016 laws and current hemp consolidation | Licensing, premises registration, seed and storage conditions, derivative exclusions, five-year licence cycle, and narcotics-law hemp exception. |
| Original March 2019 amendment and Ministry regulations | Licensing powers and medical system. Relevant pages were extracted and selected pages visually checked because the PDF’s Greek font map corrupts text extraction. |
| Original 2024 amendment | Both pages read; second page visually checked for the EU reference and retrospective clause. |
| European Commission hemp explanation | Current agricultural percentage, seed and import requirements. EUR-Lex presented a robot challenge; no challenge was bypassed or unavailable regulation text claimed as read. |

For the medical regulations, visually inspected printed pages 378, 381, 385, 387, 389 and
414: definitions/exceptions, regulator responsibilities, three-producer opening and
fifteen-year protection, application and inspection requirements, and prescribing. Adult
pharmacy preparations are prescribed at the doctor’s judgment; under-eighteens require a
separate justified application. Smoking is excluded. The text does not establish that
three growers were already licensed or producing in 2019.

For the 2017 announcement, read the dated TalkingDrugs report and the signed July
explanation by Health Ministry press officer Margarita Kyriakou, published in Cyprus Mail.
The first concerns an announced programme; the second explains individual authorisation.
Earlier exceptional permissions may have existed: the batch does not claim to identify the
first individual medical exemption ever granted.

Read Panaxia’s own 3 February 2021 announcement through PRNewswire and the full Jerusalem
Post delivery report of 26 March, referring to the preceding Thursday. The event identifies
**Panaxia’s** first delivery; it does not establish Cyprus’s first-ever cannabis import,
patient numbers or universal pharmacy availability. Corporate quality and implementation
claims are attributed to the company. The report of implementation status describes 2021,
not an independent audit of domestic production in 2026.

Read Volt’s own policy and the dated Politis account. Party claims about health, crime and
economic benefits remain attributed; their presence in a proposal does not prove outcomes.

## Current profile and historical scores

The profile now distinguishes possession from growing and supply, states the actual
two-year under-25 ceiling, and explains that quantities below the supply thresholds do
not automatically turn cultivation into personal possession. Removed unsupported claims
about routine imprisonment, automatic deportation, a fixed medical-condition list, and an
EU-wide prohibition on clubs. Independent driving, offence-count and seizure blocks were
preserved **verbatim**, with their original sources.

The seed-trade status changes from `banned` to `regulated` to reflect the express licensed
hemp route. Other planting and club/visitor statuses stay as before. Recreational and medical
classifications remain `illegal` and `limited`.

Corrected the three generic one-point scores for cultivation, sharing and consumption to
zero, following the separate life-maximum cultivation offence, broad supply wording and
express consumption crime. These are baseline calibration corrections, not newly invented
changes in 2019. Possession, current enforcement and medical access retain their former scores.
Current imprisonment frequency was not established from possession-only sentencing data;
the profile no longer claims routine imprisonment from larger-supply news cases.

The new 1992 and 2003 scored events represent the one-year protection and subsequent
two-year replacement in enforcement. Move the existing first medical-access point from
2019 to the announced 2017 patient route. The production regulations and 2021 delivery stay
in the same difficult-access band, with explicit unscored explanations.

Rounded chain: **1925 100→5; 1992 5→7; 2003 7→5; 2017 5→6**. The 1925 entry and its source
remain unchanged; the original colonial ban’s exact scope still needs primary verification.
Its post-event score remains a broad inherited baseline, not a newly verified measurement
of practice in 1925. No claim of complete Cyprus coverage is made.

The agricultural and drug-law hemp definitions have different reproduced wording: the
amended production law refers to the EU threshold; the narcotics consolidation still says
0.2%, while making relevant restrictions subject to the hemp law. The article/profile state
that distinction. A crop percentage was not treated as blanket authorisation for CBD foods,
oils, flowers or other finished retail products.

## Verification

`verify.mjs` checks the seven additions, three revisions and one explicit removal against
the initial snapshots. Every other event is deeply unchanged. It checks dates, categories,
tags, source references, score records, article structure/length, internal links and
preservation of independent profile data. Initial checks and the Cyprus chain check pass.

One production build passed: **3,609 pages in 41.60 seconds**. Generated checks passed for
the Cyprus page, ten tagged events, eight article bodies and citations, headings, internal
links, tag pages, JSON export, three scored steps and removal of the false 2022 page.
The Cyprus chain checker flags no discontinuities.

Deleted `tmp/history-cyprus-gap-2026-10-23/site` after verification. The final temporary-build
audit found no remaining site/build output directories or generated history indexes under
`tmp`. Source downloads, extraction/rendering material and the build log remain for research.
No staging, commits, package installation or source-archive edits were performed by this
batch; concurrent staging and archive updates were observed and preserved.
