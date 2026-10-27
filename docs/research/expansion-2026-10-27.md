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
| Russia | Four penalty tables; recreational, hemp and culture sections; products folded; production status corrected to hemp; Wikipedia-only medical/consequences/clubs/enforcement replaced; May 2026 sentencing proposal recorded | 1950s gap; further enforcement statistics and research/genetics; first build blocked by another contributor’s invalid Namibia citation; retry follows | This country commit |
| Ukraine | Four penalty tables; recreational/hemp sections; 0.2% transitional hemp ceiling corrected; products folded into patient access; July 2026 digital rollout entry; 2026 dispensing article | 1940s–1950s gaps, 1934 article and culture links remain; numeric quantity endpoints kept out of ambiguous inclusive table ladders | This country commit |

Russia and Ukraine verified in the successful 4,908-page build (27 October); both audits report zero errors/warnings. Russia proposal history was picked up by another contributor’s shared-history commit before the profile commit. Shared build retries were required; no other contributor’s files were changed.
