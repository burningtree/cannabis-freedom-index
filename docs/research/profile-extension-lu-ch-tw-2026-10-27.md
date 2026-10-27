# Luxembourg, Switzerland and Taiwan profile extension — 27 October 2026

This batch extends three profiles with seven new context sections, four penalty tables,
two articles, two new history entries and five corrected history records. All eighteen
current segment scores remain unchanged. Taiwan's medical classification becomes
`limited` on the documented special-authorisation route; its access score remains 0.

## Luxembourg

- Added possession and cultivation ladders, using the original
  [2023 law](https://mj.gouvernement.lu/dam-assets/dossiers/cannabis/loi-du-10-juillet-2023-cannabis.pdf)
  and the Health Ministry's [home-growing guidance](https://santesecu.public.lu/en/espace-citoyen/departement-sante/prevention/05-cannabis/usage-non-medical/culture-domicile.html).
  The public-possession ladder is explicitly separate from lawful home harvest.
- Corrected the assertion that up to 3 g is no longer a criminal matter. The €145 warning
  payment is an alternative to a court fine, not the maximum available sanction. The
  possession, consumption, enforcement, consequences, visitor and quick-answer text now
  preserve that distinction. The 2023 history description is corrected too.
- A location-based cultivation row is labelled rather than inserted into the plant-count
  ladder. It cannot change the comparison's ordinary one-plant prison figure.
- Replaced `products` with recreational and hemp context. The food-safety authority's
  [hemp/CBD guidance](https://securite-alimentaire.public.lu/fr/professionnel/Denrees-alimentaires/Nouveaux-aliments/Denrees-alimentaires-base-chanvre-CBD.html)
  distinguishes crop THC references from food rules; no blanket CBD-food permission is inferred.
- Expanded medical context from the official [patient/product booklet](https://securite-alimentaire.public.lu/dam-assets/fr/professionnel/Denrees-alimentaires/Nouveaux-aliments/cannabis-produits-derives-du-cannabis-et-du-chanvre-fr.pdf),
  [November 2024 programme announcement](https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2024/11-novembre/29-modifications-cannabis-medicinal.html)
  and [medical FAQ](https://santesecu.public.lu/fr/support/faq/cannabis.html).
  A new 1 January 2025 history entry records the narrower flower programme. Stock
  replenishment ending is distinguished from immediate withdrawal of remaining stock.
  A plan to move all patients to oils is not treated as completed.

## Switzerland

- Replaced `products` with recreational and hemp context and added research context.
  The [federal product-law overview](https://www.bag.admin.ch/de/geltende-rechtslage-von-hanf-und-cannabisprodukten)
  and [food-safety guidance](https://www.blv.admin.ch/de/cannabis-cannabidiol-lebensmittel)
  support the hemp distinction. Hemp, production and research statuses are now `high`,
  `pilot` and `licensed` respectively.
- Added a personal-possession table. The [Federal Supreme Court's full judgment](https://search.bger.ch/ext/eurospider/live/de/php/clir/http/index.php?highlight_docid=atf%3A%2F%2F149-IV-307%3Ade&lang=de&type=show_document)
  supplies the small-quantity exemption, confiscation limit and separate fine-only
  personal-use offence. No CHF100 consumption ticket is assigned to possession itself.
- Corrected the ten-year-trial wording in the 2021 history entry. The
  [enabling law](https://www.bag.admin.ch/bag/de/home/gesund-leben/sucht-und-gesundheit/cannabis/pilotprojekte.html)
  and [FAQ](https://www.bag.admin.ch/en/faqs-on-cannabis-pilot-trials)
  distinguish the lifetime of the legislation from each individual project.
- Added a 393-word article to `switzerland-pilot-law-2021`, including the research
  rationale and subsequent supply models. It links the sales milestone.
- Added a history entry dated by the cover date of the
  [second university evaluation's executive summary](https://www.bag.admin.ch/dam/en/sd-web/l6svZGPjJ1bp/Analyse_Pilotversuche_Cannabis_Executive%20Summary_2025_EN.pdf).
  The 17 November 2025 date is the report date, not an inferred publication date.
  The report covers participating users and preliminary findings; no nationwide causal
  conclusion is drawn. Black-market text now says the legal outlets became the main
  supply source for most participants, rather than asserting exclusive use by everyone.
- The consequences section points to the specimen-specific driving rule and its
  measurement deduction, preserving the earlier correction.

## Taiwan

- Added a cultivation table with the minor personal-use tier and a separately labelled
  general offence. The [Narcotics Hazard Prevention Act](https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=C0000008)
  gives the minima and fines; [Criminal Code article 33](https://mojlaw.moj.gov.tw/ENG/LawContentE.aspx?LSID=fl001424&media=print)
  gives the ordinary fixed-term ceiling. Separate enhancements are not treated as part
  of an ordinary minor personal-use case.
- Replaced `products` with recreational and hemp context. The
  [January 2026 cosmetics notice](https://www.fda.gov.tw/tc/csmnewsContent.aspx?id=7574&mid=271)
  concerns a final-product hemp-seed-oil residue rule. It is not a crop THC limit, so the
  hemp section deliberately has no map status.
- Read the Health Ministry's [7 May 2020 petition response](https://www.mohw.gov.tw/cp-16-53091-1.html)
  in full, including the date and controlled-medicine hospital application route. The
  older section URL intermittently timed out; the official current-news URL worked.
  Medical and access text now explain that narrow framework. No routine THC dispensing,
  authorisation count or patient count was established, so access stays 0. This is the
  same distinction between an enabling patient framework and operating supply used in
  the maintenance guide. The old June CBD event retains its ID but is corrected to the
  dated May ministry explanation and categorised `medical` with an `unscored` reason.
- The [constitutional ruling](https://cons.judicial.gov.tw/jcc/zh-tw/jep03/show?expno=790)
  and [Judicial Yuan's explanatory release](https://www.judicial.gov.tw/en/cp-1637-193125-c56ca-2.html)
  establish an interim judicial remedy after the one-year legislative deadline. The
  history no longer implies that nothing could change before the 2022 amendment.
- The Ministry of Justice's [legislative history](https://law.moj.gov.tw/ENG/LawClass/LawHistory.aspx?pcode=C0000008)
  dates promulgation and commencement to 4 May 2022, distinct from the 19 April vote.
  The existing amendment entry keeps its ID and is dated accordingly. Both cultivation
  entries link each other; custody remains within the existing cultivation score of 0.
- Added a 392-word article to the 2020 ruling. Its account of Huang's six plants is
  explicitly sourced to the [contemporary news report](https://www.taiwannews.com.tw/en/news/4147810);
  operative legal conclusions come from the court and statute.

## Verification

Targeted regressions check warning-versus-court penalties, amount-based comparison values,
conditional cultivation rows, trial population scope, corrected commencement dates and
patient authorisation versus dispensing. Run `npm run answers:test`, `npm run history:test`
and the three affected country-chain checks. Production-build output is isolated in
`/tmp/cfi-profile-extension-build` to reduce collisions with other workspace builds.

Final results: 87 answer/profile/ratio tests and 46 history tests pass. Each of the
three country chains reports zero flagged steps, and all six current scores per country
match the pre-batch versions. The production build passes with 4,665 pages. Generated
APIs preserve the expected penalty comparisons. Browser checks cover Luxembourg's
tables, context and history, both articles, and Taiwan's mobile cultivation table;
the mobile page has no horizontal overflow. Table screenshots were inspected locally.
