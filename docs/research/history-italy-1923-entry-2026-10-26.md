# Research pass: Italy 1923 — no new article, entry enriched, collision avoided

Research checked on 26 October 2026. The Italy 1923 backlog item did NOT
produce a new article: `articles/italy-first-drug-law-1923.md` already exists
(committed 20 October, same Gazzetta + Normattiva sources, thorough coverage
of Articles 1, 8, 10, 12 and the regulation). My draft overwrote it and was
reverted unread-eyed: after diffing, the existing version was kept verbatim.

## What was still new (verified, committed to the entry)

Reading the two Gazzetta PDFs in full turned up material the existing
article and entry do not state, now added to
`italy-indian-hemp-schedule-1923` with per-sentence citations:

- Law 396/1923 itself (GU no. 53): no Hague Convention reference anywhere
  in the text (searched) — the February law is a domestic public-order
  measure, not treaty implementation. Penalty detail confirmed: professionals
  suspended 3–6 months, recidivists 3–9 months plus 2,000–6,000 lire,
  public-office disqualification of 1–5 years possible, sales to minors
  uplifted by a quarter to a half, doctors/pharmacists fined 2,000–5,000
  lire; ministers' signatures include Mussolini's.
- Regulation RD 2534/1923 (GU no. 288): preamble cites BOTH Law 396 and the
  1912 Hague Opium Convention (authorised by RDL 9 February 1922, n. 335) —
  the hemp listing sits inside Italy's treaty obligations. Table A items 13
  (canape, cannabis sativa var. indica) and 14 (hydroalcoholic extract of
  Indian hemp); Article 10 import sampling at fifty grams for Indian hemp.
- Normattiva (read): Law 396 in force 20 March 1923.

Entry gains the item numbers, the sampling detail and the Hague-preamble
sentence; source locator widened to preamble + Article 10. No scores,
profiles or timelines changed.

## Lesson (process)

Always list `articles/` for the entry id before drafting — the backlog
tracks entries without articles, but a file can exist while the entry still
ranks (e.g. written Oct 20, entry untouched since). Diff before overwriting.
Reverted with `git checkout --` before any commit, so no foreign content
was staged or lost.

## Tree note

Staged only my schedule-entry hunk plus this note; committed with a bare
`git commit`. The existing Italy article was left byte-identical.
