# Early bans: a different source base (15 October 2026)

Continuation of the [earlier article pass](earliest-ban-articles-2026-10-15.md).
Two new historical context entries and two articles were added; one existing
Ottoman description was corrected. Country profiles and all scores are unchanged.

## New material actually read

### Mughal India: Jahangir, 1609

- **Primary narrative:** *The Tuzuk-i-Jahangiri; or, Memoirs of Jahangir*, volume I,
  Alexander Rogers translation revised/edited by Henry Beveridge, Royal Asiatic
  Society, 1909, printed pp. 154–157. Downloaded the
  [scan](https://www.rarebooksocietyofindia.org/book_archive/196174216674_10152026750366675.pdf),
  extracted the relevant text and visually checked printed p. 157 (PDF p. 177).
- [Packard Humanities Institute transcription](https://persian.packhum.org/text/011001081/2)
  was also opened. It is another presentation of the same translation, not an
  independent witness. The RBSI catalogue and Wellcome catalogue establish edition
  context; they are not independent evidence that the order was enforced.
- The fourth-year heading on p. 154 begins in March 1609; the p. 157 order occurs
  in the succeeding monthly sequence, after a reference to Shaʿban. Retain year-only
  precision. No exact Gregorian day has been independently checked.
- The page distinguishes **bang** from **buza (rice spirit)** and prohibits their
  bazaar sale alongside gambling. It supplies no cannabis-specific penalty and
  does not establish a comprehensive cultivation/possession/private-use ban.
- Applied to `india-jahangir-bang-sales-ban-1609` and its article. An imperial
  self-report supports issuance as reported by the ruler, not measured compliance.
  The original Persian and an independent administrative order were not inspected.

### Safavid Iran: public prohibition, 1534–1535

New authors used instead of relying on Abel or Guba:

- **Rudi Matthee**, *The Pursuit of Pleasure* (Princeton University Press, 2005),
  chapter 3, printed pp. 74–75, especially p. 75 note 29. Title/copyright and the
  relevant pages were read in a [web text reproduction](https://dokumen.pub/the-pursuit-of-pleasure-drugs-and-stimulants-in-iranian-history-1500-1900-9781400832606.html).
  The public citation gives the verified print bibliography rather than treating
  the mirror's upload date as the book's publication year. The document collection
  cited in note 29 and the original inscription remain uninspected.
- **Jean Calmard**, [EPHE conference report](https://www.persee.fr/doc/ephe_0000-0001_1990_num_7_1_7481),
  published 1995, p. 221: manuscript-based discussion of Tahmasp's memoir,
  British Library Or. 5880 through fol. 29a. Read the report, not the manuscript.
- **Ranin Kazemi**, [*Modern Asian Studies* 54(2), 2020](https://www.cambridge.org/core/journals/modern-asian-studies/article/abs/doctoring-the-body-and-exciting-the-soul-drugs-and-consumer-culture-in-medieval-and-early-modern-iran/E9450F2B255A84EA772D80C2B0C9DDD2),
  **publicly accessible note 115 only**. Full article is paywalled; no claim to
  reading it in full. The note confirms inclusion of bang and qualifies opium.

Applied to `iran-tahmasp-bang-prohibition-1534` and its article. The sorting year
1534 represents **941 AH/1534–1535**, not a verified January date. Personal
repentance in 1532–1533 is kept distinct from public promulgation. An earlier
1526 anti-vice order is a further lead, but the reviewed description does not
identify cannabis precisely enough to add a separate cannabis event.

## Ottoman 1725: remove a conflation

Re-read Ram's *Intoxicating Zion*, chapter 1, Ottoman Syria passage, with notes
15–16 in the local EPUB. Note 15 traces the use prohibition to Sariyannis p. 315.
Note 16 separately cites the *Pall Mall Gazette*, **19 May 1876**, through Hilliard's
press-cutting compilation. The narrative juxtaposes these different references;
it does not establish that the cultivation circular was issued in 1725.

Removed that assignment from `turkey-ottoman-hashish-decree-1725`. Keep the
attributed 1725 use prohibition and the original-source limitation. Ram's catalogue
record now explicitly identifies this follow-up issue.

A web reproduction of *Opium's Orphans*, ‘Drug Prohibition at Its Zenith’, gives 1875 for a cultivation
circular, but the contemporary report and original circular were not inspected.
**No new 1875 or 1876 cultivation-ban event was added.** Sariyannis's publisher
record and author-upload listing were found, but full-text retrieval failed.
They remain retrieval leads, not newly read substantive sources.

## Verification and remaining work

- `npm run build` passed: 3,035 pages in the shared checkout, including concurrent
  work. Both new article routes and the corrected Ottoman route were generated.
- Iran and Türkiye chain checks report no flagged steps. India's check retains
  the existing warning that its 1985 scored chain begins at 40. The new 1609
  context event does not resolve that later baseline; no score was invented.
- `npm run books:report` and `npm run books:check` passed after updating Ram's
  selected-reading provenance. Web-only sources in ignored `tmp/` were not
  represented as additions to the user-supplied `books/` inventory.
- New web-source archive lookups all returned **HTTP 429**. Results are retained
  locally in `tmp/early-bans/archive-results.json`; no archived copy was claimed
  and the concurrently modified source archive was left untouched.
- Both unstaged and staged whitespace checks passed.
- Full scans and extracted text remain in ignored `tmp/early-bans/`; none were
  added to public assets. No commit or deployment.
