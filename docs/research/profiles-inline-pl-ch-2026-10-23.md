# Poland and Switzerland: inline country-profile citations

Reviewed 23 October 2026, following `docs/WRITING.md`. Converted all six score explanations and ten
context sections in each profile to source-key citations immediately after the sentence they
support. The already converted Czech, Slovak and Austrian profiles were rechecked with the same
citation functions. Germany remained the format example.

This batch changes profile prose and bibliography only. Scores, recreational/medical categories,
seed/clone classifications, and driving, visitor and club statuses are unchanged. No history
entries, articles or tags were changed. Country profiles do not have a tag field.

## Poland: sources read and corrections

- Read the Sejm's [consolidated drug law](https://api.sejm.gov.pl/eli/acts/DU/2023/1939/text.html),
  specifically articles 4(5), 4(37), 33a–33b, 49a, 58–59 and 62–63. This supplies possession and
  growing penalties, discretionary personal-possession dismissal, gifts/sales, pharmaceutical
  raw materials, the veterinarian exclusion, licensed institute cultivation and seed definitions.
  Small-quantity dismissal is conditional; there is no fixed gram allowance in article 62a.
  The permit in article 49a is reserved to research institutes supervised by the agriculture
  minister. No unrestricted patient home-growing permission was inferred.
- Downloaded the [July 2026 amendment](https://api.sejm.gov.pl/eli/acts/DU/2026/1004/text.pdf)
  and checked its list of amended articles against the profile's rules. Its article 65 changes
  address crop-registration discrepancies; it does not enact the proposed personal plant/15 g
  exception. The article 4 changes concern substitution treatment and article 70a drug assessment.
- Downloaded and read the [2025 Criminal Code consolidation](https://api.sejm.gov.pl/eli/acts/DU/2025/383/text.pdf),
  articles 42 §2, 106 and 178a §1. Corrected the old two-year drug-driving maximum to three years
  and the old one-to-ten-year ban description to a minimum three years. A conviction may later be
  expunged; removed the absolute implication of a permanent criminal record.
- Read the Supreme Court's [II KK 219/14 judgment in the SAOS reproduction](https://www.saos.org.pl/judgments/167605),
  especially its discussion of evidence of psychomotor impairment. A positive screening test and
  an admission of prior cannabis use did not prove criminal impairment. Replaced the claim that
  any detected THC automatically proves the criminal offence. The profile retains `driving: zero`
  because there is no numerical statutory permission and the lesser after-use offence remains
  distinct from criminal impairment. The original Supreme Court PDF returned 403; the full
  reproduction, not a search snippet, was read.
- Read the [Patient Rights Ombudsman's prescribing explanation](https://www.gov.pl/web/rpp/zmiany-w-wypisywaniu-recept--jak-dziala-obowiazujacy-od-listopada-przepis).
  Personal examination is normally required from 7 November 2024, with a specified exception for
  continuing treatment through contracted primary care. The previous "first consultation" wording
  was too broad an implication that subsequent remote prescribing is always allowed.
- Downloaded and read [proposal 2672](https://api.sejm.gov.pl/sejm/term10/prints/2672/2672.pdf),
  draft articles 1–3, and the [Sejm process API](https://api.sejm.gov.pl/sejm/term10/processes/2672).
  The proposal covers 15 g of herb and one personal plant inaccessible to the public. The API
  reports `passed: false`, with committee referrals through 1 July 2026. Wrote that it remains a
  proposal; did not claim a scheduled debate or a new enacted exception.
- Read the [Institute of Public Affairs' 2010 report](https://www.opensocietyfoundations.org/uploads/cb894c21-1fa1-4d69-b5e9-9e02ecf8b94f/drug-policy-in-poland-20100819.pdf)
  through the web PDF extraction, including pages 2–5, and the full substantive body of the
  [2014 Polish Drug Policy Network analysis](https://drogriporter.hu/en/polish-drug-policy-by-numbers/)
  via the web cache. The profile's historical quantities remain, with dates and all-drug coverage
  explicit. The 2,307 dismissals comprise 2,145 prosecutor and 162 court decisions; the older
  possession paragraph attributed the entire total to prosecutors.
- Reused the downloaded full [European club survey](https://cdn.sanity.io/files/6u5teakk/production/f4c3728d3dc15f3ae1e89790c1f62033dcaa4140.pdf?dl=)
  in `tmp/profiles-inline-cz-sk-at-2026-10-23/pardal.txt`, reading the methods and sample table.
  One Polish club responded in 2018–19. Removed claims that club supply is prohibited throughout
  today's EU and that unspecified contemporary raids describe Poland.

Removed unsupported present-day claims about routine overnight detention, a current 100,000-plus
patient count, and market ranking. The Chambers page returned a challenge rather than the legal
guide; it was not used. Reimbursement and initial pharmacy-delivery details were not independently
recovered in this pass and were omitted rather than given newly placed citations.

Poland's existing EUDA 2026 seizure figures are unchanged and their citations migrated. They were
not freshly downloaded or independently re-audited in this pass.

## Switzerland: sources read and corrections

- Read the federal health office's [cannabis guidance](https://www.bag.admin.ch/de/sucht-und-gesundheit-cannabis)
  and [product-law overview](https://www.bag.admin.ch/de/geltende-rechtslage-von-hanf-und-cannabisprodukten)
  through the web cache after direct fetches failed. The small-possession exception is separate
  from consumption. A CHF100 fixed fine can apply to adult consumption; "at most CHF100" was an
  unsupported universal ceiling. Product law continues to apply below 1% THC.
- Read the Federal Supreme Court's [BGE 149 IV 307](https://search.bger.ch/ext/eurospider/live/de/php/clir/http/index.php?highlight_docid=atf%3A%2F%2F149-IV-307%3Ade&lang=de&type=show_document),
  headnote and reasons 2.2–2.3. Supports the 10 g exemption, simultaneous shared consumption,
  personal-use fines and the basic general drug-offence maximum. The headnote supplies the
  prohibition on confiscating exempt personal quantities for destruction. The original bger host
  had fetch/TLS errors; the Court's search host supplied the judgment body.
- Read [pilot-trial FAQs](https://www.bag.admin.ch/en/faqs-on-cannabis-pilot-trials) and their
  [German participation section](https://www.bag.admin.ch/de/faq-haeufige-fragen-zu-pilotversuchen-mit-cannabis).
  Sources specify adult existing users resident in the host canton, written consent, no passing on
  trial cannabis and no publicly accessible consumption, approved outlets and exceptional producer
  licences. Replaced general "only legal THC source" wording with distinct medical and trial routes.
- Read the [federal report overview through July 2025](https://www.bag.admin.ch/en/initial-results-of-the-pilot-trials-with-cannabis):
  seven trials, approximately 10,500 participants, pharmacies/outlets/social-club models, and most
  participants obtaining cannabis exclusively through trials. The figure is dated to the evidence,
  not labelled an October 2026 headcount. No precise end dates for individual trials are asserted.
- Read [medical prescribing and reimbursement guidance](https://www.bag.admin.ch/de/medizinische-anwendung-von-cannabis)
  and [Swissmedic's cultivation rules](https://www.swissmedic.ch/swissmedic/en/home/news/mitteilungen/anpassungen-betmkv-und-bemvv-edi-zu-cannabis.html).
  Doctors no longer need a special health-office permit; reimbursement remains exceptional.
  Establishment and individual cultivation licences, traceability and harvest contracts are
  separate from patient prescribing.
- Read the [food authority's product guidance](https://www.blv.admin.ch/de/cannabis-cannabidiol-lebensmittel).
  Removed "anything under 1% is freely sold". Novel-food approval is required for cannabinoids and
  cannabinoid-containing extracts sold as food; a narcotics threshold is not blanket market approval.
- Downloaded and read the relevant reasons of [6B_274/2020](https://servat.unibe.ch/dfr/bger/2020/200827_6B_274-2020.html),
  especially 3.5 and 4. Seeds are controlled by the plants they are intended to produce, rather than
  by measuring 1% THC inside the seed itself; corrected that misleading formulation.
- Downloaded and read [6B_282/2021](https://servat.unibe.ch/dfr/bger/2021/210623_6B_282-2021.html),
  reasons 3.2–3.5. The 1.5µg/L level is an analytical detection threshold, distinct from a universal
  impairment threshold. The decision upheld it. Removed the old anecdotal sentence and source
  substitution in favour of the actual judgment.
- Downloaded and read the relevant [Federal Statistical Office 2024 release](https://dam-api.bfs.admin.ch/hub/api/dam/assets/33967376/master):
  48,208 Narcotics Act offences, an 11.5% fall, declining since 2015. The count covers all drugs.
- Read the full body of the [2020 market report](https://swissinfo.ch/eng/politics/drug-research_swiss-cannabis-market-worth-up-to-half-a-billion-francs-annually/45512396).
  Kept dated 40–60 tonne/CHF500m estimates, Moroccan hashish and CBD mixing. Removed the false
  present-tense generalisation that all cannabis outside the trials is bought illegally.

Direct fetch failures and empty HTTP-200 responses are recorded in the research folder. The
obsolete ch.ch address returned a 404 page with status 200 and was not used. Fedlex returned only
its JavaScript fallback; no claim is made to have read the statute there.

## Verification

The scoped verifier exercises the real `citeParts`, `references`, `citedKeys`, `stripCites` and
`sourceTuple` functions: 80 blocks and 222 inline source links across Poland, Switzerland, Czechia,
Slovakia and Austria. All local citation keys are valid, all listed sources are used, repeated
references keep their number, and plain text strips marks correctly. All Polish and Swiss scores,
classifications and map statuses match their pre-edit snapshots. Czechia is byte-identical to its
pre-edit snapshot.

Build and rendered-page results are appended after completion. Generated site output is removed;
source downloads, extracts, verifiers and logs remain for review.

Final full build passed: **3,785 pages in 35.41 seconds**. Rendered checks passed for 227 numbered
links across the five profiles (45 Poland, 50 Switzerland, 51 Czechia, 41 Slovakia, 40 Austria).
Every link resolves to a unique reference target; both reference lists per profile have consecutive
numbering. Home, comparison, country APIs and score exports have no raw citation marks. The six
Polish/Swiss exported scores match the pre-edit values, and each API timeline ends at its current
exported exact score. `git diff --check` passed.

The dedicated `tmp/profiles-inline-pl-ch-2026-10-23/site/` build was deleted after inspection.
