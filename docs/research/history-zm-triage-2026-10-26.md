# Triage: Zambia 2017 dispute and 2019 export approval closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), both entries with the profile and timeline before editing.
No web search was needed: both decisions rest on the entries' already-checked
sources and the current profile. Two open triage items closed with
`unscored` reasons; no scores, profiles or timelines changed.

## What changed

- `zambia-licence-dispute-2017` (2017-03, medical): `unscored` —
  ministerial dispute with no legal change, superseded by the December
  2019 cabinet decision; no segment movement.
- `zambia-medical-export-2019` (2019-12, medical): `unscored` — cabinet
  approval without implementation; the 2021 licensing Act has not come
  into force and access stays 0.

Triage now reports ZM at 0 open (1926 100→3, today 3).

## Validation and tree note

- Chain `zm`: unchanged, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail; `npm run answers:test` and the
  production build to be re-run before commit.
- Commit stages only the two `unscored` hunks plus this note, via patch
  filtering. Foreign work in the shared tree is excluded and preserved.
