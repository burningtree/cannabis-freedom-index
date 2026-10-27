# Expanding one country

How to take one country and fill in what is missing: its history, articles, context sections,
penalty tables and links. Written for any agent or person working on the data. The detailed rules
live in the other guides; this file is the order of work and the rules that are easy to miss.

For a batch of several countries, or several agents at once, see `docs/EXPAND-COUNTRIES.md`.

Read first, once: `docs/DATA-MAINTENANCE.md` (data, sources, history entries, context sections,
penalty steps), `docs/WRITING.md` (how every text reads), and `docs/CULTURE.md` if you write an
atlas entry.

## 0. Before you start

- **Other people and agents work in this repository at the same time.** Run `git status` and
  `git log --oneline -5` first. Don't edit files that someone else has uncommitted changes in, and
  never revert or "fix" their half-finished work unless you were asked to.
- **Don't start dev or preview servers.** Check your work with `npm run build` and by reading the
  built HTML in `dist/`.
- **One build at a time.** If another `astro build` is running (`pgrep -f "astro build"`), wait
  for it to finish; two builds at once delete each other's files and fail with "Cannot find
  module … dist/.prerender".

## 1. See what is missing

```bash
node scripts/country-gaps.cjs ke            # the country's work list
node scripts/article-backlog.cjs --country ke   # which history entries most deserve an article
```

`country-gaps` lists missing context sections and statuses, penalty tables, texts without inline
citations, texts resting only on Wikipedia, the history by decade with empty decades, unchecked
entries, entries without an article, and atlas entries the profile does not link. Work through it
in the order below.

## 2. Current law first

The present legal state matters most. Before history or culture, make sure the profile is right
today:

- Read the current statute (national law portal, official gazette) and any recent amendment,
  court ruling or official guidance. Search news from the last two years for changes.
- Check the six segment texts and scores against what you find. If the law or practice has
  changed, **change the score too**, calibrated against comparable countries (look at a peer with
  a similar law and its scores), and add the change as a history entry with `before`.
- Add the **penalty tables** from the statute (DATA-MAINTENANCE.md, "Penalty steps"): possession
  and cultivation by amount, supply and trafficking on `sharing`, and `consumption` only where using
  is itself an offence. Put every figure in its field (minimum and maximum prison, minimum and
  maximum fine, caning, death), the law's word in `term`, and only conditions in `note`.

## 3. History

- Fill the empty decades and the time since the latest entry: first bans, new drug laws,
  amendments, court rulings, notable cases, raids, eradication, reports, debates, treaties.
- **Add every dated event you find**, without asking first, if a source supports it. It belongs in
  `changes.yaml` even if you found it while researching something else.
- An event that changed what an adult may do moves the score (`before`); everything else is a
  context entry with no `before`. The score line over time must make sense (DATA-MAINTENANCE.md,
  "The score timeline must make sense").
- Titles and descriptions follow WRITING.md: what changed for people, in plain words, two to four
  sentences, no lists of law numbers.
- Mark `checked: true` only for entries whose source you opened and read.

## 4. Articles

- Pick from `article-backlog.cjs --country <id>`: score-moving entries and the current law first.
- 350–500 words, three to five short sections, at most one small table (WRITING.md, "Articles").
- Cite per sentence with `[@n]`. Link the earlier and later history entries and the country page.
- Don't add a photo unless it shows the subject itself; no photos of buildings or logos of
  institutions.

## 5. Context sections

Write what is missing, in the profile YAML under `context` (DATA-MAINTENANCE.md, "Writing context
sections well"):

- **Required:** `recreational`, `medical`, `hemp`, `production`, `consequences`. Fold any old
  `products` section into them and delete it.
- **When researched:** `clubs`, `planting`, `visitors`, `driving`, `black_market`, `arrests`.
- **Where there is something real to say:** `culture` (connect every atlas entry of the country),
  `research` (science, not policy counting), `genetics` (real local plants only), `spotlights`
  (one to three things the scores do not show).
- Set the statuses: `hemp`, `production`, `research`, `clubs`, `driving`, `visitors`. Each must
  say what its text says; read the text before choosing, and never fill statuses in bulk.

How every section reads:

- Start with what a person meets; three to seven sentences; the **whole country**, not one city
  from one source.
- Every figure with its year and what it counts. Proposals are labelled as proposals.
- Cite every sentence (`[@key]`); when you revise an old text without marks, convert it.
- **Link generously** with Markdown: dated events to their history entries
  (`[legal since 1 July 2024](/history/germany-cultivation-associations-2024/)`), people and
  traditions to Culture, named organisations to their official website. A link is not a source.
- Don't explain words for cannabis or common jargon by hand: the term layer does it. Add new
  jargon to `glossary.yaml`, or write a Culture/Language entry for a local word for cannabis.

## 6. Culture and the atlas

- If you meet a tradition, a person or a local word for cannabis worth an entry, write one
  (CULTURE.md): 500–900 words, with images where an open-licence image of the subject exists.
- New history about an atlas subject goes into that entry's text with a link; the build checks it.

## 7. Sources

- Prefer primary sources: the statute, the gazette, the court, the regulator, the statistics
  office, the official evaluation. Good newspapers for practice and recent events.
- Wikipedia is a list of leads, not a source to rest on; keep it only where nothing else states
  the claim.
- UK government travel advice (GOV.UK, FCDO) only for the United Kingdom and closed countries;
  replace it elsewhere when you find a better source.
- Quote titles that contain a colon followed by a space in YAML: `title: "ABDA — Die Apotheke: …"`.

## 8. Check and finish

```bash
npm run build          # must pass; it checks schemas, citations and internal links
npm run profiles:audit # must report no errors for your country (node scripts/profile-audit.cjs <id>)
npm run seo:audit      # what the deploy runs after the build
node scripts/country-gaps.cjs ke   # the list should be shorter
```

- Look at the built page in `dist/country/<id>/index.html` for the sections, tables and links.
- Set the profile's `updated:` to today.
- **Commit only your own files**, with a message that says what changed for the country. Leave
  other people's uncommitted changes out; if a shared file holds their changes too, stage only
  your lines.
- Note in the commit message, or in a short `docs/research/` note for a large pass, what you could
  not verify and what is left.
