# Expansion batch, 27 October 2026

Chosen from `country-gaps.cjs --rank 25`: Central African cluster (neighbours, shared
French/Belgian colonial drug-law heritage, all in the top 25 most-needed).

Prior history groundwork exists in `docs/research/`: `history-dr-congo-gap-2026-10-23`,
`history-drcongo-triage-2026-10-26`, `history-cameroon-gap-2026-10-21`,
`history-cameroon-followup-2026-10-26`, `history-central-african-republic-gap-2026-10-21`,
`history-uganda-gap-2026-10-21` + `-2026-10-23`, `history-uganda-1902-*`, `history-rwanda-gap-2026-10-21`.

| Country | Done | Left | Commit |
|---|---|---|---|
| DR Congo (cd) | recreational + hemp sections, products folded, 4 penalty tables, inline citations + history/culture links throughout, culture section linking all 4 atlas entries, 1 new history entry (1977 psychotropics accession) | 1920s–1960s, 1980s–1990s still empty (no post-1917 penal statute found; Leganet indexes only the 1903/1917 ordinance); no arrests/driving/planting sections (no reliable source); no article (no score-moving entry lacks one) | |
| Cameroon (cm) | recreational + hemp sections, products folded, 4 penalty tables (XAF fines verified in Law 97/019), inline citations + history links throughout, production/medical rewritten with sources, 5 new history entries (1962/1981/1991 treaty accessions, 2002 narcotics subdirectorate, 2014 airport cells) | 1930s–1940s still empty; no arrests section; first-restriction estimate still unverified and article-less by choice (no article on an undated estimate) | |
| Uganda (ug) | recreational + hemp + black_market sections, products folded, 4 penalty tables (UGX fines verified in 2024 Act), inline citations throughout, dead African Business source replaced with UG Standard, new commencement article (494 words) | 1910s–1970s + 2000s still empty (HRAPF colonial lead undated; 1971 Convention shares the 1988 Single Convention date); no arrests section; no atlas entries so no culture section | |
| Rwanda (rw) | recreational + hemp + black_market sections, products folded, 4 penalty tables (RWF fines verified in 2018/2019/2023 laws), inline citations + history links throughout, culture re-cited to Codere chapter read locally, FDA register re-verified with zero hits, 2 new history entries (1971 psychotropics, 2017 Rubavu seizure) | 1920s–1950s + 1990s still empty; no clubs/driving sections (no reliable source); first-restriction estimate article-less by choice | |
| Central African Republic (cf) | recreational + hemp sections, products folded, 4 penalty tables (XAF fines verified in Law 01.011), inline citations + history links throughout, production status medical→none (research-only authorisations, consistent with Cameroon), FCDO advice removed from visitor-facing texts per new audit rule, 1 new history entry (1971 psychotropics, same-day as other two) | 1930s–1990s still empty (Empire-era Wikipedia lead is an undated survey claim, IA copy restricted); no planting/driving/arrests sections; 1926 decree article left to the Chad federation piece | |

## Batch 2, 27 October 2026: West Africa

Chosen from `country-gaps.cjs --rank 25`: francophone West Africa plus Guinea-Bissau
(Mano River/Casamance/Sahel trafficking links; shared French colonial drug-law
heritage for ci/sn/tg/ml). Prior groundwork: `history-mali-gap-2026-10-21`,
`history-senegal-triage-2026-10-26`, `history-togo-gap-2026-10-21`,
`guinea-bissau-equatorial-guinea-laws-2026-10-15`.

| Country | Done | Left | Commit |
|---|---|---|---|
| Côte d'Ivoire (ci) | recreational + hemp + driving + culture(diamba) sections, products folded, outdated Koaci-2021/Leafwell claims replaced with 2022 law tariffs (incl. art 7 direct-supply tier), 4 penalty tables, citations + links throughout, 2025 Moossou seizure read | 1930s–1950s + 2000s–2010s still empty; no arrests section (no reliable source) | |
| Senegal (sn) | recreational + hemp + culture(yamba/diamba) sections, products folded, weak thesis-only claims replaced with 1997 Code provisions verified in full SHERLOC text (arts 8–108) + thesis for art 109/120 practice nuance, 3 penalty tables incl. 2007 forced-labour revision, citations + links throughout, Feb 2026 gendarmerie practice figures read | 1930s–1950s + 2010s still empty; no driving section (no reliable source) | |
| Togo (tg) | recreational + hemp + arrests + driving sections, products folded, 2015 code + 1998 law fully verified by own reads (incl. art 268 drug-driving), 4 penalty tables, citations + links throughout, 2026 transit-corridor report read | 1920s–1950s + 1980s + 2000s still empty; first-restriction estimate article-less by choice | |
| Mali (ml) | recreational + hemp sections, products folded, 2001 law penalty provisions verified in own gazette read (arts 94–95/98/137–138), hemp 2017–2020 saga re-read in both Maliweb pieces, 4 penalty tables, citations + links throughout | 1930s–1950s still empty; no driving/arrests sections; nothing new since 2020 found | |
| Guinea-Bissau (gw) | recreational + hemp sections, products folded, Decree-Law 2-B/93 verified in own Portuguese read (arts 3/20–22), 4 prison-only penalty tables (no fine figures in law), citations + history links throughout | 1920s–1960s + 1980s + 2000s–2020s still empty (cocaine-dominated news, nothing cannabis-specific recent); no driving/arrests sections; first-restriction estimate article-less by choice | |

## Batch 3, 27 October 2026: Southern Africa

Chosen from `country-gaps.cjs --rank 25`: Mozambique, Zimbabwe, Malawi, Namibia
(neighbours; shared SADC history; South Africa skipped as BUSY — another agent is
reworking its entries and articles). Note: changes.yaml holds that agent's uncommitted
SA rewrite, so this batch makes no history-entry edits; history additions are deferred.

| Country | Done | Left | Commit |
|---|---|---|---|
| Mozambique (mz) | recreational + hemp + culture(mbanje/suruma) sections, products folded, Law 3/97 penalties re-verified (REFORMAR analysis + 2024 Supreme Court judgment read), 4 penalty tables incl. art 36 fine in current meticais, citations + links throughout | 1920s–2000s gaps mostly remain; no driving section; no new history entries (changes.yaml blocked) | |
| Zimbabwe (zw) | | | |
| Malawi (mw) | | | |
| Namibia (na) | | | |

## 2026-10-27 ~21:50 UTC — zw.yaml answers.culture incident (resolved)
- After my zw rewrite, an invalid `answers.culture` block (verbatim copy of my context.culture text) was found in countries/zw.yaml and broke `npm run build` (`Unrecognized key: "culture"`).
- User confirmed no other agent is editing Zimbabwe; treated the block as my own artifact and deleted it, keeping answers.buy.
- Build passes again after removal; zw verification re-run clean.

## Malawi (mw) — done 2026-10-27 ~22:05 UTC
- Profile rewritten (135 → ~340 lines): recreational, hemp (status high, 1% THC), black_market, arrests, culture sections added; products folded; possession + cultivation penalty steps (segment-level currency MWK; life maxima as notes since parseDuration has no life);	inline [@x,y] multi-citation form; answers.buy.
- Primary law verified in full via pdftotext: Cannabis Regulation Act 2020 (FAOLEX) — s50(1)/s51 K50M + 25 yrs, hemp 1%, qualified-patient registry; Dangerous Drugs Act Cap 35:02 (trade portal) — Act 25 of 1956(F), 1 Apr 1956 commencement, s19(1) K500,000 + life (as amended 1995), s20 warrantless arrest.
- News: SALC youth review (2022), dreadlocks order Jan 2020 (Ntaba), Face of Malawi seizures (Jenda May 2024, Ntcheu Oct 2025, Kawale Feb 2026), PANA 2000 (952 cases/36.6t 1999), VOA/Nation 2024 debate, FurtherAfrica 86 licences 2021, HeKa Dec 2025, ZennJet RED guide, MMJ Bandawe 2022, GrowerIQ.
- Duvall re-read for Malawi passages (local PDF): ch.4 Chichewa vocabulary/1892 Scott dictionary/Yao chamba map; ch.5 packets, 1906 heartland, pre-1922 Lake Malawi cough story. Culture links: chamba, earth-pipe (Ngoni), smoker's-cough.
- History: added malawi-dangerous-drugs-act-1956 (unscored, fills 1950s gap); related-links on 2020/2021/2024 entries. No 1980s/1940s source found; post-2024 news checked (seizures only, nothing score-moving).
- Articles: malawi-local-chamba-2024, malawi-medical-industrial-2020 (mw entries without an article: 8 → 7, counting the new 1956 entry).
- Audit 0/0, history+answers tests pass, build 4876 pages, HTML verified (2 pen tables, 12 history + 4 culture links).

## Namibia (na) — done 2026-10-27 ~22:15 UTC
- Profile rewritten: recreational, hemp (none), black_market, culture sections added; products folded (was "None"); possession + cultivation penalty steps (segment-level NAD; rands in 1971 text); wiki-only texts replaced; answers.buy; inline [@x,y] form.
- Tariffs from UNAM LL.M. thesis (Apr 2017, quotes Act verbatim): s2(a) dealing R30k/15yrs first, R50k/25yrs after; s2(b) possession/use R20k/10yrs first, R30k/15yrs after; s10 115 g presumption. Practice: Mwatongwe 2020 (2yrs), Hafeni 2016 (N$3k/18mo), Swartbooi 12mo.
- News: Swartbooi presumption challenge dismissed 2026 (Prinsloo, nam1); Jaftha/Ndungula 2021 suit (Amoomo, nam2); Jaftha jailed Oct 2023 (Sun, verified); Claasen dismissal July 2026 (verified); New Era Mar 2025 stats; ZennJet RED guide (no medical framework, dronabinol only, foreign scripts incl. CBD not recognised, 2020 petition failed).
- Duvall re-read: dagga/dukan etymology debate, diffusion into Namibia (1880s travellers, east, Ovambo-Herero), Herero onyungu. Culture section has history link (1971 Act) since no atlas entries exist for na.
- History: added namibia-dealing-presumption-upheld-2026 (unscored, year precision); related-links on 2021 entry. No 2010s/1980s/1920s-60s source found.
- Article: namibia-constitutional-challenge-2021 (2021→2023→2026 arc + Swartbooi sidebar).
- Audit 0/0, history+answers tests pass, build 4881 pages, HTML verified (2 pen tables NAD, 11 history links).

## Europe batch: Russia, Ukraine, Moldova, Belarus and Lithuania

Chosen from `country-gaps.cjs --rank 25 --region Europe`; profiles checked afresh before each country because other contributors are active.

| Country | Done | Left | Commit |
|---|---|---|---|
| Russia | Four penalty tables; recreational, hemp and culture sections; products folded; production status corrected to hemp; Wikipedia-only medical/consequences/clubs/enforcement replaced; May 2026 sentencing proposal recorded | 1950s gap; further enforcement statistics and research/genetics; first build blocked by another contributor’s invalid Namibia citation; retry follows | be8b67c |
| Ukraine | Four penalty tables; recreational/hemp sections; 0.2% transitional hemp ceiling corrected; products folded into patient access; July 2026 digital rollout entry; 2026 dispensing article | 1940s–1950s gaps, 1934 article and culture links remain; numeric quantity endpoints kept out of ambiguous inclusive table ladders | bc48fb1 |

Russia and Ukraine verified in the successful 4,908-page build (27 October); both audits report zero errors/warnings. Russia proposal history was picked up by another contributor’s shared-history commit before the profile commit. Shared build retries were required; no other contributor’s files were changed.

### Moldova

Four penalty tables and recreational/hemp sections; products folded, industry status none→hemp. Replaced unsupported two-to-seven-year blanket claim with Law 173/2026 enacted tariffs (28 August): administrative possession MDL10,000–15,000; basic supply six–ten years; separate public-use fine. Three new entries (2024 hemp authorisation, April 2026 processing rules, August 2026 penalties), plus current-law article. Corrected Law 201 commencement February→August using the Interior Ministry’s July notice. Cultivation 1→2 corrects existing subcriminal cultivation treatment (already present in the 2009 contravention code); its existing 2009 score event supplies the earlier boundary. Sharing 1→0 follows the new prison-based supply tiers, with before recorded on the August event.

Limits: Legis blocked full retrieval; e-Lex September pages omit the enacted July amendment although its future consolidation includes it. Used the original amending law reproduced by Bizlex, with Gazette publication corroboration. Numerical drug/plant thresholds withheld pending the replacement schedules; old 2 g is no longer presented as verified. 1940s–1960s/1980s/2010s gaps, first-ban territory/date and two older articles remain. Medical access retained at zero; no operating programme verified.

Moldova validation: profile audit zero errors/warnings; article citation and history tests pass except the global citation test, blocked by another contributor's `countries/sb.yaml` `[@@st]` citation. A missing visitor status was corrected after schema validation; the next build reached prerendering but collided with a concurrent shared-dist build. Final batch build will recheck the page.

### Belarus

Four penalty tables distinguish imprisonment, short custody, criminal fine alternatives and public-use repeat liability. Recreational/hemp sections added, products folded; medical/visitor text now cites the Health Ministry’s 2025 INCB traveller declaration explicitly prohibiting cannabis medicines. 2026 fine-base entry added (BYN45), with 2026 money values verified against the tax ministry and current Article 50/19.3 reproductions. Core texts converted to inline citations; existing scores retained. No new article: current 2025 reform already has one, while the two older Soviet key entries need stronger original sources. Remaining 1940s/1950s/1980s history gaps and driving/arrest research are documented gaps.

Moldova and Belarus pages verified in the successful 4,916-page build, including four tables each and updated context. Both profile audits report zero errors/warnings.

### Lithuania

Four penalty tables, recreational and culture sections; products folded; hemp smoking-product zero-THC rule distinguished from crop/finished-goods limits. Replaced generic legal claims with current statutory text (Temidy reproductions, official primary sources where reachable), including administrative growing under ANK340 and the large-quantity crime under BK265. Cultivation corrected 1→2; 2017 and 2019 before-vectors rebased to 2 so the correction attaches to the 2003 code’s verified large-quantity-only cultivation offence, rather than suggesting a new growing reform in 2019 or 2026. Earlier cultivation boundaries remain a research target. Existing medical event sharpened to 1 May with contemporary LRT evidence; 2019 medical article added. Three new entries: October 2018 medical vote, April 2023 zero-THC smoking rule, April 2025 committee debate. Culture links both existing atlas entries (Kanapinis and cannabis) using the Folk Culture Centre and Klaipėda accounts.

Remaining: 1950s/1960s, 1974 article, cultivation plant-count case law, current drug-driving primary evidence and medical cost/coverage. No safe plant count inferred. The 2018 official analysis verifies 5 g plant material; other product thresholds are not inferred from it. Production/licensing and garden-hemp improvements already committed by another contributor were preserved.

### Europe batch validation and commits

| Country | Commit | Added tables | Added history | Added articles |
|---|---|---:|---:|---:|
| Russia | be8b67c | 4 | 1 (included earlier by concurrent shared-history commit) | 0 |
| Ukraine | bc48fb1 | 4 | 1 | 1 |
| Moldova | c487fda | 4 | 3 | 1 |
| Belarus | fc42142 | 4 | 1 | 0 |
| Lithuania | This country commit | 4 | 3 | 1 |

Final checks: `npm run build` passed (4,921 pages); `npm run seo:audit` passed (4,923 HTML files and 216,929 links); all five targeted profile audits have zero errors and warnings; history tests 47/47 and answer/profile tests 93/93. Built HTML checked for all twenty penalty tables, hemp sections and rendered citations; all three new articles render on their history pages. Both changed score chains report zero flagged steps. All five country-gap reports show no missing standard sections, no missing penalty tables and no Wikipedia-only texts. The final Lithuania commit also records the unscored reason for Ukraine’s July digital-preparation notice. `source-archive.json` and other contributors’ country changes were left out of these commits.

## Europe batch 2: Northern Cyprus, Spain, Bosnia and Herzegovina, Portugal, North Macedonia

Chosen from the next five available profiles in `country-gaps.cjs --rank 25 --region Europe` after the first European batch. Other contributors' Egypt/profile and archive changes remain out of scope.

### Northern Cyprus

Added four penalty tables, recreational/hemp sections, replaced Wikipedia-only medical/industry/consequences, folded products, and linked the treatment route. Recovered the 1972 consolidated law through a transcription linked to the official September 2026 file; official download returned 502. Its body Part I (cannabis) must not be confused with Part I of the annex (higher 18/20-year maxima). The 2015 appellate text supplies the redenominated general fine ceiling of TRY50 alongside the ordinary fifteen-year maximum; 2013 proposed replacement fines are not enacted law. Added 1972 framework, April 2013 proposal, October 2015 sentencing appeal, January 2019 three-plant/import sentence. Scores retained. Earlier colonial statute and precise 1972 commencement remain unverified; new entry is enactment-year, not a first prohibition. 1961/1977/1982/1989/1991/2004 amendments are leads, with no guessed details. The June 2026 Gazette lists another bill but its text/enactment could not be retrieved. No operating medical supply verified; no inference that controlled-drug licence powers establish patient access.

## Japan

Added four penalty tables for possession, cultivation, transfer and use, with the December 2024 statutory maxima and fines; recreational, hemp, medical, industry, research, arrests, culture and driving sections; products folded into medical; linked the 1950 hemp-farms article and the Shinto, shichimi, ma and global march atlas entries; explained the death penalty as not applicable. Medical stays limited: cannabis-derived medicines are lawful but none is approved; Jazz's CBD candidate won orphan designation in June 2024, missed its Phase 3 primary endpoint in August 2024, and Jazz and Nippon Zoki agreed in April 2026 on a future introduction. Scores retained. Added seven history entries: December 2023 HHCH ban, June 2024 CBD orphan designation, August 2024 trial miss, March 2025 licence categories and 0.3% seed limit, August 2025 1.046-tonne Vietnam seizure, April 2026 record investigations, June 2026 CBN ban. Added the 1950 hemp-farms article from the top backlog candidate.

Remaining: spotlights and genetics (no non-duplicative material); no approved cannabis medicine, so no patient-access claim; the precise commencement of the 1948 Act and pre-1948 local enforcement remain research targets. Build passed (4,933 pages); `profile-audit jp --warnings` reported no errors or warnings; `country-gaps jp` shows no missing standard sections, penalty tables, statuses or citations.

Northern Cyprus validation: four tables and the new 1972 framework article render in the successful 4,934-page build; no raw citations remain in either page. Targeted profile audit: zero errors/warnings. General fine provenance remains explicit (2015 judgment, old currency in the consolidation), and the unverified June 2026 proposal remains a follow-up. This country is committed separately before Spain.

### Spain

Four tables distinguish private personal acts, public administrative offences (€601–30,000) and ordinary supply (one–three years plus one–twice drug value). Removed the unsupported 100 g allowance and blanket claim that club use/supply is legal. Added hemp (certified eligible varieties, ≤0.3%, fibre/grain/seed; flowers outside exception), production and research details from AEMPS’s July 2026 list, and culture links. Folded products; inline citations throughout. Medical monograph now allows its special-access route for other indications; October hospital supply remains an announced rollout, with no access-score increase. Two original Gazette entries fill the 1930s/1940s: 1933 procurement invitation (not proven delivery) and 1940 fibre-hemp intervention/support scheme. New 2001 club article distinguishes operating rules from law and the later Ebers procedural appeal. Scores retained. Earlier 1870s–1910s history, Joep Oomen-specific Spanish research and actual October dispensing remain follow-ups.

Spain validation: targeted audit zero errors/warnings. Build blocked at schema sync by another contributor’s unfinished `countries/et.yaml` planting enum values; those files are untouched. Spain’s new HTML will be checked in the next successful batch build. Northern Cyprus commits: 698b08e (profile/article) and cf466f8 (history, staged separately to exclude concurrent Japanese entries).

### Bosnia and Herzegovina

Four tables name jurisdictions: Federation possession (up to one year), state-law possession fine (BAM1,000–3,000), production/supply, enabling another’s use, and Republika Srpska public use (BAM700–1,700). Replaced Wikipedia-only use text; no implication that absence of an RS/Brčko possession crime makes possession lawful. Read current RS consolidation through 78/2026 and Brčko’s current 232–233, which lack the Federation’s standalone possession paragraph. Added hemp and corrected production medical→hemp: the existing production text described industrial hemp, not a medical cultivation route. Added four entries (2006 commencement, 2015 RS public-use law, 2022 agency warning, February 2026 marijuana ticket), and a 2005 law article distinguishing adoption from February 2006 publication/commencement. Medical implementation still pending; access remains zero. Scores retained. Remaining: 1940s/1960s–1980s, stronger original texts for 1930/1950 articles, current driving law and national cannabis arrest statistics. Some reporting cites a different RS possession fine under older legislation; its current statutory interaction was not resolved, so it is not asserted as a universal tariff.

Bosnia validation: targeted audit zero errors/warnings; successful build 4,943 pages. Spain and Bosnia profiles and their new articles render with resolved citations. The earlier Spain build blocker cleared through the other contributor’s own changes; no unrelated country files were edited here.

### Portugal

Four tables now cover personal possession/use (conditional suspension and non-dependent-user fine, €24.94–149.64 converted from the statute’s PTE5,000–30,000 at the fixed EU rate), personal growing (current Article 40: three months or thirty-day fine, possible waiver), and separate supply tariffs. Replaced generic exporter/low-uptake statements with INFARMED’s first-half 2026 report: sixteen marketing authorisations, 5,413 prescribed packages, 66,305 kg exports; packages are not patients, licences are not pharmacy stock. Hemp statutory ceiling ≤0.3% verified in Portaria 64/2023, effective 4 March (DGAV procedure still writes “below”); propagation now distinguishes DGAV certified-seed operators from INFARMED medical clone channels. Added culture link and February 2026 Goulão commendation, 2023 hemp entry and 2026 activity entry. Medical history date corrected July→1 August 2018 from the original commencement clause; new article. Scores retained. 1930s/1940s/1960s remain thin; a 1956 Gazette company report referring to domestic hemp is a research lead, not yet read sufficiently to add. Club reports remain explicitly conflicting; no lawful club supply inferred.

Portugal validation: profile audit zero errors/warnings; successful retry built 4,948 pages and the profile/2018 article render with resolved citations, current fine values and package counts. The first attempt collided with another build writing Astro’s shared data store; no shared cache or other contributor’s files were altered. Answer/profile tests pass 93/93; the history test result is recorded in the final batch checks.

### North Macedonia

Four tables: personal possession’s express exclusion from criminal punishment, production/supply (ordinary three–ten years; smaller-quantity six months–three years), giving/enabling use (one–five years) and Article 20 drug-use fine (€100–250 in denar equivalent). Found original Gazette 36/2023, Article 25, adding 215(6), effective 25 February; December 2025 Constitutional Court U.243/2024 confirms it. Possession corrected 1→3 and recreational illegal→decriminalised, with the full prior vector on the new 2023 entry; enforcement remains 2 because post-amendment police violations are documented. Personal possession is explained in prose; its table covers holding for sale, because the available categories cannot accurately label an unpunished but unauthorised act as either lawful or an administrative offence. No personal-possession fine or gram allowance is invented. Media/advocacy accounts describe a 2025 possession-fine proposal as adopted, but the only enacted 2025 amendment in the Justice Ministry chain (72/2025) changes other provisions; no current possession fine is asserted from those reports.

Added hemp from statutory definitions (seed-oil 10 mg/kg is not a crop threshold); medical/industry detail, arrests context, inline citations and links; products folded. Removed unsupported claim that dried-flower exports had opened. Four new entries: 2007 public-order framework, 2008 drug-control replacement (fills 2000s), 2023 explicit possession protection and 2025 constitutional decision. Existing 2016 event dated 5 March from publication plus commencement, sourced to MALMED/Justice database; 2026 regional seizure entry now distinguishes marijuana, biomass and semi-finished oil from the primary police account. Two articles (2016 and 2023). Remaining: 1940s/1960s–1980s, 1930/1950 articles, current medical costs/product availability, exact later road-law amendments. 2026 driving questions already documented in the profile are not resolved by the new possession sources. No crop THC exemption or recreational supply right inferred.

### Europe batch 2 totals

| Country | Tables now | New history | New articles | Commits |
|---|---:|---:|---:|---|
| Northern Cyprus | 4 | 4 | 1 | 698b08e, cf466f8 |
| Spain | 4 | 2 | 1 | 48926a8 |
| Bosnia and Herzegovina | 4 | 4 | 1 | 086e51c; wording check d5712fe |
| Portugal | 4 | 3 | 1 | 2cd5394 |
| North Macedonia | 4 | 4 | 2 | This country commit |

Twenty tables now present (nineteen additional tables, replacing Portugal’s existing possession table), seventeen new history records and six new articles. All five final profile audits have zero errors/warnings, history tests pass 47/47 and answer/profile tests pass 93/93. The earlier history-test failure was an exact lowercase `article 239(3)` wording check; the compatible wording was restored in the Bosnia follow-up commit. North Macedonia’s score chain is 11→12 for the 2016 medical framework and 12→17 for the 2023 personal-possession exemption, with no open directional entries. The 4,957-page build and SEO audit of 4,959 HTML files/218,091 internal links passed; all twenty tables and six article pages rendered without raw citation marks. A final rerun follows the removal of an inaccurate administrative label from the unpunished personal-possession case; its possession table now only contains supply-related offences. Another contributor’s temporary Liberia source-type error blocked one retry and was fixed by that contributor. Other country, archive, frontend and Africa-log changes are excluded from this batch’s commits.

Final verification completed: `npm run build` passed again with 4,957 pages, including the corrected possession table; `npm run seo:audit` passed on 4,959 HTML files and 218,094 internal links. Both new Macedonian articles render with resolved citations. No build blocker remains for the reviewed snapshot.

## Iran

Four penalty tables now state the Anti-Narcotics Law's tiers: possession by weight under Article 5, cultivation by conviction under Article 2, supply under Article 4, and use under Article 19. The text adds the 2017 Article 45 amendment, which requires an aggravating factor (including more than 50 kg of cannabis) before a death sentence, and the 2025 execution figures: 795 drug-related executions, 48.5% of the total and up from 503 in 2024. Enforcement and arrests use the all-drug figures (570,232 arrests and 372 tonnes seized in 1403), with the absence of a cannabis breakdown stated. Hemp now records the October 2026 permit directive (certified seed below 0.3% THC, provincial licence); medical remains none, with the 2021 review's finding of no licit production and the 2024 legalisation proposal distinguished from law. Driving cites Article 10(b) of the 2011 traffic law, which requires proof of intoxication or incapacity. Culture links gol, hashish, charas and bhang.

Four history entries added: signature of the Single Convention (30 March 1961), ratification (30 August 1972), the October 2025 proposal to remove death from eight drug offences (no published text), and the October 2026 hemp directive. The existing 1988 entry was rewritten: it had called the law the Islamic Republic's first, although the 1980 bill had already introduced capital drug offences, and it now records the five-kilogram hashish threshold, repeat-offence totals, armed smuggling and Article 9 public execution, with the Library of Congress 1995 survey and ECPM report added as sources. Wrote `iran-death-penalty-1989`, covering the 1988 schedule, the earlier 1980 capital law and the 1989 enforcement figures.

Iran validation: `profile-audit ir --warnings` reported no errors or warnings; `country-gaps ir` leaves only the 1930s empty (no cannabis-specific event found) and the optional research, spotlights and genetics sections. History tests pass 47/47. A successful build of 4,976 pages renders the profile with six possession rows, four supply rows and no raw citation marks; the article page and the four new history pages resolve. The 1988 entry's meta description still names the score move from 8 to 6 that the entry carries.

## Azerbaijan

Four penalty tables now set out the administrative and criminal tiers: possession by dried weight under Article 206 and Criminal Code Article 234 (5 g substantial, 500 g large, 50 kg especially large), cultivation by plants under Article 208 and Article 237 (3–15 substantial, 16–800 large, 801+ especially large), four labelled supply tiers from Article 234.2 to 234.4-1, and use under Article 206. The text corrects the old “three to ten years” cultivation range: Article 237.2 is three to eight years and 237.3 is six to ten. Added recreational, medical, hemp, production, consequences, planting, clubs, visitors, driving and arrests sections; folded products. Hemp and production are none: the drug law has no hemp exception and reserves production to experimental medicine samples. Driving is impairment under Article 333-1.1 (600 AZN or a six- to twelve-month licence restriction, no THC limit). Arrests and black-market figures use the 2024, January–November 2025 and January–June 2026 state reports, with the lack of a cannabis breakdown stated.

History now runs from 1934 to 2026. Added the 1961 Azerbaijan SSR criminal code, which named Indian hemp in Article 227 and punished supply in Article 226; the 1975 implementation of the 1974 USSR decree, which added Article 226-1 and made possession without intent to sell a crime; the 1987 USSR edict that made first-time small possession and use administrative; the 2016 administrative code; and the 2024, 2025 and 2026 drug-crime statistics. The 1974 entry was rewritten from the republican code rather than Wikipedia, and its score chain now runs 100→18 (1934), →16 (1961), →6 (1974), →9 (1987), →14 (2001), with the current profile at 14.

Wrote `azerbaijan-soviet-possession-crime-1974` from the top backlog, plus `azerbaijan-ssr-criminal-code-1961` and `azerbaijan-soviet-possession-relaxed-1987` so every scored entry except 1934 has an article. The 1934 entry still rests on Wikipedia and needs archival verification before an article is written.

Azerbaijan validation: `profile-audit az --warnings` reported no errors or warnings; `country-gaps az` leaves the 1940s and 1950s empty (no dated event found), the optional culture/research/spotlights/genetics sections, and the 1934 article gap. History tests pass 47/47. A successful build of 4,986 pages renders the profile with four possession, four cultivation and four supply rows and no raw citation marks; the three article pages and the new history pages resolve.

## Kazakhstan

The existing profile already had a full history and current-law text, so this pass concentrated on the gaps: four penalty tables, a recreational section, citations in every text, and a culture section linking the anasha atlas entry. The tables follow the code's amount bands rather than gram lines because the government table that fixes small, large and especially large quantities was not reproduced in the sources read; the text says so. Possession has three rows under Article 296(2)–(4), cultivation three under Article 300(1)–(3), supply four under Article 297(1)–(4), and public use one under Article 296(1). Driving remains impairment under Article 608, with 15 days' arrest and a seven-year licence loss and no measured THC level. Medical stays none: no approved cannabis medicine or patient programme was found, and the licensed routes are scientific study and industrial hemp. Production was corrected from medical to hemp, because the commercial licences cover low-THC fibre and seed, not medicine. The culture section connects the Chu valley wild cannabis and the `language/anasha` entry.

No new history entries were needed: the existing 17 already run from 1926 to the April 2026 hemp rules and cover the 2024–2026 enforcement reports. Two scored entries lacked articles, so wrote `kazakhstan-repeat-drug-use-crime-1987` and `kazakhstan-repeat-public-use-detention-2011`. The profile's penalty text now cites Articles 296, 297 and 300 directly, and the previously unsupported medical and products sections are replaced.

Kazakhstan validation: `profile-audit kz --warnings` reported no errors or warnings; `country-gaps kz` leaves the 1940s, 1950s and 1970s empty, the optional research/spotlights/genetics sections, and no scored entry without an article. History tests pass 47/47. A successful build of 4,990 pages renders the four tables, the anasha link and both article pages with no raw citation marks.
