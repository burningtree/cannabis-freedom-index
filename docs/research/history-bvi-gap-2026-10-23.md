# British Virgin Islands history and profile review — 23 October 2026

This batch adds six history entries, revises two, writes two articles and converts
six score explanations and six context sections to inline citations. Scores and
status classifications are unchanged. Evidence, extraction scripts and verification
outputs are retained locally in `tmp/history-bvi-gap-2026-10-23/`.

## Sources read and their limits

- The Financial Services Commission's official *Drugs (Prevention of Misuse) Act*
  PDF was downloaded and extracted (`law.pdf`, `law.txt`). Relevant definitions,
  sections 5–11, 29–30 and 34, amendment notes and schedules were read. The front
  matter dates original commencement to 30 September 1988. This is a later
  consolidation: its detailed present penalties are not backdated to 1988.
- Its amendment note dates the replacement of section 7 to 28 September 1995.
  Possession of more than 50 grams of cannabis **or resin** creates a rebuttable
  supply presumption. Possession below that boundary remains an offence. The
  earlier section was not recovered, so this is a rewrite, not a claim that the
  presumption first appeared in 1995.
- Section 30 was inserted on 27 November 1996. It requires vehicle, ship or
  aircraft forfeiture after a trafficking conviction and the specified findings
  about possession/control and use or intended use. Owner restoration procedures
  apply. This trafficking asset consequence has no defensible whole-point change
  to the personal-use index and is explicitly unscored.
- The official House passage register was recovered from Internet Archive
  (`passage-archive.pdf`, snapshot 18 May 2023). PDF page 2, second-session rows
  26–27, was extracted and visually checked. Licensing passed on 30 June 2020;
  the drugs amendment passed on 2 July. Both assent/publication columns are blank.
- The published licensing bill was recovered from the 19 October 2022 archive
  (`bill2020-archive.pdf`). Its licensing authority, production, commencement and
  dispensing provisions were read. This published proposal is not certified as
  identical to the final text passed with amendments. Dispensing conditions are
  explained as proposed rules; passage alone did not open dispensaries.
- Governor Augustus Jaspert's complete 10 December 2020 statement was recovered
  from the 23 January 2026 archive (`governor-archive.html/.txt`). It supplies the
  corrected exact event date and the UK Home Office arrangements requested for
  licensing, plus referral of the expungement bill for assent. Its description of
  Home Office powers is attributed to 2020, not asserted as a fresh 2026 finding.
- The Cayman Islands Law Reform Commission's discussion paper dated 1 July 2026
  was downloaded (`lrc2026.pdf/.txt`). Section 5.4, printed pages 17–19 and its
  notes, was read. It still describes both bills as awaiting assent. This is the
  latest verified status in this batch, not an October government confirmation.
  The expungement proposal uses 50 grams of cannabis but **10 grams of resin**,
  unlike the existing supply presumption's 50-gram resin threshold.
- Virgin Islands News Online's 21 June 2015 report was read in full, excluding
  comments (`fine2015.html/.txt`). Thomas Mannix's hearing was on 19 June, after
  his 12 March arrival with 15.2 grams. The reported sentence was $5,000 immediately
  or six months in prison. Payment or service of that default term is unverified;
  one case does not establish a typical tariff.
- Its 2 July 2020 report of Carvin Malone's 30 June remarks was read in full.
  Employment and police-certificate concerns are attributed to the minister;
  his medical-user framing is not treated as the bill's final eligibility test.
- Its 23 January 2023 report of Premier Natalio Wheatley's press conference was
  read in full (`premier2023.html/.txt`). Doctor-administered cannabis and possible
  ministerial regulations were proposed routes, with work still outstanding.
  Neither the report nor general statutory regulation-making powers proves that
  an operational patient programme followed.

The original government links now fail; exact successful archive addresses and
source metadata are in `sources.json`. Failed factsheet/consultation links,
blocked reporting, search snippets and US Virgin Islands reforms were not used
as evidence for BVI events. The existing 1937 entry was left unchanged because its
original source was not reread in this batch.

## Profile correction and scoring

Section 11 expressly prohibits smoking or otherwise using controlled drugs. The
previous implication that use was handled only through possession was corrected.
The six numeric segments remain possession 1, cultivation 1, enforcement 2,
sharing 1, consumption 1 and access 0 (overall 11). Medical remains `none`:
generic ministerial powers and an unfinished proposal do not prove patient access.
Unsupported broad claims about product availability were replaced with sourced
statutory controls and dated descriptions of the proposed reforms.

## Validation and commit scope

The batch verifier checks event categories/tags, article length and headings,
inline citations, source identity deduplication, related links and preservation of
profile scores/statuses. Articles contain 368 and 377 words, each with four headings.
The VG score chain has no flagged transitions. The full production build passed: 3,855 pages in 31.50 seconds. Rendered checks
passed for 101 citation links, nine tag pages, history exports and the VG API;
the current score is 11 and the medical label is None. `git diff --check` passed.
Generated site output was deleted after verification.

Other work is present in the shared history file, other country profiles, source
archive and scripts. The commit is assembled through a separate temporary Git
index, taking only these eight BVI event objects, the BVI profile, two articles
and this note. A parent-to-commit object audit checks that unrelated history
entries are unchanged. Other working-tree and staged changes are preserved.
