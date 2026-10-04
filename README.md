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
| `countries/de.yaml` | Everything about one country: scores, summary, explanations, sources |
| `countries/us/` | A federation: `index.yaml` for the country, one file per state |
| `segments.yaml` | The six segments, their weights and level descriptions |
| `changes.yaml` | Laws and events that moved a country's score, with the scores before; the home page shows the latest three |
| `src/` | The website: pages, components, styles |

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

## Disclaimer

Scores are editorial estimates, not legal advice. Check current local law before travelling with, buying or growing cannabis.
