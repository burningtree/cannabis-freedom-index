# Jersey follow-up: the 2024 Centenier fine and the criminal-record wording

26 October 2026. Follow-up to [the Jersey gap pass](history-jersey-gap-2026-10-26.md). That pass
verified `jersey-centenier-drug-fines-2024` against the enacted law and marked it checked, but its
description still said the fine was imposed "without a criminal conviction." Neither the enacted
law nor the current consolidation uses that phrase or addresses the criminal record. This note
reads an official 2025 report that does, and corrects the wording. No score changed.

## The law

The Crime (Public Order) (Jersey) Law 2024 (L.9/2024) was adopted on 7 February 2024, sanctioned
on 2 October 2024, registered on 11 October 2024 and came into force on 18 October 2024. Article
15 makes it commence seven days after registration. Article 13(3) inserts Article 28A after
Article 28 of the Misuse of Drugs (Jersey) Law 1978:

> (1) If a person is charged with an offence under Article 8(1) (restrictions on possession of
> controlled drugs) in relation to the possession of a Class B drug or a Class C drug and accepts
> the decision of a Centenier having jurisdiction in the matter, that Centenier may impose a fine
> of level 1 on the standard scale.
>
> (2) A Centenier who has imposed a fine under this Article – (a) must give a receipt for it; and
> (b) must, as soon as reasonably practicable, inform the Chief Officer of the States of Jersey
> Police Force of the details of the fine.
>
> (3) A fine imposed under this Article is to be paid – (a) as to one half, to the Consolidated
> Fund continued under Article 3(1) of the Public Finances (Jersey) Law 2019; and (b) as to the
> other half, to the parish in which the Centenier who imposed it had jurisdiction.

The section creates a summary fine for possession of a Class B or Class C drug. It does not use
the word "conviction" and does not say what appears on a criminal record. The current
consolidation carries Article 28A with endnote 40, which identifies L.9/2024 as the inserting
instrument.

## The official description

[P.116/2025](https://web.archive.org/web/2026id_/https://www.statesassembly.je/getmedia/1259b610-7ac2-4a15-a98a-877a4d13a53d/P-116-2025.pdf?ext=.pdf),
*Future approach to personal cannabis use in Jersey*, was lodged au Greffe on 19 December 2025 by
the Minister for Health and Social Services. Paragraph 29 states that Centeniers may impose a
fine (£200) where a person is charged with possession of cannabis (or importation of personal
amounts) and accepts the Centenier's decision. Paragraphs 31–32 place the process at Parish Hall
enquiries under the Attorney General's guidance. Paragraphs 34–36 describe the record:

> 34. Where a person commits a third offence of possession of a personal amount (or a second
> offence within less than 12 months after their first offence, or where the Centier [sic]
> determines a fine should be imposed), the Centenier may impose a fine (£200 for cannabis).
>
> 35. Where a fine is imposed, a record of that fine will be maintained by the Police, but it will
> not appear on the person's criminal record.
>
> 36. Parish Hall written cautions and fines are not addressed by the Rehabilitation of Offenders
> (Jersey) Law 2001; hence they stay on a person's police record in perpetuity.

The report is not the 2024 law; it is a ministerial proposition describing how the scheme
operates. It is nevertheless the official source for the record effect. The entry now says the
fine "is recorded by police but does not appear on the person's criminal record", which is what
paragraph 35 says. It no longer asserts a conviction-free process in the law's own words.

## Changes

- `jersey-centenier-drug-fines-2024`: description reworded; P.116/2025 added as source 3 and
  cited for the record effect. The id, date, category, `before` vector and checked status are
  unchanged.
- `countries/je.yaml`: the summary, possession and consequences text now use "criminal record"
  rather than "conviction"; P.116/2025 is added to the possession and consequences source lists.
  The `updated` date is 26 October 2026. Scores are unchanged.

The chain remains 1955-01-01 100 → 97, 1965 97 → 70, 1966-05-01 70 → 12, 1998 12 → 14,
2019-01-01 14 → 16, 2024-10-18 16 → 19, with 0 flagged steps.

## Limits

The Attorney General's Directions and Guidance for Centeniers (linked from P.116/2025 footnote
14) were not read for this note. P.116/2025 is a proposition, not a court judgment; it describes
the record effect but does not decide the legal status of a Centenier's fine. The original
P.97/2023 proposition and any explanatory report for the 2024 law were not recovered, so the
legislative intention is taken from the enacted text and the later official report. The direct
States Assembly PDF was Cloudflare-blocked; the copy read was the Wayback Machine capture of the
same PDF. P.116/2025 describes the scheme as it stood in December 2025 and is not an enacted
change to the 2024 law.

## Validation

- `node scripts/data-status.cjs chain je`: six steps, 0 flagged.
- `npm run history:test`: 39 passed.
- `npm run answers:test`: 16 passed.
- `npm run build`: 4,164 pages. The count includes unrelated uncommitted Iraq entries present in
  the working tree, so it is not a Jersey-only count.
- `git diff --check`: clean.
