# Europe expansion batch 13, 28 October 2026

Selected Malta, Serbia, Bulgaria, Belgium and Estonia from the Europe gap ranking, skipping
the preceding two batches. Work is completed country by country, with private-index commits
excluding other agents’ shared changes.

| Country | Done | Left | Commit |
|---|---|---|---|
| Malta | Resin article, association stock event/context, directive date corrected | Seven sparse history decades; original 2026 licensing amendment | 875cfb6 |
| Serbia | Medical agenda-vote article; eight events; research authorisations and seizure context | Original 1964/1980/1996 laws; 1940s/1970s | cbc0790 |
| Bulgaria | Hemp article; revised 2006 article; cultivation/supply/use tables; five events | Hemp statute/ordinance threshold conflict; original 1975/1982 printings | This country’s commit |
| Belgium | Pending | | |
| Estonia | Pending | | |

## Malta

Read the current Drug Dependence Act, ARUC’s May 2025 resin announcement, the full 2026
technical directive (downloaded and extracted because the browser size limit blocked it), and
original Legal Notice 45/2026. The directive cover and issue line say 21 January, despite the
16 January filename; corrected the existing event and source date. Added the February stock
limits as association operating rules, leaving adult score bands unchanged. The original
bilingual notice has inconsistent English words/digits in the grow-site fine; this pass avoids
copying that disputed amount. Resin’s original three-to-one equivalent is distinguished from
the later potency bands. Early decades remain open; no unsupported historical events added.

Validation: 196 tests passed, four selected pages rendered and HTML inspected. Profile audit
zero errors; its hemp warning concerns the product threshold, not an authorised hemp crop.
Snapshot: `.cache/expansion-europe-3/mt-review/`.

## Serbia

Read the current criminal and controlled-substances laws, the March 2018 parliamentary record,
the government’s 2018 consultation report and official 2026 police/prosecutor announcements.
The agenda motion had ten votes in favour and 149 non-voters; patient numbers remain attributed
to Čabradi’s speech. Added the 1964 federal framework, 1980/1996 laws identified by the later
repeal clause, the 2016 consultation and four events in the Zemun–Konjuh investigation. Original
1980 and 1996 printings remain archival leads; no unverified penalty changes assigned. Research
context now explains the substance/annual-quantity consent and separate trial consent, replacing
an unsupported negative about research activity. Current scores and penalties retained.

Validation: all 196 tests pass, zero audit errors/warnings, ten selected pages rendered and HTML
inspected. Snapshot: `.cache/expansion-europe-3/rs-review/`.

## Bulgaria

Read the current Penal Code, reproduced drug-control statute, hemp ordinance and ministry
service, original 2007 national report, 2012 protest report and ECB euro notice. Filled cultivation
and supply ranges/fines from articles 354a/354c, using the profile’s already-verified euro
conversion. Corrected the unsupported statement that use is unpunished: article 30 prohibits it
and article 108a supplies residual administrative liability where no heavier sanction applies.
Current segment scores retained: use was already scored as prohibited. Minor-case criminal
fines are now distinguished from qualifying Article 78a administrative release, including in
the two older articles that had said every fine leaves a conviction. Added the 1975 separate
offences, 1982 release mechanism, 1999 framework, 2018 ordinance and euro conversion events.
Original historical tariffs are not inferred from later amendments. The 0.2% statute/0.3%
ordinance conflict remains explicit. Medical wording now describes unlawful controlled-drug
prescribing, removing an overbroad claim about every cannabis prescription and an unsupported
comparison with neighbouring countries. No current six-segment score changes.

Validation: the first build identified an unused recreational source, which was removed. The
second passed all 196 tests and rendered nine pages, inspected in HTML. Profile audit 0/0.
Snapshot: `.cache/expansion-europe-3/bg-review/`.
