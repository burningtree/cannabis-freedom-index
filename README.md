# Cannabis Freedom Index

A 0–100 score of personal cannabis freedom for every country — what you may carry, grow, share and use, and what happens to you if you do. Each score comes with a written explanation and linked sources.

**Live site:** https://cannabisfreedom.fyi/

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
| `prices.yaml` | Sourced flower prices by country, date and market (street or medical) |
| `src/` | The website: pages, components, styles |
| `docs/DATA-MAINTENANCE.md` | How the country profiles and the history are checked and extended, and what is still open |
| `scripts/` | Helpers for that work: apply a batch of history edits, list what still needs a source |

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

Please include a source link. Or just [open an issue](https://github.com/burningtree/cannabis-freedom-index/issues).

### Contributing flower prices

Add sourced per-gram observations to `prices.yaml`. Only two markets are used: `street` for
illicit or non-prescribed flower, and `medical` for prescribed flower. Keep the original currency,
add the normalized USD value, and append new dates instead of deleting historical observations.

See [the price-data instructions](docs/DATA-MAINTENANCE.md#adding-prices) for the complete field
example, source-quality rules, currency conversion and validation checklist.

## Disclaimer

Scores are editorial estimates, not legal advice. Check current local law before travelling with, buying or growing cannabis.

## Licence

- **Code:** [MIT](LICENSE).
- **Data** (everything in `countries/`, `changes.yaml`, `prices.yaml` and `segments.yaml`): [CC BY 4.0](LICENSE-DATA). Credit "Cannabis Freedom Index" and link to https://cannabisfreedom.fyi/.
- Data from others keeps its own terms: population from the World Bank and Our World in Data (CC BY 4.0), cannabis-use rates from the UN World Drug Report as collected on Wikipedia, map shapes from Natural Earth (public domain).

The scores, history and prices can be downloaded as CSV or JSON at https://cannabisfreedom.fyi/data/, and score changes are listed in the [changelog](https://cannabisfreedom.fyi/changelog/) and its RSS feed.
