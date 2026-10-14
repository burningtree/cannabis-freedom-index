# Cannabis and Culture — first research pass, 14 October 2026

Local source: `books/Cannabis and Culture (Vera Rubin (editor)).pdf`. The copyright
page confirms Mouton, 1975; ISBN 90-279-7669-4, with Aldine distribution ISBN
0-202-01152-6. Title/copyright and key cited pages were inspected visually. The
PDF contains 640 viewer pages. Printed pages 1–266 have an offset of +14; the
28-page plate section changes the offset to +42 from printed page 267 onward.

This is a **selective chapter review**, not a cover-to-cover reading. The
[tracked catalogue](../books.yaml) indexes all 36 chapters, distinguishes reviewed
pages from indexed-only chapters, records file identity and queues specific
follow-ups. [BOOKS.md](../BOOKS.md) defines the workflow for future local books.
The root `.gitignore` now explicitly excludes `/books/`; no book, extracted full
text or scanned page was added to published assets or tracked source files.

## Evidence applied

| Chapter / printed pages reviewed | Application |
| --- | --- |
| Vera Rubin, Introduction, 1–10 | New August 1973 Chicago conference history event and 453-word article; dates of conference and publication separated |
| Sula Benet, selected 43–44 | Siemieniotka's reported ancestor-related meaning; continental St Andrew's marriage-divination comparisons in the Scottish Halloween entry |
| Marie Alexandrine Martin, selected 63–70, 73 | Ganja vocabulary source; named Cambodian soups and preparations, Lao soup stems and the flavour motive in South-East Asian cooking |
| Brian M. du Toit, selected 92–97 | Dagga's early botanical ambiguity: colonial references to roots or cakes cannot all be identified as cannabis |
| Lambros Comitas, selected 119–124 | Ganja as an Afro-Jamaican social institution with several consumption contexts, not only a smoking practice |
| Roberto Williams-Garcia, 133–145 | New `traditions/la-santa-rosa`: altar care, ritual specialists, music, different experiences and limits of the ethnographer's record |
| Roger Joseph, 185–193 | Kif's period-specific meanings, dismantlable *sibsa*, market cafés and matchboxes; qualified the suggestion that Rif smoking was inherently mystical |
| Helen Codere, 217–226 | New `language/injaga`; corrected an overstatement in `articles/rwanda-medical-2021.md` about exclusive use by the Twa |

The new culture entries are 554 and 527 words before the final small wording
adjustment in La santa rosa; both remain within 500–900 words. The seven expanded
existing culture entries remain within that range. The revised Rwanda article
remains within the compact history range. All authored/modified content records
carry `model: gpt-6` and the 14 October review/writing date.

## Interpretive limits

- Codere used open-ended comments on photographs from 252 respondents during
  1959–60 political research. Respondents mostly associated smoking with Twa men,
  while mentioning exceptions. This is not a national prevalence survey, a census
  of consumption or proof that cannabis causes the violence attributed to users.
  The source's prejudicial social vocabulary is identified rather than reproduced
  as a neutral account. The historical distinction between *injaga* and the pipe
  *urumogi* is not declared an exhaustive modern dictionary definition.
- Williams-Garcia's chapter describes the Gulf-region community and San Pedro but
  does not name its language/ethnic affiliation in the cited account. No Otomí,
  Tepehua or other affiliation was invented. Observations in 1953 are not the date
  of origin. The chapter documents chewing, not eyewitness ritual smoking. It
  does not establish a religious-law exemption or survival of the rite today.
- Joseph's 1960s Rif study is not a statement of Morocco's current law. His own
  inference that production was lawful is not a verified statutory conclusion.
  His origin hypotheses and soldiers' oral-history stories were not imported as
  established facts. Contrasts with younger users and religious disapproval are
  restricted to his study setting.
- Benet's ancestor-related soup interpretation is not assigned to every Silesian
  family. Her strong biblical etymology and plant-diffusion hypotheses and claims
  about intoxication from harvesting hemp were not adopted as established facts.
- Martin's medicinal descriptions are historical reported uses, not clinical advice.
  Printed p. 73's food passage was checked against the PDF image. The generic
  Cambodia “by 1961, to comply with the Single Convention” statement was removed:
  the treaty is not evidence of automatic domestic prohibition. The table now
  distinguishes the earlier cultivation restriction reported by Martin from the
  later 1996 general law and describes observed market sales, not verified legality.

## Research leads retained

Martin p. 66 cites `kram No. 10 NS` dated 30 May 1955 and a Phnom Penh narcotics
bureau `kret No. 481.72 PRK` dated 14 July 1972. Obtain the originals before dating
Cambodia's first restriction or adjusting scores. Her attribution of the earlier
edict to a named monarch requires checking against the stated date. Neither a
new scored ban nor an unverified legal commencement was created here.

Remaining chapters offer work on Egypt, Moroccan Jews in Israel, Réunion, Nepal,
India, Brazil, Colombia, Canada, comparative plants and anthropology/law. These
are indexed-only in this pass; extraction or a table-of-contents entry does not
count as reading. Their specific research questions are in the catalogue.

## Validation

Production build passed: **2,851 pages**, using `UV_THREADPOOL_SIZE=1` and
`VIPS_CONCURRENCY=1` to limit build resource use. New atlas pages and the conference
article render their bibliographic citations, including authors and printed page
locators, without local file URLs. The expanded cooking and Rwanda pages also
render their new evidence. No books directory is published. Front matter, history
and catalogue YAML parse;
all eleven authored/modified content files cite the book using structured print
sources. The PDF is ignored and no files under `books/` are tracked. Mexico,
Rwanda and Cambodia score chains each report zero flagged steps; no country scores
or country profiles were edited in this book pass. Whitespace checks passed.
