# Bug review — 28 October 2026

Six open `bug` issues were reviewed. Personal-use scores are unchanged. This review separates
permission to grow a hemp crop, permission to manufacture controlled medicines, and patient supply.

| Issue | Profile | Resolution |
|---|---|---|
| #241 | Pakistan | Fixed the residual “still being built” claim in medical context. Current production application categories are documented; patient supply remains unverified. |
| #252 | Mali | Existing revocation correction retained. Open: a current national cannabis schedule and its relationship to medicine-manufacturing permissions remain unverified. |
| #253 | Armenia | Qualified the blanket production-route denial, added the explicit licensed scientific-use exception, and distinguished restricted dronabinol from prohibited plant cannabis. Open: cannabis-specific manufacturing eligibility under the separate implementing licence rules remains unverified. |
| #272 | Moldova | Existing `production: hemp` and `hemp: standard` correction independently verified against the current law. Added a statutory locator and review date. |
| #273 | Bosnia and Herzegovina | Existing `production: hemp` and `hemp: strict` correction independently verified against the medicines agency and September 2026 ministry update. Updated review date. |
| #274 | Iceland | Corrected cultivation, hemp, production and seed descriptions using the 2021 regulation; retained the 0.2% strict classification and set production to hemp. Added the 2020 exemption announcement and expanded the existing 2021 history entry. |

## Sources read and limits

- [Pakistan CCRA application requirements](https://www.elicense.ccra.gov.pk/pre-requisite):
  downloaded and read with curl after the web reader timed out. Includes A-1–A-3 cultivation,
  B-2 extraction, B-3 pharmaceutical manufacture and C-1 research. The application checklist
  does not establish an issued licence count, a first licence date, or a pharmacy supply route.
- [Mali Law 01-078, official gazette](https://sgg-mali.ml/JO/2002/mali-jo-2002-29.pdf):
  Articles 3 and 7 distinguish national schedules and their amendment by decree; Article 9
  prohibits cultivation; Article 10 prohibits Schedule I operations; Articles 12–13 provide
  express medical authorisations for Schedules II–III. These provisions do not identify cannabis's
  current national schedule. Searches did not locate an authoritative current schedule.
- [OCS director's explanation, Maliweb, May 2020](https://www.maliweb.net/societe/culture-du-chanvre-industriel-au-mali-les-precisions-du-directeur-general-de-locs-2875623.html):
  read the account of the special hemp project and 25 February 2020 revocation. The official's
  general statement about medical hemp does not replace the missing current schedule or prove
  a replacement authorisation. No change to Mali's already corrected production status was made.
- [Armenia controlled-substances law](https://arlis.am/hy/acts/218654): Articles 4, 11,
  14 and 31.1 read. Article 11 expressly permits scientific use of prohibited substances under
  31.1 and licensed import/export for that purpose. Article 14 requires substance-specific
  production licences and quotas. Scientific use is not itself permission to cultivate or
  manufacture cannabis for sale.
- [Armenia Decision 1129-N, consolidated schedules](https://arlis.am/hy/acts/222957):
  cannabis outside the licensed hemp category is on List 1; industrial hemp and dronabinol are
  separately on List 2. A blanket statement that every form of THC belongs on List 1 is wrong.
  The relevant implementing manufacturing licence rules still need review before declaring a
  cannabis-specific manufacturing route either available or universally prohibited.
- [Moldova Law 201/2025, FAOLEX copy](https://faolex.fao.org/docs/pdf/mol240625.pdf):
  Article 2(5) directly sets the 0.3% ceiling; Articles 12 and 14 establish ANSA oversight,
  authorisation, permitted crop purposes and seed-variety requirements.
- [Moldova government, 29 April 2026](https://gov.md/en/comunicate-de-presa/moldovan-government-approves-new-rules-growing-processing-marketing-industrial):
  the indexed official text was read through search after direct requests timed out. Describes
  flowering-time sampling, accredited laboratories, annual reporting, domestic marketing and
  exports. No independent first-issued-licence count is claimed. The March 2025 AMDM page
  timed out; its first-licence milestone was not newly added to history.
- [Bosnia medicines agency, 4 August 2022](https://almbih.gov.ba/saopa-tenje-za-javnost-vezano-za-kanabis/):
  0.2% dry-matter ceiling and fibre/seed crop purposes. Its medical prohibition is historical
  and must be read with the later rescheduling.
- [Bosnia Ministry of Civil Affairs, 22 September 2026](https://www.mcp.gov.ba/hr/portal/objava/odrzan-drugi-follow-up-sastanak-o-primjeni-kanabisa-u-medicinske-svrhe-1790073591914):
  implementation remained incomplete after the December 2025 decision; no cultivation or
  manufacturing licence is established by that prescribing-framework update.
- [Iceland Regulation 804/2021](https://island.is/reglugerdir/nr/0804-2021): downloaded
  and read with curl after the web reader returned 403. Articles 1–3 expressly concern seed for
  hemp cultivation, 0.20% THC in seed and resulting products, EEA varieties and seed documentation;
  the portal states commencement on 9 July 2021. It does not specify an indoor-growing restriction
  or independently establish a company's permit or flower-retail legality.
- [Iceland Medicines Agency, 14 July 2021](https://www.lyfjastofnun.is/frettir/verkefni-sem-varda-idnadarhamp-flytjast-til-matvaelastofnunar/):
  confirms the temporary 2020 seed exemption and replacement MAST regime.
- [Iceland Ministry of Health, 18 April 2020](https://www.stjornarradid.is/frettir/grein/2020-04-18-Raektun-idnadarhamps-verdur-heimil-i-kjolfar-reglugerdarbreytingar/):
  indexed official announcement read through search; the history date is the announcement date,
  not an independently established commencement date.
- [Iceland drug act, current consolidation](https://www.althingi.is/lagas/nuna/1974065.html):
  Articles 2 and 2b retain the general prohibition, special revocable exceptions and MAST seed
  permit power. No claim is made that every possible medical-production exception is excluded.

## Validation

Profile audits for Iceland, Pakistan, Armenia, Moldova and Bosnia report no errors or warnings.
Regression checks cover conditional hemp growing, map statuses, current Pakistan applications,
and Armenia's scientific-use exception. All 183 tests passed, including the build's test run. Full build passed with 5,239 pages.
SEO audit passed: 5,241 HTML files and 232,010 internal links. Rendered profiles and per-country
JSON were checked for Iceland, Pakistan, Armenia, Moldova and Bosnia; the removed Iceland and
Pakistan claims are absent. CSV exports carry Iceland strict/hemp, Moldova standard/hemp and
Bosnia strict/hemp, and the new Iceland history page exists.
