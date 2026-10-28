# Expansion batch, 28 October 2026 — Asia 7

Chosen from `country-gaps.cjs --rank 30 --region Asia`, skipping the countries expanded in Asia
1–6 and taking the highest-ranked profiles still unworked. The batch is Oman, Georgia, Laos,
Kuwait and Azerbaijan. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Oman | first restriction dated to 1974, production/medical corrections, verified seizures, life fields, 8 history entries | 1930s–1960s empty; no cannabis execution found | this commit |
| Georgia | 2022 seizure correction, 2024–26 crime figures, sharing additions, ancillary-rights text, 4 history entries | 1940s–1950s empty; 1934 still Wikipedia-based | this commit |
| Laos | 2026 prohibited-list caveat, mandatory life row, 2024–26 enforcement, arrest figures, 10 history entries | no cannabis-specific prosecution outcome; driving law not readable | this commit |
| Kuwait | products folded, black-market section, sharing/cultivation/consumption tables, 14 history entries | schedules unreadable; no retail price | this commit |
| Azerbaijan | 1934 primary source, 2022 threshold entry, driving/clubs/visitors/research fixes, 7 history entries | 1940s empty; no cannabis-specific enforcement series | this commit |

Laos validation: `profile-audit la` zero errors and warnings. The profile now marks the over-500 g THC/hashish penalty as mandatory life, treats under-5 g possession as a treatment route rather than an administrative fine, records the 21 October 2026 prohibited-narcotics resolution against the 2022 hemp decision, and adds the 2025 arrest figures and 2024–2026 Bolikhamxay seizures. Ten entries fill the 1930s and 1960s and extend coverage to 2026.

Kuwait validation: `profile-audit kw` zero errors and warnings. The profile folds products into medical, adds the missing black-market section and the sharing, cultivation and consumption tables, and records death or life for trafficking, mandatory death for listed aggravations, the residual article 48 offence and the 2025/2026 enforcement figures. Fourteen entries fill the 2010s and extend coverage to 2026.

Oman validation: `profile-audit om` zero errors and warnings. The unsupported 1925 estimate was removed and the 1974 Penal Code now carries the first score step; production is marked medical on the article 7 licensing route, the death-penalty text distinguishes trafficking from personal use, the seizure and arrest figures use verified sources, and the life/mandatory-life fields are encoded. Eight entries cover 2024–2026.

Georgia validation: `profile-audit ge` zero errors and warnings. The profile now adds the 20-year/life especially-large possession tier, the 2024–2026 drug-crime figures and prison population, the Article 260²/260⁴ sharing offences, the ancillary-rights consequences, deportation for visitors and the List I wording. The 2022 “3,017 kg” figure is explained as 212 kg of herb plus 2,805 plants. The April 2025 entry is dated and closed as unscored; four entries cover 1964–2026.

Azerbaijan validation: `profile-audit az` zero errors and warnings. The 1934 entry now uses the primary decree, the 2022 small-amount reform is recorded, driving moves from impairment to a positive-test trigger, clubs cite Article 238, visitors add expulsion and a research section is added. Seven entries cover 1958–2026; the 1940s remain empty.

## Result

All five countries were expanded and committed separately: Laos `023fee86`, Kuwait `f1af66e8`, Oman `bdf11a90`, Georgia `b716908a` and Azerbaijan `34c4d06e`. Each profile passes `profile-audit` with zero errors and warnings and has no missing standard or researched sections, penalty tables or inline citations. Targeted `build-pages.mjs` runs rendered each country and its changed history pages; `npm test` passes.

The batch added 43 history entries. It removed Oman's unsupported 1925 estimate and dated the first restriction to 1974, corrected Georgia's 2022 seizure figure and Kuwait's product/death-penalty structure, dated Georgia's April 2025 package, added Azerbaijan's 2022 threshold reform, and filled the missing Kuwait black-market and Laos 2026 prohibited-list context. The main score correction was Oman's first-restriction date; the current scores are unchanged.

The main open caveats are the empty 1930s–1960s in Oman, the empty 1940s–1950s in Georgia, the empty 1940s in Azerbaijan, Mongolia-style unsourced early history in Laos, and the lack of cannabis-specific prosecution series in Kuwait and Azerbaijan.
