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
