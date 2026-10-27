# Issue corrections — 27 October 2026

Read DATA-MAINTENANCE, WRITING and the repository overview. Each section records
its source checks, scope and score reasoning.

## #186 — GDELT global coverage denominator

Read the official DOC 2.0 specification (TimelineVol) at
https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/ and compared the committed
collector. Source-country filtering selects the numerator; the denominator remains
all global indexed news. Retained the observations as that metric, rather than
fabricating a country denominator. Dataset metadata, profile headline, map title,
legend explanation, chart heading, tooltip and collector documentation now agree.
Removed the chart's misleading within-press attention comparison/correlation.
The yearly statistic is an equal-weight mean of returned daily percentages, not
an article-weighted annual ratio. The CSV is unchanged. A future country-normalised
series requires matched local numerator/denominator counts over identical complete
intervals, validated historical API availability and rate limits; it must use a
separate definition/file. Do not rescale these percentages to pretend to recover it.

## #191 — Exact use/freedom quotient

Zero index scores have an undefined quotient, represented by null and a hatched map
with an explicit tooltip explanation. Positive scores below one retain their actual
unrounded denominator. Regression covers scores 0, 0.5 and 1 plus missing prevalence.
The map lede and legend state the zero-score exclusion. Survey ages/years and estimate
markers remain qualified; this ratio is not an age-standardised comparison.

## #192 — US outdoor public consumption

Read Connecticut's official Where can I use cannabis FAQ, Rhode Island statute
21-28.11-29 and Minnesota OCM Adult-Use Cannabis guidance. The respective URLs are
recorded in the profiles. Tobacco bans, additional local restrictions, schools,
transport and child-exposure rules remain distinct. Corrected CT and MN consumption
3→5 and RI 4→5: legal public use with many restrictions, rather than unrestricted
wherever-tobacco permission (7). States have no independent national score steps;
these corrections do not change the federal profile score or national history.
Explicit state and national public-use answers feed profiles, /can-i/ and SEO FAQs.
Audited remaining US consumption-3/4 descriptions: the other departures from private
use concern licensed lounges/hospitality premises, not a verified general outdoor
public permission. National prose now names the state/local distinction.

## #193 — Thailand recreational classification

Read the official TAT notice of 27 June 2025 and government statement of 17 July
2026 (https://www.thaigov.go.th/th/news/166528). Both support medical prescription
control of flower. Changed recreational partial→illegal; retained existing scores,
medical status and distinctions for cultivation, seeds and non-flower plant parts.
The classification is not a claim that the entire plant has been rescheduled as a
narcotic. Existing explanation of prescription access and practical shop closures
remains. Added the direct official notice to visitor sources.

## #194 — Verified driving trigger and numerical limits

Read Kenya's 2026 Drink-Driving Rules in the normal browser at Kenya Law, regulation
3: the prescribed concentrations are expressly blood-alcohol concentrations. Section
44's general prescribed-limits phrase is insufficient to label a fixed THC offence.
Added an explicit unknown reviewed trigger, hatched on the map, retaining the cited
legal text and penalties without inventing an impairment or detectable-THC test.
No claim that drug driving is lawful. The regression audits every fixed-limit
profile for a numerical concentration and source. That audit found New Zealand's
existing fixed-threshold description lacked the number: read the official 2025/247
notice and added 5 ng/mL THC in oral fluid, an evidential laboratory threshold,
not the separate roadside device threshold. Its source/commencement is recorded.

## #195 — PNG overlapping cannabis offences

Read the certified No.20 of 2021 on PacLII in the normal browser:
https://www.paclii.org/pg/legis/num_act/dda2021260/ . Certification and operation are
13 January 2022. Replacement section 3 covers knowing unauthorised cultivation,
manufacture, export, possession/conveyance; maximum K1 million and/or forty years,
triable summarily. Read the Controlled Substance Act original, section 3(2), which
says its provisions prevail in an inconsistency; its Schedule VII is not the only
reported charging route. Read The National's 26 June 2024 report in full: 1.3 kg,
Dangerous Drugs Act 3(1)(d), actual K15,000 with three years in default, prosecution
invoking the maximum. Preserve the difference between maximum and actual sentence.

No.37 of 2021 is a different amendment proposing repeal of section 3; the April
2022 commencement index marks it N.I.F., while No.20 is operative. That catalogue
alone does not establish later non-commencement. Searches did not recover a later
commencement/repeal or binding judgment settling the overlap. Accordingly the
profile reports the enacted provision and demonstrated charging practice, identifies
the conflict rule and avoids promising an exhaustive small-quantity ceiling or
purporting to decide which provision must prevail in an individual prosecution.
Scores remain: possession 0, enforcement 1 (severe imprisonment already recorded).
No unverified new historical score step or commencement event was invented.

## #196 — Guyana small-possession exception

Read the Ministry of Legal Affairs Attorney General statement of 25 September 2024:
https://www.mola.gov.gy/post/illegal-for-police-to-lock-up-persons-for-small-amounts-of-ganja-nandlall .
It explains the enacted 2022 exception: up to 15 g counselling, above 15 through
30 g community service, no imprisonment. Replaced the generic foreign travel
three-year-minimum statement with local-law-specific visitor guidance. Possession
remains an offence; supply and border import are not authorised by this exception.
Existing scores and history already capture the reform and do not change.

## #197 — REPROCANN physician requirements

Read current Resolution 800/2021 article 7, as replaced by 1780/2025 article 5,
and the official REPROCANN FAQ. All participating physicians require REFEPS
registration, accredited academic cannabis training and registered digital signature;
article 7 also requires bilateral informed consent. Removed the any-doctor opening.
No new diagnosis-list restriction or numerical score change inferred.

## #198 — Greek consumer-side dried hemp prohibition

Read Law 5302/2026 article 43(2), reproduced by Taxheaven, lines naming purchase
and use by consumers and the industrial-processing exception. The AADE landing
page itself did not expose the statute text. Profile now names consumer activities,
keeps dried flower (≤0.3% THC) distinct from food/cosmetics and prescribed medicines,
and preserves the industrial exception. Existing May 2026 history already described
buying/using correctly; clarified its title. No unverified criminal tariff inferred.
No score change: ordinary non-medical consumption remains unlawful in its existing band.

## #199 — Dominican upper trafficking tier

Downloaded and read the law notified by the Dominican Republic to the WTO, articles
6(a)–(c) and 75, including the 1995 distribution-intent amendment. Up to 20 g marijuana
is six months–two years; above 20 g and below one pound three–ten; above one pound
five–twenty. Hashish uses 5 g and one-quarter pound. The text's below/above wording
leaves exact boundary equality unresolved; no invented inclusive cutoff. Summary,
possession and visitor text now include the upper tier. Intent-based distribution
at any amount remains. The existing most-restrictive possession/enforcement bands
already cover custodial punishment and do not change.

## #201 — South Dakota ingestion penalties

Read current official SDCL 22-42-5.1 and the 2026 session-law chapter 115 section 2.
First violation: Class 1 misdemeanor plus mandatory evaluation and supervised
probation; second: same class, possible one-year jail plus probation, evaluation and
recommended treatment; third or later within ten years of first conviction: Class 6.
State-correctional inmates and parolees: Class 5. Prescribed/otherwise authorised
use exceptions retained. Kept ingestion distinct from seized marijuana possession
22-42-6 and its ounce tiers. Quick caught answer now names both. No score change:
consumption is already 0 (use crime), enforcement 2 allows imprisonment; evaluation
and probation are not mandatory jail. New historical entries deferred because the
current code suffices to correct this omission without guessing a national step.

## #202 — Grenada public and school-area use

Read original Act 1/2026 sections 13A–13E, amended Fifth Schedule and definitions;
visually check printed pages 15–16 and 24. Section 13B ordinary public/workplace/
conveyance use includes a five-metre opening/intake buffer: optional EC$300 notice,
EC$5,000 summary fine. Section 13C separately prohibits use on school premises or
public/open areas within 100 yards during operating hours: maxima EC$250,000/seven
years summarily, EC$500,000/twenty years on indictment. Not mandatory sentences.
Private dwellings not operated as schools/licensed childcare are excepted; separate
Rastafari declared-event protections remain. Summary, segments, visitor advice,
consequences, quick answers and existing reform event now distinguish these offences.
Consumption 3 remains private-use permission; enforcement 6 still describes lawful
ordinary possession, now explicitly limited in prose/answers rather than reassurance
about every use location. An aggravated location offence alone does not prove a
change in ordinary small-possession sentencing practice sufficient for a new band.

## #203 — Malaysian statutory life sentence

Downloaded/read Ministry of Health Act 234 incorporating Act 846, printed p.38:
39B(2) says death or imprisonment for life, plus at least twelve strokes if death
is not imposed; (2A)/(2B) deleted. Removed the universal 30–40-year conversion from
sharing and the 2023 event. Updated the official PDF URL. No statement that life
means confinement until death, and no attempt to replace the statutory wording
with case-specific resentencing outcomes. Existing visitor/enforcement wording
already says death/life. Scores remain unchanged; death remains discretionary.

## #204 — French B2 record visibility

Read Légifrance article 775 as in force 20 August 2026 and article 775-1 in the
normal browser after automatic verification, plus Constitutional Council decision
2026-915 DC paragraphs 295–314 reproduced by Pappers and Service Public F14710.
Paid criminal fixed fines generally appear on B2 until three years from payment;
the statute separately specifies the increased-fine finality clock. Access is
limited to authorities/administrations/employers enumerated in article 776; it is
not a public record available to every employer. Judicial exclusion is available
under 775-1. Kept B2 visibility separate from ten-year retention in another database.
Updated consequences and the existing August reform event, without duplicating it.
Enforcement remains inside the existing criminal fine/prison-possible band.
