# Expansion batch, 28 October 2026 — Oceania 1

Chosen from `country-gaps.cjs --rank 25 --region Oceania`. The batch is Guam, Tonga, Samoa,
French Polynesia and Fiji. The smaller Micronesian states were left for a later pass because their
drug law is split between national and state codes; Fiji is included for its larger population and
accessible statute.

| Country | Done | Left | Commit |
|---|---|---|---|
| Guam | possession/cultivation tables, hemp/clubs/planting/driving/black-market/arrests sections, citations, 5 history entries; 1972 UCSA replaced the 1925 estimate | 1930s–1960s and 1980s empty | this commit |
| Tonga | rebuilt on the Illicit Drugs Control Act, four penalty tables, driving/black-market/arrests sections, 5 history entries; 1930 Act replaced the 1925 estimate | 1940s–1960s empty | this commit |
| Samoa | rebuilt on the Narcotics Act 1967, possession/cultivation tables, recreational/hemp/black-market sections, 5 history entries | 1970s and 1980s empty | this commit |
| French Polynesia | planted/driving/black-market/arrests sections, citations, 7 history entries; 1924 control and 1978 score-moving ban | 1930s–1960s empty | this commit |
| Fiji | black-market and culture sections, products folded, citations, 7 history entries; 1926–1963 colonial statutes and 2023–2026 policy | 1980s empty | this commit |

Samoa validation: `profile-audit ws` zero errors/warnings; `country-gaps ws` has no missing sections or tables and no uncited or Wikipedia-only text; `npm test` passes 183/183; the 5,264-page build passed and the page shows two tables. The profile now follows the Class B scale: up to 14 years for possession, use, supply, cultivation or seed possession, with no quantity threshold. The 2017 recommendation is described as regulating medicinal use, not a dispensary scheme.

Tonga validation: `profile-audit to` zero errors/warnings; `country-gaps to` has no missing sections or tables and no uncited text; the 5,264-page build passed and the page shows four tables. The profile now grades cannabis by weight, not plant count: under 28 g up to one year or T$5,000, 28 g or more up to seven years or T$50,000, with no separate higher sale tier. The 1930 Drugs and Poisons Act replaces the unsupported 1925 estimate, and the 2012 Class B reclassification is recorded as context because the current scores already reflect it.

Guam validation: `profile-audit gu` zero errors/warnings; `country-gaps gu` has no missing sections or tables and no uncited text; the 5,264-page build passed and the page shows three tables. The profile now records the 2019 adult-use limits and the separate medical home-grow permit, the unresolved over-limit penalty after declassification, the draft hemp rules, and the 1972 UCSA as the first dated territorial drug code. The first commercial grower’s operating permit and retail timeline are current to June 2026.

French Polynesia validation: `profile-audit pf` zero errors/warnings; `country-gaps pf` has no missing sections or tables and no uncited text; `npm test` passes 183/183; the 5,290-page build passed and the page shows two tables. The profile now records the French Code pénal and health-code maxima, the 1978 territorial ban, the 2024 hemp/medicine law and 2025–26 pilot, and the 2025 enforcement surge. The 1924 decree is a poison-schedule control, not a full ban; the 1978 law is the score-moving first explicit prohibition.

Fiji validation: `profile-audit fj` zero errors/warnings; `country-gaps fj` has no missing sections or tables and no uncited text; the 5,290-page build passed and the page shows three tables. The profile now adds the 2025 Operation Sasamaki figures, the Kadavu cultivation context, the Indian-hemp culture link and the 1926, 1945, 1955 and 1963 colonial statutes. The 2026 Counter Narcotics Act remains signed but not in force, and the 2022 hemp exemption’s survival under it is flagged as uncertain.
