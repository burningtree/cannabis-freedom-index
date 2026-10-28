# Expansion batch, 28 October 2026 — Asia 8

Chosen from `country-gaps.cjs --rank 35 --region Asia`, skipping the countries already expanded
in Asia 1–7 and taking the highest-ranked remaining profiles. The batch is Armenia, Jordan,
Iran, Cambodia and the United Arab Emirates. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Armenia | plant-count cultivation, 2026 hemp licensing, 2024–26 figures, 7 history entries | 1940s empty; no annual arrest count | this commit |
| Jordan | hemp status, life/death fields, CBD framework, research section, 5 history entries | no cannabis-only execution verified | this commit |
| Iran | 2024 fine update, treatment correction, contested death threshold, 7 history entries | no cannabis-specific execution data | this commit |
| Cambodia | life tiers, customary cultivation, Jan–Sep 2026 figures, 5 history entries | no cannabis-only arrest count | this commit |
| United Arab Emirates | port/visitor correction, UNODC seizure series, life fields, research section, 5 history entries | no cannabis execution found | this commit |

Cambodia validation: `profile-audit kh` zero errors and warnings. The profile records life imprisonment at the top possession and sharing bands, the Article 38 customary-cultivation exception, the cumulative 2026 seizure series (389 kg by September), the airport prosecutions and Article 44’s venue offence. Five entries cover 1975–2026.

United Arab Emirates validation: `profile-audit ae` zero errors and warnings. The profile now separates the port fine from the after-entry personal-use penalty, corrects the driving “or either” wording, adds the 2022 UNODC cannabis figures, records mandatory life at the top quantity tiers and the Article 53 venue offence, updates the death-penalty practice and adds a research section. Five entries cover 2024–2026.

Iran validation: `profile-audit ir` zero errors and warnings. The profile now uses the 2024 fine amounts, replaces the addict fine with compulsory treatment, records the 5/20/50 kg death-threshold conflict and the 2019 judicial meeting, adds the 503 (2024) and 795 (2025) drug-execution figures and dates the gol price. Seven entries cover 1932–2026; the 2017 entry date is now 14 November 2017.

Armenia validation: `profile-audit am` zero errors and warnings. The profile now uses the plant-count cultivation ladder (1–5, 6–9, 10–100, over 100) and moves cultivation from 1 to 2; it records two hemp licensees in January 2026, export-only products, 2024–2026 drug figures and a licensed research route. Seven entries cover 1925–2026, including the scored 2018 threshold decision and the primary 1934 decree.

Jordan validation: `profile-audit jo` zero errors and warnings. The profile now sets hemp to none, adds the missing fine minima and mandatory-life fields, records article 19(b) life and article 12(1)(d) death, describes the 2023 CBD framework rather than implying products, and adds a licensed research section. Five entries cover 2025–2026, and the first-restriction estimate is narrowed to 1925–1961.

## Result

All five countries were expanded and committed separately: Armenia `1ed22f0d`, Jordan `3d9f79a0`, Iran `8cc90624`, Cambodia `5c7da317` and the United Arab Emirates `c61050d8`. Each profile passes `profile-audit` with zero errors and warnings and has no missing standard or researched sections, penalty tables or inline citations. Targeted `build-pages.mjs` runs rendered each country and its changed history pages; `npm test` passes.

The batch added 28 history entries. It corrected Armenia’s cultivation ladder and score (1→2), Jordan’s hemp/death-penalty structure, Iran’s 2024 fine scale and contested death threshold, Cambodia’s life tiers and 2026 seizure series, and the UAE’s port/visitor rules and UNODC seizure figures. The main open caveats are Armenia’s empty 1940s, Jordan’s unverified 1937 cannabis coverage, Iran’s conflicting 5/20/50 kg capital thresholds, Cambodia’s incomplete cannabis seizure count and the absence of a verified cannabis execution in the UAE.
