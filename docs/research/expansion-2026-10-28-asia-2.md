# Expansion batch, 28 October 2026 — Asia 2

Chosen from `country-gaps.cjs --rank 25 --region Asia`. North Korea was already expanded in
`7b99f80`; Syria, Palestine, Turkmenistan and Timor-Leste were skipped for thin or inaccessible
sources. The batch is Israel, Pakistan, Iraq, Armenia, Afghanistan and Nepal.

| Country | Done | Left | Commit |
|---|---|---|---|
| Nepal | hemp, planting, driving and culture sections; citations converted; six atlas entries linked | 1920s–1950s and 2000s still empty; driving status left unverified | e280ebc |
| Afghanistan | four tables from the 2010 law, hemp/planting/driving/arrests sections, culture links, 2023 ban article | 1930s, 1940s and 1980s still empty; Taliban penalties not codified | this country commit |
| Pakistan | expanded possession, cultivation and trafficking tables; hemp, medical, black-market, arrests and culture sections; 2022 penalty-table article | 1920s and 2000s still empty; no 2024–2026 arrest figures | this country commit |
| Israel | four tables; 15 g administrative line; zero-fine practice; medical 2024–2026; hemp/CBD; culture; 11 history entries; 3 articles | optional research/spotlights/genetics; 1985 directive still thinly sourced | this country commit |
| Pakistan | in progress | | |
| Iraq | in progress | | |
| Armenia | in progress | | |

Nepal validation: `profile-audit np` zero errors/warnings; `country-gaps np` now has no missing standard or researched sections and no uncited text. The build passed at 5,012 pages and the culture links render. The possession table was also corrected to give minimum fines and the law’s own terms.

Afghanistan validation: `profile-audit af` zero errors/warnings; `country-gaps af` now has no missing standard or researched sections, no uncited text and all five atlas entries linked. The tables record the last codified 2010 scale, with a note that Taliban courts now apply sharia. The build passed at 5,015 pages and the 2023 ban article renders.

Pakistan validation: `profile-audit pk` zero errors/warnings; `country-gaps pk` now has no missing standard or researched sections, no uncited text and all five atlas entries linked. The build passed at 5,019 pages; the 2022 penalty-table article renders.

Israel validation: `profile-audit il` zero errors/warnings; `country-gaps il` has no empty decades, no missing sections and no scored entry without an article. History tests pass 47/47. The build passed at 5,041 pages; the profile and three article pages render with no raw citation marks. The build was briefly blocked by another contributor’s unfinished `countries/it.yaml`, which cleared without changes from this batch.
