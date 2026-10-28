# Expansion batch, 28 October 2026 — Asia 4

Chosen from `country-gaps.cjs --rank 20 --region Asia`. North Korea, Syria, Palestine,
Turkmenistan, Timor-Leste and Yemen were skipped for already-completed work or thin/inaccessible
primary sources. The batch is Indonesia, Malaysia, Sri Lanka, Thailand and Vietnam.

| Country | Done | Left | Commit |
|---|---|---|---|
| Indonesia | cultivation table, hemp and culture sections, citation conversion | 1930s–1960s still empty; Aceh 1924 entry still needs an article | this country commit |
| Malaysia | hemp/culture sections, citations, table terms, medical status corrected to none, 7 history entries | 1920s–1930s treaty application to Malaya not separately confirmed | this country commit |
| Sri Lanka | four penalty tables, hemp/culture/driving sections, citation and source rewrite, 7 history entries | 1940s still empty: the 1941 amendment text was not located | this country commit |
| Thailand | possession/cultivation tables, hemp/culture/driving sections, corrected possession offence and 30 g myth, 1991–2026 history | 1950s still empty | this country commit |
| Vietnam | in progress | | |

Indonesia validation: `profile-audit id` zero errors/warnings; `country-gaps id` has no missing standard or researched sections, no missing tables and no uncited text. The build was blocked by another contributor’s unfinished `articles/netherlands-five-grams-1996.md`; the profile was checked with the audit and will be rechecked in the next successful build.

Malaysia validation: `profile-audit my` zero errors/warnings; `country-gaps my` has no missing sections or tables, no uncited text and no empty decades; the 5,117-page build passed and the history entries and corrected medical text are in `dist/country/my/`. The medical status changed from limited to none because no cannabis medicine is registered, not because the import authorisation was repealed.

Sri Lanka validation: `profile-audit lk` zero errors/warnings; `country-gaps lk` has no missing sections, no missing tables and no Wikipedia-only text; the 5,125-page build passed and the page shows four penalty tables. The 1929 Ordinance text replaced the Wikipedia and FAOLEX citations. The 1940s remain empty because Ordinance No. 14 of 1941 is listed among the amendments but its text and effect could not be found.
