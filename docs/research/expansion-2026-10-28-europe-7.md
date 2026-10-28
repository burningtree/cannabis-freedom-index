# Expansion batch, 28 October 2026 (Europe-7)

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`.
Batch: Andorra, Monaco, Isle of Man, Guernsey, San Marino. Bosnia and Moldova
were already reviewed today; this batch takes the leading small jurisdictions
with missing standard context. Work proceeds country by country.

| Country | Done | Left | Commit |
|---|---|---|---|
| Andorra | All standard context; hemp/CBD and recreational sections; cited consequences and culture; statutory sharing and consumption tables; fine minima and offence terms; 2013 amendment, 2020 cumulative arrest/fines and 2024 rejected CBD bill; CBD ruling article; corrected personal-possession penalty in 2026 article | First restriction remains estimated; 1930s–1980s unfilled; no verified planting/trade rules or arrest series. Arrest modes are described separately, avoiding an ordinary continuous-prison comparison for weekend/home/partial detention. Cultivation legislation is a proposal; no patient programme verified. | this commit |
| Monaco | pending | | |
| Isle of Man | pending | | |
| Guernsey | pending | | |
| San Marino | pending | | |

## Validation and shared work

Andorra: targeted profile audit has no errors. The industry warning detects the
word licence in a proposal; `production: none` is intentional. Scores remain
unchanged: the 2020 harsher fines and cumulative arrest stay within the same
criminal/arrest bands. The 2013 record uses adoption, since original publication
and commencement were not recovered in this pass. The 2026 replacement code's
four-month delay is preserved.

Other contributors had uncommitted `changes.yaml`, country profiles, package files
and `source-archive.json` changes. Only this batch's history blocks are staged.
The history runner currently assumes double-quoted dates, while the dataset also
contains single-quoted and unquoted dates. A temporary wrapper ran the same
runner with a YAML-aware date reader and preserved all unrelated blocks and
ordering; the repository script was left untouched. A concurrent build started
by another contributor overlapped the first attempt; our build was interrupted
and rerun after theirs finished.

Andorra final verification: `npm run build` passed (including tests), profile
audit 0 errors, and SEO audit found no problems across 5,273 HTML files. Read
`dist/country/ad/index.html` and checked context, sharing/use tables and links.
