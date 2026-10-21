# Tanzania: the colonial prohibition and national drug-law transitions

21 October 2026. Continued the larger-gap pass with Tanzania, whose nine
entries included an estimated early restriction, a weak 1935 summary and
very short accounts of its later national laws. Rechecked writing rules,
category precedence and tags before editing. Baseline:
`tmp/history-tanzania-gap-2026-10-21/changes-before.yaml`.

## The 1926 prohibition: complete legislative extract, scan still pending

Located the UN's reproduction of Tanganyika's 1947 revised laws, chapter 134,
Ordinance 8 of 1926, in E/NL.1952/81, printed p. 62. The source tool returned
the complete legislative passage: title, **18 June 1926**, sections 1–5 and
the Schedule identifying Cannabis sativa, known as bhang/bhangi. Read that
complete indexed primary-text extract. It prohibits growing, possession,
use and consumption, gives up to 2,000 shillings OR twelve months, authorises
destruction, searches by warrant and warrantless arrest of someone caught
committing the offence. The actual 1995 law independently confirms repeal
of this ordinance, chapter 134, in section 63.

Added a separate event, explicitly **not marked checked**. The UN PDF itself
could not be obtained: web returned 403, direct/nanna downloads produced
empty responses, and a browser showed an empty page. An API response was
HTML, not a PDF. Retained those failed-response files as evidence of the
retrieval limit; none was treated as a scan. This source is stronger than
an indexed abstract because it exposes the whole five-section law, but image
verification remains open. No article was written for this provisional entry.

The older estimated national first-restriction event remains unchanged.
Mainland Tanganyika and Zanzibar had separate legal histories, and the
1926 text does not prove the absence of German-era or island restrictions.
No first-ban score was moved on that assumption. Its dated legal entry
makes the known mainland prohibition visible while preserving that open task.

## Original 1995 law versus later consolidated penalties

Downloaded the Financial Intelligence Unit's actual original Act 9 of 1995,
retained as `original1995.pdf` and text. Read sections 1, 3–4, 12–16, 19 and
63, including the signature page and the original fine/prison alternatives.
Visually checked printed/PDF pp. **11–12**, especially the end of section 16
and section 19. The original principal offence group permits a ten-million-
shilling fine OR life imprisonment OR both, and a higher fine with recorded
reasons. It covers growing/supply and knowingly permitting premises or
transport to be used for offences. It must not be substituted with later
mandatory-penalty wording from the consolidated edition.

The small-personal-use rule assigns the residual drug group a 200,000-
shilling fine OR seven years OR both. It expressly puts proof of personal
consumption rather than sale/distribution on the holder and delegates the
small-quantity definition to regulations. The description and article explain
that distinction without inventing a gram threshold. Section 12 reserves
licensed or otherwise authorised medical/scientific activities.

Downloaded the separate **2002 revised edition** from TanzLII. Read its front
matter and commencement annotation: **1 January 1996**, with G.N. 10 of 1996
in the history. The original has assent **31 July 1995** and a commencement-
by-notice clause; the stable event ID is retained but dated to operation in
1996. The commencement notice itself was not recovered; the date is credited
to the legal edition's annotation. Later amendments in 1996, 1997, 2002 and
2012 must be researched as separate transitions, rather than backdated.

## 2015: the statute delegates small quantities

Recovered the actual original Act 5 of 2015 from the Solicitor General's
library, retained as `original2015.pdf` and text. Read sections 1, 11–12,
15, 17–18. It supplies at least thirty years for unauthorised cultivation,
life for trafficking, and the residual small-personal-use penalty of at
least 500,000 shillings OR a three-year term OR both. The quantity is to be
prescribed by the minister in regulations. Removed the existing description's
unsupported claim that the Act itself sets **50 grams**; that quantity needs
a separately recovered regulation or other authority. The source says a
three-year term, so the description no longer turns it into an express
statutory 'up to three years' range.

Preserved the existing commencement date and `before` vector without a full
score revalidation. The event's title now identifies the practical cultivation
penalty, with sentencing, trafficking and eradication tags. It links its
predecessor and the 2017 amendment.

## A bill on 31 October and an enacted amendment on 1 December 2017

Downloaded and read the actual bill from the existing Tradebarriers source.
The cover is **Special Bill Supplement 9, 31 October 2017**, while the
Secretary to Cabinet's internal date is **30 October**. Corrected the existing
publication event to 31 October and category `debate`, and rewrote its title
around the proposed thirty-year lower-quantity tier. It is not itself an
operative penalty change.

Downloaded the actual signed/enacted **Act 15 of 2017** from the Drug Control
and Enforcement Authority, retained as `amendment2017.pdf` and text. Read
sections 3, 8–9 and 14, including the trafficking definition, court assignment,
weight tiers and treatment conditions. Visually checked printed/PDF p. **9**.
Assent is **28 November**, publication **1 December** in Gazette 48, volume 98.
The later TanzLII edition expressly annotates amendment on **1 December 2017**;
used that date for the new enacted event.

Cannabis/khat trafficking at **50 kg or below** goes into the new thirty-year
tier; above it remains in the life-sentence tier. Comparison with the original
2015 definition confirms that giving and storing were already covered; the
2017 wording adds possession and production. Lower-tier cases go to
subordinate courts. Section 17's separate personal-consumption rule remains.
The new event is `other` for the mixed changes, tagged trafficking, thresholds,
sentencing and treatment, with an explicit unscored explanation.

The treatment alternative applies to section 18 convictions and requires
consent, dependence linked to the offence, a reasonable prospect of medical
treatment, a written medical expert report and an interests-of-justice finding.
Violence, weapons, organised crime, quantities beyond personal use and a role
in directing others are expressly relevant exclusions. It is not general
immunity for everyone holding cannabis.

Also downloaded and read the complete 2018 printing-correction order,
G.N. 137, published 23 March 2018. Its correction concerns the evidence-law
reference in Form 007 in English and Swahili. It does not alter the cannabis
weight boundaries or penalty tiers used here.

## Remaining scope and verification

The 1926 scan, the original 1935 ordinance, German-era/Zanzibar controls,
the 1987 amendment, 1996–2012 changes and the original small-quantity regulations
remain gaps. All prior score vectors stay unchanged, without claiming that
the estimated early fall or 2015 segment changes have been reconstructed.
No present-country law or profile was changed.

Preservation checks passed: all 2,661 baseline events remain, every prior
`before` vector is identical, and only the existing 1995, 2015 and 2017-bill
records changed. Two additions bring Tanzania to eleven entries and the full
dataset to **2,663 events and 596 articles**. Article metadata, lengths,
controlled categories/tags, unique and related IDs, and title lengths passed.
The 1995 article is 390 words and the 2017 article 409, each with four sections.

The first build failed with ENOSPC while writing images. Removed the partial
site created by this batch; available space then rose to 1.5 GiB. No research
source or unrelated output was removed to resolve it. Retained the failed log
as `build-enospc.log` and reran after correcting the trafficking-definition
comparison. The final build passed: **3,395 pages in 26.02 seconds**.

The saved `verify.mjs` checked all five touched records against the generated
JSON export, Tanzania timeline and tag routes, plus both articles' headings,
source URLs and internal link targets. It also ensures that the provisional
1926 event is not falsely marked checked. Scoped whitespace checks passed.
Deleted the compiled `site/` after verification and checked for remaining
temporary build/site outputs. Baseline, research files and logs were retained.
