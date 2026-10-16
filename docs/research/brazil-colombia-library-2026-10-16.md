# Non-US library pass: Brazil and Colombia

16 October 2026. This pass follows the user’s request to focus on non-US subjects.
No US content, country profiles or scores changed in this pass.

## Reading

**Jean Marcel Carvalho França, História da maconha no Brasil** (Jandaíra, 2022,
ISBN 9786550940133): chapter 5, *Canabismo, um hábito economicamente viável*,
read in full, including notes 1–16. Internal file `OEBPS/Text/chapter05.xhtml`;
public locators use the chapter title, without fabricated print pages.

The chapter follows changing media portrayals, medical-access campaigns, online
cultivation networks and the documentary *Quebrando o Tabu*. Its quotations from
magazines document a public debate; they were not treated as current clinical
findings. Its predictions of imminent reform and its market forecasts were not
imported. The chapter’s generalised descriptions of foreign legal systems were
not used to update country profiles.

**William L. Partridge, Cannabis and Cultural Groups in a Colombian Municipio**,
in Vera Rubin (ed.), *Cannabis and Culture* (Mouton, 1975): printed pp. 161–172,
PDF 175–186, examined, including the references. This completes the chapter
across passes: the catalogue previously recorded pp. 147–163. The opening pages
were not credited a second time. Visually checked printed pp. 162, 163, 166, 167
and 169 against their scans.

## Brazil: CBD classification in January 2015

Added `brazil-cbd-controlled-substance-2015` and an article.

França supplies the patient/media context. The actual legal change was checked
against [RDC 3 of 26 January 2015](https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2015/rdc0003_26_01_2015.pdf),
especially articles 1–3 on its first page. Article 2(I)(1.1) adds cannabidiol to
List C1; article 3 provides commencement upon publication. The resolution refers
back to the board meeting of 14 January. These are different dates.

The web reader returned the official PDF text and a screenshot reference, but
direct local download and later text opens were blocked with HTTP 403. No local
PDF reading beyond the retrieved opening text is claimed. The
[Anvisa retrospective](https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2016/em-cumprimento-a-acao-judicial-anvisa-permite-prescricao-e-importacao-de-produtos-com-canabidiol-e-thc)
confirms that January 2015 moved CBD from prohibited to controlled status.
The [official amendment index](https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/controlados/lista-substancias)
also identifies RDC 3 and its C1 addition.

Retained **January 2015** precision for the event because the exact gazette
publication day was not independently established here. Did not mistake the
board meeting or the date of the resolution for the effective day. The change
concerned CBD, not an unrestricted cannabis market, home growing or permission
to use cannabis recreationally. It did not itself register a medicine. No
national score step assigned: the existing pharmacy-access step concerns the
separate 2019 framework.

## Brazil: a documentary’s release and political argument

Added `brazil-quebrando-o-tabu-2011`, dated **3 June 2011**, and an article.

The date was checked against ANCINE’s *Informe de acompanhamento do mercado:
filmes e bilheterias 2011*, Brazilian releases table, PDF page 9, row 26.
The table identifies the documentary, distributor Espaço Filmes (Spectateur),
and release date 03/06/2011. Downloaded through the official
[download endpoint](https://www.gov.br/ancine/pt-br/oca/cinema/arquivos-pdf/informe-anual-filmes-e-bilheterias-2011.pdf/@@download/file),
extracted the table and visually checked the page. The apparent `.pdf` URL
without the download suffix initially returned an HTML attachment page.

The article attributes interpretation of the film’s reform strategy to França.
This pass did **not** watch the complete film and does not present the book’s
summary as an independent viewing. It describes a cultural and political
intervention, without claiming the documentary caused a law or a measured
change in opinion. The release itself moves no score.

## Colombia: cannabis in working relationships

Created `culture/traditions/cannabis-in-colombian-work-groups.md`, linked to the
existing Santa Marta fieldwork history entry. Expanded the corresponding history
article’s discussion of ordinary community membership and stigma, with a locator
extended to the relevant later pages.

Applied the chapter’s descriptions of short pure-cannabis cigarettes, unrelated
male work groups, learning through migration and friendships, and continued
smoking after some labourers became farmers. Not every worker smoked; the chapter
says nonsmokers were not urged to participate. Participants’ language of fuerza
and ánimo is treated as their explanation, not proof of enhanced productivity
or safety while working.

Two adjacent pages need care: printed p. 162 says a cigarette is shared among
men; p. 163 says cigarettes are not passed person to person. The entry does not
invent a consistent passing ritual from these passages. It likewise omits the
historic infant remedy and other therapeutic practices as advice.

The contrast between cultivators, traders and consumers matters: the highland
cash-crop growers were not necessarily smokers. The work-group practice is
specific to this account of a coastal municipality in the early 1970s, not a
claim about everyone in Colombia or a verified current custom. The locality is
not given a guessed real name.

On printed p. 169, note 12 explicitly calls the conclusions preliminary because
data collection was incomplete. Preserved that limit. The reported cultivation,
trade and consumption under local accommodation do not establish a legal
exemption. The chapter’s specific account of Decree 1699/1964 is a lead until
the original provisions are examined; no new penalty event added from it.

## Next non-US reading

- França chapter 1 remains unread. His chapter 4 also has material still outside
  the credited passages.
- Ram’s *Intoxicating Zion*, chapter 4 on interwar representations, remains
  unread and offers a next regional focus beyond Latin America.
- Rubin’s volume still has incomplete Greek archive statistics and substantial
  Jamaican social chapters to examine.
- Primary Colombian legislation is needed to resolve the earlier 1928 first-law
  lead and verify the 1964 penalties reported by Partridge.

## Validation

Book hashes and coverage locators checked; the generated report refreshed.
Site build and generated-content checks are recorded below after completion.
Original books, full extractions and page scans remain in ignored local folders.

Validation completed: `npm run books:check` passed. Brazil and Colombia score-chain
checks each flagged zero steps. The first shared-output build failed on a missing
prerender chunk while another Astro build was active; a rerun using the isolated
`tmp/non-us-library-2026-10-16/site-check` output completed successfully (3,098
pages). Verified both new history articles, the new tradition and the expanded
Colombia article in that generated output. New event IDs are unique and unscored;
catalogue note links and culture related links resolve. Staged and unstaged
whitespace checks passed. No commit or deployment performed.
