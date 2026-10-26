# Research pass: Mauritius 1883 article improved, not replaced

Research checked on 26 October 2026. An 11 October article on the Mauritius
1883 legalisation already existed and was kept: its structure, voice and
entry links were preserved, while its thin sourcing was upgraded with
detail re-read from the Banks chapter and a Seychelles link. No scores,
profiles, timelines or history entries changed.

## What happened

- A first draft overwrote `articles/mauritius-legalisation-1883.md`
  wholesale. Caught before verification: the file was tracked (commit
  1b5eded, 11 October). The overwrite was reverted (`git checkout --`) and
  the new material was merged in as targeted edits instead.
- Merged additions, all re-read in the local EPUB (`books/Cannabis Global
  Histories (Lucas Richert and James H. Mills).epub`, chapter_3.xhtml):
  455,000 indentured migrants and the ganja complex; stramonium among the
  1848 poisons; Pearson's Beau Bassin speculation and the Davidson/Monty
  split; the 12-vs-3 admission statistics behind the 1893 petition;
  Monty's drink-and-misery rebuttal with falling Indian admissions;
  Chastellier's warning that statistics rested on policemen's word.
- Converted the article to per-sentence citations (it previously had
  none); front-matter locator sharpened to name the Mauritius narrative;
  added the Wikipedia Seychelles source for the new closing sentence on
  the word-for-word 1882 copy (the chapter does not cover Seychelles).
- Kept untouched: the original's opening, section order, all four entry
  links, the scores sentence and the illegal-today close.

## Verification and files

- 416 words, 4 sections, both sources cited at least once.
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/mauritius-legalisation-1883/` citation marks checked.
- Commit limited to own work: the article hunk plus this note; changes.yaml
  untouched. Foreign staged/worktree files excluded and preserved. The
  /tmp draft of the discarded full rewrite was not committed.
