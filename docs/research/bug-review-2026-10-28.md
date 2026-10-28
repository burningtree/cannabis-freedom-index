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

## Second pass: penalty tables and hemp classifications (#276–#292)

Reviewed sixteen newly filed reports (there is no #280 in this set). Left #252 and #253 with
 their existing reviewers: their comments already record the remaining Mali/Armenia legal questions.
No personal-use score changed. Guyana's statutory maximum classification changes to `death`, under
 the existing rule that includes narrowly conditioned capital offences; this does not establish
 a cannabis sentence or execution, or change ordinary-user enforcement scores.

| Issue | Profile | Resolution |
|---|---|---|
| #276 | China | Existing capital qualification was already partly corrected. Split ordinary small and serious small trafficking, specify all three product thresholds, cite Article 347 directly, and encode the life alternative. |
| #277 | Iran | Separate ordinary former-capital/former-life cases from Article 45 cases. First-degree imprisonment replaces former death; second-degree replaces former life. The over-50-kg clause expressly names Article 4; do not automatically apply it to every Article 5 possession offence. |
| #278 | Brunei | Separate plant material/resin for trafficking, import/export and possession for trafficking. Resin trafficking/import uses 130–200 g and >200 g; possession for trafficking uses 200–300 g and >300 g. |
| #279 | Singapore | Actual possession sentences now have product-specific rows; trafficking sentences are in sharing. Explain rebuttable triggers >15 g plant material, >10 g resin, >30 g mixture, including visitors and the presumption spotlight. |
| #281 | Iraq | Weighing discrepancy is a criminal fine, with repeat-offence imprisonment and/or a higher fine; it is not a civil possession allowance. |
| #282 | Libya | **Partial; leave open.** Remove current paid/unpaid supply rows until Law 19/1996's replacement of Article 35 penalties is reconciled with the later amendment. Explain the original ten-year minimum as historical text, not a verified current maximum. |
| #283 | Sudan | Supply minimum is `prison_min: 10 years`; preserve the separate aggravated capital/life row. Remove the prohibited enforcement penalty table while retaining its court example in prose. |
| #284 | Malaysia/shared | Add validated `life: mandatory/possible`, preserve it in parsed/API rows and summaries, use the shared formatter in comparison, and encode Malaysia's cultivation, heavier possession and trafficking sentences. |
| #285 | Ghana | Hemp is standard (≤0.3%), and the documented low-THC production route is hemp. The regulator lists licensed processing/trade as well as growing; this is not evidence of a separate higher-THC cannabis industry. |
| #286 | Oman | Hemp is none: processed-fibre/sterilised-seed exceptions and institutional medical/scientific licences do not create a general hemp crop threshold. |
| #287 | Philippines | The checkout already had hemp none. Re-read RA 9165, add the statutory locator and regression protection. |
| #288 | Taiwan | The checkout already had hemp none. Re-read cultivation law and FDA notice, add the finished-cosmetic locator and regression protection. |
| #289 | Colombia | Hemp is high: ministry explicitly says <1% remains applicable pending the separate Law 2204/2022 implementing rules. Cultivation remains licensed. |
| #290 | Guyana | Hemp-only production; add standard hemp and qualify cultivation/seed prose. The enacted law includes **exactly** 0.3% delta-9 THC on a dry-weight basis. May 2026 implementation report is not proof of commercial harvests. |
| #291 | Guyana | Add the section 6 fatal-minor-supply caveat, separate it from ordinary section 5 life imprisonment, and use the existing maximum-penalty classification. Read the 2022 amendment and 2023 CCJ judgment; neither repeals section 6. No cannabis-specific sentence/execution was verified. |
| #292 | Suriname | Enacted 2023 licensed hemp ≤1%, hemp-only production, certified seed, and implementation qualification. The law is dated 13 September, **published 14 September and effective 15 September 2023**. It raises a prior 0.3% exception, not a first-ever 2022 legalisation. |

### Sources read in this pass and limits

- China: [Criminal Law, Articles 347–348, official English text](https://en.spp.gov.cn/2020-12/26/c_948417_13.htm)
  and [SPC Interpretation 2016 No. 8, Articles 1–2](https://www.court.gov.cn/fabu/xiangqing/19122.html).
  The capital tier includes specified conduct as well as large quantities.
- Iran: [final adopted Article 45, Boroumand Center translation](https://www.iranrights.org/library/document/3262),
  [UNODC translation of the older drug law reproduced by the Center](https://www.iranrights.org/library/document/4019),
  and [Penal Code Article 19, IHRDC translation](https://iranhrdc.org/wp-content/uploads/pdf_en/Iranian_Codes/Translation_of_the_new_Penal_Code_Book_1and2__507475863.pdf).
  The older law is not independently current after 2017. Article 45(D) names Article 4 for the
  traditional-drug weight condition. Do not manufacture an Article 5 weight-only capital rule.
  The table leaves variable/current monetary penalties unquantified rather than inventing them.
- Brunei: [AGC current Chapter 27 listing](https://www.agc.gov.bn/documents/misuse-of-drugs-act/?agc_sl=7&agc_tab=sl)
  and its [2013 revised Act, Second Schedule](https://www.agc.gov.bn/wp-content/uploads/2026/07/CAP-27-2013-ED-MISUSE-OF-DRUGS-ACT.pdf),
  including printed pp. 47–50 and 53–54. The old `/AGC Images/` PDF URL was unavailable; the
  current AGC listing supplies the replacement. The possession-for-trafficking offence has
  different thresholds from actual trafficking/import.
- Singapore: [section 17, official indexed current text](https://sso.agc.gov.sg/Act/MDA1973?ProvIds=pr17-&ValidDate=20260601)
  and [CNB product-specific penalty tables, updated 2 July 2026](https://www.cnb.gov.sg/singapore-drug-situation/drugs--psychoactive-substances--and-inhalants/cannabis/).
  Direct section-page requests returned 403; the official search index returned the full
  section 17(d)–(f) passage and rebuttal wording. CNB tables were readable directly.
- Malaysia: [Ministry of Health Act 234 incorporating Act 846](https://pharmacy.moh.gov.my/sites/default/files/document-upload/dangerous-drugs-act-1952-act-234_2.pdf),
  sections 6B(3), 39A and 39B. Downloaded/extracted after repeated web-reader timeouts;
  section 6B explicitly requires life and at least six strokes.
- Iraq: [Article 33, original Arabic text in UNODC SHERLOC](https://sherloc.unodc.org/cld/ar/legislation/irq/law_no._50_of_2017_on_narcotics_and_psychotropic_substances/chapter_8/article_33/article_33.html),
  especially 33(2)(a)–(b). The criminal fine concerns weighing differences, not a general
  personal-use gram threshold.
- Sudan: [1994 Act, Arabic Articles 15–20 in SHERLOC](https://sherloc.unodc.org/cld/en/legislation/sdn/_1994_/_/_15-20/law_on_drug_offences_of_1994.html),
  Article 16(1) clearly says not less than ten years; Article 16(2) lists aggravations.
  A comprehensive subsequent amendment chronology remains outside this correction.
- Libya: [1990 law, Article 35, statutory reproduction](https://lawsociety.ly/legislation/قانون-رقم-7-لسنة-1990-م-بشأن-المخدرات-والمؤث/),
  [Law 19 of 1996, Articles 1–3](https://lawsociety.ly/legislation/قانون-رقم-19-لسنة-1996-م-بشأن-تعديل-بعض-أحكام/),
  and [later Law 23/2002, Arabic text in DCAF](https://security-legislation.ly/latest-laws/law-no-23-of-2002-amending-and-adding-certain-provisions-to-law-no-7-of-1990-on-narcotics-and-psychotropic-substances/).
  The official Ministry of Justice URL failed initially; its indexed text corroborated the
  original Article 35. The 1996 law expressly replaces Articles 34, 35 and 44 penalties with
  Penal Code Article 169 penalties, without requiring trafficking intent. The later law
  replaces Article 34 and adds Article 35 aggravations but does not expressly reproduce the
  original Article 35 basic term. **Current ordinary Article 35 sentencing remains unresolved.**
- Ghana: [NCC Cannabis Regulations](https://www.ncc.gov.gh/cannabis-regulations/), downloaded/read
  after web-reader follow-ups timed out. It repeatedly confines licensed cannabis to ≤0.3% THC
  and lists cultivation, processing and trade. Preserve patient-access status and scores.
- Oman: [Royal Decree 67/2026, Articles 3 and 7 and schedules](https://qanoon.om/p/2026/rd2026067/).
  The low-THC crop exception is absent; public institutional research permissions are separate.
- Philippines: [RA 9165, Supreme Court E-Library](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/1435),
  sections 3(v) and 16. No general low-THC crop exception; medical laboratory permissions are
  not an industrial-hemp crop threshold.
- Taiwan: [Narcotics Hazard Prevention Act, Articles 2 and 12](https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=C0000008)
  and [FDA notice of 19 January 2026](https://www.fda.gov.tw/tc/csmnewsContent.aspx?id=7574&mid=271).
  The latter discusses finished cosmetic residues of 10 ppm and does not authorise growing.
- Colombia: [Justice Ministry's cannabis/hemp programme page](https://minjusticia.gov.co/programas-co/Cannabis-con-fines-medicinales-cientificos-industriales/Paginas/default.aspx),
  “¿Qué es cáñamo?” expressly distinguishes the operative <1% rule from the separate 0.3%
  legislation awaiting implementation. Checked for later implementing rules; none superseding
  this crop classification was verified. The direct Decree 811 portal returned 502.
- Guyana: [Industrial Hemp Act 13/2022, actual Gazette](https://parliament.gov.gy/documents/acts/23476-industrial_hemp_act_2022_-_no._13_of_2022.pdf),
  visually read printed pp. 206–208, 216 and 234–235; sections 2, 12, 39. `/new2/` downloads
  failed, but the current `/documents/acts/` path returned the scanned Act.
  [May 2026 agriculture update](https://agriculture.gov.gy/2026/05/21/regions-six-ten-earmarked-for-industrial-hemp-cultivation-as-govt-pursues-processing-plant-mustapha/)
  says the authority is operational and large-scale cultivation awaits processing capacity.
  [Cap. 10:10, sections 3, 5–6 and First Schedule](https://mola.gov.gy/laws/Volume%204%20Cap.%2010.08%20-%2012.211696971083.pdf),
  [CANU current explanation](https://canu.gov.gy/guyana-drug-laws/),
  [2022 amending Act](https://parliament.gov.gy/documents/acts/23504-act_no._22_of_2022.pdf),
  [2023 CCJ Harte/Greenidge judgment](https://www.dpp.gy/wp-content/uploads/2016/08/CCJs-Harte-Greenidge.pdf),
  and [WCADP, updated 27 October 2026](https://worldcoalition.org/pays/guyana/).
  CANU mislabels the small-possession amendment as a 2021 bill, so it is used only for its
  section 6 summary. The CCJ declined an academic constitutional challenge; it did not strike
  down the death penalty. The 2022 Act changes possession/related provisions, not section 6.
  No cannabis-specific prosecution, sentence or execution under section 6 was established.
- Suriname: [enacted S.B. 2023 no. 137](https://www.sris.sr/wp-content/uploads/2023/10/S.B.-2023-no.-137-Wet-Industriele-Hennepteelt.pdf),
  downloaded and visually read printed pp. 2–3, 21–23 because text extraction was empty.
  Definition is **Article 1(d)**, not the issue's Article 2(d). Article 29 and the publication
  imprint establish 15 September commencement. The explanatory memorandum records the earlier
  0.3% exception; the 2023 Act raises it to 1%.
  [Parliament passage notice](https://www.dna.sr/nieuws/parlement-neemt-wetswijziging-industriele-hennepteelt-aan/)
  and [November 2024 implementation update](https://gov.sr/voorbereidingen-implementatie-wet-industriele-hennepteelt-in-volle-gang/)
  distinguish the 2022 proposal, 2023 enactment and unfinished implementation. No licensed
  commercial harvest or completed implementation was verified.

### Shared life-sentence audit and validation

Searched all country penalty notes for life sentences without structured custody fields. The new
field fixes Malaysia's reported row and the source-verified alternatives in this pass. Many other
profiles still retain life only in notes; a new audit warning identifies those for source-by-source
migration. They were **not** converted mechanically: some concern old law, alternatives or repeat
cases. The API retains `life`, and summaries expose `life`/`smallPrisonLife` (the finite maximum is null for life); comparison uses the
same punishment formatter as country tables.

An unrelated concurrent Afghanistan commit placed new segment narratives under `scores` and left
old narratives under `segments`. Commit 5ffc5e8 restores its existing numeric scores, moves the new
content to its intended segment fields, and expresses compound durations as 30/18 months. This is
a structural repair of that commit, not an independent verification of its legal research.

Validation: all 193 tests pass (including ten new regression tests); selected-page build passes;
full build passes (5,946 pages); SEO audit passes (5,948 HTML files, 5,731 sitemap entries and
275,914 internal links). Inspected all fifteen affected country pages, the Malaysia/Singapore/Guyana
penalty exports and the hemp/production CSV categories. Profile audits: zero errors, fifteen
warnings (including existing content gaps and life-only notes awaiting source review).

Final checks ran on an isolated snapshot of committed base `2c762370` plus this batch, with Git
history available and the repository’s immutable caches reused. Concurrent uncommitted country
edits and the shared history rewrite were excluded; only the three authored history entries will
be committed from this batch. No personal-use score changed.
