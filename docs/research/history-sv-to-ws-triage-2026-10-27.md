# Triage: El Salvador, Tonga, Samoa penalty tightenings closed as unscored

Research checked on 27 October 2026. Read `DATA-MAINTENANCE.md`, the six
entries with their profiles and timelines. No scores changed; six open
entries now carry unscored reasons.

## What changed

- `el-salvador-drug-law-1991` / `el-salvador-drug-law-2003`: penalty and
  threshold bands (3-6 years possession, 5-10 growing; then <2g 1-3, ≥2g
  3-6, growing 10-15) within the already-scored state (possession 0,
  cultivation 0, enforcement 1); custody throughout, no segment movement.
- `tonga-illicit-drugs-control-act-2003`: headline 25/30-year supply-side
  maxima while user practice per the profile stays fines (possession 1,
  enforcement 2). `tonga-illicit-drugs-amendment-2020`: meth-targeted, no
  cannabis-specific change.
- `samoa-narcotics-amendment-2006`: manufacturing/precursor supply-side
  offences. `samoa-narcotics-amendment-2009`: maxima doubled (7 to 14 years
  for seed possession) within an already-custodial regime (enforcement 1);
  health-worker reporting noted without documented practice change.

## Validation and tree note

- Chains `sv`, `to`, `ws`, `history:test`, `answers:test`, production build
  to be run before commit.
- Commit stages only these six hunks plus this note, via patch filtering
  without stashing. Foreign work in the shared tree stays untouched.
