# Cannabis Freedom Index

A 0–100 score of personal cannabis freedom for every country — what you may carry, grow, share and use, and what happens to you if you do. Each score comes with a written explanation and linked sources.

**Live site:** https://cannabisfreedom.fyi/

## What's on the site

- **The index:** 214 countries, territories and dependencies scored, with state-by-state scores for the United States, Canada and Australia, a world map that can be coloured by any segment or context section (seeds and clones, clubs, driving, visitors, cannabis use), rankings and side-by-side comparison.
- **History:** the laws, rulings and treaties that moved each score since 1900, with a yearly score for every place rebuilt from them. More than 500 events have a full article.
- **Culture:** a cultural atlas of words for the plant, traditions and the people who changed the law.
- **State of Cannabis:** a yearly, pseudonymous community survey of how people use, grow and think about cannabis.
- **Sources:** every source the index cites, including the books it draws on.

## How the score works

Six segments, each scored 0–10 and combined by weight:

| Segment | Weight |
|---|---|
| Possession | 25% |
| Personal cultivation | 25% |
| Punishment & enforcement | 20% |
| Sharing & gifting | 10% |
| Consumption | 10% |
| Legal access | 10% |

A 10 means no cannabis-specific rule at all — treated like tomatoes. Every cap, licence and registry costs points, so even the most liberal countries land around 50.

## Run it

Needs Node 22+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Built with [Astro](https://astro.build). Pushing to `main` deploys to GitHub Pages.

## Where things are

| Path | What |
|---|---|
| `countries/de.yaml` | Everything about one country: scores, summary, explanations, sources, and optionally its seed and clone law (unscored) |
| `countries/us/` | A federation: `index.yaml` for the country, one file per state |
| `segments.yaml` | The six segments, their weights and level descriptions |
| `changes.yaml` | The History page: laws and events that moved a country's score, with the scores before, plus treaties; the home page shows the latest four |
| `articles/` | Longer articles on single history entries, one Markdown file each, named after the entry |
| `culture/` | The cultural atlas: `language/`, `traditions/` and `people/`, one Markdown file per entry |
| `prices.yaml` | Sourced flower prices by country, date and market (street or medical) |
| `survey/` | The State of Cannabis questionnaire (`2026.yaml`) and its published, counted results |
| `src/` | The website: pages, components, styles |
| `docs/DATA-MAINTENANCE.md` | How the country profiles and the history are checked and extended, and what is still open |
| `docs/CULTURE.md` | What belongs in each part of the cultural atlas and how to write an entry |
| `docs/BOOKS.md`, `docs/books.yaml` | How the research books are read and cited, and the catalogue of what has been read; the books themselves sit in `books/`, which is not in Git |
| `docs/research/` | Dated research notes behind new entries and changes |
| `source-archive.json` | Internet Archive copies of the cited sources |
| `scripts/` | Helpers for that work: see below |

Helper scripts, run from the project root:

| Command | What |
|---|---|
| `node scripts/data-status.cjs` | Where the data stands: unchecked history entries, estimates, thin profiles, sections not yet researched |
| `node scripts/history-batch.cjs` | Apply a batch of history edits from a JSON file |
| `npm run articles:backlog` | Which history entries most deserve an article next |
| `npm run books:status` / `books:check` | Reading status of the research books; `books:report` rewrites `docs/BOOK-RESEARCH.md` |
| `node scripts/archive-sources.cjs` | Save new sources to the Internet Archive and update `source-archive.json` |
| `node scripts/book-covers.cjs` | Fetch covers for the books listed on the Sources page |
| `node scripts/survey-collect.cjs` | Decrypt and count submitted survey answers into `survey/results-<year>.json` (needs the project's secret key) |

The build checks every data file against a schema (`src/content.config.ts`) and fails with a clear message if, say, a score is out of range or a segment cites a source that isn't defined.

## Contributing

Corrections are welcome — laws change and many entries rest on secondary sources. To fix a country, edit its file in `countries/`:

```yaml
updated: 2026-10-04        # change this when you edit
scores:
  possession: 5            # 0–10, see segments.yaml for what each level means
segments:
  possession:
    text: Adults may carry up to 25 g in public…
    sources: [bmg]         # keys from the `sources` block below
sources:
  bmg:
    title: Bundesgesundheitsministerium — FAQ zum Cannabisgesetz
    url: https://…
```

Please include a source link or a complete bibliographic citation. Or just [open an issue](https://github.com/burningtree/cannabis-freedom-index/issues).

### Contributing flower prices

Prices are still incomplete, so the site hides them unless it is built with `PUBLIC_SHOW_PRICES=true` (see `.env.example`).

Add sourced per-gram observations to `prices.yaml`. Only two markets are used: `street` for
illicit or non-prescribed flower, and `medical` for prescribed flower. Keep the original currency,
add the normalized USD value, and append new dates instead of deleting historical observations.

See [the price-data instructions](docs/DATA-MAINTENANCE.md#adding-prices) for the complete field
example, source-quality rules, currency conversion and validation checklist.

## Disclaimer

Scores are editorial estimates, not legal advice. Check current local law before travelling with, buying or growing cannabis.

## Privacy

The site uses [Plausible](https://plausible.io/) for visitor statistics: no cookies and no personal data. Survey answers are signed with a key made in the respondent's browser and encrypted so that only the respondent and the project can read them; only counts are published.

## Data for research

- `/data/panel.csv`: a score for every place in every year since 1900, with the six segment scores, rebuilt from the history. The `basis` column separates recorded years from assumptions.
- `/data/history.csv`, `/data/scores.csv`: every history entry with its sources, and today's scores with ISO numeric codes for joining.
- `/data/prices.csv` and `/data/survey.json`: the sourced flower prices, and the counted survey results.
- Every file is also available as JSON (`/data/panel.json`, `/data/scores.json`, …).
- `source-archive.json`: copies of the sources in the Internet Archive, kept up to date with `node scripts/archive-sources.cjs`.

- `/llms.txt` and `/llms-full.txt`: a guide for language models, and the methodology with every country profile as one Markdown file. Both are generated from the data at build time (`src/lib/llms.js`).

See the [data page](https://cannabisfreedom.fyi/data/) for the columns and how to cite.

## Licence

- **Code:** [MIT](LICENSE).
- **Data** (everything in `countries/`, `changes.yaml`, `prices.yaml` and `segments.yaml`): [CC BY 4.0](LICENSE-DATA). Credit "Cannabis Freedom Index" and link to https://cannabisfreedom.fyi/.
- Data from others keeps its own terms: population from the World Bank and Our World in Data (CC BY 4.0), cannabis-use rates from the UN World Drug Report as collected on Wikipedia, map shapes from Natural Earth (public domain).

The scores, history and prices can be downloaded as CSV or JSON at https://cannabisfreedom.fyi/data/, and score changes are listed in the [changelog](https://cannabisfreedom.fyi/changelog/) and its RSS feed.
