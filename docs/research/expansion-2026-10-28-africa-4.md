# Africa-4 batch — expansion-2026-10-28-africa-4 (tg, lr, ga, gw, gq, dj, mu)

Batch picked from `node scripts/country-gaps.cjs --rank 25 --region Africa`: largest
populations not yet done and not excluded (skip South Africa — other agent; Eritrea —
closed; Sudan — recently done; Somaliland — unrecognized, thin sources like
Transnistria; so/bi/et/cd/ss/cf/mz/zw/ug/bj — done in Africa-1/2/3).

- tg Togo 9M, work 14: 6 empty decades, 1 key entry without article
- lr Liberia 6M, work 15: 5 empty decades, nothing since 2023, 1 key entry without article
- ga Gabon 3M, work 33: 2 standard sections missing, products to fold, no penalty tables, 5 empty decades, 1 key entry without article
- gw Guinea-Bissau 2M, work 25: 9 empty decades, nothing since 1995, only 4 history entries, 1 key entry without article
- gq Equatorial Guinea 2M, work 32: 1 standard section missing, no penalty tables, 5 empty decades, nothing since 2019, 1 key entry without article
- dj Djibouti 1M, work 38: 2 standard sections missing, products to fold, no penalty tables, 5 empty decades, 1 key entry without article, 2 Wikipedia-only texts
- mu Mauritius 1M, work 22: 1 standard section missing, products to fold, no penalty tables, 4 empty decades

Recent ladder commits already added penalty tables to tg/lr/gw/gq/mu (committed, shared
history) — verify and build on them, don't duplicate.

## tg — committed
- Profile already complete from shared ladder work (cites, tables, hemp, driving, arrests all present); audit 0/0 unchanged.
- New `articles/togo-drug-seizures-2025.md` (Jan 2026 destruction of 5,291 kg) + `articles/togo-drug-seizures-report-2026.md` (50+ tonnes in 2025, Abidjan–Lagos corridor).
- Page + both articles verified in review HTML.
- Left: words (no sourced local word found), culture (no atlas entry), 1920s–50s, 1980s, 2000s decades.
## lr — committed
- Word Diamba (English (Liberia), via Duvall; atlas + culture already linked).
- Arrests refreshed with June 2026 LDEA annual report (1,831 all-drug arrests Jul 2025–Jun 2026; 8 trafficking convictions, 1–10 years, Jan–Jun 2026); black_market adds 2,353.396 kg marijuana breakdown as reported.
- New `articles/liberia-congo-recaptive-diamba-smoking-1890.md` (Büttikofer + Duvall) + `articles/liberia-drug-law-bail-debate-2022.md` (WADPN).
- Audit 0/0; page + both articles verified in review HTML.
- Left: 1920s–60s decades; first-restriction estimate kept.
## ga — committed
- Per-sentence cites ×14; penalty tables for possession/cultivation/sharing/consumption (terms, XAF); products folded into medical then deleted; new recreational (tiers + 1926 AEF link via Chad, no duplicate) + hemp sections.
- New `articles/gabon-drug-penalties-retained-2020.md` + `articles/gabon-libreville-seized-drugs-destroyed-2026.md` (both from retained gazette/ministry sources).
- Audit 0/0; page + both articles verified in review HTML.
- Left: driving/arrests (no sources), words/culture (no atlas entry), 1930s–50s, 1970s–80s decades.
## gw — committed (changes.yaml entry left uncommitted — see below)
- Profile already complete (audit 0/0 unchanged); black_market extended with Feb 2026 Senegal-border flow (56 kg GW-bound convoy, 10+ t Ziguinchor seizures) + new aq26 source, linked to new history entry.
- New `changes.yaml` entry `guinea-bissau-senegal-cannabis-convoy-2026` (checked, from AfricanQuarters 28 Oct 2026 piece which I read in full). NOT committed: tree's changes.yaml carries another agent's uncommitted full-file reorder — committing would sweep their work. Entry verified in review builds; needs re-check once their reorder lands.
- Page + new history page verified in review HTML (re-verified after restore, see below).
- INCIDENT RESOLVED: another agent's changes.yaml churn had dropped the convoy entry and stripped the gw.yaml link. Entry re-appended, link restored, both re-verified. After the Mongolia agent committed their hunks, the worktree diff was exactly the 18-line entry and nothing else, so it is now COMMITTED (no one else's work swept). Final rebuild + verify done post-commit: gw page link renders, history page renders, history-scope tests 47/0.
- Left: driving/arrests (no GW-side sources found), words/culture (no atlas entry), 1920s–60s, 1980s, 2000s–2020s decades; first-restriction estimate kept; 1995 conventions entry too thin for an article.
## gq — committed
- Per-sentence cites ×11 (segments + context); new hemp section; removed FCDO reliance from recreational/visitors (audit rule) keeping decree+UN citations.
- No articles: both candidates (1981 Getafe, 1970 Macías bhang) rest on Wikipedia alone; no primary source found. No words/culture (no atlas entry, no sourced word).
- Penalty tables honestly impossible: reviewer deliberately left tariffs provisional pending 1993/2022 reconciliation — left missing, noted.
- Recent-news check: nothing GQ-side cannabis-specific since 2019 (only Nigeria→Malabo cocaine route).
- Audit 0/0; page verified in review HTML.
- Left: 1920s–50s, 2020s decades; first-restriction estimate kept.
## dj — committed
- Per-sentence cites ×13; penalty tables for possession/cultivation/sharing/consumption (terms, DJF); products folded into hemp/medical then deleted; new recreational + hemp sections.
- Production/medical rewritten from the Penal Code (were Wikipedia-only); unused wiki source removed.
- New `articles/djibouti-drug-offenders-excluded-pardon-1984.md` + `articles/djibouti-national-drug-committee-2000.md` (both from official-journal decrees).
- Audit 0/0; page + both articles verified in review HTML.
- Left: planting (no seed rule)/driving/arrests (no sources), words/culture (no atlas entry), 1920s, 1940s–60s, 2010s decades; first-restriction estimate kept.
## mu — committed
- Word Gandia (English (Mauritius), from the DDA's own definition); dda locator added (definitions, §§5/29/30, schedules from local PDF extraction).
- Cultivation/sharing rewritten with real tiers from the Act (herb = Part I, ≤25 yrs servitude + ≤1M; resin = Part II, 5–25 yrs; general Part II tier ≤15 yrs + ≤500k); possession term added; per-sentence cites incl. long driving section.
- Products folded into medical + new hemp (≤30 mg/mL, no flower); production status corrected to none.
- New arrests (NDO 2024: 3,451 cases, 2,520 arrests, 37.2% cannabis; 40.9% of 4,373 offences) + black_market (FSL 46.1%, ADSU Rs 1.6B/74% cannabis; MRA 2025 seizures 55 kg Feb, 10.2 kg vessel Aug, 18 kg Alabama arrival Dec — all fetched and read).
- New `articles/mauritius-drug-bail-khoyratty-ruling-2006.md` (2006 UKPC 13, verified via CaseMine judgment text: 3 g heroin, s.32/s.5(3A) void, separation of powers).
- Fixed self-inflicted duplicate recreational key. Audit 0/0; page + article verified in review HTML.
- Left: 1848 article (book chapter not read — skipped), culture (no atlas entry), 1920s, 1940s, 1970s, 2010s decades.
