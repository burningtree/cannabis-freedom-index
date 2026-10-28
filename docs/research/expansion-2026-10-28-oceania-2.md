# Expansion batch, 28 October 2026 — Oceania 2

Chosen from `country-gaps.cjs --rank 20 --region Oceania`. The batch is Micronesia, Kiribati,
the Northern Mariana Islands, Palau and Nauru. They are the next five Pacific jurisdictions by gap
rank; Guam, Tonga, Samoa, French Polynesia and Fiji were completed in Oceania 1.

| Country | Done | Left | Commit |
|---|---|---|---|
| Micronesia | national/state penalty tables, recreational/hemp sections, PL 21-08 trafficking update, 2024 Ehsa case and 5 history entries | 1940s–1950s empty; Chuuk current code unverified | 7bd5b0c |
| Kiribati | possession/cultivation/sharing tables, recreational/hemp/black-market/arrests sections, 9 history entries | no aggregate arrest series; 2025 judgment primary text blocked | 634937a |
| Northern Mariana Islands | possession/cultivation/sharing/consumption tables, planting/visitors/driving/black-market/arrests, regulator transfer and 5 history entries | 1930s–1960s empty; ABTC authority unsettled | 4382c60 |
| Palau | Schedule II correction, possession/cultivation/sharing tables, hemp/planting/driving/black-market/arrests, 9 history entries | 1930s and 1960s empty | 7d53104 |
| Nauru | possession/cultivation tables, recreational/hemp/black-market/arrests, 7 history entries | 1970s–1990s empty; no aggregate arrest series | 02a6aea |

Palau validation: `profile-audit pw` zero errors/warnings; `country-gaps pw` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/pw/` and `/history/palau-thc-gummies-2026/`. The profile now follows 34 PNC: two ounces or less is a $500 citation, over two ounces up to a pound reaches one year, over a pound ten years, and cultivation or sale eight years. Marijuana is corrected to Schedule II, the gift carve-out is recorded, and the 2026 positive-test/field-sobriety changes are described without claiming a standalone cannabis-DUI offence.

Micronesia validation: `profile-audit fm` zero errors/warnings; `country-gaps fm` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/fm/`. The profile now distinguishes the national $50 small-possession fine from the state penalties, records the 2019 restoration of the import/export and 15-year trafficking tier, and uses the 2024 Ehsa mail-import case for current enforcement. Chuuk's current drug chapter remains unverified because the published text is a historical appendix.

Kiribati validation: `profile-audit ki` zero errors/warnings; `country-gaps ki` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/ki/`. The profile now records the 1948 Dangerous Drugs Ordinance's single penalty band for possession, cultivation, sale and gifts, the limited extract/tincture prescription route, and the 2025 Abatao and Takoronga raids plus the two-plant suspended sentence. The 2025 judgment itself was blocked, so its details come from a case summary.

Northern Mariana Islands validation: `profile-audit mp` zero errors/warnings; `country-gaps mp` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/mp/`. The profile now records the adult-use and medical limits, the over-limit and cultivation tiers, the open visitor rule with the federal transport bar, and the January 2026 transfer from the Cannabis Commission to ABTC. The statute still names the Commission, so the regulatory authority remains unsettled.

Nauru validation: `profile-audit nr` zero errors/warnings; `country-gaps nr` has no missing sections or tables and no uncited text; `npm test` passes 183/183; the targeted page build passed for `/country/nr/` and the page shows two tables. The profile now follows the 2024 Amendment Act: possession twelve months to three years with no fine, and cultivation, supply, use and import/export a minimum of ten years without parole or probation up to life. The 1970s–1990s remain empty because no Nauru-specific cannabis event was found.

## Batch validation

All five profiles pass `profile-audit` with zero errors and warnings. None has a missing standard or researched section or penalty table, and none has uncited or Wikipedia-only text. `npm test` passes 183 of 183. The final full build produced 5,360 pages, and `npm run seo:audit` checked 5,362 HTML files, 5,145 indexable pages and 236,204 internal links with no problems.

Remaining gaps: Micronesia still has empty 1940s–1950s history, its Chuuk drug chapter is unverified, and state amendments may be incomplete. Palau has empty 1930s and 1960s history and no verified standalone cannabis-DUI offence. Kiribati publishes no aggregate arrest series and the 2025 judgment text was blocked. The Northern Mariana Islands has empty 1930s–1960s history, and the ABTC transfer’s legal authority remains disputed while the statute still names the Commission. Nauru has empty 1970s–1990s history, no disaggregated arrest data, and an unresolved drug-driving penalty because the traffic penalty table is alcohol-specific. No new articles were written for these five countries.
