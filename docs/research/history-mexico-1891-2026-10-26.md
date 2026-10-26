# Research pass: Mexico 1891 sanitary-code article and entry upgrade

Research checked on 26 October 2026. Mexico's 1891 first restriction (pop
132M) gains a properly sourced article built from the Schievenini chapter
read in full in the local EPUB, and the entry gets per-sentence citations
plus the dose detail. No scores, profiles or timelines changed.

## What was verified (all sources actually read)

- José Domingo Schievenini, "A Historical Approach to the
  Criminalization of Marijuana Use in Mexico" (ch. 6 of Cannabis: Global
  Histories, local EPUB chapter_6.xhtml): the 1891/1894/1902 sanitary-code
  regime in full — state-medical alliance, pharmacy stock lists (caffeine,
  cocaine, codeine, morphine, hemp seeds, cannabis products), the
  gatherers-only-to-pharmacists rule, prescription-only dispensing, exact
  doses (2g haschich/tincture, 0.5g extract, 1/3g cannabinone);
  Guanajuato 1871 precursor; Zacatecas 1904, Nuevo León 1905, Mexico City
  1909 tightenings; Porfiriato context; 1920 decree dropping marijuana
  from the medicines list (possession fines, 15-day jail); 1926 code
  "enervating drugs" list with marihuana, La Castañeda confinement,
  1929/1931 penal codes and the antidrug police.
- New `articles/mexico-sanitary-code-1891.md` (368 words, 4 sections,
  single academic source cited throughout; links to the 1920-ban article
  and /country/mx/). Entry `mexico-sanitary-code-1891` keeps its text and
  scores, gains per-sentence citations, the dose sentence and a precise
  locator.

Claim boundaries: the article stays inside the chapter's account — no
independent verification of the codes' texts (not readable online), no
claims about the 1891 code's penalties beyond what the chapter states
(prescription/pharmacy control, not criminal possession).

## Dead ends recorded, not forced

- The 1891/1894/1902 code texts themselves are not readable online; the
  chapter is the cited evidence. Jamaica 1924 needs nothing (already
  sourced to Rubin & Comitas plus Banks). Morocco 1888 still rests on a
  single Duvall page — too thin for an article.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/mexico-sanitary-code-1891/` citation marks checked.
- Commit limited to own work: the 1891 hunk in changes.yaml, the new
  article, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
