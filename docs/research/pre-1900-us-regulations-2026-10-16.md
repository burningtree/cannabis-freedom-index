# Pre-1900 United States: sales controls and a medicinal trademark

16 October 2026. Two new history records and two articles. No existing events,
country profiles, scores or score baselines changed.

## Wisconsin, 1862

Read the historical discussion on p. 39 of the National Academies’
[*Cannabis Policy Impacts Public Health and Health Equity* (2024)](https://www.nationalacademies.org/read/27766/chapter/3).
It identifies Wisconsin in 1862 as an early dangerous-drug sales control including
cannabis, citing Adam R. Rathge’s 2017 Boston College dissertation.

Added `us-wisconsin-poison-sales-1862`, checked against that narrow secondary
statement. The article explicitly explains the verification level. No precise
commencement day, chapter, penalty, prescription requirement or exception is claimed.
The original enactment and Rathge dissertation were not successfully retrieved.
Do not treat the review and its citation as independent confirmations.

A Google Books search located a poison-sales provision at printed p. 59 of the
1862 general-laws volume (ID `Ab84AAAAIAAJ`), but page images were unavailable.
This is a retrieval lead, not a substantively reviewed statutory citation. Internet
Archive item `wisconsinsessio08statgoog` is the **private and local laws** volume;
its 1862 metadata does not make it the required general-law volume.

## Bromidia, 2 April 1891

Read the complete opinion in *Battle & Co. v. Finlay*, **45 F. 796–798**:
[original Federal Reporter scan](https://law.resource.org/pub/us/case/reporter/F/0045/0045.f1.0796.pdf).
Rendered and visually checked printed p. 796, including its date, court designation
and cannabis-containing formula. Also read the [OpenJurist transcription](https://openjurist.org/45/f1d/796).
The vLex preview ends before the holding and was insufficient on its own.

Added `us-bromidia-trademark-injunction-1891` and article. The court is the
**United States Circuit Court**, despite a modern host's District Court metadata.
The injunction is **preliminary** and concerns an infringing trademark, not a
prohibition of cannabis medicine or an adjudication of its efficacy. A later
1892 final-decree citation was located but its full text was not retrieved; no
separate 1892 event or unsupported account of the final judgment was added.

## Federal compilation: useful, but easy to misdate

Downloaded and inspected Lyman F. Kebler, with Earl T. Ragan,
[*Drug Legislation in the United States*, USDA Bureau of Chemistry Bulletin 98](https://upload.wikimedia.org/wikipedia/commons/6/6a/Drug_legislation_in_the_United_States_%28IA_druglegislationi98kebl%29.pdf).
The title/imprint give **1906**, not the 1905 date sometimes attached to the bound
bulletin series. Read its introductory warning (printed p. 4) that historical
references only approximate when provisions assumed substantially their present
form and do not supply a full amendment history.

A text search found explicit cannabis/Indian-hemp references in federal 1906,
District of Columbia 1906, Montana 1901 and North Carolina 1905 material. Those
are outside this batch's date limit. The Wisconsin 1898 extract (printed p. 204)
does not explicitly list cannabis. Generic poison provisions and the earliest
reference dates were not promoted into additional pre-1900 cannabis laws.

Full downloads and extracts remain in ignored `tmp/pre1900-us/`. They were
retrieved from the web, not supplied as new local library books.

## Validation

- `npm run build` passed: **3,053 pages**.
- Both generated history pages and JSON export entries were inspected for IDs, titles and dates.
- United States score-chain check: **zero flagged steps**.
- `git diff --check` and `git diff --cached --check` passed.
- Availability lookups found no Wayback copy for either newly cited URL; both
  attempts are recorded in `source-archive.json`. Existing archive entries were preserved.
