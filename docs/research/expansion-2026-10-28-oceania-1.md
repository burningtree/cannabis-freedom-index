# Expansion batch, 28 October 2026 — Oceania 1

Chosen from `country-gaps.cjs --rank 25 --region Oceania`. The batch is Guam, Tonga, Samoa,
French Polynesia and Fiji. The smaller Micronesian states were left for a later pass because their
drug law is split between national and state codes; Fiji is included for its larger population and
accessible statute.

| Country | Done | Left | Commit |
|---|---|---|---|
| Guam | in progress | | |
| Tonga | in progress | | |
| Samoa | rebuilt on the Narcotics Act 1967, possession/cultivation tables, recreational/hemp/black-market sections, 5 history entries | 1970s and 1980s empty | this commit |
| French Polynesia | in progress | | |
| Fiji | in progress | | |

Samoa validation: `profile-audit ws` zero errors/warnings; `country-gaps ws` has no missing sections or tables and no uncited or Wikipedia-only text; `npm test` passes 183/183; the 5,264-page build passed and the page shows two tables. The profile now follows the Class B scale: up to 14 years for possession, use, supply, cultivation or seed possession, with no quantity threshold. The 2017 recommendation is described as regulating medicinal use, not a dispensary scheme.
