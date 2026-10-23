# Iraq: expanding the legal articles and recovering treatment corrections

23 October 2026. The previous research turn made progress by locating readable primary
sources and identifying concrete next actions. This continuation follows those leads. Baseline
snapshot: 2,866 history records, 750 articles; Iraq nineteen records and two articles.
Inputs, snapshots, downloaded Gazette issues, normalized Arabic extractions, page images and
verifiers: `tmp/history-iraq-articles-2026-10-23/`.

## Deliverables

Five new articles: 1938 possession/trade controls, the 1967 penalty increase, the mixed 1979
law, the 2017 replacement law and the 2018 treatment-reference correction. Two existing
1965/1968 articles now use sentence-level inline citations. Two new history entries: the
January 2018 correction and three Badra sentencing decisions in February 2019. Four existing
entries revised: 1938, 1967, 1979 and 2017. Iraq now has twenty-one records and seven articles.

The prior 2017 entry called the treatment protection an amnesty. The revised prose describes
conditional protection from prosecution and court treatment options. Removed its amnesty tag
and used treatment/sentencing/trafficking. The correction is `other`; the Badra judgments are
`enforcement`, with court/sentencing tags. No new score vectors are invented.

## Sources read, dates and limits

### 1938, 1965, 1967 and 1979

Read the displayed articles 1–9 of the [1938 Dangerous and Narcotic Drugs Law](https://iraqld.msla.iq/legislations/showlegislation?sc=290920052658504)
in the official Iraqi Legislation Database. Cannabis, resin and preparations are explicitly
included in article 2. Articles 3–9 cover manufacturing licences, import/export and transit
permissions, professional/prescription possession, records, returns and prescription retention.
The view displays **only these articles**. No unobserved later penalty, commencement or
repeal clause is attributed to the 1938 text. Date remains year-only; the metadata shows
signature and publication dates but the operative start clause was not recovered. The article
uses the original 1965 repeal clause for the later replacement, not a guess about 1938.

Reread the retained full original [1965 law](https://wiki.dorar-aliraq.net/iraqilaws/law/4070.html)
in `tmp/history-iraq-gap-2026-10-21/law1965.txt`, especially original article 2's supervised
fibre-and-seed exception, article 14's fine/prison alternatives and repeal/commencement.
The retained original matters because later consolidated text removes the crop exception.
The 1965 article's earlier verified 1933 facts are retained with their original citation;
this pass did not recover a new original 1933 copy or write a new 1933 article.

Downloaded and read the full original [1967 amendment](https://wiki.dorar-aliraq.net/iraqilaws/law/15569.html)
from Dorar's Gazette transcription. Article 14 distinguishes personal-use possession/growing
(one–five years **and** 100–500 dinars) from supply, including gifts, and commercial growing
(temporary hard labour and 500–2,000 dinars). Specified officials face lifelong hard labour.
Read hosting/knowing-presence offences, family exceptions, encouraging minors, reporting,
confiscation and destruction. Publication colophon confirms **6 February 1967**, not its
24 January signature. No modern numerical conversion of historical hard-labour terms is used.

Downloaded/read the full [1979 amendment](https://wiki.dorar-aliraq.net/iraqilaws/law/12843.html).
Article 2 deletes the industrial-crop exception; article 7 gives three–fifteen years for
personal use and conditional six-month treatment for dependence caused by a medical condition,
with early release on medical evidence and court decision. It also retains special military
penalties and changes licensing/reporting links with the police narcotics office. Stated
reasons discuss treatment/rehabilitation under the amended treaty. The existing event's
**19 November** publication/commencement comes from the official Gazette metadata read in the
21 October audit, not Dorar's **30 October** signature header. The new article preserves that
separation. This mixed law remains `other`.

Direct lawbookid URLs were blocked in this run; indexed `sc` views were readable for 1938
and parts of 2017. Some Dorar web opens returned 503 while verified curl requests worked.
No TLS verification was disabled. Older 1968/2002/2003/2004 factual material is unchanged
from the documented primary-source audit of 21 October; this pass adds adjacent citations.

### 2017 original law and January 2018 correction

Followed the [Justice Ministry's Gazette index](https://moj.gov.iq/view.3230/) to download the
actual [issue 4446, 8 May 2017](https://moj.gov.iq/upload/pdf/4446.pdf). Extracted the Arabic,
normalized presentation forms/bidi controls for searching and visually inspected printed
pp. 23 and 29 (PDF pp. 25 and 31). Read articles 28, 32, 37, 39–40, 50–51.

Article 32 gives **one–three years and 5–10 million dinars** for the listed personal-use
acts, including possession and growing. Article 40 protects voluntary presentation to a
specialist treatment hospital from prosecution, with medical observation/treatment procedures
and notification of the court on noncompliance. This is not a general pardon clearing old
convictions. Article 28 retains death/life for the specified trafficking and growing-for-trade
conduct. Article 50 repeals the 1965 law while saving consistent subordinate rules temporarily.

The law was issued by the president on 14 February and published **8 May 2017**; article 51
starts it after ninety days. The official database gives 6 August, while a Judicial Council
commentary says 8 August and also misstates the Gazette issue. The existing year-only event
date is retained rather than silently treating the commentary's inconsistent dates as settled.
The article does not introduce an unsupported exact day.

The original article 39(1) visibly refers to **article 33**, the premises/hosting offence,
instead of personal-use article 32. Followed the [January 2018 Ministry index](https://moj.gov.iq/view.3623/)
to the actual [issue 4477, 15 January 2018](https://moj.gov.iq/upload/pdf/4477.pdf), printed
p. 27 (PDF p. 29), and visually read the entire correction. It changes **39(1)'s reference
from 33 to 32**, corrects pharmacists' psychotropic schedules in 17(3) to 6/7/8 and replaces
an August 2017 correction. The new event uses the Gazette publication date.

The corrected court options include hospital admission for proven dependence, outpatient
psychological/social-clinic attendance once or twice weekly, and follow-up after discharge,
with medical reports informing court decisions. The change is expressly about **39(1)**.
Other references to article 33 elsewhere remain as printed; this pass does not silently
correct them or claim the notice rewrites all refusal/noncompliance provisions.

A [consolidated reproduction](https://ailawyeriq.cloud/ar-IQ/laws/details?id=189) was downloaded
and read as a lead, but the original Gazette and correction support the final article.
The original-law distinction prevents retroactively quoting the corrected reference as the
exact text issued in February 2017.

### Three Badra judgments and their later review

Read the full [Judicial Supervision Authority study published 13 June 2021](https://www.sjc.iq/view.68465/),
96/2019, especially its procedural history, three numbered judgments and recommendations.
It identifies three Badra judgments **27, 28 and 29/2019, dated 13 February 2019**, imposing
one-million-dinar fines under personal-use article 32 with general Penal Code mitigation.
Inspectors said that choosing only a fine under mitigation did not permit reducing it below
the drug statute's five-million minimum. They recommended challenging the judgments and an
investigation. That is what the new enforcement entry describes.

The event is dated to the actual judgments, not the website's later publication. It does not
claim the recommendations were a new nationwide enactment, report an unverified final appeal
outcome, or call these cannabis cases: the review does not identify their drugs. The review
supplies evidence that fine-only mitigation was considered possible in these cases, not
national proof that fines are typical. The 2017 article uses it for the later sentencing debate.

## Profile and outstanding score reconstruction

Three scored explanations and the consequences block now cite the primary law, correction
and judicial study inline. The text distinguishes ordinary personal growing from growing for
trade and supplies the actual personal-use range and conditional treatment routes. Current
scores, classifications and all other profile blocks are preserved.

**The older score reconstruction remains open.** A cultivation-only 1933 first step still
projects an all-zero interval through 2017. Earlier work identified that as too coarse, and
the new articles do not validate it. Resolving the full 1933/1938 penalties, industrial and
prescription permissions, historical sentencing and later capital-punishment suspension
requires a coordinated score pass. Current practice also needs cannabis-specific evidence;
a few generic fine cases do not substantiate a new typical-enforcement score. Existing
unscored explanations for historical reforms remain in place.

## Preservation and verification

Concurrent work added fifteen unrelated events and revised twenty unrelated records during
this research. These additions/revisions were explicitly inspected and saved in
`concurrent-additions.json` and `concurrent-revisions.json`; the scope checker preserves the
observed versions and compares every other record against the initial snapshot. It also
checks **all existing `before` vectors**, including those concurrent revisions. No staging,
commit, reset, or deletion of others' files was performed.

All seven articles have 350–500 words and four sections. The verifier uses the actual citation
functions, requires every listed source to be used, checks block-local keys, related/internal
links, categories/tags and current-score preservation. Final build/render checks and deletion
of the temporary compiled site follow below.

Final production build passed: **3,772 pages in 34.03 seconds**. All 178 numbered
article citation links resolve to unique reference targets. Verified the two new event pages,
profile/API treatment wording, unchanged current score 2, five tag pages and clean JSON/CSV
exports. Scoped preservation, article length/citation and whitespace checks passed. Current
worktree totals, including concurrent work, are **2,883 history entries and 770 articles**;
this batch contributed two entries and five new articles. Deleted the temporary compiled
`site/` after inspection; research inputs, extracted text, page images, verifiers and build log
remain. The broader history-coverage objective is still active.
