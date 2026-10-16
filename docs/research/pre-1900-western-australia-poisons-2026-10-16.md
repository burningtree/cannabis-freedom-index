# Western Australia: cannabis in the 1899 poison schedule

Research date: **16 October 2026**. Added one event and one article:
`australia-western-australia-cannabis-poison-schedule-1899`.

## Original sources retrieved and read

1. [Pharmacy and Poisons Act Amendment Act 1899](https://www.legislation.wa.gov.au/legislation/statutes.nsf/RedirectURL?OpenAgent&query=mrdoc_14189.pdf),
   **63 Vict. No. 36**. Read all five PDF pages, with particular attention to
   sections **3 and 5** and the replacement schedule. Rendered and visually
   checked the opening assent date, section 3 and the complete schedule.
2. [Pharmacy and Poisons Act 1894](https://www.legislation.wa.gov.au/legislation/statutes.nsf/RedirectURL?OpenAgent&query=mrdoc_14470.pdf),
   **58 Vict. No. 35**. Read the preliminary provisions and sections **25–36**,
   together with the original **Fifth Schedule**. Rendered and visually checked
   the sales-record/label provisions on PDF p. 7 and schedule on PDF p. 12.

The links were obtained from the Western Australian legislation site's original
Acts catalogue and each Act's own document page, rather than identifying a later
consolidation as an original nineteenth-century law.

## Findings

- **Assent: 16 December 1899**, confirmed on the original amendment's opening
  page. The event records assent; a separate commencement rule or notice was
  not established. No immediate-operative-date claim is made.
- The 1894 Fifth Schedule does **not name cannabis**. Its section 25 also allowed
  additions by gazetted proclamation. Those possible intervening proclamations
  were not exhaustively examined, so 1899 is not claimed as the colony's first
  ever cannabis control.
- Section 3 of the 1899 Act substitutes a two-part schedule; **Cannabis Indicus**
  appears in **Part I**. It also expressly applies section **29(b)** and section
  **30** only to Part I poisons. The scan reads **(b)**, despite OCR misreading
  this as **(h)** in places.
- Read together, the statutes provide licensing, safe keeping, signed transaction
  records, safeguards for correspondence sales, and poison labels for covered
  dealings. Section 31 gains a requirement for the address of the selling shop
  or premises; section 5 of the amendment makes sales books inspectable on an
  authorized demand.
- Section 27's distance rule for licences to non-chemists changes from **twenty**
  to **five miles**; it is not a requirement that every seller be a chemist in
  every locality.
- Section 33 allows up to **£100** or **twelve months' imprisonment**, with or
  without hard labour, for the specified contraventions. It should not be
  confused with the different £50 professional-business penalties elsewhere.
- Section 36 retains substantial medicinal, proprietary-product, veterinary and
  trade exceptions, with amendments in 1899. The article does not declare an
  identical procedure for every cannabis-containing product or resolve every
  interaction between that section and the two-part schedule.

The record concerns **Western Australia as a colony**, not all Australian
jurisdictions. It does not establish general criminal possession or cultivation
prohibition. No country profile or historical score vector was changed, and no
new `before` vector was invented.

## Other leads tested, not added

The pass began with brewing-law antecedents, but no additional non-New-Zealand
cannabis-specific brewing instrument was verified. The stronger result was the
pharmacy classification above.

A later Washington State codification cites **1899 c. 121, section 15**, alongside
**1909 c. 213, section 8**, for a poison-sales provision containing cannabis.
Downloaded and read the original [Washington chapter 121 of 1899](https://leg.wa.gov/CodeReviser/documents/sessionlaw/1899c121.pdf),
**pp. 216–224**, especially section 15 on **pp. 222–223**.

**The original 1899 enumeration does not name cannabis.** It authorizes the state
board to designate additional dangerous substances, but a cannabis designation
was not retrieved. The later codification cannot therefore be backdated to 1899
merely because that is its earliest source note. No US cannabis-specific 1899
entry was added. This is a different jurisdiction from Western Australia; the
shared abbreviation “WA” must not conflate their laws.

The 1910 Western Australian compilation was a useful lead because its schedule
credits the 1899 amendment. It was not used to substitute later amendments for
the original 1894/1899 texts. The separately located 1903 amendment falls outside
the pre-1900 event scope.

Downloads and temporary extracts/renders remain in ignored
`tmp/pre-1900-wa-poisons/`.

## Validation

Build and export results are recorded below after completion. The entry is
`checked: true` against the original laws actually read, with commencement,
earlier proclamation and enforcement limits stated.

- `npm run build` passed: **3,066 pages**.
- The generated article page and JSON export were verified for matching ID, date
  and title, including the express Cannabis Indicus listing.
- Unique IDs and article front matter validated.
- Australia's structural score-chain check has **zero flagged steps**; the new
  colonial event is unscored and existing vectors remain unchanged.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability found no copy for the two new law URLs. Archive records
  were merged without overwriting any existing non-null archive with null.
