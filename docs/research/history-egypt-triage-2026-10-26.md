# Egypt: closing eleven open entries as reviewed

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Egypt profile and its timeline before editing. No book
was used. This pass reviews all eleven open score-triage items — medieval
enforcement actions, nineteenth-century prohibitions, the 1925
heroin/cocaine extension, the 1952 narcotics law, the 1989 death-penalty
rewrite and the 1994 eradication — and records `unscored` reasons. No
scores change. Cameroon and the other active country passes were left
untouched.

## Sources actually read

- The 1997 Senegal Code des drogues (for method, not Egypt): not used
  here. Egypt sources read: the checked entries' own texts for the 1244,
  1324, 1378, 1800, 1868, 1877, 1879 and 1884 items (Maqrizi/de Sacy,
  Kozma, Russell, IHDC) and the 1994 eradication item (Wikipedia).
- Law 182 of 1960 (checked entry, UNODC Bulletin source): long prison
  terms for hashish possession, death penalty allowed for trafficking.
- Law 122 of 1989 (checked entry, Parlmany record source): death for
  import/export/production-for-trade and growing-or-trading listed plants
  (Article 33), death or life for holding/buying/selling with intent to
  trade (Article 34), life at hard labour for unpaid supply
  (Article 35).
- Manshurat record for Law 351 of 1952: catalogue stub only (title and
  number confirmed, no penalty text) — insufficient to score; the entry
  keeps a no-distinct-movement reason.
- The DRI parliamentary file for Senegal's Law 87-12 could not be
  re-read (error page); unrelated to Egypt beyond the triage batch.

## What changed

- Eleven `unscored` reasons: 1244 and 1324 enforcement actions; 1378
  Mamluk enforcement campaign; 1800 short-lived French occupation decree;
  1868 nineteenth-century prohibition folded into the 1879 anchor pending
  the deferred earlier-restrictions reconstruction (as the 1879 entry
  itself notes); 1877 Ottoman enforcement campaign; 1884 conventional
  date contradicted by the IHDC March 1879 account (entry stays
  unchecked); 1925 heroin/cocaine extension; 1952 replacement law; 1989
  death-penalty rewrite within floor bands; 1994 single-year eradication
  campaign. Pre-1879 entries cannot score while the checked 1879 anchor
  holds `before` FREE (any step would read 100→100).
- Triage now reports Egypt 2 scored, 0 open (was 11 open); open entries
  overall fall 489→478. No article: a reasons-only pass with no scored
  event. Chain unchanged: 1879 100→11, 1960 11→3.

## Validation

- `node scripts/data-status.cjs chain eg`: two steps, 0 flagged.
- `npm run history:test` and `npm run answers:test`: all pass.
- Production build passes. `npm run seo:audit` passes (separate fix).
- Concurrent agents' work in shared files is untouched; this commit stages
  only the Egypt hunks and files.
