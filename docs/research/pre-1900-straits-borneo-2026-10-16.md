# Straits Settlements and North Borneo: excise control before 1900

16 October 2026. **One new record, two corrected records, three new articles.**
No current country profiles or score values changed. The 1870 entries retain their
stable IDs despite the correction from blanket-ban language to licensed excise control.

## Straits Settlements, Ordinance IV of 1870

Downloaded the complete [1886 official compilation](https://archive.org/download/actsandordinanc00settgoog/actsandordinanc00settgoog.pdf),
compiled by **John Augustus Harwood**, volume **I**, London, **Eyre and
Spottiswoode**, **1886**. Read the title/imprint, relevant statutory provisions and
amendment notes in the associated OCR. The PDF itself has almost no usable text
layer. Rendered and visually checked printed pp. **146, 165 and 167**, corresponding
to PDF pp. **171, 190 and 192**. Also read section 95's definition at printed p. 177
in the archive OCR.

- Printed p. 146 dates Ordinance IV **15 July 1870**. Its preamble explicitly
  includes excise revenue on bhang. Sections 1–2 authorize exclusive licensed
  rights in preparation and sale under the Toddy Farmer concession.
- Section 47 (p. 165) limits preparation/manufacture and import/export to the
  concession, allowing imports for sale to the farmer. Goods must go directly
  to the principal shop; refusal to purchase requires re-export. Penalty up to
  **100 dollars** and forfeiture.
- Section 48 addresses unauthorized dealings and knowing possession of supplies
  outside authorized purchases, with a burden of proving purchase on the accused.
  Do not paraphrase this as possession of all cannabis being forbidden.
- Sections 53–56 (p. 167) explicitly provide for licensed retail farm shops,
  numbers/locations under official control, multilingual displayed rules,
  **12-dollar annual licence fee** plus identifying-sign/mark charges, and inspections.
- Section 95 (p. 177) defines bhang through intoxicating Indian-hemp products and
  hemp used for smoking, chewing or eating. It is not an express ban on all fibre.

The compilation **incorporates later amendments**. The opening note identifies
1879 and 1884 amendments, including to section 95. This pass does not claim that
all consolidated wording was enacted unchanged in 1870. The original 1870
session-law printing and a separate commencement notice remain retrieval targets.
The entry date now gives the ordinance date, explicitly qualified in the articles.

Corrected `singapore-ban-1870` and `malaysia-straits-ban-1870`: titles, descriptions,
category `tightening`, date `1870-07-15`, primary citation, related links and articles.
The latter is limited to **Penang and Malacca**, not all Malay states. A legal
route through licensed shops disproves the former unqualified blanket-ban account,
while leaving significant prohibitions on unauthorized activity.

**Score-history limit:** the existing `before` values and later score steps were
preserved. Structural chain checks do not establish that the implied post-1870
scores accurately represent a licensed monopoly. That allocation still requires
review using the complete subsequent legal history, including when prohibition
replaced licensing. No unsupported numerical reconstruction was made here.

## North Borneo, reported 1891 ordinance

Read the title and relevant passage in the [League of Nations compilation](https://dspace.gipe.ac.in/xmlui/bitstream/handle/10973/54173/GIPE-020838-02.pdf?isAllowed=y&sequence=1).
The relevant document begins at **PDF p. 10**: *Traffic in Opium: Summary of Answers
to the Opium Questionnaire, 1921*, **C.171(1).M.88(1).1922.XI**, dated **1 June 1922**.
The PDF also contains earlier documents, so its first page's 1921 date is not the
correct publication year for this summary.

Read and visually checked **printed p. 29 / PDF p. 38**, “Indian Hemp.” It
summarizes North Borneo's reply as citing an **1891** ordinance that authorizes a
bhang/ganja sales monopoly and forbids sale except under licence. The League
explicitly lacks information about whether the monopoly was operating and how
extensive use was. No chapter number, day, penalty or cultivation/possession ban
was inferred.

Added `malaysia-north-borneo-bhang-licensing-1891` and article, unscored regional
context. Checked status refers to the limited statement verified in this official
summary; neither the original ordinance nor the full government reply was read.
The report is an official source about reported law, not the original enactment.

The same 1922 page says bhang use was then prohibited in the Straits Settlements.
That does **not** date the change to 1870; the transition between the 1886
consolidated licensing text and this later report remains a research target.

## Retrieval notes

Archive text searches used `actsandordinanc00settgoog`, `cu31924080340296` and
`actsandordinanc00garrgoog`. Only the first supplied the relevant excise provisions
in the downloaded text; no substantive cannabis reading is claimed for unrelated
volumes. Downloads and renders stay in ignored `tmp/pre1900-straits/`.

## Validation

- `npm run build` passed: **3,056 pages**.
- All three generated article pages and JSON export records were inspected for
  IDs, dates and titles.
- Singapore and Malaysia structural score-chain checks: zero flagged steps.
  This does not resolve the historical score allocation noted above.
- Existing `before` score values were compared with the index and preserved.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback lookups returned no copy for either new citation URL; the attempts
  were recorded while preserving existing archive entries.
