# Writing for Culture: the cultural atlas

Culture (`/culture/`) is the way in to what the site knows about cannabis in culture. The index
says what the law allows; Culture says what the law was written over: the words people have for
the plant, the customs it belongs to, the people who kept using it. This file says what belongs
in each part, what an entry should focus on, and how to write one.

Read it together with `docs/DATA-MAINTENANCE.md`. The rules there about sources, pictures and
history entries apply here too.

## The four parts

| Part | Address | What it holds | Made of |
|---|---|---|---|
| Language | `/culture/language/` | Words for the plant, its products, its tools and the acts around it | `culture/language/*.md` |
| Traditions | `/culture/traditions/` | Things a community does with cannabis, again and again | `culture/traditions/*.md` |
| People | `/culture/people/` | People whose campaigns, faith, research or politics changed what the law did with cannabis | `culture/people/*.md` |
| Stories | `/culture/stories/` | Personal experiences and ethnographic accounts, gathered from the public | The participatory project; nothing is collected yet |

## Where does it go?

Ask what the subject is.

| The subject is… | It goes in | Example |
|---|---|---|
| A word, name, spelling or piece of slang | Language | ganja, dagga, 420, sinsemilla |
| The name of a thing whose interest is the thing itself | Traditions | the sebsi, sambe, the coffeeshop |
| A practice repeated by a group: a ritual, festival, craft, dish, remedy, yearly gathering, social institution | Traditions | bhang at Holi, Hash Bash, cannabis social clubs |
| A place whose importance is a sustained cannabis-related social practice or community | Traditions | Pusher Street, Freak Street, the gatherings at Hôtel Pimodan |
| One dated event: a law, ruling, report, arrest, a single demonstration | `changes.yaml` (the history), with an article in `articles/` if it deserves one | Jamaica's 2015 act, the first Global Marijuana March |
| What people thought of cannabis and its users at some time and place | A history entry | the 1894 Hemp Drugs Commission |
| One person whose work changed what the law did | People | Harry Anslinger, Leonard Howell, Raphael Mechoulam |
| A first-hand account | Stories, when it opens | — |
| A strain, brand, shop or product review | Nowhere | — |

When a subject is both a word and a custom, write two entries only if each has enough of its own
to say: *kif* is about the word and how its meaning drifted; *kif and the sebsi* is about the pipe
and the way of smoking. Otherwise write one and list the word under `also`.

Anything found during research that is a dated event goes into `changes.yaml` as well, and a
finding that changes what a country allows today goes into its country file and score. Culture
entries link to history; they do not replace it.

## What Language is about

An entry answers, in this order of importance:

1. **What exactly it names.** Which part of the plant, which preparation, which act. Many words
   mean something narrower where they come from than where they ended up (bhang is the leaf,
   ganja the flower, charas the resin).
2. **Where it comes from.** The language, the older form, the first time it is written down and
   by whom. Where the origin is disputed, give the competing theories and say which are doubted
   and by whom. A folk etymology is worth telling as long as it is called one.
3. **How it travelled.** Words follow people: traders, indentured labourers, enslaved people,
   soldiers, sailors, tourists, record labels. Say who carried it and when.
4. **What the law did with it.** Statutes choose words. Note where a word is a legal term, where
   a law was named after it, and where officials picked one word over another on purpose
   ("marihuana" in the United States of the 1930s).
5. **What it says about the speaker.** Stigma, class, race, generation, pride. Whether the word
   is an insult, a neutral term or one that has been taken back.
6. **Its relatives.** The same word in other languages, the words it replaced, the slang that
   grew from it. A table is the right form when there are more than four.

Give the `spelling`: the word in its own script, the language and, where known, how it is said.

Not for Language: strain names, product names, and slang that has no history beyond "people say
it".

## What People is about

An entry is about a person because of what they did to, with or against the law on cannabis:
wrote it, enforced it, defied it, studied the plant it bans, or changed it. Fame alone is not a
reason. An entry answers:

1. **What they did that touched the law,** with dates, and the history entries that record it.
2. **Why,** in their own words where a source gives them, and what their contemporaries said.
3. **What came of it:** the law, the ruling, the discovery, the movement, and how it is judged now.
   Where a person's claims were wrong or their methods harmful, say so on the evidence.

Give `life` ("1892–1975") and, in `origin`, what they were ("American narcotics official").
`countries` are the countries where they worked. A portrait is the right picture here. Do not
write about private life beyond what explains the public work.

## What Traditions is about

An entry answers:

1. **Who does it, and where.** The community, named as it names itself, and the places. Cover
   the whole area where the custom is kept, not one town from one source.
2. **What is done.** The occasion, the season, the preparation, the tools, the order of events.
   Concrete detail: what is ground, in what, mixed with what, by whom.
3. **What it means to those who do it.** In their terms where a source gives them. Do not
   explain a living religion from the outside as superstition or as an excuse.
4. **How old it is, and how we know.** Separate what is documented from what is claimed. Say
   when the only account is an outsider's (a colonial official, an explorer, a missionary).
5. **What the law made of it.** This is the link to the index, and every entry needs it: an
   exemption written into the law, tolerance in practice, a licence, prosecution, or a ban that
   ended the custom. Name the laws and link the history entries.
6. **Where it stands now.** Still kept, fading, revived, or commercialised for visitors.

Traditions includes modern institutions and yearly gatherings (the coffeeshop, social clubs,
4/20 rallies) when they have lasted long enough to have customs of their own. It includes uses
that have nothing to do with intoxication (hemp cloth, hemp-seed dishes, ritual rope) because
the law so often failed to tell the two apart.

Not for Traditions: a single event, a company, a piece of legislation as such.

## Which entries are featured

Each part has a short ranked list of its most important entries, set with `featured: 1`, `2`, …
in the front matter. They come first on the part's page in that order, and the first five are
shown on the Culture page, the first of them as a large card. Everything else follows
alphabetically.

An entry deserves a place by importance to a reader who knows nothing yet, in roughly this order:

1. **Reach.** Words and customs known across many countries (*ganja*, *hashish*, *marijuana*),
   or practised by large numbers of people (bhang at Holi, the Rastafari sacrament).
2. **Weight in law.** Entries that a law was written around or because of: an exemption, a
   named statute, a court ruling (bhang and the 1961 treaty, the coffeeshop).
3. **Explanatory power.** Entries that make other entries make sense (*cannabis*, the Scythian
   vapour bath as the oldest account).

Keep each list to about ten. Number 1 must have a picture. Change the ranks when a better entry
is written; do not add ties.

## The shape of an entry

```markdown
---
title: Bhang
summary: One or two sentences. Shown on cards, under the title and in search results.
origin: Hindi                      # language entries: where the word is from, in a few words
spelling:                          # language entries: the word in its own script
  - { text: "भांग", lang: Hindi, say: "bhāṅg" }
also: [bangue, bang]               # other spellings, related words, names to be found by
countries: [in, ir]                # file names in /countries, the most closely tied first
history: [india-bhang-exemption-1961, india-ndps-act-1985]   # ids in changes.yaml
history_cards: [india-bhang-exemption-1961]                 # only events directly about this atlas subject
related: [traditions/bhang-at-holi, language/ganja]          # optional: closest atlas entries first
image:                             # the lead picture, optional
  src: ../../src/assets/culture/example.jpg   # a local file, relative to this Markdown file
  alt: What the picture shows
  caption: One line under the picture.
  credit: Author, licence, via Wikimedia Commons
  credit_url: https://commons.wikimedia.org/wiki/File:Example.jpg
featured: 3                        # optional: rank among the part's most important entries
model: opus-5.5
written: 2026-10-14
sources:
  - title: Publisher — headline (date)
    url: https://…
---

The body in Markdown.
```

**Length.** 500 to 900 words of body. Shorter only when the sources are thin, and then say less
instead of padding. (History articles in `articles/` stay compact at 350 to 500 words; Culture
entries are reference pieces and are meant to be read at leisure.)

**Structure.**

- Open with one or two paragraphs that would stand alone: what it is, where, and why it matters.
  No heading above them.
- Then three to five sections with `## ` headings that say what is in them ("From Bengal to the
  Caribbean", not "History").
- End with the law or the present day, whichever is the later news. No summary paragraph.

**Tables.** Use one where the content is a set of like things: a word in several languages, the
rules of an institution, the laws of several countries on one custom, the stages of a
preparation. One or two per entry. Never a table of prose.

**Quotations.** A short quotation from a primary source (a law, a traveller, a commission) is
worth more than a paraphrase. Quote only what the source that was read actually prints, and say
who is speaking.

**Pictures.** Every picture is a file in the repository, under `src/assets/culture/` (or
`src/assets/articles/` for history articles), never a link to another site. Astro resizes and
converts them at build time: the lead picture is drawn with `<Picture>`, the cards and the
country pages with `<Image>`, and pictures in the text are optimised the same way.

1. Download the file from its original source (prefer Wikimedia Commons; the 1280-pixel version is enough) into
   `src/assets/culture/`, with a short lower-case name: `nepal-charas.jpg`.
2. Lead picture: put its relative path in the front matter, as above.
3. Further pictures go in the text where they belong, as a Markdown image whose title holds the
   caption, the credit and the link to the file's page, separated by ` | `:

```markdown
![What it shows](../../src/assets/culture/nepal-charas.jpg "Charas from Nepal. | CFynn, CC0, via Wikimedia Commons | https://commons.wikimedia.org/wiki/File:Nepal_Charas.jpg")
```

The site turns that into a figure with the caption and credit underneath. Rules:

- A picture must show the subject itself: the thing, the act, the place or the people. No
  buildings of institutions, no generic leaves, no portraits of officials (except in People, where the person is the subject).
- Prefer openly licensed or public-domain images when a good, relevant one is available.
  If no suitable open image is found, a well-sourced photograph or illustration may be used
  without a confirmed open licence; do not hold up the entry solely for that reason.
- Always credit the photographer or creator when known and link to the original source.
  Include the licence and its link when verified; never invent a licence or imply that
  attribution itself grants permission. Record unconfirmed reuse terms in the research notes.
- Look at the downloaded file before writing the caption.
- Write the caption from what the file's own description says. Do not guess a place or a date.
- Two to four pictures in a long entry is plenty. None is better than a wrong one.

**Links in the text.** Link generously, so that a reader can go and find out more:

- An outside link for each person, book, law, place, festival or institution that has a good
  page of its own: the text of the law, the report itself, a museum's page for the object, the
  Wikipedia article. Write it as an ordinary Markdown link. The site adds the arrow-in-a-square
  sign and opens it in a new tab.
- Link the first mention only, and put the link on the name, not on "here" or "this page".
- Link to this site with an address that starts with a slash: `[the 1985 act](/history/india-ndps-act-1985/)`,
  `[ganja](/culture/language/ganja/)`, `[Jamaica](/country/jm/)`. Culture entries should link
  to one another wherever one explains a word the other uses.
- Links to countries, history entries and culture entries get a hover preview on the site (data in `/previews/*.json`), so a reader can check what is behind a link without leaving the page. Link the precise history entry, not the history index.
- A link is not a source. What the text states must still rest on the `sources` list. Cite it inline with `[@n]` after the sentence it supports (docs/WRITING.md, Citations).
- Only link a page that was opened and exists.

## Countries and links

- `countries` lists where the word is said or the custom kept **according to a source that was
  read**. Not where it probably is. The first country is the one most closely tied to it.
- Each country listed gets the entry on its profile, in the left pane. So a wrong country shows
  up as a wrong claim about that country.
- A country may be listed for a law about the custom (Italy for its Rastafari ruling) when the
  text says so.
- `history` lists the entries the text mentions or relies on, including legal background. These
  appear in the atlas entry's history list. If the text names a law that has no history entry,
  add the entry to `changes.yaml` first.
- Every id in `history` must be mentioned and linked in the text (`/history/<id>/`), and every
  history entry the text links to must be in `history`. The build fails otherwise. When a new
  history entry concerns a person, word or tradition that has an atlas entry, add it to that
  entry's `history` (and `history_cards` if it is about them) and write it into the text with a link.
- `history_cards` selects which of those events should show this entry under **In the cultural
  atlas** on the history page. Use it only when the event is specifically about the word,
  preparation, community, place or institution. Each selected id must also be in `history`.
  A background citation, a shared country or an incidental link in a history article is not
  enough. Omission means no reverse cards. The first Cannabis Cup shows The Cannabis Cup,
  not Indica and sativa or Kush; a general national cannabis ban should not show every local
  dish, slang word or tradition that mentions it.
- Beside each entry the page lists up to eight related words and traditions. They are worked out
  on their own: entries the text links to or that link to it, entries sharing history entries,
  and entries kept in two or more of the same countries. Use `related` to put the closest ones
  first, or to tie in an entry the rules above miss (Chamba to Dagga, Zatla to Kif).

## Sources and care

- Every statement of fact rests on a listed source that was opened and read, or on a checked
  history entry of this site. General knowledge is not a source.
- Prefer any source that can be opened to Wikipedia, including for etymology and for a custom.
  A dictionary, the scholarly or primary source named on the Wikipedia page, or a print source
  already cited in `changes.yaml` (with page numbers) should be the citation. Keep Wikipedia
  only when no other source for that statement can be found.
- Say what is uncertain. "Is said to", "according to", "the only account is" are honest words
  here, not weak ones.
- Dates and figures are the claims most often wrong. Check each against the source.
- Old accounts by outsiders carry their authors' views. Report them as accounts.

## Tone

- Plain and specific. Short sentences. The site's usual British spelling.
- Neither advocacy nor alarm. The reader should not be able to tell what the writer thinks of
  cannabis.
- No romance about ancient wisdom and no sneering at it. Describe what people do and what they
  say about it.
- The present tense for what is still done, the past for what is not, and care about which is
  which.
- No instructions for making or using anything beyond what a description of the custom needs.

## Before it is done

1. `npx astro build` passes (it rejects unknown countries, history ids and malformed fields).
2. The entry page, its card and the profiles of its countries have been looked at.
3. Every picture is a local file and shows on the page.
4. Each country in `countries` and each id in `history` is mentioned in the text.

## Local book research

Use locally supplied books in ignored `books/` as reference sources, following
[BOOKS.md](BOOKS.md) and its tracked [catalogue](books.yaml). Cite the chapter author
and exact printed pages in the entry's existing `sources` structure, without a local
file URL. Record what was actually read and distinguish observations, informants'
accounts and the author's interpretation. Local copies are not website assets.
