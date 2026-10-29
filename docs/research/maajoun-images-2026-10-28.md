# Maâjoun: 2024 study figure, 2013 case-report pieces and historical checks — 29 October 2026

Rewrote the Traditions entry around the confection's double life as food and drug, its
regional and social varieties, the pharmacy etymology and the legal position. Two documentary
photographs were added; no invented illustration was used.

## Images and reuse

| Use | Asset | Source / credit | Reuse status |
|---|---|---|---|
| Lead: cannabis material, a finer mixture and a finished ball of maâjoun | `maajoun-morocco.jpg` (1961 × 915) | Ait Belcaid H, Diffaa A, Sebban H, Belkhouda MA, Assda R, Sedki A. “Neurobehavioral and Social Sequelae of ‘Maajoune Illicit Drug’ Use by Young Individuals.” *Archives of Neuroscience*. 2024;11(1):e138597. Figure 1, PDF p. 3. [Article](https://brieflands.com/articles/ans-138597) · [PDF](https://brieflands.com/articles/ans-138597.pdf) | CC BY 4.0, stated on the article's copyright section. No separate third-party restriction is attached to Figure 1; the figure has no credit line to another creator. The embedded image was extracted with `pdfimages -f 3 -l 3 -png` (object 69, 311 ppi), not screenshotted from the page. The red arrow is part of the published figure and was retained. JPEG quality 92; metadata stripped. |
| Pieces of maâjoun, some wrapped in foil | `maajoun-pieces-2013.jpg` (586 × 390) | Achour S, Jalal Gh, Abourazzak S, Soulaymani R, Hida M. “Severe Maajoun Poisoning in Two Infants, Morocco.” *Journal of Alcoholism & Drug Dependence*. 2013;1(3):1000117. Figure 1, PDF p. 2. [PDF](https://www.longdom.org/open-access-pdfs/severe-maajoun-poisoning-in-two-infants-morocco-2329-6488.1000117.pdf) | The article states: “This is an open-access article distributed under the terms of the Creative Commons Attribution License, which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.” No version number or separate figure restriction is given. The embedded image was extracted with `pdfimages -f 2 -l 2 -png` (object 38, 183 ppi). It is a low-resolution published file; it was not upscaled, only saved as JPEG quality 92 with metadata stripped. |

### Lead image and card crops

The published figure is a wide triptych: coarse dried plant material at left, a finer green-brown
mixture in the middle, and the finished ball at right. The article displays the full width with
`aspect_ratio: 2.14`, so all three materials remain visible on the page and on a phone.

The shared country-page card is 4:3 and cannot show the full 2.14:1 image without heavy
letterboxing. `CountryArticle.astro` now passes the entry's `image.position` to its card image,
and the entry uses `position: right`, so the card shows the finished ball and the finer mixture
rather than a centre crop of empty background. This is a presentation crop only; the article
image and the local file retain all three materials.

### Why no third illustration

A third, modern ingredient illustration was considered and deliberately not made. The two
documentary photographs already show the plant material, the mixture, the finished ball and a
different pressed form. An invented still-life of almonds, honey and tea would add no documentary
value and would risk the generic recipe-site look the brief warns against. The article's recipe
information is carried by the text and the primary figure.

## Historical and linguistic checks

- **Etymology.** Arabic *maʿjūn* is the passive participle of *ʿajana*, “to knead”; the noun means
  paste, cream or putty. The entry says “a paste or compound”, not “a medicine” as the word's
  only sense. Hadji's French paper describes the Moroccan product as a hashish compounded and
  kneaded like a paste, “d'où son nom” (hence its name).
- **Pharmacy connection.** Hadji points to Avicenna's *Canon*, Najm al-Dīn Maḥmūd's
  fourteenth-century treatise, Dāwūd al-Anṭākī's sixteenth-century *Tadhkira*, and al-Hārūnī's
  thirteenth-century manual with forty-seven medicinal pastes. The entry presents these as a
  suggestive context, not as a documented unbroken lineage. The pharmacopoeias show the form and
  its medical use; they do not show a recipe passing unchanged to a Moroccan gathering. Hadji
  does not claim an unbroken line, and the entry says so.
- **Sellou.** Hadji compares maâjoun's composition to *sellou*, the roasted-flour confection eaten
  at Ramadan and at naming feasts, with cannabis added; he reads the resemblance as a way of
  disguising the forbidden as an apparently lawful pastry. The entry attributes this reading to
  him.
- **Gatherings.** Hadji describes afternoon and weekend gatherings after the third prayer, in a
  garden or a house at the edge of town, among middle-class men (sometimes with high-status
  guests) and separately among middle- and upper-class women. Men's *zhou* could include wine,
  song, kif and maâjoun; women's gatherings passed maâjoun on plates. The entry calls this an
  interview-based account of a particular milieu, not a national survey, and does not generalize
  it to all Morocco. The claim that the custom imitated Makhzen court entertainments is presented
  as an oral tradition reported by informants.
- **Street forms.** Hadji lists *barbouqa*, *al-Qortassa* (“the bullet”), *chkilita*,
  *assamaka* and *al-Qatila* (“the killer”), the last two mixed with pills or psychiatric
  medicines. The entry keeps his distinction between these and the older paste, but adds the 1945
  toxicology account quoted in the 1956 UN report, which lists datura seeds and belladonna berries
  in a celebrated ma'joun recipe. This prevents a simple “traditional = benign, street = modern”
  story.
- **UN document.** *The cannabis situation in the Scherifian Empire (French Zone)*,
  E/CN.7/286/Add.11, 20 April 1956, is a French delegation preliminary study. Its pages 6–7
  describe kif smoking and edible preparations, quote Dr Charnot's *La Toxicologie au Maroc*
  (1945) for the ma'joun recipe, and Dr Faure (1955) for the tea-and-kif infusion. The entry dates
  the observation to 1945/1956, not to the date of any digital republication. The 2025 PDF is a
  digitisation of the 1956 document; the document date is the one used.
- **Clinical case report.** Achour et al. (2013) report two infants with severe poisoning after
  ingesting maâjoun; one 14-month-old had eaten a piece thinking it was chocolate, and the
  toxicology was positive for THC and benzodiazepines. The entry uses it for the physical form
  and the risk of adulteration, and the caption explicitly says it is a toxicology case, not an
  ethnographic study of ceremonial preparation.
- **Law.** Morocco banned kif in 1956 and codified penalties in Dahir 1-73-282 of 21 May 1974.
  Law 13-21 of 2021 created a licensed medical and industrial cannabis sector but left unlicensed
  production and use under the 1974 law and created no recreational food route. Hadji's reading
  that maâjoun is “not recognised by law, though not explicitly prohibited” is attributed to him;
  the entry then states the separate fact that its cannabis remains illegal outside the licensed
  system.

## Verification

The article body is 890 words. `npm test` passed all 196 tests in an isolated worktree after
temporarily adapting the two test files and three library files to the js-yaml 5 named exports
(the shared working tree is in the middle of an unrelated js-yaml upgrade, so its test command
fails at import time). The selected Astro build for `culture/traditions/maajoun`,
`culture/traditions` and `country/ma` passed. The entry, its country card and the table were
inspected at 1280 × 900 and 390 × 844; there is no horizontal overflow. The lead image keeps all
three materials on the page; the country card uses `position: right` and shows the finished ball.
The second figure is a low-resolution but legible documentary photograph of the pressed form.
Every one of the five sources is cited inline, and every history id in the front matter is linked
in the text.
