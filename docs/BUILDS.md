# Fast local checks

Most edits do not need to render the entire site. Choose the check that covers the change:

| Work | Command | Output |
| --- | --- | --- |
| Test assertions while editing | `npm test` | Test results |
| Country, article, atlas entry or a few frontend pages | `node scripts/build-pages.mjs country/de history/germany-cannabis-act-2024` | `.cache/page-review/` |
| Shared layout or broad frontend work | `npm run build:quick` | `dist/`, without social cards |
| Complete site, routing/link changes or deployment | `npm run build && npm run seo:audit` | Complete `dist/` |

The review command takes **URL prefixes**, without the domain. `country/us` includes its state
pages; `history` includes the whole history; `/` selects only the homepage. Add every page or
section you need to inspect. A prefix that matches nothing fails instead of silently passing.
For a history edit, include both the country and the entry; for an atlas entry, include its
`culture/<section>/<slug>` path. It runs `npm test` once, then Astro's normal build pipeline:
all content collections, schemas and Markdown citations are synced, and all route data is
evaluated, but only selected pages are rendered. It therefore catches global data/reference
errors as well as rendering errors on the selected pages.

Review output is a **partial site** in `.cache/page-review/`. Inspect its HTML directly;
links to unselected pages need not exist there. It does not replace a full build for routing,
shared link changes or site-wide SEO checks. It never empties or overwrites `dist/`, and CI
rejects the review command. Each review build replaces the previous review output.

All builds take an automatic process lock, because Astro's generated content and caches are
shared even with different output folders. If it reports another build, wait for that process
to finish and retry. A lock left by a terminated process is recovered automatically.

Keep `.cache/`:
commit statistics, changelog diffs, research counts, social cards and map posters are cached
there by their inputs. Branch changes and new commits update the history caches; poster inputs
include its template, renderer, fonts, data and dependency lockfile. Removing caches is safe
but makes the next build slower.
