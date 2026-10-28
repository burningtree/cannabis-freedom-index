# Tod Mikuriya: portrait, Buyers’ Club photograph and Proposition 215 — 28 October 2026

Expanded the People entry with three visual elements: the NLM portrait with his book, Rich Gerharter’s
1994 Buyers’ Club photograph, and a ballot-pamphlet detail from Mikuriya’s papers. Added the 1995
patient study, the disputed authorship of Proposition 215’s catch-all, the medical-board details, and
the CCRMG/SCC/*O’Shaughnessy’s* legacy.

## Images and reuse

| Use | Asset | Source / credit | Reuse status |
|---|---|---|---|
| Lead: Mikuriya holding *Marijuana: Medical Papers* | `tod-mikuriya-medical-papers-nlm.jpg` (804 × 1200) | [NLM, Circulating Now, “Tod Mikuriya Papers Now Available for Research”](https://circulatingnow.nlm.nih.gov/2020/02/25/tod-mikuriya-papers-now-available-for-research/); NLM Tod Mikuriya Papers, MS C 633, Box 4, Folder 32 | The NLM caption names no photographer. NLM’s finding aid says the donor’s copyrights were transferred to the public domain, but also that archival collections contain mixed copyrights, that NLM does not grant publication permissions, and that users must assess third-party rights. No open licence for this specific photograph was confirmed; no permission was obtained. Used under the project’s documented policy for a well-sourced photograph, with credit and no claim of permission. |
| 1994: interviewing at the San Francisco Cannabis Buyers’ Club | `tod-mikuriya-sfcbc-1994.jpg` (593 × 492) | [O’Shaughnessy’s, “Cannabis Medicinal Uses at a ‘Buyers’ Club’”](https://beyondthc.com/mikuriyas-1995-study-of-sfcbc-members-never-before-published/), photograph by **Rich Gerharter**, January 1994 | No open licence found. O’Shaughnessy’s/BeyondTHC reserves rights. Permission was not obtained. Used under the same project policy; the article credits Gerharter and links the source. |
| 1996: Proposition 215 ballot entry | `prop-215-ballot-1996.jpg` (886 × 220, detail) | NLM Tod Mikuriya Papers, MS C 633, Box 9, via [the NLM article](https://circulatingnow.nlm.nih.gov/2020/02/25/tod-mikuriya-papers-now-available-for-research/) | The underlying November 1996 California ballot pamphlet is an official state publication; the NLM scan comes from Mikuriya’s papers and is subject to the same mixed-rights statement as the collection. No permission was obtained; used under the same policy. The image was cropped to the Proposition 215 row and the start of the next row; no text was retouched. |

The NLM lead image is the largest published file (804 × 1200). The Gerharter image is the largest
published file in the O’Shaughnessy’s article (593 × 492). The ballot scan is 886 × 1200 in full; the
article uses a 886 × 220 detail so the measure number, title and summary remain readable. None of the
images is a screenshot or a generated likeness.

## Proposition 215 text

The NLM ballot photographs show the pamphlet’s summary and arguments, not the full statutory text.
The article therefore uses the ballot detail as the archival image and a clearly labelled **modern
typeset reproduction** of the exact clause from the [California Secretary of State’s text](https://vigarchive.sos.ca.gov/1996/general/pamphlet/215text.htm).
No document was fabricated and the typeset passage is not presented as an original scan.

The article attributes the catch-all to Mikuriya only as a long-standing credit. It records Dale
Gieringer’s caveat, reported by O’Shaughnessy’s, that Mikuriya may not have written the sentence
himself but that his Buyers’ Club study supplied supporting data.

## Historical checks

- **Book:** Google Books catalogues *Marijuana: Medical Papers, 1839–1972* as a 1973 Medi-comp Press
  book (465 pp., ISBN 0960070419). The 1972 in the title is the end of the literature collected, not
  the publication year. NLM and NORML say 1972; Reed’s obituary dates an edition to 1994. The entry
  follows the catalogued 1973 first edition and does not repeat the unsupported 1994 reissue claim.
- **1995 study:** read the O’Shaughnessy’s presentation of the manuscript: 57 members interviewed,
  51 men, 41 HIV-positive, structured questionnaire, symptoms including insomnia, depression, anxiety,
  panic attacks, arthritis and other pain, and alcoholism. The manuscript was never published in
  Mikuriya’s lifetime and is in the NLM collection. The entry explicitly says these are patient-reported
  observations, not controlled clinical evidence.
- **Medical Board:** NLM and HerbalGram give the 2000 accusation and 2004 outcome. HerbalGram names
  the alleged grounds (gross negligence, unprofessional conduct, incompetence for failing to examine
  patients properly) and the penalty (five years’ probation, $75,000 fine, appeal, practice under a
  state-appointed supervisor). O’Shaughnessy’s reports the accusation covered 46 cases and that
  supporters said the complaints came from police, sheriffs and prosecutors rather than patients. The
  entry gives the board’s stated standard-of-care case and the supporters’ interpretation separately.
- **Legacy:** SCC’s own founder page, Reed’s obituary, NLM’s finding aid and O’Shaughnessy’s support
  the 1999 CCRMG/SCC founding and the 2003 launch of *O’Shaughnessy’s*. NORML supplies the estimated
  9,000 patients and the 2006 Lester Grinspoon Award.

## Verification

`npm test` passed. The selected Astro build for `culture/people/tod-mikuriya`, `culture/people` and
`country/us` passed and rendered the entry and its card. The lead, Buyers’ Club and ballot images were
inspected at 1280 × 900 and 390 × 844; no horizontal overflow. The lead portrait keeps Mikuriya’s face and the book. The People card and square atlas thumbnails use `position: top`, so they show his face rather than a headless torso; this required passing the existing `image.position` field through `CultureCards.astro` and `CultureList.astro`. The ballot detail keeps the measure number, title and summary readable.
