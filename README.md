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
| `src/data/data.js` | Segments, weights, and each country's scores and summary |
| `src/data/details.js` | Per-segment explanations and sources for each country |
| `src/lib/facts.js` | "Did you know?" facts |
| `src/pages/` | Home, country pages, compare page |

## Contributing

Corrections are welcome — laws change and many entries rest on secondary sources. To fix a country, edit its row in `src/data/data.js` and its block in `src/data/details.js`, and include a source link. Or just [open an issue](https://github.com/burningtree/cannabis-freedom-index/issues).

## Disclaimer

Scores are editorial estimates, not legal advice. Check current local law before travelling with, buying or growing cannabis.
