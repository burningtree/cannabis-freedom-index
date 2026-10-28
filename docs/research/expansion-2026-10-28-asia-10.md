# Expansion batch, 28 October 2026 — Asia 10

Chosen from `country-gaps.cjs --rank 50 --region Asia`. The remaining Asian profiles have no
missing sections or penalty tables; their main gaps are local cannabis words and the top
unwritten article. This batch completes Myanmar, Iraq, Saudi Arabia, Malaysia and Israel.
None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| Myanmar | in progress | | |
| Iraq | 2004 article, article 23/29 corrections, six-tonne wording, 5 words, 3 history entries | amendment still in first reading | this commit |
| Saudi Arabia | 2025 executions article, deportation/licence penalties, flogging and CBD fixes, 4 words, 3 history entries | no patient programme | this commit |
| Malaysia | 2023 article, 936-case correction, 2018 date fix, 4 words, 4 history entries | no 2026 medical product | this commit |
| Israel | 1925 article, 15 g presumption correction, medical cap nuance, 5 words, 1 history entry | zero-fine practice unverified for 2026 | this commit |

Israel validation: `profile-audit il` zero errors and warnings. The profile now treats the 15 g line as a presumption rather than a cap, corrects the table note and the 60 g medical cap nuance, adds five Hebrew/Arabic terms and sources the 1925 ordinance to its text and the League convention. The 1925 entry has a 459-word article; one entry records the 2026 Canadian dumping inquiry.

Malaysia validation: `profile-audit my` zero errors and warnings. The profile now says the 2023 reform reviewed 936 death-row cases rather than opening a general application window, drops the unsupported materia-medica clause, uses the current Act for planting and adds four Malay terms. The 2017 entry is corrected to 15 March 2018; four entries cover 2024–2026, and the 478-word 2023 article is in `articles/`.

Saudi Arabia validation: `profile-audit sa` zero errors and warnings. The profile now records articles 56–57 on deportation, travel bans and licence revocation, notes that statutory flogging remains despite the 2020 abolition, clarifies the 2026 synthetic-CBD rule and adds four Arabic terms. Three entries cover the 2026 UN opinion, first-half executions and the August 2026 hashish execution; the 442-word 2025 executions article is in `articles/`.

Iraq validation: `profile-audit iq` zero errors and warnings. The profile now cites Article 23 for the plant ban, uses “more than six tonnes” instead of the unsupported 6,183 kg, treats Article 29 as life/temporary imprisonment rather than death, and adds five Arabic/Kurdish terms. Three entries cover 2024–2026; the 482-word 2004 death-penalty article is in `articles/`.
