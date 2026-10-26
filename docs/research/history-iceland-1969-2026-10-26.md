# Research pass: Iceland 1969 ban article, 1969 and 1974 entries upgraded

Research checked on 26 October 2026. Iceland's Wiki-only 1969 first-ban
entry is now sourced to a contemporary newspaper report actually read plus a
peer-reviewed academic chapter, with a new properly sourced article; the 1974
law entry gains the same academic source. No scores, profiles or timelines
changed.

## What was verified (all sources actually read)

### 1969 regulation (entry rewritten, article added)

- Tíminn, "MARIHUANA OG LSD LOKS BANNAÐ HÉR!", issue 235, 25 October 1969,
  p. 1 (continued p. 10), read in full OCR via a Wayback capture of the
  National Library's timarit.is page (live site returns 403 to scripted
  fetches): according to an announcement in the newly published Legal
  Gazette (Lögbirtingablað), importing LSD (lyselgí), marijuana (kannabis)
  and similar drugs had until then been legal; on 14 October the Ministry of
  Justice and Ecclesiastical Affairs issued a regulation banning manufacture
  (tilbúningur) and trade (verzlun) in them. The paper says the ministry
  acted after press talk of smuggling, and notes the spring 1968 amendments
  to the opium trade/manufacture law had left the common pleasure-drugs
  unbanned.
- Helgi Gunnlaugsson, "Drug Controls in Iceland: Any Retreat in Sight?",
  in Retreat or Entrenchment? (ed. Henrik Tham, Stockholm University Press,
  2021, pp. 67–101, CC BY 4.0), read in full: drug control dates to 1923
  opium laws from an international convention, run by the Justice Ministry
  and largely unenforced; in the late 1960s the laws were revised and
  extended to make cannabis and LSD illegal too; 1973 law no. 52 created the
  special drug police/court; 1974 law no. 65 replaced the opium laws,
  raising the maximum for major violations from six to ten years, with a
  preamble on drugs as a serious social problem shown by science.
- New `articles/iceland-ban-1969.md` (351 words, 3 sections, both sources
  cited; links to the 1974 entry and /country/is/). Entry
  `iceland-ban-1969` rewritten with per-sentence citations; Wiki source
  replaced.
- Entry `iceland-narcotics-act-1974` keeps its Wiki source for the
  still-in-force claim and gains the chapter for the replacement, the
  six-to-ten-year maximum and the preamble.

Claim boundaries kept: the 1969 regulation is described as a manufacture
and trade ban, exactly what the newspaper reports — no possession/use
coverage inferred. The "walk free" reading of the pre-1969 gap is the
newspaper's own framing, cited as such.

## Dead ends recorded, not forced

- The regulation's own number and Gazette text: not recovered (Stjórnartíðindi
  1969 not reachable; timarit.is blocks scripted fetches; the 1968 opium-law
  amendments' number also unconfirmed). The newspaper's account is the
  primary evidence used.
- Cyprus 1925 Laws and St Vincent 1937 Ordinance: earliest UN filings located
  (Cyprus E/NL.1948/29, St Vincent E/NL.1949/11, Barbados E/NL.1951/31) hold
  only post-war amending orders (1947/1950/1952 rules adding synthetics and
  Indian-hemp preparations), not the principal Acts. The hedged entries are
  at their evidence limit; no changes made.
- Yugoslav 1929 code article text and Ethiopia 1930 code provisions: still
  unrecovered (see Bahamas note of 26 October 2026).

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/iceland-ban-1969/` citation marks checked.
- Commit limited to own work: the two Iceland hunks in changes.yaml, the
  new article, this note. `source-archive.json` (concurrent writer) excluded.
