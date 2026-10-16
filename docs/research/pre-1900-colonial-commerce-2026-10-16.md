# Colonial commerce: cannabis licensing and prohibition in Ceylon

16 October 2026. Started from customs tariffs and municipal licensing notices,
rather than lists of first bans. **Two new records, two corrected records and three
new articles.** No country profile or score values changed.

## Primary sources actually read

- [Ceylon Government Gazette, No. 5,242, 15 September 1893](https://noolaham.net/project/1028/102779/102779.pdf),
  printed p. **2066**, PDF p. **44**. Read the entire Colombo notice and visually
  inspected the scan. Notice dated **6 September**, auction planned **14 October**,
  four licences for the year beginning **1 January 1894**. The date of the underlying
  municipal resolution is not given. Conditions include inspection, no disorder,
  sales hours 6 a.m.–9 p.m., identifying signage, approved registration of agents
  and servants, and wholesale licences only for retail dealers. No completed
  auction, successful bidder, price or actual sales volume is established.
- [Gazette No. 5,254, 17 November 1893](https://noolaham.net/project/999/99804/99804.pdf),
  printed pp. **2807–2808**, PDF pp. **5–6**, Ordinance **No. 2 of 1893**, all six
  sections and assent. Visually checked p. 2808. Also read implementing proclamations
  at pp. **2855–2856**, PDF pp. **53–54**. The ordinance passed **1 November**, received
  assent **7 November**, and those proclamations explicitly confirm commencement
  **7 November**. Named towns were brought under it from **17 November**. Sections
  3–4 replace an older licensing route and cap annual retail licences at five per
  municipal council and three per local board. The framework did not automatically
  apply to every town on assent. No independent reconstruction of the full 1889
  ordinance is claimed.
- [Gazette No. 5,514, Part II, 26 November 1897](https://noolaham.net/project/1200/119926/119926.pdf),
  printed pp. **482–484**, PDF pp. **4–6**, Ordinance **No. 9 of 1897**, all sections
  and repeal schedule. This PDF has no usable text layer; rendered and read all
  three pages visually. It passed **12 November** and received assent **15 November**.
  The entry uses the assent date, explicitly distinguished from unverified separate
  commencement. Section 2 defines bhang and ganja; section 6 amends the customs
  prohibited-import schedule; section 7 penalizes possession and sale; section 8
  authorizes search, seizure and custody. Section 10 permits an informer award up
  to half of the fine actually recovered. Section 11 and schedule remove bhang
  references from specified earlier licensing provisions. The child-sales rule
  in section 9 concerns **opium** and was not misreported as a cannabis age limit.

## Database decisions

Added `sri-lanka-colombo-bhang-licences-1893` (notice date) and
`sri-lanka-municipal-bhang-licensing-1893` (framework commencement), both checked
against these primary documents, unscored and with articles.

Corrected `sri-lanka-import-ban-1897`, preserving its ID. It now records import,
possession and sale prohibition, the penalties and enforcement powers, primary
citation and assent date **1897-11-15**. Added its article. This is a material
expansion of a previously import-only account.

Corrected the misleading chronology of `sri-lanka-indian-hemp-ordinance-1905`.
It can no longer claim the general move from licensing to prohibition began only
then. Removed its checked flag: the original 1905 text, reported 1907 penalties
and historical basis of medical exceptions were not independently verified in
this pass. Those details were removed from the description rather than repeated
as facts. Its existing date, ID and score values were preserved.

**Score-history limit:** the existing 1867–1905 score interpolation has not been
reconstructed. The newly verified 1897 possession/sale offences mean that its
implied timing needs review; a zero-warning structural chain check does not
validate that historical allocation. This pass does not invent numerical scores
for the intervening rules.

## Other leads and exclusions

- A Canadian contemporary tariff publication reports Straits Settlements Ordinance
  XI of 4 September 1894, with an excise heading covering bhang. The original PDF
  download returned HTML, so no new entry was made from the search extract.
- A Straits Settlements blue book describes bhang licences under earlier excise
  ordinances. Its download failed. This warrants checking the existing broad
  1870-ban descriptions, but no correction was made from an unread snippet.
- A later international report cites an 1891 North Borneo licensing ordinance.
  The original text and territorial operation remain research targets.
- The 1892 draft of the municipal Ceylon ordinance was distinguished from the
  enacted 1893 text. Draft publication was not treated as commencement.

Downloads, text extractions and rendered pages remain in ignored
`tmp/pre1900-trade/`. No source scans were added to public assets or represented
as newly supplied local books.

## Validation

- `npm run build` passed: **3,055 pages**.
- All three article pages and corresponding JSON export records were inspected
  for IDs, titles and dates.
- Sri Lanka’s structural score-chain check reports zero flagged steps; this does
  not resolve the historical timing limitation noted above.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned copies for both 1893 gazettes and none for the
  1897 gazette. Results were merged into the existing archive map.
