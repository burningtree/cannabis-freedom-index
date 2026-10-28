# Americas-5 (Caribbean) batch — expansion-2026-10-28-americas-5 (pr, bs, aw, bb, vc, cw, sr)

Non-Asian batch per request: Caribbean islands from the global top-25 not yet done
and not excluded (skip USA national/states — separate track; Canada — separate job;
Eritrea/Somaliland/Sudan — closed/recent; Africa top-25 — done in Africa-1..6 or by
others). Americas-1..4 covered the mainland + JM/TT.

- pr Puerto Rico 3M, work 25: 1 standard section missing, no penalty tables, 3 empty decades, nothing since 2022
- bs Bahamas 403k, work 29: 1 standard section missing, products to fold, no penalty tables, 6 empty decades
- aw Aruba 108k, work 35: 2 standard sections missing, products to fold, no penalty tables, 8 empty decades
- bb Barbados 283k, work 28: 1 standard section missing, products to fold, no penalty tables, 5 empty decades
- vc Saint Vincent and the Grenadines 100k, work 33: 1 standard section missing, products to fold, no penalty tables, 4 empty decades, nothing since 2022, 2 key entries without article
- cw Curaçao 156k, work 30: 1 standard section missing, products to fold, no penalty tables, 7 empty decades, nothing since 2024
- sr Suriname 640k, work 23: no penalty tables, 3 empty decades, nothing since 2024, 1 Wikipedia-only text

Shared ladder work already added recreational contexts + penalty ladders to several
of these (committed) — verify and build on them, don't duplicate.

## pr — committed
- Word Marihuana (Spanish (Puerto Rico), the Act's legal name); per-sentence cites ×11; terms on possession rows; hemp + arrests + planting (grey seeds) sections.
- Cultivation rewritten with real Ley 4 numbers from the PDF I fetched and read (Schedule I non-narcotic, manufacture incl. sowing → fixed 12 yrs, 5–20 band, repeat 25 yrs) + table.
- New `articles/puerto-rico-first-medical-dispensaries-2016.md` (Primera Hora) + `articles/puerto-rico-medical-executive-order-2015.md` (three-page signed order PDF).
- Audit 0/0; full `npm test` 193/0; page + both articles verified in review HTML.
- Left: driving/black_market (no sources); nothing post-Aug-2026 found.
## bs — committed
- Word Indian hemp (English (Bahamas), from the DDA); per-sentence cites; penalty tables (simple: $125k/10 yrs indictment, 5–7 yrs summary; intent: $500k/30 yrs, 4–7 yrs summary, 6–7 near schools); hemp + culture (1962 link + atlas) sections; products folded into medical.
- New `articles/bahamas-cannabis-act-2024.md` + `articles/bahamas-indian-hemp-definition-1962.md` (definition verified verbatim in the DDA PDF I fetched; 1962 facts rest on the checked UN-doc entry — digitallibrary pattern untestable here).
- Fixed two self-inflicted unquoted-colon YAML breaks (took down 4 test suites) + a dropped not_in_force cite + production guard wording, all before verifying.
- Audit 0/0; full `npm test` 193/0; page + both articles verified in review HTML.
- Left: driving/arrests (no sources), 1930s–2000s decades.
## aw — committed
- Possession penalty table from the 2025 OM instruction bands (0–30 g dismissal after surrender, tolerated; 30–100/100–300/300–500 g fine requests AWG 250/750/1,500, criminal); cultivation has no quantified tier in retained sources, left out.
- Recreational stays a plain `illegal` chip; 1929 shared-ordinance link folded into possession text. Products folded (CBD route lives in access/medical); production restored as required section; hemp added as `context.hemp` (status none).
- New `articles/aruba-cbd-supplement-exemption-withdrawn-2020.md` (AB 2020 no. 7 + IVA route) linked from medical; new shared `articles/curacao-first-drug-ordinance-1929.md` (CVDR/officielebekendmakingen) linked from aw possession — cw/sxm entries will reuse it.
- Planting (grey/unclear ×4, ordinance growing controls cover seeds); no driving/arrests/black_market sources.
- Schema lessons: penalty rows need `treatment`, no per-row `sources`; `context.production` required; hemp lives at `context.hemp` with HEMP_STATUS (none valid).
- Audit 0/0; page + both articles verified in review HTML.
- Left: cultivation table (no source), driving/arrests, 1930s–2000s decades.
## bb — committed
- Word herb (Barbadian English, Rastafari sacrament use quoted in Barbados Today); culture section linking traditions/rastafari-sacrament + language/dispensary; products folded into medical (dispensary link + 2025 article link).
- Possession table: ≤14 g civil $200 ticket (fine 200 + currency BBD), over 14 g criminal ordinary penalties; 1973 article linked from possession, 1936+1973 lineage in context.recreational.
- New `articles/barbados-dangerous-drugs-act-1936.md` (UN E/NL.1952/22; honest that filing reproduces the 1951 order, not the Act) + `articles/barbados-narcotic-drugs-act-1973.md` (SHERLOC PDF: $5,000/5 yrs indictment, $2,500/12 mo summary, repeals 1936) + `articles/barbados-first-dispensary-2025.md` (Island Therapeutics).
- Fixed audit warning (penalty table needs inline cites in text).
- Audit 0/0; page + all three articles verified in review HTML.
- Left: cultivation numbers (licence-only, no tiers), arrests (only 2023 seizure figure already present), 1940s–2010s decades, treaty entries (1992/1976, imp 1, skipped).
## vc — committed
- Word sacrament (Rastafari, from the 2018 select-committee record via iWitness News, new profile source); culture section linking traditions/rastafari-sacrament + 2018 bill + 1937 ordinance; products folded into medical (pharmacy link).
- Possession table: ≤56 g civil EC$500 (fine 500 + currency XCD), over 56 g criminal; enforcement carries the 2009 Vincy Pac link.
- New `articles/saint-vincent-dangerous-drugs-1937.md` (UN E/NL.1949/33; honest about order-vs-Ordinance) + `articles/saint-vincent-first-pharmacy-2020.md` (Searchlight: Green Lava Labs, Bentick Square) + `articles/saint-vincent-religious-bill-dropped-2018.md` (iWitness: state cannot grant the sacrament) + `articles/saint-vincent-vincy-pac-2009.md` (Searchlight: Vermont deaths, Gonsalves contrast with 1998).
- Lesson: once a segment text cites inline, every segment source must be cited inline — added [@drugs_proclamation] for the commencement date.
- Audit 0/0; page + all four articles verified in review HTML.
- Left: cultivation tiers (licence-only), arrests data, remaining 13 article-less entries (eradication wave 1998/2007/2008, medical 2018/2019/2022, etc.).
## cw — pending
## sr — pending
