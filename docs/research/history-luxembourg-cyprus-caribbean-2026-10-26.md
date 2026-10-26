# Research pass: Luxembourg 1953 + Cyprus 1925 articles; Barbados/St Vincent precision

Research checked on 26 October 2026. Two new properly-sourced articles from
primaries read in full (Luxembourg Mémorial PDF, three UN E/NL filings), plus
precision upgrades with per-sentence citations to four entries. No scores,
profiles or timelines changed.

## What was verified (all sources actually read)

- Luxembourg Mémorial A 1953 no. 72 PDF (6 pp., via Legilux filestore):
  grand-ducal arrêté of 25 September 1953 executing the 28 April 1922 toxic
  medicines law — Art. 1 (WHO-recognised addiction substances + preparations,
  import/export only with prior health-minister authorisation, yearly list),
  Art. 2 (holding/supply/acquisition/sale/manufacture licensing, revocable,
  listed pharmacists/doctors/vets/depots excepted), Art. 18 (1922-law
  penalties), repeal of 1922/1923/1952 orders, 1946 NY-protocol lineage; and
  the 19 October 1953 ministerial order — Art. 1 item 25 (Indian hemp, resin,
  extract, tincture), Art. 2 (external-use extract/tincture preparations
  exempt). New `articles/luxembourg-indian-hemp-controlled-1953.md` (~360w,
  4 sections). Entry gains [@1]/[@2] markers throughout.
- UN E/NL.1949/20 (Cyprus), E/NL.1952/22 (Barbados), E/NL.1949/33
  (St Vincent), all three PDFs fetched from documents.un.org and read:
  1948 Cyprus Order in Council No. 2281 (s.11(2), amidone + Metopon, Indian
  hemp in comparator clause proving s.11(1) base-list coverage); 1951
  Barbados Application Order (s.10(2), 6 Dec 1951, Part IV import/export
  licensing incl. non-external-use Indian-hemp extract/tincture
  preparations); 1947 St Vincent Application Order No. 24 (s.13(2), made
  25 Apr / gazetted 6 May 1947, Part V, same Indian-hemp preparation
  wording). New `articles/cyprus-dangerous-drugs-law-1925.md` (~330w,
  4 sections, all three filings as sources). Three entries rewritten to say
  exactly what the filings prove, with the principal-text caveat kept.
- Cyprus entry date error corrected: old text said "1947 order"; the filing
  shows made 5 March 1948, deemed in force 1 January 1948.

Claim boundaries: none of the three filings reproduces its principal
Act/Ordinance/Laws, so base-list coverage is asserted only where the order
text itself proves it (Cyprus s.11(1) via the comparator clause) and left
open for Barbados/St Vincent. The Luxembourg article stays inside the 1953
texts; the entry's old unsourced closing sentence ("use not an offence until
the 1973 drug law") was removed because the 1973 text could not be verified
this pass (Legilux ELI page is JS-rendered; EUDA country-report PDF fetch
returned HTML). Re-adding it needs the 1973 Mémorial text.

## Dead ends recorded, not forced

- Luxembourg 1973 use-criminalisation point parked (see above).
- No article from the Barbados/St Vincent orders alone: one operative
  extension each is entry-grade, not article-grade, without the principal
  Act texts.

## Verification and files

- `node -e` YAML load of changes.yaml clean before build.
- `npm run build`, `npm run history:test`, `npm run answers:test` green;
  rendered `/history/luxembourg-indian-hemp-controlled-1953/` and
  `/history/cyprus-dangerous-drugs-law-1925/` citation marks checked.
- Commit limited to own work: four entry hunks in changes.yaml, two new
  articles, this note, via pathspec. Foreign staged/worktree files excluded
  and preserved.
