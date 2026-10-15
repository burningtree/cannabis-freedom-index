# Research progress: primary-source audit

15 October 2026. Targeted the actual checks in `src/lib/research.js` after the user asked to
raise the displayed research progress. The calculation, weights and completion rules were
not changed. No country was signed off as complete.

## Measured result

The pre-edit generated research page averaged **79.240%** across the 200 rounded country
percentages. The first completed build after this pass averaged **79.545%**, displayed as
**80%** instead of 79%. These are coverage-check results, not a measure of factual certainty.

| Profile | Before | After |
|---|---:|---:|
| Tuvalu | 57% | 76% |
| DR Congo | 64% | 77% |
| Namibia | 66% | 76% |
| Marshall Islands | 76% | 85% |
| Brunei | 77% | 83% |
| Finland | 83% | 87% |

Replaced or strengthened 23 previously Wikipedia-only scored-section citations with passages
actually examined in primary legislation. Revised the associated text instead of merely
appending stronger-looking sources. Also researched concrete licensing, forfeiture and planting
context where the statutory text supports it. Review dates record this targeted pass; they do
not certify every historical statement or all current practice in each profile.

## Tuvalu: missing 2025 amendment

Read the official 2022 Dangerous Drugs Act alongside Act 9 of 2025, sections 1–6 and Schedule 3.
Visually inspected the penalty table on printed p. 8. The official catalogue lists commencement
as 3 July 2025; section 1 specifies commencement on publication. It is not a 2022 commencement.

The new minimum prison terms contradict the former profile's small-possession/fine description.
Possession changed from 1 to 0 and consumption from 1 to 0. The new scored event preserves the
previous six scores as `before`; the resulting total rounds from 9 to 6. Cultivation still has
lesser statutory bands for small plant numbers. The enforcement score is unchanged because no
post-amendment sentencing series was verified. Its text explicitly distinguishes statutory
minimums from observed practice.

New section 14A establishes medical and scientific licensing powers. Medical status now records
that limited legal framework; access stays 0 because no issued cannabis licence or patient
supply service was established. Planting context now reflects the replacement of the old
section 5 seed-import rule. Do not treat a statutory power to license as proof of an issued licence.

The table overlaps and omits intermediate amounts and plant counts. No missing band was invented.
Added an explanatory article and updated the 1948 article to make its historical scope clear.

Sources: official government PDFs and catalogue, linked from `countries/tv.yaml`. Local copies,
extraction and the checked table render remain in ignored `tmp/research-progress-2026-10-15/`.

## DR Congo: medical and scientific controls

Read the 24 November 2022 ministerial order, especially articles 2, 72, 96–123. Visually checked
article 97 and the medical/scientific cultivation distinctions on PDF p. 17. The text reserves
activities to medical and scientific purposes; it is not a recreational or generic industrial
legalisation. Article 100 supplies the stated medical-cultivation THC condition. Article 112
requires express authorisation for finished medical imports. Articles 119–120 address licence
withdrawal and corrective measures; article 121 cross-refers to other penal legislation.

The profile no longer invents a precise sentence from those cross-references or asserts that no
penalty source exists. Actual sentences, current implementation and patient availability remain
unverified. Scores are unchanged. Added a context event for the 2022 order, effective on signature.
The original 2021 order still needs a separate full-text review; its existing event has not been
credited as verified by reading the later order.

Source: reproduced Journal officiel text hosted by droitcongolais.info, publicly linked in the
profile. It is a primary enactment reproduced by a legal publisher, not a government-hosted copy.

## Namibia: enacted law versus a bill

Read the annotated Namibian Act 41 of 1971, sections 1–2, 4–5 and 8, and Schedule Part I. The
definitions include cultivation within dealing and unpaid disposal within sale. Section 2(b)
expressly covers use. Added exact references to those passages and to forfeiture.

The 2006 event remains a proposal, with category corrected to debate. The opened Namibian report
is dated **23 November 2006** and reports National Assembly adoption; that is not verification of
assent or commencement. Do not use its proposed penalties as the current tariff. The annotated
1971 law remains the baseline; no score changed. The source's historical edition date and later
annotations must not be confused with a newly enacted law.

## Marshall Islands: use, seeds and medical exceptions

Read the parliamentary consolidation through P.L. 2025-37, especially sections 902–910. Section
903 expressly prohibits self-administration: the previous explanation inferred use only from
possession. Distribution includes giving and transferring; section 909 supplies a common
marijuana penalty ladder. Removed the unsupported blanket claim that all sale/distribution has
heavier penalties. The prescription exception does not establish actual medicine availability.
Added seed/cutting context and specific forfeiture consequences. Corrected the 1987 event's date
to **20 March 1987** from the printed commencement. No score changed.

## Brunei: distinct thresholds and penalties

Read the 2013 consolidation notified to the WTO, sections 6, 8, 15 and 24 and the relevant Second
Schedule rows; visually checked printed p. 55 for cultivation. The trafficking presumption starts
above **15 g**, not 500 g. Above **500 g** is the separate specified cannabis quantity for capital
trafficking offences. The cultivation row states imprisonment/fine alternatives and contains no
caning provision. Removed blanket mandatory-caning claims for possession and cultivation.

The source is expressly labelled as the reviewed 2013 consolidation. Subsequent amendments were
not exhaustively certified; all scores stay unchanged. The execution/practice account still
rests on the existing separate source, not on inference from the statutory schedule.

## Finland: purpose matters in cultivation

Read current Finlex Chapter 50, section 1(2) and 1(4), with the ordinary offence penalty. Hemp
cultivation is covered when intended as a narcotic or its raw material, rather than every hemp
plant being criminal. Transfers to another are expressly covered by the distribution offence.
Replaced the two Wikipedia-only scored-section references. No score changed.

## Validation and remaining work

The book catalogue check passes. Tuvalu's changed score chain has zero flagged steps. The global
chain checker still reports seven pre-existing below-unregulated starts, outside this batch;
these were not silently removed. Gaps in decades, historical articles, measured use and current
practice remain substantial. Continue with dated first restrictions and missing articles, using
the research page to identify supported work rather than changing the scoring formula.

Browser checks confirmed the 80% dashboard, the new Tuvalu article and source list, and Brunei's
revised summary. Full Astro build passed with 2,964 pages. Catalogue and whitespace checks pass.
