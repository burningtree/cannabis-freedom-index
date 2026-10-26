# Bangladesh's 1990–2018 amendment gap

Reviewed 26 October 2026. Reread DATA-MAINTENANCE.md's source, date and
score-chain rules, WRITING.md and the earlier Bangladesh research note.
BOOKS.md's local-source/citation rules had been read in the preceding batch;
no book is used here. This pass follows the earlier note's specific open lead
that the cultivation, use and treatment insertions belong to the 2000
amendment rather than the original 1990 law.

## Sources actually read

Downloaded the [official historical consolidation of the 1990 Act](https://bdlaws.minlaw.gov.bd/act-print-736.html)
with curl after web requests timed out. Parsed the Bengali HTML locally and
read the substantive sections with their amendment footnotes:

- Section 9(3), especially notes 16–18: authorised pharmaceutical use,
  treatment and scientific research; cultivation added to the licensed
  activities; a permit for applying/using and a pass for movement.
- Section 13: prescribing controls, including director-general authorisation
  for prescribing drugs in Classes A and B. No assertion of a functioning
  cannabis patient-supply programme is made from these legal powers.
- Section 15 and note 23: government counselling, treatment and rehabilitation
  centres, licensed private centres, and power to designate government or
  prison hospitals as treatment centres.
- Sections 19(3A)–(3B) and note 32: separate use penalties by class and a court's
  power, considering the offence's seriousness, to order treatment in addition
  to or instead of the punishment. The old Act's classes are not inferred
  from the later 2018 classification: the article states the generic class
  bands without assigning herbal cannabis a class not established here.
- Definition of controlled delivery, section 42A and note 45: written
  government authorisation, suspected offending and an evidential purpose,
  authorisations of no more than three months at a time, and the supervised
  movement of suspicious consignments. The notes attribute these changes to
  Act 39 of 2000.
- Section 42B and note 46, inserted by Act 32 of 2002: fifteen working days
  where someone is caught in the act, sixty in other cases, a reasoned
  seven-working-day extension, written reporting and transfer to another
  officer. The replacement officer has seven or thirty working days;
  failures require reporting within twenty-four hours. The authority can
  record incompetence/misconduct in the annual confidential report and
  take action under service rules if it attributes delay to the officer.

The amendment years are directly established by the official footnotes. The
original 2000 and 2002 amending Gazette texts and their commencement clauses
were not recovered. Events therefore retain **year-only legislative dates**;
no exact day or claim to a particular commencement date is supplied. The
published rules are checked against the actual substantive consolidated text,
not copied from a search summary. This does not represent the consolidation
as an unamended original 1990 text.

Downloaded the actual [UNODC precursor-training manual's Section Four](https://www.unodc.org/pdf/india/publications/precursor_Training_Manual/07_sectionfour.pdf).
A web request returned 404, but curl successfully retrieved the 56-page PDF.
Its text layer is empty. Read-only PDFKit/Vision OCR located the Bangladesh
passage, then the actual page image was rendered and visually inspected:
**printed p. 88, PDF p. 32**. It expressly attributes introduction of
controlled delivery to the 2000 amendment and explains its identification
purpose. Only that passage is cited; the remaining manual is not claimed as
read. The PDF creation date is not treated as a publication date, and an
unverified publication year is omitted from its citation. Research files,
selected extraction and the rendered page remain local in
`tmp/history-bangladesh-amendments-2026-10-26/`.

UN meeting-record search results were leads, but the actual records could not
be opened in this pass and are not cited. Uganda's unrecovered original 1970
narcotics provisions were also rechecked as a candidate gap; the already read
post-repeal consolidation did not recover them, so no new claim was added.

## Changes and score scope

Two checked events and two articles cover the 2000 treatment/licensing and
controlled-delivery amendment, then the 2002 investigation deadlines. The
1990 event receives related links to them; its substantive account is preserved.
Both new entries are classified `other` with explicit unscored explanations.
The first combines treatment, licensed professional/research activities and
an enforcement technique within continuing prohibition. The second changes
investigation procedure and officer accountability. Neither supplies evidence
of an established cannabis treatment-supply programme or a whole-segment change.

Every existing before-vector and the current country file are preserved. This
batch does not verify the inherited enforcement allocation, the 2018 score
transition, the modern medical-access position or the 2026 digital offence.
Those require their own joint review of the original laws and current profile.
The new articles use the 1990 penalty table as background, distinguish the old
Act from today's law, and do not invent arrest outcomes or promise release
when an investigation misses a deadline.

## Validation

Strict comparison checks two additions, only related-link additions to the
1990 record, all existing score vectors and the byte-identical country profile.
The articles have 358 and 379 words, three and four headed sections, complete source use
and valid numbered citations and history links. All 39 history tests and 16
answer/profile tests pass. Production-build and rendered/browser results follow
after verification. Concurrent source-archive staging and edits are preserved.

Final checks: production build passed with **4,203 pages**. Rendered validation
confirmed both articles, unique numbered-reference targets, internal history
links, the 2000s page, both additions in the JSON export and the unchanged
current score of 3. The in-app browser confirmed the country chart's new context
entries, all 21 country-history entries, the filtered Bangladesh history listing
and the treatment article's statutory and UNODC references. The temporary preview
and generated site output are removed after verification; local research and logs
are retained. The commit excludes concurrently staged source-archive changes.

Concurrent Eswatini edits appeared during the final live-checkout comparison.
A fresh candidate based on HEAD plus only this batch's three event blocks and
maintenance paragraph is verified separately. An isolated Git index excludes
those edits and preserves unrelated source-archive staging; the working tree's
concurrent changes are retained.
