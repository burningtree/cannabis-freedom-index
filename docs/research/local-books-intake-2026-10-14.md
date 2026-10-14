# Five additional local books: intake and first applications

All original files stay in ignored `books/`. Hashes, formats, internal edition
information, chapter navigation and actual reading coverage are in `docs/books.yaml`.
There are now seven catalogued local books. A contents entry does not mean read.

## Editions and coverage

- **James H. Mills, Cannabis Britannica**: Oxford University Press, 2003,
  ISBN 0-19-924938-5; 272 PDF pages. Visually verified copyright and printed p. 93.
  Read A Note on Terms, printed x–xi (PDF 14–15), and printed pp. 93–98
  (PDF 109–114) of chapter 5. Other chapters indexed, not reviewed.
- **Ernest L. Abel, Marihuana: The First Twelve Thousand Years**: Springer
  facsimile of the Plenum Press 1980 first edition. Copyright page visually checked;
  ebook ISBN 978-1-4899-2189-5 and DOI 10.1007/978-1-4899-2189-5.
  No separate later facsimile release date printed. Contents indexed; opening
  snippets inspected for triage, no chapter yet reviewed or applied.
- **Cannabis: Global Histories**, edited by Lucas Richert and James H. Mills:
  MIT Press, 2021. Title/copyright/contents examined; fifteen chapters indexed.
  Copyright page prints paperback ISBN 9780262045209; no format-specific ebook
  ISBN established from this copy. Existing citations elsewhere in the project
  do not mean this local copy's chapters have all been read in this pass.
- **Riley Kirk, Reefer Wellness**: DK Publishing, 2025 first American edition;
  digital eISBN 9780241710036, print ISBN 9780593847152. Internal copyright,
  contents and author biography examined. Eight substantive chapters and a
  bibliography indexed. No clinical content adopted or chapter counted as read.
- **Jack Herer, The Emperor Wears No Clothes**: no reliable edition year,
  publisher or ISBN identified. OPF year 0101 is invalid. Contains chapters
  1–16: the last XHTML file combines chapters 3–16, rather than containing only
  chapter 3. The contents and spine therefore must be compared with actual headings.
  Read chapter 1, the opening challenge in chapter 2 and Michael E. Rose's prologue
  dated 13 May 1998. Do not label this file as the first 1985 edition.

## Applications

**1891 Commons ganja question:** new compact article on an existing event,
`india-commons-ganja-question-1891`, so no duplicate event created. Mills provides
political context; the actual Hansard Sale of Ganja exchange was read separately:
https://hansard.parliament.uk/Commons/1891-07-16/debates/e079dcea-fc61-4e86-8fcf-76b2dab279ad/Questions

The item-specific modern URL failed; the full Questions page contains the exchange.
Stewart repeated a newspaper allegation, while Gorst confirmed Burma's exclusion,
referred to rising Bengal prices and promised further inquiry. The response is not
an announcement of an India-wide ban or a medical validation. Added this primary
source to the existing event. No score or country-profile changes.

**Bhang and Ganja:** added Mills's reproduction of the commission's historical
terminology. A drink made with flowering material could be called bhang, and
regional usage differed. This corrects a too-neat historical botanical distinction
without changing the separate statutory exclusion of leaves without tops.

**Jack Herer:** expanded the person entry with the primary opening chapter's
campaigning use of multiple plant names. Distinguished rhetorical unity from
product and legal differences. Attributed the 1998 prologue to Michael E. Rose,
not Herer in 1985. The existing numerical critique of yields/cellulose was not
newly verified from this primary book and no new scientific claim was added.

## Claims not imported

Herer's claims about wars, universal hemp primacy, medical efficacy and numerical
crop statistics are advocacy claims requiring independent original evidence.
Reading them does not verify them. The racial classification in Abel's opening ancient-world passage and
old climate/pharmacology assertions are likewise not adopted as present
knowledge. Clinical chapters in any of these books require original/current
research before use as medical guidance. Chapter dates, voices and genre remain
part of the source description.

No book scans, extracted chapters or covers copied to public assets. All page
renders and extraction are ignored temporary research files. No new image was
needed for the parliamentary exchange.


## Verification

- Final Astro build passed: 2,858 pages. YAML and front matter parsed.
- New article 363 words; updated Bhang 766, Ganja 722, Jack Herer 536.
- Browser verified the article layout and primary source, historical naming
  passages in both language entries, and Rose attribution in Herer's entry.
  Aligned book locators across article/event so the bibliography renders Mills
  once rather than as duplicate references.
- Corrected an OCR-derived chapter-2 start from 7 to 17 in the Mills catalogue
  after visually checking the contents page. No unverified general page map added.
- No country-file changes. `git diff --check` passed; no books tracked.

The 1891 question refers to Lower Burma's prohibition as already long established.
Compare its provincial scope and the original decrees with the existing Myanmar
1891 timeline date in a future pass; do not infer a replacement national date from
this parliamentary wording alone.
