# Research pass: Jamaica 1924 article and entry citations

Research checked on 26 October 2026. The 1924 tightening entry gains
per-sentence citations, and a new companion article to the existing 1913
piece tells the widening of the net from cultivation/import to
possession/sale/smoking. No scores, profiles or timelines changed.

## What was verified (all sources actually read)

- Vera Rubin & Lambros Comitas, Ganja in Jamaica (Anchor/Doubleday 1976),
  chapter 3 and Appendix II, read in the local PDF: the 1924 Dangerous
  Drugs Law's new offences (cultivation, possession, sale, smoking),
  penalty structure (six months/£100 first, two years/£250 second, in
  force until 1941); the plantocracy-repression context and London's
  approval filter; the 1937 US propaganda campaign and Rastafari as
  drivers of concern; the 1938 Depression/sugar demonstrations leading to
  the 1941 revision (mandatory maximum one year first conviction, no fine
  option; two years second); Rastafari beliefs and respectability backlash.
- New `articles/jamaica-dangerous-drugs-law-1924.md` (370 words, 4
  sections, single book source cited throughout; links to the 1913 article
  and /country/jm/). Entry `jamaica-dangerous-drugs-law-1924` keeps text
  and scores, gains per-sentence citations (its sole source was already
  the book).
- The existing 1913 article was read to avoid duplication; the new piece
  links it rather than restating the debate.

Claim boundaries: the "why 1924" is framed honestly as completing the
1913 work under the same planter-order logic — the book gives no
1924-specific trigger. The 1941 specifics and Rastafari material are the
book's own account, cited as such.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/jamaica-dangerous-drugs-law-1924/` citation marks
  checked.
- Commit limited to own work: the 1924 hunk in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
