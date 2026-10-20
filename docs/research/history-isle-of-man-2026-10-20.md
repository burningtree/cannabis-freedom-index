# Isle of Man history and articles — 20 October 2026

Added four unscored events and two articles, distinguishing rescheduling,
licensing commencement, conditional approval and a pharmacy service launch.
All source links and page locators are in the corresponding metadata.

## Source handling

- Used the original SD 2020/0581 held by Tynwald. Its approval date and regulation
  2 establish commencement on 20 January 2021. The legislation portal's current
  consolidated PDF incorporates later amendments and was not used to backdate
  fees or rules. The Tynwald original was read through PDF text extraction.
- The 2020 consultation is evidence of scope, responses and expectations, not
  evidence that projected 2021 approvals actually occurred.
- The June 2022 release establishes a conditional offer, not completed production.
- The web search tool returned full cached government releases for November 2022
  and July 2024, including their complete substantive text. Direct opens of those
  URLs returned Request Rejected. The entries rely on the full release text,
  rather than a headline or truncated snippet. The 2024 release is also added to
  the existing event's sources; its date and description remain unchanged.
- No claim is made about the date the first patient actually collected medicine.
  The December 2022 date is when prescriptions could first be submitted locally.
- All new events omit `before`; sources do not establish historical score vectors.

## Verification

Baseline: `tmp/history-isle-of-man-2026-10-20/changes-before.yaml` (ignored).
Validate preservation of existing records except the intended 2024 source
addition, all score vectors, article links and front matter, then build and
inspect the generated pages and history export.

Results: baseline comparison passed for all 2,608 existing records, with only the
intended source addition; all score vectors preserved. Both articles passed word
count and link checks. Production build passed (3,302 pages, 22.49 seconds), and
four event pages, both rendered article bodies and exported dates were verified.
Staged and unstaged whitespace checks passed. Totals: 2,612 events, 561 articles.
