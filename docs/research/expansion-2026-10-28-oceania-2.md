# Expansion batch, 28 October 2026 — Oceania 2

Chosen from `country-gaps.cjs --rank 20 --region Oceania`. The batch is Micronesia, Kiribati,
the Northern Mariana Islands, Palau and Nauru. They are the next five Pacific jurisdictions by gap
rank; Guam, Tonga, Samoa, French Polynesia and Fiji were completed in Oceania 1.

| Country | Done | Left | Commit |
|---|---|---|---|
| Micronesia | national/state penalty tables, recreational/hemp sections, PL 21-08 trafficking update, 2024 Ehsa case and 5 history entries | 1940s–1950s empty; Chuuk current code unverified | this commit |
| Kiribati | possession/cultivation/sharing tables, recreational/hemp/black-market/arrests sections, 9 history entries | no aggregate arrest series; 2025 judgment primary text blocked | this commit |
| Northern Mariana Islands | in progress | | |
| Palau | Schedule II correction, possession/cultivation/sharing tables, hemp/planting/driving/black-market/arrests, 9 history entries | 1930s and 1960s empty | this commit |
| Nauru | in progress | | |

Palau validation: `profile-audit pw` zero errors/warnings; `country-gaps pw` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/pw/` and `/history/palau-thc-gummies-2026/`. The profile now follows 34 PNC: two ounces or less is a $500 citation, over two ounces up to a pound reaches one year, over a pound ten years, and cultivation or sale eight years. Marijuana is corrected to Schedule II, the gift carve-out is recorded, and the 2026 positive-test/field-sobriety changes are described without claiming a standalone cannabis-DUI offence.

Micronesia validation: `profile-audit fm` zero errors/warnings; `country-gaps fm` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/fm/`. The profile now distinguishes the national $50 small-possession fine from the state penalties, records the 2019 restoration of the import/export and 15-year trafficking tier, and uses the 2024 Ehsa mail-import case for current enforcement. Chuuk's current drug chapter remains unverified because the published text is a historical appendix.

Kiribati validation: `profile-audit ki` zero errors/warnings; `country-gaps ki` has no missing sections or tables and no uncited text; the targeted page build passed for `/country/ki/`. The profile now records the 1948 Dangerous Drugs Ordinance's single penalty band for possession, cultivation, sale and gifts, the limited extract/tincture prescription route, and the 2025 Abatao and Takoronga raids plus the two-plant suspended sentence. The 2025 judgment itself was blocked, so its details come from a case summary.
