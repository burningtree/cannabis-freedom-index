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

## Where things are

| Path | What |
|---|---|
| `countries/<id>.yaml`, `countries/{us,ca,au}/index.yaml` | One profile per country: status, six scores, a text and sources per segment, context, sources |
| `changes.yaml` | The history, newest first. The header comment documents every field |
| `prices.yaml` | Flower-price observations, kept separately for street and medical markets |
| `segments.yaml` | The six segments, their weights and what each score level means |
| `src/content.config.ts` | The schema. The build fails with a clear message when data breaks it |
| `scripts/history-batch.cjs` | Applies a batch of history edits from a JSON file (see below) |
| `scripts/data-status.cjs` | Counts; lists of what is unchecked, estimated, thin or weakly sourced; and a check of every country's score timeline |

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

- **`before`** is the six scores *before* the event. The scores after it are the `before` of the
  same country's next scored entry, or the country's current scores. So the chain must be
  consistent: the newest scored entry's "after" is the profile's current scores.
- Leave `before` out for a **context entry**: a debate, a failed bill, a law that changed
  nothing a user would feel. Most entries are context entries.
- If the law or the reality changed, the entry **should move the score**, by an honest small
  amount (usually one point in one or two segments).
- **`estimate: true`** (with an optional `window: [from, to]`) marks a first restriction whose
  date is unknown. Replace these with a dated law whenever one is found.
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

1. **Profiles resting on unreliable sites — the most important item.**
   `node scripts/data-status.cjs weak` lists 61 profiles where at least one scored segment
   cites only `cannabisregulations.ai` or `tripbase.com`. Worst: Azerbaijan, Cameroon, Cabo
   Verde, Chad (all six segments); Angola, Burkina Faso, Central African Republic, Congo,
   Eritrea, Micronesia, Comoros, Libya, Montenegro, Mongolia, Niger, Sudan, Yemen. For several
   the real statute is already cited in the history (Cameroon Law 97/019, Burkina Faso Law
   017-99/AN, Niger Ordinance 99-42, Angola Law 3/99, Libya Law 7/1990, Yemen Law 3/1993) and
   can be reused. Re-source, and correct scores if the statute says something different.
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
