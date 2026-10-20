# Switzerland’s 1951 law and 1952 commencement — 21 October 2026

Added an article, corrected the existing event to verified commencement and
added the government’s April 1951 proposal as a separate `debate` event.
Rechecked the writing guide and category definitions. The public account
distinguishes cannabis control, hashish restrictions, the medical-use debate
and the later separate consumption offence. Existing IDs remain unchanged.

## Evidence and limits

- Read the actual Federal Council report `Cannabis für Schwerkranke`, dated
  4 July 2018, downloaded from Aramis. Visually checked p. 12, especially note 9.
  It reproduces passages from the 1951 message at BBl 1951 I 839 and 843 and
  parliamentary exchanges concerning medicinal corn remedies and a narrower
  prohibition sought by the National Council. These are historical quotations
  reproduced in a later government report, not a recovered original gazette.
- Read and visually checked the 1999 Federal Commission for Drug Issues report,
  printed p. 46 (PDF p. 41 in the downloaded file). It describes the historical
  hashish restriction and therapeutic-use discussion. Its description of later/current
  law on that page is not backdated wholesale to 1951. The medicinal-use wording
  was checked against the German quotations reproduced in the 2018 report.
  The English report's wording could suggest a therapeutic exception, while
  the reproduced German message calls hashish therapeutically unnecessary.
  The article therefore does not assert a final statutory medical exception:
  it describes the actual parliamentary alternative as a proposal during debate.
  No claim that patients enjoyed modern access or that cannabis medicines could
  be freely prescribed is made.
- Read the full reproduction of the Federal Supreme Court’s 24 June 2015
  decision. Reason 1.3.2 discusses the 1924 prepared-opium prohibition, the
  extension to hashish and heroin, and conversion or destruction of existing
  stocks under cantonal supervision. This historical explanation supplies the
  stock rule; the modern hemp-growing case and THC thresholds are not backdated.
- Fedlex’s actual publication page, inspected in the in-app browser, states
  approval on 3 October 1951 and entry into force on 1 June 1952. Its RDF
  metadata and the Federal Office of Public Health’s law overview independently
  give the same commencement day. The court reproduction contains inconsistent
  June/July dates for both 1952 and 2011, so it was not used for commencement.
  The timeline uses the verified operational date, with the 1951 ID retained.
- The original UN translation was located bibliographically as E/NL.1952/33–34,
  but downloads returned empty challenge responses or 403; the document-symbol
  API returned an error page. A normal background browser attempt also showed
  no readable document. It was not treated as a read source. Fedlex directs
  readers to the Federal Archives for the original text, but that site timed
  out. The old message-PDF route redirected to a not-found page. Fedlex RDF and
  SPARQL metadata supplied publication facts, not statutory wording.
- The full original law and 1951 message remain a research follow-up. No
  complete medical-exception scheme, cultivation rule, penalty amount or
  original plant definition is invented. The article stays within the scope
  established by the government histories and judicial explanation. The
  parliamentary alternative is presented as a position during debate, without
  claiming it became the full final statutory wording.
- Removed the overbroad statement that personal use simply stayed legal until
  1975. The 1999 report supports the narrower account of a separate consumption
  offence in that revision; the already sourced later event is linked. The 2022
  outcome is also already sourced and described on the existing linked article.
- Existing score vectors preserved without revalidation. Moving the event from
  approval to commencement corrects the date; no new point values were assigned.
  The proposal has no vector because it did not itself change the law. No
  country profiles or current scores were changed in this pass.

## Verification

Research began on 20 October; the final edit baseline is
`tmp/history-switzerland-1951-2026-10-21/changes-before.yaml`.
Earlier research downloads remain under the ignored 20 October PDF directory.
Compare all baseline records and vectors, validate the proposal ID, categories,
links, metadata and article length, build and inspect generated output.

Results: all 2,644 baseline events retained; only the intended Swiss record
changed, and the sole new record is the April 1951 proposal. Every existing
score vector is identical. Final article checks passed: 392 words, four sections,
four sources, valid earlier/later links and current category keys. The original
`dist` build failed on a missing generated research-page module; its cause was
not established. An isolated production build passed, followed by a final
isolated rebuild after the wording correction: 3,376 pages in 25.95 seconds.
Output: `tmp/history-switzerland-1951-2026-10-21/site/`.

Verified the final article’s headings and wording, four source URLs, contextual
links, proposal page, the previously failing research route and exported dates,
title and category in that final output. Task-scoped staged and unstaged
whitespace checks passed. The global staged check reports 3,960 line-ending
whitespace findings in the independently added `datasets/hfi-2025.csv`; that
file was preserved unchanged. Totals: 2,645 events and 586 articles. Concurrent
profile, dataset, interface and archive changes were preserved.
