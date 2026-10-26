# Research pass: Afghanistan 1973 article, entry corrected to two-regime framing

Research checked on 26 October 2026. The 1973 tightening entry now rests on
two declassified US embassy cables and two FRUS documents actually read,
plus the AAN retrospective, and correctly attributes the year's prohibition
moves to both regimes split by the 17 July coup; a new properly sourced
article tells the story. No scores, profiles or timelines changed.

## What was verified (all sources actually read)

### 1973 cables (PlusD, declassified systematic review 30 June 2005)

- 1973KABUL01672 (12 March 1973, periodic report no. 2): 15 press-reported
  drug arrests, nearly all hashish (plus morphine, 6 kg opium, liquid
  hashish, morphine HCl, and an Indian national caught with 100,000 morphine
  tablets); 9 court decisions, all hashish — one Afghan fined 30,000
  afghanis with four months jail, foreigners (3 Americans, 2 Austrians,
  2 French, 2 Italians, 1 Canadian, 1 English) fined 2,000–55,000 afghanis
  with no prison beyond time served. Diplomatic focus on the UN/FAO report
  due end of March and a revised three-year anti-narcotics programme.
- 1973KABUL06500 (5 September 1973): after the 17 July coup made Mohammad
  Daoud president and prime minister, Daoud's 23 August independence-day
  speech called for "UPROOTING OF HASHISH AND OPIUM" and a smuggling
  campaign; deputy foreign minister Wahid Abdullah repeated the commitment
  on 28 August; the embassy re-evaluated and redirected its whole narcotics
  action programme; enforcement led by the Interior Ministry (being purged
  and reorganised), Justice Ministry role undefined.
- FRUS d350 (13 October 1971, paras 5–6): hippie overstayers; Shafiq —
  hashish and opium cultivation prohibited under Islamic law but not always
  enforced; foreign tourist demand; remote mountains; full cooperation
  pledge. (Already cited on the entry; re-read.)
- FRUS d355 (12 February 1972, telegram 884): embassy's deliberate campaign
  to bring the narcotics problem home to Afghan officials through foreign
  press coverage; Afghans unusually sensitive to foreign press; hippie
  influx; alarming US/UK headlines listed. (New source.)

### AAN retrospective (re-read for the exact 1973 claims)

- Bjelica & Foschini (2019): "In 1973, Afghanistan's King Zahir Shah
  outlawed cannabis production, following it up with a genuine commitment
  to eradication — backed by 47 million USD in funding from the United
  States government"; hippie-era commercial export boom to Europe and North
  America with Pakistan and Lebanon; Lonely Planet 1973 Islam Qala anecdote;
  the king's valet 40 kg hashish-oil smuggling cable. The $47M figure is
  the history's, reported as such.

### Entry and article

- Entry `afghanistan-ban-1973` rewritten: Zahir Shah outlawing +
  eradication funding, then Daoud's post-coup renewal (23 August speech,
  28 August statement, Interior Ministry lead), then the 1971 admission and
  spring 1973 verdicts as pressure context. Date stays 1973 (the original
  order's date unrecovered); category and scores untouched.
- New `articles/afghanistan-ban-1973.md` (403 words, 4 sections, all 5
  sources cited; links to the 1972 crackdown and press-campaign entries,
  the 1997 and 2023 Taliban bans, and /country/af/). The 1972 arrest
  totals (72→221→584) from the Bradford chapter were not restated — that
  chapter was not read; the entry link carries them.

Claim boundaries: the "outlawed production" act is dated only to 1973
(pre-coup by deduction, stated plainly as "that year"); the $47M is
attributed to the retrospective account; the king's valet episode is the
AAN's telling, cited as such; no possession/use coverage inferred from the
uprooting call.

## Dead ends recorded, not forced

- The text/date of Zahir Shah's 1973 production ban: not in the March cable
  (enforcement snapshot only) and not recovered elsewhere; AAN's locator
  already noted this. Gallica remains 403 for the Madagascar JO check
  (different lane, no edits made there).
- WikiLeaks PlusD search works via the in-app fetch; cable pages fetch
  cleanly with curl.

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/afghanistan-ban-1973/` citation marks checked.
- Commit limited to own work: the 1973 hunk in changes.yaml, the new
  article, this note. `source-archive.json` (concurrent writer) excluded.
