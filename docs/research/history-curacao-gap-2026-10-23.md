# Curaçao history gap and statutory exemptions — 23 October 2026

This batch adds five entries to a three-entry timeline: the inherited ordinance's
1964 commencement, the 2019 medicinal-industry advisory opinion and subsequent
bill, opposition demands in 2023 and the 2024 review of exemption powers. It
revises the 2018 prosecution-policy entry and the 2024 replacement-law entry,
adds articles to the 2019 advice and 2024 law, and rewrites the existing 2018
article. All six segment explanations and six context blocks now use inline
citations. Numerical scores and all status classifications are preserved.

## Primary sources and chronology

Research downloads, extraction scripts and verification evidence are retained in
`tmp/history-curacao-gap-2026-10-23/`. Exact source metadata is in `sources.json`.

- Overheid.nl's original-ordinance metadata was downloaded and read. It records
  signature on 28 March 1960 and commencement on **1 June 1964** under the
  decree of 29 April 1964. The archived Antilles consolidation identifies the
  replaced ordinance as that of 30 July 1929. Curaçao's own 2019 consolidation
  identifies the inherited law and its acquisition of Curaçao-law status in 2010.
  These sources establish continuity and commencement, not the original 1960
  wording of every cannabis definition, penalty or medical exception.
- The official Curaçao 2019 consolidated ordinance was downloaded in full
  (`oldlaw2019.pdf/.txt`). Its relevant definitions, cultivation prohibition,
  extracts/herbal-cannabis provisions, medical exceptions and penalties were read.
  It is used as a later consolidation, without backdating those detailed rules
  to 1964. It has no counterpart to the 2024 advertising article.
- The original 2018/01 prosecution guideline was reread at pages 1–3 and 5–6
  from the retained `tmp/pdfs/dutch-caribbean-2026-10-20/` download. It provides
  confiscation and potentially conditional dismissal in the printed 0–25 g band;
  the next printed 25–50 g band requests a fine up to NAf 500. The overlapping
  endpoints are retained rather than silently resolving a boundary the table
  does not resolve. From 50 g the cocaine/heroin requests are halved. Minors,
  repeat offending, dealing indications, another offence and listed settings
  are exceptions. The separate minor discussion covers even 0–5 g and assistance
  services. General instructions include arrest/custody, resident first-offender
  requests and differing treatment of non-residents. These are instructions,
  not measured practice or mandatory judicial sentences.
- The Advisory Council's complete 2019 substantive opinion was downloaded and
  read (`advice2019.pdf/.txt`, printed pages 1–8). Its appendix was consulted for
  context but editorial corrections there were not turned into events. Although
  the PDF filename contains September, the signed opinion is dated **16 July
  2019**, visually verified on PDF page 8. The catalogue says publication on
  17 July. The opinion questions economic substantiation, licensing procedures,
  financing of harvest purchases, repayment guarantees and the proposed bureau's
  legal capacity. Its request for changes is not a veto or a refusal of a licence.
- The full Curaçao Chronicle report of 18 September 2019 was downloaded and
  read (`news2019.html/.txt`). It says the bill reached Parliament the preceding
  week, so the bill event uses month precision, not the report date as an invented
  exact filing day. It describes a proposed office, conditional on approval.
- The full 8 October investor-interest report was read (`investors2019.html/.txt`).
  Alvin Daal's nine applications/business plans and job/revenue projections do not
  establish issued cultivation licences, actual jobs or realised revenue. It is
  supporting context in the article, not a separate scored reform.
- The full 7 April 2023 opposition report was downloaded and read
  (`opposition2023.html/.txt`). It identifies MAN/KEM demands, Michelangelo
  Martines, Giselle McWilliam and the earlier role of Suzanne Camelia-Römer.
  It establishes that the bill was still awaiting approval then. It does not
  certify its status throughout 2026. NU.CW's page returned a verification screen;
  that search snippet was not substituted for a read source.
- The 2024 Advisory Council opinion was downloaded as complete HTML
  (`advice2024.html/.txt`); relevant general discussion, exemption procedure and
  article 8a comments were read. The body dates signature to **15 May 2024**,
  while the page labels publication as 6 June. The opinion describes pressure
  from the planned financial-action evaluation and asks for explanation and
  examples supporting the proposed broad exemption power. A guessed PDF address
  returned 404 and is not presented as a recovered PDF.
- The official 2024 law PDF, retained in the October 20 Dutch Caribbean research
  directory, was reread at definitions, articles 2a–8a, 11 and 15–19. The final
  text requires prior parliamentary approval for the government's intention to
  create exemptions by decree, with a 30-day opportunity for Parliament to ask
  that commencement be governed by legislation. This must not be replaced by
  contemporary reporting about a draft suggesting no parliamentary role.
  Articles 17–18 repeal the old ordinance and commence the new one the day after
  publication: issued **5 July**, effective **6 July 2024**.

## Profile corrections and scoring

The former profile confused prosecutors' requests with actual sentences, treated
medical professional exemptions too broadly and asserted no legal products or
production without evidence of actual availability. The revised text states the
specific rules instead. Article 3a handles extracts/tinctures, article 4 herbal
cannabis/resin, and article 7 supplies specified exemptions. Professional handling
of extracts and tinctures is subject to medicines rules; lawful personal treatment
supplies require proof of need and lawful acquisition. An exemption is not proof
of an operating pharmacy programme, patient registry or stock availability.

The cultivation prohibition remains in article 2a. General exception-making power
is not itself a personal plant allowance or a grant of a cultivation licence.
The new advertising restriction excludes purely medical/scientific information;
its breach has up to four months' detention or a fourth-category fine, or both.
The 2024 event is now tightening, with an explicit unscored explanation: promotion
of supply in an already prohibited recreational market changes no whole personal
freedom band, while any future exemption requires a separate decree.

The six current scores remain possession 4, cultivation 1, enforcement 4, sharing 1,
consumption 2 and access 1. Medical remains `limited`. The score chain has no
flagged transitions. The date when small-quantity leniency first began remains
unresolved: 2018 replaced 2015 instructions, so it is not scored as the first
introduction of leniency. Recovering earlier instructions and reconstructing the
historical vector remains work for a future pass.

The first-ban estimate remains in place. Searches found leads to the 1929 law,
a 1935 international-control amendment and a 1956 penalty amendment, but did not
recover enough original cannabis-specific coverage to replace the estimate or
backdate a cannabis penalty. The later ordinance and 1929 replacement reference
alone do not prove the first cannabis ban.

## Validation and commit isolation

The scoped verifier checks all seven touched entries, category and tag validity,
titles, checked flags, related links, inline citation keys and use of listed
sources. It checks source-identity deduplication across event and article text.
Articles contain 358, 383 and 380 words, each with four headings and country and
contextual history links. All twelve profile blocks have valid inline citations;
current scores, dependency and status classifications match the starting snapshot.

The production build passed: **3,872 pages in 34.20 seconds**. All **84 checked
rendered citation links** resolved to unique numbered references; six tag pages,
history exports and the profile API passed. The exact exported score remains
**24.5**, medical Limited. `git diff --check` passed. Generated `site/` output
was deleted after checking; source material and scripts remain. A separate Git index assembles the commit from only these seven
history objects, the Curaçao profile, three articles and this note. Parent-to-commit
semantic checks ensure unrelated history entries are unchanged. Concurrent edits,
including Ohio history/profile changes and the source archive, remain outside
this commit.
