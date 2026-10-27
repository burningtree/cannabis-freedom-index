---
name: solve-issues
description: Solve bug reports from the GitHub issues of the Cannabis Freedom Index - check each claim against the cited law, correct the country profile, history or penalty data, test, commit with the issue number and answer the issue. Use when asked to fix, solve, work through or triage GitHub issues or bug reports (e.g. "solve issue 268", "fix the open High bugs", "/solve-issues Czechia").
---

Follow `docs/SOLVE-ISSUES.md`. It is the shared guide for every agent working on this repository;
this skill only points to it.

1. Read `docs/SOLVE-ISSUES.md`, then the parts of `docs/DATA-MAINTENANCE.md` and `docs/WRITING.md`
   it names.
2. Pick the issues: the numbers, country or severity in the arguments, or else the open `bug`
   issues by severity (`gh issue list --label bug --state open`). Group issues about the same
   country or the same kind of mistake.
3. For each issue: read the cited source yourself, decide what is confirmed, fix the data, run the
   checks, and commit only your own files with `Fixes #<number>` in the message body (`Refs #<number>`
   for a partial fix).
4. Answer on GitHub with `gh`: close a resolved issue with `gh issue close <n> --reason completed
   --comment …`, a disproved one with `--reason "not planned"` and the source, and leave an
   unresolved one open with `gh issue comment`. Never push unless asked.
