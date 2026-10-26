# Cameroon follow-up: the 1955 pharmacy-code order

26 October 2026. Follow-up to [the Cameroon pass](history-cameroon-gap-2026-10-21.md). That pass
left the 1955 Order 2772 entry `checked: false` because the local scan had not been recovered; it
had read the indexed one-page text and the French law that the order promulgated. The UN PDF is now
downloadable, so this note records the scan read and closes the unchecked status. No score changed.

## The document

**United Nations, E/NL.1956/147, 5 October 1957.** The one-page PDF is a scan of the French
transmission to the Secretary-General under Article 21 of the 1931 convention. It reproduces:

> ARRETE No 2772 DU 19 AVRIL 1955
>
> PROMULGUANT L'ARTICLE 6 DE LA LOI 53-1270 DU 24 DECEMBRE 1953 MODIFIANT ET COMPLETANT LES
> DISPOSITIONS LEGISLATIVES RELATIVES A LA REPRESSION DU TRAFIC ET DE L'USAGE ILLICITE DES
> STUPEFIANTS.

The order recites the decrees of 23 March 1921, 21 February 1925, 13 February 1937 and 16 April
1924, then the poisonous-substances decree of **9 October 1926** (promulgated by an order of **27
November 1926**) and the decree of **9 November 1937** (promulgated by an order of **10 July 1938**).
Article 1 promulgates Article 6 of Law 53-1270 of 24 December 1953 in Cameroon. Article 2 provides
for registration, publication and communication. The order is signed at **Yaoundé on 19 April
1955** by the Secretary General, Spenale, for the High Commissioner. The UN's 5 October 1957 date is
the circulation date, not the date of the order.

## What it confirms and what it does not

The scan confirms the entry's date, the instrument number, the promulgated article and the two
earlier decrees that the indexed text described. It does not print the French law's penalty and
treatment provisions; those remain supported by the OFDT gazette already cited in the entry
(Articles 3–4 and 6, Journal officiel of 25 December 1953, pp. 11535–11536). The order is a
pharmacy-code extension, not a general cannabis ban, so it does not date Cameroon's first
restriction. The 1900–1920 estimate remains.

The entry is now **checked: true**. Its category stays `other` and it remains unscored: the order
extends an existing narcotics chapter, and the comparison with the locally applicable predecessor
rules is still incomplete. The source locator now records the scan details and distinguishes the
1955 order date from the 1957 UN circulation date.

## Verification

- `node scripts/data-status.cjs`: 3,159 entries, 3,090 checked, 9 unchecked, 62 estimated first bans.
- `node scripts/data-status.cjs chain cm`: 1900 100 → 9 estimate; 0 flags.
- `npm run history:test`: 38 of 38 passed.
- `npm run answers:test`: 16 of 16 passed.
- `npm run build`: passed, 4,153 pages.
- Built page inspected: `/history/french-cameroon-pharmacy-drug-rules-1955/` shows the checked
  status and both references.

## Remaining gaps

- The original 1926 decree scan and its local publication remain unrecovered; the 1927 report
  reproduction is still the source for the 1926 rules.
- The 1955 local gazette was not read; the UN reproduction is the read text. The French law's
  Articles 3–4 and 6 were read from the OFDT gazette in the earlier pass.
- The 1976 poisonous-substances decree (76/214 of 4 June) is still identified only through legal
  inventories. The rules applied to British Cameroon and after reunification remain unread.
- The 2017 preliminary bill's fate is still unconfirmed. The 1900–1920 first-restriction estimate
  remains unverified; no earlier cannabis-specific instrument was found in this follow-up.
