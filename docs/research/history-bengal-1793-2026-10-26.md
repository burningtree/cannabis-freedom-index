# Research pass: Bengal 1793 licensing article and entry citations

Research checked on 26 October 2026. The East India Company's 1793 ganja
licensing system (pop 176M, step 4) gains a properly sourced article built
from Mills's Cannabis Britannica read in the local PDF, and the entry gets
per-sentence citations plus a locator. No scores, profiles or timelines
changed.

## What was verified (all sources actually read)

- James H. Mills, Cannabis Britannica (OUP 2003), trade-and-taxation
  chapter, local PDF: the 1793–1850s retailer-licence system (licence from
  the local officer before approaching growers, then free purchase and
  sale; income motive, Ganja Mahal supply); the mid-century turn (1854
  wholesaler-in-warehouse taxation with collector surveillance of
  holdings and retail off-take); Act II of 1876 (cultivation licences for
  surveillance, Nowgong establishment touring and estimating the February
  crop, storage licences with declared amounts, export permits, weighed
  purchases).
- New `articles/bangladesh-bengal-ganja-licences-1793.md` (384 words, 4
  sections, single book source cited throughout; links to the 1876
  tightening article, the 1987/1989 ban entries and /country/bd/).
  Entry `bangladesh-bengal-ganja-licences-1793` keeps text and scores,
  gains per-sentence citations and a locator.
- The existing Bengal articles (1876, 1878, Mahal 1854, warehouses 1904)
  were listed to avoid duplication; the new piece links the 1876 one
  rather than restating it.

Claim boundaries: the article stays inside Mills's account; the
1987/1989 bans are linked entries, not restated claims. Palestine 1919
was read in Ram (military warning, 1925 Convention and Ordinance) but
left alone — the warning plus 1925 ordinance is too thin for 350 honest
words, and the entry is already accurate.

## Dead ends recorded, not forced

- No second source for 1793 sought; the monograph is the authority and is
  cited as such. Soviet 1974 decree text still not in readable form.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/bangladesh-bengal-ganja-licences-1793/` citation marks
  checked.
- Commit limited to own work: the 1793 hunk in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
