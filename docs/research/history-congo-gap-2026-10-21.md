# DR Congo: consumption offences and the basis for medical licensing

21 October 2026. This pass prioritises a country with a large population and
only nine existing events. Its timeline jumped from a colonial 1903 restriction
to recent medical regulations, with treaty accessions between. Added the
1917 consumption amendment and 2018 statutory medical/scientific exception;
wrote a 1917 article; corrected the 1903 article and the 2021 entry.

Baseline: `tmp/history-congo-gap-2026-10-21/changes-before.yaml`.
The prior 1903 article is also saved there. Source downloads, text and page
images are in `tmp/pdfs/congo-gap-2026-10-21/`.

## 1903 and 1917 must be separated

Downloaded the complete *Les Codes Larcier, République démocratique du Congo,
Tome II: Droit pénal* from the university library mirror. The file was saved
locally with `code2004` in its name, but its title/copyright and page footer
establish the **2003** edition, ISBN 2-8044-0968-6. The legal reproduction is
on printed **p. 255, PDF p. 267**, read in full and visually inspected.

Its article 1 and the second paragraph of article 3 are explicitly bracketed
as amendments of **10 March 1917**. These provide the express consumption
prohibition and confiscation of consumption equipment. The rest of the text
contains the compensation window, penalties, village-chief liability with an
exception for reporting offences, and destruction provisions. The amended
text is reproduced without amendment dates on Leganet; its Belgian-domain
page was read in full while the Congolese-domain URL timed out.

Reread Duvall, *The African Roots of Marijuana* (2019), pp. 188–189, from the
retained full book text. This independently attributes farming, sale, transport
and possession restrictions and the compensation offer to 1903 and discusses
the suppression of informal networks. It supports the narrower description of
the original law and context for the rewritten article. Neither new prose nor
the category claims consumption was previously free of every possession rule.

The old 1903 article incorrectly placed the entire later consolidated text in
1903 and used that attribution to explain the index score. Replaced it under
the current writing guide, preserving its URL, removing the numeric scoring
explanation and separating the later consumption/equipment clauses. Existing
historical score vectors remain unchanged **without revalidation**: the 1903
step still carries a consumption decrease which needs separate reconstruction.
The new `tightening` event has an explicit `unscored` explanation. Its date is
the amendment date in the legal collection; an independent 1917 publication
or commencement date was not recovered.

The League of Nations scan `unodc0586f.pdf` was discovered as an indexed lead,
with a 1917 amendment on p. 7 and a 1933 pharmacy summary on p. 8. The UN file
and record routes returned 403, inaccessibility or empty files; no claims are
credited to having read that PDF. The 1917 entry instead cites the actual legal
collection obtained. The 1933 pharmacy law remains a follow-up gap rather than
an event made from snippets. A pharmacy-code search result on Manualzilla
mixes the colonial text with later Burundian laws; it was not treated as an
original Congolese enactment.

## 2018 precedes the 2021 licensing conditions

Downloaded and read the Droitcongolais reproduction of **Law 18/035 of
13 December 2018**. Visually checked PDF pp. 17–19, especially articles
118–122, 132, 143 and 144. The law allows cultivation, production, possession
and commercialisation of narcotics/psychotropics only for medical and scientific
purposes and requires permission and ministerial conditions. It also supplies
record/inspection rules. The statutory instrument's date is **promulgation**;
article 144 defers operation for three months. The description states this
delay rather than claiming immediate commencement or guessing a counting rule.
The 2018 event is `medical`, without an invented access vector or an assertion
that patients received cannabis then.

Downloaded the complete **2021 ministerial order**, including its cover
letters. Read the preamble and relevant provisions; visually checked printed
pp. **3–4, 8 and 27**, PDF pp. **5–6, 10 and 29**. Articles 1–5 reserve the
channel to medical/scientific purposes, require Congolese legal entities and
industrial cultivation, and specify medical cannabis with at most 0.2% of the
substance the text calls THC and a high CBD content. Article 23 supplies the
five-year cultivation/production authorisations. Article 101 makes the order
effective on signature; the signature page visibly reads **27 February 2021**.
The forwarding letters refer to 2 March, which was not substituted for the
signed act's date. The order's preamble expressly cites the 2018 law.

The old 2021 description conflated industrial **scale** with a permitted
nonmedical industrial **purpose**. The original order's article 1 permits
medical and scientific purposes only. Corrected that distinction and replaced
the Wikipedia-only basis with the original order, retaining the existing date,
category and stable ID. No current-country profile was changed, and no current
sentencing conclusion is drawn from article 132's general drug offence.

## Categories, tags and coverage limits

1903 remains the existing `ban`, with colonial, eradication and sentencing
tags. The 1917 extension is `tightening`, with colonial, sentencing and
advertising/paraphernalia tags, the last for consumption equipment.
The 2018 event is `medical`; the patient tag is not assigned to a general
permission statute with no documented patient case, group or supply service.
The 2021 event is `medical` and tagged CBD for the specified cannabis varieties.
Earlier/later links connect 1903 → 1917 → 2018 → 2021 → 2022.

The 1933 pharmacy system and most post-independence enforcement history remain
substantive gaps. This pass improves the legal sequence without presenting
the country as comprehensively covered.

## Verification

Preservation checks passed: all 2,650 baseline events remain, every prior
`before` vector is unchanged, and only the existing 1903 and 2021 events were
edited. The two additions bring the dataset to 2,652 events and 590 articles.
Article metadata, controlled tags, related IDs and internal links passed;
the rewritten 1903 article has 405 words and the new 1917 article 378 words,
each with four sections.

The isolated production build succeeded: 3,383 pages in 26.47 seconds.
Checked all four touched events against the generated JSON export, both
articles' rendered source and internal links, and the assigned tag routes and
tag-page membership. The temporary `site/` build was deleted after verification;
the baseline, prior article, source files and build log were retained.
