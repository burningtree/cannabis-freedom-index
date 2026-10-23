# Writing history entries and articles

How to write the `title` and `description` of a `changes.yaml` entry and the text of an
article in `articles/`. The facts rules in `docs/DATA-MAINTENANCE.md` still apply: write only
what the sources say. This guide is about making that readable.

The reader is someone curious about cannabis law, not a lawyer. After reading they should know
**what changed for people who use, grow or sell cannabis, and why it happened.** Law numbers,
filing dates and court procedure are there to let someone check the claim; they are not the story.

## Common problems

These turn up again and again, in GPT-written text most of all:

- **The document comes first.** "In judgment 170/1982, filed on 26 October after decision on
  19 October, the Constitutional Court rejected…" The reader has to get past three facts before
  learning what happened.
- **Procedure takes the place of meaning.** Referring courts, operative orders, admissibility,
  amendment points, paragraph numbers.
- **Disclaimers.** "This is a rollout milestone, not a new adult-use law." "The result should not
  be described as…" "The discussion establishes an implementation bottleneck, not…" Saying what
  something is *not* is the model protecting itself. Say what it is. Caveats about the sources go
  in `docs/research/`.
- **No people and no context.** Nothing about who was arrested, who could now buy, who campaigned, or what was going on in the country at the time.
- **No before and after.** The event stands alone, with no link to what led to it or what came next.

## Context around the event

An event makes sense only with what surrounded it, so mention the important context. It is
part of the story, not padding, and it belongs in descriptions as well as articles:

- **What led to it:** the law or ruling it replaced, a court case or arrest that started it, a
  campaign, a scandal, a change of government, pressure from a treaty or another country.
- **Who was behind it and who opposed it:** the minister, party, court, campaigners or patients
  who pushed for it, and the arguments on each side.
- **What it meant in practice:** how many people were arrested, jailed, registered or served;
  how strictly it was enforced; how it compared with neighbouring countries or the world at the
  time.
- **What came next:** whether it was repealed, challenged, copied elsewhere or ignored.

Take this context from the sources, the country's other entries or its profile, and link the
entries it refers to. Never fill it in from memory. If a source gives none, look for one that
does before writing the entry flat; if none turns up, say less rather than guess.

## Titles

- Say **what changed, for whom**, with a plain active verb: *bans*, *legalises*, *jails*,
  *raises the penalty*, *lets patients*, *blocks*.
- Start with the country or place, as now. Under about 80 characters.
- **No law, judgment, article or section numbers**, and no official names in quotation marks
  unless the name is itself famous (the Marihuana Tax Act, the Opium Law).
- Name the institution plainly: "Italy's top court", "parliament", "the government".
- Context entries that move no score still need a point.

| Instead of | Write |
|---|---|
| Italy's Constitutional Court upholds penalties for cannabis beyond a modest quantity | Italy's top court keeps punishing users with more than a "modest quantity" like dealers |
| Nebraska's medical cannabis growers face an unfinished route to patient sales | Nebraska's licensed growers told to store their harvest for up to two years |

## Descriptions (`changes.yaml`)

Two to four sentences, in this order:

1. **The change in everyday terms.** What a person could or could not do afterwards, or what
   now happens to them. Give the penalty, the amount, the date it took effect.
2. **Why, or how it came about,** when the source says: a court case, a referendum, a scandal,
   a treaty, pressure from abroad.
3. **The important context** (see above), in a sentence or two: what it replaced, what was
   happening at the time, or what came next. This can come from the country's other entries or
   its profile, which are already sourced; it must never come from memory.
4. **The formal name or number,** at most once, and at the end or in the source title. Often it
   is not needed at all, because the source title already carries it.

Leave out: filing dates next to decision dates (keep the one that matters, usually when the rule
took effect), procedural outcomes the reader cannot use, and every "not a / rather than"
sentence. If the reader could really mistake the event for something bigger, say what it is
precisely: "Kentucky has medical cannabis only; buying for adult use remains illegal" is a fact,
"this is not a new adult-use law" is a disclaimer.

Before:

> In judgment 170/1982, filed on 26 October after decision on 19 October, the Constitutional
> Court rejected equality challenges to punishment for possessing more than a modest quantity
> for personal use, including cannabis. It also upheld the exclusion of small imports from the
> modest-quantity exception. A challenge to the undefined quantity term was inadmissible because
> the referring court had not specified the requested outcome. The judgment preserved the
> existing law rather than imposing a new ban.

After:

> Italy's Constitutional Court rejected several challenges to the 1975 drug law. People found
> with more than a "modest quantity" could still be punished like dealers, even if the cannabis
> was only for themselves, because the court said a stock could always be sold on. It refused to
> treat cannabis more leniently than other drugs or to compare it with alcohol, leaving that to
> parliament. How much counted as "modest" stayed undefined.

## Articles (`articles/`)

Still 350 to 500 words, three to five short sections, at most one small table. A good order:

1. **Opening paragraph (no heading):** what happened and what it meant for people, in two or
   three sentences. Someone who reads only this should have the story.
2. **Background:** the situation before, and why this came up then: the politics, the people
   and the debate around it (see "Context around the event"). Link the earlier entry.
3. **What the law or ruling did:** the substance in plain words. Explain each legal term the
   first time, in a few words ("a referendum to repeal parts of the law", not "an abrogative
   referendum"). One short quotation from the text can show its tone better than a paraphrase.
4. **Who was affected / how it was applied,** when the sources say: arrests, prosecutions,
   sales, patients, reactions.
5. **What happened next:** link the later entries and the country profile (`/country/it/`).

Section headings say something: "Holding a stock counted as dealing", not "Legal reasoning".

Numbers belong in the article only when they mean something to the reader: a sentence length,
a gram limit, a count of arrests. Law and judgment numbers appear once, if at all. Several
procedural details (dates of filing, referral, publication) can go into the one small table, or
stay in the sources' `locator`.

Do not end on a disclaimer ("These statements supply neither a modern assessment nor…"). End on
what came next, or on what the event meant.

## Citations

Texts cite their sources inline, Wikipedia style: a mark right after the sentence or clause a
source supports, shown on the page as a superscript number linked to a numbered list of
references. The same source keeps its number wherever it is cited again.

- **History entries, articles, culture entries:** `[@2]` is the second source in the item's own
  `sources` list; `[@1,3]` cites two. Put the mark after the full stop, with no space:
  `…in 1972.[@1]`
- **Country files:** cite by source key: `[@bmg]`, `[@bmg, kcang]`, using only the keys listed in
  that segment's or context section's `sources`.
- Cite each claim with the source that actually states it. When a text uses marks, every source in
  its list must be cited at least once, and every mark must name a real source; the build fails
  otherwise.
- Texts without marks still work: all their sources are cited together after the last sentence.
  Convert them to per-sentence citations whenever a text is written or revised; there is no need
  to convert everything at once.
- On a country page the score breakdown and the Context tab each end with their own numbered
  references; history, article and culture pages end with one list for the whole page.

## Words to avoid

| Avoid | Use |
|---|---|
| referring court, the referral | the court in Rome asked… |
| operative order, operative part | the ruling, the decision |
| declared inadmissible | refused to rule on, threw out |
| the instrument, the measure, the framework | the law, the decree, the rules |
| establishes, constitutes | shows, is |
| the provision | the rule, or say what it does |
| filed on … after decision on … | one date |
| subsequently, thereby, in respect of | then, so, about |
| not a …, rather than … (as a disclaimer) | say what it is |

## Checking a draft

Read the title and the first sentence alone. Do they say what changed for people? Then check
that every sentence is still backed by a source, because plainer words must not mean bolder
claims: "punished like dealers" is fine only if the source says the same penalty applies.
