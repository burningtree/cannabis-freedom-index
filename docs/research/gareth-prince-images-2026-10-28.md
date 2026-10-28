# Garreth Prince: portrait, 2018 photograph and 2026 litigation — 28 October 2026

Retitled the Culture entry from “Gareth Prince” to **Garreth Prince**, the spelling in the
Constitutional Court record (`Garreth Anver Prince`). The file remains
`culture/people/gareth-prince.md`, so the existing URL is unchanged; `also` keeps Gareth Prince,
Gareth Anver Prince, Ras Garreth Prince and Ras Gareth Prince searchable. The body explains the
spelling difference once.

## Image sourcing and reuse

| Use | Asset | Source / credit | Reuse status |
|---|---|---|---|
| Lead: outside the Cape Town High Court, 3 May 2013 | `garreth-prince-cape-town-high-court-2013.jpg` (2000 × 1418) | [IOL, “Rasta lawyer to challenge drugs act”](https://iol.co.za/news/2013-05-04-rasta-lawyer-to-challenge-drugs-act/), photograph by **Leon Lestrade / Weekend Argus** | No open licence found. IOL’s footer states “© 2026 IOL. All rights reserved.” Permission was not obtained. Used under the project’s documented policy for a well-sourced photograph when no suitable open image exists; the credit does not imply permission. |
| 2018: inside the Constitutional Court, 18 September 2018 | `garreth-prince-constitutional-court-2018.jpg` (600 × 400) | [The Citizen, “PICS: Dagga milestone largely welcomed…”](https://www.citizen.co.za/news/south-africa/pics-dagga-milestone-largely-welcomed-but-there-are-risks/), photograph by **Cebisile Mbonani** | No open licence found. Caxton’s terms say it owns or supplies the site’s images and that none may be copied or reproduced without permission (clauses 6.1–6.2); permission was not obtained. Used under the same project policy. |
| Not used: Rastafari supporters outside court, September 2018 | Oxford Human Rights Hub image by Sanya Samtani (1440 × 1080) | [OxHRH article](https://ohrh.law.ox.ac.uk/south-africa-decriminalises-the-private-use-possession-and-cultivation-of-cannabis/) | No licence statement found. The image is a crowd scene and does not identify Prince, so the Citizen photograph was preferred. |

The IOL image was downloaded from the article’s image service at its largest available width
(`=w2000`; requesting 2400 or more still returns 2000 × 1418). It is not a screenshot and has no
watermark. The full portrait, dreadlocks, suit and “HIGH COURT / HOOGGEREGSHOF” signage are
retained without cropping. The IOL file was converted from WebP to JPEG for a smaller fallback;
no crop, retouching or generated content was applied. The Citizen image is the largest published
file in the article (600 × 400); it shows Prince inside the Constitutional Court on the day of the
ruling and is captioned as such.

## Text research

- **2002:** read the Constitutional Court judgment `Prince v President of the Law Society of the
  Cape of Good Hope` (CCT 36/00) [2002] ZACC 1 from SAFLII. It confirms the name Garreth Anver
  Prince, the Law Society’s refusal, the religious-use evidence, the 5–4 result, the “no objective
  way” passage (para 130) and Sachs’s “walk the extra mile” passage (para 149). Lower-court dates
  (23 March 1998; 25 May 2000) are in the UN communication’s footnotes.
- **2004 and 2007:** read the African Commission decision 255/02 and the UN Human Rights
  Committee’s `Prince v. South Africa` (CCPR/C/91/D/1474/2006). The UN text confirms the birth date
  of 6 December 1969 and the reasoning that an exemption would require an import and distribution
  system that could leak into general circulation.
- **2017–2018:** read the official Constitutional Court judgment `Minister of Justice and
  Constitutional Development v Prince` (CCT 108/17) [2018] ZACC 30, especially the order and
  paragraphs 3, 58 and 87–109, plus the OxHRH summary. The judgment confirms the unanimous privacy
  ruling, the 24-month suspension and interim relief, and that purchase/dealing and public use
  were not protected. The Citizen supplies Prince’s 18 September 2018 quotation.
- **2026:** read the George Herald report of the 14 April 2026 urgent application (state
  ministries without answering papers; Acting Judge Mnengwana; 8 June return date), the Mail &
  Guardian analysis of the constitutional challenge, Cannabiz Africa’s report of the court-directed
  interdepartmental meeting and its 15 October follow-up, and Business Day’s report on legal
  pathways for indigenous growers. The entry distinguishes the application’s allegations and
  demands from the court’s directions and from any ruling; no 2026 merits judgment was found.
- **Implementation:** the gov.za Act page still records commencement as “To be proclaimed”. The
  Department of Justice’s 3 February 2026 statement invited comment on draft regulations; TalkingDrugs
  reported on 6 October 2026 that the Act had not commenced and that the draft limits (750 g and
  five plants) were not final. The entry says the Act was uncommenced as of October 2026.
- **Legal-document presentation:** the two-case table quotes the official orders directly. No
  document screenshot, simulated court image or invented excerpt was used.

## Verification

`npm test` passed. `node scripts/build-pages.mjs culture/people/gareth-prince culture/people country/za`
passed and rendered the entry, the People index and the South Africa profile. The entry, its People
index card and both figures were inspected at 1280 × 900 and 390 × 844: no horizontal overflow; the
lead portrait and the 2018 photograph render whole with their captions and credits, and the card
crop keeps the courthouse sign. Both images are stored as JPEG; Astro generates the responsive
variants.
