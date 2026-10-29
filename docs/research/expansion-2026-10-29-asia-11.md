# Expansion batch, 29 October 2026 — Asia 11

The last Asian profiles with open gaps after Asia 1–10. Brunei still lacks its score-moving
death-penalty article; Hong Kong, Kyrgyzstan, Singapore, Oman and Kuwait lack local cannabis
words. This batch closes those gaps. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Brunei | 1992 article, 1992 threshold correction, 4 Malay terms, 3 history entries | 2017 cannabis detail still weak | this commit |
| Hong Kong | 6 Cantonese terms, trafficking life field, atlas link | none | this commit |
| Kyrgyzstan | 6 Kyrgyz/Russian terms, culture and wild-plant fine corrections | none | this commit |
| Singapore | 6 English/Malay/Chinese/Tamil terms, Changi seizure entry | none | this commit |
| Oman | 4 Omani Arabic terms, 2023 committee entry | none | this commit |
| Kuwait | 3 Kuwaiti Arabic terms, HHC scheduling entry | none | this commit |

Kyrgyzstan validation: `profile-audit kg` zero errors and warnings. The profile now distinguishes Russian `anasha`, Kyrgyz `кара куурай` and `нашаа`, adds the law’s Russian terms for marijuana and hashish, and corrects the wild-plant fine from “landholders” to anyone obliged to clear the plants. Six terms added.

Hong Kong validation: `profile-audit hk` zero errors and warnings. The profile now carries six Cantonese terms (大麻, 草, 花, 牛, 大麻花, 大麻精), marks the trafficking maximum as possible life, and adds Hong Kong to the `ma` atlas entry.

Oman validation: `profile-audit om` zero errors and warnings. The profile now carries four Omani Arabic terms (حشيش, ماريجوانا, بانجو, قنب هندي) and one entry records the 2023 move of the national drug committee to the National Security Council.

Singapore validation: `profile-audit sg` zero errors and warnings. The profile now carries six terms across Singapore’s four official languages and records the 36.3 kg Changi airport seizure of April 2026.

Kuwait validation: `profile-audit kw` zero errors and warnings. The profile now carries حشيش, ماريجوانا and قنب, and one entry records the May 2026 scheduling of HHC.

Brunei validation: `profile-audit bn` zero errors and warnings. The 1992 entry is dated 25 June and corrected to the 500 g/200 g trafficking and 600 g/300 g possession-for-trafficking thresholds, with the primary order and current Act as sources. The profile now has four Malay terms; three entries cover the 1982 heroin penalty, the 2024 UPR and the 2026 charge substitution. The 483-word 1992 article is in `articles/`.
