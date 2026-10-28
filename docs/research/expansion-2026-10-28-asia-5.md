# Expansion batch, 28 October 2026 — Asia 5

Chosen from `country-gaps.cjs --rank 25 --region Asia`. North Korea, Syria, Palestine,
Turkmenistan, Timor-Leste and Yemen were skipped again for thin or inaccessible primary sources.
The batch is Mongolia, Lebanon, Bhutan, Jordan and the United Arab Emirates.

| Country | Done | Left | Commit |
|---|---|---|---|
| Mongolia | in progress | | |
| Lebanon | rebuilt on Law 673 and Law 178, four penalty tables, hemp/culture/driving/arrests sections, 7 history entries | no cultivation licence by August 2026; fines eroded by currency collapse | this commit |
| Bhutan | possession/cultivation/sharing tables, hemp/planting/driving/arrests sections, corrected sections and thresholds, 8 history entries; 1925 estimate replaced by the 2004 Penal Code | 1930s–1970s empty; 2018 amendment commencement unknown | this commit |
| Jordan | hemp section, products folded, possession/cultivation/sharing tables, corrected arrest figures, 1940s/2000s history and 2024–2026 entries | 1925 first-restriction estimate still unsupported; 2003 gazette day uncertain | this commit |
| United Arab Emirates | hemp section, products folded, possession/cultivation/sharing tables, port-fine tiers, black market and arrests, 4 history entries, corrected deportation and 2021 penalties | no cannabis-only seizure series; high-THC medical cannabis remains illegal | this commit |

UAE validation: `profile-audit ae` zero errors/warnings; `country-gaps ae` has no missing sections or tables and no uncited text; `history:test` passes 47/47; the 5,143-page build passed and the page shows three tables and the 1969–2026 entries.

Jordan validation: `profile-audit jo` zero errors/warnings; `country-gaps jo` has no missing sections or tables and no uncited text; `history:test` passes 47/47; the build passed and the page shows three tables. The arrests text and the 2025 history entry now use the Public Security Directorate's like-for-like crime series instead of the NCHR comparison that mixed crimes with people.

Bhutan validation: `profile-audit bt` zero errors/warnings; `country-gaps bt` has no missing sections or tables and no uncited text; `npm test` passes 179/179; the 5,160-page build passed and the page shows three tables. The profile now uses the 2015/2018 Act's sections 131–134 and Schedule VII thresholds (50 g herbal, 7 g hashish, 3 ml oil, five plants), replacing the mistaken 7 g herbal figure and section 137 citation. The first recorded restriction is now the 2004 Penal Code rather than the unsupported 1925 estimate; the 1930s–1970s remain empty for lack of any cannabis-specific event.

Lebanon validation: `profile-audit lb` zero errors/warnings; `country-gaps lb` has no missing sections or tables, no uncited text and no empty decades; `history:test` passes 47/47. The profile now follows Law 673's article 127 personal-use penalty and the article 125/126 life sentence for other possession and supply, and explains that Law 178 licensed production without creating patient access. The 1951, 1970 and 1984 entries come from JIED's citations to contemporaneous press; the original newspaper pages were not opened.
