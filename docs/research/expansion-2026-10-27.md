# Expansion batch, 27 October 2026

Chosen from `country-gaps.cjs --rank 25`: Central African cluster (neighbours, shared
French/Belgian colonial drug-law heritage, all in the top 25 most-needed).

Prior history groundwork exists in `docs/research/`: `history-dr-congo-gap-2026-10-23`,
`history-drcongo-triage-2026-10-26`, `history-cameroon-gap-2026-10-21`,
`history-cameroon-followup-2026-10-26`, `history-central-african-republic-gap-2026-10-21`,
`history-uganda-gap-2026-10-21` + `-2026-10-23`, `history-uganda-1902-*`, `history-rwanda-gap-2026-10-21`.

| Country | Done | Left | Commit |
|---|---|---|---|
| DR Congo (cd) | recreational + hemp sections, products folded, 4 penalty tables, inline citations + history/culture links throughout, culture section linking all 4 atlas entries, 1 new history entry (1977 psychotropics accession) | 1920s–1960s, 1980s–1990s still empty (no post-1917 penal statute found; Leganet indexes only the 1903/1917 ordinance); no arrests/driving/planting sections (no reliable source); no article (no score-moving entry lacks one) | |
| Cameroon (cm) | recreational + hemp sections, products folded, 4 penalty tables (XAF fines verified in Law 97/019), inline citations + history links throughout, production/medical rewritten with sources, 5 new history entries (1962/1981/1991 treaty accessions, 2002 narcotics subdirectorate, 2014 airport cells) | 1930s–1940s still empty; no arrests section; first-restriction estimate still unverified and article-less by choice (no article on an undated estimate) | |
| Uganda (ug) | recreational + hemp + black_market sections, products folded, 4 penalty tables (UGX fines verified in 2024 Act), inline citations throughout, dead African Business source replaced with UG Standard, new commencement article (494 words) | 1910s–1970s + 2000s still empty (HRAPF colonial lead undated; 1971 Convention shares the 1988 Single Convention date); no arrests section; no atlas entries so no culture section | |
| Rwanda (rw) | recreational + hemp + black_market sections, products folded, 4 penalty tables (RWF fines verified in 2018/2019/2023 laws), inline citations + history links throughout, culture re-cited to Codere chapter read locally, FDA register re-verified with zero hits, 2 new history entries (1971 psychotropics, 2017 Rubavu seizure) | 1920s–1950s + 1990s still empty; no clubs/driving sections (no reliable source); first-restriction estimate article-less by choice | |
| Central African Republic (cf) | recreational + hemp sections, products folded, 4 penalty tables (XAF fines verified in Law 01.011), inline citations + history links throughout, production status medical→none (research-only authorisations, consistent with Cameroon), FCDO advice removed from visitor-facing texts per new audit rule, 1 new history entry (1971 psychotropics, same-day as other two) | 1930s–1990s still empty (Empire-era Wikipedia lead is an undated survey claim, IA copy restricted); no planting/driving/arrests sections; 1926 decree article left to the Chad federation piece | |

## Batch 2, 27 October 2026: West Africa

Chosen from `country-gaps.cjs --rank 25`: francophone West Africa plus Guinea-Bissau
(Mano River/Casamance/Sahel trafficking links; shared French colonial drug-law
heritage for ci/sn/tg/ml). Prior groundwork: `history-mali-gap-2026-10-21`,
`history-senegal-triage-2026-10-26`, `history-togo-gap-2026-10-21`,
`guinea-bissau-equatorial-guinea-laws-2026-10-15`.

| Country | Done | Left | Commit |
|---|---|---|---|
| Côte d'Ivoire (ci) | recreational + hemp + driving + culture(diamba) sections, products folded, outdated Koaci-2021/Leafwell claims replaced with 2022 law tariffs (incl. art 7 direct-supply tier), 4 penalty tables, citations + links throughout, 2025 Moossou seizure read | 1930s–1950s + 2000s–2010s still empty; no arrests section (no reliable source) | |
| Senegal (sn) | recreational + hemp + culture(yamba/diamba) sections, products folded, weak thesis-only claims replaced with 1997 Code provisions verified in full SHERLOC text (arts 8–108) + thesis for art 109/120 practice nuance, 3 penalty tables incl. 2007 forced-labour revision, citations + links throughout, Feb 2026 gendarmerie practice figures read | 1930s–1950s + 2010s still empty; no driving section (no reliable source) | |
| Togo (tg) | recreational + hemp + arrests + driving sections, products folded, 2015 code + 1998 law fully verified by own reads (incl. art 268 drug-driving), 4 penalty tables, citations + links throughout, 2026 transit-corridor report read | 1920s–1950s + 1980s + 2000s still empty; first-restriction estimate article-less by choice | |
| Mali (ml) | recreational + hemp sections, products folded, 2001 law penalty provisions verified in own gazette read (arts 94–95/98/137–138), hemp 2017–2020 saga re-read in both Maliweb pieces, 4 penalty tables, citations + links throughout | 1930s–1950s still empty; no driving/arrests sections; nothing new since 2020 found | |
| Guinea-Bissau (gw) | recreational + hemp sections, products folded, Decree-Law 2-B/93 verified in own Portuguese read (arts 3/20–22), 4 prison-only penalty tables (no fine figures in law), citations + history links throughout | 1920s–1960s + 1980s + 2000s–2020s still empty (cocaine-dominated news, nothing cannabis-specific recent); no driving/arrests sections; first-restriction estimate article-less by choice | |

## Batch 3, 27 October 2026: Southern Africa

Chosen from `country-gaps.cjs --rank 25`: Mozambique, Zimbabwe, Malawi, Namibia
(neighbours; shared SADC history; South Africa skipped as BUSY — another agent is
reworking its entries and articles). Note: changes.yaml holds that agent's uncommitted
SA rewrite, so this batch makes no history-entry edits; history additions are deferred.

| Country | Done | Left | Commit |
|---|---|---|---|
| Mozambique (mz) | recreational + hemp + culture(mbanje/suruma) sections, products folded, Law 3/97 penalties re-verified (REFORMAR analysis + 2024 Supreme Court judgment read), 4 penalty tables incl. art 36 fine in current meticais, citations + links throughout | 1920s–2000s gaps mostly remain; no driving section; no new history entries (changes.yaml blocked) | |
| Zimbabwe (zw) | | | |
| Malawi (mw) | | | |
| Namibia (na) | | | |

## 2026-10-27 ~21:50 UTC — zw.yaml answers.culture incident (resolved)
- After my zw rewrite, an invalid `answers.culture` block (verbatim copy of my context.culture text) was found in countries/zw.yaml and broke `npm run build` (`Unrecognized key: "culture"`).
- User confirmed no other agent is editing Zimbabwe; treated the block as my own artifact and deleted it, keeping answers.buy.
- Build passes again after removal; zw verification re-run clean.

## Malawi (mw) — done 2026-10-27 ~22:05 UTC
- Profile rewritten (135 → ~340 lines): recreational, hemp (status high, 1% THC), black_market, arrests, culture sections added; products folded; possession + cultivation penalty steps (segment-level currency MWK; life maxima as notes since parseDuration has no life);	inline [@x,y] multi-citation form; answers.buy.
- Primary law verified in full via pdftotext: Cannabis Regulation Act 2020 (FAOLEX) — s50(1)/s51 K50M + 25 yrs, hemp 1%, qualified-patient registry; Dangerous Drugs Act Cap 35:02 (trade portal) — Act 25 of 1956(F), 1 Apr 1956 commencement, s19(1) K500,000 + life (as amended 1995), s20 warrantless arrest.
- News: SALC youth review (2022), dreadlocks order Jan 2020 (Ntaba), Face of Malawi seizures (Jenda May 2024, Ntcheu Oct 2025, Kawale Feb 2026), PANA 2000 (952 cases/36.6t 1999), VOA/Nation 2024 debate, FurtherAfrica 86 licences 2021, HeKa Dec 2025, ZennJet RED guide, MMJ Bandawe 2022, GrowerIQ.
- Duvall re-read for Malawi passages (local PDF): ch.4 Chichewa vocabulary/1892 Scott dictionary/Yao chamba map; ch.5 packets, 1906 heartland, pre-1922 Lake Malawi cough story. Culture links: chamba, earth-pipe (Ngoni), smoker's-cough.
- History: added malawi-dangerous-drugs-act-1956 (unscored, fills 1950s gap); related-links on 2020/2021/2024 entries. No 1980s/1940s source found; post-2024 news checked (seizures only, nothing score-moving).
- Articles: malawi-local-chamba-2024, malawi-medical-industrial-2020 (mw entries without an article: 8 → 7, counting the new 1956 entry).
- Audit 0/0, history+answers tests pass, build 4876 pages, HTML verified (2 pen tables, 12 history + 4 culture links).

## Namibia (na) — done 2026-10-27 ~22:15 UTC
- Profile rewritten: recreational, hemp (none), black_market, culture sections added; products folded (was "None"); possession + cultivation penalty steps (segment-level NAD; rands in 1971 text); wiki-only texts replaced; answers.buy; inline [@x,y] form.
- Tariffs from UNAM LL.M. thesis (Apr 2017, quotes Act verbatim): s2(a) dealing R30k/15yrs first, R50k/25yrs after; s2(b) possession/use R20k/10yrs first, R30k/15yrs after; s10 115 g presumption. Practice: Mwatongwe 2020 (2yrs), Hafeni 2016 (N$3k/18mo), Swartbooi 12mo.
- News: Swartbooi presumption challenge dismissed 2026 (Prinsloo, nam1); Jaftha/Ndungula 2021 suit (Amoomo, nam2); Jaftha jailed Oct 2023 (Sun, verified); Claasen dismissal July 2026 (verified); New Era Mar 2025 stats; ZennJet RED guide (no medical framework, dronabinol only, foreign scripts incl. CBD not recognised, 2020 petition failed).
- Duvall re-read: dagga/dukan etymology debate, diffusion into Namibia (1880s travellers, east, Ovambo-Herero), Herero onyungu. Culture section has history link (1971 Act) since no atlas entries exist for na.
- History: added namibia-dealing-presumption-upheld-2026 (unscored, year precision); related-links on 2021 entry. No 2010s/1980s/1920s-60s source found.
- Article: namibia-constitutional-challenge-2021 (2021→2023→2026 arc + Swartbooi sidebar).
- Audit 0/0, history+answers tests pass, build 4881 pages, HTML verified (2 pen tables NAD, 11 history links).

## Europe batch: Russia, Ukraine, Moldova, Belarus and Lithuania

Chosen from `country-gaps.cjs --rank 25 --region Europe`; profiles checked afresh before each country because other contributors are active.

| Country | Done | Left | Commit |
|---|---|---|---|
| Russia | Four penalty tables; recreational, hemp and culture sections; products folded; production status corrected to hemp; Wikipedia-only medical/consequences/clubs/enforcement replaced; May 2026 sentencing proposal recorded | 1950s gap; further enforcement statistics and research/genetics; first build blocked by another contributor’s invalid Namibia citation; retry follows | be8b67c |
| Ukraine | Four penalty tables; recreational/hemp sections; 0.2% transitional hemp ceiling corrected; products folded into patient access; July 2026 digital rollout entry; 2026 dispensing article | 1940s–1950s gaps, 1934 article and culture links remain; numeric quantity endpoints kept out of ambiguous inclusive table ladders | bc48fb1 |

Russia and Ukraine verified in the successful 4,908-page build (27 October); both audits report zero errors/warnings. Russia proposal history was picked up by another contributor’s shared-history commit before the profile commit. Shared build retries were required; no other contributor’s files were changed.

### Moldova

Four penalty tables and recreational/hemp sections; products folded, industry status none→hemp. Replaced unsupported two-to-seven-year blanket claim with Law 173/2026 enacted tariffs (28 August): administrative possession MDL10,000–15,000; basic supply six–ten years; separate public-use fine. Three new entries (2024 hemp authorisation, April 2026 processing rules, August 2026 penalties), plus current-law article. Corrected Law 201 commencement February→August using the Interior Ministry’s July notice. Cultivation 1→2 corrects existing subcriminal cultivation treatment (already present in the 2009 contravention code); its existing 2009 score event supplies the earlier boundary. Sharing 1→0 follows the new prison-based supply tiers, with before recorded on the August event.

Limits: Legis blocked full retrieval; e-Lex September pages omit the enacted July amendment although its future consolidation includes it. Used the original amending law reproduced by Bizlex, with Gazette publication corroboration. Numerical drug/plant thresholds withheld pending the replacement schedules; old 2 g is no longer presented as verified. 1940s–1960s/1980s/2010s gaps, first-ban territory/date and two older articles remain. Medical access retained at zero; no operating programme verified.

Moldova validation: profile audit zero errors/warnings; article citation and history tests pass except the global citation test, blocked by another contributor's `countries/sb.yaml` `[@@st]` citation. A missing visitor status was corrected after schema validation; the next build reached prerendering but collided with a concurrent shared-dist build. Final batch build will recheck the page.

### Belarus

Four penalty tables distinguish imprisonment, short custody, criminal fine alternatives and public-use repeat liability. Recreational/hemp sections added, products folded; medical/visitor text now cites the Health Ministry’s 2025 INCB traveller declaration explicitly prohibiting cannabis medicines. 2026 fine-base entry added (BYN45), with 2026 money values verified against the tax ministry and current Article 50/19.3 reproductions. Core texts converted to inline citations; existing scores retained. No new article: current 2025 reform already has one, while the two older Soviet key entries need stronger original sources. Remaining 1940s/1950s/1980s history gaps and driving/arrest research are documented gaps.

Moldova and Belarus pages verified in the successful 4,916-page build, including four tables each and updated context. Both profile audits report zero errors/warnings.

### Lithuania

Four penalty tables, recreational and culture sections; products folded; hemp smoking-product zero-THC rule distinguished from crop/finished-goods limits. Replaced generic legal claims with current statutory text (Temidy reproductions, official primary sources where reachable), including administrative growing under ANK340 and the large-quantity crime under BK265. Cultivation corrected 1→2; 2017 and 2019 before-vectors rebased to 2 so the correction attaches to the 2003 code’s verified large-quantity-only cultivation offence, rather than suggesting a new growing reform in 2019 or 2026. Earlier cultivation boundaries remain a research target. Existing medical event sharpened to 1 May with contemporary LRT evidence; 2019 medical article added. Three new entries: October 2018 medical vote, April 2023 zero-THC smoking rule, April 2025 committee debate. Culture links both existing atlas entries (Kanapinis and cannabis) using the Folk Culture Centre and Klaipėda accounts.

Remaining: 1950s/1960s, 1974 article, cultivation plant-count case law, current drug-driving primary evidence and medical cost/coverage. No safe plant count inferred. The 2018 official analysis verifies 5 g plant material; other product thresholds are not inferred from it. Production/licensing and garden-hemp improvements already committed by another contributor were preserved.

### Europe batch validation and commits

| Country | Commit | Added tables | Added history | Added articles |
|---|---|---:|---:|---:|
| Russia | be8b67c | 4 | 1 (included earlier by concurrent shared-history commit) | 0 |
| Ukraine | bc48fb1 | 4 | 1 | 1 |
| Moldova | c487fda | 4 | 3 | 1 |
| Belarus | fc42142 | 4 | 1 | 0 |
| Lithuania | This country commit | 4 | 3 | 1 |

Final checks: `npm run build` passed (4,921 pages); `npm run seo:audit` passed (4,923 HTML files and 216,929 links); all five targeted profile audits have zero errors and warnings; history tests 47/47 and answer/profile tests 93/93. Built HTML checked for all twenty penalty tables, hemp sections and rendered citations; all three new articles render on their history pages. Both changed score chains report zero flagged steps. All five country-gap reports show no missing standard sections, no missing penalty tables and no Wikipedia-only texts. The final Lithuania commit also records the unscored reason for Ukraine’s July digital-preparation notice. `source-archive.json` and other contributors’ country changes were left out of these commits.

## Europe batch 2: Northern Cyprus, Spain, Bosnia and Herzegovina, Portugal, North Macedonia

Chosen from the next five available profiles in `country-gaps.cjs --rank 25 --region Europe` after the first European batch. Other contributors' Egypt/profile and archive changes remain out of scope.

### Northern Cyprus

Added four penalty tables, recreational/hemp sections, replaced Wikipedia-only medical/industry/consequences, folded products, and linked the treatment route. Recovered the 1972 consolidated law through a transcription linked to the official September 2026 file; official download returned 502. Its body Part I (cannabis) must not be confused with Part I of the annex (higher 18/20-year maxima). The 2015 appellate text supplies the redenominated general fine ceiling of TRY50 alongside the ordinary fifteen-year maximum; 2013 proposed replacement fines are not enacted law. Added 1972 framework, April 2013 proposal, October 2015 sentencing appeal, January 2019 three-plant/import sentence. Scores retained. Earlier colonial statute and precise 1972 commencement remain unverified; new entry is enactment-year, not a first prohibition. 1961/1977/1982/1989/1991/2004 amendments are leads, with no guessed details. The June 2026 Gazette lists another bill but its text/enactment could not be retrieved. No operating medical supply verified; no inference that controlled-drug licence powers establish patient access.

## Japan

Added four penalty tables for possession, cultivation, transfer and use, with the December 2024 statutory maxima and fines; recreational, hemp, medical, industry, research, arrests, culture and driving sections; products folded into medical; linked the 1950 hemp-farms article and the Shinto, shichimi, ma and global march atlas entries; explained the death penalty as not applicable. Medical stays limited: cannabis-derived medicines are lawful but none is approved; Jazz's CBD candidate won orphan designation in June 2024, missed its Phase 3 primary endpoint in August 2024, and Jazz and Nippon Zoki agreed in April 2026 on a future introduction. Scores retained. Added seven history entries: December 2023 HHCH ban, June 2024 CBD orphan designation, August 2024 trial miss, March 2025 licence categories and 0.3% seed limit, August 2025 1.046-tonne Vietnam seizure, April 2026 record investigations, June 2026 CBN ban. Added the 1950 hemp-farms article from the top backlog candidate.

Remaining: spotlights and genetics (no non-duplicative material); no approved cannabis medicine, so no patient-access claim; the precise commencement of the 1948 Act and pre-1948 local enforcement remain research targets. Build passed (4,933 pages); `profile-audit jp --warnings` reported no errors or warnings; `country-gaps jp` shows no missing standard sections, penalty tables, statuses or citations.

Northern Cyprus validation: four tables and the new 1972 framework article render in the successful 4,934-page build; no raw citations remain in either page. Targeted profile audit: zero errors/warnings. General fine provenance remains explicit (2015 judgment, old currency in the consolidation), and the unverified June 2026 proposal remains a follow-up. This country is committed separately before Spain.
