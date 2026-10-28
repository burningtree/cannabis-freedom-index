# Expansion batch, 28 October 2026 — Asia 6

Chosen from `country-gaps.cjs --rank 25 --region Asia`. The batch stays in South-East Asia:
Laos, Myanmar, Cambodia, the Philippines and Brunei. The higher-ranked North Korea, Syria,
Palestine, Turkmenistan, Timor-Leste and Yemen remain skipped for thin or inaccessible primary
sources, and India is held for a separate country pass because of its size and state-level law.

| Country | Done | Left | Commit |
|---|---|---|---|
| Laos | cultivation table, driving/culture sections, full sale tiers, updated enforcement and black market, 8 history entries | 1930s and 1960s empty; 2020 hemp permission not aligned with the criminal law | this commit |
| Myanmar | hemp/driving/arrests sections, citations, corrected cultivation maximum, 5 history entries | no culture atlas or words; 2018 amendment text not opened | this commit |
| Cambodia | rebuilt on the 2012 Law on Drug Control, four penalty tables, hemp/culture/driving sections, 5 history entries | 1970s and 1980s still empty: the CIA and IUCN sources were blocked | this commit |
| Philippines | hemp section, CBD Schedule 4 nuance, citations, 2020 CBD and 2024 reclassification entries | no industrial-hemp regime; 2026 medical bill still pending | this commit |
| Brunei | four penalty tables, hemp/arrests sections, corrected Class A and 1992 dates, removed the meth-only 2002 entry, 5 history entries | no cannabis-specific arrest series; pure CBD isolate status unresolved | this commit |

Brunei validation: `profile-audit bn` zero errors/warnings; `country-gaps bn` has no missing sections or tables and no empty decades; `npm test` passes 179/179; the 5,193-page build passed and the page shows four tables. The profile now follows the 2013 revised Misuse of Drugs Act: simple possession and consumption up to ten years and B$20,000, cultivation three to twenty years, and mandatory death above 500 g of cannabis or 200 g of resin for trafficking. The 2012 Class A order replaced the 2013 date, the meth-only 2002 entry was removed, and the 1992 threshold is flagged as historical.

Cambodia validation: `profile-audit kh` zero errors/warnings; `country-gaps kh` has no missing sections or tables and no uncited text; `npm test` passes 179/179; the page shows four tables. The profile now follows the 2012 Law on Drug Control, not the repealed 1996/2005 law, with the article 40 possession and sale tiers and the narrower article 45 consumption offence. The 1970s and 1980s remain empty because the CIA briefing paper and IUCN report could not be opened.

Myanmar validation: `profile-audit mm` zero errors/warnings; `country-gaps mm` has no missing sections or tables, no uncited text and no empty decades; `npm test` passes 179/179; the page shows three tables. The profile now uses the 1993 law as amended in 2018 and 2025: possession and cultivation five to ten years, sale ten years to life, and production/import-export fifteen years to life or death. The 2019 Mandalay hemp prosecution supplies the hemp/CBD example. The 2018 amendment text was not opened, so its details rest on TNI and the 2025 amendment.

Laos validation: `profile-audit la` zero errors/warnings; `country-gaps la` has no missing sections or tables and no uncited text; the profile-claims suite passes 83/83. The full `npm run build` was blocked by another contributor’s `countries/co.yaml` history citations and `culture/language/assassin.md`, so the Laos page could not be inspected in a successful build yet. The profile now follows Penal Code articles 318 and 320, with the 3 kg cultivation floor and the 0.3 g THC ladder, and uses `driving.status: unknown` because the 2012 Road Traffic Law was not readable.

Philippines validation: `profile-audit ph` zero errors/warnings; `country-gaps ph` has no missing sections or tables and no uncited text; the profile-claims suite passes 83/83. The full build was still blocked by the other contributors' `countries/co.yaml` and `culture/language/assassin.md`, so the page was not inspected in a successful build. The profile now records the 0.1% THC CBD Schedule 4 listing without presenting it as a consumer or hemp route, and keeps the 2026 medical bill as pending.
