# Ceylon: medicinal bhang and the 1899 consolidation

Research date: **16 October 2026**. Two entries and two articles added; existing
scores and country profiles preserved.

## Verified additions

- `sri-lanka-bhang-medical-exception-1878`: the licensing restriction and medicinal
  exception described in the contemporary report of *Jansz v. Usubu Lebbe*.
  The entry uses **1878**, the ordinance's year, and expressly says the original
  enactment and commencement proclamations were not inspected.
- `sri-lanka-opium-consolidation-1899`: **20 October 1899**, assent to Ordinance
  No. 5, retaining cannabis possession and sale offences within a consolidated
  opium statute. This is continuity of prohibition, not Ceylon's first ban.

## Sources actually examined

### Contemporary court report

*The Ceylon Law Reports*, volume I (Colombo: Ceylon Examiner Press, **1892**),
edited by **Thomas E. De Sampayo and James van Langenberg**, **p. 90**,
PDF page **114**, *Jansz v. Usubu Lebbe*, P.C. Galle No. 1,330.
[Digitized report](https://archive.org/details/cu31924084191372/page/n113/mode/2up).
Downloaded the Internet Archive PDF and OCR; rendered the page and compared
names, sections and dates with the image. Read the complete case, including its
headnote and Burnside C.J.'s judgment.

**Decision: 17 June 1891**, following the hearing on 11 June. The 1892 date is
the volume's publication year, not the ruling date. The appeal concerned
**legium, an opium preparation**, not a proven cannabis preparation. The case is
used because its headnote reproduces a shared statutory provision expressly
covering **opium or bhang**:

- section 4: preparations containing the named substances;
- section 10: unlicensed possession or sale described as penal;
- section 13: genuine medicinal possession and retail sale by medical
  practitioners or druggists.

The police magistrate interpreted the exception as requiring a qualified
practitioner. Burnside instead applied the ordinary meaning of an undefined
term; testimony that the defendant practised medicine and that the preparation
was medicinal sufficed for acquittal. This has not been entered as a separate
“cannabis acquittal”: its actual subject and its relevance to bhang remain distinct.

The initial Tamil Digital Library link returned 404. The scan at Internet Archive
was successfully retrieved; an independently located Noolaham copy was also
downloaded, but the article cites the examined Archive scan. No source relies
on a search snippet or an AI-generated case summary.

### Original ordinance, 1899

*The Opium Ordinance, 1899*, **No. 5 of 1899**, *Ceylon Government Gazette*,
**No. 5,654, Part II, 27 October 1899, pp. 468–472**, PDF pages **4–8**.
[National Library scan](https://diglib.natlib.lk/bitstream/handle/123456789/5017/5654-ii.pdf?isAllowed=y&sequence=1).
Read all sections and schedules in extracted text. Visually checked pp. 468,
470 and 472 for the short title/repeal, offence wording and penalties, and assent.

- Passed **18 October**, assented **20 October**, published **27 October 1899**.
  A separate commencement notice was not established.
- Section 2/Schedule I repeal Nos. **4/1878, 9/1889, 2/1893 and 9/1897**, saving
  earlier operation, liabilities, penalties and proceedings.
- Section 16 retains offences concerning possession, sale, offering for sale or
  permitting sale of bhang, ganja and substances containing them. First conviction:
  up to **50 rupees**, **three months** simple or rigorous imprisonment, or both;
  subsequent conviction: **100 rupees**, **six months**, or both.
- Section 17: police and designated local inspectors, entry on reasonable
  suspicion, seizure, custody of suspected persons, and court-ordered destruction
  of cannabis substances.
- Section 18: informer award up to half the fine actually recovered.
- Sections 19–20: medicinal/hospital exceptions expressly for **opium**. Do not
  silently extend those exceptions to bhang/ganja, or assume the consolidation
  itself introduced every change since 1878.
- Section 21: prosecutions must be instituted within **three months**.

Re-rendered and read **p. 483 of the 1897 ordinance**, especially section 4. Its
extension of the 1878 ordinance to previously uncovered places is why the new
1878 entry avoids claiming immediate island-wide applicability. This does not
establish the full territory or every condition of the original 1878 measure.

No new cultivation offence or change to the separate customs schedule is inferred
from the 1899 text. The 1904 *Ukku Banda* judgment is a useful follow-up on the
meaning of growing plants versus prepared drugs, but falls outside this pass's
pre-1900 events and was not added.

## Trinidad retrieval log

The pass began by pursuing the unresolved Trinidad laws. The **1902 Laws of
Trinidad and Tobago, volume I**, digitized as `lawstrinidadand00tobagoog`, was
retrieved and searched; it did not supply the needed ganja provisions. It is not
cited as substantive evidence for Trinidad cannabis law.

The University of Illinois catalogue for **Utathya Chattopadhyaya, _Naogaon and
the world: Intoxication, commoditisation, and imperialism in South Asia and the
Indian Ocean, 1840–1940_ (PhD, 2018)** loaded in the ordinary browser. Its
file endpoints returned 403 to document retrieval, and the browser PDF failed
to open. Search extracts suggest continuing cultivation prohibition alongside
smoking access in 1899, but the full relevant pages were not obtained. Those
extracts remain retrieval leads; **no Trinidad record was strengthened from
snippets**. The source-reported precise dates also remain unverified.

## Validation and historical score limits

Both new records have `checked: true` for the narrowly described sources actually
read, with original-instrument limitations explicit. Neither has an invented
`before` vector. Sri Lanka's structural chain has **zero flagged steps**, but it
still places its principal ban-related score change at 1905; the verified 1897
and 1899 prohibitions require a separate historical score reconstruction.
A chain check does not resolve that substantive allocation.

Downloads and renders remain in ignored `tmp/pre-1900-trinidad-primary/`.

Validation completed:

- `npm run build` passed: **3,064 pages**.
- Both generated history pages and JSON export records were checked for matching
  IDs, titles and dates; article front matter and unique IDs validated.
- Sri Lanka's structural score-chain check reported zero flagged steps, subject
  to the historical allocation gap noted above.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned no copy for either new cited URL. Records were
  merged while preserving any previously known archive rather than replacing it
  with null. The court report itself is hosted at Internet Archive.
