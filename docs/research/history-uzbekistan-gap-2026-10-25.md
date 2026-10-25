# Uzbekistan: personal holdings, court guidance and public use

Research checked on 25 October 2026. Read `DATA-MAINTENANCE.md`, `WRITING.md`,
`BOOKS.md` and the existing Uzbek history/profile before editing. No book was
used. Uzbekistan had seven history entries; this pass adds three and two articles.

## Sources actually read

- Original [administrative code](https://lex.uz/docs/97661?ONDATE=01.04.1995),
  article 56, and [criminal code](https://lex.uz/docs/111457?ONDATE=01.04.1995),
  articles 270, 273 and 276. Lex.uz commencement metadata gives **1 April 1995**
  for both; adoption was 22 September 1994. Small personal holdings already had
  a fine or administrative detention in that original edition. Ordinary growing
  allowed a fine, corrective work or imprisonment up to three years.
- [1987 Soviet edict](https://meganorm.ru/mega_doc/dop1/62/ukaz_prezidiuma_vs_sssr_ot_21_06_1961_o_dalneyshem/0/ukaz_prezidiuma_vs_sssr_ot_22_06_1987_N_7226-XI_o_vnesenii.html),
  section I, points 1 and 3–4: five-year ordinary Indian-hemp growing ceiling;
  administrative small holdings followed by a criminal repeat offence within a
  year. This is the Union text, not the original Uzbek implementing amendment.
- [Supreme Court resolution, original 28 April 2017 edition](https://lex.uz/ru/docs/3203272?ONDATE=28.04.2017),
  paragraphs 4, 19–21, 26 and 34, compared with the consolidated version. Small
  personal holdings are administrative; gifts/loans/debt repayment count as
  supply; evidence of supply intent must be considered together; sowing is a
  completed offence before germination. Ordinary cultivation covers areas below
  250 square metres. The ruling interprets existing offences and is context.
- [Original November 2025 decree](https://lex.uz/ru/docs/7818779?ONDATE=08.11.2025),
  sections I–II and programme annex: paragraph 4 **approves proposals** for code
  amendments; paragraph 3 orders a replacement narcotics bill. The previous
  history description incorrectly treated these as enacted code penalties.
  Decree signed 3 November; effective **8 November 2025**.
- [Law ZRU-1151](https://lex.uz/ru/docs/8276699), relevant criminal and administrative
  amendments and article 8. Effective **12 June 2026** on publication. Its criminal
  amendments apply to offences committed after commencement. Public use has
  its own administrative offence with a prescribed-medical-use exception.
- Current criminal code edition **15 October 2026 (01)** and administrative code
  edition **12 September 2026 (02)**, selected explicitly. Articles 270–276,
  56, 131 and 187¹. The default URLs also expose future December 2026 editions;
  those future changes were not used. Lex.uz labels Russian 2026 translations
  unofficial. No disputed translation was resolved by silently treating it as
  the official Uzbek original.
- [1934 Soviet decree reproduced by Istmat](https://istmat.org/node/42491),
  articles 1 and 5–7: exclusive medical/scientific crop exception, criminal
  liability, confiscation, republic implementation and express **1935** start.
- [Anhor report of 17 December 2025](https://anhor.uz/news/v-uzbekistane-38/),
  read through the web tool after a local fetch returned 403. Its figures cover
  articles 271 and 273, not article 276. Article 271 means appropriation/theft,
  not lesser personal possession. Corrected that classification without changing
  the counts or presenting these supply/theft figures as personal-user data.

The ignored local extraction directory is
`tmp/history-uzbekistan-gap-2026-10-25/`. Search snippets were leads only.

## Score handling and limits

Current possession **1 → 2** reflects the small-quantity administrative offence
with detention: it is less restrictive than blanket criminal liability, but
cannot receive the fine-only level 3. Cultivation **0 → 1** reflects the separate
ordinary growing band with fines and a three-year prison ceiling. It is still
criminal; medium-area/group/repeat and organised/large-area offences remain
separate. Enforcement stays 1; there is no new representative evidence of the
frequency of imprisonment of cannabis users. Sharing, consumption and access
stay unchanged. Exact total becomes **10.5**, displayed as **11**.

The 1995 code event records the move from the documented Soviet repeat-small-
possession offence and harsher ordinary cultivation band to the national-code
rules. Its before vector is 1/0/1/0/1/0, and its after is 2/1/1/0/1/0. This dates
the newly verified national regime, **not the first ever administrative exception**:
the 1987 Union text already had an administrative first offence. The exact Uzbek
republic implementation/repeal chronology before April 1995 remains open; the
Union adoption date is not substituted for an unknown Uzbek amendment date.

The early aggregate retained before the 1995 event is provisional, as in the
previous history. The 1935 cultivation decree alone cannot establish the dates
of every possession, supply, use and access restriction in that aggregate.
Recover the Uzbek republic's original criminal/admin texts and amendments before
splitting those earlier score changes. Do not describe this pass as a complete
first-ban reconstruction. The old `1934` id remains stable for links, but its
public event date is now 1935.

The 2026 public-use offence remains inside consumption level 1. Its new supply
and laboratory bands do not change the personal-user enforcement score. The
2025 decree is debate/context; the 2017 interpretive ruling is other/context.

## Still open

- Original Uzbek SSR drug amendments, including the 1974 Union decree's actual
  implementation, the 1987 amendment and any late-Soviet repeal.
- Official quantity tables and cannabis-specific grams. No gram limits inferred
  from "small", "not large" or from another republic's law.
- Full original 1999 law and commencement resolution; the existing adoption-date
  entry is not recast as a verified commencement.
- Original 2020 amending law and industrial-hemp regulations: the existing event
  uses the signing date, although its consolidation footnote records publication
  on 18 March. Check commencement before moving the date or rewriting that article.
- Registration/treatment rules and current patient access, which still rely on
  the older civil-society submission in unedited profile context sections.

## Validation

- 36 history tests and six answer/profile tests passed. The existing Uzbek
  regression now checks administrative article 56 and the detention ceiling;
  the article 273 check accepts either initial capitalisation.
- Production build passed: 4,110 pages.
- Compared parsed history objects against the pre-edit snapshot: exactly three
  new events and three revised existing events; unrelated history unchanged.
- Checked all three touched articles for 350–500 words, four headings, valid
  citations and history links. Checked 74 rendered citation targets, links,
  JSON/CSV exports and the exact annual/current score chain.
- Desktop and mobile browser checks found no horizontal overflow. Article
  screenshots were visually reviewed; the country page also loaded successfully.
- Preserved the pre-existing staged and unstaged `source-archive.json` work and
  excluded it from this commit.
