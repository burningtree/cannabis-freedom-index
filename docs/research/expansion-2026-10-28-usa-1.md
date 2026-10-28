# Expansion batch 2026-10-28 — USA states 1 (ca, tx, fl, ny, pa)

Five largest states, one at a time: penalty tables from each state's law, context sections
where the state differs from the national profile, history/culture links. State segments cite
numbered file sources inline; the schema forbids `sources:` on state segments, so
`country-gaps.cjs` "texts with no source at all" on segments is a script blind spot, not a gap.

## ca (California) — committed
File: `countries/us/ca.yaml` (the documented model state file).
- recreational: added history links (2016 wave incl. California, 1972 vote, Prop 19 2010).
- New `medical`: Prop 215 (1996) / HSC §11362.5, doctor's recommendation.
- New `culture`: 420 born in San Rafael 1971 (Waldos) + SF medical movement (Brownie Mary / Peron).
- New numbered sources: 420 wiki, Brownie Mary wiki, HSC §11362.5 (leginfo URL pattern as §11362.1).
- Audit: 0 errors, 0 warnings. Review page `.cache/page-review/country/us/ca/` verified (420, Brownie Mary, Prop 215/19, 1972 all render).
- Left: clubs/driving/visitors/arrests sections (no sourced claims found yet); atlas unlinked list is national-level, not CA-actionable.

## tx (Texas) — committed
- Penalty tables (possession 5-step ladder verified against NORML: ≤2oz Class B 180d/$2k up to
  >50lb felony; cultivation charged by weight), city non-enforcement (Austin Prop A 2022, Dallas
  Prop R 2024 via Marijuana Moment), medical (TCUP + HB 46 2025 via MM signing article), culture
  (Lee Otis Johnson via Texas Monthly, Willie Nelson via NORML).
- Corrected own overstatement: top possession term is 99 years, not life. MPP PDF bot-blocked —
  used MM signing article instead.
- Audit 0/0; review page verified (all new content renders, all history/culture links resolve).
- History gap noted, not filled: no TCUP-2015 or HB46-2025 entries in changes.yaml (shared file,
  left for a history pass).

## fl (Florida) — committed
- Penalty tables (possession 3 steps: ≤20g misd 1yr/$1k, 20g–25lb felony 5yr/$5k, 25lb+ trafficking
  min 3yr; cultivation by plant count, verified against NORML), citations on all segments, new
  `medical` (Amendment 2 2016 + statute 381.986), access cites (Amendment 3 2024 via Ballotpedia,
  2026 initiative via existing source).
- Incidental: test #158 accessor updated (`fl.segments.possession.text ?? ...`) — table form made
  possession an object; regex assertions unchanged (file already uses `.text` for ph/vn/ws).
  Claims suite 87/0. Committed in same change since the test covers it.
- Ballotpedia amendment URLs bot-blocked (empty bodies) — accepted on slug convention matching the
  already-vetted 2026 sibling URL in this file.
- No FL history entries exist (no Amendment 2 / Amendment 3 entries) and no grounded FL culture
  subject found — both noted, not filled.
- Audit 0/0; review page verified.

## ny (New York) — committed
- Penalty tables (possession 5 steps, cultivation 2 steps, verified against NORML + Penal Law
  §§222.05/222.15/222.25/222.30 via newyork.public.law), cites on all segments, new `recreational`
  (MRTA 31 Mar 2021 via OCM page + NORML) and `culture` (Harlem tea pads, La Guardia 1944 via LoC +
  wiki, Mezzrow link), access date (first shops Dec 2022 via Reuters).
- Test suite caught a real error: statute §222.25 sets the violation fine at $125, not NORML's
  $150 — reverted to $125 in text + table. Test accessors updated (`.text ??`) for the new table
  forms; all regex assertions unchanged.
- Left: medical section (2014 Compassionate Care Act specifics unverified), MRTA-2021 history
  entry missing (noted, not filled — changes.yaml shared).

## pa (Pennsylvania) — committed
- Penalty tables (possession 2 steps: ≤30g misd 30d/$500 with conditional release, >30g misd
  1yr/$5k; cultivation as felony manufacture 5yr/$15k incl. four-plant Van Aulen rule, verified
  against NORML + statute PDF + case law), cites on all segments, city fines (Philly $25 2014,
  Pittsburgh up to $100 2015 via law-firm roundup corroborated by Ballotpedia/High Times
  snippets), new `medical` (Act signed 17 Apr 2016, DOH cards + permits, via verified DOH report PDF).
- No PA history entries and no grounded PA culture subject — noted, not filled.
- Audit 0/0; review page verified.
