# Expansion batch 2026-10-28 — USA national profile

## Countries
- us (national profile, `countries/us/index.yaml`; 50 state files deferred per federation guide §5b)

## What was done (us)
- Fixed reported build errors: `/history/us-colorado-washington-legalize-2012/` → correct
  `us-colorado-washington-2012` (3 links); added missing registry sources `macc`, `mjbizdc`.
- Possession/cultivation: federal 21 USC 844(a) / 841(b)(1) step tables + state variation, currency USD.
- Enforcement/sharing/consumption/access/recreational: citations + history links (1996 medical,
  2012 legalisation, 2018 farm bill, 2026 schedule-III, 2026 Hemani firearms).
- Context: recreational, production, medical (prescription vs hemp-CBD distinction), consequences,
  planting, black_market, arrests, driving, visitors, clubs (CO/NV/OR/MA/DC with state sources).
- Restored `products` (required by `scripts/history-scope.test.cjs`: must match /passed/, no /signed/).
  Accepted audit advisory "fold products" — test contract wins.
- Added `hemp` (status standard): 2018 farm bill → 2025 THC-limit law → Dec 2026 partial delay.
- Added `culture`: Harlem tea pads, Hash Bash (1972), Hempfest (1991), Brownie Mary / Dennis Peron → Prop 215.
- Added `words`: pot, reefer, grass, joint, dope, marijuana (etymonline registry sources).
- Article: `articles/us-el-paso-ban-1915.md` (backlog top, importance 4).

## Verification
- `profile-audit us --warnings`: 0 errors, 0 warnings (after trimming culture to 7 units).
- `data-status chain us`: 0 steps flagged.
- `npm run build`: 5418 pages, complete.
- `history:test` 47 pass / 0 fail; `answers:test` 97 pass / 0 fail.
- dist: `dist/country/us/index.html` (hemp 0.4 mg, Hash Bash, Reefer), `dist/history/us-el-paso-ban-1915/`.

## Gaps / next
- 50 state profiles (`countries/us/*`) remain — separate batch per EXPAND-COUNTRY §5b.
- History: no decade gaps; score-moving entries all have articles except backlog tail (126 without article).
- Optional sections not written: research, spotlights, genetics.
