# Research pass: unchecked queue cleared, Iraq 1933 article

Research checked on 26 October 2026. Two chunks: (1) the seven remaining
unchecked entries were re-read against their sources and marked
`checked: true`, with the Baltic 1940 entries gaining two stronger sources;
(2) the top article-backlog item (Iraq 1933, importance 8, first ban,
population 47M) gained a new properly sourced article plus two verified
entry sources. No scores, profiles or timelines changed.

## Unchecked queue is now zero (3175 checked, 0 unchecked)

- Afghanistan 1973: AAN Myth of Afghan Black plus FRUS volume E-7 document
  350; Zahir Shah outlaws cultivation with US funding, against FRUS 1971
  concern. Marked checked; wording (possession 1, cultivation 1) unchanged.
- Estonia/Latvia/Lithuania 1940: kept as annexation anchors with cautious
  wording (Soviet decree's local application date unconfirmed). Gained the
  Istmat 27 October 1934 decree (Articles 1, 5-7) and the Baltic occupation
  overview as second and third sources. Marked checked.
- League 1935: kept as decade summary; Mills shows a six-year sub-committee
  with no 1935 decision. Marked checked.
- Morocco 1890: kept as conventional/mythical date per Chouvy (no written
  evidence for the attributed Rif privileges). Marked checked.
- Egypt 1884: kept unresolved; IHDC March 1879 account contradicts the
  conventional 1884 cultivation date, which instead matches an 1884 measure
  on export sale of confiscated hashish. Marked checked.

None of the seven supports a firmer date or a score move on the sources
read; the Baltic entries are the only ones whose sourcing materially
improved.

## Iraq 1933: new article, two verified entry sources

New `articles/iraq-hemp-cultivation-law-1933.md` (365 words, per-sentence
citations, all three sources cited, all marks resolve; history:test 40/40,
answers:test 27/27, build 4270 pages).

Sources actually read this pass:

- Al-Mansour Journal, A.H. Al Timimi, "Iraqi Criminal Policy To Combat The
  illegal Use of Narcotic Drugs and Psychotropic Substances", Vol. 20 No. 1
  (2013), abstract: the first law released in Iraq is "the law preventing
  cultivation hemp hashish Indian opium poppy No. (12) 1933", followed by
  the Dangerous Drugs Act (44) 1938; both replaced by Drug Law 68 of 1965.
  Entry URL fixed to the working `index.php/journal/en/article/view/238`
  form (the old `/journal/en/...` path redirects to the journal homepage).
- UN Digital Library E/NL.1969/48-50 (22 July 1970): the Iraqi government's
  own English text of Narcotic Drugs Law 68 of 1965. Article 15 repeals "Law
  prohibiting the cultivation of Indian Hemp plant and Opium poppy No. 12 of
  1933" alongside Law 44 of 1938; Article 16 gives effect on gazette
  publication; signed at Baghdad 8 April 1965. Added to the entry as a
  third source. Verified via `pdftotext` extraction, not the search snippet.
- Iraqi Legislation Database page for Law 12 of 1933 (Gazette 1248, 8 May
  1933) still returns HTTP 403 to direct fetch; penalty/uprooting/reporting
  details in the article rest on the previously read checked entry citing
  that page (Articles 1, 3-5; signed 1 May, effective on publication).

## Still open (not touched)

- 60 estimated first bans remain; biggest-population candidates (ET, VE, CU,
  BO, CM) need primary sources not yet found. Small-territory ranges (BM,
  KY, GI, MO, etc.) are conventional 1925-1961 windows.
- India chain warning (`india-ndps-act-1985` starts below unregulated).
- `source-archive.json` working-tree modification predates this pass; left
  uncommitted.
