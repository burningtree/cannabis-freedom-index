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
| Romania | Five history entries; 1969 and October 2026 articles; current proposal and primary-source consumption explanation | 1930s–1950s/1980s; original 2000 text retrieval; exact bill filing/status record | This country’s commit |
| Moldova | Pending | | |

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
