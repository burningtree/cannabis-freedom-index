# Expansion batch, 28 October 2026 — Asia 7

Chosen from `country-gaps.cjs --rank 30 --region Asia`, skipping the countries expanded in Asia
1–6 and taking the highest-ranked profiles still unworked. The batch is Oman, Georgia, Laos,
Kuwait and Azerbaijan. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Oman | first restriction dated to 1974, production/medical corrections, verified seizures, life fields, 8 history entries | 1930s–1960s empty; no cannabis execution found | this commit |
| Georgia | in progress | | |
| Laos | 2026 prohibited-list caveat, mandatory life row, 2024–26 enforcement, arrest figures, 10 history entries | no cannabis-specific prosecution outcome; driving law not readable | this commit |
| Kuwait | products folded, black-market section, sharing/cultivation/consumption tables, 14 history entries | schedules unreadable; no retail price | this commit |
| Azerbaijan | in progress | | |

Laos validation: `profile-audit la` zero errors and warnings. The profile now marks the over-500 g THC/hashish penalty as mandatory life, treats under-5 g possession as a treatment route rather than an administrative fine, records the 21 October 2026 prohibited-narcotics resolution against the 2022 hemp decision, and adds the 2025 arrest figures and 2024–2026 Bolikhamxay seizures. Ten entries fill the 1930s and 1960s and extend coverage to 2026.

Kuwait validation: `profile-audit kw` zero errors and warnings. The profile folds products into medical, adds the missing black-market section and the sharing, cultivation and consumption tables, and records death or life for trafficking, mandatory death for listed aggravations, the residual article 48 offence and the 2025/2026 enforcement figures. Fourteen entries fill the 2010s and extend coverage to 2026.

Oman validation: `profile-audit om` zero errors and warnings. The unsupported 1925 estimate was removed and the 1974 Penal Code now carries the first score step; production is marked medical on the article 7 licensing route, the death-penalty text distinguishes trafficking from personal use, the seizure and arrest figures use verified sources, and the life/mandatory-life fields are encoded. Eight entries cover 2024–2026.
