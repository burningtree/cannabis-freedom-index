# Research pass: Palestine/Israel 1936 amendment article; twin entries upgraded

Research checked on 26 October 2026. The 1936 Dangerous Drugs Ordinance
gains a properly-sourced article from Ram's monograph (chapters 2 and 3
re-read in the local EPUB), and both the `ps` and `il` entries get
per-sentence citations with Wiki and the unread review dropped. No scores,
profiles or timelines changed.

## What was verified (all sources actually read)

- Haggai Ram, Intoxicating Zion (SUP 2020), ch. 2 "Smuggling in Mandatory
  Palestine" (local EPUB chapter0008, re-extracted and read): 1919 warning;
  1925 Ordinance on UK 1920/1925 Acts; 1928/1932/1936 amendments under OAC
  recommendations with trafficker-penalty increases; 1936 transit clause
  stated more plainly; 1936 stricter smoker limits (pointer to ch. 3);
  dead-letter verdict (no infrastructure/capacity/will; low priority;
  1936–39 revolt halted camel corps; users lower-class Arabs; smugglers
  peasants/Bedouins/railway workers/international rings).
- Same book, ch. 3 "The Underworld of Users" (chapter0009, read): Article 14
  new in 1936 (premises for preparation/smoking; pipes/utensils); cafés in
  Jaffa/Haifa/Jerusalem/Acre/Nablus plus Tel Aviv 1939; patron/owner arrests
  and coordinated café raids.
- New `articles/palestine-dangerous-drugs-1936.md` (~340w body, 4 sections,
  single book source with chapter-split locator). Entries
  `palestine-dangerous-drugs-1936` and `israel-dangerous-drugs-1936`
  rewritten with [@1] throughout; transit claim sharpened from "made ...
  an offence" to "stated ... more plainly" per Ram.

Claim boundaries: the il entry's closing sentence ("Israel kept it after
independence and re-enacted it in 1973") was cut — Ram's Israel chapters
were not read this pass and the review was never read. Restoring it needs
the post-1948 chapters or another source. The twin-entry structure is kept
by design (pre-state event opening Israel's timeline), article on the ps id
only.

## Dead ends recorded, not forced

- No new primary sought for 1936: Ram cites the archival ordinance trail
  (nn. 93–103) without re-reading; the monograph is the authority.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/palestine-dangerous-drugs-1936/` citation marks
  checked.
- Commit limited to own work: the two 1936 hunks in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
