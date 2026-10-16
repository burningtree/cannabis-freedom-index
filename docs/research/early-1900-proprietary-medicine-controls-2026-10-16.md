# Early-1900s proprietary-medicine controls — 16 October 2026

## Added and corrected

- Added `germany-bromidia-prescription-advertising-rules-1907`, dated **1 October 1907**, with an article. Original Federal Council resolution **27 June 1907**, reproduced in *Vierteljahresschrift für praktische Pharmazie* 4 (1907), **276–281**. Sections 3–5 and Anlage B no. 9 verify written, dated, signed medical orders, renewed orders for repeat dispensing, public advertising prohibition and commencement. Section 2 also limits packaging claims. The journal reports substantially corresponding state ordinances, without reproducing every state's instrument.
- Corrected `us-pure-food-and-drug-act-1906` to **1 January 1907**, preserving its ID, and added an article. Original **34 Stat. 768–772**, chapter 3915, approved **30 June 1906**, §13 commencement. Section 8 expressly covers quantity/proportion labelling for cannabis indica and derivatives/preparations in drugs and foods. Removed the unsupported first-federal-law claim, the overly broad assertion that it did not restrict cannabis, and an unrelated District of Columbia statement. This is product/trade regulation, not general possession prohibition or prescription control.

## Sources actually reviewed

- [Original U.S. statute](https://www.govinfo.gov/content/pkg/STATUTE-34/pdf/STATUTE-34-Pg768.pdf): downloaded and extracted all five statutory pages; read §§1–2, 6–8, 10–13 for scope, labelling and enforcement. Local `tmp/early-1900-medicine/us1906.pdf` and `.txt`.
- [FDA institutional history](https://www.fda.gov/about-fda/changes-science-law-and-regulatory-authorities/part-i-1906-food-and-drugs-act-and-its-enforcement): read the substantive history, including the labelling/pre-market-approval distinction and 1911/1912 therapeutic-claim limits.
- [German journal volume](https://doi.org/10.24355/dbbs.084-201104111452-0), TU Braunschweig record `dbbs_mods_00039125`, derivative `00018962`: browser catalogue automatically completed its connection check. Downloaded public METS index and used the viewer's ordinary PDF export for scan images **287–292**, printed **276–281**. Rendered and visually read all six pages. Local `german1907.pdf`, `german-1.png` through `german-6.png`; extracted PDF text contains only viewer captions and is not sufficient evidence alone.
- [AMA Bromidia report](https://www.gutenberg.org/files/47766/47766-h/47766-h.htm): Council on Pharmacy and Chemistry report originally published **16 May 1914**, reprinted pp. **31–35** in the ninth edition of *The Propaganda for Reform in Proprietary Medicines*. Read advertised formula, changing package/circular declarations and disputed finished-product cannabis content. Used as later composition context, not proof of the exact contents of German 1907 bottles or the legislature's motive.
- Re-read the original **1891 Battle v. Finlay** reporter text for background; not added as a source to the new entry because the 1914 report better communicates the composition uncertainty.

## Unresolved leads and limits

The Spiekermann essay supplied the German journal citation; the new legal finding is based on the reproduced original instrument. Its 1903 Zematone reference remains a lead: the 1907 schedule confirms Zematone's listing but does not alone verify its 1903 inclusion or composition. Austrian 1905 production/import and 1907 pharmacy authorization leads remain unadded pending originals. The 1907 Hessian gazette download has almost no searchable text; no conclusions were drawn from an empty text search. Italy's January 1903 gazette announcement of the March 1902 pharmacopoeia approval does not establish cannabis coverage.

No current country profile, score or existing `before` vector was changed. The German named-product event is unscored context; it does not establish a cannabis-wide ban or a first-ever prescription rule. All retrieval files are under ignored `tmp/early-1900-medicine/`. No new user-supplied book was ingested.

## Archive checks and validation

Availability checks on 16 October returned these snapshots:

- U.S. statute: https://web.archive.org/web/20260402173931/https://www.govinfo.gov/content/pkg/STATUTE-34/pdf/STATUTE-34-Pg768.pdf
- FDA history: https://web.archive.org/web/20261011213355/https://www.fda.gov/about-fda/changes-science-law-and-regulatory-authorities/part-i-1906-food-and-drugs-act-and-its-enforcement
- AMA reprint: https://web.archive.org/web/20260220094840/https://www.gutenberg.org/files/47766/47766-h/47766-h.htm
- German volume DOI: no snapshot returned.

A pre-existing, independently running `node scripts/archive-sources.cjs save 100 --randomw`
process rewrote `source-archive.json` from its own in-memory state during this pass,
overwriting this batch's cache merge. It was left running. The verified results are
preserved above; do not assume the shared cache retains this batch until they are
merged after that process finishes. Its separate source work was preserved.

`npm run build` passed: **3,072 pages**. Database: **2,407 entries**, 2,348 checked,
11 unchecked, 48 estimated first bans. Both article front matters, generated pages
and history-export titles/dates were checked. Unique IDs and preservation of every
existing `before` vector were checked against the staged baseline. Germany and U.S.
score-chain checks each reported zero flagged steps. Both unstaged and staged
`git diff --check` passed. No commit or deployment was made.
