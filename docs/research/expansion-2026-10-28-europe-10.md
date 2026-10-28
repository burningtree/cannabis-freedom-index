# Expansion batch, 28 October 2026 (Europe-10)

Next five available profiles from the European ranking, excluding Europe-8/9:
Luxembourg, Slovakia, Croatia, Romania and Albania.

| Country | Done | Left | Commit |
|---|---|---|---|
| Luxembourg | Fine minimums; supply/life and use tables; primary citations; hemp exemption and excise; market data; four events; corrected medical date and article; four French terms | Early decades; Luxembourgish slang; 2026 medical stocks and full commercial cultivation conditions | c696b7f |
| Slovakia | Six quantified growing tiers; intermediate supply ranges and life field; primary hemp/CBD sources; medical assessment and research context; two terms; three events and CBD article | Early decades; cannabis-only arrest figures; current CBD medicine reimbursement | 3b9e93d |
| Croatia | Seven supply/facilitation rows; corrected use/possession distinction; medical licence and research routes; confiscation/treatment; 2025 national seizures; two events and 2019 production article | Early Yugoslav decades; current medical stocks/licence completions; primary road-law recheck | 8510b10 |
| Romania | Six supply/import/facilitation/death rows; high-risk personal tier; primary medical/industrial/seed conditions; treatment and confiscation; original DIICOT data; four events and 2023 article | Early decades; rehabilitation time limits; clinical research and present medical stock; 2026 proposal’s final disposition | 52dde1f |
| Albania | Quantified possession, cultivation and nine supply/facilitation tiers; medical/industrial separation; rehabilitation; seed permissions; fourth word; seven new events and 2023 article | 1930s/1940s/1960s/1980s; present issued-licence count; operational road tests; HHC gazette and traceability PDF retrieval | this commit |

Luxembourg: read downloaded official 1973-law and 1974-schedule consolidations
through July 2023, original 2023 amendment, full medical evaluation with 2018
statute appendix, November 2024 programme announcement, 2025 RELIS factsheet,
2026 parliamentary answer and Customs excise guidance. The Legilux HTML needs
JavaScript, but filestore PDF access worked. Original 2018 standalone PDF did not
resolve; original wording read in government's report appendix. Medical entry
moved from a June vote to 5 August commencement, as expressly dated in the
2023 government report bibliography. Existing score vector retained.

Corrected consumption text: Article 7-1(5) concerns offering to minors, not using
with them. Added actual supply ranges, aggravations and mandatory life in the
death/minor circumstance. Fine minima and alternatives now structured. Hemp
standard → high: schedule expressly excludes CAP varieties and qualifying
non-intoxicating commercial varieties below 1%; agricultural 0.3% reference is
separate. Production none → hemp for that commercial exception; no adult-use
commercial cultivation permission inferred. Four French terms from official
law/market texts, without inventing Luxembourgish slang. Customs 2025 annual
annex was indexed but its original returned 404, so not used for new statistics.

Luxembourg validation: six-page selected build passed all tests and citation/
collection checks. Inspected profile fine ranges and the medical article. Audit
zero errors and warnings after a wording cleanup. Shared history staged only for the five own IDs.


Slovakia: read current Slov-Lex Criminal Code §§135c–f, 171–173 and annexes,
current drug statute §15, original CBD deletion and HHC amendments, 2026 Ministry
CBD-food notice and NIHO clinical/economic assessment. Life is now a structured
alternative; plant tiers calculated from the statute’s two-plant baseline and
multipliers. No new threshold or score invented. Production medical → hemp:
commercial fibre/seed is expressly permitted; research permission concerns science
rather than medical production for sale. No inference that NIHO assessment grants
flower access or proves current reimbursement. Removed Wikipedia-only 0.3%/2022
product assertion in favour of the actual catalogue-based growing exception.
Hemp status standard retained for that agricultural regime; product permissions
are not inferred from the crop threshold. Added konopa/CBD from official law;
existing sourced tráva/hašiš retained. Atlas CBD link retained; no atlas edit.

Slovakia validation: five-page build passed all tests and content/citation checks;
inspected profile tables and CBD article. Audit zero errors; wording warning
removed after inspection. Shared history staged by four own IDs.


Croatia: read current drug law, Criminal Code arts. 190–191, original 2019 and
2015 regulations, November 2025 amendment, national 2025 police report and
September 2025 market account. Preserved scores and statuses. The 2025 minimum
was already correct in the profile, but absent from history: recorded 13 November
commencement; sharing score already at floor 1, so no fictitious before step.
Corrected “use handled as same misdemeanour” to distinguish the statutory use
prohibition from the possession tariff. Removed Wikipedia dependence from the
revised current-law claims. Supply aggravations and facilitation death range now
structured; open-ended statutory minima kept without inventing a maximum.
Medical market claim attributed to dated survey, not asserted as a verified
October 2026 stock count. Research legal permission now explained without
inferring absence of science from the commercial market. Kept statutory 0.2%
hemp definition, rather than replacing it with the EU agricultural subsidy line.
Police figures are national 2025 mass/plant counts; total seizure incidents cover
all drugs. A local August 2026 raid appeared in search but its original failed
retrieval, so it was not marked checked or added.

Croatia validation: four-page build passed all tests/content/citations; inspected
profile and production article. Audit zero errors/warnings. Existing regression
checks required retaining the numeric “90 days” and “7.5 g of THC per 30 days”
phrases; adjusted wording, preserving the underlying conditions. Shared history
staged only for the two new IDs.


Romania: opened current Law 143 via alternate official document 295513 after
23629 repeatedly returned 502, current Law 339, original 2023 amendment, 2024
assistance amendment and 2025 driving ruling, original DIICOT report mirrored by
Digi24, and Government's February 2026 press release. The latter is explicitly a
bill, not current enacted law. Scores/statuses unchanged. Added high-risk and
border distinctions without equating all cannabis flower with isolated THC.
Removed unsupported “common” sentencing claims, expungement-search placeholder,
and ambiguous arrests wording. DIICOT counts all-drug defendants separately from
cannabis mass and its combined “crops/plants” category. No cannabis-only detained
count inferred. Seed trade open → regulated for cultivation seed under Article
12(3); separated seeds and cultivation authorisations distinguished. Hashish word
meaning no longer repeats the dictionary’s misleading leaf description. Culture
and existing atlas link retained. No clinical study invented to fill research.

Romania validation: six-page build passed tests and all content/citation checks;
inspected profile tables and 2023 article. Audit zero errors/warnings. Shared
history staged only for the four new IDs.


Albania: read original Law 61/2023, current Albanian Criminal Code through Law
8/2026 (ministry September upload), agency medical and industrial procedures and
FAQ, July register and October inspection decisions, police Operation Quality
report, Nikolli's 2015 legal-history study and April 2026 GITOC review. The English
code hosted beside the Albanian version omits January 2026 drug amendments;
current tables use Albanian wording, including new quantity/serious-harm
aggravations. No score change: ordinary tariffs retained and cultivation/sharing
already at floor 1; the new 2026 entry records aggravated conduct. Historical
1952/1977 codes and 2008 ruling added as context without inventing historical
practice scores from a tariff reconstruction. Early-code details attributed to the
study; originals remain a follow-up. The 2008 ruling concerned heroin and informs
the general exemption; it is not presented as a cannabis case.

Industrial hemp standard → high for the statutory <=0.8% varieties definition.
Corrected industrial permit to five years (medical licence fifteen), authority
approval and planting permissions. Personal-dose row tolerated → legal because
it is a statutory exclusion, not non-prosecution by policy; underlying score
unchanged. Seed/seedling trade regulated for authorised channels, ordinary home
growing still illegal. Replaced unsupported permanent-record search placeholder
with Article 69 rehabilitation periods. Export production is not domestic patient
access. Removed repeated April no-licence count from current sections; retained
that dated report in history/article, without claiming July/October decisions
prove licensing has started. Agency's apparent licence-notice link loops home,
so no issued-licence number inferred. Original 2023 entry now uses primary law,
21 July adoption date, and a full article.

Operation Quality is dated 21 October 2025 in the article's publication link;
the page's top clock is unrelated and search snippets misleadingly suggested
August 2026. Its two arrests and 61 kg remain a single import case, not national
user totals. Added Kanabis from actual police usage; retained three existing
words/atlas connection. No clinical or genetics content invented. The HHC gazette
search lead opened only a portal shell and traceability Decision 593 repeatedly
timed out, so neither is marked checked or added as a separate event. Build
initially waited for another contributor's lock; no lock removed.

Rendered-page review exposed coarse automatic quick answers: Albania's default
obscured the statutory single-dose exclusion and described a fine as usual;
Romania's default also asserted that fines were usual without evidence. Added
explicit profile answers describing the exception and actual statutory options.
Romania receives a small separate follow-up commit for this rendering correction.

Final validation: ten-page build (Albania's profile/eight history pages plus
Romania's corrected quick answer) passed all 193 tests and content/citation
validation. Inspected rendered tables, article, quick answers and all new event
pages. Both profile audits report zero errors/warnings. Romania follow-up:
b86b0f2. Albania's article is 391 words. Shared history staged only for Albania's
eight own blocks, preserving concurrent contributors' entries. Across this batch:
five expanded profiles, twenty new history events, five new articles, no changes
to the six current score vectors. Remaining research gaps are listed above.
