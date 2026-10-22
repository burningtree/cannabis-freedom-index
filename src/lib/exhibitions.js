// Exhibitions: self-contained experiences, each about one episode in humanity's relationship with
// cannabis, each with a look of its own (src/pages/<slug>.astro, so its address is as short as it can be),
// listed under Culture. Charts measure,
// Culture documents, Exhibitions ask why and how something happened. An exhibition is built on
// the same sourced history as the rest of the site and keeps three things apart: primary
// evidence, documented connections, and interpretation.
//   history: the history entries an exhibition is about; their pages link back to it with a banner
export const EXHIBITIONS = [
  {
    slug: "reefer-madness", no: "001", theme: "Propaganda", title: "Reefer Madness", line: "The invention of a monster",
    about: "How America came to fear cannabis: the films and headlines that spread the panic, the people punished, and the research that challenged the claims.",
    open: true,
    history: ["us-reefer-madness-1938", "us-assassin-of-youth-1937", "us-marihuana-tax-act-1937", "us-tax-bill-introduced-1937", "us-el-paso-ban-1915",
      "us-anslinger-crime-claim-1931", "us-federal-bureau-of-narcotics-1930", "us-la-guardia-report-1944", "us-fbn-plays-down-marijuana-1938",
      "us-isbell-testimony-1951", "us-shafer-commission-1972", "league-russell-anslinger-exchange-1938", "us-anslinger-petty-cases-memo-1937", "us-first-tax-act-convictions-1937",
      "us-house-passes-tax-bill-1937", "us-uniform-state-narcotic-act-1932", "us-pharmacopeia-1942", "us-siler-report-1933", "panama-canal-zone-committee-1926",
      "india-hemp-drugs-commission-1894", "us-boggs-act-1951", "us-fifth-circuit-judges-1954", "us-leary-1969", "geneva-egypt-proposal-1924",
      "egypt-russell-hashish-report-1930", "mexico-salazar-marijuana-myth-1938", "mexico-regulation-suspended-1940",
      "us-mezzrow-arrest-1940", "us-gene-krupa-arrest-1943", "us-anita-oday-arrest-1947", "us-mitchum-arrest-1948", "us-lee-otis-johnson-1968", "us-little-boggs-acts-1953", "us-reefer-madness-campus-revival-1972",
      "us-locoed-weed-headline-1915", "us-licata-murders-1933", "us-production-code-drugs-1934", "us-road-to-ruin-1934", "us-marihuana-film-1936", "us-assassin-of-youth-film-1937",
      "us-ama-woodward-testimony-1937", "us-devils-harvest-film-1942", "us-she-shoulda-said-no-1949", "us-reefer-madness-musical-1998", "us-schlosser-reefer-madness-2003"],
    // the rooms, in order: id is the anchor on the page; also listed in search
    rooms: [
      { id: "claims", no: "I", name: "The Claims", learn: "Ten claims of the era, each checked against what later research found." },
      { id: "machinery", no: "II", name: "The Machinery", learn: "Who spread the story, and how the press, the bureau, Congress and the film fed one another." },
      { id: "cycle", no: "III", name: "The Cycle", learn: "The other drug films of the time, and why they were all made outside Hollywood." },
      { id: "gallery", no: "IV", name: "The Gallery", learn: "Posters and paperback covers that sold the panic, and the tricks they used." },
      { id: "defendants", no: "V", name: "The Defendants", learn: "Real people sentenced under the new laws, and how long the sentences grew." },
      { id: "export", no: "VI", name: "The Export", learn: "How the same picture of the drug reached international law, and who argued against it." },
      { id: "afterlife", no: "VII", name: "The Afterlife", learn: "How the film became a joke, and its title the name for any drug scare." },
      { id: "evidence", no: "VIII", name: "The Evidence Room", learn: "Every document behind the exhibition, labelled for what kind of evidence it is." },
    ],
    // a still for banners elsewhere on the site, from public/
    cover: "exhibitions/reefer-madness/trailer-poster.jpg",
  },
  { slug: "genealogy-of-prohibition", no: "002", theme: "Institutions", title: "The Genealogy of Prohibition", line: "How laws learned to reproduce", about: "A forensic tracing of how national, imperial and treaty law copied one another.", open: false, history: [] },
  { slug: "a-thousand-names", no: "003", theme: "Language", title: "A Thousand Names for One Plant", line: "The linguistic archaeology of cannabis", about: "The words for the plant as a living specimen: where each came from and where it travelled.", open: false, history: [] },
  { slug: "the-crime-of-gardening", no: "004", theme: "Criminalisation", title: "The Crime of Gardening", line: "When growing a plant became an offence", about: "One person, one plant, many countries and decades, and what the same act cost in each.", open: false, history: [] },
  { slug: "medicine-contraband", no: "005", theme: "Medicine", title: "The Medicine That Became Contraband", line: "How institutions changed what counted as knowledge", about: "Pharmacopoeias, physicians and regulators: how cannabis left medicine and how it came back.", open: false, history: [] },
];
// the page's path below the site's base, e.g. "reefer-madness/"
export const exhibitionPath = (e) => `${e.slug}/`;
export const openExhibitions = EXHIBITIONS.filter((e) => e.open);
// history entry id → the open exhibitions about it
export const exhibitionsOf = (id) => openExhibitions.filter((e) => e.history.includes(id));
