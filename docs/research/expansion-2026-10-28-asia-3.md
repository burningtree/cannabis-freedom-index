# Expansion batch, 28 October 2026 — Asia 3

Chosen from `country-gaps.cjs --rank 25 --region Asia`. North Korea, Syria, Palestine,
Turkmenistan and Timor-Leste were skipped: North Korea was already expanded, and the other four
have thin or inaccessible primary sources for the remaining gaps. The batch is China, Oman,
Kyrgyzstan, Saudi Arabia and Bangladesh.

| Country | Done | Left | Commit |
|---|---|---|---|
| China | hemp and arrests sections, culture links to all seven atlas entries, citations throughout, production corrected to hemp | 1940s–1960s still empty; no cannabis-specific arrest series | 66ac6c6 |
| Oman | four tables including the new Article 41(3) tier; black-market and arrests sections; 2005 UNTOC history | 1930s–1960s still empty; no cannabis-specific arrest series | b7056b0, 1b0fd3f |
| Kyrgyzstan | possession, cultivation, supply and use tables; recreational, hemp, culture and impairment-driving sections; products folded; 1944–2026 history | 1970s still empty | e0f394c, f8db9d1 |
| Saudi Arabia | Article 39 tier, cultivation table, hemp/CBD, driving, black-market and arrests sections; 1946–2026 history; 1987 article | optional culture/research/spotlights/genetics | 93c16c8, this article commit |
| Bangladesh | Class A hashish tiers, hemp, arrests, culture links, full citations; 1922/1947/1965 history entries | 1980s ban-date conflict noted but not resolved | b29309c |

China validation: `profile-audit cn` zero errors/warnings; `country-gaps cn` has no missing standard or researched sections, no missing tables and no uncited text. The build passed at 5,073 pages and the profile renders with no raw citation marks.

Kyrgyzstan validation: `profile-audit kg` zero errors/warnings; `country-gaps kg` has no missing standard or researched sections, no missing tables and no uncited text. The build passed at 5,076 pages.


## Batch totals

| Country | Tables added or expanded | New history | New articles |
|---|---:|---:|---:|
| China | 0 (tables checked) | 0 | 0 |
| Oman | 4 | 1 | 0 |
| Kyrgyzstan | 4 | 7 | 0 |
| Saudi Arabia | 3 | 4 | 1 |
| Bangladesh | 2 | 3 | 0 |
| **Total** | **13** | **15** | **1** |

Final validation: `profile-audit` on all five reported zero errors and warnings; history tests pass 47/47; the build passed at **5,099 pages**; all five country pages render with no raw citation marks. Remaining gaps are the early empty decades (China 1940s–1960s, Kyrgyzstan 1970s, Oman 1930s–1960s), the optional culture/research/spotlights/genetics sections, and Oman’s 1925 first-restriction estimate, which has no article because it is an estimate rather than a dated instrument.
