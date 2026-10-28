# Expansion batch, 28 October 2026 — Asia 6

Chosen from `country-gaps.cjs --rank 25 --region Asia`. The batch stays in South-East Asia:
Laos, Myanmar, Cambodia, the Philippines and Brunei. The higher-ranked North Korea, Syria,
Palestine, Turkmenistan, Timor-Leste and Yemen remain skipped for thin or inaccessible primary
sources, and India is held for a separate country pass because of its size and state-level law.

| Country | Done | Left | Commit |
|---|---|---|---|
| Laos | in progress | | |
| Myanmar | in progress | | |
| Cambodia | rebuilt on the 2012 Law on Drug Control, four penalty tables, hemp/culture/driving sections, 5 history entries | 1970s and 1980s still empty: the CIA and IUCN sources were blocked | this commit |
| Philippines | in progress | | |
| Brunei | four penalty tables, hemp/arrests sections, corrected Class A and 1992 dates, removed the meth-only 2002 entry, 5 history entries | no cannabis-specific arrest series; pure CBD isolate status unresolved | this commit |

Brunei validation: `profile-audit bn` zero errors/warnings; `country-gaps bn` has no missing sections or tables and no empty decades; `npm test` passes 179/179; the 5,193-page build passed and the page shows four tables. The profile now follows the 2013 revised Misuse of Drugs Act: simple possession and consumption up to ten years and B$20,000, cultivation three to twenty years, and mandatory death above 500 g of cannabis or 200 g of resin for trafficking. The 2012 Class A order replaced the 2013 date, the meth-only 2002 entry was removed, and the 1992 threshold is flagged as historical.

Cambodia validation: `profile-audit kh` zero errors/warnings; `country-gaps kh` has no missing sections or tables and no uncited text; `npm test` passes 179/179; the page shows four tables. The profile now follows the 2012 Law on Drug Control, not the repealed 1996/2005 law, with the article 40 possession and sale tiers and the narrower article 45 consumption offence. The 1970s and 1980s remain empty because the CIA briefing paper and IUCN report could not be opened.
