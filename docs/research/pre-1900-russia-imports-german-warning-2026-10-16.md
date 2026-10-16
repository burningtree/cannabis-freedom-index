# Russian medicine imports and a German cigarette warning

Research date: **16 October 2026**. Added two unscored events and articles:

- `russia-cannabis-cigarettes-import-ban-reported-1878`
- `germany-darmstadt-cannabis-cigarette-warning-1886`

## Contemporary Russian import report, 1878

Read [Pharmaceutische Post, XI, No. 3, 1 February 1878](https://anno.onb.ac.at/cgi-content/anno?aid=php&datum=18780201&seite=9&zoom=50),
**pp. 45–46**, titled *Pharmaceutische Nachricht aus Russland*. Read the permitted
and prohibited import lists in full. The journal attributes the information to
*Pharmaceutische Zeitung*. On p. 45 the prohibited list expressly includes
**Cigarettes indiennes au Cannabis indica**.

The original issue was retrieved through ANNO's browser viewer and its PDF
control. The resulting [issue PDF](https://anno.onb.ac.at/pdfs/ONB_php_18780201.pdf)
was downloaded locally, text-extracted and the relevant page rendered. The
original scan was visually inspected, including the prohibition heading and
cannabis-cigarette entry. This avoided reliance on modern summaries.

**The date is a report date, not an enactment or commencement date.** The report
establishes a prohibition known by 1 February 1878. It does not establish that
Russia enacted a new law in 1878, name its instrument, or name a manufacturer
for this cigarette entry. No general possession or cultivation prohibition is
inferred. The underlying *Pharmaceutische Zeitung* item remains a retrieval task.

## Independent contemporary corroboration, 1886

Read the original Swiss *Schweizerisches Handelsamtsblatt*, Vol. 4,
**No. 87, 18 September 1886**, **pp. 611–612**, in its **non-official section**.
The heading concerns Russia and foreign patent medicines whose importation is
prohibited. The top of p. 612 expressly includes the same cannabis cigarettes.

The E-Periodica viewer metadata maps physical scan **616** to printed p. **612**,
with page PID **707**. The source link targets that page:
[original viewer](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1886%3A4%3A%3A707).
The issue date was visually verified on its opening scan **611**. The source
images were obtained through the viewer's public IIIF image service, including
[printed p. 611](https://www.e-periodica.ch/iiif/2/e-periodica!sha!1886_004!sha-001_1886_004_00615.jpg/full/1800,/0/default.jpg)
and [printed p. 612](https://www.e-periodica.ch/iiif/2/e-periodica!sha!1886_004!sha-001_1886_004_00616.jpg/full/1800,/0/default.jpg).

This corroborates the restriction in 1886, without demonstrating continuous
intervening enforcement. The heading points back to No. 85; several nearby pages
were examined but the introductory installment was not identified. Its legal
instrument/date must not be invented. PDF requests to E-Periodica returned
verification HTML, which was not treated as a downloaded PDF or bypassed.

## German official warning, 1886

Read and visually verified the front-page [Darmstädter Tagblatt notice](https://exist.ulb.tu-darmstadt.de/3/v/pa000192-0245),
**No. 245, 16 December 1886**. The notice is signed by the **Grand Ducal Police
Office, Darmstadt**, **v. Grolman**, dated **14 December 1886**. The event uses
that notice date and separately states publication two days later.

It reproduces Karlsruhe local health-council warnings. The first concerns
Grimault's Cannabis-Indica cigarettes: advertising, a local sample examination,
a finding of mostly belladonna and very little Indian hemp, and a warning of
deception and possible respiratory harm. The second concerns an unrelated
seller's brochure. No cannabis prohibition or penalty is announced in this text.
The original Karlsruhe warning date is not supplied. The record consequently
identifies Darmstadt's dated republication, not the first Karlsruhe warning.

The [original front-page scan](https://tudigit.ulb.tu-darmstadt.de/image/Za-150-1886-2/3/18861216_0001.jpg)
was downloaded from the transcription's own facsimile link and visually compared
with the transcription. Historical therapeutic claims and analytical conclusions
remain attributed to the notice; no modern efficacy claim is made.

## Leads, scope and score limitations

Uwe Spiekermann's [2019 essay](https://uwe-spiekermann.com/2019/10/29/zwischen-arznei-und-geheimmittel-cannabispraeparate-im-spaeten-19-jahrhundert/)
and Jure Stojan's [2023 study](https://ojs.library.carleton.ca/index.php/pcharm/article/view/4334)
supplied leads. The new articles use the contemporary sources themselves.

The reported **Hamburg 1885** prohibition remains unverified against its original
instrument. The BLB Karlsruhe archive did not yield a readable April 1885 issue
in this pass. The verified German warning is not substituted for a Hamburg ban.

No profiles or existing `before` vectors changed. Both new records are historical
context without a score vector. Structural consistency of the existing Russian
and German chains does not settle historical scores under the earlier regimes.
No local supplied book was newly read. Downloads and extracted material remain
in ignored `tmp/pre-1900-patent-medicines/`.

## Validation

- `npm run build` passed: **3,069 pages**.
- Database: **2,404 entries**, including **2,345 checked**, 11 unchecked and 48
  estimated first bans.
- Unique IDs and both article front-matter records validated; generated article
  pages and JSON export records verified against their database titles and dates.
- Russia and Germany each have **zero structurally flagged score steps**, subject
  to the historical score-reconstruction limits above.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability returned no snapshots for the three core source URLs.
  Archive checks were merged without replacing known non-null archives with null.
