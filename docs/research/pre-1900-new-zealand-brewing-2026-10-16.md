# New Zealand: cannabis restrictions in the brewing trade

Research date: **16 October 2026**. Added one history entry and one article:
`new-zealand-brewing-cannabis-restrictions-1869`.

## Primary evidence examined

Downloaded the **New Zealand Gazette, No. 63, 11 November 1868**, from the
Victoria University of Wellington Library's historical gazette archive.
Read the Customs notice dated **3 November 1868**, printed **pp. 527–528**,
PDF pages **7–8**. Extracted the text and visually checked both complete pages,
including commencement, the cannabis name, section numbers and penalties.

[Original gazette scan](https://library.victoria.ac.nz/databases/nzgazettearchive/pubs/gazettes/1868/1868%20ISSUE%20063.pdf).

The notice reproduces brewing and spirit-merchant provisions of the
**Distillation Act 1868** and expressly announces that they take effect on
**1 January 1869**. The entry uses this operative date, not the year in the title.

| Provision | Verified operation |
|---|---|
| 131 | Public brewers prohibited from using named drugs, including **cannabis indicus**, and specified preparations in beer, ale, porter or worts; £200 first-conviction penalty; subsequent offence a misdemeanour, fine up to £500 and imprisonment up to two years with or without hard labour; affected beer/worts forfeited and seizable. |
| 132 | Possession restriction for brewers and beer retailers, except medicinal or domestic purposes; burden on possessor; £50 and seizure/forfeiture. |
| 133 | Knowing sale, disposal, sending or delivery to brewers/beer retailers restricted, with **medicinal-purpose** exception and burden on supplier; £50. The domestic-purpose exception in section 132 is not repeated here. |
| 134 | £50 for knowingly selling/disposing of, or having found on one's premises, spirits, ale, beer or porter containing the named substances or other deleterious/poisonous substances. |

These are **trade-specific controls**, not proof of a general possession or
cultivation ban. The scan supplies no cannabis-specific prosecution statistics
or evidence that cannabis was commonly added to beer. Those claims were not
imported from secondary generalizations about drug adulteration.

The later general-control entry `new-zealand-dangerous-drugs-1927` is linked as
related context. No `before` vector was invented, and no scores or profiles
were changed.

## Retrieval and source limits

The official New Zealand Legislation site has indexed electronic text for the
1868 Act, including sections 1 and 131–134. Direct retrieval of its current and
legacy paths returned **HTTP 202 with empty bodies**; the in-app browser also
displayed an empty page. The downloaded `nz1868.pdf` was zero bytes and was not
used as a read PDF. The **gazette reproduction**, successfully retrieved and
visually checked, is the substantive public citation.

A *Lyttelton Times* editorial of **30 November 1868** is indexed at Papers Past
and quotes the same provisions with the January commencement. It was a useful
lead, but its page did not open successfully; no second citation is presented
as an independently read full source.

Broader pharmacy/poison searches did not justify additional entries in this pass:

- New Zealand's generic 1871 poison law was not promoted into a cannabis law
  without proof of cannabis coverage.
- Queensland/Victoria nineteenth-century poison controls cannot be assumed to
  include cannabis from later drug legislation or opium restrictions.
- A downloaded text of *The Chemist and Druggist*, 15 January 1883,
  `b19974760M0305`, contains a section headed “New York Poison Laws” that reproduces
  the 1860 schedule. It does not resolve the separately documented 1862 amendment;
  its later publication date does not turn it into an 1883 cannabis enactment.
- French 1845/1846 poison legislation remained a lead: no cannabis-specific
  coverage was established from an original text, so no French ban was added.

Downloads, OCR and page renders remain in ignored `tmp/pre-1900-brewing/`.

## Validation

Validation results follow after the build. The entry's `checked: true` refers
to the original gazetted reproduction actually read; enforcement history and
possible earlier antecedents remain open.

- `npm run build` passed: **3,065 pages**.
- The generated article page and JSON export record were checked for date, title,
  ID and the medicinal/domestic-purpose distinction.
- Unique entry IDs and article front matter validated.
- New Zealand's structural score-chain check has **zero flagged steps**. No
  existing score vectors were edited.
- `git diff --check` and `git diff --cached --check` passed.
- Wayback availability found a copy of the gazette PDF; the archive index was
  merged while preserving unrelated records.
