# Expansion batch 2026-10-28 — Africa 2 (bf, td, so, bi, ss, sl, gm)

Batch: `country-gaps.cjs --rank 25 --region Africa`, largest populations first.
Skipped: Eritrea (closed), South Africa (other agent), Sudan (just done: bea57b4),
earlier Africa-1 batch (ng, cd, tz, ke, ao, ne, bj).
All batch files verified free of others' uncommitted changes at start.

## bf — committed
- Per-sentence cites on 11 flagged texts; fixed 7 `term` warnings on pre-existing rows (all via script, verified 0/0 after).
- New hemp (status none — high-risk listing, no THC distinction); words (Cannabis/French, the law's word); new arrests (2020: 420 arrested/13,800 kg cannabis; 2023: 377 arrested/300+ tons, via Mainline sheet).
- Two articles: `burkina-faso-mainline-sheet-2025.md` and `burkina-faso-health-code-drug-penalties-1994.md`.
- No atlas entries: culture skipped; planting + driving researched sections skipped (no sources found).
- Audit 0/0; country + both article review builds verified.
- Left: 1930s/40s/50s/70s/80s history decades.
## td — committed
- Per-sentence cites on 11 flagged texts; fixed 3 `term` warnings; removed FCDO travel-advice source (audit-flagged) — recreational/visitors rewritten from the pharmacy law.
- New hemp (status none — decree + pharmacy law, no THC carve-out); words (Chanvre/French, verified in the 1966 decree PDF).
- History links added (2017 confinement, 2025 burn); two articles: `chad-convicted-drug-users-confinement-2017.md` and `chad-police-burn-2025.md`.
- Dropped now-unused pc2017 from visitors sources (citation-list test).
- Blocked mid-work by another agent's Malta restructure (#160/#178 crash); green on retry (profile-claims 97/0).
- No atlas entries: culture skipped; planting/driving/arrests skipped (no sources found). 1995 law consolidation still unverified (noted in profile).
- Audit 0/0; country + both article review builds verified.
- Left: 1930s/40s/50s/70s/80s history decades.
## so — committed
- Fixed 4 `term` warnings on pre-existing rows; dropped unused schedule1970 from cultivation sources (citation-list test); reworded WRITING-flagged "establishes".
- Per-sentence cites on 12 flagged texts; cultivation penalty table added (Art 4 vs 1984 decree, relationship expressly unresolved); new hemp (status none); words (Cannabis/Hashish as Decree 227's terms).
- New black_market (GI-TOC 2025 "small market" + Kaab TV Mogadishu-airport smuggling/189 cartons, no arrests) and arrests (Goobjoog Apr 2024, Raxanreeb Dec 2024 operations) with 4 new sources.
- New `articles/somalia-drug-offences-decree-1984.md` (Law 25: ten-year supply tier, premises offences, National Security Court).
- No atlas entries: culture skipped; planting (beyond table) + driving skipped (no sources). "Nothing since 2008" addressed via 2024–2026 enforcement sources.
- Audit 0/0; country + article review builds verified.
- Left: 1920s–1950s, 2010s–2020s history decades.
## bi — committed
- Per-sentence cites on 9 flagged texts; fixed 5 `term` warnings on pre-existing rows; culture now links the 1977 report entry.
- New hemp (status none); words (chanvre à fumer/French via the 1977 US report); production one-liner replaced with code-based text.
- No article (only candidates: first-restriction estimate, kept as estimate; 1977 report importance 1, already linked/cited).
- No atlas entries beyond the recorded name; clubs/planting/driving/black_market/arrests skipped (Mainline briefing has no hard counts).
- Audit 0/0; country review page verified.
- SELF-INFLICTED: a Python one-liner (`write('ok')` instead of `write(t)`) truncated bi.yaml mid-work; restored from git and reapplied all edits via the edit tool; diff verified sane before building.
- Left: 1920s–1960s history decades.
## ss — committed
- Fixed 3 `term` warnings on pre-existing rows; culture sentences cited (added sudanord24 law source).
- Per-sentence cites on 4 flagged texts (rest already cited); cultivation table added (personal 5y vs dealing 14y); new hemp (status none); words (Bangi/Bor+Juba reports).
- New culture (bangi atlas + 1924/Juba history links); new `articles/south-sudan-juba-raids-2026.md` (Suk Sita/Hai Amarat, bangi + pharma syrups).
- Skipped separate 1924 article: the same ordinance is already covered by `articles/sudan-ban-1924.md`; SS entry links that article from culture instead.
- Driving/black_market skipped (no sources); planting covered by table + definition text.
- Audit 0/0; country + article review builds verified.
- Left: 1930s–1990s history decades.
## sl — committed
- Added missing recreational section (no local supply; medical-export licensing only) + hemp (status none); folded products into them and deleted it.
- Possession + cultivation penalty tables (5y discretion / 15y pharmacy / licensed-medical-legal row — schema has no `licensed` treatment).
- Per-sentence cites on consequences/driving/black_market; words (Diamba/Krio via Duvall; Kush/Krio via court + press); new culture (diamba + kush atlas, 1938/1926/2008 history links).
- New arrests (891 kush arrests 2024–25 via ResearchSquare eval; 52 TOCU convictions Jan 2026; Bio special court Nov 2025) + market refresh (TOCU 2025: 300 kg cannabis + 198 kg kush).
- Two articles: `sierra-leone-seamen-regional-trafficking-1938.md` (Duvall + Akyeampong) and `sierra-leone-drugs-commencement-amendment-2008.md` (Amendment Act + cocaine plane).
- Audit 0/0; page + both articles verified (several transient build failures from concurrent agents' mid-edits; green on retry).
- Left: 1940s–1980s, 2010s history decades.
## gm — committed
- Added missing recreational section + hemp (status none); folded products into them and deleted it.
- Possession (3-tier 2014 scale) + cultivation (unauthorised + legal-research rows) tables with GMD currency.
- Per-sentence cites on all 15 flagged texts; words (Diamba via Duvall); new culture (diamba atlas + 2019 strategy link).
- New `articles/gambia-drug-strategy-rehabilitation-2019.md` (treatment/alternatives call vs 1,219 arrests).
- Planting researched section skipped (no seed-specific sources).
- Audit 0/0; page + article verified. Final rebuild blocked by another agent's uncommitted si.yaml link to not-yet-created slovenia-hemp-inspections-2025; page content already verified green.
- Left: 1920s, 1940s–1970s history decades.
