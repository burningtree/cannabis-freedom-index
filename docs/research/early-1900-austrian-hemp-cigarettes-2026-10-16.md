# Austrian hemp-cigarette trade and pharmacy supply — 16 October 2026

## New database entries

- `austria-hemp-cigarette-monopoly-clarification-1905`: **12 April 1905**, the Finance Ministry order date as reproduced in the **27 May** newspaper report. Domestic manufacture and **sale/distribution** (*Erzeugung und Verschleiß*) were not prohibited by the existing monopoly regulations; fiscal objections were not to be raised on those grounds. Imports required special fiscal permission and tobacco-cigarette customs/licence charges. Category `other`: clarification of existing fiscal treatment, not proof of repeal or general legalization. Article added.
- `austria-trnkoczy-hemp-cigarettes-pharmacy-approval-1907`: **22 March 1907**, reported order **Z. 2010 ex 1907**. Named manufacturer Ubald von Trnkóczy, Laibach; named preparation *Indische Hanfzigaretten*, in the subsection explicitly restricted to medical prescription. Category `medical`: product authorization, not unrestricted cannabis access. Article added.

Both dates are reported instrument dates, not independently established commencement dates. The complete underlying ministry orders remain retrieval tasks. Laibach is modern Ljubljana, Slovenia, then within the Austrian half of Austria-Hungary; the historical jurisdiction is recorded as Austria. No present-day Slovenian legalization is implied.

## Original sources reviewed

1. [Laibacher Zeitung, 27 May 1905, no. 122](https://www.dlib.si/details/URN:NBN:SI:DOC-RHOW1CN2), printed **1088**, first column, “Medizinalzigaretten.” Downloaded from Slovenia's national-library dLib public PDF link. Extracted text and visually read PDF page **4**, including the order date **12 April** and fiscal-authority wording. Local `tmp/early-1900-austrian-cigarettes/laibach19050527.pdf`, `.txt`, `monopoly-4.png`.
2. [Pharmazeutische Post, 21 April 1907, volume 40, no. 16](https://anno.onb.ac.at/cgi-content/anno?aid=php&datum=19070421&seite=10&zoom=33), printed **312**, first column, “Zum allgemeinen Vertriebe in Apotheken zugelassene pharmazeutische Zubereitungen,” subsection **b**. Used ANNO's ordinary PDF link, extracted text and visually read PDF page **10**. The product/manufacturer, restriction, order date and administrative reference are legible. Local `post19070421.pdf`, `.txt`, `approval-10.png`.

The modern Stojan study supplied retrieval leads but is not the basis for the operative claims. Two refinements came from the originals: *Verschleiß* means commercial sale/distribution here, not personal use; and the Post notice is on printed **312**, not the study's **313**.

## Retrieval limits and negative leads

An initial ANNO Laibacher Zeitung URL failed; this newspaper issue was located instead at dLib using its own full-text search for *Hanfzigaretten*. dLib's *Amtsblatt zur Laibacher Zeitung* of the same date, URN `doc-IVQNV8D1`, is a separate publication and was not substituted for the newspaper. Shell retrieval of its stream returned HTML, not a reviewed PDF. The correct newspaper URN is `DOC-RHOW1CN2`.

The pharmaceutical notice itself does not supply ingredients beyond the product name, concentrations, indications, clinical evidence, advertising rules or a general cannabis authorization. No inference about those matters was added. The fiscal report likewise does not settle medicinal/prescription law or override the separate 1882 named-product import prohibition.

Both entries are unscored historical context. No country profile or pre-existing score vector was changed. No supplied local book was newly ingested. Downloads remain in ignored `tmp/early-1900-austrian-cigarettes/`.

## Archive checks and validation

Wayback availability checks on **16 October 2026** returned no snapshot for either
exact cited URL, without lookup errors. Results are preserved in
`tmp/early-1900-austrian-cigarettes/archive-results.json`. The separately running
archive-save process still owns an in-memory copy of the shared cache; this pass
does not claim its new lookups are retained in `source-archive.json`.

`npm run build` passed: **3,074 pages**. Database: **2,409 entries**, 2,350 checked,
11 unchecked, 48 estimated first bans. A snapshot taken immediately before this
pass verified that every pre-existing event, including all score vectors, was
unchanged. Both new article front matters, event dates, generated pages and history
export records were checked. The Austrian score chain reported zero flagged steps.
Staged and unstaged `git diff --check` passed. No commit or deployment was made.
