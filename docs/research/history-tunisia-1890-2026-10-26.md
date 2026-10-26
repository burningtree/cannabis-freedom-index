# Research pass: Tunisia 1890 monopoly article, 1890 and 1875 entries cited

Research checked on 26 October 2026. Tunisia's 1890 takrouri monopoly
gains a properly sourced article built from Duvall chapter 9 read in full
in the local PDF; both the 1890 and 1875 entries get per-sentence
citations and sharper locators. The Duvall read also resolves the old
"needs Duvall book" flag on the 1875 entry. No scores, profiles or
timelines changed.

## What was verified (all sources actually read)

- Chris S. Duvall, The African Roots of Marijuana, ch. 9 (local PDF):
  mid-1800s open smoking; 1875 cultivation ban; 1884 tobacco monopoly
  (licensed farming in certain districts, state sales, anti-adulteration
  purpose); 1890 takruri addition with farming rules loose because of
  Constantine (Algeria) imports and later self-sufficiency; two products
  priced in 1890, single trimmed/chopped five-gram box from 1902 (the
  standard Maghreb preparation, standard for decades); 5,000 kg/year in
  the 1910s; monopoly into the 1950s; revenue purpose plus shaping
  colonial agriculture and limiting consumption; southern-Europe tobacco
  parallel; only Morocco and Tunisia monopolised cannabis; Morocco's
  morally fraught monopolies, 1888 executive ban after consulting a
  cleric, public burning, Rif farming allowed, 1896 restoration; 1884
  Moroccan monopolies at 37% of one northern region's revenues.
- New `articles/tunisia-takrouri-monopoly-1890.md` (358 words, 4
  sections, single book source cited throughout; links to the Morocco
  1888 entry, the 1953 ban entry and /country/tn/). Entries
  `tunisia-takrouri-monopoly-1890` and `tunisia-cultivation-ban-1875` keep
  text and scores, gain per-sentence citations and precise locators.

Claim boundaries: the 1875 ban's legal instrument is still untraced —
the entry claims only the ban fact Duvall states. The 1890 prices
themselves are not quoted (Duvall gives products, not figures). Morocco
comparisons stay inside the read passage.

## Dead ends recorded, not forced

- No article attempted for Tunisia 1875: two sentences of fact, and the
  instrument remains unknown. Soviet 1974 decree text still not in
  readable form (CIA reading room in maintenance; Russian DBs not
  found). Gallica still 403.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/tunisia-takrouri-monopoly-1890/` citation marks
  checked.
- Commit limited to own work: the two Tunisia hunks in changes.yaml, the
  new article, this note, via pathspec. Foreign staged/worktree files
  excluded and preserved.
