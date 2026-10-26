# Research pass: Greece 1920 cultivation-ban article

Research checked on 26 October 2026. Backlog item
`greece-cultivation-ban-1920` cleared with a new properly sourced article.
The Greece 1920 entry needed no changes (both sources already present with
per-sentence citations from the prior Balkan pass). No scores, profiles or
timelines changed.

## What was verified (both sources actually read earlier, reused here)

New `articles/greece-cultivation-ban-1920.md` (356 words, per-sentence
citations, both sources cited; history:test 40/40, answers:test 39/39,
full clean build, both reference marks render).

- J. Bouquet, UN Bulletin on Narcotics 1951: Greece forbidding cultivation
  in 1920; hidden stocks and the more drastic 1932 law; production moving
  to Bulgaria, Romania, Yugoslavia and Albania; chira from Greece in French
  North Africa; persistent clandestine consumption.
- Liat Kozma, Journal of Levantine Studies 2017: Egypt's ~1880 ban and
  field burnings; Greece as supplier then banner, burned fields and lost
  farm income; Egypt's lost channel; El-Guindi at Geneva 1925; British
  India legal-and-taxed contrast.

## Build note

A mid-pass `npm run build` failed at the `/map/poster` prerender with a
missing vite chunk (`index_COsEToQb.mjs`). Cause was a corrupted
`dist/.prerender` cache, not source code — almost certainly two builds
(this session's and the concurrent writer's) writing `dist/` at once. A
clean rebuild (`rm -rf dist`, serial) completed: 4293 pages. If the error
recurs, serialize builds rather than debugging the poster route.

## Tree note

Committed only the new article plus this note. `changes.yaml` in the
worktree is the concurrent writer's (Isle of Man work); nothing was
staged from it. The existing Greece 1920 article check (`ls articles/ |
grep greece`) preceded writing, per the Italy lesson.
