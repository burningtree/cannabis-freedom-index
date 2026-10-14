# Cannabis and Culture: second research pass

Local source: Vera Rubin (ed.), *Cannabis and Culture* (Mouton, 1975), ISBN
90-279-7669-4. The PDF and extracted text remain in ignored `books/` and `tmp/`.
Coverage now totals thirteen chapters reviewed fully or in selected pages, not a
cover-to-cover reading. See `docs/books.yaml` for per-chapter coverage.

## Pages examined and applied

- Harry William Hutchinson, pp. 173–183, complete: added to **Maconha** for regional
  vocabulary and his criticism of medical/police sources and unsubstantiated
  generalisations about Afro-Brazilian ceremonies.
- Ahmad M. Khalifa, pp. 195–205, complete: corrected **Hashish in Egypt** from a
  purported 1980 study to the 1971 publication reporting prisoners studied in
  1967–68. Added the sample boundaries, mixed administration group and his account
  of a session supervisor and pipe attendant.
- Phyllis Palgi, pp. 207–216, complete: added to **Hashish** for boundaries and
  avoidance reported by Moroccan Jewish informants, followed by changes after
  migration. Not evidence of a universal Moroccan-Jewish consumption custom.
- Jean Benoist, pp. 227–234, complete: added a structured English chapter citation
  to **Zamal on Réunion**, alongside its earlier French source. Corrected the
  unsupported candia-from-ganja gloss; distinguished the usual tobacco cigarette
  from a ciga containing zamal. Attributed the violence stereotype and the
  religious interpretation of apparent indifference.
- James Fisher, pp. 247–255, complete: new **Bhajan circles in Kathmandu** tradition,
  optional pipe-sharing, multiple deities, householders, caste restrictions and
  limited female participation. Corrected exclusive-Shaiva and everyone-smokes
  statements in **Sadhus and the chillum**. Added agricultural consequences to
  **Freak Street** and replaced the abstract-only citation in the **1973 licence
  cancellation** article with the actual chapter.

Visually checked printed pp. 200 and 250 against their PDF page images (214 and
264): sample dates, percentages, optional smoking, locations and named deities.
Chapter openings and relevant surrounding passages were checked in extracted text.

## The original Egyptian report

Retrieved the full UNODC HTML of M. I. Soueif, *The use of cannabis in Egypt: A
behavioural study*, *Bulletin on Narcotics* 23(4), pp. 17–28 (1971):
https://www.unodc.org/unodc/en/data-and-analysis/bulletin/bulletin_1971-01-01_4_page004.html

The web reader failed to retrieve the page, but a direct Python HTTPS request
succeeded. Read the introduction, methods and interview-results sections, including
administration routes, group settings, frequency, motives and criminal-record
comparisons. The objective-test results and final conclusions were not needed for
this pass and are not represented as newly reviewed clinical evidence.

Added `egypt-soueif-prison-study-1971` and its compact article. Date is year-only:
the site's January 1 creation metadata is not treated as the publication day of
issue 4. No country score change follows from publication. Added the event as a
background reference to the Egyptian tradition; it does not create a reverse
culture card for the broader entry.

The original reports cigarette-only smoking as 10.6%; Khalifa prints 10.5%.
Neither subfigure was repeated in the new text. The original explicitly contrasts
this prison sample with lower-frequency use in earlier non-prison samples. The
89.4% category excludes oral use; an additional 9.3% combined both routes.

## Leads and claims kept out

- Hutchinson's slave-doll seed anecdote and 1549 arrival date are not direct plant
  records. His Carlota Joaquina death story has suspect chronology. These were not
  used to create a person or a dated event.
- Club de Diambistas is a secondary report with insufficient setting and direct
  evidence for a separate substantial tradition entry in this pass.
- Palgi's Assassins story and claim about Talmudic hemp/wool need independent
  verification; they were not imported. Her clinical informants cannot support
  national or religious-group prevalence.
- Benoist's older remedies are historical beliefs, not treatment advice. The
  account does not demonstrate cannabis-caused violence or possession.
- Fisher's expectation of a 1974 law is a prediction, not enacted legislation.
  Dolpa Magar hemp-seed oil deserves later comparison with other culinary sources.
  No assumption that today's devotional singing involves cannabis.

No new images were added: the chapters do not provide verified, specifically
relevant illustrations for the new entries. No book scans or extracted text were
copied into public assets. No present-day scores or country files were changed.

## Verification

- Resource-limited Astro build passed: 2,853 pages, 2,219 history entries.
- Front matter parsed, all history IDs resolved and IDs were unique. Updated
  culture entries are 550–841 body words; new bhajan entry 570, new study article
  385. The existing Nepal article remains 363 words.
- Browser checked the new tradition, its source bibliography, traditions-index
  card and Nepal profile listing. Checked the study article, its sources and its
  presence in Egypt's History tab. Checked corrected Egypt and Réunion passages.
- Related thumbnails on the new tradition loaded successfully after the final
  build. No extra reverse atlas cards were added to the general Nepal laws or
  the Egyptian research event.
- `git diff --check` passed. `books/` remains ignored and has no tracked files.
  No country profile or score edits were made in this pass.
