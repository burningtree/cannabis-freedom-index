# Culture curiosities for “Did you know?” — 16 October 2026

Added **eight** culture cards in `src/lib/facts.js`, reusing seven existing atlas entries plus the Hemp language entry. The cards automatically enter the home-page pool, `/did-you-know/` and the applicable country panels through the existing fact loader. No new culture page, dated history event or score was added.

| Card | Atlas entry | Evidence reviewed |
|---|---|---|
| Lithuania's Hemp Man defeats the Pork Man | `traditions/kanapinis-the-hemp-man` | Read the atlas entry, [Wisbech museum/community exhibition](https://www.wisbechmuseum.org.uk/uzgavenes/) and [Lithuanian Folk Culture Centre's Shrove Tuesday account](https://www.lnkc.lt/eknygos/thelt/node18.html). The museum establishes the staged contest and spring symbolism; Kudirka's account ties the character to hemp-seed Lenten food. No smoking ritual is claimed. |
| Latvian hunger/servants' butter | `traditions/latvian-hemp-seed-butter` | Read the atlas entry and [Astra Spalvēna's National Encyclopedia account](https://enciklopedija.lv/skirklis/116732), including regional names, roasted/ground seed and substitution for scarce butter. Does not imply every recipe is dairy-free. |
| Carmagnola's long covered ropewalk | `traditions/italian-hemp-rope-makers` | Read the atlas entry and [municipal museum account](https://www.carmagnolamusei.it/musei-carmagnola/ecomuseo-della-canapa/). The card uses the working space and demonstrations without creating a new dated event from the structure's year. |
| Manila hemp is abacá | `language/hemp` | Read the Hemp and Italian rope-maker entries, [Museo dei Cordai's replacement-fibre account](https://www.borgodicastelponzone.it/museo/la-canapa/) and [Kew's Musa textilis record](https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:797617-1/general-information). Added the latter two sources to the Hemp entry. The museum's obsolete sativa/indica distinction was not adopted. |
| Nimbin's Hemp Olympix | `traditions/nimbin-mardigrass` | Read the atlas entry and [organisers' 2008 programme](https://www.nimbinmardigrass.com/archives-history/2008/program08.html), including the three competitions and carrying supplies through an obstacle course. Also checked the organisers' 2026 event description. Used the archived programme in the entry's source list. The organisers' jocular claim of ancient Olympix was not treated as history. |
| Tinny package and tinny house | `language/tinny` | Read the atlas entry and [Tinnie terminology account](https://en.wikipedia.org/wiki/Tinnie), confirming foil package and premises terminology. Reviewed the [2005 research record](https://pubmed.ncbi.nlm.nih.gov/15955013/) as background, but the card makes no study-result, price or current-law claim. |
| Sinsemilla means without seed | `language/sinsemilla` | Read the atlas entry, [dictionary etymology](https://www.etymonline.com/word/sinsemilla) and [Sinsemilla account](https://en.wikipedia.org/wiki/Sinsemilla). Added the dictionary to the source list for the word's meaning. No claimed inventor, origin date, potency figure or growing instructions added. |
| Pot's disputed Spanish origin | `language/pot` | Read the atlas entry and [Max Wheeler's actual LINGUIST List summary](https://linguistlist.org/issues/16/2853/). The card attributes the negative finding to his respondents, rather than asserting the source words never existed in Spanish. |

The source-only additions to the three atlas entries preserve their existing authorship metadata and body text. Existing cards were preserved, and no image assets or layouts were changed. Sources were read as above; suggested sumo, Korean mourning-disguise and Lithuanian song leads were not added in this batch.

Validation: `npm run build` passed, **3,074 pages**. The generated “Did you know?”
page now contains **124 facts**, including **45 culture facts** (previously 37).
Checked that exactly eight cards were added and every previous card remained.
All eight atlas targets exist in the generated output; the new facts also appear
in the Lithuanian, Latvian, Italian, Australian and New Zealand country panels.
Inspected the rendered culture section in the local browser and its card layout
in a screenshot. Staged and unstaged `git diff --check` passed. No commit or
deployment was made.
