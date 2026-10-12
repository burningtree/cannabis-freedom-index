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
   unregulated state (98) down through the bans and back up through the reforms, ending exactly
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
  influence or impaired driving), `limit` (a set THC level in blood or saliva is an offence by itself),
  `consumption` (a prohibition after drug consumption without a verified laboratory THC cutoff)
  or `zero` (any detectable THC). Do not infer a detectable-THC offence merely from a prohibition
  after consumption. Give the limit and its unit, the penalty and licence consequences,
  and any separate rule for medical patients, novice or professional drivers.
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
    seeds_trade: open       # may they be sold or handed on: open | regulated | gift | unclear | banned
    clones: illegal         # same four values as seeds
    clones_trade: banned    # same five values as seeds_trade
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
  (`regulated`), anyone (`open`). Where seeds are simply outside the definition of cannabis and no
  other rule restricts them, the trade is `open`. Use `unclear` when the law allows having them but
  is silent on selling, and say so in the text.
- Keep it consistent with the profile's cultivation segment: if a few plants are tolerated, clones
  are `grey`, not `legal`.
- Leave the section out when no source was read. Do not guess from neighbouring countries.

A law that changes seed or clone rules goes into `changes.yaml` as a context entry (category
`other`, or `easing` / `tightening` when it clearly is one), with no `before`.

`node scripts/data-status.cjs planting` shows which profiles have the section and lists the rest by
score, highest first. State and province files do not carry it yet. The statuses and their labels
are defined once in `PLANTING_STATUS` in `src/lib/segment-ids.js`; the country page, the compare
table, the per-country JSON and `scores.csv` (columns `seeds`, `seeds_trade`, `clones`, `clones_trade`)
all read from there, together with `PLANTING_TRADE`.

## How a history entry works

```yaml
- id: tunisia-law-52-amended-2017     # also the page address; never reuse or rename lightly
  date: "2017-04-25"                  # YYYY-MM-DD, YYYY-MM or YYYY, as precise as the source
  category: easing                    # ban tightening death easing legalisation medical debate international other
  country: tn                         # omit for international entries
  title: Tunisia gives judges discretion in drug cases
  description: >-
    One to three sentences. Only what the source states.
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
  (`"FREE"`: 10,10,10,10,10,8 = 98). A lower starting point is fine only when an earlier
  licensed or taxed regime is documented (India, Morocco, Nepal, Tunisia, South Africa, …).
- **Direction matches the event.** A ban, tightening or death-penalty law must not raise the
  score; an easing, legalisation or medical law must not lower it. The script flags mismatches.
- **Size matches the event.** A first total ban is a large drop. A new sentencing rule, a medical
  programme or a court ruling is usually one point in one or two segments. Do not let a minor
  event carry a big jump, and do not leave a big real change (decriminalisation, legalisation)
  as a context entry.
- **Every real change moves it; nothing else does.** If the law or the practice changed, the
  entry is scored. Debates, failed bills, reports and announcements are context entries.
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
   - Wikipedia "Cannabis in <country>", "Drug policy of <country>", "Legal history of cannabis in
     <country>" (also the local-language edition). Ask for *every dated legal event the page
     states*, and for exact quotes when checking one claim.
   - The statute itself on a national law site (legislation.gov.*, *lii.org, PacLII, kenyalaw,
     lawphil, BOE, sejm, slov-lex, legifrance …) or UNODC SHERLOC.
   - Library of Congress Global Legal Monitor, Transnational Institute country guides, IDPC,
     Human Rights Watch, Amnesty, Harm Reduction International, EMCDDA/EUDA country reports.
   - National or regional news for recent events.
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
6. **Build, restart the preview, spot-check** one country page (its chart and History) and `/history/`.

## Rules learned the hard way

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
  left (147 files on 12 October 2026).
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
- **Wikipedia is fine for dates and events, weak for first bans.** Colonial first restrictions
  usually need a statute database, a UN document or an academic paper.
- **A statute's date is not always the first ban.** A country's "first narcotics law" may come
  long after cannabis was already restricted (Oman 1999, Zimbabwe 1956, Iran 1959). Then add it
  as a context entry and leave the estimate in place.
- **Federations:** state-level changes (US, Australia, Canada, India) are context entries on the
  national timeline unless the national picture really shifts.
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
   Liberia 2014/2023, El Salvador 2003, Kazakhstan 2011, Eswatini 1922, Botswana 1922,
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

After each pass, say: how many entries were added or corrected, which profiles and scores
changed and why, which score timelines were re-based, which claims rest on sources that were read versus only summarised, and what
could not be confirmed. Nothing is committed or deployed unless the user asks.

## Long reads for history entries

An important history entry can have a full article. The entry in `changes.yaml` stays as it is
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

Rules: write only what the listed sources say. Keep it compact: about 350 to 500 words, a short
opening, three to five short sections and at most one small table. Side events belong in their
own `changes.yaml` entries, linked from the article, not narrated in it. A picture is optional and most articles should
have none: use one only when it shows the subject itself (the person, the place, the object), never
a parliament or court building as a stand-in. Use pictures whose licence allows it and always
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
node scripts/archive-sources.cjs check 200   # record the copies the Archive already holds
node scripts/archive-sources.cjs save 20     # ask the Archive to save what it does not hold
```

The number caps one run. `check` only reads; `save` asks the Internet Archive to fetch the page,
which it limits to a few requests a minute, so run it in small batches. Run `check` after adding
sources, and `save` for the ones that come back without a copy.

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
