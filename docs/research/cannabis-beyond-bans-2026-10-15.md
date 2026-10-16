# Cannabis history beyond bans (15 October 2026)

The user clarified that the research should cover cannabis broadly, rather than
focus on prohibition. This pass adds **four context events and four articles**:
medicine and household knowledge, fine textiles, cultivation, and domestication.
All are unscored `other` events. No current country profile or score was changed.
The maintenance guide now preserves this broader scope for subsequent research.

## Sources actually examined

### Culpeper's English hemp entry, 1652

- Downloaded and read the EEBO–Text Creation Partnership
  [A35365 XML transcription](https://github.com/textcreationpartnership/A35365/blob/master/A35365.xml),
  especially the complete **Hemp** entry, printed **pp. 63–64**.
- Its source description identifies a **1652 Peter Cole edition**, reproduced
  from the **Huntington Library**. This edition-specific provenance supports the
  public citation; it is not inferred from a modern reprint's filename.
- Also opened the [Wellcome catalogue](https://wellcomecollection.org/works/vrps2gxz)
  for a different 1652 copy/imprint and the
  [Gutenberg later edition](https://www.gutenberg.org/cache/epub/49513/pg49513-images.html).
  Neither was used to assign its pagination or imprint to the TCP copy.
- The original page images were not inspected. The primary text was read through
  a scholarly transcription, including the page-break markers; this limitation
  is different from relying on a search-result quotation.
- Applied to `england-culpeper-hemp-herbal-1652` and its article. The account
  distinguishes seeds, roots and juice, the household cultivation calendar and
  the author's astrological/humoral explanations. Claims of therapeutic benefit
  remain attributed historical claims, without an efficacy endorsement or a
  claim that this was the first medicinal use of cannabis.

### Scandinavian textiles, 2013

- Downloaded the [original Scientific Reports PDF](https://www.nature.com/articles/srep02686.pdf).
  Read the abstract, results, Table 1 and fibre-identification methods, pp. 1–4.
- Publication date **18 October 2013** is printed on p. 1.
  The relevant objects' radiocarbon ranges are retained in the article; the
  database date represents the study, not a fabricated first year of weaving.
- Applied to `sweden-medieval-hemp-textiles-study-2013` and its article.
  The event covers Swedish and Norwegian objects in a single record under Sweden,
  rather than creating duplicate copies of one research publication.
- Four positive samples out of ten studied do not establish the proportion of
  all Scandinavian textiles made from hemp. Mixed fibres are distinguished from
  hemp alone. Fibre evidence is not treated as evidence of intoxication.

### Domestication genomes, 2021

- Read the primary full-text XML returned by
  [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8284894/fullTextXML):
  abstract, population analysis, domestication interpretation, Figure 2 text and
  demographic methods. The ordinary PMC browser page showed a challenge, so a
  successful XML retrieval, rather than the challenge page, is the substantive
  reading source. Public citation uses the stable
  [PMC article record](https://pmc.ncbi.nlm.nih.gov/articles/PMC8284894/).
- The XML records publication on **16 July 2021**. Keep the panel of 110 accessions
  separate from the 104 retained in the principal population analyses.
- Applied to `china-cannabis-domestication-genomes-2021` and its article.
  The proposed early divergence is explicitly model-based, with its wide interval;
  no ancient cultivated specimen of that age was newly excavated in this study.
- The Haimenkou authors' discussion supplies a substantive qualification:
  archaeological testing of the genomic chronology remains necessary. The article
  does not present the proposed origin as a settled first historical event.

### Haimenkou seeds, online 2023 / volume 2024

- Read the [publisher's open article](https://link.springer.com/article/10.1007/s00334-023-00966-6),
  plus its published PDF downloaded from the
  [Cambridge repository](https://api.repository.cam.ac.uk/server/api/core/bitstreams/af60af76-ea22-4773-b687-4bbc14ed97a8/content).
  Examined abstract, assemblage context, measurement methods/results and discussion
  of genomic dating and interpretation limits. The
  [UCL repository](https://discovery.ucl.ac.uk/id/eprint/10183826/) was also read;
  these are copies/records of one paper, not independent studies.
- Both publisher and PDF say **first online 30 November 2023**; final volume is
  **33 (2024), pp. 503–518**. Hence `china-haimenkou-cannabis-seeds-study-2023`.
- Keep more than 800 recovered grains separate from the 30 measured, and the
  excavation year separate from Bronze Age context dates. Overlap in the size
  distributions limits identification of intended uses or cannabinoid content.
- The article links to the genome study and vice versa. Neither requires a
  legal-score change.

## Leads excluded or left open

- Famous Yanghai/Jiayi/Jirzankal finds and O'Shaughnessy's medical publication
  already have database coverage; no duplicate events were added.
- The UNESCO Hansan **mosi** weaving listing concerns **ramie**, not cannabis.
  It was rejected as a candidate cannabis-hemp source.
- A retrieval attempt for a 2023 fibre-methods PDF returned an HTML page rather
  than the article. That material is not a checked citation.
- Further useful directions include maritime supply and trade archives,
  historical food preparations, papermaking and locally documented weaving.
  These are research leads, not findings claimed by this batch.

## Validation

- `npm run build` passed, **3,040 pages** in the shared checkout, including
  concurrent changes. All four new article pages contain the expected sources.
- Generated `data/history.json` contains all four IDs and publication dates.
  Article history links resolve to existing IDs. Entries are unique, checked and
  unscored, and article lengths are about 390–400 words.
- China, Sweden and Britain score-chain checks report **zero flagged steps**.
- Both staged and unstaged whitespace checks passed. No new tests were added
  for this content-only batch; no commit or deployment was made.
- Full texts and extracts remain in ignored `tmp/broad-history/`, outside public
  assets and outside the user-supplied local book catalogue.
- Archive availability checks for all four new public source URLs returned
  **HTTP 429**. Results are retained in `tmp/broad-history/archive-results.json`;
  no archived copies were claimed and the shared source archive was not rewritten.
