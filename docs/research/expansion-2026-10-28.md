# Europe expansion batch, 28 October 2026

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`: Northern Cyprus,
Kosovo, Croatia, Romania and Moldova. Existing country sections and penalty tables are already
substantial; this pass prioritises primary-source history, articles and concrete profile gaps.
Other agents' changes in `source-archive.json` and their research notes are excluded.

| Country | Done | Left | Commit |
|---|---|---|---|
| Northern Cyprus | Original 1925 statute read; precise date; first-restriction article; 1956 consolidation added for north and Cyprus | 1930s–1940s, 1960s, 1980s–2000s still thin; seed trade and drug-driving trigger unverified | fa7a5cfc |
| Kosovo | 1950 cultivation-ban article; three documented Albanian/Serbian words; two 2026 history entries | Early Yugoslav decades; 1930 original code; 2026 table annex | 8b250a9f |
| Croatia | 1950 cultivation-ban and 2025 sentencing articles; 2024 asset-confiscation event and profile explanation; scoring rationale | 1930 original code and 1940s/1960s–1980s history | This country’s commit |
| Romania | Pending | | |
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
