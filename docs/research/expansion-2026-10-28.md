# Europe expansion batch, 28 October 2026

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`: Northern Cyprus,
Kosovo, Croatia, Romania and Moldova. Existing country sections and penalty tables are already
substantial; this pass prioritises primary-source history, articles and concrete profile gaps.
Other agents' changes in `source-archive.json` and their research notes are excluded.

| Country | Done | Left | Commit |
|---|---|---|---|
| Northern Cyprus | Original 1925 statute read; precise date; first-restriction article; 1956 consolidation added for north and Cyprus | 1930s–1940s, 1960s, 1980s–2000s still thin; seed trade and drug-driving trigger unverified | fa7a5cfc |
| Kosovo | 1950 cultivation-ban article; three documented Albanian/Serbian words; two 2026 history entries | Early Yugoslav decades; 1930 original code; 2026 table annex | 8b250a9f |
| Croatia | 1950 cultivation-ban and 2025 sentencing articles; 2024 asset-confiscation event and profile explanation; scoring rationale | 1930 original code and 1940s/1960s–1980s history | 67ca9f1a |
| Romania | Five history entries; 1969 and October 2026 articles; current proposal and primary-source consumption explanation | 1930s–1950s/1980s; original 2000 text retrieval; exact bill filing/status record | 721bfe2e |
| Moldova | Two articles; 1987 possession easing and two policy events; corrected repeat maximum and historical score timing; production links | 1934 territorial/first-ban reconstruction; 1940s–1960s; current quantity-table adoption | 417ad934 |

## Northern Cyprus source limits

The 1925 law itself prohibits cannabis imports/exports and delegates growing/possession/supply
controls to regulations. The exact commencement and scope of those original regulations remain
open; the existing editorial score vector is retained, rather than assigning new steps without
the regulations. The 1956 event records consolidation, without inferring a new score change from
its text alone. Current 1972 consolidated sections 3–8 and current official legislative-index
search were checked; no verified current adult-use reform was found. No speculative seed-trade
or driving classification was added. The original 1956 statute is also relevant to Cyprus, so
its contextual event is recorded there too.

## Kosovo source limits

The 1950 UN text was downloaded and read in full (PDF saved under `.cache/expansion-europe/`).
23 January dates the decree; article 21 makes publication the commencement trigger, so the article
keeps those distinct. The 1930 Wikipedia-derived first-ban account still needs its original code.
The 20 April 2026 cabinet account confirms a table update, but the annex could not be retrieved;
no cannabis rescheduling or score change is inferred. The 18 June operation was published on
25 June, with allegations and detention distinguished from conviction. Three locally attested
words were preferable to padding the list with unverified slang. The 2008 official law and
2012/2019 code sources were checked; core current penalties retained.

Kosovo validation: profile audit has zero errors (one existing licence/production warning).
All 193 tests pass. Two review-build attempts stop during global collection validation on
another agent's uncommitted `countries/ae.yaml`: mandatory life combined with an alternative
prison/death sentence. Kosovo pages have therefore not yet been rendered. No UAE files were
changed. Shared `changes.yaml` is staged by owned entry IDs only, excluding concurrent UAE and
Saint Kitts entries.

## Croatia source limits

Read original 1950 federal law, 2024 and 2025 gazette amendments, 2019 drug-act amendment,
2015 prescribing rules, current code articles 78 and 190–191, and the Justice Ministry's
2013 explanation. Current fine and detention tiers retained. The 2024 confiscation extension
and 2025 minimum increase are recorded without a whole-point movement: existing bands already
represent severe supply penalties, and the distinct giving-for-use offence remains unchanged.
No reform permitting recreational home growing was verified. The 1930 code needs a primary
source before an article can responsibly explain the first prohibition.

Croatia validation: zero profile-audit errors/warnings; all 193 tests pass. Review rendering
again stops on the concurrent UAE mandatory-life schema error before page output. Only owned
history-entry blocks are staged; other contributors' working changes remain untouched.

## Romania source limits

Read the 1969 official law and 1970 implementing instructions (explicit cannabis/resin/extracts/
tinctures list), current Law 143/2000, Law 339/2005 and Decision 596/2025. The 1969 date is adoption,
with the sixty-day commencement clause explained; the 1970 date is the instruction date, with
later publication and the linked commencement clause made explicit. The portal text contains
later amendments, so wording is not represented as a verified original 1970 snapshot. No new
score movement is assigned without comparing the earlier regime.

The AGERPRES sponsor release has an unreliable `/2026/01/01/` URL; the proposal is dated only
October, corroborated by the 7/9/16 October coverage. Repeated Senate B544/2026 page/annex
retrieval timed out, so the exact filing date, detailed fine tiers and latest parliamentary
procedural stage are not asserted. The release's conviction counts are explicitly attributed
to sponsors. Adevărul reports Fenechiu's later withdrawal. The prosecutor's objection is dated
9 October. Original 2000 text retrieval repeatedly returned 502, so the planned 2000 article
was deferred. Earlier 1950 decree/implementing decision and 1954 reporting rules remain leads,
requiring their original schedules and a comparison with preceding controls.

## Moldova source limits and timeline correction

Read the 22 June 1987 amending Soviet edict in full, the consolidated 1974 parent edict, the
2015 Constitutional Court judgment, Law 201/2025, Law 173/2026, the April hemp announcement,
May 2025 Council of Europe launch, August 2026 medicines-agency announcement and October
strategy announcement. The first small-possession tier allowed up to 100 roubles, corrective
labour or exceptional fifteen-day administrative arrest. Repeat acquisition/possession within
a year carried up to TWO years, not the three years in the previous source locator. The
new Article 10.1 cultivation repeat offence had a separate three-year maximum; these must not
be confused.

The possession improvement from 1 to 3 now sits at the 1987 amendment. The 2009 code entry's
possession `before` is rebased from 1 to 3 so it no longer suggests that small possession first
left criminal law in 2009. Its other segment values and all current scores are unchanged.
The chain check reports no flagged steps. The 1974 date is narrowed to 25 April and its
unsupported claim of complete pre-1974 impunity is removed. The parent text is a later
consolidation; the article identifies the separately dated 1987 additions and does not backdate
them to 1974. Original 1974 printing and Moldavian republican implementing amendments remain
worth finding. The 1934 first-ban account needs territorial reconstruction (much of present
Moldova was outside the USSR until 1940), so no speculative first-ban article was written.

The 26 August 2026 event records approval of national controlled-substance tables and an
information system, distinct from the still-draft quantity-classification replacement on
Particip.gov.md (last recorded promotion stage 22 September). No numerical cannabis threshold
is inferred. The 22 May 2025 project is correctly described as policy support; no Research
section is filled with policy monitoring. The October strategy article describes planned
services and the future 2027–2032 implementation programme without claiming they already exist.

Moldova validation: zero profile-audit errors/warnings, all 193 tests passed at the review
build, eight selected pages rendered successfully. The existing April hemp article was
reviewed and retained; new articles cover the 1974 possession rules and October 2026 strategy.
Earlier pages will be included in a final combined review because other builds replace the
shared review directory. No current status or score changed.

## Final validation

All 196 tests pass, including the newly added history-link integrity tests. A combined review
build rendered all 26 changed country/history pages successfully, including the earlier Kosovo
and Croatia pages. Their HTML was inspected for the articles, linked events, rendered references
and profile context; no unresolved citation marks remained. The snapshot is in
`.cache/expansion-europe/final-review/` and its log in `final-build.log`. Five profile audits
report zero errors; Kosovo retains one existing warning because research licences occur in a
production section correctly classified as no commercial production. Moldova's history chain
has no flagged steps. A final citation pass adds sentence-level marks to this batch's articles.

Totals: five selected countries, eight new articles, thirteen new contextual/scored events
(including the Cyprus counterpart of the 1956 colony-wide law), three locally attested words,
and a correction of the timing of Moldova's possession easing. Current scores are unchanged.
Unverified first-ban details, sparse decades and inaccessible annexes remain listed above.
All shared history changes were staged by owned IDs once concurrent edits appeared; other
contributors' profiles, history entries, source archive and assets were left out of our commits.
