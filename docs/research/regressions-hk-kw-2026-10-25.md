# Hong Kong and Kuwait: facts lost in later research, 25 October 2026

Two tests in `scripts/history-scope.test.cjs` had failed since the research batches of 24 October.
Each guards a correction made for an earlier issue, and each batch rewrote the text it checks.

## Kuwait

`9eccf8a` (24 October) corrected the decree-law's number from "no. 59" to 159 of 2025. The history
batch the same day (`5d74c2d`, `history-kuwait-gap-2026-10-24.md`) rewrote the possession segment
and the `kuwait-drug-law-2025` entry and dropped the number. That note itself says Decree-Law
159/2025 was read, and the cited source's address decodes to «مرسوم بقانون رقم 159 لسنة 2025»
(Decree-Law No. 159 of 2025). The number is back in the possession text, the entry's description and the source
titles. Penalties (article 49: five years and KD5,000, ten years and KD10,000 in named places)
were already right.

## Hong Kong

`b2a7578` (#44) stated that cultivation carries 15 years and HK$100,000, and that manufacturing a
dangerous drug is a separate offence with up to life. The history batch `b22d7fd` rewrote
cultivation as "fifteen years" with the 2023 sentencing bands and moved the separate-offence
sentence to production only. No fact was wrong; the test matched the old wording. Cultivation now
says again that it is a separate offence from manufacturing, and the test accepts either spelling.

The new cultivation bands (under 5 kg below two years, 5–50 kg two to seven, 50–150 kg seven to
ten, above 150 kg more than ten) agree across the profile, the history entry and the article,
all citing HKSAR v Nguyen Thang Loi [2023] HKCA 103. The judgment and the Department of
Justice summary could not be opened from this environment, so they were not re-read here.

## So it does not happen again

`npm run history:test` now runs before every deploy, next to `answers:test`, and the workflow in
`docs/DATA-MAINTENANCE.md` says to run both before committing research. When one fails after
research, the corrected fact goes back in, or the test is loosened if it checked wording
rather than the fact.
