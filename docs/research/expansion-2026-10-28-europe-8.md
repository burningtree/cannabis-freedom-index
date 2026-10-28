# Expansion batch, 28 October 2026 (Europe-8)

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`.
Batch: Bosnia and Herzegovina, Moldova, Northern Cyprus, Liechtenstein, Faroe Islands.
Existing uncommitted profiles and shared files belong to other contributors.

| Country | Done | Left | Commit |
|---|---|---|---|
| Bosnia and Herzegovina | Federal 1977 offences and April 2026 access meeting; 2006 state-law article; added profile history links | 1940s/1960s/1980s; first-ban primary text; driving, nationwide arrests and words | 58098ac |
| Moldova | Nationwide all-drug proceedings; expanded market context; October strategy; four history entries and hemp-rules article | Soviet-era primary law and empty decades; current quantity-table replacement; driving and local words | 6da4150 |
| Northern Cyprus | 2026 school survey and programme figures; supervision/testing detail; four sourced Turkish terms; two history entries and survey article | Early laws/amendments; planting, drug-driving trigger and nationwide arrest/market series | 5d51cdb |
| Liechtenstein | Four statutory tables; all required sections; hemp/CBD correction; medical production/research permits; twenty 2025 permissions; terms; six events, corrected feed-law event and 2014 amendment article | 1950s/1960s; original 2019 product-authorisation dates; full seed trade and current schedules; national arrest series | ad8a340 |
| Faroe Islands | Four offence tables, hemp section and licensed-growing details; record disclosure consequences; seed status correction; four terms; four events and 2026 regulations article | First-ban estimate and 1960s–2000s original amendments; present local medicinal output; cannabis-only arrests | this commit |

Bosnia: reread the state law, Federation criminal provisions, medicines-agency
notice and September 2026 ministry update; no present score change. The Refworld
1977 federal code is a consolidated translation: the entry identifies the retained
text and does not claim that every sentence range originated on that date.
The 1980 UN legislative circular download was blocked; no event inferred from its
catalogue. Existing 1950 article candidate remains for original-text retrieval.
Shared history is staged only for this batch's IDs. A temporary wrapper of the
history runner accepts all existing YAML date quoting styles without changing
the repository script.

Bosnia verification: profile audit 0 errors/0 warnings. Targeted build retried
after another build released its lock; tests then stopped on another contributor's
unfinished `countries/in.yaml` citation lists (ndps, ndps31a, ipl, hg,
wikibhang, odisha_driving). No changes to that file. Page inspection is pending a
passing build later in this batch.


Moldova: current Law 201/2025 and 2026 penalty amendment reread; unchanged scores.
All-drug prosecution counts are labelled separately from cannabis quantities.
The seed interception records a pending investigation before the new law commenced,
not a conviction or a present blanket seed prohibition. The April 2026 ministry
bill announcement was found but its full page timed out; the enacted August
penalty record already exists and is retained. Older timeline entries still need
original Soviet/republic texts; no article fabricated from secondary summaries.

Moldova verification: targeted build passed all tests and content validation,
rendering all six selected pages. Read the built country, hemp article and strategy
HTML; proceedings, references and October event appear. Profile audit 0 errors,
0 warnings. Bosnia will be rendered again in the final verification pass.


Northern Cyprus: downloaded and read original Gazette 68/2016, pp. 361–368;
confirmed original eligibility, one–three years, testing interval and poverty
fee exemption. The 2015 appeal archive exposes reasoning but locks its ending;
no article or new outcome inferred from that incomplete view. The August panel
was held 21 August (published 25 August), and the school sample is separate from
the all-drug supervised-release count. September official account retrieved with
curl after web timeouts. No current-law change or score change established.

Northern Cyprus verification: targeted three-page build passed tests and content
validation; read rendered survey/sample, 218 programme count and testing text.
Profile audit 0 errors/0 warnings. Existing treatment and 1972 law articles remain;
the new article explains the 2026 survey alongside the statutory treatment route.


Liechtenstein: personal cultivation shares Article 21's own-consumption rule;
substitute custody applies only to an uncollectible fine, clearly qualified in
all affected rows. Scores remain in their criminal fine/lesser personal-growing
bands. Changed production none → medical (statutory exceptional permissions),
added hemp high (<1% boundary; not including 1%), and licensed research.
Removed foreign travel advice and unsupported blanket criminal-record claim.
Retired legacy products and converted revised text to inline primary citations.

The old “2005 bans hemp entirely” record was unsupported: the 2004 statute
expressly exempts registered agricultural varieties, and the current law uses 1%.
Preserved its stable ID but corrected it to the actual 31 October 2011 customs
notice documenting applicable Swiss feed rules, avoiding an inferred local 2005
commencement. Original Swiss 2005 feed prohibition and its later revisions remain
separate from cannabis narcotics. The 2014 amendment entry uses adoption; its
commencement links to the HMG's 1 April 2015/referendum clause. Exceptional medical
permissions do not prove unrestricted patient flower access. The inherited 2019
entry's exact product-authorisation dates still need primary confirmation;
current access is independently supported by 2025 actual permits, score unchanged.

Liechtenstein verification: eight-page build passed tests/content validation and
rendered all changed history pages. Read country tables, threshold article and
corrected feed-law page. An existing regression required “50,000 francs”; kept
that equivalent wording. Added two missing driving citations after inspection;
final batch build will re-render them. No tests changed.


Faroe Islands: removed the misplaced enforcement penalty table and put ordinary
fine-or-two-year maxima on possession, cultivation, sharing and consumption.
Sharing separately identifies serious cannabis smuggling under §191 using the
Faroese police's own ten-year statement. No Danish mainland fine tariff imported.
Hemp is strict (0.2%) with annual permits and continuous 0.3-hectare plots. Seeds
changed legal → grey: exclusion from cannabis possession is not permission to sow.
Production remains medical, reflecting the statutory route without claiming a
verified local operator. The 2026 regulation's state scientific exceptions are
preserved in the article; no invented research institute or output.

Original 1969 and 1988 instruments could not be retrieved, so their catalogue
references alone do not become invented substantive events. The retained first
restriction estimate still needs an earlier cannabis-specific schedule. A 2025
proposal concerning a 2027 authority transfer was found, but enactment was not
verified and is not described as current law. Police counts cover all drugs;
hash weights count seizures, not consumption or market size. Scores unchanged.


Final verification: all 193 tests passed, and the combined review build rendered
26 pages covering all five profiles, all eighteen new events, the corrected
Liechtenstein record and the existing history pages receiving articles. Inspected
rendered profiles, penalty conditions, hemp thresholds, citations and linked
articles. A final six-page build passed after a short article wording correction
and the added driving citations. All five targeted profile audits report zero
errors and zero warnings. Bosnia's earlier India-citation blocker is resolved in
the shared working tree and its final pages were inspected successfully.

Batch totals: five expanded profiles, eighteen new history entries, one corrected
history record, five new articles, eight newly placed statutory penalty tables,
and twelve sourced local-language terms across three profiles. All six score
vectors are unchanged. No atlas entries were created. Remaining gaps and source
limits are listed per country above. Unrelated working-tree changes are preserved;
only this batch's history IDs were staged, never the entire shared history diff.
