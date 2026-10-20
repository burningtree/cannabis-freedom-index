# Sierra Leone's missing colonial drug-law history — 21 October 2026

The user requested particular attention to bigger gaps. Sierra Leone had only
five records: 1851, 1920, 1994, 2008 and 2024. This pass adds the documented
1926 ordinance and 1933 official recognition of diamba, writes a 1926 article,
and replaces the generic 2008 summary with its cannabis-specific crop powers.
Baseline: `tmp/history-sierra-leone-2026-10-21/changes-before.yaml`.

## Sources actually read

- Downloaded and extracted the complete Chapter 154 revised Dangerous Drugs
  Ordinance from Sierra Leone Web's scanned government laws. Visually read
  pp. 1619, 1621–1623: the heading records **10 April 1926**, No. 10 of 1926,
  with amendments Nos. 33/1928 and 22/1932. Sections 1–2 give territorial
  coverage and Indian-hemp definition; sections 9–10 prohibit resin imports,
  exports, production, dealing and possession, cultivation, and nonmedical
  plant dealing/possession; sections 11–13 govern medicinal extracts and
  tinctures, licensing and pharmacy rules.
- The scan is a **later revised text**, not the original 1926 Gazette. Its
  publication year was not established, so no year is invented in its citation.
  The article explicitly identifies the revised edition; exact penalty maxima
  and claims that every rule began unchanged on 10 April 1926 are omitted.
  `other` is appropriate for this statutory milestone because the comparative
  change from the alleged earlier controls is not established. No new score
  vector is invented.
- Reread Duvall, *The African Roots of Marijuana* (Duke, 2019), printed p. 191
  and chapter 9 notes 47–53, pp. 316–317, from the retained complete book text
  in `tmp/book-intake/duvall.txt`. This supplies the 1899 Chamber of Commerce
  testimony, the connection between international terminology and local
  diamba, and the 1933 official report. The 1933 event is attributed to this
  scholarly reconstruction; Duvall's cited US Bureau of Narcotics 1934 annual
  report (published 1935), p. 79, was not independently recovered. No claim
  to have read that original report is made.
- Duvall's note 52 specifically says Akyeampong's 2005 article gives the 1920
  restriction without a source and that Duvall found no listing. Wikipedia
  traces its claim to a 2015 edited book. Searches did not establish the
  original 1920 ordinance or amendment. The original 1920 record is preserved
  with its date, description and score vector but is now `checked: false`,
  with the critical source and colonial tag added. Absence of a located text
  does not prove that no restriction existed. Its date is not silently moved
  to 1926. A Wisconsin-hosted copy of Akyeampong timed out after 30 seconds;
  its contents were not used from snippets.
- Downloaded and read the original Gazette National Drugs Control Act 2008
  No. 10. Sections 2–3 establish the agency; section 43 gives the cannabis
  uprooting power subject to evidential and urgency safeguards; section 92
  explicitly repeals Chapter 154 while saving regulations and proceedings.
  The Act was signed 5 August and gazetted 7 August; the commencement box is
  blank, so the existing year-only event date remains. The article's later
  outcome follows the express repeal, not an inferred replacement.
- Visually read the 2008 Act's printed pp. 14–17 and 70–71. Its schedules
  place cannabis in an anomalous fourth-schedule list headed “Toxic Chemical
  Inhalants”; this is visible on the actual page, not only an OCR ordering
  issue. No cannabis penalty is inferred from the Act's separate prohibited,
  high-risk and risk categories. The old generic hard-drug penalty summary
  is replaced with section 43's unambiguous cannabis-specific rule. Any
  reconstruction of current cannabis sentencing needs separate research.
- A guessed `1994-11.pdf` address returned an HTML error page, not legislation.
  It supplied no new 1994 event. The 2008 Act refers to the Pharmacy and Drugs
  Act **2001**, so a WIPO-hosted 1994 source lead must not be confused with
  that later law. The 2001 transition and the post-independence gap remain
  priorities for a following pass.

PDFs, extracted text and renders remain in ignored
`tmp/pdfs/sierra-leone-2026-10-21/`. Existing prior score vectors are retained
without substantive revalidation. The 1920 first-ban score allocation remains
uncertain; a correct structural chain would not settle that question.

## Categories, tags and writing

The 1933 official description is `culture` (a report of use), tagged traditional
and colonial. The 1926 statutory milestone is `other`, tagged colonial and
imports/exports; it does not claim a newly proven first ban. The 2008 event
retains `tightening` and now uses police-powers and eradication for the directly
verified cannabis rule. The article explains practical offences, the medicine
channel, local context and later repeal, with links to the separate events.

## Verification

All 2,648 baseline records retained, with only the intended 1920 and 2008
records changed and two new events added. Every existing score vector is
identical. IDs, current category/tag keys, title lengths and related links pass
validation. The article has 408 words, four sections and three sources.

The isolated production build passed: 3,381 pages in 28.49 seconds. Verified
dates, categories, descriptions, tags and the downgraded 1920 confidence in the
history JSON; all affected tag-page memberships; article headings, print
citation/ISBN and both source URLs; the revised-edition qualification; and all
earlier/later/country links. Whitespace checks passed. Generated site files
were deleted after verification. Baseline, downloads and build log remain.
Totals: 2,650 events and 589 articles; Sierra Leone now has seven events.

The final thin-country report was reviewed. For the user's larger-gap priority,
future work should weigh missing legal periods, population and the importance
of an unrecorded transition alongside raw event counts. Sierra Leone's
post-independence pharmacy law and the 2001–2008 transition remain substantive
gaps; this batch does not claim comprehensive national coverage.
