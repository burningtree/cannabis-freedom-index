# Hessian dispensing rules and the German 1890 commencement

Research date: **16 October 2026**. Added one event and two articles:

- `germany-hesse-cannabis-prescription-rules-1896` — new, unscored regional event.
- `germany-medicines-ordinance-1890` — corrected commencement date and expanded
  scope; existing ID and unscored status preserved.

## Original Hessian government gazette

Downloaded the [1896 Großherzoglich Hessisches Regierungsblatt](https://starweb.hessen.de/cache/hessen/regierungsblatt/hessisches_regierungsblatt_1896.pdf)
from the Hessian parliamentary archive. The volume is an image-only PDF: its
near-empty text extraction was not treated as absence of cannabis provisions.
Rendered and visually read **pp. 67–75**, which also happen to be PDF pages
**67–75** in this volume. Pagination is not uniformly offset across the entire
volume; opening scans and unrelated blank/bleed-through pages were not confused
with the relevant law.

The notification is in **No. 19, published 15 June 1896**. Its own date is
**5 June 1896**. It implements provisions following a **Federal Council resolution
of 13 May 1896**, replaces the provisions of **15 August 1891**, and expressly
commences on **1 October 1896**. The database uses that commencement.

A later Hessian 1920 notice surfaced in search with a **5 July 1896** reference.
The original 1896 heading and signature both say **June**. The later reference
was not used to overwrite the original date.

### Cannabis-specific provisions actually read

- **Section 1, p. 68:** listed drugs/preparations and preparations containing them
  may be supplied to the public as remedies only on a written, dated and signed
  prescription, subject to the stated framework. Veterinarians' instructions
  are confined to animal treatment.
- **Section 2:** exceptions for preparations permitted outside pharmacies under
  the referenced imperial regulations. This is not a universal ban on pharmacy
  hand sales of every preparation.
- **Section 3:** the scheduled quantities are relevant to specified repeat supply
  of internal medicines without a fresh instruction, subject to the further
  restrictions in sections 4–5. These are not general possession thresholds or
  an exemption for a first sale below the listed amount.
- **Section 5:** a prescriber's prohibition of repetition remains controlling.
- **Sections 6–8:** veterinary repetition, specified local exceptions and continued
  operation of poison-trade rules.
- **Schedule, p. 70:** Cannabinon and Cannabinum tannicum, each **0.1 g**.
- **Schedule, p. 71:** Extractum Cannabis Indicae, **0.1 g**, expressly excepted
  for external use.
- **Schedule, p. 74:** Tinctura Cannabis Indicae, **2.0 g**, with no corresponding
  external-use exception beneath that entry. Nearby exceptions were not assigned
  to the wrong row.
- **Sections 9–11, p. 69:** medicine-container/label provisions and definitions of
  internal-use medicines. The separate stock-container classifications reference
  the pharmacopoeia; no unverified cannabis storage classification was inferred.

The 1891 predecessor was not retrieved in this pass. Consequently the record
says the 1896 rules **include** the external-use exception, not that they first
introduced it. The state implementation is not automatically a nationwide
commencement, general cannabis ban or first-ever Hessian control.

## German imperial medicines ordinance, 1890

Read [the Wikisource transcription of the original ordinance](https://de.wikisource.org/wiki/Verordnung,_betreffend_den_Verkehr_mit_Arzneimitteln._Vom_27._Januar_1890),
*Reichsgesetzblatt* 1890, No. 5, No. 1834, **pp. 9–17**. Read sections **1–4**,
Schedule A and the relevant Schedule B entries.

- **27 January 1890:** instrument date.
- **1 May 1890:** express commencement under section 4; this replaces the
  signature date formerly used in the database date field.
- Schedule B lists **Herba Cannabis indicae**, **Cannabinon** and **Cannabinum
  tannicum**. Schedule A separately regulates medicinal preparations, including
  extracts and tinctures, with specified exceptions.
- Section 3 exempts wholesale trade and specified supplies to pharmacies and
  state research/teaching institutions that are not also treatment establishments.
- The text establishes pharmacy-only sale channels, not a universal prescription
  rule or general cannabis-possession prohibition.

The primary-law transcription was read; its linked Commons scan catalogue was
located but the full set of 1890 page images was not independently inspected.
That retrieval limit is not concealed by describing the transcription as a new
scan review.

## Leads and preservation

The initial lead came from Uwe Spiekermann's discussion of a reported **1896**
change affecting cannabis-containing corn remedies and its citation to
*Süddeutsche Apotheker-Zeitung*, volume 36, p. 430. A digitized-journal catalogue
was located through the International Society for the History of Pharmacy, but
its linked repository presented an access challenge. The journal page was not
read, so no separate nationwide corn-remedy liberalization was added.

The Hessian original supplies a narrower, directly verified result. The article
does not infer a special warning-label condition or permission to sell outside
pharmacies merely from the extract's external-use exception.

No country profiles or existing score vectors changed. The new event has no
`before` vector. The existing German score chain's structural consistency does
not reconstruct scores for the earlier pharmacy regimes. No supplied local book
was newly read. Temporary material remains in ignored
`tmp/pre-1900-german-pharmacy/`.

## Validation

- `npm run build` passed: **3,070 pages**.
- Database: **2,405 entries**, including **2,346 checked**, 11 unchecked and 48
  estimated first bans.
- Unique IDs, article front matter and both generated pages/export records
  validated against database titles and dates.
- Germany has **zero structurally flagged score steps**. Existing score vectors
  also match the staged baseline; the historical allocation limitations remain.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned snapshots for both core source URLs. Archive
  results were merged without replacing known non-null archives with null.
