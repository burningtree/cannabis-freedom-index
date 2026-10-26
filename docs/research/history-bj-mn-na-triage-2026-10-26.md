# Triage: Benin 1997, Mongolia 2020 and Namibia 1971/2024 closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), the four entries with their profiles and timelines before
editing. No web search was needed: all four decisions rest on the entries'
already-checked sources and the current profiles. Four open triage items
closed with `unscored` reasons; no scores, profiles or timelines changed.

## What changed

- `benin-drug-law-1997` (1997-07-18, tightening): `unscored` — Law 97-025
  underpins today's prohibition (profile summary); no user-band change
  against the 1916-based floor, so the estimate retains the first drop.
- `mongolia-drug-amendment-2020` (2020-01-10, tightening): `unscored` —
  organised-group sentencing only; the ordinary non-sale range is unchanged
  and already in the profile, so no segment moves.
- `namibia-south-african-act-1971` (1971, tightening): `unscored` — the
  1971 Act is the prohibition behind today's floor scores (profile summary
  and possession text); the estimate retains the first drop.
- `namibia-medical-growing-refused-2024` (2024-06, medical): `unscored` —
  refusal confirms the existing no-medical-access status; no access change.

Triage now reports BJ, MN and NA at 0 open each (global opens 477→473,
countries with opens 107→104).

## Validation and tree note

- Chains `bj`, `mn`, `na`: unchanged, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,348 pages, complete.
- Commit stages only the four `unscored` hunks in changes.yaml plus this
  note, via patch filtering. Foreign work in the shared tree is excluded
  and preserved.
