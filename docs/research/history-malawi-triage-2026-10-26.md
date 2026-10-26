# Malawi: closing the 2020 and 2024 triage items as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Malawi profile and its timeline before editing. No book
was used. This pass reviews the two open medical entries against current
evidence and records `unscored` reasons: licensed industrial cultivation
with no patient supply. No scores change. Cameroon and the other active
country passes were left untouched.

## Sources actually read

- Wikipedia, Cannabis in Malawi: February 2020 law (cultivation and
  processing for industrial and medicinal use, no recreational
  decriminalisation); chamba cultivation regions and the late-1990s
  156,000-hectare estimate.
- FurtherAfrica, 12 April 2021 (checked entry's source, page shell
  re-opened): 86 licences for industrial hemp growing, processing and
  storing to 35 companies and cooperatives; no export licence yet.
- ZennJet RED country file for Malawi (August 2025 PDF), in full:
  medical cannabis not available domestically or to tourists; importing
  products even with a prescription legally risky and not officially
  permitted; CRA oversees licensing but there is no distribution or
  prescription system and no national medical-cannabis program;
  recreational chamba illegal.
- BusinessMalawi (forex freeze on a medicinal processing factory) and
  the 2026 RinziPhoya reform piece (licensing excludes the ordinary
  villager) corroborate an industry that exists on paper more than in
  patients; the mycannabis.com 2026 explainer confirms the March 2024
  amendment bill passed.

## What changed

- `malawi-medical-industrial-2020`: `unscored` reason — licensed
  medical and industrial cultivation with no established patient supply;
  unlicensed growing and possession remain criminal; access unchanged
  at 0.
- `malawi-local-chamba-2024`: `unscored` reason — amendment facilitating
  local-chamba licensing within prohibition; unlicensed conduct stays
  criminal and smoking stays illegal; no patient supply, access
  unchanged at 0. Presidential assent remains unconfirmed, as the entry
  notes.
- Triage now reports Malawi 1 scored, 0 open (was 2 open); open entries
  overall fall 489→487. No article: a reasons-only pass with no scored
  event.

## Validation

- `node scripts/data-status.cjs chain mw`: single 1936 step, 0 flagged.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes.
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Malawi hunks and files.
