# Context sections: fix and extend

Status: **proposal**, 27 October 2026. Nothing here is built yet. It comes out of issue #224.

Everything stays in the country profile, `countries/<cc>.yaml`, under `context`. Every section
keeps today's shape (`text` and `sources`, with an optional `status` where noted). Nothing here
is scored.

## What is wrong now

The *More context* tab shows up to eleven sections in one flat list: death penalty, commercial
production, products, seeds and clones, medical use, clubs, black market, driving, visitors,
arrests, other consequences.

- **It opens with *Commercial production*,** a question for the industry. A reader first wants
  to know how people actually get and use cannabis.
- **`production` mixes three things:** supply for adults (U.S. and Canadian licences), growing
  for medicine (Germany) and hemp (Russia's 0.1% THC varieties). At least 41 texts are mainly
  about hemp.
- **`products` is the weakest section.** In 28 countries it only says that nothing was found.
  Elsewhere its content splits the same three ways: adults, patients, CBD.
- **There is no overview of recreational use.** Nothing says in one paragraph how adults get
  cannabis here and how open it is.
- **`medical` is narrow,** while the rest of the patient story sits in `production` and
  `products`.
- ***Other consequences* says nothing about what it holds.**

## The new list

One flat list, as today, with no group headings. Only the order changes: from how people get
and use cannabis, through the plant and the market, to the police, and then what is special
about the country.

| # | Key | Label | Holds |
|---|---|---|---|
| 1 | `death_penalty` | Death penalty | Unchanged, only where the law provides for it |
| 2 | `recreational` (new) | Recreational use | How adults actually get cannabis, how open use is, which products are legal |
| 3 | `medical` | Medical cannabis | The whole patient story: who qualifies, who prescribes, which forms, cost, where it is made, patient growing |
| 4 | `clubs` | Cannabis clubs | Unchanged |
| 5 | `planting` | Seeds and clones | Unchanged |
| 6 | `hemp` (new) | Hemp and CBD | THC limit, who may grow hemp, CBD shops, HHC and other loophole products |
| 7 | `production` | Cannabis industry | The commercial sector: who may grow, make and sell for profit, licences and their cost, how big the sector is, exports and foreign investment |
| 8 | `black_market` | Black market | Unchanged |
| 9 | `visitors` | Visitors and foreigners | Unchanged |
| 10 | `driving` | Driving | Unchanged |
| 11 | `arrests` | Arrests and prisoners | Unchanged |
| 12 | `consequences` | Beyond the penalty | Renamed: records, drug registers, lost licences, tests at work, deportation |
| 13 | `genetics` (new, optional) | Genetics and heritage | Local plants and who keeps them |
| 14 | `research` (new, optional) | Research | Whether scientists can study cannabis, and what research from here gave the world |
| 15 | `local` (new, optional) | Local differences | Places where the rules, or life under them, differ from the national picture |

`products` is removed once its content has moved into `recreational`, `medical` and `hemp`.
`production` keeps its key and becomes the industry section.

## The new sections

### `recreational`: Recreational use

Required for every country, including those where cannabis is banned: three to six sentences.
For example: "There is no legal way to get it. Most people buy hashish from dealers and smoke in
private." The chip shows the profile's existing `recreational` status, so nothing new is scored.
It is written from the user's side; the businesses behind the supply go in *Cannabis industry*.

### `medical`: Medical cannabis

The same key, now covering the whole patient story. The chip shows the existing `medical`
status.

### `hemp`: Hemp and CBD

Required for every country, since every country has an answer. It holds the THC limit, who may
grow hemp, whether CBD is sold openly, and how loophole products such as HHC and delta-8 are
treated. Fibre and food hemp traditions link to Culture.

### `production`: Cannabis industry

The existing key, relabelled from *Commercial production* and widened to the whole commercial
sector: who may grow, process and sell for profit (adult-use, medical and hemp businesses),
whether licences are open, capped or held by the state, what they cost, how big the sector is
(licence holders, turnover, jobs, tax), exports and foreign investment. Uruguay's state tenders,
Canada's uncapped federal licences, Germany's ban on commercial adult-use growing, Lesotho's
export-only licences and China's hemp and CBD processing all belong here.

Where there is no legal commercial sector, one sentence says so; the illegal trade stays in
*Black market*. Figures follow the usual rule: no number without its definition, year and
source (licences issued are not companies operating). The key stays `production`, so no data
has to move; renaming it to `industry` can wait for the clean-up.

### `genetics`: Genetics and heritage

Optional. Write it only where a real account exists, such as Beldia in the Rif, dagga in
Mpondoland, Himalayan charas plants or U.S. feral hemp. Say what the plants are, who keeps them,
and what bans, eradication or imported hybrids did to them.

- Seed-shop strain names are not evidence ("Malawi Gold" does not prove a living landrace).
- No exact grow locations and no farmers' names.
- "Not documented" never means "does not exist", so leave the section out rather than writing
  "none".

### `research`: Research

Optional. Write it where there is something to say. It covers two things. First, whether a
university can get a licence and plants to study (blocked in many countries, a single farm in
the U.S. for decades). Second, what research from here gave the world: Mechoulam and THC in
Israel, Hanuš in Czechoslovakia, the Swiss pilot trials, O'Shaughnessy in Calcutta. Discoveries
link to their History entries and researchers to Culture/People.

### `local`: Local differences

Optional, and the only new section that is a list, because a country can have several such
places:

```yaml
local:
  - place: Christiania, Copenhagen
    text: >-
      …
    sources: [...]
  - place: …
```

Use it for places that are not a legal unit of their own (federal states already have
`subunits`), or where practice differs from the law. Examples: Pusher Street, Barcelona's clubs,
the Rif, the Bekaa, Malana, Dutch border towns, Swiss pilot cities, U.S. tribal lands. Each
entry says how the place differs from the national rule, and never presents one city as the
country.

## How sections stay distinct

- A section never repeats a scored segment; it explains what the score leaves out.
- A custom or a word belongs in Culture, and a dated event in `changes.yaml`. The section links
  to them.
- If research shows a scored fact is wrong, fix the score the usual way
  (`docs/DATA-MAINTENANCE.md`).

## Steps

1. **Code only, no data change:** put the sections in the new order, and
   rename *Medical use* → *Medical cannabis*, *Other consequences* → *Beyond the penalty* and
   *Commercial production* → *Cannabis industry*.
   The API lists `context` in this order, and each entry carries its `key`.
2. **Schema:** add `recreational`, `hemp`, `genetics`, `research` and `local` as optional, and
   keep `products` valid while countries move over.
3. **Data, in batches by region:** move `products` into `recreational`, `medical` and `hemp`,
   and widen `production` into the industry section, keeping every source and citation. Write `genetics`, `research` and
   `local` where there is something real to say.
4. **Clean-up:** once no country uses `products`, remove it and make
   `recreational` and `hemp` required.
