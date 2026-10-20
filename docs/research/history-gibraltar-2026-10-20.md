# Gibraltar history and article verification — 20 October 2026

Added three unscored events and an article for the existing 2019 event. Sources
are the original 2017/2019 instruments, the official 2021 Act and government
announcements, linked in the event and article source blocks.

## Dating and limits

- Corrected the 2019 event from the press-release date to the gazette's express
  commencement date. Its existing `before` vector is preserved; no other scored
  event is changed.
- Recorded 2021 assent, rather than inferring operation from enactment. Status
  checked against the official text on the research date.
- The 2023 announcement is evidence of a supply arrangement, with qualifications,
  rather than proof of a first prescription or dispensing date.
- The Isle of Man consultation was inspected as a possible next research lead;
  no Manx events were added in this batch.

## Verification

Baseline: `tmp/history-gibraltar-2026-10-20/changes-before.yaml` (ignored).
Compare all existing records except the intended 2019 date/source correction,
all existing score vectors, IDs, article source metadata and internal links.
Run the production build and check new event pages and the history JSON export.

Results: all 2,605 pre-existing records retained, with only the intended 2019
correction; all score vectors unchanged. The build passed (3,298 pages), and
four generated event pages, the rendered article and exported date were checked.
Whitespace checks passed for staged and unstaged changes. Totals: 2,608 events
and 559 articles. Direct PDF downloads timed out; the official documents were
read through the web tool's PDF extraction instead.
