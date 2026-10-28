# Expansion batch, 28 October 2026

Explicit country list: Eritrea (er), Cayman Islands (ky), Djibouti (dj), Cabo Verde (cv).
Note: a standing instruction had been to skip Eritrea (closed country); the explicit request
for this batch overrides it — sources will be thin and every gap will be noted, not filled
by guessing.

| Country | Done | Left | Commit |
|---|---|---|---|
| Cayman Islands | 3 articles, cultivation table, hemp/planting/black-market/arrests | driving; 1925 estimate; 1930s–2000s decades | c57a250 |
| Cabo Verde |  |  |  |
| Cabo Verde |  |  |  |
| Djibouti |  |  |  |
| Eritrea |  |  |  |

## cv — committed
- 4 articles: `cape-verde-constitutional-court-18-2023` (15 g lesser-trafficking ruling, linked from possession/enforcement), `cabo-verde-drug-law-correction-1993` (Nov 1993 republication, 7-day test, linked from enforcement), `cabo-verde-licit-drug-market-1992` (Decree-Law 92/92 licensing framework, linked from access), `cabo-verde-ribeira-grande-seizure-2022` (PJ: 717 kg in Tronco, grower on preventive detention, all incinerated; new `pj2022` source, linked from black_market + new `arrests` section).
- SELF-INFLICTED BUILD BREAK (fixed within minutes): new entry's source title contained an unquoted ": " (`Santiago: PJ...`), which fails YAML parsing and stops the build for everyone — my review build caught it via another agent's failing run. Fix: quote any title containing a colon+space, in `changes.yaml` AND article frontmatter (same bug was also in the seizure + licit-market article files). Added a pre-build colon scan to the routine.
- SELF-INFLICTED (fixed): `related:` named `cabo-verde-constitutional-court-18-2023`; correct id is `cape-verde-...` — build names unknown related entries.
- Audit 0/0; 5 pages built and verified (after a transient unrelated `mm.yaml` failure its owner fixed).
- Left: driving section (no drug-driving source found); words (no sourced local term); 1925 estimate; conventions; empty 1920s–2010s decades.

## ky — committed
- 3 articles: `cayman-cannabis-reform-timetable-2026` (Nov/Dec 2026 report + legislation expected), `cayman-cannabis-reform-referral-2025` (premier's LRC referral terms), `cayman-modern-drug-law-1973` (UN legislation file + 2026 Revision; 5yr/10yr ganja penalties) linked from cultivation.
- Cultivation penalty table added from ss.16(2)–(3) + Schedule 2 Part A of the Misuse of Drugs Act (2026 Revision, read locally): under 1 lb CI$20k/7yr (repeat 10yr); 1 lb+ CI$20k/7yr (repeat fine + 15yr).
- New `hemp` (none: no hemp/CBD category; definition covers all parts except stalk/fibre), `planting` (seeds not excluded → illegal/banned), `black_market` (15 supply + 2 importation ganja offences 2023), `arrests` (73 possession + 16 consumption 2023, +36 possession 2024) from the LRC July 2026 discussion paper (read locally).
- Audit 0/0; 4 pages built and verified.
- Left: driving section (no drug-driving source found); 1925 estimate; empty 1930s–2000s decades.
