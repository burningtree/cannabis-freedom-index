# Expansion batch 2026-10-28 — Europe 1 (de, gb, ua, ro, pt, by, rs, bg)

Chosen from `country-gaps.cjs --rank 25 --region Europe` (largest populations first).
None of these files has uncommitted changes; others' dirty files
(culture/language/assassin.md, culture/people/gareth-prince.md, asia-2 note, package files,
source-archive.json) are left alone.

Method per EXPAND-COUNTRY.md: current law + penalty tables, history, articles, context, culture,
links; profile-audit 0/0, review build, commit country-by-country.

## de (Germany) — committed (review page verified)
- Inline + per-sentence cites on all 8 flagged texts (section source lists aligned); culture links
  to language/cannabis + cannabis-social-clubs; words list (Gras, Hasch, Hanf+atlas, Joint,
  Duden-verified); new 1961 Single-Convention-signature entry (UNTC-verified, fills 1960s).
- Audit 0/0. Review build blocked by another agent's half-done `countries/tw.yaml`
  ([@moh2020] cite test) — will verify page once fixed.
- Left: 1930s still empty (no verifiable event found); optional genetics; Bundestag-vote article.
## gb (United Kingdom) — committed (review page verified)
- New entries: 1932 Dangerous Drugs Act (OU/JCL, fills 1930s), 1956 marihuana convictions
  (Schaffer/King, fills 1950s). New article `articles/uk-nabilone-licensed-1982.md` (Lords 1998
  report; fills score-moving gap).
- Words list (Weed, Spliff+atlas, Draw, Dope+atlas; Wiktionary-verified); culture links to
  language/cannabis, indian-hemp, dope, spliff, halloween rite, Marley 1977 fine (+sentence).
- Audit 0/0; full test suite green (183/0). Review build blocked by another agent's half-done
  `countries/mo.yaml` (schema: missing sources) — will verify page once fixed.
- Deliberately not linked: language/420 (not a documented British word), people/john-lennon
  (his atlas entry is about the US Sinclair campaign).
## ua (Ukraine) — committed (review page verified)
- Per-sentence cites on planting/driving/black_market/arrests (kupap added to driving sources);
  new culture section (Scythians + hemp-dance + 1934/1940 history links); words list
  (Конопля, Канабіс, Трава — uk.wiktionary/Rada/MOZ verified).
- New entries: 1934 Soviet ban article `articles/ukraine-soviet-ban-1934.md` (Istmat decree text);
  1940 Soviet hemp peak (LOC study + Smile Seeds; fills 1940s).
- Audit 0/0; full test suite green. Review build blocked by another agent's untracked
  `context/death_penalty.md` (unquoted colon in title) — will verify page once fixed.
- Left: 1950s still empty (no datable event found); optional research/spotlights/genetics.
## ro (Romania) — committed
- Words list (Cânepă+atlas, Iarbă, Marijuana, Hașiș; DEX-verified); driving per-sentence cites.
- Audit 0/0. Review build still blocked by others' files — will verify page once clear.
- Left: 1930s/40s/50s/60s/80s empty (communist-era sources thin in reachable languages;
  no verifiable 1961 signature — Romania likely acceded 1974, already covered).
## pt (Portugal) — committed
- Words list (Liamba, Ganza, Charro, Cânhamo; Priberam-verified).
- New entries: 1983 user-prominence law (Springer article; fills 1980s). New article
  `articles/portugal-use-criminalised-1970.md` (~380 words, Springer-sourced).
- Audit 0/0. Review build still blocked by others' files — will verify page once clear.
- Left: 1930s/40s/50s/60s empty (Estado Novo-era sources thin); 1993 decree article still open
  (ranked candidate).
## by (Belarus) — committed
- New driving (zero-status; 18.15 + 317-1, zakony-by verified) and arrests (no official totals;
  Girls-328 pattern, HRWF-verified) sections; words (Трава, Анаша; ru.wiktionary-verified).
- Audit 0/0. Review build still blocked by others' files — will verify page once clear.
- Left: 1940s/50s/80s empty; 1934 article covered by the same-decree Ukraine article (not
  duplicated); 1974 possession-crime article still open.
## rs (Serbia) — committed
- Words list (Vutra, Trava, Džoint, Kanabis; en.wiktionary sh-senses verified).
- New article `articles/yugoslavia-narcotic-drugs-act-1950-rs.md` (~360 words, UN E/NL.1950/24
  primary text; fills score-moving gap).
- Audit 0/0. Review build still blocked by others' files — will verify page once clear.
- Left: 1940s/60s/70s/80s/90s empty (war decades; no datable events found).
## bg (Bulgaria) — committed
- Words list (Трева, Марихуана, Коноп; en.wiktionary bg-senses verified).
- Audit 0/0. Review build still blocked by others' files — will verify page once clear.
- Left: 1930s/40s/50s/70s/80s empty (communist-era sources thin; no verifiable 1931
  ratification found).

Batch verification (28 Oct): combined review build of all 8 country pages + 9 history
entries green (exit 0, tests 183/0); words, tables, culture links and new articles spot-checked
in `.cache/page-review/`. Earlier blockers (tw.yaml cite test, mo.yaml schema, untracked
death_penalty.md colon, .astro store wipe, one wrong history prefix) were all resolved or
worked around without touching others’ files.
