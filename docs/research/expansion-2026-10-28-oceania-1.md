# Expansion batch, 28 October 2026 — Oceania 1

Chosen from `country-gaps.cjs --rank 25 --region Oceania`. The batch is Guam, Tonga, Samoa,
French Polynesia and Fiji. The smaller Micronesian states were left for a later pass because their
drug law is split between national and state codes; Fiji is included for its larger population and
accessible statute.

| Country | Done | Left | Commit |
|---|---|---|---|
| Guam | in progress | | |
| Tonga | rebuilt on the Illicit Drugs Control Act, four penalty tables, driving/black-market/arrests sections, 5 history entries; 1930 Act replaced the 1925 estimate | 1940s–1960s empty | this commit |
| Samoa | rebuilt on the Narcotics Act 1967, possession/cultivation tables, recreational/hemp/black-market sections, 5 history entries | 1970s and 1980s empty | this commit |
| French Polynesia | in progress | | |
| Fiji | in progress | | |

Samoa validation: `profile-audit ws` zero errors/warnings; `country-gaps ws` has no missing sections or tables and no uncited or Wikipedia-only text; `npm test` passes 183/183; the 5,264-page build passed and the page shows two tables. The profile now follows the Class B scale: up to 14 years for possession, use, supply, cultivation or seed possession, with no quantity threshold. The 2017 recommendation is described as regulating medicinal use, not a dispensary scheme.

Tonga validation: `profile-audit to` zero errors/warnings; `country-gaps to` has no missing sections or tables and no uncited text; the 5,264-page build passed and the page shows four tables. The profile now grades cannabis by weight, not plant count: under 28 g up to one year or T$5,000, 28 g or more up to seven years or T$50,000, with no separate higher sale tier. The 1930 Drugs and Poisons Act replaces the unsupported 1925 estimate, and the 2012 Class B reclassification is recorded as context because the current scores already reflect it.
