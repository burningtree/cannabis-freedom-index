# Research pass: Palestine 1919 warning article, il/ps entries cited

Research checked on 26 October 2026. The 1919 British military warning
gains a properly sourced article built from Haggai Ram's Intoxicating
Zion read in the local EPUB; the duplicate il/ps entries both get
per-sentence citations and sharper locators. No scores, profiles or
timelines changed.

## What was verified (all sources actually read)

- Haggai Ram, Intoxicating Zion (Stanford UP 2020), chapter 2 ("Smuggling
  in Mandatory Palestine: The Limits of Antihashish Controls"), local EPUB
  chapter0008.html: first anti-hashish reference — the 1919 military
  warning (cultivate, export, introduce, buy, sell, offer, possess);
  Egyptian ban context (three decades old, routes shifted Greece→Levant);
  1925 Opium Convention confirmation; 1925 Dangerous Drugs Ordinance on
  the metropolitan 1920/1925 Acts (opiates, coca, cocaine, Indian hemp);
  1928/1932/1936 amendments (OAC penalties, 1936 transit offence and
  smoker limits); enforcement verdict (no infrastructure/capacity/will,
  low priority vs immigration and communal tensions, demoralized police,
  "annoyance and burden", CID priorities); transit corridor
  (Lebanon-Syria→Egypt, invisible borders, legitimacy question); Bedouin
  camel-saddle concealment mocked by officers; Beirut notables vs
  couriers' commissions.
- New `articles/palestine-military-hashish-ban-1919.md` (381 words, 4
  sections, single book source cited throughout; links to the 1925
  ordinance entry and /country/ps/). Entries
  `palestine-military-hashish-ban-1919` and its il duplicate keep text
  and scores, gain per-sentence citations and precise locators.
- The duplicate il entry is by design (pre-state event opening Israel's
  timeline); only the ps id carries the article, per the filename rule.

Claim boundaries: the "why 1919" is framed as route-shifts plus new
military rule, exactly Ram's context — no invented trigger. The "first
reference" phrasing is Ram's ("first reference to the introduction of an
antidrug regime"), cited as such.

## Dead ends recorded, not forced

- No second source sought for 1919: the monograph is the authority and
  its archival citations (nn. 93–103) are noted, not re-read. Soviet 1974
  decree text still not in readable form. Netherlands 1928 archives are
  JS-only.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/palestine-military-hashish-ban-1919/` citation marks
  checked.
- Commit limited to own work: the two 1919 hunks in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
