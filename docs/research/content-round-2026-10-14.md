# Content round, 14 October 2026 (evening)

New facts for countries, history entries, two articles and two atlas entries. No scores changed;
every new history entry is an unscored context entry. Score-chain check: 0 flagged steps for lb,
us, it, gh, au, sl and cg.

## History entries (10, all checked against a read source)

- `australia-victoria-plebiscite-bill-2026` — Victorian Hansard, Legislative Council, 29 July 2026.
- `cayman-decriminalisation-referendum-2025` — Wikipedia, 2025 Caymanian referendum (no country,
  like the existing Cayman entry).
- `sierra-leone-cannabis-long-in-use-1851`, `congo-cannabis-cultivation-noted-1959` — Wikipedia
  country pages (dates and events only).
- `italy-resentencing-ruling-2014` — Grazia Zuffa, TNI/UNGASS on Drugs, 5 June 2014 ("end of May";
  no exact day given).
- `lebanon-green-plan-1990` (CSM, 7 March 1990), `lebanon-off-majors-list-1997` (TIME 2007, CSM
  2012), `lebanon-eradication-abandoned-2007` (TIME, 16 October 2007),
  `lebanon-clans-resist-eradication-2012` (CSM, 7 August 2012).
- `us-norml-founded-1970` — Wikipedia, NORML and Keith Stroup.

Entries were inserted by hand into `changes.yaml` next to entries of the same date:
`history-batch.cjs` re-sorts the whole file (about 41,000 changed lines), so its output was
discarded and the original text kept (see the note in DATA-MAINTENANCE.md).

## Articles

- `italy-constitutional-court-2014` — from the judgment itself, Sentenza 32/2014, read through an
  Internet Archive copy (the court's site sits behind a bot check). Penalties in the table are the
  ones the referring court quoted. The 10,000-prisoner figure is Zuffa's estimate.
- `ghana-narcotics-commission-act-2020` — IDPC (2020, 2022, 2026) and ISS (2017). The old penalty
  was disputed between sources: ISS says a five-year minimum for all drug offences and ten for
  possession; IDPC says "up to 10 years". The entry's "minimum of ten years" follows ISS. The
  2022 Nsawam figure (over 4% of inmates sentenced for drug use alone) is from the prisons
  director-general as reported by IDPC.

## Atlas

- `traditions/hashish-in-the-bekaa` — CSM 1990 and 2012, TIME 2007, Wikipedia. No source read
  describes sieving or grading in detail (L'Orient-Le Jour's account returned 403), so the entry
  says only what the reports state: green crop reduced to resin, harvested at the end of October.
  Picture: Voice of America video still, June 2021, public domain.
- `people/keith-stroup` — Wikipedia (Stroup, NORML). No birth year in a read source, so no `life`.
  The Peter Bourne episode is as Stroup's Wikipedia page tells it; Bourne's own page was not found.
  Picture: Carolmooredc, 1998, CC BY-SA 3.0.

## Not done, and why

- Kiribati: High Court sentences of 2016 and 2025 on marijuana found by search, but PacLII and its
  Wayback copies return block pages; not added from summaries.
- `language/weed`: no read source dates the cannabis sense (Etymonline behind a bot check,
  Wiktionary undated). Left for a pass with the OED or Green's Dictionary of Slang.
- Burma 1939 licensing: too little in the sources for an article.

## Second pass (same evening)

**Profiles: GOV.UK travel advice replaced in six countries** (41 → 35 files). Each passage was
rewritten from a national or local source, not dropped:

- Armenia (products, medical): Government Decision 1129-N of 2003, consolidated English text of
  2019 — every hemp species, THC preparations "regardless of the name", extracts, tinctures and all
  THC isomers are on List No. 1 (circulation prohibited). The 2019 text predates the 2021 hemp law;
  whether List No. 1 was amended for low-THC hemp was not checked.
- Iceland (visitors): the drug act's bans (act65) and the fines for small amounts (nsfk). Althingi
  serves a bot check; the act was not re-read, the profile's existing citation was used. The
  airport-scanner remark had no other source and was dropped.
- Estonia (visitors): penalties already sourced to narko.ee in the profile.
- Malta (visitors): €235 public-use fine from Cap. 628. The FCDO's "7 g for residents only" and
  Schengen entry-ban statements could not be sourced locally and were removed.
- Cyprus (visitors): Class B, up to eight years, prison sentences in practice (existing sources).
  The laughing-gas remark was dropped as off-topic.
- Thailand (visitors): export without permission illegal (health minister, Euronews/AP, 21 May
  2025); deportation without conviction (Newland Chase on the regulation in force 28 August 2026).
  The FCDO's "30,000 baht a kilogram" fine and "immigration watchlist" were not found in any Thai
  source and were removed.

No scores changed.

**History:** `thailand-smuggling-warning-2025`, `thailand-deportation-regulation-2026` (context).

**Article:** `malta-first-associations-2024` — MaltaToday (30 January 2024), MaltaToday via IDPC
(November 2023), Marijuana Moment (25 October 2023), ARUC's permit register (24 associations,
read 14 October 2026; the page is undated).

**Atlas:** `traditions/hemp-seed-in-shichimi` — Japanese and English Wikipedia, and the act itself
from e-Gov (Article 2(2) excludes seeds and mature stalks; Articles 18–20 on non-germinating seed;
Article 24 penalties). When the seed-treatment articles were first enacted was not established.
Picture: タバコはマーダー, 2017, CC BY-SA 4.0.

**Facts:** Japan (shichimi), Malta (first association).

## Third pass

**Profiles: GOV.UK replaced in six more countries** (35 → 29): Andorra, Belize, Barbados, the
Bahamas, Seychelles, Mauritius.

- **Andorra corrected from the Criminal Code itself.** Articles 499–500 (Book III, minor offences)
  punish using, growing, bringing in or possessing cannabis for one's own use with "arrest" and
  €500–1,200, and public or group use with €600–1,500. Article 37 limits arrest for minor offences
  to eight weekends, a month of house arrest or two months of partial daily arrest. The profile had
  "up to 12 months in prison" (The Cannigma) and "cultivation is treated as trafficking"; both
  replaced. The consumption segment had rested only on the FCDO. The new Criminal Code (Law
  18/2026, in force four months after publication) keeps the rule as articles 545 and 547. Scores
  unchanged (possession 1, "a crime, usually ends in a fine", still fits).
- **Mauritius:** possession penalty now cited to section 34 of the Dangerous Drugs Act (fine up to
  Rs 50,000 and up to two years; treatment instead of prison under s. 34(2)), not only Leafwell.
- Belize, Barbados, the Bahamas, Seychelles: visitors rewritten from statutes and local sources
  already in each profile. FCDO-only details (luggage advice, bail practice, scanners) dropped.

**History:** `andorra-criminal-code-2005` (in force 23 September 2005, from the 2026 code's
preamble), `andorra-new-criminal-code-2026`. `botswana-cannabis-act-2025` dated to assent,
17 October 2025.

**Article:** `botswana-cannabis-act-2025`, from the Gazette text of Act 20 of 2025 (a scanned PDF;
pages rendered and read: long title, ss. 1–6, 46–48, 54–55, 64). Commencement is by ministerial
notice; whether it has commenced was not established.

**Atlas:** `people/hamilton-wright` — Wikipedia and the TNI chapter. Who led the US delegation at
The Hague was not established, so the text says only that he was a delegate. Picture: Bain News
Service, 1909, public domain.

**Facts:** Andorra (arrest of up to eight weekends), Botswana (wild plants), Hamilton Wright.

## Fourth pass: landrace and recent terms

**`language/landrace`** — Wikipedia (Landrace: Landrasse, Vienna 1890, von Rümker 1908, Mansholt
1909, Danish Landrace pig), Landrace.wiki ("Landrace Cannabis": mass selection, threats; main page:
727 mapped accessions, 15 growing regions, 26% critical or high priority, CC BY-SA 4.0), Wikipedia
(Cannabis indica, charas), the existing Kush entry, Atalayar and Hespress on beldiya. The khardala
replacement and the "three- to fivefold" resin gain are Chouvy and Afsahi (2014) as reported by
Landrace.wiki; the paper itself was not read. Yield comparisons (17 vs 28 q/ha) appeared only in
search summaries and were not used. Picture: GuHKS, Ketama 2017, CC BY-SA 4.0; the caption does not
claim the plants are landrace. New history: `morocco-beldiya-authorised-2024`.

**`language/cbd`**, **`language/delta-8`**, **`language/dispensary`** — recent terms with legal
histories. Sources: Wikipedia (Cannabidiol; Δ8-Tetrahydrocannabinol; Cannabis retail outlet),
Wiktionary (dispensary), and existing checked history and atlas entries (Farm Bill 2018, hemp
redefinition 2025, CBD rulings in Bulgaria, Taiwan, Slovakia, France, China and Andorra; Proposition
215, Oakland 2001, Colorado 2014, Thailand 2022, Barbados 2025; Dennis Peron). New history:
`us-delta-8-appeals-ruling-2022` (date only to the year). The dispensary word history is thin: no
dated first use of "dispensary" for a cannabis outlet was found.

**Facts:** landrace (beldiya), delta-8.

**Pending:** GOV.UK replacement for Antigua, Saint Kitts, Saint Lucia, Guyana, Montenegro,
Liechtenstein, San Marino and Fiji. Their passages were listed; most can be rebuilt from the
statutes already cited in each profile.

## Fifth pass: people from outside the United States

Five People entries, each tied to the history of one country's law:

- `people/anutin-charnvirakul` (Thailand) — Wikipedia; existing Thailand entries 2019–2026. The
  4,200 released prisoners and the million-plant announcement (8 May 2022) are from Wikipedia.
  Picture: NBT, 2019, CC BY-SA 4.0.
- `people/joao-goulao` (Portugal) — Wikipedia (Goulão; Drug policy of Portugal); existing 1999 and
  2001 entries. Picture: Drugreporter, 2013, CC BY 3.0 (caption from the file description; place
  not stated).
- `people/karl-lauterbach` (Germany) — Wikipedia; DW via TNI/UNGASS (13 October 2021, quote on his
  change of mind); existing 2023–2024 entries. A Deutschlandfunk interview a year after legalisation
  appeared only in search summaries and was not used. Picture: Martin Kraft, 2020, CC BY-SA 4.0.
- `people/joep-oomen` (Belgium) — VOC Nederland memorial (March 2016) and Leafly (Bergman, 2020);
  existing Belgium entries. Leafly dates the one-plant directive to 2006; the site's entry has
  25 January 2005, which was kept. Birth year not established (died aged 54), so `life: died 2016`.
  No portrait found on Commons.
- `people/peter-tosh` (Jamaica) — Wikipedia. New history: `jamaica-legalize-it-1976`,
  `jamaica-tosh-peace-concert-1978`. Picture: TimDuncan, Cardiff 1978, CC BY 3.0.

Abd el-Krim (Rif Republic kif ban, 1923) was considered and dropped: his biography read for this
pass does not mention kif.

**Facts:** Joep Oomen's one plant, Anutin's million plants.

## Sixth pass: four articles

- `un-cannabis-rescheduled-2020` — UN News (2 December 2020: 27–25–1, country explanations for the
  US, Ecuador, Chile and Japan, the rejected CBD recommendation), Wikipedia (Decision 63/17, in force
  April 2021), existing WHO 1954/1955 and Nepal/Philippines entries. UN News details only one of the
  six WHO recommendations; the article does not characterise the other five.
- `new-zealand-referendum-2020` — Wikipedia (2020 New Zealand cannabis referendum). Turnout and
  per-electorate results were not used.
- `saint-kitts-decriminalisation-2019` — SKNIS (31 July 2019) and Wikipedia; the High Court judgment
  itself (Ventose J., 3 May 2019) was not read. Fine amounts ($50, $1,000) are from Wikipedia;
  currency not stated in the source.
- `ukraine-medical-2024` — Law 3528-IX, Wikipedia, Prohibition Partners (October 2025). The health
  ministry page and Censor.NET returned 403. New history: `ukraine-first-products-registered-2025`,
  `ukraine-first-import-permit-2025`. Whether any patient has been treated since early 2025 was not
  established.
