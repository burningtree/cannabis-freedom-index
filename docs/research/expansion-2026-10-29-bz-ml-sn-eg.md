# Expansion batch, 29 October 2026 (bz, ml, sn, eg)

Next-batch pick: `country-gaps --rank 120` filtered by standing skips (USA track, Canada, closed/thin, recently done, BUSY) and recency — everything above was touched 27–28 Oct, so these are the stalest high-need countries with real remaining gaps.

| Country | Done | Left | Commit |
|---|---|---|---|
| Belize | 4 articles, possession+cultivation tables (Act Cap.103 read locally), products folded, citations, wiki dropped, 5 history links | conventions; 1954 convictions; 1930s/40s/60s/70s decades; words | d933a7b |
| Mali | 5 articles (2020 withdrawal, 2013 office, 1997 prescriptions, 1972 order, 1964 convention) + 2017 link | driving/arrests; copies (2007 resin, 1926); words | f0ddca8 |
| Senegal | 6 articles (1997 code, 1987 amendment, 1962 study, 2007 law, 1974 protocol, 1964 convention) + 2007 link | driving; 1926 copy; empty 1930s/40s/50s/2010s decades | 7ca5348 |
| Egypt | 6 articles (1884 ban, 1892 Caillard, 1877 destruction, 1989 law-122, 1925 drug law, 1994 Sinai) + 3 links; fixed cultivation life/death encoding warning | 9 remaining articles; words | 0d0e5fd |
| Senegal |  |  |  |
| Egypt |  |  |  |

## eg — committed
- 6 articles: `egypt-cultivation-ban-1884` (faithful to the entry's unresolved status — conventional date vs 1879 IHDC account), `egypt-caillard-regulation-proposal-1892`, `egypt-destruction-order-1877`, `egypt-law-122-1989` (full Art 33/34/35 detail), `egypt-drug-law-1925`, `egypt-sinai-eradication-1994`. Links added in sharing (1989) + culture (1877, 1884); 1892/1925/1994 unlinked (no hooks).
- Fixed pre-existing audit warning: cultivation row now encodes `life: possible` + `death: true` per the segment text.
- Audit 0/0; 7 pages built and verified.
- Left: 9 remaining article-less entries (incl. 4 conventions); words; empty 2000s/2010s decades.

## sn — committed
- 6 articles: `senegal-code-des-drogues-1997` (already linked in cultivation), `senegal-trafficking-amendment-adopted-1987` (2–10yr, mandatory, users excluded; no hook, unlinked), `senegal-yamba-clinical-study-1962` (already linked in culture), `senegal-trafficking-law-2007` (linked in sharing), `senegal-single-convention-protocol-1974` + `senegal-single-convention-1964` (certified text added, content verified; no hooks, unlinked).
- Audit 0/0; 7 pages built and verified.
- Left: driving (no source); 1926 copy; empty 1930s/40s/50s/2010s decades.

## ml — committed
- 5 articles: `mali-hemp-authorisation-withdrawn-2020` (already linked in recreational), `mali-drug-office-powers-2013` (2013 ordinance; no profile hook, unlinked), `mali-controlled-drug-prescriptions-1997` (7-day rule; no profile hook, unlinked), `mali-special-procedure-order-1972` (no hook, unlinked), `mali-single-convention-1964` (certified text added, content verified; no hook, unlinked). Added 2017-authorisation link in production.
- Audit 0/0; 6 pages built and verified.
- Left: driving/arrests (no sources); copies (2007 resin route, 1926 order — no duplication); words; empty 1930s–50s decades.

## bz — committed
- 4 articles: `belize-eradication-1985` (entry strengthened with a scholarly Griffith source, cited in entry + article), `belize-caye-caulker-referendum-2025`, `belize-legalisation-bill-shelved-2022`, `belize-decriminalisation-considered-2012`; history links added in possession (2012), access/production (2022), production (1985), access (2025).
- Penalty tables built from Cap. 103 revised edition 2000 (read locally): possession >10 g Class B 3yr/$50k; cultivation punishable under s.18 (summary 3–10yr + $10k–$100k; indictment 5–14yr + $50k–$250k; <5 kg fine-only proviso). New `act2000`/`sps22`/`gbm25ref` sources.
- All 15 uncited texts converted to per-sentence cites; `products` folded and deleted; production/medical rewritten from reviewed sources; unused `wiki` removed.
- Audit 0/0; 5 pages built and verified.
- Left: 1996/2001 conventions; 1954 convictions article; empty 1930s/40s/60s/70s decades; words.
