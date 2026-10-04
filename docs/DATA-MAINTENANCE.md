# Maintaining the data: country profiles and history

How to check, correct and extend the two data sets behind the site. Written as a handover: it
records how the work has been done so far, what was learned, and what is still open.

## The task in one paragraph

The site scores cannabis freedom per country (`countries/*.yaml`) and keeps a history of every
law, ruling and treaty that shaped it (`changes.yaml`). The job is to make both **complete and
trustworthy**: every country should have its whole cannabis history, from the first restriction
to today, each entry backed by a source that was actually read; and every country profile should
say what the law is *now*. When research turns up something that changes a country's current
situation, the profile and its scores are updated too, not only the history.

## Where things are

| Path | What |
|---|---|
| `countries/<id>.yaml`, `countries/{us,ca,au}/index.yaml` | One profile per country: status, six scores, a text and sources per segment, context, sources |
| `changes.yaml` | The history, newest first. The header comment documents every field |
| `segments.yaml` | The six segments, their weights and what each score level means |
| `src/content.config.ts` | The schema. The build fails with a clear message when data breaks it |
| `scripts/history-batch.cjs` | Applies a batch of history edits from a JSON file (see below) |
| `scripts/data-status.cjs` | Counts, and lists of what is unchecked, estimated, thin or weakly sourced |

Run everything from the project root. `npm run build` validates all data; run it after every
batch. The dev server (`npm run dev`) does **not** pick up edits to `changes.yaml` or the schema
until it is restarted.

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
5. **Build, restart the preview, spot-check** one country page and `/history/`.

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

## Reporting back

After each pass, say: how many entries were added or corrected, which profiles and scores
changed and why, which claims rest on sources that were read versus only summarised, and what
could not be confirmed. Nothing is committed or deployed unless the user asks.
