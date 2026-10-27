# Expansion batch 7 — Europe, 27 October 2026

Chosen from `country-gaps.cjs --rank 25 --region Europe` (top feasible: si, al, xk, mt, ee;
skipped Transnistria — breakaway state, thin source base).
Dirty-at-start files were ir.yaml + source-archive (not in batch).

| Country | Done | Left | Commit |
|---|---|---|---|
| Slovenia | x | | |
| Albania | x | | |
| Kosovo | x | | |
| Malta | | | |
| Estonia | | | |

## Slovenia (si) — done 2026-10-27 ~23:00 UTC
- Profile: hemp (standard) + culture (Metelkova) sections added; products folded (flower/preparations into medical, low-THC products into hemp) and deleted; possession civil table (€41.73–208.65, no prison) + cultivation table (unlicensed 1–10y Art 186, legal licensed step); inline citations everywhere; history links (referendum, personal-use bill, medical law).
- New/verified sources: KZ-1 Art 186 tariff 1–10y verified via BWC-implementation English PDF (policija.si unreachable; kept original kz1 key + added kz1bwc); BoC referendum figures 51.57/66.71 verified; TRIS draft notification 30 Jul 2025 verified via PDF.
- Article: slovenia-referendum-2024 (two questions, majorities, medical law + personal-use bill aftermath, what the vote did not do).
- Gaps closed except old decades (1940s/60s/70s/80s) and 1930-code article (Serbia mirror would duplicate; referendum picked instead); 3+ texts link history/culture.
- Gotchas: article YAML titles with colons must be quoted; penalties only on possession/cultivation/sharing/consumption.
- Audit 0/0, answers 93 pass; history test shows only ir.yaml failures (another agent's uncommitted Iran file, left alone). Build + HTML verify pending.

## Albania (al) — done 2026-10-27 ~23:30 UTC
- Profile: hemp (standard, licensed-scheme-only) + culture (kanëp, Lazarat-to-drones) + arrests (field-focused) sections added; products folded (no consumer products into recreational) and deleted; possession table (tolerated dose + criminal over-dose) + cultivation table (unlicensed/licensed); inline citations everywhere; history links (Lazarat 2014, 2023 law, 2023 medical entry).
- New source: GI-TOC Western Balkans Apr 2026 (read; no licences in ~3y, zones delay, N. Macedonia warning, medical-use ban) for production/recreational/cultivation; Albanian kanëp verified on Wikipedia etymology page.
- Article: albania-no-licences-issued-2026 (slow rollout, N. Macedonia warning, export-yes-patients-no, paper law).
- Gaps closed except old decades (1930s–80s) and culture beyond language; arrests section notes no user-level data.
- Gotcha: consequences one-liner must say more or go; "no X found" sentences need no cite.
- Audit 0/0, answers 93 pass; history fails only on ir.yaml (not mine). Build + HTML verify pending.

## Kosovo (xk) — done 2026-10-27 ~00:05 UTC
- Profile: recreational + hemp (none) + black_market + arrests (Jan 2025 Pristina 25.2 kg / 4 arrests) sections added; products folded (Table I contents into medical) and deleted; possession table (first <3g / other) + cultivation table; driving fully cited; history links (2019 code, 2025 seizure).
- No new web sources needed (kp25 already in profile). Left out: culture (optional, no atlas entries).
- Article: kosovo-cannabis-reform-opinion-2019 (Shaipi 2019 Kosovo 2.0 piece read and verified: checkpoints/raids yielded little, 10% of 5,500 survey; code context + 2025 seizure close).
- Gaps closed except old decades; 3 of 17 texts link history.
- Gotcha: audit flags WRITING.md avoid-words ("establishes"); currency only with fine figures.
- Audit 0/0, answers 93 pass; history fails only on ir.yaml (not mine). Build + HTML verify pending.
