# Expansion batch, 28 October 2026 — Africa 1

Chosen from `country-gaps.cjs --rank 25 --region Africa`. The batch is Zambia, Eswatini, Lesotho,
Botswana and Madagascar: five southern African and SADC jurisdictions with shared trade and
drug-law histories. Eritrea, Somalia, Somaliland, Sudan, Libya and Mauritania were left for a later
pass because their current primary sources are harder to reach.

| Country | Done | Left | Commit |
|---|---|---|---|
| Zambia | NDPS/CSA penalty tables, recreational/hemp/arrests sections, 8 history entries | 0.5 g/2.5 ml threshold rests on 1994 regulations; hemp licences still pending | this commit |
| Eswatini | dual 1922/1929 penalty tables, recreational/hemp/culture/arrests sections, 8 history entries | no enacted medical/hemp Bill; reported producer licence disputed | this commit |
| Lesotho | in progress | | |
| Botswana | in progress | | |
| Madagascar | in progress | | |

Zambia validation: `profile-audit zm` zero errors/warnings; `country-gaps zm` has no missing sections or tables and no uncited text; the full page build passed and the page shows two tables. The profile now follows the Narcotic Drugs and Psychotropic Substances Act 2021 and the Controlled Substances Act 2023, with the 0.5 g/2.5 ml trafficking line, possession and cultivation tables, the hemp licence at 0.3% THC, and the 2024–2026 Drug Enforcement Commission figures.

Eswatini validation: `profile-audit sz` zero errors/warnings; `country-gaps sz` has no missing sections or tables and no uncited text; the full page build passed and the page shows four tables. The profile now distinguishes the 1922 Opium Act's five-year maximum from the 1929 Pharmacy Act's fifteen-year possession and ten-year sale penalties, records the 0.3% absence of a hemp exemption, and adds the 1939 courts, 1948 seizure, 1968 independence, 2008 driving, 2019 licence, 2023 Bill consultation, 2025 spraying and 2026 repeal statement.
