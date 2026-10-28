# Expansion batch, 28 October 2026 (Europe-9)

Chosen from `node scripts/country-gaps.cjs --rank 25 --region Europe`;
excluding the five profiles just covered in Europe-8.
Batch: Malta, Jersey, Kosovo, Montenegro, Slovenia.

| Country | Done | Left | Commit |
|---|---|---|---|
| Malta | Statutory personal/supply ranges and life alternative; public-use table; retire products; medical list and production route; hemp/product distinction; five events and processing article; words and atlas links | Early decades; original industrial cultivation permissions; wider Maltese slang | 083aad5 |
| Jersey | Primary citations throughout; £200 third-offence row; hemp/planting; record retention and visitor discretion; 2025 dispensing total; three history entries and Parish Hall article | 2000s; current driving trigger and arrest series; current industrial licence conditions; local words | df4fe3c |
| Kosovo | Supply/import table; national enforcement and market data; research/cultivation distinction; two report events; 2004 code article | Early Yugoslav decades; local words; cannabis-only 2025 arrest total | ab0a33b |
| Montenegro | Correct €100–€2,000 structured ranges; five supply/facilitation rows; national market and complaints sections; research and confiscation; 2011 framework article; one report event | Early Yugoslav decades; local words; full enacted 2026 amendment text | 822f371 |
| Slovenia | Six supply/facilitation/medical-transfer rows; 0.3% hemp permit facts; medical dispensing evidence and certificate; 2026 research rules and forensic work; six words; five new events; new 2014 article and rewritten 2025 article | Early Yugoslav decades; current medical licence/stock totals; final disposition of personal-use bill | this commit |

Malta: read current Caps. 101, 537 and 628, original 2021 Act, ARUC January
2026 directive (downloaded PDF, pp. 32–34), March 2026 traffic amendment,
March customs answers, and August approved-products list. Current consolidated
628 contains the authority law; personal-use and association provisions are now
cited to 537, drug definitions and court-specific penalties to 101. Added the
criminal fine ranges and possible life sentence as structured fields; personal
cultivation outside the four-plant exemption is distinguished from supply.

Hemp status standard → none: the documented 0.2% exclusion concerns material and
products, while the plant-growing offence has household/licensed exceptions.
No distinct percentage-based industrial growing authorisation established.
The audit's hemp warning detects that product threshold and is intentional.
Medical approved-product lists establish authorisations, not every pharmacy's
stock. Scores unchanged. The 2026 processing event documents a directive, not a
new adult-use score increase; resin permissions already date to 2025. The road
law is publication-dated 10 March 2026. Three sourced terms are retained; no
unverified fourth slang word added to meet a count.

Malta validation: six-page review build passed all tests and content/citation
validation. Inspected the built profile tables, medical/hemp context and processing
article. Audit: zero errors, one explained hemp warning. Updated the existing
resin regression to read production and recreational after retiring products.
An initial test failure from concurrent Chad citations resolved before the retry;
no edits to Chad. Shared history was staged only for this country's five IDs.


Jersey: read consolidated drug law, current Attorney General directions, 2024
public-order law, official P.116/2025 PDF, original dispensing audit, July 2026
FOI and January 2022 scrutiny report. Corrected prescriptions/patients conflation:
72,065 is 2025 dispensed product items, with no unique-patient total. Parish Hall
fines remain criminal disposals in the table, not a national decriminalisation
claim; the standing score 2 is preserved. Medical access score unchanged.

Hemp section uses the scrutiny report's licence categories (≤0.2%), rather than
importing mainland UK policy. An older FOI text was indexed but its page failed;
no new 2017 date inferred from the inaccessible original. April 2026 disclosure
withheld Home Office reports in confidence; no inspection findings inferred from
redactions. Existing October prescribing-plans source could not be retrieved;
the profile now uses the accessible official audit and 2026 count. Proposed
personal-use reforms are marked withdrawn in the Assembly record, not current law.
All revised claims cite per sentence. No words added without a local source.


Kosovo: read the 2004 code and 2008 drug law as downloaded Ministry PDFs,
2019 Gazette metadata and drug provisions, 2023 amendment, national SOCTA and
2025 police annual report. Production status medical → none: the research
exception authorises acquisition/use, not commercial cultivation; no medical
patient supply route. Scores unchanged. Removed unsupported single-raid
superlatives and replaced “no series found” with national marijuana case/arrest
figures. Report totals are not convictions or personal-use-only counts. The
annual report's drug arrest total includes every drug; cannabis-only figure not
inferred. No precise publication day supplied for the two reports: year dates
preserved. No sourced local vocabulary or earlier Yugoslav dates established.

Kosovo validation: four-page build and rendered profile/article inspection passed;
all tests and citations valid, audit zero errors. One explained production warning:
text mentions research acquisition licences while cultivation remains prohibited.
A concurrent build lock required retry; shared history staged by the two own IDs.


Montenegro: read government 2013 consolidation, CINMED 2024 consolidation,
Criminal Code arts. 300–301, 2014 hemp regulation, July 2026 proposal and August
Gazette registry, and original national 2025 report. Scores/statuses unchanged.
The 2011 article distinguishes publication from provisions visible by 2013,
rather than dating the personal-possession fine to the original act. Research
section explains the land-registration exception; no invented clinical study.
The July proposal leaves possession ranges intact, but full enacted amendment
text was not accessible from the Gazette registry. No proposal provision promoted
to current law. Report seizure table gives 400.35285 kg marijuana, while narrative
rounds incorrectly to about 410 kg; used table. Plant narrative says 13,191 versus
13,254 in table: profile explicitly attributes the narrative count. Complaint
totals cover all drugs, not cannabis-only convictions or arrests.

Montenegro validation: three-page build, all tests and content/citation checks
passed; inspected rendered fine ranges, supply rows and article. Audit zero
errors/warnings. Retried after a concurrent build lock, without changing the lock.


Slovenia: read 2014 Gazette decree/PDF, contemporary NIJZ explanation, Ombudsman
2013 report, NIJZ prescribing report for 2024, 2025 Act, 2026 science permit rules,
Agriculture Ministry/inspectorate guidance, forensic poster, Fran dictionaries,
and traffic statute. Current scores unchanged. Corrected first medical score
step from 2013 to 5 July 2014, preserving the stable existing ID/URL. NIJZ dates
the government decision to 19 June 2014; Gazette publication 20 June with fifteen-day
commencement. Added December 2013 citizen bill separately. The 2013 report describes
ongoing debate, not legal access. Rewrote the 2025 article to correct its 2013 date,
add sentence-level primary citations and distinguish statutory routes from stock.

Medical section now reports actual incomplete pharmacy returns (prescriptions vs
preparations), rather than claiming universal flower availability. No full 2026
stock or licence total verified. Personal-use proposal remains labelled a draft;
TRIS records extended standstill to February 2026 but no final enacted text was
located. Driving corrected to blood/saliva trigger, urine-only medical referral,
and prescribed-medicine examination exception (Article 106). Scientific rules are
permissions, supplemented by actual National Forensic Laboratory chemical work
presented 10–12 May 2016. Six Slovenian words from Fran and NIJZ; hašiš corrected
from leaves to resin. No new atlas entry: Metelkova link retained. Shared history
staged only for five added IDs and the corrected existing medical step.

Jersey validation: five-page build passed tests and collection/citation validation;
inspected profile and Parish Hall article. Audit zero errors/warnings.

Slovenia validation: eight-page review build passed all 193 tests and collection/
citation checks. Inspected the profile, corrected 2014 article and rewritten
2025 article. Audit zero errors/warnings. An initial build encountered missing
citations in concurrent Kyrgyzstan edits; their author restored those sources
before the successful retry. No edits to Kyrgyzstan.

Batch complete: five countries, sixteen new history entries, one corrected
historical score date, five new articles and one rewritten article. Five profile
audits: zero errors, two explained warnings (Malta hemp; Kosovo production).
Current six-segment scores unchanged throughout. Other contributors’ work remains
uncommitted and was not staged.
