# Expansion batch, 28 October 2026 — Asia 4

Chosen from `country-gaps.cjs --rank 20 --region Asia`. North Korea, Syria, Palestine,
Turkmenistan, Timor-Leste and Yemen were skipped for already-completed work or thin/inaccessible
primary sources. The batch is Indonesia, Malaysia, Sri Lanka, Thailand and Vietnam.

| Country | Done | Left | Commit |
|---|---|---|---|
| Indonesia | cultivation table, hemp and culture sections, citation conversion | 1930s–1960s still empty; Aceh 1924 entry still needs an article | b3b1afa |
| Malaysia | hemp/culture sections, citations, table terms, medical status corrected to none, 7 history entries, sourced consequences | 1920s–1930s treaty application to Malaya not separately confirmed | 0ce3054, 0abf530 |
| Sri Lanka | four penalty tables, hemp/culture/driving sections, citation and source rewrite, 7 history entries | 1940s still empty: the 1941 amendment text was not located | b7fdb13 |
| Thailand | possession/cultivation tables, hemp/culture/driving sections, corrected possession offence and 30 g myth, 1991–2026 history | 1950s still empty | 5c964c5 |
| Vietnam | possession/cultivation/sharing/consumption tables, hemp/culture/arrests sections, 5 history entries and 2025–2026 law updates | 2009 decriminalisation still has no article; Hmong hemp has no statutory route | 13545ec |

Indonesia validation: `profile-audit id` zero errors/warnings; `country-gaps id` has no missing standard or researched sections, no missing tables and no uncited text. An earlier build was blocked by another contributor’s unfinished article; the final 5,131-page build passed and the Indonesia page was checked in `dist/country/id/`.

Malaysia validation: `profile-audit my` zero errors/warnings; `country-gaps my` has no missing sections or tables, no uncited text and no empty decades; the 5,117-page build passed and the history entries and corrected medical text are in `dist/country/my/`. The medical status changed from limited to none because no cannabis medicine is registered, not because the import authorisation was repealed.

Sri Lanka validation: `profile-audit lk` zero errors/warnings; `country-gaps lk` has no missing sections, no missing tables and no Wikipedia-only text; the 5,125-page build passed and the page shows four penalty tables. The 1929 Ordinance text replaced the Wikipedia and FAOLEX citations. The 1940s remain empty because Ordinance No. 14 of 1941 is listed among the amendments but its text and effect could not be found.

Thailand validation: `profile-audit th` zero errors/warnings; `country-gaps th` has no missing sections or tables and no uncited text; the history test passed, the 5,107-page build at the time passed and the prescription, tables and 2026 entries were checked in `dist/country/th/`.

Vietnam validation: `profile-audit vn` zero errors/warnings; `country-gaps vn` has no missing sections, no missing tables, no uncited text and no empty decades; the 5,130-page build passed and the page shows four penalty tables. The profile now follows Law 86/2025 from 1 July 2025 and Law 120/2025 from 1 July 2026, with the full possession and sale tiers rather than only the first and last bands.

## Batch validation

All five profiles pass `profile-audit` with zero errors and zero warnings. None has a missing standard or researched section or a missing penalty table, and none has uncited or Wikipedia-only text; Malaysia's consequences section was the last Wikipedia-only text and was rewritten from the Dangerous Drugs Act. `npm run history:test` passes 47 of 47. The final `npm run build` produced 5,131 pages, and `npm run seo:audit` checked 5,133 HTML files, 4,916 indexable pages and 227,245 internal links with no problems.

Remaining work, none of it blocking: Indonesia still has empty 1930s–1960s history and no article for the 1924 Aceh entry; Malaysia's 1920s and 1930s treaty entries do not confirm separate application to Malaya; Sri Lanka's 1940s are empty because the 1941 amendment text was not found; Thailand's 1950s are empty; and Vietnam's 2009 decriminalisation still has no article. Optional spotlights and genetics sections were not written for any of the five.
