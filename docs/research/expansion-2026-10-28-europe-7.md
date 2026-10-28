# Expansion batch, 28 October 2026 (Europe-7)

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`.
Batch: Andorra, Monaco, Isle of Man, Guernsey, San Marino. Bosnia and Moldova
were already reviewed today; this batch takes the leading small jurisdictions
with missing standard context. Work proceeds country by country.

| Country | Done | Left | Commit |
|---|---|---|---|
| Andorra | All standard context; hemp/CBD and recreational sections; cited consequences and culture; statutory sharing and consumption tables; fine minima and offence terms; 2013 amendment, 2020 cumulative arrest/fines and 2024 rejected CBD bill; CBD ruling article; corrected personal-possession penalty in 2026 article | First restriction remains estimated; 1930s–1980s unfilled; no verified planting/trade rules or arrest series. Arrest modes are described separately, avoiding an ordinary continuous-prison comparison for weekend/home/partial detention. Cultivation legislation is a proposal; no patient programme verified. | d42c4d8 |
| Monaco | Statutory tables on four segments; group-use/import distinctions; all standard context and licensed research; four history entries; original-1970-law article and corrected description | First restriction estimated; 1930s/1950s/2000s history and market/arrest counts; medicine availability unverified | this commit; history in 0ee9ecf |
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

Monaco research: read the original 1970 gazette (pp. 538–539), current Law 890,
Penal Code fine categories, article 32 of the poisonous-substances order, the
2019 amendment and the full 2025 Supreme Tribunal judgment. Corrected the 1970
entry to distinguish original three–ten-year supply/group-use terms from later
amendments. Added four history records and an article on the current foundational
law. Authorised pharmaceutical products are a statutory exception; no named
approved product or operating patient-dispensing route was established, so medical
status/access scores remain unchanged. Production becomes `medical` because
manufacturing authorised derivatives has a ministerial permission route;
research becomes `licensed`. Hemp remains `none` because article 32's conditional
ministerial route supplies no general retail threshold or verified implementing
variety authorisation. Original pre-1970 cannabis schedules, 1930s/1950s and
2000s history, market statistics and arrest counts remain open. The 1985/1987
records use the amendment dates named in the current consolidated law.

Monaco: full build and tests passed; profile audit 0 errors/0 warnings; SEO/link audit passed and built profile tables/links inspected. Another contributor committed the four Monaco history additions and corrected 1970 description in `0ee9ecf` while working on French Polynesia; preserved that shared commit and commit the remaining Monaco files separately.
