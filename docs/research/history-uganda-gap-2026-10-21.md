# Uganda: recovering the 1993 controls and the 2016 law

21 October 2026. Compared Uganda, Tanzania, Ethiopia, Sudan, Angola and
Mozambique for substantial timeline gaps. Uganda had eight entries and no
domestic legal milestone between 1902 and the vaguely described 2015 law.
This pass adds the 1993 drug-authority statute, writes articles on it and the
later narcotics law, and corrects the later law's commencement and penalties.

Rechecked `docs/WRITING.md`, category precedence in `docs/DATA-MAINTENANCE.md`
and the controlled tag list. Baseline: `tmp/history-uganda-gap-2026-10-21/changes-before.yaml`.

## 1993 controls, not an invented first ban

Downloaded the actual 44-page National Drug Policy and Authority Act from
FAOLEX, retained as `act1993.pdf` and text. This is the chapter 206 reproduction
with history Statute 13/1993 and S.I. 31/1999, not a claim to a fresh scan of
the 1993 gazette. Read the commencement, definitions, policy and authority
sections, classification/supply provisions, sections 26–29, 37, 46–49 and 60,
and cannabis/resin in the First Schedule. Visually checked PDF p. 23 (the
possession, smoking and cultivation sections) and p. 27 (penalties), with
p. 26 rendered for the start of section 60. Commencement is **3 December 1993**.

The substantive distinction is important: possession needs lawful excuse;
smoking, frequenting a smoking place, hosting smoking and possessing smoking
utensils are prohibited; cultivation needs the health minister's written
consent after consulting the authority. The authority is new, but these
controls are not represented as Uganda's first cannabis ban or as a proven
increase over the unrecovered original 1970 narcotics rules. Hence `other`,
with sentencing, advertising/paraphernalia and trade tags.

The Class A fallback penalty is up to five years or up to two million
shillings or both. Separate repeat-offence paragraphs distinguish a life
term generally from up to ten years for repeated manufacture, smoking or
possession; the article notes heavier repeat rules without resolving their
potential overlap by inventing one simple cannabis penalty. No assertion is
made that the consent/prescription channels supplied cannabis to patients.

## The law commonly called 2015 commenced in 2016

Recovered the actual ULII/Laws.Africa PDF of **Act 3 of 2016**, retained as
`act2016.pdf` and text. Read its metadata, sections 1–6, 11–14 and 93,
its currency-point value and cannabis schedules. Visually checked printed
pp. 5 and 7, PDF pp. 10 and 12. The source distinguishes **assent on 9 April
2015**, publication on **5 February 2016**, and commencement on **15 February
2016** by a ministerial commencement instrument. Used the commencement date
in the existing stable event `uganda-narcotics-act-2015`; the stable ID and
article URL remain unchanged.

The old two-line description said only heavy penalties and licensed medical/
scientific growing. The recovered text specifies cannabis possession:
**ten–twenty-five years OR a fine OR both**, trafficking **life plus a fine**,
and drug use **one–five years OR a fine OR both**. Giving is in the trafficking
definition, subject to licensing/professional exceptions. Cultivation requires
the health minister's written consent, with at least five years or a fine or
both for unauthorised growing and life for a repeated offence. No unsupported
upper bound was supplied for the first growing prison term.

A currency point is 20,000 shillings; 500 points therefore equal ten million.
The actual fine rule uses the greater of the stated point amount and three
times drug market value. Section 93 expressly repeals the principal older
narcotics provisions, including sections 47–49. The article links the two
laws so readers can see the practical difference.

Downloaded the 2023 judgment itself, retained as `judgment2023.pdf` and text.
Read the opening explanation of the khat growers' challenge and the lead
judgment's concluding quorum analysis and orders on pp. 24–26. It annuls the
whole law, not just the khat provisions. The judgment uses both 2015 and 2016
in naming it. ULII's catalogue date says 6 May while existing contemporaneous
sources and handwritten dating use 5 May; this batch leaves the existing
2023 record unchanged and refers only to the year in the new articles.

The 2024 entry's obsolete sentence saying that the 2016 text could not be read
has been removed, and sentencing/trafficking tags added. Its existing score/date and other legal claims have not been
revalidated in this historical-source pass.

## Earlier gaps remain genuine source-recovery work

The 1902 regulations were located in the index for the 1 October 1902 East
Africa and Uganda Gazette, pp. 318–319, signed by J. Hayes Sadler on 5 June.
Actual document requests returned 403 through web, curl and a browser. A
British and Foreign State Papers lead identifies volume 95, published in 1905,
p. 928, but the volume was not recovered: HathiTrust failed, and sampled
Internet Archive metadata/text prefixes were other volumes. Those prefixes
are retained as research records, not represented as reading the target law.
**No 1902 correction was made from search snippets.** The earlier progress
message describing licensed trade was a research lead, not a verified change.

The 1908 Cantonments Act's consolidated text was read from the indexed full
page. It controls unauthorised supply of intoxicating drugs to soldiers and
associated people and includes ganja, bhang and charas. However, it is a
2000 consolidation using later institutions and currency. No original 1908
text or amendment history establishing the early wording was obtained, so
no 1908 event was manufactured by backdating that consolidation.

Downloaded the 1970 Pharmacy and Drugs Act reproduction, which confirms
commencement on **15 June 1971** but contains only the later surviving
professional rules. It cannot substantiate the original narcotics offences.
A UN Economic Commission for Africa report, E/CN.14/ECU/5, has an indexed
summary on p. 46 describing the original law's possession/use/cultivation
controls, but its actual PDF was inaccessible. No 1971 drug event was made
from that snippet. A retrieved 2016 gazette lists commencement instrument
14 among its supplements but does not itself contain the instrument text;
commencement is credited to the ULII law's explicit annotation, not that list.

The 1902/1908/1914/1946/1957/1971 legal sequence therefore remains a larger
follow-up gap, now with specific source leads rather than guessed dates.
Current 2024-law commencement and the associated score chronology also need
separate verification; this pass makes no current-country change.

## Preservation and verification

All existing score vectors are preserved without claiming that their timing
has been historically revalidated. The recovered 2016 offences need joint
review with the 2023 annulment and 2024 replacement; an explicit `unscored`
reason records that task. No arbitrary score step was introduced.

Preservation checks passed: all 2,660 baseline events remain, all earlier
`before` vectors are unchanged, and only the existing 2015/2016 and 2024
records changed. One new event brings Uganda to nine events and the full
dataset to **2,661 events and 594 articles**. Article metadata, controlled
tags/categories, related IDs, title lengths and internal links passed. The
1993 article is 406 words; the 2016 article 412, both with four sections.

The final isolated build succeeded: **3,392 pages in 27.49 seconds**. Verified all
three touched records against the generated JSON export and Uganda timeline,
the assigned tag routes and membership, and both articles' rendered headings,
source citations and internal link targets. Scoped whitespace checks passed.
The initial heading comparison failed on the renderer's typographic apostrophe;
the final check normalises punctuation and verifies the actual headings. The
saved `verify.mjs` checks the baseline, data, exports and article/tag routes.
Deleted the compiled `site/` directory after verification and checked for
remaining temporary site/build outputs. Baselines, sources and the build log
were retained.
