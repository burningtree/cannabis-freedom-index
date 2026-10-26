# Afghanistan follow-up: the 1997 Taliban radio ban

26 October 2026. Follow-up to [the Afghanistan early pass](history-afghanistan-early-2026-10-21.md).
That pass added `afghanistan-taliban-radio-hashish-ban-1997` unchecked because the UN PDF
download returned an empty file or 403, and only an indexed paragraph had been read. This note
reads the complete PDF and closes the check. No score changed.

## The document

**UN General Assembly, A/52/493, 16 October 1997.** Note by the Secretary-General transmitting
the interim report of the Special Rapporteur on the situation of human rights in Afghanistan,
Mr Choong-Hyun Paik. The PDF is 42 pages; paragraph 130 is on printed p. 33. The copy read was
downloaded from the UN Digital Library on 26 October 2026 (101,082 bytes; PDF creation date
6 November 1997).

Paragraph 130 reads:

> The Taliban authorities are reported to have taken measures to ban the cultivation, sale and
> use of illegal drugs and have warned that anyone engaging in this type of activity would be
> punished. It was reported that Radio Shariah had announced on 20 August in Kabul that the
> production, sale and taking of both heroin and hashish were banned. The Taliban representative
> in Islamabad informed the Special Rapporteur that in addition to constituting a hazard for
> health, drugs were considered as bad in Islam and voiced the readiness of the Taliban to
> cooperate with the international community in eradicating them. He indicated that one of the
> ways to address the issue was to provide the farmers growing opium poppy with an incentive to
> plant alternative crops and provide them with agricultural tools, seeds and fertilizers. It was
> reported that the Taliban authorities had announced that smugglers addicted to drugs were
> arrested, beaten up on a daily basis and left in cold water for three hours.

The paragraph is explicit that the radio announcement is reported, not a text issued by the
Taliban. It also places the announcement in the wider human-rights report, not in a drug-law
survey.

## What changed

- `afghanistan-taliban-radio-hashish-ban-1997`: `checked: true`; the locator now records the full
  PDF read and the missing original broadcast. The description adds the 20 August date, changes
  "seeking cooperation" to "expressed readiness to cooperate", and specifies that the alternative
  crops were for opium poppy farmers. The `unscored` reason is unchanged.
- No score change. The chain remains 1924 100 → 7, 1973 7 → 1; the 1997 announcement is not a
  scored step because it was a reported radio announcement by one authority in a civil war, not a
  verified nationwide law.

## Limits

The original Radio Shariah broadcast or a Taliban decree has not been recovered. The report is a
human-rights interim report, not a drug-law text, and it does not establish the announcement's
implementation, its territorial reach, or whether the Taliban enforced it against hashish as well
as heroin. The report's language ("are reported", "it was reported") is retained in the entry. No
article was written: the source is a brief report mention, and the prior pass's reasons for not
building one on an unverified order still apply.

## Validation

- `node scripts/data-status.cjs chain af`: 1924 100 → 7, 1973 7 → 1; 1997 unscored; 0 flagged.
- `npm run history:test`: 39 passed.
- `npm run answers:test`: 16 passed.
- `npm run build`: 4,166 pages (includes unrelated uncommitted Iraq entries in the working tree).
- `git diff --check`: clean.
