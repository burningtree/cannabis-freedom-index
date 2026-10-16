# Pre-1900 regulations: Sweden, India and Egypt

16 October 2026 continuation. **Three new records and articles; four corrected
existing records; two rewritten articles and one amended article.** Existing IDs
and score values were preserved. Egypt's scored 1879 event gained month precision.
No current country profiles changed.

## Sweden, royal ordinance of 7 January 1876

Read the historical chapter of the official inquiry
[*Bättre kontroll av missbruksmedel*, SOU 2008:120](https://data.riksdagen.se/dokument/GWB3120),
pp. 157–159, especially p. 158 and note 9. It explicitly identifies liability for
unauthorized sale/delivery of Indian hemp under the 1876 poison ordinance.

The footnote leads to Olle Hoflund, *Narkotikabrotten: En straffrättslig studie*,
**third edition**, Juristförlaget, **1993**, ISBN **91-7598-593-4**, p. 13. Downloaded
the [full book PDF](https://juridikbok.se/books/pdf?url=5006ee26-1f46-4c56-bd66-826b03f1f402.pdf)
and inspected its title, imprint and the relevant passage. Printed p. 13 (PDF p. 17)
was also rendered and visually checked. The first attempt was incomplete; the
successful complete copy is `tmp/pre1900-20261016/hoflund-full.pdf`.

Hoflund gives the ordinance date as **7 January 1876**. This is the document date,
not a separately verified commencement date. The original ordinance, full schedule,
penalty and authorized-supplier exceptions were not inspected. The official inquiry
repeats Hoflund; these are traceable but not independent accounts.

Applied to `sweden-indian-hemp-sales-control-1876` and its article. No general
cultivation, possession or consumption ban was inferred from the supply restriction.
The web-sourced PDF is kept in ignored `tmp/`, not represented as a newly supplied
book in the local `books/` catalogue.

## Government of India: inquiry versus the 1873 resolution

Read the full relevant historical passage in the primary government
[*Report of the Indian Hemp Drugs Commission*, volume I (1894), chapter XIV](https://abuse-drug.com/lib/Indian-Hemp-Commission-Report/chapter-xiv.html),
**paragraph 556**. The public HTML is a transcription, with visible OCR errors;
the originals reproduced in that report were not separately retrieved.

It explicitly identifies **Finance Department Resolution No. 3773, 17 December
1873** and reproduces the policy of restricting cultivation, preparation and
retail and levying duties without encouraging illicit trade. This is not a new
uniform excise tariff or a single all-India ban. Claims about insanity are
attributed to historical officials rather than presented as medical conclusions.

Added `india-hemp-restriction-resolution-1873` and its article. Corrected the
existing `india-cannabis-insanity-inquiry-1872` title/description and article to
separate the **1871–1872 inquiry period** from the **1873 formal response**.
The existing 1872 date and stable ID remain as an inquiry-period reference.
Previously cited secondary sources remain attached to the inquiry; no new
cover-to-cover reading of those local books is claimed by this pass.

## Bengal, 29 May 1798: recommendation rather than parliamentary tax act

The same paragraph reproduces **Board letter No. 22, 29 May 1798**, recommending
against altogether prohibiting the intoxicants examined and favouring suitable
taxation to restrain use and improve revenue. It does not establish a British
parliamentary enactment or immediate commencement of a specified tariff.

Corrected `india-bhang-tax-1798`: precise letter date, category `debate`, attributed
Board recommendation, and primary-report citation. Rewrote the article to remove
the unsupported parliamentary tax claim and the assertion that the British never
banned cannabis anywhere in India. The ID remains to preserve existing links.
The original Board letter and any associated tax enactment remain research targets.

## Egypt, March 1884: confiscation, export and enforcement finance

Read **paragraph 559** of the same primary report. It describes March 1884 permission
for Egyptian Customs to sell confiscated hashish **for delivery abroad**, instead
of destroying it, and distribute proceeds among informers and seizure officers.
Its quoted explanation from customs director Caillard concerns the absence of a
reward fund and the profits available to smugglers.

Added `egypt-seized-hashish-export-sales-1884` and its article. This is disposal of
seized goods subject to export, not general legalization of domestic retail.
The original Egyptian instrument remains uninspected, and the administrative
explanation is not treated as an independent measurement of corruption or efficacy.

The report already places **both importation and cultivation prohibition in March
1879**. Corrected `egypt-import-ban-1879` to `1879-03`, with its original ID and
scores retained, and rewrote its article around that evidence. This does not
reconstruct all earlier Egyptian restrictions or certify the existing score baseline.

The older `egypt-cultivation-ban-1884` was supported only by a modern summary.
Its description now exposes the chronological problem and distinguishes the
1884 disposal rule. Removed `checked: true`; the original legal basis for a
separate 1884 cultivation measure has not been established. The unscored record
and ID remain rather than quietly erasing the uncertainty or inventing a decree.

## Leads that did not become additions

- New Zealand's 1871 Sale of Poisons Act was located, but the substantive schedule
  was not successfully retrieved. A general poison statute alone does not prove
  cannabis was covered; no cannabis offence was added from it.
- An original research paper on Swedish cannabis foods was identified, but the
  institutional PDF returned 403. It is not a newly read substantive citation.
- General Australian poison-law dates were not promoted to cannabis restrictions
  without a verified cannabis listing.
- India already had 1793 and 1798 context entries, and Egypt already had a 1874
  import-tax entry. Existing coverage was checked before adding apparent discoveries.
- The 1873 resolution's Burma discussion refers to the administrative year
  1873–1874. Existing Burma dates need their original instruments; this pass did
  not invent another Burmese ban to resolve that calendar difference.

## Validation

- `npm run build` passed: **3,051 pages** in the shared checkout.
- Sweden and Egypt score-chain checks have no flagged steps. India's existing
  baseline warning (1985 chain begins at 40) remains. No score values were changed.
- Source files and complete extracts remain in ignored `tmp/pre1900-20261016/`;
  no full book or source text was placed in public assets.

- Generated history JSON matches all seven affected records; their page titles and
  article history links resolve. Both staged and unstaged whitespace checks passed.
- Archive lookups covered 3 public source URLs and found 2 existing copies,
  which were merged into the latest shared source archive. No lookup errors occurred.
- No commit or deployment was made.
