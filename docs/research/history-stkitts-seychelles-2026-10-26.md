# Research pass: St Kitts 1937 and Seychelles 1882 entry upgrades

Research checked on 26 October 2026. Two small first-ban entries gained
per-sentence citations from sources actually read; no articles (both events
are thin for 350 words), no scores, profiles or timelines changed.

## What was verified (all sources actually read)

### St Kitts 1937 (entry upgraded)

- Government of St Christopher and Nevis, National Cannabis Commission
  Final Report, January 2019 (134 KB PDF via sknis.gov.kn), p. 4 "History
  of the Criminalization of Cannabis: Jamaica & St. Kitts & Nevis": the
  Dangerous Drugs Ordinance of 1937 criminalised cultivation, trade and
  possession following the US/British trend; replaced by the Drugs
  (Prevention & Abatement) Act 1986, which preserved regulations made
  under the Ordinance in 1942, 1953 and 1954. Entry rewritten with
  per-sentence citations and a locator naming the page and section. The
  report's wider material (Rastafari, US/UK histories, regional reforms,
  2019 recommendations) was not turned into new entries.

### Seychelles 1882 (entry strengthened)

- The copying claim still rests on Wikipedia, but what was copied is now
  pinned down from the Banks chapter (local EPUB, re-read for the
  Mauritius pass): Mauritius's Ordinance No. 2 of 1840 (robbery fears) as
  augmented in 1848 (gandia, poisons), repealed the next year. Added as
  second source with its own cited sentence.

## Dead ends recorded, not forced

- Yugoslav 1929 code text: the pravo.hr-hosted unification article
  (Pastovic 2019) serves HTML to scripted fetches; no drug-article text
  recovered. Left untouched (third pass).
- Gallica still 403 from here (Madagascar JO lane closed). Leeward
  Islands, St Lucia 1938, Cyprus, Barbados entries sit at their evidence
  limit (UN amending orders only). Morocco 1888 rests on a single Duvall
  page — too thin for an article. Denmark 1969 and Jamaica 1913 lanes
  need nothing (already primary-sourced, articles exist).
- No article for St Kitts 1937: the commission report gives the event one
  paragraph; a 350-word article cannot be built on it honestly.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/st-kitts-dangerous-drugs-1937/` and
  `/history/seychelles-ban-1882/` citation marks checked.
- Commit limited to own work: the two hunks in changes.yaml plus this
  note, via pathspec. Foreign staged/worktree files excluded and preserved.
