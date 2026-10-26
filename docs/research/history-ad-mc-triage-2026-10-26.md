# Triage: Andorra 2025 CBD ruling and Monaco 1970 narcotics law closed as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` (triage and
timeline rules), the two entries with their profiles and timelines before
editing. No web search was needed: both decisions rest on the entries'
already-checked sources. Two open triage items closed with `unscored`
reasons; no scores, profiles or timelines changed.

## What changed

- `andorra-cbd-ruling-2025` (2025-07, tightening, court): `unscored` —
  a single trafficking-scale case (half a kilo at the border, a year in
  prison plus five years' expulsion) applying the existing Penal Code to
  THC-containing flower sold as CBD. The profile bands already allow
  prison for possession, so no segment moves.
- `monaco-narcotics-law-1970` (1970-07-01, tightening): `unscored` —
  Law 890 codifies the prohibition behind today's floor scores (the
  profile's possession, cultivation and sharing texts all cite it). With
  no earlier instrument established, the 1925 estimate retains the first
  drop.

## Not done here

- No profile text changed: Andorra's enforcement section already allows
  prison, and Monaco's profile already reflects Law 890 throughout.
- The Monaco estimate stays: a 1970 first law cannot be inferred without
  ruling out earlier French-era controls.
- Triage now reports AD and MC at 0 open each (global opens 479→477).

## Validation and tree note

- `node scripts/data-status.cjs chain ad` and `chain mc`: unchanged, 0
  flagged steps.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,347 pages, complete.
- Commit stages only the two `unscored` hunks in changes.yaml plus this
  note, via patch filtering. Foreign work in the shared tree is excluded
  and preserved.
