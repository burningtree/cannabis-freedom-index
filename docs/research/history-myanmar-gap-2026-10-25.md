# Myanmar: closing the 1874–1974 history gap, 25 October 2026

Myanmar's timeline jumped from the 1874 prohibition to a 1939 entry that scored the colony at 49,
close to a fully licensed market, on the strength of a Wikipedia sentence. The 1946 enforcement
entry was unchecked, and the 1974 ban cited Wikipedia and a UNODC article for a law whose text had
not been read. This pass recovered the 1939 scheme's limits, checked the 1946 report, replaced the
1974 summary with the law itself, and wrote an article on the 1939 rules.

## Sources actually read

- **United Nations, E/CN.7/W.43, Summary of annual reports of governments for 1947** (15 April
  1949), printed pp. 67–68 and 99. The Burma narrative says hemp cultivation, formerly prohibited
  throughout the country, was permitted from 1939 under licence as part of a scheme for the sale of
  ganja to Indians in Burma, with the crop supplied to the government under contract. The 1946
  country paragraph (p. 99) says the Intoxicating Drugs (Ganja) Rules, 1939, were issued "to
  legalize the sale of ganja to Indians only"; that they remained in force; that the government
  made no sales in 1946 and issued no cultivation licences; that illicit cultivation in the hills
  of the Pegu Yomas was the main supply for Indian users; and that 216 hemp-drug prosecutions were
  brought, 208 successfully. The PDF was downloaded from the UN Digital Library and read as text.
- **Joel Fort, "Giver of delight or Liberator of sin: Drug use and 'addiction' in Asia"**,
  *Bulletin on Narcotics*, 1965, issue 3, pp. 1–11, Burma section. It records government shops in
  at least Rangoon and Mandalay selling cannabis (ganja) primarily to the Indian population before
  the Japanese occupation. This corroborates the commercial form of the 1939 scheme.
- **Narcotics and Dangerous Drugs Law, 1974 (Law No. 5 of 1974)**, communicated by Burma to the
  United Nations as E/NL.1974/17 on 17 June 1974, five printed pages. The law is dated Rangoon,
  20 February 1974, and says it came into force at once. It defines narcotic and dangerous drugs to
  include cannabis products; prohibits cultivation, production, manufacture, possession, transport,
  import, export, external dealing, transfer and sale; sets five to ten years and a 10,000 kyat fine
  for cultivation, production, possession, transport and transfer; and sets ten years to an
  unlimited term, a 50,000 kyat fine or death for manufacture, import, export and sale. Addicts
  had to register, and breach of the government's treatment directions carried six months to three
  years.
- **Library of Congress, "The Narcotics Control Laws of Burma"**, prepared by Mya Saw Shin,
  November 1994. Read for the amended law's definitions, penalties and treatment provisions. It
  describes the law as amended in 1983 and 1988. It is not cited in the revised 1974 entry because
  the original text is now the source, but it was used to check that the later version kept the
  same structure.

## Database changes

- Revised `myanmar-licensed-1939`. The entry now says the rules legalised sale to Indians only,
  that cultivation was licensed to supply the government under contract, that government shops in
  at least Rangoon and Mandalay sold mainly to Indians, and that the rules survived the war but
  produced no sales or cultivation licences in 1946. It is `checked: true`, links the 1874, 1931,
  1946 and 1974 entries, and cites E/CN.7/W.43 and the 1965 Bulletin.
- Revised `burma-ganja-sales-prosecutions-1946`. The verified description is kept, inline
  citations added, and the entry is `checked: true` with the locator "Printed p. 99, Burma (1946)
  paragraph". It remains an unscored `enforcement` entry.
- Revised `myanmar-narcotics-law-1974`. The date is tightened from `1974-02` to `1974-02-20`, the
  day the law is dated and came into force. The description now gives the original law's offences,
  penalties and treatment registration, and cites E/NL.1974/17 and the 1985 UNODC article. The
  Wikipedia and 1985-only source list is replaced.
- The earlier reading note warned that the death penalty should not be attributed to the original
  1974 law because the Library of Congress summary covers the law as amended in 1983 and 1988.
  The primary text settles the point: section 5(b), 8(b) and 10(b) of the 1974 law already provide
  death for manufacture, import or export, and sale. The entry now attributes those penalties to
  the original law. The 1983 and 1988 amendments are no longer needed to explain them.

## The score correction

The old 1939 entry had no explicit after-vector. The next entry's `before` supplied one:
`{possession 6, cultivation 3, enforcement 6, sharing 3, consumption 5, access 6}`, a total of 49.
That is the vector used elsewhere for a general licensed market, and it badly overstates the 1939
rules. Burma did not legalise personal growing, did not open sale to the general population, and
kept the criminal prohibition for everyone the rules did not classify as Indian. The shops were a
government monopoly, not a licensed private market.

The corrected after-vector is `{possession 2, cultivation 1, enforcement 2, sharing 1, consumption
2, access 2}`, a total of 17:

- **Possession 1 → 2.** An Indian consumer could buy lawfully, but possession stayed a crime for
  everyone else, and the lawful route was tied to government sale.
- **Consumption 1 → 2.** Use through the lawful channel was no longer treated as an offence;
  outside it, the old prohibition remained.
- **Access 0 → 2.** A lawful source existed, but only for one community and only through
  government shops.
- **Cultivation, enforcement and sharing unchanged.** Personal growing remained illegal;
  cultivation licences were commercial contracts to supply the state. Enforcement still relied on
  prosecution, and the 1946 figures show it. Sharing was not legalised.

The 1974 entry was re-based to the same vector, so the chain reads 1874 `100 → 11`, 1939 `11 → 17`
and 1974-02-20 `17 → 4`. The 1974 drop is large because the new law criminalised possession and
cultivation for the whole population and added long prison terms and death for supply offences.

## Articles

- `articles/myanmar-licensed-1939.md` covers the racial limit of the scheme, the licensed growing
  system, the government shops, the wartime break, the 1946 prosecutions, and the 1974 ban. It
  links the 1874, 1931, 1946 and 1974 entries and the Myanmar profile.
- `articles/myanmar-narcotics-law-1974.md` covers the heroin epidemic behind the law, its
  definition of narcotic drugs, the offences and penalties, the treatment registration system, and
  the 1983 and 1988 amendments. It links the 1993 entry and the country profile.

## Remaining gaps and blocked leads

- The text of the Intoxicating Drugs (Ganja) Rules, 1939, was not read. The Myanmar Law Information
  System page (`https://www.mlis.gov.mm/mLsView.do?lawordSn=11364`) timed out repeatedly from this
  environment, and no archived copy was found. Search-engine snippets show a chapter numbered
  XXX with rules 196–220, rule 198 allowing an Indian consumer to possess up to five tolas bought
  from a Government Ganja Shop with a ticket under rule 208, rule 203 limiting the number of shops,
  rule 206 allowing a Resident Excise Officer or licensed retail vendor to sell to an Indian
  consumer, and rule 220 governing retail licences. These details are not used in the entry or
  article because the page was not opened and read. They are a strong lead for a future pass.
- The 1939 rules' exact date, and whether they were made under the Excise Act or another
  instrument, remain unverified. The UN report supplies the year and the purpose, not the gazette
  date.
- The 1946 report gives no figures for the number of shops, the quantity sold before the war, or
  the size of the illicit crop. The Pegu Yomas reference is qualitative.
- The 1983 and 1988 amendments to the 1974 law were not read. The Library of Congress summary
  describes the amended text but does not say which amendment introduced which change. The 1993
  narcotics law was not re-read in this pass.
- The 1931 Dangerous Drugs Act entry remains a context entry and was not changed.

## Validation

`node scripts/data-status.cjs chain mm` gives 1874 `100 → 11`, 1939 `11 → 17` and 1974-02-20
`17 → 4`, with no flagged steps. `npm run history:test` passed 38 tests, `npm run answers:test`
passed 16, and `npm run build` built 4,142 pages. The three history pages and the new 1974 article
were checked in the built output: every citation mark resolves to a reference on the same page,
every listed source is cited, and all internal links point to pages that exist.
