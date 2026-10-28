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
| Bangladesh | in progress | | |
| Japan | 2023 reform article, cultivation maximum fix, medical wording, 5 words, 4 history entries | no approved cannabis medicine | this commit |

Lebanon validation: `profile-audit lb` zero errors and warnings. The 1946 entry is dated 18 June, sourced to the primary law and Bouquet, and now has a 484-word article. The profile splits the Law 178 penalties, corrects the field-destruction year, adds four Lebanese Arabic terms and records the 2025 HHC/THCP scheduling, Yammouneh raid, 2026 laboratory agreement and draft drug law.

Japan validation: `profile-audit jp` zero errors and warnings. The cultivation-for-profit row no longer invents a ten-year maximum, the medical text says no herbal product has been approved rather than excluding herbal medicine in law, and the 2023 reform entry is dated 6 December with non-Wikipedia sources. Five Japanese terms and four history entries cover 2024–2026; the 475-word article is in `articles/`.

Bhutan validation: `profile-audit bt` zero errors and warnings. The possession text and table now call amounts above the Schedule VII threshold illicit trafficking, the profile has three Nepali/Dzongkha terms, and the 2004 Penal Code entry has a 423-word article. Two entries cover the 2025 Paro airport sentences and the 2026 Narcotics Rules.

Pakistan validation: `profile-audit pk` zero errors and warnings. The profile now marks the penalty table as federal (Islamabad) and notes the KP, Sindh, Punjab and Balochistan statutes, corrects the mandatory-minimum wording and the 2026 prescription route, records the 75 licence applications and adds five Urdu/Punjabi/Pashto terms. Three entries cover 2019–2026; the 441-word 1995 ordinance article is in `articles/`.
