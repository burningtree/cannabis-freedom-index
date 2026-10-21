# Ethiopia: the emperor's code and the missing 1999 drug law

21 October 2026. Rechecked `docs/WRITING.md`, the category precedence and
controlled tags. Baseline retained at
`tmp/history-ethiopia-gap-2026-10-21/changes-before.yaml`. Focused on the
large gaps between the existing 1957, 1993 and 2005 entries.

## The 1957 code began operating in 1958

Downloaded the original bilingual-era English code scan from Law Ethiopia,
retained as `penal-code-1957.pdf` with layout text. Read the enacting
proclamation and article 510; visually inspected printed pp. 155–156 (PDF 189–190).
The proclamation was approved on 23 July 1957 but section 2 expressly
commences it on **5 May 1958**, replacing the 1930 code. Corrected the date
while preserving the stable ID. The old description improperly included
using drugs among article 510's express verbs: replaced with the actual
production, acquisition, transport, storage and supply activities.

Article 510(1) combines at least three months' simple imprisonment AND a
fine up to 20,000 dollars; (2) extends that punishment to knowingly making
premises available, even privately. Subsection (3) permits up to five
years' rigorous imprisonment AND a fine up to 30,000 dollars for organised
or professional traffic and the specified supply/premises cases involving
young, disabled or dependent users, with the stated motive requirement.
Kept `other`: the 1930 predecessor has not been compared, so the code's
penalties alone do not establish the direction of change. Added sentencing,
trafficking and youth tags and a 350–500-word article.

## The original 1999 gazette separates ordinary medicines from narcotics

Downloaded the original gazette, `drug-law-1999.pdf`, 12 pages, printed
1105–1116. Read the preamble, definitions, licensing, prescription/storage
rules, offences, repeal and commencement. Visually checked printed pp. 1114–1115
(PDF 10–11), including the article 33 exclusion, article 34 penalty and confiscation.
WIPO's transcribed HTML at legislation/details/11360 agrees in substance
but has several erroneous article numbers: use the scan for locators.

Article 33(7) expressly excludes narcotics and psychotropics from that
article's ordinary drug-trade offences. Its five-to-seven-year unlicensed
trade penalty must NOT be attributed to cannabis. Article 34 covers
facilitating narcotic drug abuse: promotion, allowing premises, unlicensed
administration, improper prescribing and knowingly accepting invalid
prescriptions, with seven to fifteen years AND 30,000–50,000 birr. This
supports `tightening` compared with the earlier ordinary hosting penalty;
it does not establish a general 1999 personal-use or cultivation penalty.
An early commentary summary was too broad and was corrected before drafting.

Added a dated event for **29 June 1999**, the express article 42 commencement,
and an article. Tags: sentencing and advertising (promotion offence).
Explicitly unscored because this narrower facilitating offence does not
justify a whole-point change to the existing severe-prohibition scores.
No earlier score vectors or current country scores changed.

## Replace the 2005 Wikipedia summary with the code

Read WIPO's full official English text, legislation/details/11359, enacting
proclamation sections 2–4, articles 3 and 525. Effective **9 May 2005**.
Trafficking with the specified intent: at least five years and up to
100,000 birr; aggravated cases: at least ten and up to 200,000 birr.
Private-use planting, possession and supply, and unlawful consumption:
up to seven years and up to 50,000 birr. Special criminal laws remain
applicable. Rewrote the existing event and source; retained `other` because
the interaction of special laws and all prior offence groups has not been
fully audited. Added sentencing, trafficking and youth tags.

The country profile still reports inconsistent secondary-source penalty
ranges. A later present-law pass should check the 2009/2010 replacement
medicine legislation and the 2019 food-and-medicine law before updating
the whole current profile. Historical code text alone is insufficient for
that broader claim.

## Earlier lead and remaining gaps

UN E/NL.1952/102 reproduces Ethiopia's **Dangerous Drugs Proclamation 24 of
1942**, explicitly naming cannabis indica and restricting import, pharmacy
sale and dispensing without a prescription, with up to two years and/or
2,000 dollars. Its indexed text is visible at
https://digitallibrary.un.org/record/1296570/files/e-nl-1952-102-103-e.pdf.
The PDF returned 403 through the source tool. No entry or article added
without recovering the complete source and checking its date. This is a
strong next lead for the earlier gap; it does not prove that no earlier
1930-code or occupation-era restriction existed.

The 1999 UN extract E/NL.2005/44 also returned 403/empty download, but the
actual original gazette was successfully recovered independently. The
1947 pharmacopoeia decree and Pharmacy Regulations, Legal Notice 288/1964,
are expressly listed in the 1999 repeal clause and remain further leads.

The estimated 1900–1920 first restriction remains unverified. Its
colonial-generalisation rationale is particularly weak for Ethiopia and
needs replacement by a researched national chronology, not another guess.

## Validation

Source checks passed: exactly two existing events revised and one event added;
all baseline IDs and score vectors preserved. Both articles meet the word and
section limits (399 and 418 words). Categories, tags and article links checked.

Full Astro build succeeded: **3,396 pages in 22.37 seconds**, terminal exit 0.
Verified the generated JSON dates, titles, descriptions, categories and tags;
Ethiopia timeline, tag routes, both article headings, citations and internal
links. Scoped whitespace checks passed. The temporary `site/` build was
removed after these checks; source PDFs, extracted text and build log remain.
