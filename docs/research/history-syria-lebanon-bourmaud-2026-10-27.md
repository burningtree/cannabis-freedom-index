# Syria/Lebanon mandate era: Bourmaud chapter read, two gaps filled

Research checked on 27 October 2026. Read `DATA-MAINTENANCE.md` (insert-by-hand
next to same-date entries; per-sentence citations; score moves when a first ban
moves earlier; prefer non-Wiki sources), the touched entries with the Lebanon
and Syria timelines, the Bourmaud chapter (downloaded full UN volume PDF and
read pp. 75-87), the Wazan/IDPC piece (read the server-rendered body), and the
Wikipedia Syria extract that pointed at both. No scores, profiles or other
timelines changed.

## What changed

- New `lebanon-hashish-trade-ban-1922` (ban, 1922-01, scored, before all 10s):
  trade and possession of hashish prohibited in Lebanon by January 1922, months
  after Palestine (July 1921); cultivation not covered. Single read source:
  Bourmaud's peer-reviewed chapter in the UN Historical Series volume. This
  moves Lebanon's first ban from 1926 back to 1922.
- `lebanon-hashish-ban-1926`: `before` re-based to the 1922 aftermath
  `{possession: 1, cultivation: 10, enforcement: 2, sharing: 1, consumption: 1,
  access: 0}`, scored per `segments.yaml` (possession criminalised; growing
  still unlimited; weak mandate enforcement; trade banned so no lawful source).
  The 1926 production ban now drops cultivation 10 to the 1946 level.
- New `syria-cannabis-penal-regime-1934` (tightening, 1934-10, unscored): harsher
  penal regime in force; five-ton crop found the same day at al-Jumaqliyyah
  near Hama on a Barazi-clan farm; Hama petitions to Geneva; PMC information
  request of June 1935; minimal fines for the clan head and a brother. Distinct
  from the uniform-regulations `lebanon-narcotics-decree-1934` (legislation),
  this is the Syrian enforcement episode. Unscored because the instrument's
  penalty scale was not read (chapter cites Sûreté/archival reports).
- `syria-league-supervision-1925`: converted to per-sentence citations, added
  Bourmaud as second source, dropped Wikipedia (both remaining sources cover
  every sentence: 1922 article 12, 1925 convention to outright prohibition via
  mandate obligations, OAC/PMC scrutiny, theatrical enforcement).

## Sources actually read

- Philippe Bourmaud, "Turf Wars at the League of Nations", in *The League of
  Nations' Work on Social Issues* (UN, 2016), full-volume PDF via UN Geneva
  library: 1925 convention invited control but produced outright prohibition in
  Syria/Lebanon; France ratified it in their name (Ponsot to Briand, 25 Oct
  1929); High Commission did not rush (clients, peasant livelihoods); Russell
  singled out Syria/Lebanon at the OAC from January 1930; Egypt pressed Geneva;
  Hama October 1934 affair with all details used above; conclusion on
  post-independence divergence (Syria eradications in the 1950s, Lebanon blind
  eye).
- Michelle Wazan, "The colonial legacy of drug control in Lebanon" (IDPC /
  Talking Drugs, 13 June 2024): 1922 decision article 12; 1920s imperatives;
  50 percent cannabis economy after the silk decline; theatrical implementation
  for landowner reasons; WWII British Mission pressure on a reluctant
  Gendarmerie.
- Wikipedia "Cannabis in Syria" wikitext: used only as a lead to the two items
  above; no longer cited by the 1925 entry.

## Deliberately not changed

- `syria-cultivation-ban-1943` stays Wiki-only: Bourmaud ends in 1939 and the
  Philipp & Schäbler p. 383 claim (Quwatli ban, Druze/Jabal al-Druze) could not
  be read (Google Books page render blocked). Still open.
- No new 1925-ratification entry: the ratification fact now lives in the 1925
  entry's second source rather than standing alone.
- MAE Nantes Syrie-Liban 731 (Hama petitions) and 1408 (Ponsot/Sûreté) are
  recorded as archive leads for a future instrument hunt, not as sources.

## Validation and tree note

- Chains `lb` and `sy`, `history:test`, `answers:test`, production build and
  the rendered Lebanon/Syria history pages to be run before commit.
- Commit stages only the four `changes.yaml` hunks plus this note, via patch
  filtering without stashing (the previous stash-drop deleted foreign Bermuda
  hunks; they were restored and must be preserved again). Foreign work in the
  shared tree stays untouched.
