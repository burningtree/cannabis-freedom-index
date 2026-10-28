# Expansion batch 2026-10-28 — Africa 3 (et, ug, mz, zw, gn, rw, cf)

Batch: `country-gaps.cjs --rank 25 --region Africa`, largest populations first.
Skipped: Eritrea (closed), South Africa (other agent), Sudan (recently done),
Africa-1 (ng, cd, tz, ke, ao, ne, bj) and Africa-2 (bf, td, so, bi, ss, sl, gm).
Zimbabwe explicitly cleared (nobody else editing).
All batch files verified free of others' uncommitted changes at start.

## et — committed
- Profile already complete; added words (Ganja/Rastafari via 2025 PLOS study) + culture extension (communal ganja use, Shashemene production, Kenya-highway smuggling via OC Index 2023).
- New `articles/ethiopia-cannabis-investment-refused-2019.md` (Dembecha farm, outcry, minister + commission refusals).
- Audit 0/0; country + article review builds verified.
- Left: 1920s/30s/70s/80s/2020s history decades; first-restriction estimate kept.
## ug — committed
- Added arrests (Nov 2024 UPF garden ops; Iganga 31; Kabale ~1/day + UGX 1.2B burn) with 3 new sources.
- Fixed 2 `life: possible` warnings on pre-existing rows.
- New `articles/uganda-court-nullifies-act-2023.md` (quorum void, replacement with life terms).
- No atlas entries / no valid word source: words + culture skipped; planting skipped.
- Audit 0/0; page + article verified. Final build delayed by others' churn (lu mid-edit phantom, lock contention); green on retry.
- Left: 1920s–1970s, 2000s history decades.
## mz — committed
- Words (Suruma/Mozambican Portuguese + Mbanje/Ndau via Duvall; culture already linked both).
- Black_market refreshed with 2025 government figure (4.4+ tonnes incl. cannabis via NewsCentral).
- Two articles: `mozambique-delagoa-bay-bang-1798.md` (White's journal, cow's-horn pipe) and `mozambique-nyusi-legalisation-studies-2024.md` (president's call for studies).
- Driving researched section skipped (no source). Audit 0/0; page + both articles verified.
- Left: 1920s/30s/60s/80s/2000s/2010s history decades.
## zw — committed
- New arrests (Nov 2025: 3 cops + 2 civilians, 11 kg SA dagga; Mar 2026: 200 kg, 11 held) + culture (mbanje atlas + pipe-bowls link) + words (Mbanje/Shona via Duvall).
- New `articles/zimbabwe-pipe-bowls-1200.md` (1200 CE bowls, Zimbabwe/Monomotapa circulation).
- Audit 0/0; page + article verified. Builds repeatedly blocked by others' in-flight edits (hr, ro, lock); green on retry.
- Left: 1920s–40s, 1960s–80s, 2000s history decades; first-restriction estimate kept.
## gn — committed
- Per-sentence cites (segments + context), penalty terms (Personal use/Supply/Trafficking/Cultivation), new hemp section, assertive production wording, reworked planting.
- Words: Diamba (Manding, via Duvall) — 1891 dictionary distinction already in culture.
- New `articles/guinea-mandingo-dictionary-diamba-1891.md` + `articles/guinea-drug-penalties-1998.md` (1998 code from UNODC + 1989 ordinance).
- Audit 0/0; page + both articles verified. Review cache repeatedly wiped by concurrent builds; verified build+grep in single commands.
- Left: 1930s–50s, 1970s, 2000s decades; no driving/black_market/arrests sourced.
## rw — committed (HTML verification pending Albania fix)
- Words: Injaga (Kinyarwanda, via Codere) — atlas language/injaga entry already in culture.
- New clubs section (none known, highest-category offences cited); `life: possible` on both Category I penalty rows.
- New `articles/rwanda-possession-clause-2019.md` + `articles/rwanda-sentencing-discretion-2023.md` (both from retained Minijust law PDFs).
- Audit 0/0; full `npm test` 193/0. Review builds blocked by committed `countries/al.yaml` linking missing `albania-cannabis-register-2026` (another agent's, left untouched) — re-verify HTML once they fix.
- Left: driving (no source), 1920s–50s, 1990s decades.

## cf — committed (HTML verification pending Albania fix)
- New planting (grey/unclear, no plant or seed rule in 2001 law) + driving (`unknown`, no per se limit; courts may restrict driving as added penalty) sections.
- Recreational links the shared 1926 AEF decree via Chad's article (no duplicate article, SS→Sudan precedent) + new Duvall `Buying and Banning` source.
- Searched post-2024 news: nothing citable (ENACT 2025 PDF download failed; snippets not citable).
- Audit 0/0; full `npm test` 193/0. Review builds blocked by same al.yaml issue — re-verify HTML once fixed.
- Left: arrests (no counts found), culture/words (no atlas entry), 1930s–90s decades.
