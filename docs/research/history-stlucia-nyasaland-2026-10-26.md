# Research pass: St Lucia 1938 + Nyasaland 1932 articles from gazette scans

Research checked on 26 October 2026. Two colonial first bans move from
unconfirmed/Wiki-grade to full ordinance text read in gazette scans, with
two new articles. Malawi's first ban moves back from 1936 to 1932. No
scores, profiles or timelines changed.

## What was verified (all sources actually read)

- CRL Digital Collections record 827777 (Saint Lucia revised ordinances
  1957), files 490–522 swept page by page: Chapter 55 is Ordinance No. 20
  of 1938, in force 1 May 1939. Read: s. 2(17) Indian Hemp definition
  (Cannabis sativa plant, unextracted dried fruiting/flowering tops, resins,
  resin-base preparations); Part IV ss. 9–10 (import/export ban; import,
  export, cultivate, produce, sell, possess or deal = offence; transit
  excepted); penalty clause (indictment $960/10 years with or without hard
  labour, summary $240/6 months, forfeiture + destruction). New
  `articles/saint-lucia-dangerous-drugs-1938.md` (~330w body, 4 sections).
  Entry `saint-lucia-dangerous-drugs-1938` rewritten with per-sentence [@1];
  the AG's Chambers section-50 source (which never confirmed coverage) is
  replaced by the ordinance scan. One locator correction made mid-pass: the
  penalty section number was unverified in OCR, so entry and article cite
  "penalty clause", not "s. 27".
- CRL record 710837 (Nyasaland gazette), files 078–095 swept: Ordinance
  No. 7 of 1932, assented by Acting Governor K. L. Hall 15 June 1932. Read:
  preamble + s. 1; s. 2 Indian Hemp definition (hemp, resins, resin-base
  preparations, plus Governor's gazette power); s. 4 (import/export/
  manufacture/possession/cultivation/supply/use ban, "anything to the
  contrary in any other law notwithstanding"); s. 9 (pipe/material smoking
  ban, possession/use ban, premises keeping/frequenting ban); s. 10 (£200
  or 6 months + forfeiture); s. 11 (search/seizure, incl. warrantless
  European-officer power with after-report). New
  `articles/nyasaland-dangerous-drugs-1932.md` (~330w body, 4 sections) and
  new entry `nyasaland-dangerous-drugs-1932` (1932-06-15, ban, colonial, mw,
  checked). This predates `nyasaland-noxious-weeds-1936`, so per
  docs/DATA-MAINTENANCE.md ("moving where a drop happens means editing the
  before of the event that used to carry it") the 1936 entry is re-based:
  its `before` moves from FREE to the post-1932-ban state
  {possession:1, cultivation:2, enforcement:3, sharing:1, consumption:1,
  access:0}, mirroring the Basutoland 1922 first-ban vector for an
  equivalent British-African full hemp ban, and its description gains one
  cited clause naming the 1932 predecessor (second source added). The 1932
  ban thus carries the large first-ban drop (100→16) and 1936 the remainder
  (16→today's 11). This is the only score-vector change in the batch, and it
  is forced by the chain, not a re-rating.
- Claim boundaries: St Lucia article states cocaine/morphine fall under
  Part V only from the Part V heading read in the scan; no convention-ratification
  framing added (cut one unverified clause mid-draft). Nyasaland article
  does not assert repeal or the 1956 Act's relationship to the 1932
  ordinance.

## Dead ends and parks recorded, not forced

- Montserrat first ban: E/NL.1980/22 (1979 amendment to Cap. 199 Dangerous
  Drugs Ordinance) is indexed on the UN Digital Library but the TIND file
  endpoint returns the record page, not the PDF, to curl; the principal
  ordinance's date is still unknown and mo[1925,1962] stands. The CRL
  page-sweep technique that worked here is available for a retry once a
  Montserrat gazette record is identified.
- Portugal 1926 decree number: two search angles found no decree citation;
  parked, not forced.
- Yugoslav 1929 code text still unfound (see 2026-10-26 Brunei note for the
  Medarević paper read); Curaçao 1929 ordinance text still unfound.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/saint-lucia-dangerous-drugs-1938/` and
  `/history/nyasaland-dangerous-drugs-1932/` citation marks checked.
- Commit limited to own work: St Lucia hunk + new Nyasaland entry in
  changes.yaml, two new articles, this note, via pathspec. Foreign
  staged/worktree files excluded and preserved.
