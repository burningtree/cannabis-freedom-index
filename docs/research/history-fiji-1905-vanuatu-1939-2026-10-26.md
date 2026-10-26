# Research pass: Fiji 1905 import-ban article, Vanuatu 1939 entry strengthened

Research checked on 26 October 2026. Fiji's first-ban entry is corrected from
a Wikipedia-only 1907 dating to Ordinance No. 21 of 1905 on a contemporary
legal review actually read, with a new properly sourced article; Vanuatu's
1939 entry gains consolidation detail while keeping its honest hedge. No
scores, profiles or timelines changed.

## What was verified (all sources actually read)

### Fiji Ordinance No. 21 of 1905 (entry corrected, article added)

- Journal of the Society of Comparative Legislation, N.S. vol. VII (1906),
  "Review of Legislation, 1905", Fiji section, p. 466 (read via archive.org
  full text of
  `journal-of-comparative-legislation-and-international-law_1906_5_part-2`):
  "Indian Hemp. — Ordinance No. 21 prohibits the importation of Indian hemp
  or any product or preparation therefrom, including gunjah, bhang, chavas,
  or any article which in the opinion of the Chief Medical Officer of the
  Colony is capable of substitution therefor." Contributed by W. F. Craies.
  The section covers ordinances passed in 1905 ("Ordinances passed — 21"),
  so No. 21 is the 1905 ordinance, not a 1907 one. Footnote on the passage:
  "See the Gunjah Prohibition Ordinance, 1886 (No. 11)."
- Same volume, Introduction, p. 401: the survey's Fiji line reads "Fiji
  [prohibits] the importation of substitutes for bhang."
- Wikipedia Cannabis in Fiji (read): cannabis likely introduced following
  the 1879 introduction of Indian workers under the indenture system; the
  same "Ordinance No. 21" quotation, misattributed there to "a 1907 legal
  journal" (the journal volume is 1906; Google Books dates its scan 1907,
  which is where the wrong year comes from).
- UN E/NL.1948/45 (Fiji laws communicated; as cited on the existing 1938
  entry): the Dangerous Drugs Ordinance took effect 1 January 1938.

This resolves the open point in `history-fiji-gap-2026-10-22.md`: the 1907
date was the review's publication/scan year, not the ordinance's. Entry
`fiji-import-ban-1907` keeps its id (no inbound links to break, URL stable)
with date corrected to 1905, retitled, and re-sourced; new
`articles/fiji-import-ban-1907.md` (365 words, 3 sections, every source
cited, links to the 1938 entry, the 2026 rewrite and /country/fj/).

### Fiji 1886 Gunjah Prohibition Ordinance — dead end, not forced

Attested only by the p. 466 footnote ("See the Gunjah Prohibition
Ordinance, 1886 (No. 11)"). No text found: archive.org has no Fiji
ordinance collection or 1886 gazette; Google Books API returns nothing for
the title. Mentioned in entry and article as an untraced predecessor only —
no 1886 entry created, no timeline change, since its scope is unknown.

### Vanuatu JR 12 of 1939 (entry strengthened, no article)

- Re-read the 2006 consolidation (`/tmp/vanuatu-dda.txt`, from the Trade
  Portal PDF already cited): front matter lists JR 12 of 1939, JR 7 of 1952,
  JR 3 of 1959, JR 34 of 1975, Acts 33 of 1984 and 29 of 1989, Instrument of
  Variation Gaz. 25 of 2005; commencement 1 December 1939. Section 1 defines
  cannabis (whole plant incl. seeds, minus mature stalk/fibre) and cannabis
  resin separately; s. 4 bans cultivation of any Cannabis plant; s. 5 bars
  occupiers/managers from letting premises be used for smoking cannabis or
  dealing in it.
- Because the print is a much-amended consolidation, ss 4–5 cannot be
  attributed to the 1939 original. No article written; entry keeps the hedge
  ("the 1939 wording itself was not read"), consistent with
  `history-vanuatu-gap-2026-10-24.md`. The original JR 12 text (Western
  Pacific High Commission gazette or UK/French colonial records) remains a
  retrieval task.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/fiji-import-ban-1907/` citation marks checked.
- Commit limited to own work: changes.yaml Fiji + Vanuatu hunks, the new
  article, this note. `source-archive.json` (concurrent writer) excluded.
