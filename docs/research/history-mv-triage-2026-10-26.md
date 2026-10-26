# Triage: Maldives 1995, 2011 and 2025 closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), the three entries with the profile and timeline before
editing. No web search was needed: all three decisions rest on the entries'
already-checked sources and the current profile. Three open triage items
closed with `unscored` reasons; no scores, profiles or timelines changed.

## What changed

- `maldives-life-imprisonment-1995` (1995, tightening): `unscored` — life
  imprisonment for intent to sell sits within the floor bands already
  reached by the 1977 first ban; the profile retains life for trafficking,
  so no segment moves.
- `maldives-drugs-act-2011` (2011-12-31, easing): `unscored` — the
  treatment route for dependent users exists but leaves every segment at
  the floor (use is still three years, trafficking life); the profile
  already reflects the Drug Court, so no segment moves.
- `maldives-death-penalty-2025` (2025-12, death): `unscored` — the death
  penalty for large-scale smuggling sits within the already-floored bands;
  the profile already reflects the amendment, so no segment moves.

Triage now reports MV at 0 open.

## Validation and tree note

- Chain `mv`: 1977 100→0, unchanged, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,351 pages, complete.
- Commit stages only the three `unscored` hunks in changes.yaml plus this
  note, via patch filtering. Foreign work in the shared tree is excluded
  and preserved.
