# Pre-1900 cannabis regulation: indenture, executive powers and medical exceptions

Research date: **16 October 2026**. This pass examines colonial measures whose
legal operation is obscured by shorthand claims of a “ban” or “repeal”.

## Changes made

| Entry | Action | Finding |
|---|---|---|
| `south-africa-natal-1870` | Corrected; article added | Section 70 supplied powers directed at Indian immigrants; an operative prohibition cannot be inferred from that authority alone. |
| `natal-prohibition-proposal-1884` | Added with article | Pietermaritzburg Circle's medical officer sought prohibition; the council divided and issued no rule. |
| `natal-law-tightened-1887` | Corrected to debate; article added | The immigration commission recommended exercise of the 1870 powers; no implementing rule was established. |
| `trinidad-prohibition-1894` | Added with article | Separate Ordinance No. 22 prohibited cultivation, sale and possession; a retrospective parliamentary account identifies a medical exception. |
| `trinidad-repeal-1899` | Corrected to easing; article added | Banks reports repeal after the 1894 prohibition; surviving controls cannot be reconstructed as simple repeal of the 1885 licence. |

## Natal: evidence read and its limits

Read **Craig Paterson, _Prohibition & Resistance_ (Rhodes University MA thesis,
2009), pp. 43–47**, especially p. 43 and notes 22–24, pp. 44–46 on medical
witnesses, and p. 47 on implementation. The thesis quotes the 1887 Indian
Immigrants Commission report, pp. 6–8, including the request to exercise section
70 and the account of the unsuccessful 1884 initiative. Its discussion notes
medical testimony opposing prohibition and questions the report's claim of
medical unanimity. [Full thesis](https://fieldsofgreenforall.org.za/wp-content/uploads/2009/02/Prohibition-ResistanceA-Socio-Political-Exploration-of-the-Changing-Dynamics-of-the-Southern-African-Cannabis-Trade.pdf).

Also re-read **Thembisa Waetjen, “Dagga: How South Africa Made a Dangerous Drug,
1902–1928”, in _Cannabis: Global Histories_ (MIT Press, 2021), p. 86 and notes
8–12**, from the workspace EPUB extraction. Waetjen calls the 1870 provision a
prohibition, while stating that the 1887 inquiry produced no additional legal
controls. The articles acknowledge this difference rather than silently claiming
that all scholarship agrees about the statutory mechanism.

**Not retrieved:** original Law No. 2 of 1870, its implementing notices, the
1884 council minutes and the original 1887 report. Paterson's reproduced report
passages support a narrower enabling-power interpretation; they do not certify
that no restriction ever operated in Natal. `checked: true` refers to the
sources actually read and the expressly qualified claims, not primary-instrument
verification. The earlier Transnational Institute summary was replaced on the
1887 entry because it did not substantiate an enacted tightening.

The 1887 recommendation and the existing `natal-wragg-commission-1887` testimony
entry remain separate, cross-linked aspects of the same inquiry; neither is a
new scored legal step. The 1884 proposal likewise has no `before` values.

## Trinidad: evidence read and its limits

Re-read **Jamie Banks, “Ganja Madness”, in _Cannabis: Global Histories_ (2021),
pp. 63–66, 70–71 and corresponding notes**, from the local EPUB extraction.
Note 61 identifies **Ordinance No. 22 (1894), CO 295/356, The National Archives**;
note 35 identifies **Ordinance No. 13, Ganja Cultivation Licenses, 2 October
1885, CO 295/308**. Notes 58–59 identify the **17 July 1899 reports on working
of the 1894 ordinance, CO 295/392, folio 607**. These are retrieval references,
not archival documents directly inspected in this pass.

Read the **11 December 2019 unrevised House debate, pp. 23–24**, Attorney
General **Faris Al-Rawi**. The historical introduction describes the 1894
prohibition and a medical-practitioner exception, then a more complicated 1899
revision separating medicinal preparations from smoking ganja.
[Parliamentary record](https://www.ttparliament.org/wp-content/uploads/2022/01/hh20191211.pdf).
This is an official retrospective account, not the nineteenth-century text;
its wording is insufficient for a section-by-section reconstruction.

The [official repealed-laws catalogue](https://laws.gov.tt/ttdll-web/revision/byrepealed?format=&max=30&offset=1110)
lists **Ganja Ordinance, No. 10 of 1899**. The linked download
`https://laws.gov.tt/ttdll-web/revision/download/66225?type=amendment`
returned a one-page, 11,013-byte PDF with no substantive extracted text; its
rendered page was blank. It was not cited as proof of provisions. The 1894
original was not obtained either. Precise enactment/commencement dates, penalties,
medical exception wording and surviving 1899 controls remain open. Year-only
dates are therefore retained.

## Scores and validation

No country profiles or `before` scores were changed. In particular, Trinidad's
existing 1899 scores imply full restoration to 98; that allocation now needs
historical reconstruction against the 1894 prohibition and the surviving controls.
The new 1894 event has no invented score vector. South Africa's existing chain
starts at 58 in 1922 and carries one structural warning; this pass does not
claim that the 1870 enabling measure accounts for that starting value.

Validation results are recorded after the build below. Downloaded documents,
extractions and the blank-page render are retained only in ignored
`tmp/pre-1900-indentured/`.

- `npm run build` passed: **3,062 pages**.
- All five affected history pages and JSON records were verified for matching
  IDs, dates and titles; article files and unique IDs were checked.
- Existing `before` vectors were compared with the staged baseline and preserved.
- Trinidad's structural score chain has zero flagged steps. South Africa retains
  its existing one-step starting-value warning described above.
- The book catalogue records the additional chapter passages actually reviewed
  and parses as valid YAML.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability found a parliamentary-record copy and none for the
  Paterson PDF. Archive records were merged without replacing a known copy
  with a null result.
