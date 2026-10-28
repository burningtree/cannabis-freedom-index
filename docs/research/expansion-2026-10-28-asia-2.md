# Expansion batch, 28 October 2026 — Asia 2

Chosen from `country-gaps.cjs --rank 25 --region Asia`. North Korea was already expanded in
`7b99f80`; Syria, Palestine, Turkmenistan and Timor-Leste were skipped for thin or inaccessible
sources. The batch is Israel, Pakistan, Iraq, Armenia, Afghanistan and Nepal.

| Country | Done | Left | Commit |
|---|---|---|---|
| Nepal | hemp, planting, driving and culture sections; citations converted; six atlas entries linked | 1920s–1950s and 2000s still empty; driving status left unverified | e280ebc |
| Afghanistan | four tables from the 2010 law, hemp/planting/driving/arrests sections, culture links, 2023 ban article | 1930s, 1940s and 1980s still empty; Taliban penalties not codified | 978dbe2 |
| Pakistan | full federal tables, hemp/medical/black-market/arrests and culture sections, 2022 article, 1925–2026 history and 2024 data | provincial tables vary; no single 2025 arrest total | b73e700, 36fea39, 357ef34 |
| Israel | four tables; 15 g administrative line; zero-fine practice; 2024–2026 medical; hemp/CBD; culture; 11 history entries; 3 articles | optional research/spotlights/genetics; 1985 directive still thinly sourced | 07aa706 |
| Armenia | four tables with 2026 fines; hemp, culture and consequences; 1969–2026 history; 3 articles | 1920s, 1940s and 1950s empty | 206afe6, 357ef34 |
| Iraq | four tables from the 2017 law; death-penalty, hemp, planting, driving, black-market and arrests sections; 1988–2026 history | optional culture/research/spotlights/genetics | edc8ab8, 357ef34 |

Nepal validation: `profile-audit np` zero errors/warnings; `country-gaps np` now has no missing standard or researched sections and no uncited text. The build passed at 5,012 pages and the culture links render. The possession table was also corrected to give minimum fines and the law’s own terms.

Afghanistan validation: `profile-audit af` zero errors/warnings; `country-gaps af` now has no missing standard or researched sections, no uncited text and all five atlas entries linked. The tables record the last codified 2010 scale, with a note that Taliban courts now apply sharia. The build passed at 5,015 pages and the 2023 ban article renders.

Pakistan validation: `profile-audit pk` zero errors/warnings; `country-gaps pk` now has no missing standard or researched sections, no uncited text and all five atlas entries linked. The build passed at 5,019 pages; the 2022 penalty-table article renders.

Israel validation: `profile-audit il` zero errors/warnings; `country-gaps il` has no empty decades, no missing sections and no scored entry without an article. History tests pass 47/47. The build passed at 5,041 pages; the profile and three article pages render with no raw citation marks.


## Batch totals

| Country | New or expanded tables | New history | New articles |
|---|---:|---:|---:|
| Nepal | tables checked | 0 | 0 |
| Afghanistan | 4 | 0 | 1 |
| Pakistan | 3 | 9 | 1 |
| Israel | 4 | 11 | 3 |
| Armenia | 4 | 6 | 3 |
| Iraq | 4 | 5 | 0 |
| **Total** | **19** | **31** | **8** |

All six profiles now have no missing standard or researched sections, no missing penalty tables, no uncited text and no scored entry without an article. The empty early decades that remain are Nepal (1920s–1950s, 2000s), Afghanistan (1930s, 1940s, 1980s) and Armenia (1920s, 1940s, 1950s).

Final validation: `profile-audit` on all six reported zero errors and warnings; history tests pass 47/47; answer/profile claims tests pass 93/93; the build passed at **5,070 pages**; the SEO audit checked **5,072 HTML files and 221,683 internal links** with no problems. The Kazakhstan production status was restored to `medical` after the profile-claims regression test, with the licensed research and Article 18 medicine route made explicit.
