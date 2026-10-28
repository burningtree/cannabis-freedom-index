# Expanding several countries

How to work through a batch of countries, one after another or with several agents at once. Each
country is done exactly as `docs/EXPAND-COUNTRY.md` describes; this file covers choosing the batch,
the order, sharing the work and keeping it safe while others work in the same repository.

## 1. Choose the batch

```bash
node scripts/country-gaps.cjs --rank 25                 # the countries that most need work
node scripts/country-gaps.cjs --rank 25 --region Africa # or within one region
```

The ranking weighs each country's gaps (missing sections, penalty tables, empty history decades,
Wikipedia-only texts, key entries without an article) by population. Take the batch from it, from
a region, or from a list you were given.

- **Five to ten countries per batch.** A batch is finished country by country; a half-done batch
  of thirty helps nobody.
- **Skip countries marked BUSY**: someone has uncommitted changes in their files right now. Run
  the ranking again before each new country, since others move on too.
- Neighbours and countries with a shared history (a colonial power and its colonies, one region's
  treaties) go well together: sources found for one often cover the next.

## 2. Work country by country

For each country in the batch:

1. `git status` and `git log --oneline -5`: is anyone working on this country now? If so, skip it.
2. `node scripts/country-gaps.cjs <id>`: the country's work list.
3. Work through `docs/EXPAND-COUNTRY.md` in its order: current law and penalty tables, history,
   articles, context sections, culture, links.
4. Build (`node scripts/build-pages.mjs country/<id> history/<changed-entry-id>`, adding changed
   atlas URL prefixes; this runs all tests and content validation; wait if another build holds
   the lock), run
   `node scripts/profile-audit.cjs <id>` (no errors allowed), then read the built page in
   `.cache/page-review/country/<id>/`. See `docs/BUILDS.md` for when a full build is needed.
5. **Commit that country before starting the next**, with only your own files, and a message that
   names the country and what changed ("Morocco: penalty tables, hemp and industry sections, 4
   history entries, 1980s Rif eradication article").
6. Add a line to the batch's progress note (below).

Finishing and committing each country means the work survives if the batch is interrupted, and
others see at once which countries are done.

## 3. Shared files

Most work touches only the country's own files (`countries/<id>.yaml`, its articles, its atlas
entries). A few files are shared by every country, and two agents editing them at once is where
work gets lost:

| Shared file | How to treat it |
|---|---|
| `changes.yaml` | Add entries with `node scripts/history-batch.cjs batch.json` rather than editing by hand, and commit soon after. Never stage someone else's entries. |
| `glossary.yaml` | Add words at the end of the right group; commit with the country. |
| `culture/*` atlas entries for several countries | Edit only the lines you need; check `git status` first. |
| `docs/DATA-MAINTENANCE.md`, `docs/WRITING.md` | Only when a rule really changes; not for progress notes. |

If a shared file already holds someone else's uncommitted changes, stage only your own lines
(`git add -p`, or write the file with only your changes into the index), and say so in your report.

## 4. Several agents at once

Parallel work is fine if each agent owns its countries and one agent coordinates:

- **The coordinator** picks the batch, gives each worker a different set of countries, and is the
  only one who edits `changes.yaml` and runs builds.
- **Each worker** edits only its own countries' files (profiles, articles, atlas entries for those
  countries) and returns its new or corrected history entries as a `history-batch.cjs` JSON file
  instead of editing `changes.yaml`, plus a short list of what it found and could not verify.
- The coordinator applies each worker's history file, builds once, checks the pages, and commits
  each country separately.
- Never let two workers have the same country, and never let a worker revert or reformat a file it
  does not own.

## 5. Progress note

Keep one note per batch in `docs/research/expansion-<date>.md`:

```markdown
# Expansion batch, 28 October 2026

Chosen from `country-gaps.cjs --rank 25 --region Africa`.

| Country | Done | Left | Commit |
|---|---|---|---|
| Morocco | penalty tables, hemp, industry, 4 history entries, 1 article | 1950s still thin; no source for 2019 arrest figures | abc1234 |
| Senegal | skipped: busy (another agent) | | |
```

Update it after each country and commit it with that country. It tells the next agent where to pick up.

## 6. When to stop or skip

- **The build fails because of someone else's unfinished work**: don't fix or revert their files.
  Finish your country's files, check them in the built page if the build gets far enough, note the
  blocker, and move on. If a committed file is broken and you were asked to keep the build working,
  make the smallest fix and say what you changed.
- **A country has almost no reachable sources**: write what the sources support, note the gaps in
  the progress note, and move on; never fill gaps with guesses or generic text.
- **Quality before count.** Three countries done properly beat ten with thin sections.

## 7. Report

At the end, report per country: what was added (sections, tables, entries, articles, atlas
entries), what was corrected (scores, statuses, facts), what could not be verified, and what is
left; plus the commits and anything that blocked you.
