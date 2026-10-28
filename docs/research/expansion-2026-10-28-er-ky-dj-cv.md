# Expansion batch, 28 October 2026

Explicit country list: Eritrea (er), Cayman Islands (ky), Djibouti (dj), Cabo Verde (cv).
Note: a standing instruction had been to skip Eritrea (closed country); the explicit request
for this batch overrides it — sources will be thin and every gap will be noted, not filled
by guessing.

| Country | Done | Left | Commit |
|---|---|---|---|
| Cayman Islands | 3 articles, cultivation table, hemp/planting/black-market/arrests | driving; 1925 estimate; 1930s–2000s decades | c57a250 |
| Cabo Verde | 4 articles, arrests section, history links, pj2022 source | driving; words; 1925 estimate | 33fd927 |
| Djibouti | 3 articles, planting/arrests sections, history links | driving; words; 1925 estimate | bfc5387 |
| Eritrea |  |  |  |
| Eritrea |  |  |  |

## er — committed
- 2 articles: `eritrea-new-code-awaits-enforcement-2024` (2015 code unenforced, transitional law works; gov2024 + 2015 Penal Code) linked from possession/cultivation/sharing/access/recreational; `eritrea-single-convention-2002` (dual accession; added certified Single Convention text as 3rd source after verifying schedules + Art 4 limitation in the PDF, cited for the content sentence) — no profile hook, left unlinked.
- New `recreational` + `hemp` (none) + `planting` sections; `products` folded and deleted; `medical`/production rewritten from reviewed materials; `consequences` sources filled; all 11 previously uncited texts converted to per-sentence cites; previously unused `pc2015` source now cited; unused `wiki` source removed.
- Deliberately absent: penalty tables (no verified operative tariff — inventing one would be worse than the gap), clubs/driving/black_market/arrests (no sources in a closed country), words (no sourced term), 1925 estimate.
- Audit 0/0; 3 pages built and verified.
- Left: empty 1920s–1980s decades; nothing since 2024 (closed country, noted).

## dj — committed
- 3 articles: `djibouti-balbala-cannabis-network-2026` (88 packages/12 kg, Dawan + RTD, linked from enforcement/recreational), `djibouti-cannabis-sentence-1971` (6 months + 3-year residence ban, Journal officiel archive; no profile hook — pre-1995-code case, left unlinked like mp precedent), `djibouti-free-zone-drug-exclusion-2003` (cannabis/hashish/resin/khat barred, linked from access).
- New `planting` (grey/unclear seeds, illegal clones; Art 355 covers growing, no seed rule) + `arrests` (Balbala custody; no aggregate series) sections.
- Audit 0/0; 4 pages built and verified.
- Left: driving section; words; 1925 estimate; empty 1920s–1960s decades. Note: a stashed `Expand Djibouti` WIP by another agent exists in the repo but the tree was clean — proceeded; watch for overlap on their return.

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
