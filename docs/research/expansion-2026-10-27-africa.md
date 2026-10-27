# Expansion batch 6 — Africa, 27 October 2026

Chosen from `country-gaps.cjs --rank 25 --region Africa` (top feasible: eg, et, lr, cg, gh;
skipped Eritrea — closed state, no source base — and busy files).
Dirty-at-start files were lt + test + source-archive (none in batch).

| Country | Done | Left | Commit |
|---|---|---|---|
| Egypt | x | | |
| Ethiopia | x | | |
| Liberia | | | |
| Congo | | | |
| Ghana | | | |

## Egypt (eg) — done 2026-10-27 ~23:12 UTC
- Profile: hemp (none) + arrests + culture (TNI/Soueif-verified hashish bans) added; products folded into medical; penalties: possession 1–3y step, cultivation note-step (life/death), 3 sharing steps with death:true + EGP fines; inline citations everywhere; history links (1960, 1884, 1868, Russell 1930).
- Primary law read: Law 182/1960 French text + explanatory note (arts 33–39, sanatorium art 37); parl24 Arabic 2024 tariff summary (arts 33–35, 100–500k/50–200k pounds).
- Article: egypt-law-182-1960 (1960 structure + 1989 hardening).
- No history entries added (31 entries). Culture kept to TNI/Soueif-verified claims; Russell sentence dropped for lack of a readable source (entry + atlas links remain).
- Gotcha: sections vs context — arrests belongs to context; a source cited but unlisted breaks the build.
- Audit 0/0, history+answers tests pass, build green, HTML verified (3 pen tables incl. death step, 32 history links).

## Ethiopia (et) — done 2026-10-27 ~23:30 UTC
- Profile: hemp + planting + black_market + arrests context added; penalty `term:` fields on all 7 steps; inline citations throughout segments + medical/visitors/driving/clubs; production one-liner expanded; culture links rastafari-sacrament atlas entry; visitors warn on medical-cannabis entry (ZennJet RED 2025).
- New sources: New Business Ethiopia customs seizures Mar 2026 (486.3M Birr week, narcotics in transit + border towns, 17 suspects/10 vehicles) for black_market/arrests; ZennJet RED guide for hemp-as-illicit + visitors.
- Article: ethiopia-criminal-code-2005 (personal-use/trafficking split, matches existing history id — no changes.yaml edit needed; Japan agent held changes.yaml).
- No history entries added (15 entries, 2005 + Shashamane 1965 already committed). Deferred gaps: 1920s/30s/70s/80s/2020s decades, nothing since 2019.
- Gotcha: history test requires every listed section source to be cited inline (medical leaf); driving checker wants each sentence cited.
- Audit 0/0, history 47 pass / answers 93 pass. Build + HTML verify pending (Japan agent building).
