# Maintaining the data: country profiles, history and prices

How to check, correct and extend the data sets behind the site. Written as a handover: it
records how the work has been done so far, what was learned, and what is still open.

## The task in one paragraph

The legal index holds three connected things per country:

1. **What the law is now** — the profile in `countries/*.yaml`, with six segment scores that add
   up to the country's index.
2. **What happened** — the history in `changes.yaml`: every law, ruling and treaty that shaped
   cannabis freedom there, from the first restriction to today.
3. **How the score moved** — each event that changed the law also records the scores *before*
   it. Strung together, these form one continuous score timeline per country, from the
   unregulated state (100) down through the bans and back up through the reforms, ending exactly
   at today's score. The country chart, the "29 → 44" on every event and the world-average chart
   since 1900 are all drawn from it.

The job is to make all three **complete, trustworthy and consistent with each other**. Every
event needs a source that was actually read. Every score step needs to be explained by an event.
And when research turns up something that changes a country's current situation, the profile,
its scores and the timeline are updated together, never just one of them.

Flower prices are a fourth, independent data set. They provide market context but do not affect
the freedom score.

Seed and clone law is an optional, unscored section of the profile (see "Seeds and clones"),
as are cannabis clubs and the black market (see "Cannabis clubs and the black market") and
driving rules, access for visitors and arrest figures (see "Driving, visitors and arrests").

## Where things are

| Path | What |
|---|---|
| `countries/<id>.yaml`, `countries/{us,ca,au}/index.yaml` | One profile per country: status, six scores, a text and sources per segment, context, sources |
| `changes.yaml` | The history, newest first. The header comment documents every field |
| `prices.yaml` | Flower-price observations, kept separately for street and medical markets |
| `segments.yaml` | The six segments, their weights and what each score level means |
| `src/content.config.ts` | The schema. The build fails with a clear message when data breaks it |
| `scripts/history-batch.cjs` | Applies a batch of history edits from a JSON file (see below) |
| `scripts/data-status.cjs` | Counts; lists of what is unchecked, estimated, thin or weakly sourced; which profiles have a seeds-and-clones section; and a check of every country's score timeline |
| `scripts/score-triage.cjs` | Context entries whose category says the law changed (ban, tightening, easing, …): each still to be scored or marked `unscored` (see "The score timeline must make sense") |

Run everything from the project root. `npm run build` validates all data; run it after every
batch. The dev server (`npm run dev`) does **not** pick up edits to `changes.yaml` or the schema
until it is restarted.

## Adding prices

Prices are deliberately simple: **street flower** and **medical flower**, always per gram. Do not
add resin, hash, rosin, oil, edibles or a separate recreational category.

- `street` means illicit or otherwise non-prescribed flower.
- `medical` means prescribed flower supplied through the medical system.

Append a new observation to `prices.yaml`; do not replace an older valid value. The newest date
for each country and market is shown on the map, rankings and country page. Older observations
remain available as price history.

### Required fields

```yaml
- id: cz-street-2023
  country: cz           # lowercase ISO 3166-1 alpha-2 code
  date: "2023"          # YYYY, YYYY-MM or YYYY-MM-DD
  market: street        # street or medical
  currency: CZK
  price: 200            # per gram in the original currency
  usd: 9.17             # normalized USD per gram
  note: Most commonly reported national price; based on 266 police records.
  source:
    title: Report title
    url: https://example.com/report
```

Use a unique id in the form `<country>-<market>-<date>`, adding a short suffix only when needed.
Keep the source's own statistical description in the note: mean, median, mode, listed pharmacy
price or derived price. If a package or ounce price is converted to one gram, say so in the note.

### Choosing a price

Prefer, in order:

1. National statistics, drug observatories, health ministries or official pharmacy lists.
2. EUDA, UN or a national survey with a stated method.
3. A peer-reviewed study or a transparent national market dataset.

Use a national figure where possible. Do not use one city, one shop, one police seizure, a bulk
trafficking valuation or an anonymous anecdote as the country's price. Do not turn a range into a
midpoint unless the source itself reports that midpoint as its estimate. If only a range or weak
source exists, leave the country as **No data**.

For medical flower, say whether the figure includes tax, pharmacy preparation, consultation,
prescription or delivery fees. When several current flower products are listed, a simple average
is acceptable if the note explains exactly which products and package prices were included.

### Known bulk sources

- **EUDA Statistical Bulletin** (price, purity and potency, retail herbal cannabis, mean) covers most
  European countries. The site blocks scripted downloads; open it in a normal browser and use the
  table's "Download as Excel" option or read the table view.
- **UNODC World Drug Report annex 8.1** (`WDR_2026/Annex/8.1_Prices_and_purities_of_drugs.xlsx`,
  government submissions for 2020–2024; the 2024 edition covers 2018–2022) covers many non-European countries. Use rows with
  `Cannabis herb`, `Retail`, unit `Grams` and a `Typical` value; skip rows with only a min/max
  range. Prices are already in USD at the time's exchange rate, so record `currency: USD` and say so
  in the note. Treat outliers against the country's earlier submissions with suspicion (several
  countries report a figure that jumps tenfold between years).

- **Older UNODC annexes.** The World Drug Report 2020 annex PDF
  (`wdr.unodc.org/wdr2020/field/Annex/8.1._Prices_and_Purities_of_drugs.pdf`, 2014–2018, in local
  currency) and the 2017 cannabis sheet (`unodc.org/wdr2017/field/8.2_Price_Purity_Cannabis.xlsx`,
  the latest figure per country back to 2004) fill countries the newer editions miss. All editions
  from 2017 to 2026 have been mined for countries without a price.
- **Blocked:** EUDA pages and PDFs, the CICAD supply report and tandfonline sit behind a bot check
  or return 403 to both `curl` and the in-app browser. Save the file into the project to read it.

### Normalizing to US dollars

`price` always preserves the source currency. `usd` is the comparison value used by the map and
rankings. Use the common exchange-rate date documented at the top of `prices.yaml`, not the
historical exchange rate from the observation's year. Round `usd` to two decimal places.

ECB rates are quoted as currency units per euro. Convert with:

```text
usd = price / local_currency_per_eur * usd_per_eur
```

For euro prices, multiply directly by the documented EUR/USD rate. If the currency is not covered
by the ECB, cite the alternative exchange-rate source in the observation note.

### Updating and checking

- A newly published price is a new observation; keep the old one for history.
- A factual correction to an existing observation should edit that observation rather than add a
  duplicate.
- Never mix street and medical observations when deciding which value is newest.
- Run `npm run build` after editing. The schema rejects invalid markets, dates and values.
- Spot-check `/data/prices.json`, `/api/<country>.json`, the country page, rankings and both price
  map modes.

## Cannabis clubs and the black market

Two more optional, unscored sections under `context`. Each is a plain cited text, like
`production` or `medical`; leave a section out until something reliable is found.

```yaml
context:
  clubs:
    status: tolerated       # regulated | tolerated | underground | none
    text: >-
      Around 1,000 to 1,500 private associations grow for their members in a legal grey area …
    sources:
      - key
  black_market:
    text: >-
      Most cannabis is still bought illegally; a gram costs about …
    sources:
      - key
```

- **`clubs`**: do cannabis clubs (social clubs, associations, members-only lounges) exist, and on
  what footing? The interest is in unregulated or lightly regulated ones: how they work around the
  law, how many there are, how membership works, how often they are raided. Licensed shops and
  pharmacies belong in the access segment, not here. Where none are known, say so only if a source
  says so.
- **`clubs.status`** is required with the section and colours the "Cannabis clubs" map option:
  `regulated` (a law provides for clubs: licensed or registered, within set limits), `tolerated`
  (no law, but they operate fairly openly and are mostly left alone), `underground` (they exist
  but are treated as illegal: raided, organisers prosecuted), `none` (none known, or the law
  leaves no room; use only when a source supports it). Judge the country as a whole, not one city.
- **`black_market`**: the state of the illegal market: how large it is next to any legal supply,
  where the cannabis comes from, typical prices if sourced, how openly it is sold, and how
  violent or organised it is. Prefer surveys, police and UN figures over anecdotes.
- Neither section moves a score. If research for them shows the law or practice differs from a
  scored segment, fix the segment and add a history entry as usual.
- `node scripts/data-status.cjs clubs` and `… black_market` list what is done and what is left.
- **Seizure figures in bulk (13 October 2026).** Two official tables gave about a hundred
  profiles a first, minimal `black_market` section: kilograms of herbal cannabis and resin
  seized in the latest year against the year before. They are a floor, not the full picture;
  replace or extend them when a country gets real market research.
  - *Europe*, source key `euda_szr`: the EUDA Statistical Bulletin, seizures page
    (`euda.europa.eu/data/stats2026/szr_en`). The page loads each table from
    `/modules/sbdata/SBDataService2026.cfc?method=fetchxml&tableid=…` (herbal kg `SZR-2-1-2`,
    resin kg `SZR-2-1-1`, number of seizures `SZR-1-1-2` and `SZR-1-1-1`, plants `SZR-2-1-3`).
    It answers a browser but refuses plain fetches. The offence tables (`DLO-03-1-0` total,
    `DLO-03-2-0` use) are empty for Denmark, Estonia, Finland, Ireland, Romania, Sweden and
    Norway.
  - *Rest of the world*, source key `unodc_szr`: the UNODC data portal's drug-seizure
    dashboard (`data.unodc.org/datareport/drug-seizure`), figures as reported by governments
    in kilogram equivalents, 2018 onwards. Read it in a browser; nothing needs downloading.
    Some reported values are plainly wrong units: a country was skipped when its latest
    figure was more than fifty times above or below the year before (Afghanistan, Bosnia,
    Cabo Verde, Israel, Montenegro) or implausibly small (Uganda, Trinidad, Suriname,
    Mauritania). Plant counts there are converted to kilograms and were left out.


## Driving, visitors and arrests

Three more optional, unscored sections under `context`, written like the two above. `driving` and
`visitors` carry a `status` that colours a map option and shows as a chip; `arrests` is plain cited
text.

```yaml
context:
  driving:
    status: limit           # impairment | limit | consumption | zero
    text: >-
      A driver with 3.5 ng of THC per millilitre of blood serum commits an offence …
    sources:
      - key
  visitors:
    status: residents       # open | residents | none
    text: >-
      Clubs may only admit people who have lived in the country for six months …
    sources:
      - key
  arrests:
    text: >-
      Police recorded 12,300 cannabis offences in 2024, 80% of them for possession …
    sources:
      - key
```

- **`driving.status`** describes the reviewed offence trigger: `impairment` (evidence of drug
  influence or impaired driving), `capacity` (the drug is in a biological sample and was capable
  of affecting driving; proof of a driving error is a separate question), `limit` (a set THC level
  in blood or saliva is an offence by itself), `consumption` (a prohibition after drug consumption
  without a verified laboratory THC cutoff) or `zero` (any detectable THC). Do not infer a
  detectable-THC offence merely from a prohibition after consumption, and do not use `zero` when
  a binding ruling requires more than detection. Give the limit and its unit, the penalty and
  licence consequences, and any separate rule for medical patients, novice or professional drivers.
- **`visitors.status`** is whether someone who does not live in the country can get cannabis
  legally: `open` (same terms as residents), `residents` (legal supply is for residents only) or
  `none` (no legal recreational supply for anyone). Say also what a visitor may possess or use,
  and what happens to a foreigner who is caught: deportation, entry bans, visa consequences.
- **`arrests`** is for published counts: arrests, recorded offences, fines, convictions or people
  in prison for cannabis, with the year and who counted. Prefer police, justice-ministry or
  statistics-office figures; say when a figure covers all drugs and not cannabis alone.
- As everywhere, describe the whole country and leave the section out when nothing reliable is
  found.

`node scripts/data-status.cjs driving` (or `visitors`, `arrests`) lists what is done and what is
still to do.

## Seeds and clones

Seed and clone law often differs from the plant's. The 1961 Single Convention leaves seeds out of
its definition of cannabis, so many countries that ban growing still let seeds be sold, while
clones are living plants and usually fall under the cultivation rules. The profile records this in
an optional section under `context`. **It is never part of the score** and no history `before`
changes because of it.

```yaml
context:
  planting:
    seeds: grey             # may an adult have and plant them: legal | grey | licensed | illegal
    seeds_trade: open       # open | regulated-sale-plus-gifts | regulated | gift | unclear | banned
    clones: illegal         # same four values as seeds
    clones_trade: banned    # same values as seeds_trade
    text: >-
      The Misuse of Drugs Act's definition of cannabis leaves out the seed, so buying and holding
      seeds is not an offence. Cultivating any plant of the genus Cannabis is unlawful without a
      licence, which covers germinating seeds and keeping cuttings.
    sources:
      - mda                 # a key defined under the profile's `sources`
```

| Value | Seeds | Clones |
|---|---|---|
| `legal` | Adults may buy, hold and sow them | Adults may buy and keep cuttings |
| `grey` | Sold or held openly, but germinating is an offence, or the law is silent | Tolerated, or legal only until the plant flowers |
| `licensed` | Only for licensed growers (hemp, medical, registered clubs) | Same |
| `illegal` | Treated as cannabis or expressly banned | Treated as plants under the cultivation ban |

Having them and trading them are separate questions, so each gets its own status. Seeds are often
lawful to sell where sowing them is not, and a country that lets adults grow may still allow no one
to sell them a plant.

| Trade value | Meaning |
|---|---|
| `open` | Anyone may sell them, in shops or online |
| `regulated-sale-plus-gifts` | Licensed sellers may sell them, and adults may also give a limited amount away |
| `regulated` | Only licensed sellers, clubs or the state may sell or hand them out, often with limits |
| `gift` | May be given away between adults, but not sold |
| `unclear` | The law does not say whether they may be sold |
| `banned` | Selling or handing them on is an offence |

How to decide:

- Read the statute's **definition of cannabis**. If it excludes the seed and nothing else bans
  seeds, seeds are `grey` where growing is illegal and `legal` where adults may grow.
- For clones, read the **cultivation offence** and any rule on plants that are not flowering. A
  cutting is a plant unless the law says otherwise.
- For the trade status, look for who may sell: nobody (`banned`), a licence holder or club
  (`regulated`), anyone (`open`). Where licensed sellers may sell and adults may also give a
  limited amount away, use `regulated-sale-plus-gifts`. Where seeds are simply outside the definition of cannabis and no
  other rule restricts them, the trade is `open`. Use `unclear` when the law allows having them but
  is silent on selling, and say so in the text.
- Keep it consistent with the profile's cultivation segment: if a few plants are tolerated, clones
  are `grey`, not `legal`.
- Leave the section out when no source was read. Do not guess from neighbouring countries.

A law that changes seed or clone rules goes into `changes.yaml` as a context entry (category
`hemp`, or `easing` / `tightening` when it clearly changes what a cannabis user may do), with no
`before`, tagged `seeds`.

`node scripts/data-status.cjs planting` shows which profiles have the section and lists the rest by
score, highest first. State and province files do not carry it yet. The statuses and their labels
are defined once in `PLANTING_STATUS` in `src/lib/segment-ids.js`; the country page, the compare
table, the per-country JSON and `scores.csv` (columns `seeds`, `seeds_trade`, `clones`, `clones_trade`)
all read from there, together with `PLANTING_TRADE`.

## Research scope beyond law

The history also covers cannabis cultivation, food, fibre, medicine, trade, science,
art and everyday culture. Do not limit research to bans and legal reform. Record a
dated publication, excavation report or other event in `changes.yaml`, normally as
unscored `culture`; recurring practices belong in the cultural atlas as described in
[CULTURE.md](CULTURE.md). Keep the date of a modern discovery separate from the age
of the evidence it describes. Do not infer intoxication from every seed or textile,
or present historical therapeutic claims as established efficacy.

## Outside datasets

Figures from other organisations' datasets stay in their own files in `/datasets`, as CSV,
and are read at build time; nothing is copied into the country files. They are shown in the
profile's rail ("Beyond the law"), get a view of their own on the world map (the Society
group) and are never part of the score.

- `datasets/datasets.yaml` defines each dataset: its file, source and citation, which column
  names the country (by our file name or by country name, with aliases for names that
  differ), an optional year column (only the latest year is used), the fields to read and
  how one of them colours the map. The format is described at the top of that file and
  checked by `src/content.config.ts`; the reading is done by `src/lib/datasets.js`.
- Every file and `datasets.yaml` itself are published unchanged at `/data/datasets/<file>`
  and described on the sources page (`/sources/#datasets`): publisher, coverage, size, rows,
  SHA-256, the columns used and `origin`, which must say honestly how the file was made
  (downloaded as published, or transcribed, and on what date). These files keep their
  publishers' terms, not the site's CC BY licence.
- Every dataset is kept as a series, one row per country and year, so that each profile's
  Datasets tab can chart it; the map, the headline figures and the side column use the
  latest year. Keep every year an extract has: do not filter to the latest when adding one.
- A dataset view on the map with more than one year gets a year slider and a play button.
  The yearly figures are published per dataset at `/map-series/<id>.json` and loaded only for
  the open view. A chosen year shows each country's figure for that year, or its latest from
  the `map.window` years before (5 by default); `?year=` in a map page's address opens it there.
- The Freedom views (index and segments) use the same control with the scores at the end of
  each year since 1900, rebuilt from the history like the yearly panel and published at
  `/map-series/freedom.json`. Their bars count the countries whose score changed each year by a
  recorded change. States and provinces have no history, so they are shown only for today.
- A dataset published as a new file each time (a yearly survey, a new index edition) lists
  its files in `file` as `{ file, edition }`. To add an edition, put the new CSV beside the
  old ones and add a line; the site joins them into one series. The old files stay.
- A dataset whose file is missing is left out with a warning. Country names that match no
  country file are listed in the build output: add an alias in `datasets.yaml`.
- To update a dataset, replace its CSV with the new edition (and the file name and
  citation in `datasets.yaml` if they change).
- `unodc-cannabis-use.csv`: cannabis use for every country (share of adults, survey year or
  period, age band, number of users). Rebuilt by `python3 scripts/extract-unodc.py use` from
  the UNODC spreadsheet kept beside it (`unodc-wdr2026-1.2-prevalence-national.xlsx`, World
  Drug Report 2026 annex, table 1.2). Each survey rate is applied to a World Bank population of
  the same age band: five-year age groups, split evenly where the band cuts through a group.
  A survey with no recorded age, and a regional median, use ages 15–64. `estimate` is that
  median computed here, not a regional total from UNODC. `source` says where each row comes
  from: `wdr2026`, `earlier` (a figure the table lacks, kept from Wikipedia's list of older
  UNODC figures) or `estimate`. It feeds the Use views of the map, the rankings and the profiles, so every country file needs a
  row; the build stops if one is missing. A new country gets one when the script runs again.
- `unodc-cannabis-use-youth.csv`: past-year cannabis use among 15- and 16-year-olds, from
  `python3 scripts/extract-unodc.py youth` and the UNODC spreadsheet beside it
  (`unodc-wdr2026-1.4-prevalence-youth.xlsx`, table 1.4). Only that age group is kept, so that
  countries compare; countries reporting other bands (Germany, France, Spain) are left out.
- `unodc-cannabis-seizures.csv`: kilograms of cannabis herb and resin seized, every year from
  2015, from `python3 scripts/extract-unodc.py seizures` and the UNODC spreadsheet beside it
  (`unodc-wdr2026-7.1-drug-seizures.xlsx`, table 7.1). Figures are as reported; some very large
  ones (Namibia, Tanzania) appear to include plants destroyed in the field.
- `faostat-hemp.csv`: hemp grown for fibre and for seed, every year since 1961, from FAOSTAT's
  crops file. Download the bulk zip named in `datasets.yaml` (about 34 MB, not kept here) and
  run `python3 scripts/extract-faostat-hemp.py <zip>`. Former states (USSR, Czechoslovakia,
  Yugoslavia) stay in the file without a country. The map shows only figures since 2015
  (`map.since`); the profile lists the series.
- `vdem-civil-liberties.csv`: V-Dem's civil liberties index (0 to 1) every year from 1900,
  from Our World in Data's chart file kept beside it (`owid-civil-liberties-vdem.csv`) by
  `python3 scripts/extract-owid.py civil_liberties`. For a new V-Dem release, download the
  chart CSV again from the `data_url` in `datasets.yaml` and rerun.
- `gbif-cannabis-records.csv`, `openalex-cannabis-papers.csv`: open, non-governmental data fetched
  from public APIs by `python3 scripts/fetch-open-data.py` (`gbif`, `openalex`), rewritten whole.
- `osm-cannabis-shops-<date>.csv`: places tagged `shop=cannabis` in OpenStreetMap, counted by
  country with `node scripts/osm-shops.mjs`: one worldwide Overpass query, then each place is put
  in a country with the map's own shapes (seconds, not hours). Each run writes a new dated file:
  add it to the `file` list of `osm_shops` as a new edition and keep the old ones, so that the
  shop counts become a trend.
- `population.csv`: population by year for every country (`country,year,population`), a figure
  every ten years from 1900 to 2020 and the latest one. It weights the population-weighted
  average and is read by `scripts/article-backlog.cjs` and `scripts/data-status.cjs`; every
  country needs at least one row.
- `euda-cannabis-use-offences.csv`: offences for using or possessing cannabis in European
  countries, 2007–2024, from the EUDA Statistical Bulletin table DLO-03-2-0. The EUDA's site
  refuses scripts: open the table in a browser, read the XML its data service returns (the
  `fetchxml` address in `scripts/extract-euda.py`), save it unchanged over the XML in
  /datasets, check its SHA-256 against the browser's copy and run
  `python3 scripts/extract-euda.py cannabis_offences`.
- `euda-cannabis-prices.csv`, `euda-cannabis-potency.csv`: mean retail price (euros per gram)
  and mean THC content of cannabis herb and resin in Europe, 2002–2024, from four EUDA tables
  saved the same way (`python3 scripts/extract-euda.py prices` and `potency`). The XML can be
  passed from the browser gzipped and base64-encoded, then decoded and checked by SHA-256.
- `unodc-drug-possession-police.csv`: people brought into contact with the police for drug use
  or possession (all drugs), extracted by `python3 scripts/extract-unodc.py offences` from the
  UNODC spreadsheet kept beside it (`unodc-wdr2026-10.1-drug-related-crimes.xlsx`, World Drug
  Report 2026 annex, table 10.1). For a new edition, replace the spreadsheet, update `original`,
  `title` and `data_url` in `datasets.yaml`, and run the script again. Shown per 100,000
  people (`map.per`), using the latest population.
- `pew-marijuana-morality-2026.csv`: Pew Research Center, "Using marijuana" (Q17g), the
  "Total" rows of the 2026 international morality topline, transcribed by hand.
- `hfi-2025.csv`: Human Freedom Index 2025 (Cato and Fraser Institutes), the official CSV
  as downloaded. Both sites block scripted downloads, so it has to be saved from a browser.

To add a dataset: put its CSV in `/datasets` and add a definition to `datasets.yaml`; the map
view follows from that. The profile block is written for each dataset in
`src/components/CountryDatasets.astro`.

## Quick answers

Every profile shows five plain answers ("Can I carry it?", "Can I buy it?", …) on its page, on
`/can-i/` and in the page's structured data for search engines. `src/lib/answers.js` reads them
off the segment scores, but a score band holds places whose law reads differently: possession 3 is
both "decriminalised" (Portugal) and "a crime that is not prosecuted" (the Netherlands), access 4–5
is a pharmacy, a club, a state shop or a coffeeshop. So:

- **The generic answer of a band says only what is true of every place in it.** Never a legal
  category ("not a crime", "decriminalised") or a channel ("clubs or state outlets") that the band
  does not guarantee. When you change a band's wording, read every profile in it:
  `node scripts/answers.test.mjs --list carry`.
- **A step can depend on a status.** A place with `medical: none` is never told it can buy on
  prescription, whatever its access score.
- **Where the band cannot say it right, the profile says it**, under `answers`, worded from its own
  segment text and nothing else:

  ```yaml
  answers:
    carry:
      answer: limited          # yes | limited | no
      text: Illegal, but up to 5 g is not prosecuted; police may still seize it
    caught:
      answer: limited
      label: Licence suspension   # "What if I'm caught?" needs its own label
      text: Your driving licence or passport can be suspended for one to three months
  ```

  Questions: `carry` (possession), `grow` (cultivation), `buy` (access), `public` (consumption),
  `caught` (enforcement). When the law changes, update the answer with the segment.
- **National estimates do not describe a single jurisdiction.** Where state/provincial rules
  or federal and local laws diverge, provide an explicit answer naming that distinction. The US
  possession score must never imply that criminal charges are generally unavailable. Audit
  Canada and Australia alongside it; Canada’s federal growing permission still has a Quebec
  exception. Check administrative detention separately from criminal punishment, as in China.
  The same overrides feed the profile, `/can-i/` and search-engine FAQs. Federation profiles
  link from the quick answers to their state/province picker.
- **`npm run answers:test`** checks every answer against its profile: prescription without a
  medical programme, "legal" where recreational cannabis is not, "use itself is a crime" where the
  text says use is not an offence, a fine where the text says there is none, and so on. It runs
  before every deploy. A failure means the answer, the text or the score is wrong: fix whichever
  it is, never the check. If the score is what is wrong, change it with its timeline (see "The
  score timeline must make sense").

## How a history entry works

```yaml
- id: tunisia-law-52-amended-2017     # also the page address; never reuse or rename lightly
  date: "2017-04-25"                  # YYYY-MM-DD, YYYY-MM or YYYY, as precise as the source
  category: easing                    # see "Choosing the category" below
  tags: [court]                       # optional; keys of CHANGE_TAGS in src/lib/segment-ids.js
  country: tn                         # omit for international entries
  subunit: on                         # optional, in a federation: the state or province it is about
  title: Tunisia gives judges discretion in drug cases
  description: >-
    Two to four sentences. Only what the source states. How to write it: docs/WRITING.md.
  before: {possession: 0, cultivation: 0, enforcement: 0, sharing: 0, consumption: 1, access: 0}
  checked: true                       # only when the source was opened and read
  sources:
    - title: TalkingDrugs — Tunisia parliament approves …
      url: https://…
```

Sources do not have to be webpages. For a book or a chapter, omit `url` and give enough
bibliographic information for a reader to find the passage:

```yaml
  sources:
    - type: chapter
      title: "Ganja Madness: Cannabis, Insanity, and Indentured Labor in British Guiana and Trinidad, 1881–1912"
      authors: [Jamie Banks]
      container: "Cannabis: Global Histories"
      editors: [Lucas Richert, James H. Mills]
      publisher: MIT Press
      year: 2021
      isbn: "9780262366137"
      locator: "pp. 57–80"
```

Use `type: book` for a whole book and `type: chapter` for a chapter in an edited volume. The
other accepted types are `web`, `journal`, `report`, `law` and `other`. `authors`, `editors`,
`container`, `publisher`, `year`, `isbn` and `locator` are optional, but include every field the
source provides and make `locator` as precise as practical. Print sources render as citations
rather than dead links and have no Internet Archive copy. Price observations remain web-only and
still require a URL.

### Choosing the category

Every entry has exactly one `category`. Go down this list and take the **first** that fits:

1. **`death`**: the death penalty for cannabis is introduced, used, limited or removed.
2. **`legalisation`**: possession, growing or sales become legal for adults.
3. **`ban`**: cannabis is restricted for the first time, or banned again after being legal.
4. **`medical`**: medical cannabis is allowed, widened, narrowed or refused, including
   cannabis medicines such as Sativex or dronabinol.
5. **`tightening`** / **`easing`**: a law, decree or ruling makes things harsher or milder for
   people who use, grow or sell cannabis (penalties, offences, thresholds, a ruling that
   protects users). A court ruling goes here when it changes how the law is applied.
6. **`hemp`**: fibre and food hemp, CBD and low-THC products, and seeds: their rules and their
   industry, when they do not change what a cannabis user may do. A hemp flower ban that closes
   shops is `tightening`. Hemp in old texts and traditions is `culture`, tagged `hemp`.
7. **`international`**: treaties, a country joining or leaving one (tag `ratification`), and
   decisions of UN or other international bodies.
8. **`debate`**: a bill, report, commission, campaign, referendum petition or vote, or a court
   refusing to rule, that changed no rule by itself.
9. **`enforcement`**: raids, seizures, arrests, crackdowns, a single case or sentence,
   statistics on arrests: how a law was applied, without a change in the law.
10. **`culture`**: traditions, trade, markets, fairs, books, research, discoveries, patents,
    surveys of use, and organisations that are not campaigns.
11. **`other`**: a law or ruling that does not clearly make things harsher or milder: a new code
    that keeps the same rules, a change of the responsible authority, or a mixed reform.

Steps 1 to 6 are for rules that actually changed. A bill, plan, draft or promise about any of
them is `debate` until it is passed.

`other` is the last resort, not the default. Topics that cut across categories (a court, a
referendum, home growing, religion, colonial rule) go in `tags`, not in the category.

### States and provinces

In the United States, Canada and Australia, set `subunit` when an entry is about one state,
province or territory: its own law, court ruling, ballot vote, regulator, programme or a case
tried there. Leave it out for federal law, national bodies and courts (a US Supreme Court ruling
on a case from one state is still federal), and for events that span several states. The entry
keeps its `country`, and a `before` on it is still about the national score. It is listed on the
country's History tab, labelled with its state, and on the state's own page.

- **`before`** is the six scores *before* the event. The scores after it are the `before` of the
  same country's next scored entry, or the country's current scores. So the chain must be
  consistent: the newest scored entry's "after" is the profile's current scores.
- Leave `before` out for a **context entry**: a debate, a failed bill, a law that changed
  nothing a user would feel. Most entries are context entries.
- If the law or the reality changed, the entry **should move the score**, by an honest small
  amount (usually one point in one or two segments).
- **`estimate: true`** (with an optional `window: [from, to]`) marks a first restriction whose
  date is unknown. Replace these with a dated law whenever one is found.
- **`country`** may also be a disputed territory (`xa`, `xn`, `xs`, `xt`). Its entries show on its
  page and in the history list, but its scored changes never move the world average.
- **Dependencies with laws of their own** have their own profiles where they matter enough:
  Jersey (`je`), Guernsey (`gg`), the Isle of Man (`im`), Bermuda (`bm`), the Cayman Islands
  (`ky`), Gibraltar (`gi`) and the British Virgin Islands (`vg`) under the UK, and Greenland (`gl`)
  and the Faroe Islands (`fo`) under Denmark, French Polynesia (`pf`) under France, and Puerto Rico
  (`pr`), Guam (`gu`), the Northern Mariana Islands (`mp`) and the US Virgin Islands (`vi`) under
  the United States. A profile marks this with
  `dependency: {of: gb, kind: "Crown Dependency", note: …}`;
  like a disputed territory it is scored and drawn on the map but takes no rank and stays out of
  the averages. Their history entries use their own code.
- **A place without a profile of its own** goes under the country that answers for it
  internationally: the Falklands and the other British Overseas Territories under `gb`; French
  overseas territories such as New Caledonia under `fr`; American Samoa under `us`. Leaving `country` out files the entry as
  International, which is only for treaties, UN decisions and other events that belong to no one
  country. Such entries are normally context entries: they must not move the profile's scores.
  When a place has gathered enough to deserve a profile, give it one as above and move its entries.
- **`checked: true`** means: the date and the event were compared with a source that was read.
  A search-result summary is not a read source (see "What went wrong").

## The score timeline must make sense

Treat the timeline as a story someone will read off the chart. Check it whenever you add,
move or re-score an event, and whenever you change a profile's scores:

```bash
node scripts/data-status.cjs chain        # every country with a step that looks wrong
node scripts/data-status.cjs chain de     # one country's full timeline
```

- **It is continuous.** The "after" of each scored event is the "before" of the next one, and
  the last "after" is the profile's current scores. Changing a profile score therefore changes
  the "after" of that country's newest scored event: either that is right (the event explains
  it), or you need a new scored event that explains the change, dated when it happened.
- **It starts from freedom.** The first restriction normally has `before` = unregulated
  (`"FREE"`: 10 in every segment = 100). A lower starting point is fine only when an earlier
  licensed or taxed regime is documented (India, Morocco, Nepal, Tunisia, South Africa, …).
- **Direction matches the event.** A ban, tightening or death-penalty law must not raise the
  score; an easing, legalisation or medical law must not lower it. The script flags mismatches.
- **Size matches the event.** A first total ban is a large drop. A new sentencing rule, a medical
  programme or a court ruling is usually one point in one or two segments. Do not let a minor
  event carry a big jump, and do not leave a big real change (decriminalisation, legalisation)
  as a context entry.
- **Every real change moves it; nothing else does.** If the law or the practice changed, the
  entry is scored. Debates, failed bills, reports and announcements are context entries.
  A context entry filed as a ban, tightening, death, easing, legalisation or medical law needs a
  reason: give it `unscored: <one line>` (re-enacted the same penalties, never enforced, one
  region only, too small to move a whole point, …) or score it. The number of entries never moves
  a score by itself: a well-researched country must not drift away from an equal one that is not.

  ```bash
  npm run scores:triage              # countries with open entries, fewest scored steps first
  npm run scores:triage -- de        # one country: scored steps and open entries in order
  npm run scores:triage -- batch 5   # the next five countries' timelines, for a review batch
  ```
- **Inserting an event in the middle re-bases its neighbours.** A new scored event between two
  existing ones takes its "after" from the next event's `before`; choose its own `before` so the
  earlier event's step still makes sense. The delta form in a batch file (`{"enforcement": 1}`)
  does this arithmetic for you. Moving where a drop happens (for example to an earlier first
  ban) means editing the `before` of the event that used to carry it.
- **Segments, not just totals.** The six numbers should each be explainable by
  `segments.yaml`: use criminalised → consumption; mandatory prison or death penalty →
  enforcement; a prescription route → access; home growing allowed → cultivation; and so on.
- **Estimates** are spread evenly over their window on the charts. Replacing one with a dated
  law sharpens the country's line and the world average; that is the point of doing it.

## Workflow that has worked

1. **Pick countries.** `node scripts/data-status.cjs thin` lists places with two or fewer
   entries; `unchecked` and `estimates` list what still needs a source. Go by population, or by
   region in batches of ten or so.
2. **Read sources.** In rough order of usefulness:
   - The statute itself on a national law site (legislation.gov.*, *lii.org, PacLII, kenyalaw,
     lawphil, BOE, sejm, slov-lex, legifrance …) or UNODC SHERLOC. A ministry, parliament,
     court or regulator page is next.
   - Library of Congress Global Legal Monitor, Transnational Institute country guides, IDPC,
     Human Rights Watch, Amnesty, Harm Reduction International, EMCDDA/EUDA country reports.
   - National or regional news for recent events.
   - Wikipedia "Cannabis in <country>", "Drug policy of <country>", "Legal history of cannabis in
     <country>" (also the local-language edition), as a list of leads. Ask for *every dated legal
     event the page states*, then cite the statute or other source those leads point to. Keep
     the Wikipedia page itself only when no other source for that claim can be found.
3. **Write a batch file** and apply it:

   ```bash
   node scripts/history-batch.cjs batch.json
   npm run build
   ```

   ```json
   {
     "checks": [["existing-entry-id", ["Source title", "https://…"], "1998-04-17"]],
     "entries": [{
       "id": "norway-21-years-1984", "date": "1984", "c": "no", "cat": "tightening",
       "title": "Norway raises the drug maximum to 21 years",
       "desc": "Parliament lifted the upper limit …",
       "before": null,
       "page": ["FHI — Historisk oversikt …", "https://…"]
     }]
   }
   ```

   - `checks`: mark an existing entry checked, add the source, optionally correct the date.
   - `before`: `null` for a context entry; `"FREE"` for the unregulated state before a first
     ban; an array of six scores; or a delta object such as `{"enforcement": 1}`, meaning "one
     point higher before this event than after it". Deltas are resolved against the chain.
   - `page`: a Wikipedia page name, or `[title, url]`.
   - `replaces`: id of an estimated entry this dated one replaces.
   - `unchecked: true`: add the entry without the checked mark (source not actually read).
   - Omit `c` for an international entry.
   - The script re-sorts the file and refuses duplicate ids.
4. **Compare with the profile.** If a recent event changes what is true today, edit the country
   file: `recreational` / `medical`, the six `scores`, the `summary`, the segment or context
   texts, add the source under `sources`, and set `updated` to today. Keep the history chain
   consistent with the new scores.
5. **Check the score timeline** of every country you touched: `node scripts/data-status.cjs chain <id>`.
6. **Run the tests, build, restart the preview, spot-check** one country page (its chart and
   History) and `/history/`. `npm run history:test` and `npm run answers:test` hold the facts that
   earlier issues corrected (Hong Kong's 15-year cultivation ceiling, Kuwait's Decree-Law No. 159
   of 2025, …). A rewrite that drops one fails them, and so does the deploy. When a test fails
   after new research, either the research lost a corrected fact, which goes back in, or the
   test is checking wording rather than the fact, so loosen the test, never the fact.

## Rules learned the hard way

- **Date a law by when it took effect, not when it was signed.** Assent, promulgation and
  publication are not commencement. Botswana's Cannabis Act was scored on its assent (17 October
  2025) although the parts that allow anything commenced on 22 December. Look for the
  commencement notice or statutory instrument; if the law took effect in stages, date the scored
  entry by the stage that changes what people may do, and mention the earlier dates in its
  description.
- **History is what has happened: never date an entry in the future.** A law adopted now that
  applies later is entered at its adoption or entry into force, unscored, with the date it applies
  in its description ("applies from 1 January 2027"); when that day comes and it changes what
  people may do, a scored entry follows, dated then. The EU's hemp-leaf tea limit was once dated on
  its application day, months ahead, and sat at the top of the history. `npm run history:test`
  fails on any entry dated after the day it runs.
- **Never state a whole region's law in one country's profile.** "The model is prohibited
  throughout the European Union" sat in 13 profiles, copied from a 2018–2019 study, and was
  false once Malta and Germany licensed associations. Say what the country's own law does; date
  any comparison. `scripts/profile-claims.test.mjs` keeps a list of such sentences that must not
  come back.
- **Never trust a search summary for a fact you will mark as checked.** One summary attributed
  Bosnia's December 2025 medical approval to Kosovo; others invented sentence lengths or dates.
  Open the page and read it. When the page will not load (403, PDF), add the entry unchecked.
- **Write only what the source says.** Do not add colour from memory to a description, even if
  you are sure. Several such sentences had to be removed afterwards.
- **Distrust `cannabisregulations.ai` and `tripbase.com`.** The first one described a 2024
  legalisation in Palau that never happened. Do not use either as the only source for anything.
  Sensi Seeds country blogs are weak too.
- **GOV.UK travel advice is a source only for the United Kingdom and for closed countries.** The
  early profiles leaned on the Foreign Office's travel advice ("British travel advice says …")
  for visitors sections and sometimes for penalties. Do not add it anywhere new. It is acceptable
  for the UK itself and for countries whose own law texts and press cannot be reached (North
  Korea, Turkmenistan, Eritrea and the like). Elsewhere it is being phased out gradually:
  whenever a profile is edited, replace what rests on it and delete the `fcdo` source once
  nothing cites it. `grep -l "gov.uk/foreign-travel-advice" -r countries | wc -l` counts what is
  left (147 files on 12 October 2026, 29 on 14 October 2026).
- **Removing a GOV.UK sentence means replacing its content, not dropping it.** Above all a
  statement about prison: if the travel advice was the only place a profile said how long a
  person can be jailed, find the same fact in the country's statute, its regulator or courts, a
  legal review or local press, and cite that. A filler sentence ("there are severe penalties") can
  go only when the possession section already gives the penalty from a local source. Do not
  replace it with an inference such as "the same penalties apply to visitors"; write what the
  law says.
- **Current law comes first.** When extending the research, the priority is the present state of
  the law and the history of prohibition: the six scored sections checked against the statute
  itself, then dated legal changes. Culture, science and industry milestones are secondary.
- **Prefer any other source to Wikipedia.** A statute, an official gazette, a court, a ministry
  or regulator, a news report or a book that was opened should be the citation. Wikipedia is a
  place to find those sources. When a profile, a history entry or a culture page is edited and
  another source for the same claim can be found, replace the Wikipedia citation and delete the
  `wiki` source once nothing cites it. Leave Wikipedia only when nothing else can be reached,
  and say so by keeping it as the source. It is especially weak for a first ban: colonial
  restrictions usually need a statute database, a UN document or an academic paper. The same
  rule covers Commons file pages used as the source of a fact; a Commons file that is itself
  the picture stays, with its credit.
- **A statute's date is not always the first ban.** A country's "first narcotics law" may come
  long after cannabis was already restricted (Oman 1999, Zimbabwe 1956, Iran 1959). Then add it
  as a context entry and leave the estimate in place.
- **Federations:** state-level changes (US, Australia, Canada, India) are context entries on the
  national timeline unless the national picture really shifts.
- **`history-batch.cjs` re-sorts the whole of `changes.yaml`.** The file is not kept in the
  script's sort order, so one run rewrote about 41,000 lines (14 October 2026). Check `git diff
  --stat changes.yaml` after a run; if it is more than the new entries, put the original text
  back and insert the new blocks by hand next to entries of the same date.
- **Search tool limits:** more than about ten web searches in one go start failing with
  rate-limit errors. Batches of five work.
- **UN documents load through the official document system.** `digitallibrary.un.org` is blocked,
  but `https://documents.un.org/api/symbol/access?s=<symbol>&l=en&t=pdf` returns the PDF for a
  document symbol and `pdftotext` reads it. The 1955–58 cannabis surveys are E/CN.7/286 (South
  Africa) and Add.1–12 (Basutoland, Bechuanaland, Swaziland, the Rhodesias, Brazil, Angola,
  Mozambique, Morocco, India); each has a "National legal provisions" part listing the laws.
- **Blocked sources:** the UN Digital Library (403), UNODC Bulletin on Narcotics pages (404),
  Library of Congress (403), TNI Spanish pages (403) and most PDFs cannot be read by the fetch
  tool. If the user saves such a PDF into the project it can be read from disk.

## What is still open

Run `node scripts/data-status.cjs` for current numbers. As of 5 October 2026: 784 entries,
673 checked, 38 unchecked, 73 estimated first bans.

1. **Profiles with missing or unreliable sources — the most important item.**
   All `cannabisregulations.ai` and `tripbase.com` citations were removed on 12 October 2026. Where
   either had been the only source, required context sections now state that reliable information
   has not been established; optional unsupported sections were removed. `node
   scripts/data-status.cjs weak` lists scored segments that now have no citation and continues to
   detect either domain if one is added again. Re-source gaps from statutes or authoritative
   reporting, and correct scores if the better source says something different.
2. **Entries that rest on summaries only.** Many entries added in October 2026 are marked
   checked on the strength of a search summary. Open their sources; downgrade or correct.
   Known to be unconfirmed: Senegal 1997/2007, Sierra Leone 2008, The Gambia 2003/2011/2014,
   Liberia 2014/2023, El Salvador 2003, Eswatini 1922, Botswana 1922,
   Mozambique 1914, Zambia 1926, Ghana 1935, Hungary 1930, Costa Rica 1928, Kiribati/Tuvalu 1948,
   St Kitts 1937, Saint Lucia 1938, Iraq 1933.
3. **Unchecked entries** (`data-status.cjs unchecked`): Singapore and Papua New Guinea (blocked
   sources), the Baltic states 1940, French Equatorial Africa 1926, Laos 1996, Canada 1954,
   Jamaica 1941, UK 1967, Germany 1872, Bahamas 2024 (passage unconfirmed), Antigua's December
   2018 Act, Saudi flogging (February vs April 2020), Taiwan 1955, Iran 1959, Kuwait's in-force
   date, Norway's June 2025 passage.
4. **Estimated first bans** (`data-status.cjs estimates`): mostly African colonies, Gulf states,
   Central America and small islands. Leads not yet usable: Tanzania (Noxious Plants
   (Prohibition) Ordinance, 1926?), Lesotho (1922 proclamation), Belgian Congo (1903 decree),
   Uruguay (Law 9.692 of 1937).
5. **Thin countries** (`data-status.cjs thin`): about twenty places still have one entry.
6. **Open questions on profiles:** Ecuador is "decriminalised" although its possession table was
   repealed in November 2023 (the constitution still bars criminalising users; left as is).
   Albania is medical "limited" although no licences have been issued and domestic medical use
   is not allowed. Tajikistan: Wikipedia mentions capital punishment for selling; unverified.
7. **From the pasted account of how cannabis was banned:** Lord Kitchener's regulation proposal
   and the review debunking the DuPont/Hearst story are unverified.
8. **Egypt:** the 1868 first ban is a context entry; the score still drops at the 1879 import
   ban. Moving the drop to 1868 means re-basing the 1879 entry.

## Progress log (5 October 2026, second session)

**Weak-source profiles re-sourced from statutes** (text in the profile now cites the law that was read):
Azerbaijan (possession only), Cameroon, Cabo Verde (court ruling, no statute), Chad (unverified),
Angola, Burkina Faso, Niger, Libya, Yemen, Central African Republic (unverified), Congo, Eritrea,
Micronesia, Comoros, Montenegro, Mongolia, Sudan (unverified). Scores changed for Burkina Faso, Libya,
Yemen, Eritrea, Micronesia, Comoros, Montenegro, Mongolia. Segments marked "unverified" keep their old
scores until a statute is found.

**Lesson:** about two in three of the old profile figures disagreed with the statute, and some
"checked" history entries were wrong (one Sudan entry was really about Brunei). Read the source, not
the summary. `curl` often gets a block page; a Wayback copy
(`https://web.archive.org/web/2024/<url>`) of the same page usually works, and PDFs fetched with
`curl` can be read with `pdftotext -layout`. Europe PMC serves full text of open-access articles.

**Entries on the "known to be unconfirmed" list** (open item 2) were opened: Senegal 1997/2007,
Sierra Leone 2008, The Gambia 2003/2011/2014, Liberia 2014/2023, El Salvador 2003, Kazakhstan 2011,
Mozambique 1914, Zambia 1926, Ghana 1935, Hungary 1930, Costa Rica 1928, Kiribati/Tuvalu 1948, St Kitts
1937, Saint Lucia 1938 were confirmed or corrected. Eswatini 1922, Botswana 1922 and Iraq 1933 could not
be opened and were set back to unchecked. The wider October 2026 batch of "checked" entries has not
been audited yet.

**Unchecked list (open item 3), worked through in the same session:** 22 of 41 entries are now checked,
most after corrections (see git diff of `changes.yaml`). Still unchecked, with the reason:
Papua New Guinea 1970 and 2022 (source PDFs blocked; The National, 3 Dec 2021, confirms Parliament passed
the Controlled Substance Bill), Djibouti 1996 (law number only on cannabisregulations.ai), Iran 1959
(Sensi Seeds only), Estonia/Latvia/Lithuania 1940 (no source says when Soviet drug law applied),
Iraq 1933, Eswatini 1922, Botswana 1922 (sources blocked), Germany 1872 (no source found).
Two entries were rebuilt around what the source actually says: Laos 1996 became an estimated first
restriction, and the Norway "1965 tinctures" entry became Norway's first cannabis seizure of 1965.

## Reporting back

A [2000–2009 history pass](research/history-2000s-2026-10-17.md) on 17 October
2026 adds Canada's 2002 Senate report and 2003 Bill C-38, Germany's 2005
exceptional-permit judgment, and England and Wales's 2005 Quayle appeals. It
corrects the Swedish industrial-hemp event from 2005 to the verified January
2003 Hammarsten ruling, preserving its page ID. Primary or reproduced-original
sources distinguish recommendations, reconsideration and rejected defences from
enacted access. No scores or articles changed. The build passed (3,162 pages).

A second pass in the same note adds five records: NSW's 2000 cautioning trial
and 2001 second-caution education requirement, New Zealand's 2003 inquiry report
and 2009 impairment-testing provisions, and the EU's 2004 trafficking framework.
It distinguishes police discretion from legalisation, a divided inquiry from an
adopted reform, impairment tests from later saliva screening, and the EU's
personal-consumption exclusion from national decriminalisation. No scores,
profiles or articles changed. The build passed (3,167 pages).

A third pass adds five North American records: Hawaii's 2000 medical law,
Conant (2002), Malmo-Levine/Caine (2003), Sfetkopoulos (2008), and Michigan's
2008 medical law. Reproduced judgments and official records distinguish speech
protection, existing criminal offences, licensing restrictions and programme
commencement. Hawaii retains year precision because original-act retrieval was
inconsistent. No profiles, scores or articles changed. The build passed (3,172 pages).

15 October 2026: an [earliest-ban research pass](research/earliest-cannabis-bans-2026-10-15.md)
added four attributed medieval context records, corrected Menou's 1800 decree date
and article, and qualified the 1868 Egypt title. The note records dating problems,
sources actually read, existing coverage and why no continuous score regime was inferred.

A follow-up [article and source pass](research/earliest-ban-articles-2026-10-15.md)
added five articles and revised three across the eight early-ban records. Translated
al-Maqrizi passages support Cafour's destruction by 1244; later scholarship places
Baybars's broad prohibition in 1266. Existing page IDs are retained. The note records
remaining calendar, penalty and jurisdiction uncertainties; scores were not changed.

A [source-diversity continuation](research/earliest-bans-different-sources-2026-10-15.md)
added Safavid Iran (1534–1535) and Jahangir’s bazaar sales ban (1609), each with
an article, using the imperial memoir and scholarship by Matthee, Calmard and Kazemi.
It also removed the unsupported assignment of a later Ottoman cultivation circular
to 1725. No profiles or scores changed; India’s existing score-chain warning remains.

A [broader cannabis-history pass](research/cannabis-beyond-bans-2026-10-15.md)
added four entries and articles covering Culpeper's 1652 herbal, Scandinavian
textiles, domestication genetics and Bronze Age Haimenkou seeds. The source base
is a primary early modern transcription and three original research papers.
No country profiles, scores or score baselines changed.

A [pre-1900 regulatory pass](research/pre-1900-regulations-2026-10-15.md)
added five records and articles for New York (1860/1862), Berar (1875/1884)
and Baroda (1892). It corrected the commencement of Berar's 1897 law to
1 April 1898 and added its article. Morocco's claimed 1890 privileges are now
explicitly unresolved and no longer marked checked, following Chouvy's later
source criticism. All changes are regional or historical context; scores are unchanged.

A [16 October pre-1900 continuation](research/pre-1900-regulations-2026-10-16.md)
added Sweden's 1876 Indian-hemp supply restriction, India's 1873 administrative
resolution and Egypt's 1884 confiscated-hashish disposal rule. It corrected Bengal's
1798 recommendation, separated the 1871–1872 inquiry from the 1873 response, and
qualified the claim that Egyptian cultivation prohibition began only in 1884.
Existing IDs and score values were retained; Egypt's 1879 event now has month precision.

A [US pre-1900 continuation](research/pre-1900-us-regulations-2026-10-16.md)
added Wisconsin’s 1862 poison-sales control, with explicit limits on the secondary
evidence, and the 1891 Bromidia trademark injunction, checked against the original
reporter. Both have articles and are unscored. Country profiles and existing records
were unchanged.

A [colonial-commerce pass](research/pre-1900-colonial-commerce-2026-10-16.md)
added two Ceylon licensing records (1893) and three articles from original gazettes.
It expanded the 1897 import-only entry to include verified possession and sale
prohibition and corrected the 1905 chronology, removing that entry’s checked flag
until its own original instrument is read. Score values were preserved; the research
note flags the historical allocation of the 1867–1905 score changes for review.

A [Straits and North Borneo pass](research/pre-1900-straits-borneo-2026-10-16.md)
corrected both 1870 blanket-ban entries to licensed bhang-monopoly controls using
the official 1886 statutory compilation. It added the reported North Borneo 1891
licensing/monopoly law from the League’s 1922 government-reply summary. All three
entries gained articles. Existing score values were preserved, with the timing and
allocation of prohibition scores explicitly left for historical review.

A [Mediterranean customs pass](research/pre-1900-mediterranean-customs-2026-10-16.md)
added two Egyptian treaty-context records and articles: the Greek convention
operative 20 March 1884, with the related British acceptance, and the US extension
operative 18 March 1885. Official gazette and US treaty texts explicitly reserve
hashish controls and establish search procedures. These are foreign-commerce
enforcement arrangements; no domestic national ban or score change was inferred.

A [Greek public-orders pass](research/pre-1900-greek-public-orders-2026-10-16.md)
separated the 1890 ministerial circular from the 1891 Athens–Piraeus police order
and its reported 1897 repetition. Two new entries/articles and a rewritten 1890
article use Gkotsinas’s archival history and the contemporary Indian commission.
The prison circular’s date remains unresolved and was not added. Existing score
values were preserved; their allocation to a supposed blanket 1890 ban needs review.

After each pass, say: how many entries were added or corrected, which profiles and scores
changed and why, which score timelines were re-based, which claims rest on sources that were read versus only summarised, and what
could not be confirmed. Nothing is committed or deployed unless the user asks.

## Culture entries

The cultural atlas (`/culture/`, files in `culture/language/` and `culture/traditions/`) has its own
guide: `docs/CULTURE.md`. It says what belongs in each part, what an entry focuses on and how long
it is.

## Long reads for history entries

An important history entry can have a full article. To choose which, run

```
npm run articles:backlog            # top 50 entries without an article
npm run articles:backlog -- 100     # more
npm run articles:backlog -- --country mt
npm run articles:backlog -- --all   # include entries that already have one
```

It ranks every entry from what the data already says: the size of its score step, its kind, whether it
is a country's first ban or the change behind today's score, the population affected, how many atlas
entries, articles and related entries point to it, and whether a book is among its sources. Copies of
one event filed under several countries count once. The scale and points are at the top of
`scripts/article-backlog.cjs`. Where the ranking is wrong, set `importance: 1–10` on the entry in
`changes.yaml`; the listing marks hand-set values with `*`. The field is not shown on the site. The entry in `changes.yaml` stays as it is
(title, short description, sources); the article is a Markdown file named after the entry's id:

```
articles/russia-griner-sentence-2022.md
```

```markdown
---
image:                       # optional lead picture
  src: https://upload.wikimedia.org/…/1280px-Example.jpg   # or a path under /public
  alt: What the picture shows
  caption: One line under the picture.
  credit: Author, licence, via Wikimedia Commons
  credit_url: https://commons.wikimedia.org/wiki/File:Example.jpg
model: opus-5.5              # which model wrote it, with its effort where known (gpt-5.6-sol-medium)
written: 2026-10-11          # the day it was written
sources:                     # added to the entry's own sources
  - title: Publisher — headline (date)
    url: https://…
  - type: book              # print sources use the same structure as changes.yaml
    title: Book title
    authors: [Author Name]
    publisher: Publisher
    year: 2021
    isbn: "9780000000000"
    locator: "pp. 10–14"
---

The story in Markdown: paragraphs, `## Subheadings`, `> quotes`, lists, links and pictures.
```

Rules: write only what the listed sources say, in plain words for a reader who is not a lawyer (`docs/WRITING.md`). Keep it compact: about 350 to 500 words, a short
opening, three to five short sections and at most one small table. Side events belong in their
own `changes.yaml` entries, linked from the article, not narrated in it. A picture is optional and most articles should
have none: use one only when it shows the subject itself (the person, the place, the object), never
a parliament or court building as a stand-in. Prefer openly licensed or public-domain pictures. If no good, relevant open image is available,
a well-sourced picture may be used without a confirmed open licence. Record unconfirmed reuse
terms in the research notes, never invent a licence, and always
give the credit; link to country profiles as `/country/ru/` and to other entries as
`/history/<id>/`. The build fails if the file name matches no entry. Entries with an article get
an "Article" tag in the history lists.

## Data for research: the yearly panel and archived sources

Two things make the data usable beyond the site.

**The panel** (`/data/panel.csv` and `.json`) is generated at build time from `changes.yaml`: one
row per place and year since 1900, with the six segment scores and the index score in force on
31 December. Nothing is maintained by hand. The column `basis` marks each row as `recorded`,
`interpolated` (inside the window of an estimated first restriction) or `baseline` (before the
place's first recorded change). It gets better only by improving the history: replace estimates
with dated entries, and check that every `before` matches the entry that precedes it
(`node scripts/data-status.cjs chain`). The code is in `src/lib/exports.js`.

**Archived web sources.** `source-archive.json` maps a source address to its copy in the Internet
Archive. The site shows an "archived" link beside the source on history pages, and the history
download carries the copies in `source_archive_urls`. Books and other sources without URLs keep
their bibliographic citation in `source_citations` and are deliberately skipped by the archive
script. The file is written by a script, never by hand:

```
node scripts/archive-sources.cjs status      # how many sources have a recorded copy
node scripts/archive-sources.cjs prune       # forget addresses no source cites any more (no network)
node scripts/archive-sources.cjs check 200   # record the copies the Archive already holds
node scripts/archive-sources.cjs save 20     # ask the Archive to save what it does not hold
node scripts/archive-sources.cjs save 20 --random   # the same, picking the addresses at random
```

The number caps one run. `check` only reads; `save` asks the Internet Archive to fetch the page,
which it limits to a few requests a minute, so run it in small batches. Run `check` after adding
sources, and `save` for the ones that come back without a copy.

Some sites refuse scripts and archivers, or have lost the page. `probe` opens each source without a
copy as a browser would and marks those in `source-archive.json` with
`"dead": { "reason": "blocked" | "gone" | "unreachable", "status": 403, "seen": "YYYY-MM-DD" }`;
a failed `save` whose Archive error names such a reason marks it too. Marked addresses are
skipped by `check`, `save` and `probe` for 90 days, then tried again (`--include-dead` tries them
at once), and a copy clears the mark. The source stays in the data and on the site: `blocked`
pages usually still open in a browser. `gone` and `unreachable` ones are worth replacing with a
working address or an archived copy found by hand.

```
node scripts/archive-sources.cjs probe 200   # mark the sources whose site refuses or has lost them
```

## The survey (State of Cannabis)

`/survey/` shows the counted results of the yearly survey and `/survey/take/` is the form. Survey
is in the main menu, after History.

| File | What it is |
|---|---|
| `survey/2026.yaml` | The questionnaire of the edition: sections, questions, options, conditions, and the Nostr settings. The form and the results page are built from it. |
| `survey/results-2026.json` | The counted results the site shows and offers at `/data/survey.json`. Counts only. `"mock": true` means invented numbers, and the page says so. |
| `scripts/survey-lib.cjs` | Cleans answers against the questionnaire and counts them. A group is published only with 30 respondents, a country only with 5 observations. |
| `scripts/survey-mock.cjs` | Writes invented results, for designing the page before the survey opens. |
| `scripts/survey-collect.cjs` | Fetches the real answers, decrypts them and writes the counted results. |
| `src/lib/survey-client.js` | The browser side: the respondent's key, their stored submissions, signing and the relays. |
| `scripts/survey-keygen.cjs` | Prints a new key pair for the project. |
| `scripts/survey-cities.cjs` | Rebuilds the city suggestion lists in `public/survey-cities/`. |

**Three kinds of contribution.** The questionnaire file has three parts, stored and counted
separately: `sections` is the yearly personal survey (what a person does and believes), `territory`
is a report on one country they know (what they observed), and `prices` is one price observation.
A person sends one survey and any number of place and price reports. Country averages weigh a
place report by how long its author has spent there (a visit of days counts 1, residence of more
than five years counts 4). Country prices are the median of the price reports for flower,
converted to US dollars per gram with `survey/currencies.yaml`, after leaving out values far from
the rest.

**States and cities.** Where the chosen country is one the index scores state by state (United
States, Canada, Australia), the form requires the state or province: in "About you", in a place
report and in a price report. Place and price reports also take an optional city. The suggestions
come from `public/survey-cities/<ID>.json`, one file per country, built by
`node scripts/survey-cities.cjs` from the world-cities dataset (cities above 15,000 inhabitants,
GeoNames, CC BY 4.0); anything typed is accepted. Neither is shown on the results page yet. A city
makes a respondent easier to single out, and the form says so.

**How an answer travels.** The first time someone submits, their browser makes a Nostr key and
keeps it in its local storage. The survey, each place report and each price report become one
replaceable event each (NIP-78, kind 30078, one `d` tag per part), signed with that key, encrypted
between it and the project's key (NIP-44) and sent to the relays listed in the questionnaire file.
Submitting again replaces a part; deleting publishes an empty replacement and a NIP-09 deletion
request. `/survey/me/` shows a browser its own submissions and lets it change them, delete them,
back up the key or restore one. The key is a pseudonym: it ties one person's parts together but
not to the person. While `open` is false, or no public key and relays are set, nothing is sent
and submissions wait in the browser.

**To try it before opening.** Run a relay of your own, then in the browser's console set
`localStorage["cfi-survey-test"] = JSON.stringify({pubkey: "<hex>", relays: ["ws://localhost:7447"]})`.
That browser alone then submits to that relay.

**To open the survey.** Make a Nostr key pair for the project (`node scripts/survey-keygen.cjs`) and keep the secret key off this
repository and off any server. Put the public key (hex) and two or three relays under `nostr:` in
`survey/2026.yaml`, set `open: true`, and deploy. To publish results, run
`SURVEY_SECRET_KEY=<hex> node scripts/survey-collect.cjs` on your own machine and commit the
rewritten `survey/results-2026.json`. Add `--text` to read the free-text answers in the terminal;
they are stored nowhere.

**Keeping years comparable.** A new edition is a new `survey/<year>.yaml` and results file. Keep
question ids and option ids unchanged wherever the question is the same.

**Known limits.** Anyone can make as many keys as they like, so one person can still answer many
times; the collector counts one set of answers per key. Relays see the address a message comes
from. A relay may ignore deletion requests, which is why a deleted part is also overwritten with
an empty one. Someone who clears their browser without a backup of the key can no longer change
their answers.

## Research progress (/research/)

A hidden page, not linked, not in the search or the sitemap and not indexed. It shows for each
country how far the research has come: a percentage, the same split into profile and history,
the number of entries, scored entries and articles, the year of the first ban, the decades with
no entry and the longest gap between two entries. Clicking a row lists what is missing.

The checks and their points are in `src/lib/research.js`. For the profile: every score cited,
every score resting on more than Wikipedia or a weak site, the ten context sections, a measured
figure for use, a review in the last year, sources archived. For the history: a dated first
restriction, entries checked, a score timeline with no flag, no decade without an entry, an
entry in the last three years, fifteen entries or more, entries resting on more than Wikipedia,
an article for every score change.

The checks see only what is in the files, so they stop at 99%. A country reaches 100% only when
every check passes and its file carries `complete: YYYY-MM-DD`, set by hand by whoever went
through the country and found nothing left to add. An empty decade is a prompt to look, not
proof of a gap: some decades had no event.


## Book research intake: Jack Herer (12 October 2026)

The supplied *The Emperor Wears No Clothes* EPUB has been used for a targeted historical
research pass. See [the intake note](research/jack-herer-emperor.md) for edition limits,
chapter locators, verified additions, existing coverage and remaining leads. Three
context entries and accompanying articles were added (USDA Bulletin 404, the Siler
report, and *Vernonia*); the 1985 book entry and 1942 film sourcing were revised. No
adult scores changed. Treat Herer's industrial-causation and broad scientific claims
as attributed advocacy until their underlying evidence has been checked.


A second Herer pass added Schlichten's 1919 patent, the 1938 Popular Mechanics article,
the California panel's report for 1989 and the later *Earls* school-testing ruling.
Each has an article and primary-document or reproduced-original sourcing. The intake
note records reproduction limits and unresolved dates. All nine articles touched in
these passes carry `model: gpt-6.1-sol-medium`, as requested. Scores remain unchanged.


## Cannabis: Global Histories — second pass (12 October 2026)

A [second research pass](research/cannabis-global-histories-second-pass.md) inventoried
103 existing book-citing entries and revisited chapters 9, 11 and 15. It added seven
context events with articles, corrected the Lords medical-cannabis report to
11 November 1998 while retaining its existing page ID, and separated the 1997 clinical
trials conference. The note distinguishes book-only accounts from parliamentary
records and the CAMS abstract, and records remaining verification limits. Eight new
and two modified articles carry `model: gpt-6.1-sol-medium`. No adult scores changed.

## Driving research batch (12 October 2026)

Added India, Indonesia and Vietnam; expanded Germany, the UK and Czechia from official
traffic laws and guidance. See the [driving research note](research/driving-rules-2026-10-12.md)
for source limits and distinctions between specimen matrices, screening, statutory
fine ceilings, medical defences and regional rules. These context updates do not move
scores. The UK text now includes Scotland and distinguishes Northern Ireland.

A second driving pass added Nigeria and Malaysia and expanded the Philippines,
including differences between court penalties and scheduled payments, harm-dependent
penalties, professional licences and test refusal. The research note retains
Bangladesh and Sri Lanka findings pending verification of their evidential rules;
a consumption-based prohibition alone does not establish a detectable-THC offence.
Coverage is now 60 of 200 profiles. No scores or articles changed in this pass.

A third pass added Jamaica, Brunei, and Trinidad and Tobago, bringing driving coverage
to 63 of 200. It distinguishes Jamaica's smoking offence and ticket/court penalties,
Brunei's ban commencement after imprisonment, and Trinidad and Tobago's separate
alcohol-limit amendment. Ghana's new 2026 regime remains a primary-source follow-up.
See the same research note for citations and unresolved testing details.

A fourth driving pass added sixteen profiles, reaching 79 of 200 (39.5%). The shared
`consumption` status now represents Bangladesh, Sri Lanka and Ethiopia without
claiming a laboratory THC cutoff. Primary-text reviews preserve judicial exceptions,
regional scope and court-versus-ticket distinctions; unresolved penalties and source
access are recorded in the same research note. No articles were changed in this pass.

A fifth pass added Monaco, Paraguay, Liechtenstein, Costa Rica, Ecuador, Mexico and
Panama: 86 of 200 driving sections (43%). The research note records current versus
deferred amendments, the scope of Mexico’s federal-road rule, prescription
evidential exceptions and source-access limits. Scores and articles were unchanged.

A sixth pass added seven profiles, reaching 93 of 200 driving sections (46.5%).
It distinguishes presence-based saliva/blood/urine rules from impairment, preserves
mandatory versus discretionary licence bans, and records older consolidation
limits. Rwanda, Tonga and Guatemala require further offence verification; Sri
Lanka’s proposed testing regulations require adoption/commencement evidence.
No scores or articles were changed. See the same research note.

A seventh driving pass added Albania, Montenegro, Ukraine, Kosovo and Seychelles:
98 of 200 sections (49%). It checks Montenegro’s August 2026 amendment, separates
Ukraine’s different appellate evidence outcomes, and marks Seychelles’ older
official publication as a qualified baseline needing current amendment checks.
No articles were changed; see the research note for remaining gaps and sources.

An eighth driving pass added Greece, Andorra, North Macedonia and San Marino:
102 of 200 sections (51%). It distinguishes drug and alcohol penalties, verifies
commencement exceptions and deferred replacements, and separates approval of a
screening instrument from a presence-based offence. Current criminal-amendment
and penalty-consolidation gaps remain explicit. No articles were changed.

A ninth driving pass added five profiles, reaching 107 of 200 (53.5%). It reads
Saint Kitts and Nevis’s final 2025 penalty amendment, separates refusal evidence
from automatic impairment findings, and resolves Bhutan’s blank PDF commencement
field with the authority’s notice. Dominica/Grenada older penalty baselines and
Antigua’s commencement/device-approval gaps remain explicit. No articles changed.


A tenth driving pass added Tuvalu, Nauru and Palau: 110 of 200 sections (55%).
It uses Tuvalu's catalogue-confirmed current edition, Nauru's September 2026
Service 6 consolidation and Palau's October 2026 code. Palau's new drug field
sobriety/refusal provisions are distinguished from implementation of the required
rules. Nauru's alcohol-specific penalty cross-reference remains unresolved for
drugs. No articles were changed; see the research note for source limits.

## Recent law-news scan (12 October 2026)

A [17 October follow-up](research/law-news-2026-10-17.md) adds four official-source
context entries for Virginia's hemp cap and retail-rule draft, Jersey's planned
prescriber oversight, and Bermuda's medical/hemp timetable. Virginia's profile
now gives the scheduled retail start date and hemp restriction. Announcements
and drafts remain distinguished from operating rules; scores were preserved.
The build passed with 3,102 pages.

The Canada follow-up in the same note adds Nova Scotia's June fine increases,
the April veterans' reimbursement reduction, and the earlier commercial-edible
classification guidance raised by a cooking-policy lead. Canada and Nova Scotia
profiles were updated together. The guidance is dated to its verified September
2024 announcement, not presented as a new 2026 cooking ban. Scores were preserved.

Added five primary-sourced context events: Ireland's October medical-access
review timetable, Canada's October regulatory commencement and September
tracking consultation, NSW medical-driving assent, and Mauritius's reform report.
See [the news research note](research/law-news-2026-10-12.md) for dates, legal
stages and unresolved implementation. Updated AU/IE context and corrected Germany's
flower-reimbursement event/profile date to 29 July. Scores were preserved.
No articles were created or modified in this pass; Germany's existing article
already had the ministry's correct date.

A second law-news pass added four unscored events: Manitoba store-safety Bill 56,
Cayman's October reform timetable, Queensland driving-law assent with December
commencement, and DC's medical-licensing emergency Act with an October expiry.
Corrected AU driving commencement wording and added the Manitoba proposal to
its unit profile. The news note records jurisdiction scope, conditional versus
operating licences, fine-only sentencing exceptions, and remaining proclamation
checks. Scores were preserved; no articles were touched.

An eleventh driving pass added Namibia, Lesotho, Eswatini and Gambia: 114 of 200
sections (57%). The research note separates older statutory baselines from current
penalty certification, explains Lesotho's refusal evidence and the engine-running
versus stopped distinction, and records Gambia's main-text/schedule mismatch.
Relevant Gambia scans were visually inspected, catching an incorrectly indexed
fine row. Full current amendments and drug-testing practice remain explicit
follow-ups. No articles were changed.

A twelfth driving pass added Liberia, Sierra Leone and Oman: 117 of 200 sections
(58.5%). It reads complete relevant primary provisions and distinguishes lawful
use from a defence, habitual drug use from contemporaneous impairment, revocation
from automatic reinstatement, ordinary offences from harm tiers, and alcohol
specimen procedures from drug testing. Current old-text tariffs, toxicology and
later regulatory gaps remain explicit. No articles were changed.

A thirteenth driving pass added Bahrain and Kuwait: 119 of 200 sections (59.5%).
It checks Bahrain's final 2025 replacement against the old official English text,
separates administrative and judicial licence periods, and records Kuwait's 2025
court ranges with the provenance limit of the reproduced statutory compilation.
The old Kuwait police tariff is marked as superseded. Jordan's 2026 amendment
requires full-text retrieval before a driving addition. Scores were preserved;
no articles were touched.

## Treaty accession entries (13 October 2026)

Every country now has, where the United Nations Treaty Collection lists it, a context entry for
the day it joined the Single Convention of 1961 (or the convention as amended in 1972, for
countries that only ever joined the amended text) and one for the 1988 trafficking convention:
362 entries, category `international`, ids ending `-single-convention-<year>` and
`-1988-convention-<year>`. They are not scored. The dates come from the status tables at
`treaties.un.org` (chapter VI, treaties 15, 18 and 19), read in a browser; `a` is accession,
`d` succession, no letter ratification. Eleven countries already had a Single Convention entry
and were skipped. Where a country joined two conventions on the same day (34 cases, mostly
successor states and late joiners) the two are one entry, titled "… joins two UN drug
conventions on one day", so the timeline does not show what looks like a duplicate. Successor states carry the date they deposited their succession, not the
date their predecessor joined (Czechia 1993, Croatia 1993, Serbia 2001), and Russia, Belarus
and Ukraine carry the Soviet-era ratifications of 1964.

A further 54 entries, ids ending `-opium-convention-protocol-<year>` or
`-opium-convention-<year>`, record the International Opium Convention of 1925 (the first
treaty to control Indian hemp) for the countries that carried it over to the United Nations
through the 1946 Protocol or joined it as amended before 1961 (treaty 5 of the same chapter).
The League-era ratification dates of the 1920s and 1930s are not in that table and were not
added. The 1971 Convention on Psychotropic Substances (treaty 16, which schedules THC) was
left out on purpose, to keep the timelines from filling with treaty boilerplate.

The Protocol of 25 March 1972 amending the Single Convention (treaty 17) was added later the
same day: 86 entries, ids ending `-single-convention-protocol-<year>`. It matters to the index
because it lets parties offer treatment and rehabilitation as an alternative to punishing
users. The 39 countries whose Protocol date is the same day as a treaty entry they already had
(mostly those that acceded to the amended convention in one step) got no separate entry, by
the same rule as above. Like the other treaty entries these are unscored and can be removed
by their id pattern.

A 14 October research pass added driving context for Botswana, Tanzania (including
Zanzibar's separate published law) and Mauritius. The current repository count
rises from 122 to 125 of 200 profiles (62.5%). It also corrects Botswana's small
possession penalties using Act 26/2025, adds a dated history event and article,
and qualifies an inaccurate implication in the existing 2026 driving announcement.
See [the research note](research/research-coverage-2026-10-14.md) for statutory
sources, unresolved licence provisions, phased commencement and current-tariff
gaps. Scores were preserved.

A further 14 October pass added Morocco and Algeria: 127 of 200 driving sections
(63.5%). Morocco uses the official July 2024 consolidated code; Algeria uses the
replacement Law 26-09 published in May 2026, with a new unscored event and article.
Tunisia remains pending because the retrieved official 2012 text does not establish
a current cannabis-specific offence. See [the North Africa note](research/north-africa-driving-2026-10-14.md)
for source dates, testing gaps and Morocco's pre-existing historical-chain warning.

## Locally supplied books

Related books may be added to ignored `books/` for research. Keep the files and full
extractions local; cite relevant chapters publicly through the existing print-source
schema with authors, editor, edition and printed page locators. Track local filenames,
pagination, pages actually reviewed and future leads in [books.yaml](books.yaml).
See [BOOKS.md](BOOKS.md) for the workflow. An indexed book is not automatically read,
and a 1975 ethnography does not establish current law or medical efficacy.

A [colonial labour and medical-exceptions pass](research/pre-1900-indentured-regulations-2026-10-16.md)
on 16 October 2026 added Natal's unsuccessful 1884 prohibition proposal and
Trinidad's separate 1894 prohibition, with articles. It corrected Natal's 1870
and 1887 descriptions to distinguish executive powers and recommendations from
verified implementing rules, and qualified Trinidad's 1899 repeal. Five articles
were added. Original instruments and the historical score allocation remain
retrieval/reconstruction tasks; existing scores were preserved.

A [Ceylon medicinal-exception and consolidation pass](research/pre-1900-ceylon-medical-and-consolidation-2026-10-16.md)
on 16 October 2026 added the 1878 bhang licensing/medicinal provisions, verified
through a contemporary court report, and the original 1899 consolidation retaining
bhang and ganja prohibition. Both have articles. The court decision is dated 1891,
although its volume was published in 1892; its actual prosecution concerned opium.
Trinidad originals remain retrieval leads. Existing score allocations were preserved
and their historical limitations recorded.

A [New Zealand brewing-law pass](research/pre-1900-new-zealand-brewing-2026-10-16.md)
on 16 October 2026 added cannabis restrictions commencing on 1 January 1869
under the Distillation Act 1868, with an article. The original gazette reproduction
verifies brewing, trader-possession and supplier offences, their different purpose
exceptions and penalties. This is a trade-specific regime, not a general possession
ban. No scores changed; generic poison-law leads without verified cannabis coverage
were not added.

A [Western Australian poison-schedule pass](research/pre-1900-western-australia-poisons-2026-10-16.md)
on 16 October 2026 added the express 1899 Cannabis Indicus listing and an article,
using the original 1899 amendment and 1894 principal Act. It distinguishes licensed
sales controls and medicinal exceptions from a general ban, and labels the date as
assent. A Washington State lead was rejected after the original 1899 text failed
to name cannabis; a later codification was not backdated. No scores changed.

A [Spanish pharmacy and Austrian branded-cigarette pass](research/pre-1900-spain-austria-pharmacy-2026-10-16.md)
on 16 October 2026 replaced Spain's generic 1860 account with the original
hashish poison-catalogue and signed-order rules, removing unsupported enforcement
claims. It added Austria's 1882 import prohibition targeting Grimault's named
cigarette products. Both have articles based on original instruments, with
instrument/publication-date limits stated. No scores changed.

A [Russian import and German warning pass](research/pre-1900-russia-imports-german-warning-2026-10-16.md)
on 16 October 2026 added an 1878 contemporary report of Russia's cannabis-cigarette
import prohibition, corroborated by an 1886 Swiss trade-gazette list. It also added
Darmstadt's dated 1886 republication of a Karlsruhe warning about Grimault's
cigarettes. Both have articles. Report, notice and publication dates are distinguished
from unverified commencement dates; the German warning is not called a ban.
No scores changed.

A [Hessian pharmacy pass](research/pre-1900-hesse-pharmacy-2026-10-16.md)
on 16 October 2026 added the 1896 dispensing rules commencing on 1 October,
including an express external-use exception for Indian-hemp extract. It also
corrected the existing German 1890 ordinance entry to its 1 May commencement
and explained its wholesale/institutional exceptions. Both have articles.
Scheduled repeat-dispensing quantities are distinguished from possession limits;
no first-ever control or nationwide 1896 commencement is claimed. Scores were preserved.

A [Portuguese pharmacopoeia pass](research/pre-1900-portugal-pharmacopoeia-2026-10-16.md)
on 16 October 2026 added the 1876 royal approval of official cannabis identity,
extract and tincture standards, with an article. The original decree's six-month
transition from gazette publication is stated; the approval date is not treated
as immediate commencement. An Italian 1892 lead did not establish a medicinal
cannabis listing and was not added. No scores changed.

An [early-1900s proprietary-medicine pass](research/early-1900-proprietary-medicine-controls-2026-10-16.md)
on 16 October 2026 added Germany's 1907 Bromidia written-order and public-advertising
controls, using the original Federal Council text reproduced in a contemporary
journal. It corrected the U.S. 1906 Act entry to its 1 January 1907 commencement
and replaced Wikipedia sources with the original statute and FDA history.
Both have articles; named-product restrictions and disputed cannabis content are
distinguished from cannabis-wide prohibition. No scores changed.

An [Austrian hemp-cigarette trade and pharmacy pass](research/early-1900-austrian-hemp-cigarettes-2026-10-16.md)
on 16 October 2026 added the reported 12 April 1905 fiscal clarification separating
domestic manufacture/sale from controlled imports, and Trnkóczy's 22 March 1907
prescription pharmacy authorization. Both have articles based on contemporary
notices. The original wording corrects a sale/use translation ambiguity and a
printed-page citation. Reported order dates are distinguished from commencement;
neither entry implies cannabis-wide legalization. No scores changed.

The first [score-triage](../scripts/score-triage.cjs) batch on 20 October 2026 reviewed the six
profiles with no scored steps. New steps: Hong Kong's 1928 Indian-hemp ban (the first ban, from
the unregulated state), Macau's 2016 personal-use penalties (enforcement 3 → 2), Abkhazia's 2020
death penalty for large-scale dealing (enforcement 2 → 1, as for Oman and Vietnam), and the Isle
of Man's 2022 pharmacy pilot and 2024 opening to all pharmacies (access 0 → 1 → 2). Guernsey gained
two entries: the 2019 rescheduling, which no Bailiwick specialist used, and the 2020 import and
GP-prescribing changes (access 0 → 2). Eleven entries got `unscored` reasons, including every
French Polynesia medical or hemp step, since no medicine is available there yet. Current scores
did not change. The build passed (3,319 pages).

French Polynesia, left with no scored step by the first batch, got an estimated first restriction
(`pf-first-restriction-estimate`) so that it has a timeline; its first instrument was not found.

The second score-triage batch, on 20 October 2026, covered India, Türkiye, Saudi Arabia, Lebanon and
Lesotho. New steps: India's 2001 NDPS amendment (possession 0 → 1: before it, any amount of ganja
carried up to five years' rigorous imprisonment, per the original section 20 as quoted by the
Supreme Court); Türkiye's 2006 treatment-and-probation reform (enforcement 1 → 2); Saudi Arabia's
1987 death penalty for smuggling (enforcement 1 → 0, as for other death-penalty laws); Lebanon's
1946 cultivation ban (cultivation 2 → 1); Basutoland's 1945 order to destroy cannabis (cultivation
2 → 1) and 1951 penalties (enforcement 3 → 2). Forty-five entries got `unscored` reasons: India's
provincial excise measures and state bans (the federation rule), the Ottoman orders (Turkish
scholarship finds esrar was sold freely until 1933), Saudi executions under the existing law, and
commercial or export-only licensing in Lebanon and Lesotho. India's Act XII of 1896 stays open:
read the act to see whether it applied to all of British India before scoring it. Türkiye's 2014
rewrite of Penal Code Article 191 (two to five years, with compulsory deferral of prosecution) is
not yet in the history. Current scores did not change.

The third score-triage batch, on 20 October 2026, covered Bosnia and Herzegovina, Iran, Syria,
Taiwan and Albania. Yugoslavia's 1950 Narcotic Drugs Act, which banned growing Indian hemp outside
scientific institutions, is now scored for all seven successor states with the same step
(cultivation one point lower). Serbia's 1932 resin-growing ban stays context, since the general
ban came in 1950. Iran's 1988 law and Syria's 1993 law, both bringing the death penalty, take
enforcement one point lower, and Syria's also takes cultivation to 0 (death for growers). Taiwan's
2022 cultivation amendment stays context: one to seven years still matches Japan at 0. Albania's
and Syria's raids and campaigns, Bosnia's medical approval (no prescribing rules yet) and
Albania's export licensing got `unscored` reasons. Current scores did not change.

The fourth score-triage batch, on 20 October 2026, covered Brunei, Belarus, Algeria, Libya and
Mali. Belarus gained a 1974 entry for the Soviet decree that made possession a crime, scored as
for Russia and Armenia (19 → 8), and its 2014 Decree No. 6 now carries the drop to 0. Part of
that drop may belong to the 1999 Criminal Code, whose original Article 328 could not be read.
Death-penalty laws in Brunei (1992), Algeria (2025, aggravated cases including firearms and
transnational groups, under a moratorium since 1993) and Libya (1990) each take enforcement one
point lower. Mali's 1983 law (five to ten years' forced labour for use) takes possession and
enforcement one point lower; its 2001 law could not be read (UNODC returned 403). Ten entries
got `unscored` reasons. Current scores did not change. Ukraine, Kazakhstan, Uzbekistan,
Lithuania, Estonia, Moldova, Azerbaijan, Kyrgyzstan, Tajikistan, Turkmenistan and Georgia still
lack the 1974 Soviet possession step that Russia, Latvia, Armenia and Belarus have.

A [curious-cases pass](research/curious-cases-2026-10-20.md) on 20 October 2026 added Health
Canada's cannabis grown in the Flin Flon mine, R. v. J.P. (no valid possession offence in Ontario
from July 2001 to October 2003), Washington, DC's Initiative 71 and its gift economy, Arizona's
1996 "prescribe" initiative and Robert Mitchum's 1948 arrest. The first three have articles, and
four are new curious-case cards. No scores changed. The build passed (3,326 pages).


A [Kazakhstan possession-history pass](research/history-kazakhstan-gap-2026-10-25.md)
on 25 October 2026 adds the missing 2015 return to criminal liability for personal
holdings and public use, with an article, and rewrites the 2011 reform and its
article from statutory texts. The 2011 law concerned the legally defined large
band and retained administrative detention. The Soviet cultivation entry now
uses the decree’s express 1935 commencement and a reproduced original source.
Kazakhstan’s historical possession/consumption snapshots are rebased; its current
scores are unchanged. Earlier Soviet possession controls remain to be reconstructed.

A [Kazakhstan Soviet-to-national-code pass](research/history-kazakhstan-soviet-2026-10-25.md)
on 25 October 2026 adds five missing stages: the 1987 repeat-use crime, the
1991 repeal and closure of Interior Ministry treatment-and-labour institutions,
the 1998 code's narrower personal-possession offence and lower ordinary growing
penalties, the 2006 public-use fine and the 2011 addition of detention. Two new
articles explain the 1991 and 1998 changes. Historical snapshots now separate
those stages; today's score stays 13.5. The profile also corrects the formal
conviction-status consequence of a lesser criminal offence using article 79.
The original 1975 amendment and pre-1987 possession regime remain open research.

A [Uzbekistan code and public-use pass](research/history-uzbekistan-gap-2026-10-25.md)
on 25 October 2026 adds the 1995 national-code split between administrative small
holdings and criminal possession, the 2017 Supreme Court guidance on gifts and
supply intent, and the public-use offence commencing in June 2026. Two new articles
explain the 1995 and 2026 changes. The November 2025 decree is corrected from an
enacted penalty change to proposals, and the Soviet cultivation ban to its 1935
start. The current profile now includes administrative detention and lesser
ordinary growing penalties (exact score 10.5), and corrects the classification
of theft-of-drugs convictions. Early Uzbek SSR implementation and the original
quantity tables remain open; the research note records the historical score limits.

A [Cuban possession-history pass](research/history-cuba-gap-2026-10-25.md) on
25 October 2026 adds the 1958 rebel-territory cannabis rule, the 1979 code's
three-year personal-possession ceiling, its reduction to two years in April
1988 and the express cannabis fine option published in June 1994. Two new
articles explain the 1988 and 1994 changes; the 1999 article now connects those
stages with inline citations. Current scores are unchanged. A subsequently retrieved scholarly
chapter adds a fifth entry and third new article on the 1919 licensed-drug controls.
The aggregate estimate now spans 1919–1950; the original law and full cultivation/
medical-access sequence remain open. The book catalogue records the selected pages read.

A [Venezuela treatment and sentencing pass](research/history-venezuela-gap-2026-10-25.md)
on 25 October 2026 adds the 1964 cannabis penalties, the 2005 possession-sentence
cut and the 2014/2017 suspended-sentence rulings. Three new articles explain the
1984 treatment route, the 2010 penalty increases and the 2017 court decision;
the 1993 article now dates the original personal-use route to 1984. Historical
snapshots move that change to July 1984. The current profile distinguishes
individual personal use from the separate twenty-gram criminal-possession band;
verified growing and supply penalties correct its exact score from 13.5 to 10.
The original pre-1964 cannabis scope remains open, and the research note records
the limits of the aggregate estimate and enforcement snapshot.

A [Yemen and Aden history pass](research/history-yemen-gap-2026-10-25.md) on
25 October 2026 adds Aden’s 1942 cannabis trade ban, its 1947 preparation-list
extension, reported fines in 1952, the replacement ordinance published in 1961,
and Sana’a’s 2025 amendment proposals. Two articles explain the Aden framework
and Yemen’s 1993 penalties and treatment routes. The 1993 law now uses its Arabic
issuance clause to date commencement to 30 March. The profile gains verified
cannabis schedules, non-germinating-seed exceptions and collateral consequences;
its score remains 2. Aden’s territorial limits and the open northern/South Yemeni
sequence are recorded in the research note. The English translation’s treatment
and commencement errors were resolved against Arabic page images.

An [Oman statutory-chronology pass](research/history-oman-gap-2026-10-25.md) on
25 October 2026 adds the 1974 personal-holdings and unpaid-supply penalties and
the 2013 named synthetic-cannabinoid controls. Two new articles explain the 1974
and 1999 rules; the 2015 and 2026 articles are rewritten from the statutes. The
unsupported 50 kg capital threshold is removed, treatment is traced to 1999,
and the historical enforcement deduction moves from 2015 to March 1999. The
2026 entry now identifies higher fines and supply sentences. Current scores stay
at 2, with primary-law treatment, testing and deportation details in the profile.
Earlier cannabis coverage and the aggregate first-restriction estimate remain open.

A [Jersey gap pass](research/history-jersey-gap-2026-10-26.md) on 26 October
2026 fills the longest modern gap in the history (1954 to 2018). Six entries
from the enacted Jersey laws add the 1965 cultivation ban, the 1966 possession
and supply order, the 1971 cannabinol listing, the 1978 law as it took full
effect in 1980, and the 1998 and 2015 Parish Hall caution guidance. The 1954
entry is re-dated to its 1 January 1955 commencement and rewritten: it licensed
imports and exports only, and possession waited until 1966. The score chain is
rebuilt in stages (100→97→70→12→14→16→19) instead of one drop at 1954, the
2019 medical order now carries its access step, and the unchecked 2024
Centenier entry was verified against the law. Two articles cover the 1955
border rule and the 1966 possession ban. Today's scores are unchanged.

A [Puerto Rico gap pass](research/history-puerto-rico-gap-2026-10-26.md) on 26
October 2026 reconstructs the scored chain the 1959 and 1971 entries had left
open (100→11→6→11→14) and fills the 1971–2015 gap. The 1959 felony and the 1971
Controlled Substances Act were rescored from the original statutes; Law 109 of
1980 (fixed-term rewrite of the same durations) and the April and September
2013 legalisation and medical bills were added from the session laws and
Associated Press reports. The 1959 and 1971 articles already existed and were
left untouched. Today's scores are unchanged.

### Mixed legal products and maximum penalties

Use `recreational: death` wherever an in-force law permits death for a cannabis offence,
including a qualifying repeat offence, even if another preparation has a lawful route.
This status takes precedence on the law map and in the homepage count. Explain the
lawful preparation separately in the summary, segments and quick answers. India’s bhang
shops coexist with NDPS section 31A; neither fact cancels the other. Do not infer a death
penalty from a context heading alone: it may discuss an abolished or excluded penalty.

For medical access, date a score increase to an operating route for obtaining the relevant
cannabis product, rather than enactment, production licences or a patient-registry proposal.
CBD-only sales do not establish access to psychoactive cannabis. A framework still being
implemented can retain `medical: limited` with access zero. Greece’s finished prescription
products reached patients in February 2024; Panama’s 2021 framework and 2026 CBD listings
alone do not establish a working THC medicine route.

### Custodial penalties and missing sentencing statistics

Enforcement 2 (“Prison possible, fines typical”) needs evidence of fine-led enforcement;
statutory prison plus a possible additional fine does not establish that practice. The
custodial band at 1 includes prescribed prison penalties as well as documented custody.
Its label and generic quick answer do not imply a measured cannabis-only imprisonment
frequency. Check the statute's sentencing and substitution provisions before using this
basis, explain it in the country's enforcement text and research note, and tie a change
to the relevant law in the historical chain. All-drug arrests, prosecutions and treatment
figures can describe the surrounding enforcement campaign; never turn them into a
cannabis-only conviction rate. Keep treatment powers, traditional-use exceptions and
fine alternatives explicit where the law actually provides them.

Planting status/trade `conditional` covers lawful holding, growing or supply for specified
purposes under legal conditions, including notification regimes without a licence. It
means neither unrestricted adult use nor licensed sellers only. Keep the permitted plant
category, recipient restrictions and import/export licensing in the narrative; New Zealand's
2026 hemp rules are the first example.

An [Iraqi early-controls pass](research/history-iraq-early-2026-10-26.md) on
26 October 2026 adds the postal guide's 1930 record of cannabis import permits,
the 1949 disposal rules for court-confiscated drugs and the 1955 replacement
fine/prison penalty. Two new articles explain the 1949 and 1955 changes; the
1938 article now connects to the penalty amendment, and the 1965 article's
references to its treaty rationale are corrected. The 1930 date belongs to the
guide, not the underlying rule's commencement. Current scores and the inherited
historical snapshots are unchanged: the original 1938 penalty and commencement
clauses remain necessary for the open reconstruction of the 1933–2017 interval.

A [Pakistan sentencing-gap pass](research/history-pakistan-penalties-2026-10-26.md)
on 26 October 2026 adds the 1995 ordinance, a reported hashish flogging, the 1996
abolition of non-hadd whipping and the 2022 federal cannabis penalty tables.
It rewrites the 1979 and 1997 articles against historical texts and adds an article
on the whipping repeal. The 1997 date distinguishes assent from publication;
the 2023 record now explains that federal cannabis death sentences had already
left the tables in 2022. All inherited score snapshots and the current profile
remain unchanged. The 1995 commencement notification and the joint provincial
capital-penalty chronology remain necessary for the open enforcement reconstruction.

A [Philippines sentencing-history pass](research/history-philippines-sentencing-2026-10-26.md)
on 26 October 2026 adds the 1987 constitutional suspension of death sentences,
the 1994 Simon quantity ruling and David Cruz's 2000 release after serving more
than the reduced maximum. Four articles connect these events to the 2002 law.
The 1993 record now includes its lower small-quantity bands; the 2002 and 2006
records use commencement dates, and the 2006 parole-clause attribution is corrected.
Existing scores are preserved because long sentences and, during the intervening
period, capital exposure keep the relevant segments at their floors. The earlier
compassionate-access commencement and pre-1982 score assumptions remain separate
research questions.

A [Kenya colonial-controls pass](research/history-kenya-controls-2026-10-26.md)
on 26 October 2026 adds regional sentencing correspondence from 1956, the
1961 cannabis prosecution figures and the specialist police unit formed in 1983.
New articles explain the 1933 ordinance and its 1994 replacement. The legal
entries now distinguish medicinal preparations, court-specific penalties and
commencement dates; the 1994 use ceiling is corrected from eight to ten years.
An undated amendment slip in the 1932 annual volume is kept separate from the
original law. Existing score snapshots and the current profile are preserved
pending reconstruction of the earlier aggregate 1914 step.

A [Vietnam criminal-code pass](research/history-vietnam-codes-2026-10-26.md)
on 26 October 2026 adds the 1986 organising-use provision and the replacement
code operating from July 2000. Two new articles and a rewritten 1989 article
connect the statutes. The 1997 event now uses its confirmed 22 May commencement
and explains that its use offence required prior education and compulsory
treatment. Current capital cannabis sale penalties require enforcement 0 under
the existing rubric; the profile and three later historical before-vectors are
corrected together, taking the displayed current score from 5 to 3. Other score
dimensions and the unresolved pre-1968 reconstruction remain unchanged.
