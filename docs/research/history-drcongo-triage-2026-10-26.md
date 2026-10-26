# DR Congo: closing the 2021, 2022 and 2026 triage items as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the DR Congo profile and its timeline before editing. No
book was used. This pass reviews the three open score-triage items,
verifying each against its legal text, and records `unscored` reasons.
No scores change. Cameroon and the other active country passes were left
untouched.

## Sources actually read

- Ministerial Order 1250/CAB/MIN/S/0002/DC/OWE/2021 of 27 February 2021
  (French PDF via droitcongolais.info): medical cannabis at or below
  0.2% THC acid with high CBD, exclusively industrial farming and
  production, ministerial authorisation.
- Ministerial Order 1250/CAB/MIN/SPHP/038/DCA/CPh/2022 of 24 November
  2022 (French PDF via droitcongolais.info, Journal officiel 6 March
  2023): medical and scientific purposes only, all other purposes
  strictly prohibited; Article 100 medical ceiling 0.2% THC with high
  CBD and no ceiling for scientific cannabis; Article 33 prohibits
  prescribing or dispensing narcotics in kind.
- The checked entries' Agence Congolaise de Presse reports for the 2026
  Kasaï Oriental communiqué were not re-read; the entry text (severe
  sanctions threatened under unnamed existing laws, one province) is
  sufficient for the regional-scope reason.

## What changed

- `dr-congo-medical-2021`: `unscored` reason added — authorisations run
  to exclusively industrial organisations with no established patient
  supply; access unchanged at 0.
- `dr-congo-cannabis-licensing-order-2022`: `unscored` reason added —
  non-medical purposes prohibited and dispensing in kind barred by
  Article 33; no operating patient access, access unchanged at 0. This
  goes further than the entry's own description: the order affirmatively
  prohibits patient dispensing, it does not merely fail to establish it.
- `dr-congo-kasai-oriental-ban-2026`: `unscored` reason added — one
  province only, no new penalties created.
- Triage now reports DR Congo 1 scored, 0 open (was 3 open); open
  entries overall fall 506→503. No article: a reasons-only pass with no
  scored event.

## Validation

- `node scripts/data-status.cjs chain cd`: single 1903 step, 0 flagged.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the DR Congo hunks and files.
