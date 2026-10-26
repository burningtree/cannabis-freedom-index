# Puerto Rico: the 1959–1971 chain and the 1971–2015 gap

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md` and
`WRITING.md`, the Puerto Rico profile and its eleven history entries before
editing. No book was used. This pass reconstructs the scored chain the 1959
and 1971 entries had explicitly left open, fills the 1971–2015 gap with three
dated entries. The 1959 and 1971 articles already exist from the 21 October
pass and are left untouched. Cameroon and Vietnam belong to other agents; no
file outside Puerto Rico was touched.

## Sources actually read

- Narcotics Act 48-1959, original scan (bvirtualogp, PDF/2/0048-1959.pdf):
  articles 29–33 and the penalty comparison, read in extracted text.
  Article 29 groups smoking opium, heroin and marihuana; article 30 puts
  growing under prior permission for industrial purposes only; article 33
  punishes articles 29–32 violations with five to twenty years and a fine
  up to $20,000 (ten to forty for repeat convictions).
- Controlled Substances Act 4-1971, original scan
  (PDF/3-duplicados/0004-1971.pdf), read as page images: article 401 supply
  bands (Schedule I non-narcotic 5–20 years), article 402 registration
  offences, article 403 fraud (1–4 years), article 404 possession for
  personal consumption (1–3 years, fine up to $5,000, repeat 2–6 years) with
  the once-in-a-lifetime probation and confidential dismissal, articles
  405–407 (minors, attempt, stacking fines), and the commencement clause
  (article 404 in force 23 June 1971, the rest after 180 days).
- Act 109-1980, original scan (PDF/2/0109-1980.pdf), read as page images:
  the purpose clause (indeterminate to determinate sentencing), the
  rewritten article 404 (fixed three years, five aggravated, two mitigated;
  repeat fixed six) with probation kept, and Section 2 (in force together
  with the act establishing the fixed-sentence system — that act's own date
  was not recovered, so the entry is dated by year).
- The current Law 4 compilation (rev. 2 May 2026, Justicia/4-1971/4-1971.pdf),
  read in text: the amendment list (38 amending laws, 1972–2026), cannabis as
  Schedule I item 10, current article 401 (Schedule I non-narcotic supply a
  fixed twelve years) and article 404 (fixed three years), plus the later
  404(c) treatment-assessment fine route.
- Associated Press via The A&T Register (April 2013): Senator Miguel
  Pereira's bill for 21+ possession of up to an ounce, the Capitol march,
  the 1,117 killings figure, and the then-current three-year, $5,000
  possession penalty. Read in full as extracted text.
- Associated Press via Medical Xpress (6 September 2013): the Báez–Vargas
  medical bill (patient home smoking, health-department licensing, home-grow
  permits for patients far from or unable to afford clinics), the Cole-memo
  context, and Senator José Pérez's opposition. Read in full.

Act 88-1988 was read (a probation-revocation procedure for article 404 cases)
and deliberately left without an entry: it changes no cannabis rule a user
would feel. Law 64-1972, which amended article 404 per the current
compilation's history, could not be recovered from the OGP archive and is
not described anywhere.

## Score handling

The old chain carried only two scored steps: the 1932 estimate (100→11) and
the 2016 dispensary opening (11→14). The 1959 five-to-twenty-year felony and
the 1971 cut to one-to-three years with probation now carry the steps their
entries said needed reconstruction:

1932 100→11 · 1959 11→6 (possession 1→0, enforcement 2→1, consumption 1→0)
· 1971 6→11 (all three back) · 2016 11→14 (access 0→3).

Cultivation stays 1 throughout: the 1959 permission route for supervised
industrial growing and today's licensed medical industry are the same kind
of non-personal licence. Sharing stays 1: supply was a severe felony in
every era and the profile scores today's identical structure at 1.
Consumption moves on the use question: a misdemeanour-era possession regime
(1), a felony that expressly punished use (0 in 1959), and the 1971
possession-for-personal-consumption framing (1 again). `data-status chain
pr` reports no flagged step; `scores:triage pr` reports no open entry.
Today's profile scores (total 14) did not change, so the profile file was
not edited.

The 1980 rewrite is context (`other` with an `unscored` reason): same
durations in fixed-term form, probation kept, no cannabis-specific level
change. The 2013 bills are debate entries; they fill the 2010s alongside
the 2015 executive order.

## Articles

None added: the 1959 and 1971 entries already have compliant articles from
the 21 October pass (391 and 419 words), which this pass leaves untouched.
They remain accurate under the reconstructed chain — the 1971 article even
anticipates the fixed-term rewrite the new 1980 entry now records.

## Still open

- Law 64-1972's changes to article 404 (and Laws 16 and 89 of 1972): not on
  the OGP archive under the probed directories; Justia and casemine would
  not load from here.
- Which 1971 schedule cannabis sat in and whether it counted as a narcotic
  drug for article 401 purposes: the entries do not depend on it, since the
  scored steps rest on possession penalties, but an article asserting the
  supply band should verify it first.
- The 1932 Law 12 and 1934 Law 51 texts: the estimate and the quoted
  re-enactment rest on the Supreme Court decision via its mirror; the
  originals were not recovered.
- Law 88-1988's probation-revocation procedure and the long tail of minor
  Law 4 amendments (1974–2026): read the amendment only in the compilation
  list, good leads for a future enforcement-history pass.
- The 180-day remainder of the 1971 act and the fixed-sentence system act's
  own commencement date.

## Validation

- Parsed-history comparison of the working tree against HEAD: exactly three
  entries added (1980, April 2013, September 2013) and two rescored (1959,
  1971); no other country's entries changed, none removed.
- `node scripts/data-status.cjs chain pr`: `100 -> 11 -> 6 -> 11 -> 14`,
  no flagged steps. `npm run scores:triage -- pr`: 4 scored, 0 open.
- `npm run history:test`: 39 passed. `npm run answers:test`: 16 passed.
- Production build passed (4,190 pages). The three new history pages render
  with dates, score steps and reference lists.
- A concurrent agent's Vietnam work was committed separately (`548777b`);
  its uncommitted `source-archive.json` work is untouched and not part of
  this commit. This commit stages only the Puerto Rico hunks and files.
