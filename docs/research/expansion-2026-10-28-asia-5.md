# Expansion batch, 28 October 2026 — Asia 5

Chosen from `country-gaps.cjs --rank 25 --region Asia`. North Korea, Syria, Palestine,
Turkmenistan, Timor-Leste and Yemen were skipped again for thin or inaccessible primary sources.
The batch is Mongolia, Lebanon, Bhutan, Jordan and the United Arab Emirates.

| Country | Done | Left | Commit |
|---|---|---|---|
| Mongolia | in progress | | |
| Lebanon | in progress | | |
| Bhutan | in progress | | |
| Jordan | hemp section, products folded, possession/cultivation/sharing tables, corrected arrest figures, 1940s/2000s history and 2024–2026 entries | 1925 first-restriction estimate still unsupported; 2003 gazette day uncertain | this commit |
| United Arab Emirates | hemp section, products folded, possession/cultivation/sharing tables, port-fine tiers, black market and arrests, 4 history entries, corrected deportation and 2021 penalties | no cannabis-only seizure series; high-THC medical cannabis remains illegal | this commit |

UAE validation: `profile-audit ae` zero errors/warnings; `country-gaps ae` has no missing sections or tables and no uncited text; `history:test` passes 47/47; the 5,143-page build passed and the page shows three tables and the 1969–2026 entries.

Jordan validation: `profile-audit jo` zero errors/warnings; `country-gaps jo` has no missing sections or tables and no uncited text; `history:test` passes 47/47; the build passed and the page shows three tables. The arrests text and the 2025 history entry now use the Public Security Directorate's like-for-like crime series instead of the NCHR comparison that mixed crimes with people.
