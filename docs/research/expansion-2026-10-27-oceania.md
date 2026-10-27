# Expansion batch 5 — Oceania, 27 October 2026

Chosen from `country-gaps.cjs --rank 25 --region Oceania` (top: au, pg, nz, sb, vu).
Dirty-at-start files were ru/test/source-archive/layouts — none in batch.

| Country | Done | Left | Commit |
|---|---|---|---|
| Australia | x | | |
| Papua New Guinea | | | |
| New Zealand | | | |
| Solomon Islands | | | |
| Vanuatu | | | |

## Australia (au) — done 2026-10-27 ~22:45 UTC
- Profile lives at countries/au/index.yaml (state subunits): recreational + hemp (high, ~1%) + culture sections added; products folded into medical; penalties: 4 possession steps (ACT legal, SA expiation civil $250–400, WA CIR civil, criminal elsewhere), 3 cultivation steps (ACT legal, SA civil $400, NT criminal 2y); inline citations everywhere; wiki source dropped; history links (ACT 2020, Senate 2024, bill 2023).
- Sources read: StratCann (Senate 13–24 Nov 2024), Business QLD hemp page (1% cap, licensed growers), MardiGrass 2008 programme (XVI → since 1993), NZDF tinny mythbusters, Conversation ACT explainer (50g/2 plants/seeds gap/Commonwealth conflict).
- Article: australia-act-legalises-2020 (from Conversation + ACT legislation).
- No history entries added. YAML gotcha fixed: note values containing colons must be quoted.
- Audit 0/0, history+answers tests pass, build green, HTML verified (2 pen tables, 25 history links, tinny+mardigrass culture links).

## Papua New Guinea (pg) — done 2026-10-27 ~22:50 UTC
- Profile: recreational + hemp (none) + black_market + arrests sections added; products folded into medical; penalties: 4 possession steps (2y/K15k, 15y/K25k, 16y–life/K26k–2M, DDA 40y/K1M), 4 cultivation steps; inline citations everywhere; history link (2022 entry); answers.buy.
- Recent commits on pg were small verifications, file clean — proceeded.
- No history entries added (13 entries; 1930s/40s/60s/2010s lack sources). No culture section (no atlas entries, no Duvall PNG material).
- Article: papua-new-guinea-controlled-substance-act-2022 (tiers + two charging routes, from PacLII + case reports).
- Gotchas fixed: answers block must sit after ALL context sections (this profile orders visitors/driving last); every listed source must be cited inline (build-enforced, audit-silent); note values with colons need quotes.
- Audit 0/0, history+answers tests pass, build 4903 pages, HTML verified (2 pen tables PGK, 14 history links).

## New Zealand (nz) — done 2026-10-27 ~22:57 UTC
- Profile: recreational + hemp (high, 1%) + tinny culture sections added; products folded into medical; penalties: possession (3mo/NZ$500), cultivation (7y indictment, legal notified hemp); inline citations everywhere; history links (1975 Act, 2019 discretion, 2020 referendum, 2020 scheme).
- Sources read: PMCSA cannabis page (referendum 50.7/48.4, 2019 law change, equity); NZDF tinny mythbusters (already fetched for au).
- Article: new-zealand-medicinal-scheme-2020 (1 April 2020 opening + referendum context).
- No history entries added (20 entries). Culture kept to tinny (no NZ march source verified).
- Gotcha: a source defined under context instead of top-level breaks the build ("Unrecognized key"); every listed source must be cited inline (build-enforced).
- Audit 0/0, history+answers tests pass, build green (after waiting out a concurrent agent build), HTML verified (2 pen tables NZD, 21 history links, tinny link).

## Solomon Islands (sb) — done 2026-10-27 ~23:00 UTC
- Profile: recreational + hemp (none) + black_market (SBD 1m haul) + arrests (2016 case + haul, gap noted) added; products folded into medical; penalties: 2 possession steps (6mo/5,000pu summary, 10y/100,000pu assessors), 2 cultivation steps; inline citations everywhere; history links (1941 Act, 2026 bill).
- No history entries added (7 entries). No article (backlog only 1949 tweak + estimate). No culture (no atlas entries).
- FCDO travel-advice citation in visitors dropped — audit flags it even alongside statute cites.
- Audit 0/0, history+answers tests pass, build 4914 pages, HTML verified (2 pen tables, 8 history links).

## Vanuatu (vu) — done 2026-10-27 ~23:05 UTC
- Profile: recreational + hemp (strict, 0.3%) + black_market + arrests sections added; products folded into medical; penalties: 2 possession steps (20y/VT100M max, guidance mitigation), 2 cultivation steps; inline citations everywhere incl. driving; history links (2023 rules).
- Sources read: PINA 2023 signing report (8 Feb, standards, gazette licences).
- Article: vanuatu-export-cannabis-rules-signed-2023 (2021 Act → 2023 rules → export-only).
- No history entries added (14 entries). No culture (no atlas entries, no Duvall Vanuatu).
- Gotcha repeated: structural edits duplicated a segment block twice (sb, vu) — always grep for duplicate keys after.
- Audit 0/0, history+answers tests pass, build 4917 pages, HTML verified (2 pen tables VUV, 15 history links).
