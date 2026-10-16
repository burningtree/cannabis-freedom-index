# Spain's poison catalogue and Austria's branded-cigarette ban

Research date: **16 October 2026**. Corrected `spain-hashish-controlled-1860`,
added `austria-grimault-cigarettes-import-ban-1882`, and wrote articles for both.

## Spain: original 1860 ordinance

Read the [original Gaceta de Madrid, No. 115, 24 April 1860](https://www.boe.es/gazeta/dias/1860/04/24/pdfs/GMD-1860-115.pdf),
pp. **1–2**, including the royal decree, pharmacy provisions, articles **54–60**
and both catalogues. The decree is dated **18 April 1860**. The event records
that instrument date, not a separately verified commencement date.

Catalogue No. 2 explicitly includes **Haschisch**. OCR badly mangles that word;
the rendered page and a crop were visually inspected to verify the entry.
Article **59** designates Catalogue No. 2 entries as poisonous substances.
Article **57** requires drug dealers to obtain a dated, signed note from a known
responsible person specifying the quantity in words and intended use. Its scope
expressly includes wholesale/retail sales and sales to the public/pharmacists.
The signer is not expressly required to be a physician in that provision.

Articles **2, 8–9 and 54–60** supply the professional and trade context. These
are not proof of general cannabis-possession prohibition. Removed the previous
Wikipedia-only claims of weak enforcement and of the first effective restrictions
in 1929: those assertions were not established by the original 1860 instrument.
No claim that 1860 was the first possible Spanish control is made.

## Austria: original 1882 regulation

Visually read [Reichsgesetzblatt 1882, XVI. Stück, No. 46, p. 118](https://alex.onb.ac.at/cgi-content/alex?aid=rgb&datum=1882&page=146&size=45)
in the Austrian National Library's ALEX viewer. The browser automatically completed
the site's initial access check; no CAPTCHA was solved. Direct command-line image
requests returned an access-check HTML document, not an image, and were not
misidentified as retrieved scans.

The regulation is dated **25 April 1882**, issued by the ministries of the interior,
finance and commerce, in agreement with the Royal Hungarian Government. It
prohibits imports of products of **Grimault & Co., Paris**, marketed as hemp
cigarettes or Indian cigarettes, and declares immediate effect. The publication
day was not independently established; the database date labels the instrument.
The text does not expressly add transit, domestic sales, possession or cultivation
prohibitions. Those must not be inferred from its import restriction.

Read Jure Stojan's [2023 study](https://ojs.library.carleton.ca/index.php/pcharm/article/view/4334),
*Lost Archives and Found Voices: Reconstructing the Marketing History of Medical
Marijuana in Austria-Hungary*, especially PDF pp. **2–5** and the bibliography.
The journal landing page confirms publication **26 June 2023**, volume **21**.
Its introduction dates the regulation 25 April; its bibliography gives 28 April.
The original scan resolves this in favour of **25 April**.

The study supplies attributed context about Julius von Trnkóczy's authorized
Ljubljana cannabis cigarettes, an official regional newspaper's 1883 defence of
their legality, and advertisements already in 1881. Those original newspaper
items were not independently retrieved, so no separately dated concession or
1883 legal change was added. The paper's reported later sales ban is also not
silently treated as part of this original import regulation.

## Additional leads and retrieval limits

- Uwe Spiekermann's [2019 historical essay](https://uwe-spiekermann.com/2019/10/29/zwischen-arznei-und-geheimmittel-cannabispraeparate-im-spaeten-19-jahrhundert/)
  supplied newspaper and pharmacy-journal leads for Austria, Russia and Hamburg.
  Its broader import/transit wording is not substituted for the actual Austrian
  operative text, which expressly addresses importation.
- A contemporary Polish pharmacy journal, [Kronika Farmaceutyczna, 15 September 1898](https://jbc.bj.uj.edu.pl/Content/371594/PDF/NDIGCZAS017110_1898_006.pdf),
  was located as a further reference to regulation No. 46. Its complete relevant
  passage was not reviewed closely enough to use as a core source in this batch.
- Russia's reported **1878** patent-medicine import restriction, Hamburg's **1885**
  Grimault measure, and Austrian pharmaceutical tariffs remain primary-retrieval
  leads. Baden's reported warning must not be labelled a ban.

Temporary downloads, extracts and renders remain in ignored
`tmp/pre-1900-spain-pharmacy/`. No supplied local book was newly reviewed.
Neither event has a `before` vector; existing scores and profiles were preserved.
The existing Spanish and Austrian score chains still place their first scored
restrictions in 1929 and 1928 respectively. Their structural consistency does not
establish that the earlier commercial regimes deserve an unrestricted score;
allocating historical segment scores remains a separate reconstruction task.

## Validation

- `npm run build` passed: **3,067 pages**.
- Database: **2,402 entries**, including **2,343 checked**, 11 unchecked and 48
  estimated first bans.
- Unique IDs, both article front-matter records, and both generated pages and
  JSON export records were checked for matching titles and dates.
- Spain and Austria each have **zero structurally flagged score steps**, subject
  to the historical allocation limitations above.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned **HTTP 429** for all three source URLs. These
  were recorded as attempted checks, without treating a null result as proof
  that no archive exists or replacing a known non-null archive with null.
