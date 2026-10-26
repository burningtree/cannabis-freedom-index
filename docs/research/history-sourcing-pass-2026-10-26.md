# Sourcing pass: every article properly cited, top weak articles re-sourced

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, `WRITING.md`
and the cited sources before editing. No book was used.

## A real citation bug, fixed

Article `[@n]` marks resolve against the article's own front-matter `sources`
(`markdownCitations` in `astro.config.mjs`), not the entry's. The six articles
written on 26 October cited entry sources without listing them, so five rendered
literal `[@1]` text and one (US 1913, the only one with a front-matter list)
rendered an empty body — and the build stayed green in both cases. All six now
list every source they cite in front-matter, duplicating entry sources per the
Hong Kong-article convention; a rebuild shows 8–23 rendered citations per page
and no literal marks. The audit below proves no older article had this problem.

## Audit of all 945 articles

- Citation integrity (marks ⊆ front-matter sources, every listed source cited):
  clean except the six new ones, now fixed.
- 690 articles carry no inline marks. That is allowed by design ("Texts without
  marks still work"); converting them is writing work, not a sourcing defect.
- 25 articles rested only on weak sources (Wikipedia and similar, no primary,
  official, news or academic source). The three highest-impact ones are
  re-sourced in this pass; 22 remain (list at the end).

## Regression test

`scripts/history-scope.test.cjs` gains "every article's inline citations resolve
to its own front-matter sources": marks must be front-matter numbers within
range, every listed source cited. It runs in the existing `npm run history:test`
gate (40 tests passing).

## Articles and entries re-sourced

- `south-korea-cannabis-control-act-1976` (entry too): + KAIST Herald feature
  on the 1976 Act/2000 code (read in full) and Gwangju News on Shin Jung-hyeon's
  1975 arrest, imprisonment, torture and blacklist (read in full). Article
  converted to per-sentence citations. The 9,000-hectare, 50-entertainer and
  penalty figures still rest on Wikipedia.
- `thailand-decriminalisation-2022` (entry too): + Tilleke & Gibbins legal
  analysis of the 9 June 2022 Gazette notification (read in full). Article
  converted to per-sentence citations; linked entries cover the rest.
- `bangladesh-ban-1989` (entry too): + The Business Standard Naogaon report
  (read in full), a 2018 BRAC University thesis confirming the 1987/1989 dates
  and the 1990 completion (read via pdftotext), and the Laws of Bangladesh page
  for the 1990 Act (Bengali original read for the section 56 repeals; sections
  9/19 rest on the checked 1990 entry's locator). Article converted to
  per-sentence citations.

No scores, profiles or timelines changed. The DNC district-portal history
(1987 cultivation stop, shops lifted) could not be opened (bad certificate,
404) and was not cited; the BRAC thesis covers the same dates.

## Still weak-only (22)

comoros-ban-restored-1978, comoros-legalisation-1975, trinidad-ganja-ordinance-1925,
finland-use-criminalised-1972, sri-lanka-ayurveda-act-1961, china-xinjiang-hashish-trade-ended-1934,
sweden-prison-for-use-1993, switzerland-possession-legal-2023, new-zealand-referendum-2020,
brazil-verao-da-lata-1987, us-legalisation-wave-2016, us-anti-drug-abuse-act-1986, us-dc-initiative-71-2015,
us-dea-judge-young-1988, us-la-guardia-report-1944, us-leary-1969, us-ravin-v-state-1975, us-toklas-cookbook-1954,
uk-misuse-of-drugs-act-1973, canada-narcotic-control-act-1961, germany-narcotics-law-1971,
venezuela-drug-suspension-bar-struck-2017.
