# Martin Booth, Cannabis: A History — library intake and first pass

## File and edition verified

Local file: `books/Cannabis A History (Booth, Martin).epub`, ignored by Git.
SHA-256 and complete twenty-six-chapter navigation are in `docs/books.yaml`.
The extraction remains under ignored `tmp/booth-cannabis-history/`.

Internal title page: Martin Booth, *Cannabis: A History*, Picador, A Thomas Dunne
Book, St. Martin's Press, New York. Internal copyright: 2003, with eISBN
978-1-250-08219-0. OPF instead carries print ISBN 9780312424947 and a generic
2003 date; its page-count fields do not provide a reliable EPUB pagination map.

The publisher's format-specific record confirms eISBN 9781250082190 and release
16 June 2015, Thomas Dunne Books:
https://us.macmillan.com/books/9781250082190/cannabis/

Public references therefore cite the 2015 ebook, noting the original 2003 work,
and use chapter locators. This is not a claim that a revised 2015 historical text
was written by Booth. Do not apply another edition's print pagination to this file.

## Actual reading

Read the internal title, copyright and contents pages, acknowledgements and
preface, followed by the whole of chapter 6, *The Herb Pantagruelion*.
The chapter is `text/part0011.html`. The twenty-five remaining chapters are
indexed, not read. Some chapters span multiple XHTML files; the catalogue groups
them according to the EPUB spine and navigation.

The preface is Booth's recollection of London and Hong Kong in the 1960s,
signed Devon, England, 2003. Its sweeping claims about soldiers and drug use are
not a population survey and were not imported into country histories.

## First application

New event and article: `france-rabelais-pantagruelion-1546`. Booth identifies the
literary plant as hemp. Independently checked the first-edition date and printer
against BnF BP16_112581:
https://bp16.bnf.fr/ark:/12148/cb439857576/

Read chapters XLIX–LI of the English *Third Book* reproduction at Project Gutenberg:
https://www.gutenberg.org/files/8168/8168-h/8168-h.htm

The text describes preparation for a voyage, fibre processing and useful materials,
including a hangman's-rope joke. No claim that Rabelais smoked cannabis, that every
botanical assertion is accurate, or that publication changed French law. The first
edition is dated 1546; no unverified exact publication day assigned.

Added an attributed literary-material reference to **Hemp**. The French publication
is background in the entry, with no extra reverse atlas card. No new country profile
or score changes.

## Follow-up questions, not adopted facts

- Chapter 6's claims of cannabis prohibitions under Gregory IX in 1231 and Innocent
  VIII in 1484 need the actual decrees. They are not new checked prohibitions.
- Its William Turner and Culpeper titles/dates require bibliographic checking.
- Its British excise chronology differs from some existing timeline dates. Retrieve
  the actual regulations before changing an event or score.
- Folklore about seed dances, livestock, roof dancing and similar customs needs
  regional primary documentation before separate atlas entries.
- Herbal efficacy and witches' drug mixtures are historical claims, not established
  medical facts. Booth's narrative is not sufficient to verify them by itself.

No book text, cover or chapter file was added to public assets. Added EPUB locator
instructions to `docs/BOOKS.md` for future local books.

## Verification

- Astro build passed: 2,858 pages. Front matter and catalogue YAML parsed.
- New history article: 369 body words; updated Hemp entry: 542.
- Browser checked the new article layout, its printed ebook bibliography and
  primary-source links, and Hemp's new passage and eISBN citation.
- `git diff --check` passed. EPUB remains ignored; no tracked book files and no
  country-file changes in this pass. Previous staged work preserved.
