# Article batch: South Africa 1928 pharmacy act; Portugal 1924/1926 dead ends

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, `WRITING.md`
and `BOOKS.md`, the history entries with their profiles, and the linked
entries before writing. One article was added for a backlog entry without
one; no `changes.yaml` entry was added, corrected or re-scored. No profiles,
scores or score timelines changed.

## Article added

- `articles/south-africa-pharmacy-act-1928.md` (~450 words, opening plus
  three sections, single Waetjen chapter source cited throughout). The 1922
  customs-law prohibition (section 14, gazetted 10 November), the 1923
  League petition and recording of arrests from 1925; the two-decade path
  to a national pharmacy law, the rejected noxious-weed option, the
  unpresented 1916 narcotics bill with its dagga-as-Leonotis definition,
  and the 1928 settlement on cannabis species only; the December 1922
  enforcement compromise, segregation-mapped policing, and the late-1920s
  smuggling trade. Links the 1922 ban, 1923 petition and 1922 compromise
  entries and `/country/za/`.

## Sources actually read

- Thembisa Waetjen, "Dagga: How South Africa Made a Dangerous Drug,
  1902–1928", in Cannabis: Global Histories (local EPUB): the passages at
  print-page anchors pg_99–pg_100 re-read on 26 October 2026 — the 1922
  gazette and schedule, the 1923 petition, the 1928 shift with Leonotis
  dropped, the Division I/noxious-weed options, the 1916 bill's
  definitions and non-presentation, the fibre/oil/birdseed strategising,
  the December 1922 compromise quotation, and the 1929 Cape Times/Weenen/
  Paarl trade account. Earlier chapter sections (e.g. Natal governance)
  rest on the existing catalogue record; the 1916-bill detail comes from
  the same read pages.
- EMCDDA, Drug Policy Profiles: Portugal (2011), mirrored PDF read via
  `pdftotext` the same day: Portugal legislating "as early as the 1920s"
  with the framework "adapted to the recommendations of the International
  Opium Convention of 1912" (pp. 9–10); the 1970 Decree-Law 420/70 as the
  first law regulating production, traffic and use of narcotics. Cited
  sources: Dias 2007 (covers 1970–2004 only) and IDT historical pages.

## Portugal 1924/1926: routes exhausted, not forced

The 1924 (Law 1687, 9 December) and 1926 (Decree 12,210, 27 August)
instruments are identified from the English Wikipedia's cited act
templates, and EMCDDA confirms a 1920s adaptation — but no readable text
was obtained:

- `diariodarepublica.pt` detalhe pages and `data.dre.pt` ELI endpoints
  both return a 2,346-byte OutSystems JavaScript shell to scripted fetch.
- The SICAD/IDT history page returned an empty response.
- A Portuguese-Wikipedia extract request returned no article under the
  tried title; a web search for the decree number found no full text or
  secondary account of its scope.

Per the sourcing standard, no entry change and no article were built on
the decree numbers alone. The checked 1926 entry stands as is. Still
needed: the 1924/1926 texts (whether cannabis is scheduled, penalties,
commencement) before any re-basing of Portugal's first ban or an article.

## Not verified in this pass

- The 1919 Cuba law-and-regulations booklet, the 1966 Finland decree
  number, Syria 1943, Guatemala 1932, Uganda's 1902 ordinance text and the
  Austrian 1928 domestic rules remain untraced.
- Scores, profiles and timelines are untouched, including the pre-existing
  India chain warning.

## Validation and tree note

- `node -e` YAML load of changes.yaml clean (no entry edits in this pass).
  `npm run books:report` refreshed the generated report;
  `npm run books:check` agrees with the local inventory.
- `npm run history:test`: 40 pass, 0 fail. `npm run answers:test`: 40
  pass, 0 fail. Production build: 4,344 pages, complete.
- Rendered `/history/south-africa-pharmacy-act-1928/` shows 14 `[1]`
  citations; outbound links to the 1922 ban, 1923 petition and 1922
  compromise entries resolve. Chain `za` unchanged, 0 flagged steps; the
  entry cleared the article backlog.
- Commit stages only the new article, this note, the Waetjen
  `books.yaml` hunks and the regenerated report. Foreign work in the
  shared tree is excluded and preserved.
