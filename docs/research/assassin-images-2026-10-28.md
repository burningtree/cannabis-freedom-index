# Assassin: manuscript images and the 1809 correction — 28 October 2026

Expanded the Language entry `culture/language/assassin.md` with two medieval manuscript
illustrations and the existing 1937 magazine page, and corrected the summary's implication that
the drugged-killer story began in 1809. The entry now separates the Arabic pejorative
*ḥashīshiyya*, the European common noun *assassin*, the Nizari community's documented political
killings, and the unsupported allegation that hashish motivated them. It uses the Institute of
Ismaili Studies' two scholarly contributions (the encyclopedia entry and Daftary's introduction)
and Daftary's *The Assassin Legends* (1994), pp. 1–7, 34–38, 90–93 and 133–134.

## Images

| Use | Asset | Source / credit | Reuse status |
|---|---|---|---|
| Lead: the Old Man and his garden | `old-man-of-the-mountain-livre-des-merveilles.jpg` (2418 × 1628) | [Wikimedia Commons file](https://commons.wikimedia.org/wiki/File:Hassan-i_Sabbah-1.jpg), from BnF Français 2810, fol. 16v; attributed by the BnF catalogue to the Maître de la Mazarine | Public domain (PD-old). Downloaded at full Commons resolution, unchanged. |
| Marco Polo section: legendary drugging | `assassin-legend-drugging-livre-des-merveilles.jpg` (2254 × 1159) | [Wikimedia Commons file](https://commons.wikimedia.org/wiki/File:Al%C3%A2_al_D%C3%AEn_Muhammad_droguant_ses_disciples.jpeg), BnF Français 2810, fol. 17r; Maître d'Egerton | Public domain (PD-old). Downloaded at full Commons resolution, unchanged. |
| Final section: 1937 propaganda | Existing `assassin-of-youth-1937.jpg` (893 × 1280) | [The American Magazine, via Hash Marihuana & Hemp Museum](https://hashmuseum.com/en/collection/reefer-madness/assassin-of-youth/) | No open licence confirmed; reuse terms remain as recorded in `culture-places-propaganda-2026-10-14.md`. Reused, not duplicated. |

The Commons file name `Hassan-i_Sabbah-1.jpg` is not the manuscript's identification. The rubric
under the miniature reads “Cy parle du viel de la montaigne et de son estat” (“Here it speaks of
the Old Man of the Mountain and his estate”). The entry therefore calls the figure the Old Man of
the Mountain, notes that the Crusaders' original was Rashid al-Din Sinan rather than Hasan Sabbah,
and says the manuscript names no Hasan Sabbah. The image is presented as a medieval European
illustration of a legend, not as evidence of Nizari drug use. The Commons description's date of
“circa 1310” is wrong for this manuscript; the [BnF catalogue notice](https://archivesetmanuscrits.bnf.fr/ark:/12148/cc77943x)
dates Français 2810 to 1410–1412 and attributes fol. 16v to the Maître de la Mazarine.

The second miniature adds the drugging act itself, which the lead image does not show. Its caption
marks it explicitly as a legendary scene and states that no contemporary source describes such a
practice. The 1937 page is placed with the final prohibition section so that the visual sequence
runs from the medieval legend, through the word's later history, to cannabis branded as the
“assassin of youth”.

## Verification

`node scripts/build-pages.mjs culture/language/assassin` passed all 183 tests and rendered the
entry with all three images, captions, credits, links and references. The page was inspected at
1280 × 900 and 390 × 844: no horizontal overflow, all images render whole (the lead manuscript
including its rubric), and captions wrap without covering the pictures. The full-resolution
manuscript files are local assets under `src/assets/culture/`; Astro generates the responsive WebP
versions.
