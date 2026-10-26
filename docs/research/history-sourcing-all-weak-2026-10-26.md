# Sourcing pass: the remaining 22 weak-only articles re-sourced

Research checked on 26 October 2026. Follows `history-sourcing-pass-2026-10-26.md`,
which left 22 articles resting only on weak sources. All 22 now cite at least one
read primary, official, academic or reputable-press source, with per-sentence
inline citations; their entries gained the same sources. No scores, profiles or
timelines changed. A final mechanical audit finds zero weak-only articles
(945 → 947 article files with the two Comoros additions counted separately).

## Fixed first: two YAML colon breaks (my error)

Two added source titles/locators contained an unquoted `: ` and broke
`changes.yaml` parsing (`archive-sources check` failed): the Ravin locator and,
after the first fix, the Swiss legalize-it title and the Toklas Scientific
American title. All three are quoted now, and every YAML file in the repo
parses (changes, 947 articles, 291 country files). Lesson: quote any added
title/locator containing a colon, and re-run the repo's own parse after
touching `changes.yaml` — the archive script caught what the build had not
yet run against.

## The regression test proved itself

The new history-scope citation test failed on two of my own edits
(US-1986 never cited [@2]; La Guardia cited [@3] with two sources) and passes
again after correction (40/40). The audit heuristic also over-flagged
Venezuela (type `law` on a blogspot host reproducing the full judgment);
that article was already properly sourced, and today's Pandectas read confirms
judgment 387 of 1 June 2017, not 383 — the URL slug's number is wrong, not ours.

## Articles and entries re-sourced (sources actually read)

- UK 1973: legislation.gov.uk introduction (in force 1 July 1973) and Schedule 2 (Class B listing).
- Canada 1961: Supreme Court, R. v. Malmo-Levine (NCA statute, Single Convention, 6-month repeal, 1996 CDSA).
- Germany 1971: Federal Constitutional Court BVerfGE 90,145 (1970 bill rationale, Geneva/Opiumgesetz continuity).
- US 1986: CRS R45074 (1970 repeal, 1984/1986 minimums, marijuana thresholds, 100:1 to 18:1).
- NZ 2020: IDPC referendum report (numbers, non-binding, bill scope).
- Finland 1972: Hakkarainen & Kainulainen chapter, Stockholm University Press (government bill defeated 92-80 after drawing lots).
- Sweden 1993: Nordic Alcohol and Drug Policy Network country report (1988 criminalisation, 1993 imprisonment).
- Switzerland 2023: hanflegal.ch Narcotics Act commentary (19b, 2017 and 6B_911/2021 rulings) and LegalClarity (CHF 100, June 2023 protection). Ruling date is 19 June 2023; the entry's 2023-07 month is left for entry review.
- US 2016: Ballotpedia's four state pages (each citing its Secretary of State) plus Arizona 205; Maine recount corrected to abandoned 17 December and Nevada felony/25-mile details retained on the Wiki Nevada page.
- Leary 1969: Cornell LII full opinion (Laredo crossing, Harlan, self-incrimination, reversal).
- Ravin 1975: Alaska Legislature bill file quoting Ravin (Art. I sec. 22, Ravin burden).
- Young 1988: CRS RL33211 (1972 petition, ruling and quote, rejection, later petitions).
- DC 2015: Ballotpedia Initiative 71 timeline (57,000 signatures, 64.87 per cent, budget clause, 26 February 2015).
- Toklas 1954: Scientific American Food Matters history (Gysin, Harper omission, Time 1954 review, counterculture).
- La Guardia 1944: Scientific American DEA history piece (first official body, findings, Anslinger dismissal).
- Trinidad 1925: Ackerman, Points/ADHS (indenture, 1885/1894 ordinances, missionaries, 1925 cut-off stays Wiki).
- Sri Lanka 1961: LankaLaw Act text, Ceylon Government Gazette Schedule (opium certificates, practitioner definitions) and Asia IP Law (Corporation, police-seizure supply, 2017 plan).
- China 1934: Fewkes & Khan, Asian Highlands Perspectives (legal taxed cheras trade via Ladakh; 1934 date stays Wiki).
- Brazil 1987: BBC Witness History (September 1987, 1.5 kg tins, quality, cultural aftermath); Solana Star/Tunamar specifics stay Wiki.
- Comoros 1975/1978: Howard W. French, Transition 73 (Soilih legalized marijuana, veil ban, youth politics, execution). The 1975–78 dates and reversal mechanics stay Wiki; no primary text of the decrees was reachable.

## Verification

`npm run build` (4,269 pages), `npm run history:test` (40/40), `npm run
answers:test` (27/27). Spot-checked built pages for all edited articles: no
literal citation marks, 4–26 rendered citations each.
