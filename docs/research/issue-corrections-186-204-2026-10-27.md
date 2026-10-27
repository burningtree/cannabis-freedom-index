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
