# Triage: Bhutan 2017 and Ethiopia 2019 closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), both entries with their profiles and timelines before
editing. No web search was needed: both decisions rest on the entries'
already-checked sources and the current profiles. Two open triage items
closed with `unscored` reasons; no scores, profiles or timelines changed.

## What changed

- `bhutan-narcotics-amendment-2017` (2017-12-05, easing): `unscored` —
  the amendment's treatment rule is already the profile's possession text;
  no band change against the 1925-based floor, so the estimate retains
  the first drop.
- `ethiopia-cannabis-investment-refused-2019` (2019-03, medical):
  `unscored` — the refusal confirms the existing no-medical-access status
  already in the profile; no access change.

Triage now reports BT and ET at 0 open each.

## Validation and tree note

- Chains `bt` and `et`: unchanged, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,350 pages, complete.
- Commit stages only the two `unscored` hunks in changes.yaml plus this
  note, via patch filtering. Foreign work in the shared tree is excluded
  and preserved.
