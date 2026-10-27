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
