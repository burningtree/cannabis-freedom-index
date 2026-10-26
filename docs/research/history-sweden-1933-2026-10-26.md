# Research pass: Sweden 1933 prison article from two SOU reports

Research checked on 26 October 2026. Sweden's 1933 narcotics tightening
gains a properly-sourced article from two government inquiries read in
full-relevant part, and the entry gets per-sentence citations. No scores,
profiles or timelines changed.

## What was verified (all sources actually read)

- SOU 1967:41, Narkotikaproblemet del II — Kontrollsystemet (203 pp. PDF
  via KB weburn, relevant passage at printed p. 26): 17 October 1930
  kungörelse (coca leaf, cannabis, opium derivatives; processed-opium and
  cannabis-resin import/export/manufacture/possession/offer ban; fines for
  unlawful possession, §§6/10); 16 September 1933 kungörelse (§12 prison
  in aggravating circumstances; doctor/vet/dentist prescription
  penalties; Medical Board prescription-dispensing rules).
- SOU 2008:120, Bättre kontroll av missbruksmedel, part 1 (via
  regeringen.se contentassets PDF): ch. 4 account — coca/cannabis outside
  Hague controls, added by 1925 Geneva; covered by 1930 kungörelse;
  sharpened by 1933 kungörelse with prison where aggravating
  circumstances existed.
- New `articles/sweden-aggravated-drug-offences-prison-1933.md` (~330w
  body, 4 sections, both reports). Entry
  `sweden-aggravated-drug-offences-prison-1933` gains [@1]/[@1,2] markers
  throughout; both listed sources are now cited inline (previously none
  were).

Claim boundaries: the article stays inside the two inquiries' historical
accounts; no claim about the 1933 kungörelse's full text beyond what the
SOUs quote (dates, section 12, prescriber clauses).

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/sweden-aggravated-drug-offences-prison-1933/`
  citation marks checked.
- Commit limited to own work: the Sweden 1933 hunk in changes.yaml, the
  new article, this note, via pathspec. Foreign staged/worktree files
  excluded and preserved.
