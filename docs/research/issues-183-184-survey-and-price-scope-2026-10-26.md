# Survey ages and Australian price sampling — issues 183–184

## Evidence

The unchanged UNODC extract in `datasets/unodc-cannabis-use.csv` reports these
latest age bands: Bangladesh 7+ (3.1%, 2018), India 10–75 (2.83%, 2018),
Australia 14+ (11.5%, 2022/23), Colombia 12–65 (2.68%, 2019). Those are the
survey denominators, not measured 18+ prevalence. No rates, counts, ages, periods
or source codes were recalculated. The original Bangladesh report URL in #183
returned 404; no claim is made to reading that report. This correction follows
the age fields already preserved in the site's UNODC extract.

Read the complete substantive UNSW NDARC 2026 IDRS release, including methodology,
representativeness warning and cannabis section. It explicitly describes people
who regularly inject illicit drugs recruited in every Australian capital city,
and warns against general-population interpretation. It reports A$20 per gram
for hydroponic and bush cannabis separately. The observation's A$20 and converted
US$13.88 remain unchanged; neither number becomes a representative national price.
https://www.unsw.edu.au/research/ndarc/resources/australian-drug-trends-2026-key-findings-from-the-idrs

## Changes

Use metadata, map text, chart labels and accessible names now describe the source
age band. Chart hover cards retain the original survey period and show ages.
Country percentile bars and raw cross-country comparison deltas are suppressed
for the mixed-age cannabis-use dataset. Comparison limits are available beside
the relevant charts and in map/dataset metadata and tooltips. The legacy
`share-of-adults` URL remains available to preserve existing links.

Following the user's screenshots, ranking cells remain numbers only. Their
existing title tooltips contain age, period, source and the comparison caveat.
The country summary has a short past-year-share label and source line; detailed
calculation/source information and the caveat remain in the info tooltip.
The dataset card's caveat also lives in a source tooltip. Original survey ages,
period/source, population age band/year/denominator and an explicit lack of age
standardisation are now included in score CSV/JSON exports.

The Australian IDRS observation is retained with `comparison: false` and an
explicit sample description. A shared selector excludes ineligible observations
from country price headlines, maps, ranking columns and compare API data, while
retaining them in history and JSON/CSV price exports. With the optional prices
interface enabled, its qualified A$20 observation is listed separately and its
full sample description is in a source tooltip. The flag does not imply that
all other observations are representative probability surveys: existing sources
retain their own statistical definitions and notes.

Read the maintenance and writing guidance; added maintenance rules distinguishing
a national report title from a representative sample, explaining comparison
eligibility and prohibiting invented 18+ prevalence.

## Validation

All 90 tests pass: 11 chart/data-semantics regressions, 40 history tests and 39
answer/profile tests. The default production build passed; the final build with
`PUBLIC_SHOW_PRICES=true` passed (4,327 pages). Isolated output directories avoid
collisions with concurrent history builds. Extra generated build copies were
removed after a disk-space failure, then the final full build succeeded.

Rendered checks verify all four age-band examples, unchanged prevalence/user
counts, population-year metadata, chart tooltip ages and original periods,
qualified Australian observation retention, and omission of its street price
from map/ranking/compare/API data. Browser checks verify compact ranking cells,
the Northern Mariana Islands summary and source tooltip, Bangladesh ages 7+
in its tooltip, and Australia’s separate observation and sampling tooltip.
Raw prevalence CSV is byte-for-byte unchanged; no scores changed.

Regression tests cover child-inclusive
labels, compact cells and tooltips, preserved A$20 value, ineligible latest-price
selection (including fallback to an older eligible observation), and removal of
survey percentiles/deltas. Existing history and answer/profile suites also run.
