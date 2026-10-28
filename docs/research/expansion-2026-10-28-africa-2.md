# Expansion batch, 28 October 2026 — Africa 2 (Maghreb)

Chosen from `country-gaps.cjs --rank 25 --region Africa`. The batch is Morocco, Algeria, Tunisia,
Libya and Mauritania: five North African jurisdictions sharing French colonial drug law, hashish
routes and, since 2021, Morocco's licensed-cannabis reform. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Morocco | 1974 and 2021 penalty tables, hemp/planting updates, 14 history entries | 1940s etc. already covered; patient uptake and fibre licensing unverified | this commit |
| Algeria | 2004/2023/2025 penalty tables, recreational/hemp sections, 8 history entries | 1940s and 1950s empty; death-penalty scope and seed trade partly unclear | this commit |
| Tunisia | Law 52 penalty tables, recreational/hemp/culture/driving/arrests sections, 15 history entries | 1940s and 1980s empty; Table B and seed rule unverified | this commit |
| Libya | 1990/2002 penalty tables, hemp/driving/black-market/arrests sections, 14 history entries | 1900 estimate retained; 2014–2024 gaps; no national series | this commit |
| Mauritania | 1993/2008 law penalty tables, recreational/hemp/driving/arrests sections, 8 history entries | 1930s–1950s empty; 1977 and 2015 entries still Wikipedia-only | this commit |

Tunisia validation: `profile-audit tn` zero errors/warnings; `country-gaps tn` has no missing sections, tables or citations, and the profile now has `words` and a culture link. The profile follows Law 92-52 as amended in 2017: use or possession carries one to five years and a 1,000–3,000 dinar fine, with Article 53 allowing a judge to reduce it to one day or a fine; cultivation for trafficking carries six to ten years; import or export ten to twenty; criminal association twenty years to life. It records the 2025 figures (15,253 cases, 27,338 people), the 2025 customs seizure of 760 kg and the 2024 resin figure of 1,815 kg, and treats drug-driving as unverified. Fifteen history entries cover 1927–2026. The 2017 entry's description and the Kef 30-year entry's arithmetic were corrected.

Mauritania validation: `profile-audit mr` zero errors/warnings; `country-gaps mr` has no missing sections, tables or citations. The profile follows Law 93-037: possession of any amount is trafficking under Article 5 (15–30 years and a 10–100 million ouguiya fine, death on a repeat conviction), while simple use under Article 39 carries up to two years. The 2008 law supplies the Table I classification, the cultivation ban and the Article 81 research route. Death is flagged as a de facto moratorium since 1987, with the 2024 UN vote recorded and no drug-specific execution verified. Eight history entries cover 1961–2026, including the 2008 medicines law, the 2016 Haidalla case, the 2024 UN vote and the 2026 reform bill.

Libya validation: `profile-audit ly` zero errors/warnings; `country-gaps ly` has no missing sections, tables or citations. The profile now distinguishes Article 37 personal use (three to fifteen years and a 1,000–5,000 dinar fine, with treatment) from Article 35 supply (life or ten to fifteen years) and Article 34 import, production or cultivation with intent (death or life, mandatory death with aggravating facts). It adds hemp, driving, black-market and arrest sections, the Traffic Law 11/1984 penalty, the 2024–2026 agency and court figures, and 14 history entries from 1956 to 2026. The 1900 first-restriction estimate and the 2025 Misrata case are retained and flagged as estimates or minor.

Algeria validation: `profile-audit dz` zero errors/warnings; `country-gaps dz` has no missing sections, tables or citations. The profile now sets out Article 12 personal use (two months to two years and DZD20,000–50,000, or either), Article 20 personal cultivation (two to five years and DZD200,000–500,000), Article 17 supply (ten to twenty years, twenty to thirty for officials, life for a gang), Article 19 import-export (life) and Article 21 bis 2 (death for aggravated supply, production or import). It adds recreational and hemp sections, attributes the 2025 DGSN and ONLCDT figures separately, and records that no cannabis death sentence has been imposed. Eight entries cover 1928–2026, including the 2024 schedule, 2026 testing decrees and 2026 desert prison plan.

Morocco validation: `profile-audit ma` zero errors/warnings; `country-gaps ma` has no missing sections, tables, citations or Wikipedia-only texts. The profile now sets out Article 2 possession (five to ten years and MAD5,000–50,000), Article 8 use (two months to one year and MAD500–5,000), Article 3 facilitation (two to ten years and up to MAD500,000), and the Article 50/51 cultivation routes under Law 13-21. It adds the 1% THC hemp limit, the 2025 licensed-area and harvest figures, 106,117 drug cases and 134,126 arrests, and 14 history entries from 2013 to 2026. The 1974 entry now carries its exact date, penalties and UN source; the 2022 regulator and 2024 pardon are marked unscored.

## Batch result

All five countries are committed. Final totals: 50 history entries added or corrected (Morocco 14, Algeria 8, Tunisia 15, Libya 14, Mauritania 8). Every profile has zero `profile-audit` errors and warnings, no missing standard or researched sections, no missing penalty tables and no uncited text.

Remaining gaps:

- **Morocco:** patient uptake, reimbursement and dispensing volumes unverified; no separate hemp-fibre licensing confirmed; enforcement figures differ between the interior ministry and DGSN.
- **Algeria:** 1940s and 1950s remain empty; the death penalty's public-health trigger and repeat-cultivation reading have no case law; seed trade is unclear.
- **Tunisia:** 1940s and 1980s remain empty; the annexed Table B and the seed rule were not available; drug-driving status is unverified.
- **Libya:** the 1900 first-restriction estimate is retained; 2014–2024 has no specific cannabis event; agency figures are not a national series.
- **Mauritania:** 1930s–1950s remain empty; the 1977 and 2015 entries still rest on Wikipedia; the 2026 bill's death-penalty status is unknown.
