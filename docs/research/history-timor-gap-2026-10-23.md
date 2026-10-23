# Timor-Leste: final drug law and enforcement history — 23 October 2026

This batch adds six events, revises the 2017 law and September 2022 speech entries,
writes two articles and converts thirteen profile blocks to inline citations.
The principal correction is replacing an unfinalised bilingual copy with the
actual enacted law. Source files, full extractions, scripts and logs are retained
in `tmp/history-timor-gap-2026-10-23/`; exact metadata is in `sources.json`.

## Final law versus the former source

The former Ministry of Justice translation and Customs copy were downloaded and
examined (`law.pdf/.txt`, `customs.pdf/.txt`). They have blank approval fields,
a different preamble, different final article numbering and lower personal-use
penalties than the published Act. The Council of Ministers approval date is blank.
Their formal-looking law number does not make those versions reliable evidence
of the final enacted provisions.

The official Jornal da República, Série I No. 4 of **25 January 2017**, was then
downloaded (`gazette2017.pdf`, layout and raw extractions). Law 2/2017 occupies
printed pages 60–82. Relevant definitions, schedules and articles 6–7, 11–17,
22–29 and 49–50 were read with surrounding text. PDF page 8, printed page 66,
was visually inspected to confirm the personal-use rules and treatment provisions.

The final article 26 differs materially from the former source:

| Rule | Former bilingual copy | Final gazette |
| --- | --- | --- |
| Personal-use lower band | Six months / 60-day fine | One year / 120-day fine |
| Above five daily reference quantities | One year / 120-day fine | Two years / 240-day fine |
| Occasional user in lower band | Possible waiver | Possible waiver |
| Final commencement article | 53 | 50 |
| Cannabis seeds in Table I-C | No separate seed entry | Seeds not intended for sowing expressly included |

The daily reference table retains 1 g herbal cannabis, 0.5 g resin and 0.25 g oil.
These are reference quantities for penalty tiers, not lawful possession allowances.
The text keeps the multiplier rather than inventing a THC-adjusted calculation.
Growing solely for personal consumption is expressly within article 26; cultivation
outside that offence falls within unauthorised trafficking under article 7.

Article 50 commences the law the day after publication, establishing **26 January
2017**. The final text records parliamentary approval on **18 October 2016** and
promulgation on **23 January 2017**. The trade portal's December date is not used.
The new passage event uses the government's contemporary account, corroborated by
the final gazette, and remains debate until the enacted law's commencement.

The final preamble discusses inherited Indonesian Law 5/1997 and constitutional
incompatibilities. It does not establish that Timor-Leste could lawfully impose
capital punishment before 2017: it expressly notes the constitution's existing
absolute prohibition. No death-penalty abolition event is invented for 2017.

## Case reporting and political debate

- Lusa's full 31 January 2017 report, hosted by RTP, was downloaded and read
  (`pretrial2017.html/.txt`, plus body extract). It describes a five-plant case,
  initial reporting/passport conditions, a prosecution appeal and pretrial custody.
  Testing and alleged conduct were disputed. Pretrial detention is not described
  as a conviction or a final finding of trafficking.
- Lusa's full 20 October 2017 trial report was read (`conviction2017...`). It names
  Tony Crean, reports a three-and-a-half-year prison sentence for possession and
  trafficking, acquittal of consumption after a negative urine test and a planned
  defence appeal. The judgment and later appeal outcome were not recovered. The
  report's account of prosecution requests is not substituted for statutory maxima
  or used to resolve which historical provisions applied to alleged 2016 conduct.
- The National Police's complete June 2022 release was read (`police-import...`).
  It gives seizure on **1 June**, a press conference/court referral on **3 June**,
  and publication on **6 June**. A 43-year-old recipient was detained after a
  suspected marijuana parcel arrived from Ireland; the quantity was still under
  examination. The Tetum wording about propagation material does not establish
  a precise botanical form, seed viability or quantity. The event therefore says
  suspected marijuana parcel and is tagged trade/enforcement, not a proven seed
  import or a settled ruling about seed legality.
- TATOLI's full Indonesian-language 15 August report was read (`arrests2022...`).
  It places a joint operation on **11–12 August**, involving nine suspects and
  reported cannabis/methamphetamine seizures. Ambiguous hashish quantity wording
  is not converted into an invented weight. The event has month precision to cover
  the two-day operation. Allegations are not presented as established guilt.
- RTTL's complete 19 August report was read (`release2022...`). It records identity/
  residence declarations and periodic reporting, plus student opposition announced
  on Thursday 18 August. The custody decision is distinct from an acquittal.
- TATOLI's full Tetum report of **17 August** was read (`minister2022...`). Justice
  Minister Tiago Amaral Sarmento sought increased penalties and different trial
  arrangements, criticising the prosecution while acknowledging the judge's role.
  His reported description of article 7's penalties does not match the final law;
  only his policy request and attributed criticism are used, not that legal claim.
- The president's original **15 September 2022** parliamentary address was downloaded
  and read at its police-procedure/drug-policy passages, printed pages 10–12
  (`speech-sep.pdf/.txt`). It replaces the old Wikipedia citation. Ramos-Horta links
  Dili cannabis investigations to police legitimacy, argues for distinguishing
  cannabis from methamphetamine/heroin and advocates reconsidering prohibition.
  His clinical/economic claims and forecasts are not presented as verified outcomes.
- His original **28 November 2022** independence-anniversary address was downloaded;
  its relevant justice/drug-policy passage was read (`speech-nov.pdf/.txt`). It
  renews the medical-cannabis argument. It is supporting follow-up context, not
  another entry implying an implemented programme.
- Decree-Law 2/2025 was read at its opening and article 4(h) in the official
  **22 January 2025** gazette (`pharma2025.pdf/.txt`). It defines narcotics and
  psychotropic substances by reference to the 2017 law's Tables I–IV. That generic
  definition neither excludes cannabis from control nor establishes a cannabis
  patient-access programme. No such inference is made from general pharmacy rules.

## Profile and score treatment

The profile now uses the final law for possession, growing, consumption, sharing,
medical licensing, consequences and planting. Broad unsupported “None” product/
production claims and Wikipedia citations were replaced with specific statutory
rules. The seeds text now reflects the explicit final schedule entry. Existing
seed/clone classifications are preserved; an unlisted sowing purpose is not treated
as proof of a lawful import or a right to cultivate.

The enforcement section now uses actual reporting about a prison sentence and a
separate supervised-release decision, together with the statute's waiver, fine and
treatment options. These examples are not a nationwide sentencing-frequency study.
The six numeric scores remain possession 1, cultivation 1, enforcement 1, sharing 1,
consumption 1 and access 0 (overall 9). Further sentencing-practice evidence is
needed to strengthen the enforcement calibration. Medical remains none: general
licensing powers and presidential advocacy do not prove an operating patient route.

The penalty correction is a correction to what the 2017 law already enacted,
not a new 2026 tightening. The 2017 event remains `other`: the inherited regime's
cannabis-specific penalties have not been independently reconstructed well enough
to assign an aggregate directional score change. The first-restriction estimate
stays in place; the exact colonial prohibition is still an open research gap.

## Validation and commit scope

The scoped verifier passes for eight touched events, valid categories/tags, title
lengths, related links, source identity deduplication and inline citations. The
articles have **411 and 386 words**, each with four headings and country plus
contextual history links. All thirteen profile text blocks pass citation checks.
Current numeric scores and status/classification fields match the starting snapshot;
the score-chain check flags no transitions.

The production build passed: **3,881 pages in 46.02 seconds**. Rendered checks
passed for **73 citation links**, eight tag pages, history exports and the country
API with six segments and seven context blocks. The exact exported score remains
9, medical None. `git diff --check` passed. Generated site output is deleted after
verification; evidence and logs remain.

A separate Git index assembles only this batch's eight history objects, Timor-Leste
profile, two articles and this note. A parent-to-commit semantic audit checks that
all unrelated history entries are unchanged. The shared main index already contains
staged versions of some of these edits; refreshing it must preserve any unrelated
staged history objects and source-archive work rather than resetting the index.
