# Expansion batch, 28 October 2026 — Asia 9

Chosen from `country-gaps.cjs --rank 40 --region Asia`, skipping the countries already expanded in
Asia 1–8. The remaining Asian profiles have few missing sections but still lack key articles,
local cannabis words and some 2024–2026 history. This batch is Lebanon, Bhutan, Pakistan,
Bangladesh and Japan. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Lebanon | 1946 law sourced, article written, cultivation/enforcement fixes, 4 words, 4 history entries | no licence issued yet | this commit |
| Bhutan | 2004 article, trafficking terminology, 3 words, 2 history entries | 2023 commercial-hemp report unverified | this commit |
| Pakistan | 1995 article, federal/provincial qualification, medical route, 5 words, 3 history entries | hashish schedule threshold unverified | this commit |
| Bangladesh | 1987 article, production/access fix, culture and arrest corrections, 6 words, 4 history entries | hashish schedule item unverified | this commit |
| Japan | 2023 reform article, cultivation maximum fix, medical wording, 5 words, 4 history entries | no approved cannabis medicine | this commit |

Lebanon validation: `profile-audit lb` zero errors and warnings. The 1946 entry is dated 18 June, sourced to the primary law and Bouquet, and now has a 484-word article. The profile splits the Law 178 penalties, corrects the field-destruction year, adds four Lebanese Arabic terms and records the 2025 HHC/THCP scheduling, Yammouneh raid, 2026 laboratory agreement and draft drug law.

Japan validation: `profile-audit jp` zero errors and warnings. The cultivation-for-profit row no longer invents a ten-year maximum, the medical text says no herbal product has been approved rather than excluding herbal medicine in law, and the 2023 reform entry is dated 6 December with non-Wikipedia sources. Five Japanese terms and four history entries cover 2024–2026; the 475-word article is in `articles/`.

Bhutan validation: `profile-audit bt` zero errors and warnings. The possession text and table now call amounts above the Schedule VII threshold illicit trafficking, the profile has three Nepali/Dzongkha terms, and the 2004 Penal Code entry has a 423-word article. Two entries cover the 2025 Paro airport sentences and the 2026 Narcotics Rules.

Pakistan validation: `profile-audit pk` zero errors and warnings. The profile now marks the penalty table as federal (Islamabad) and notes the KP, Sindh, Punjab and Balochistan statutes, corrects the mandatory-minimum wording and the 2026 prescription route, records the 75 licence applications and adds five Urdu/Punjabi/Pashto terms. Three entries cover 2019–2026; the 441-word 1995 ordinance article is in `articles/`.

Bangladesh validation: `profile-audit bd` zero errors and warnings. The profile now recognises the section 9(3) licensing exception for production, fixes the access and culture wording, replaces the confused Rangpur arrest sentence with the 2026 national figures, adds six Bengali terms and corrects the 1989 article’s “two kilograms” claim. Four entries cover 2025–2026; the 467-word 1987 cultivation-ban article is in `articles/`.

## Result

All five countries were expanded and committed separately: Lebanon `b92bd917`, Bhutan `f8dfb74d`, Pakistan `b3b1edb0`, Bangladesh `756b1ee1` and Japan `9b7d9019`. Each profile passes `profile-audit` with zero errors and warnings and has no missing standard or researched sections, penalty tables or inline citations. Targeted `build-pages.mjs` runs rendered each country and its changed history pages; `npm test` passes.

The batch added 17 history entries, 23 local cannabis terms and five key articles (Lebanon 1946, Bhutan 2004, Pakistan 1995, Bangladesh 1987, Japan 2023). It also corrected the Bangladesh 1989 article’s “two kilograms” claim. Main corrections: Lebanon’s 1946 law is now sourced to the primary text, Bhutan’s above-threshold possession is labelled trafficking, Pakistan’s federal table is distinguished from provincial statutes, Bangladesh recognises the section 9(3) licensing exception, and Japan’s cultivation-for-profit maximum is no longer overstated.

The main open caveats are Lebanon’s still-unissued cultivation licences, Bhutan’s unverified 2023 commercial-hemp report, Pakistan’s missing First Schedule hashish threshold, Bangladesh’s missing First Schedule item 6, and Japan’s unparsed PMDA approval list.
