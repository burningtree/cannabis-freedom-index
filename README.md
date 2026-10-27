# Cannabis Freedom Index

A 0–100 score of personal cannabis freedom for every country: what an adult may carry, grow,
share and use, and what happens to them if they do. Every score comes with a written explanation
and its sources.

**Live site:** https://cannabisfreedom.fyi/

## What's on the site

- **The index:** a score for every country and territory, and for the states and provinces of
  federations, with a world map, rankings and side-by-side comparison.
- **Country profiles:** the rules behind each score, penalty tables, and context the score leaves
  out: medical use, hemp, clubs, driving, visitors, culture, research and more.
- **History:** the laws, rulings and treaties that shaped each country's score, with longer
  articles on the key events.
- **Culture:** a cultural atlas of words for the plant, traditions and people.
- **State of Cannabis:** a yearly, pseudonymous community survey.
- **Data:** everything downloadable as CSV and JSON, free to reuse.

How the score is made is explained on the site's [methodology](https://cannabisfreedom.fyi/#methodology):
six segments scored 0–10 and combined by weight (`segments.yaml`), where a 10 means no
cannabis-specific rule at all. Scores over time are rebuilt from each country's history.

## Run it

Needs Node 22+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Built with [Astro](https://astro.build). Pushing to `main` deploys to GitHub Pages. The build checks
every data file against a schema (`src/content.config.ts`) and fails with a clear message when
something is wrong.

## Where things are

| Path | What |
|---|---|
| `countries/` | One profile per country (`de.yaml`); federations have a folder with one file per state |
| `changes.yaml`, `articles/` | The history, and longer articles on single entries |
| `culture/` | The cultural atlas |
| `glossary.yaml` | Words explained wherever they appear on the site |
| `segments.yaml` | The six scored segments and their weights |
| `datasets/` | Outside data shown on the profiles |
| `src/` | The website |
| `docs/` | How the data is kept and written (start below) |
| `scripts/` | Helpers for that work |

## Contributing

Corrections are welcome: laws change, and many entries rest on secondary sources. Edit the
country's file in `countries/` with a source for every claim, or
[open an issue](https://github.com/burningtree/cannabis-freedom-index/issues).

- `docs/DATA-MAINTENANCE.md`: how profiles, history and sources work.
- `docs/WRITING.md`: how texts should read.
- `docs/EXPAND-COUNTRY.md` and `docs/EXPAND-COUNTRIES.md`: how to research and fill in a country,
  or a batch of them. `AGENTS.md` is the short version for AI agents.
- `docs/CULTURE.md`: how to write an atlas entry.

## Disclaimer

Scores are editorial estimates, not legal advice. Check current local law before travelling with,
buying or growing cannabis.

## Privacy

The site uses [Plausible](https://plausible.io/) for visitor statistics: no cookies and no personal
data. Survey answers are encrypted so that only the respondent and the project can read them; only
counts are published.

## Licence

- **Code:** [MIT](LICENSE).
- **Data** (`countries/`, `changes.yaml`, `segments.yaml` and `prices.yaml`):
  [CC BY 4.0](LICENSE-DATA). Credit "Cannabis Freedom Index" and link to
  https://cannabisfreedom.fyi/.
- Data from others keeps its own terms, listed on the
  [data page](https://cannabisfreedom.fyi/data/), which also explains the downloads and how to cite.
