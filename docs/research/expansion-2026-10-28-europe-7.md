# Expansion batch, 28 October 2026 (Europe-7)

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`.
Batch: Andorra, Monaco, Isle of Man, Guernsey, San Marino. Bosnia and Moldova
were already reviewed today; this batch takes the leading small jurisdictions
with missing standard context. Work proceeds country by country.

| Country | Done | Left | Commit |
|---|---|---|---|
| Andorra | All standard context; hemp/CBD and recreational sections; cited consequences and culture; statutory sharing and consumption tables; fine minima and offence terms; 2013 amendment, 2020 cumulative arrest/fines and 2024 rejected CBD bill; CBD ruling article; corrected personal-possession penalty in 2026 article | First restriction remains estimated; 1930s–1980s unfilled; no verified planting/trade rules or arrest series. Arrest modes are described separately, avoiding an ordinary continuous-prison comparison for weekend/home/partial detention. Cultivation legislation is a proposal; no patient programme verified. | d42c4d8 |
| Monaco | Statutory tables on four segments; group-use/import distinctions; all standard context and licensed research; four history entries; original-1970-law article and corrected description | First restriction estimated; 1930s/1950s/2000s history and market/arrest counts; medicine availability unverified | c8a4830; history in 0ee9ecf |
| Isle of Man | Statutory maxima; hemp, planting, licensed research, arrests, patient lounges; nine history entries and pharmacy article | Early decades, driving, market detail; full current Act download blocked | b5e2921 |
| Guernsey | Statutory tables, CBD/hemp, planting, medical lounge, market and culture; six entries and medical-access article | 1950s/1990s history, driving and arrest counts; full 2026 CBD order | this commit |
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

Isle of Man: replaced case-outcome tables with the statute's conviction-on-information
maxima (five years possession, fourteen cultivation/supply; fine uncapped in that
mode). The current official PDF could not be downloaded: the official indexed
Schedule 4 text was read, and this retrieval limit is recorded in the profile's
source locator. No summary fine amount is inferred from older PDF versions.
Read the 2024 government policy report through Tynwald and corrected the categorical
claim that all small possession cases reach court. Eligible first offenders can
use DARS; current possession/enforcement bands already cover fines/diversion and
remain unchanged. Arrests section labels all-drug offence counts accurately.
The 2004 Hansard reports automatic UK Class C import, but the event records the
March arrest-power debate rather than inventing a commencement for the pending
local bill. Early decades and the precise 2009 local reclassification instrument
remain open. The original first-restriction estimate is preserved.

Added hemp (0.2%), seed/clone permissions, licensed research, patient social
spaces, eight history records and a pharmacy-expansion article. Club status
`tolerated` describes a medical patient lounge without a bespoke club-licensing
law: it does not describe recreational supply permission. The October move to
Douglas pop-ups supersedes the old Ramsey location. The withdrawal report uses
its publication date, explicitly distinguishing earlier withdrawal.

Isle of Man verification update: final full build and tests passed. Another
contributor began a subsequent build before the page/SEO inspection and removed
`dist/`; the audit therefore encountered missing files. Complete those checks
against the following isolated output, rather than treating this as a data failure.

Guernsey: read the retained official consolidated law, including the Third
Schedule, definition and effective-date notes; opened current government patient
and CBD guidance in an ordinary browser. Added statutory indictment maxima
(10 years possession, 14 cultivation, 21 supply) in place of individual-case
outcome comparisons. Added CBD/hemp context and age restrictions, patient lounge,
planting, culture and diversion-market context. The hemp warning is intentional:
the quoted product limits are not a general cultivation threshold. Seed exclusions
do not authorise germination. Source remains an archive consolidation; original
current amending-instrument completeness, 1950s/1990s history, driving, arrests and
full market statistics remain follow-up targets. Six new history records and a
2020 patient-access article; no score changes. Current October 2026 CBD restriction
uses the Chief Pharmacist's statement; the full modification order remains to be
retrieved. A parliamentary proposal's timeline says withdrawn on 25 February,
although its attached economic-development letter is dated 12 March; record the
published timeline and preserve that inconsistency for a later primary-minute check.

Guernsey final verification: full build/tests passed with output isolated in
`/tmp/cfi-europe/dist-gg` so another contributor's build cannot delete the HTML
before inspection. SEO audit passed: 5,315 HTML files and 234,568 internal links.
Profile audits: Guernsey 0 errors/1 explained hemp warning; Isle of Man 0/0.
Read both built profiles in the isolated output and checked tables, DARS, hemp
and medical-lounge links. This completes the Isle of Man inspection previously
interrupted by another build removing the shared `dist/` directory.
