# Expansion batch, 28 October 2026 — Asia 1 (Middle East)

Chosen from `country-gaps.cjs --rank 40 --region Asia`. The batch is Syria, Palestine, Yemen,
Qatar and Bahrain: five Arabic-speaking jurisdictions sharing Ottoman and mandate-era drug law,
Gulf narcotics statutes and, in Syria, Palestine and Yemen, current conflict and transitional
authority. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Syria | 1993 Act penalty tables, recreational/hemp/driving/arrests sections, 12 history entries | 2021 amendment and Schedule 4 unverified; no cannabis execution found | this commit |
| Palestine | West Bank and Gaza penalty tables, hemp/driving/arrests sections, 20 history entries | 1980s empty; 2025–2026 figures West Bank only | this commit |
| Yemen | cultivation table, hemp/driving/black-market sections, 14 history entries | 1930s empty; 1925 estimate retained; no Houthi annual totals | this commit |
| Qatar | 1987/2006 penalty tables, hemp and arrest sections, 13 history entries | no annual arrest count; no drug execution found | this commit |
| Bahrain | 2007 penalty tables, hemp/arrests sections, 10 history entries | 1930s–1960s empty; 1925 estimate retained | this commit |

Qatar validation: `profile-audit qa` zero errors/warnings; `country-gaps qa` has no missing sections, tables or citations. The profile now attributes the six-month-to-three-year personal-use range to Law 1 of 2006, not Law 3 of 2020, and adds cultivation and sharing tables, Schedule 5 hemp exemptions, the customs ban on hemp seed, the May 2020 murder execution (no drug execution), and 2024–2026 customs cases. Thirteen history entries cover 1916–2026, including the 1998 capital-trafficking law, the 2003 use offence and the 2006 sentence cut. The old 2020 and 2023 entries were replaced after the research showed the first lowered the sentence and the second was technical.

Syria validation: `profile-audit sy` zero errors/warnings; `country-gaps sy` has no missing sections, tables or citations. The profile now corrects personal possession from "up to three years" to Article 43's three to fifteen years (Penal Code article 44), keeps the 100,000–500,000 pound fine and treatment route, and separates Article 39 death for any smuggling, manufacture or cultivation from Article 40's life sentence with death only for aggravating facts. It adds recreational, hemp, driving and arrest sections, the 2024–2026 Captagon-dominated enforcement figures, and 12 history entries from 1959 to 2026. The 1993 entry now carries the exact detention range and the correct death scope.

Yemen validation: `profile-audit ye` zero errors/warnings; `country-gaps ye` has no missing sections, tables or citations. The profile keeps the 1993 law's five-year personal-use penalty and treatment route, adds the Article 34/33 death tiers and a cultivation table, and distinguishes the government-controlled 2025 figures (704 cases, 2,986 kg hashish) from the Houthi areas where no annual series exists. It adds hemp, impairment-based driving, black-market and H1 2026 arrest figures, and 14 history entries from 1977 to 2026, including the qat context and the Sana'a and Hadramout death sentences. The 1925 estimate is retained but now states that the first verified ban is Aden's 1942 ordinance.

Bahrain validation: `profile-audit bh` zero errors/warnings; `country-gaps bh` has no missing sections, tables or citations. The profile now gives article 32(1) ten days to three years and a BHD3,000 fine, article 32(2) up to seven years, article 30 death or life with the five mandatory aggravating facts, and article 31 paid supply at ten years minimum. It adds cultivation and sharing tables, the 2025 Traffic Decree 30 penalties, hemp and arrest sections, the 2018–2026 hashish and CBD cases, and 10 history entries. The 1925 first-restriction estimate is retained but now states that the first verified cannabis-specific instrument is the 1954 regulation.

Palestine validation: `profile-audit ps` zero errors/warnings; `country-gaps ps` has no missing sections, tables or citations. The profile now separates the West Bank's Decree-Law 18/2015 (six months to two years for use, fifteen to twenty-five years for cultivation or supply for sale) from Gaza's 2013 law (three to fifteen years for use, five years to life for trafficking, death available in aggravated cases). It adds death-penalty, hemp, driving and arrest sections, the 2024–2026 West Bank caseload, the 2023 Gaza court collapse, and 20 history entries from 1948 to 2026. The 2015 and 2020 entries now record the repeal of the prior laws and the added online-promotion and suspended-sentence provisions.

## Batch result

All five countries are committed. Final totals: 69 history entries added or corrected (Syria 12,
Palestine 20, Yemen 14, Qatar 13, Bahrain 10). Every profile has zero `profile-audit` errors and
warnings, no missing standard or researched sections, no missing penalty tables and no uncited
text.

Remaining gaps:

- **Syria:** Schedule 4 and the Official Gazette issue were not read; a reported 2021 amendment is unverified; no cannabis execution was confirmed; the traffic-law trigger is unknown.
- **Palestine:** the 1980s have no verified cannabis event; the PA and Gaza laws conflict over which applies in Gaza; 2025–2026 enforcement figures cover the West Bank only; pure CBD's status is unstated.
- **Yemen:** the 1930s have no verified event; the 1925 first-restriction estimate is retained; no Houthi annual seizure or arrest series exists; no cannabis execution was confirmed.
- **Qatar:** no annual cannabis arrest count; no drug execution found; the 1966 decree and its amendments were not read; CBD's status is inferred.
- **Bahrain:** the 1930s–1960s remain empty; the 1925 first-restriction estimate is retained; the 1931 regulation's cannabis coverage is unverified; no cannabis-only arrest count exists.
