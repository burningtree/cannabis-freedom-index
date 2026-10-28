# Expansion batch 2026-10-28 — USA states 10 (ak, ar, dc, de, nd, sd, wy)

Same method as usa-1–9: penalty tables from state law, state-differing context + citations +
history/culture links, profile-audit, review build, commit country-by-country.

## ak (Alaska) — committed
- Sharing/consumption cites (AS 17.38 + AMCO FAQ), access cite. Possession pinned, untouched.
- Audit 0/0; review page verified.
## ar (Arkansas) — committed
- Already complete (cultivation table, cites, pins); audit + review build verified, no changes.
- Audit 0/0; review page verified.
## dc (District of Columbia) — committed
- Cites on all uncited segments (D.C. Code + OAG overview); pinned texts untouched.
- Audit 0/0; review page verified.
## de (Delaware) — committed
- Consumption/access cites; pinned possession/sharing untouched. Audit 0/0; review verified.
## nd (North Dakota) — committed
- Cultivation table (manufacture/delivery felony 10yr/$20k, NORML-verified), sharing cite,
  2019 ingestion-reclassification history link. Pins untouched.
- Audit 0/0; review page verified.
## sd (South Dakota) — committed
- Possession table (≤2oz misd 1yr/$2000, NORML-verified), cultivation punished by plant weight,
  sharing/access cites. Consumption pins untouched.
- Audit 0/0; review page verified (after another agent fixed their YAML blocker).
## wy (Wyoming) — committed
- Cultivation table (any amount misd 6mo/$1000, NORML-verified), sharing/consumption cites.
  Possession/answers pins untouched.
- Audit 0/0; review page verified.

Batch complete (all 7 committed). Verification: full `npm test` green (exit 0); per-state review
pages verified; `dist/country/us/` spot-check shows latest tables. Full `npm run build` currently
blocked by another agent's missing asset
(`src/assets/culture/garreth-prince-cape-town-high-court-2013.webp`, owned by the gareth-prince.md
editor) — not our files, left for them.
