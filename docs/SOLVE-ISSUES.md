# Solving GitHub issues

How to work through the bug reports in `burningtree/cannabis-freedom-index`: one issue or a batch.
Most reports name a country, a claim on its page and a law that contradicts it. Written for any
agent or person; the data rules live in `docs/DATA-MAINTENANCE.md` and `docs/WRITING.md`.

## 0. Before you start

- Run `git status` and `git log --oneline -5`. Others work here at the same time: don't edit files
  with someone else's uncommitted changes, and commit only your own lines.
- Don't start dev or preview servers. One `npm run build` at a time (`pgrep -f "astro build"`).

## 1. Pick the issues

```bash
gh issue list --label bug --state open --limit 50 --json number,title
gh issue view 268 --json title,body,comments
```

- Titles carry a severity, `[Critical]` before `[High]` and the rest. Without instructions, take
  Critical first, then High, oldest first.
- Group issues about the same country, or the same mistake in several countries (an old currency,
  serum against whole blood, hemp counted as medical production): fix them in one pass.
- Read the comments. An issue someone already answered or is working on is not yours.

## 2. Check the claim before fixing it

A report is a lead, not a source. Reports are often right, sometimes partly wrong, and sometimes
overreach (a proposed new score, a "binding" law that is only a draft).

- Open the law, judgment or official page the report cites, and read the passage yourself. Prefer
  the official gazette or law portal; a faithful reproduction is a fallback.
- Check the date: is the cited rule in force now? Was it amended later?
- Decide for each point: **confirmed**, **partly confirmed** (fix what holds, say what does not),
  or **not confirmed** (change nothing, explain why with the source).
- If a source cannot be opened, say so; never describe a source as read when it was not.

## 3. Fix the data

- Find every place the wrong claim lives: `grep -rn "<phrase>" countries/ changes.yaml articles/
  culture/`. The country page, map, rankings, answers and exports are built from the profile, so
  fix the data, not the output. If a script or component hard-codes the error, fix that too.
- Rewrite the affected text by the rules in `docs/WRITING.md` and DATA-MAINTENANCE.md, "Writing
  context sections well": plain words, every sentence cited (`[@key]`), the primary source added
  to the profile's `sources` with a `locator` for the section or paragraph.
- Penalty tables follow DATA-MAINTENANCE.md, "Penalty steps": every figure in its field, the
  right `currency` (a country that changed currency gets the new one, converted at the official
  rate, with the old figure in `note` only if the law still states it).
- Statuses (`hemp`, `production`, `driving` and the rest) must say what the corrected text says.
- **Scores:** change one only if the law or practice really differs from what the score assumed,
  calibrated against comparable countries. Then the newest scored history entry's "after" changes:
  add or fix a dated entry so the timeline still makes sense (`node scripts/data-status.cjs chain
  <id>`). A wording or measurement correction moves no score.
- A dated event found while checking (a new law, an amendment, a ruling) goes into `changes.yaml`
  as a history entry, `checked: true` only if you read its source.
- Set the profile's `updated:` to today.

## 4. Check

```bash
node scripts/profile-audit.cjs <id>   # no errors
npm test                               # answers, profile claims, history, charts (the build runs it too)
npm run build                          # npm test, then schemas, citations, links
npm run seo:audit
```

Read the built page in `dist/country/<id>/index.html` and confirm the corrected wording is there
and the old one is gone. If an issue shows a check the tests could have caught, add a test for it
in `scripts/profile-claims.test.mjs`.

## 5. Commit, answer, close

Use GitHub's own mechanisms, not notes elsewhere: a closing keyword in the commit, and the
issue's own comment thread and close action through `gh`.

- **Commit** per issue, or per group, with a closing keyword and the issue number in the message
  body, one line per issue, so GitHub links the commit to the issue and closes it again when the
  commit reaches `main`:

  ```text
  Czechia: name serum for the 2 ng/mL driving limit

  Fixes #268
  ```

  Use `Fixes #n` only for an issue the commit resolves; for a partial fix write `Refs #n`. Commit
  only your own files.
- **Comment and close at once**, once the fix is committed: the commit is not pushed yet, so the
  keyword alone would leave the issue open. Write the comment to a file and pass it to `gh`:

  ```bash
  gh issue close 268 --reason completed --comment "$(cat /path/to/comment-268.md)"
  ```

  The comment says in a few lines what changed, which sources were read (with links), what was not
  confirmed and why, and the commit hash, and that the fix is committed but not yet pushed or
  deployed, unless it is.
- **Resolved** (confirmed, or partly confirmed with the rest explained): close with
  `--reason completed`.
- **Disproved:** change nothing in the data, and close with `--reason "not planned"` and a comment
  that quotes the source that disproves the report.
- **Not resolved** (a source could not be opened, the law is unclear, or the fix needs a decision
  from the maintainer): leave the issue open and add a comment with what was checked and what is
  still needed: `gh issue comment 268 --body-file /path/to/comment-268.md`.
- For a batch of five or more, also write `docs/research/bug-review-<date>.md`: a table of issue,
  profile and resolution (including what was disproved), and the sources read with their limits.
- Never push unless the user asks.
