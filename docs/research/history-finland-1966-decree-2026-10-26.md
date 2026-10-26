# Research pass: Finland 1966 mechanism clarified; several leads exhausted

Research checked on 26 October 2026. One verified entry upgrade committed;
no new article — the remaining top-backlog items still lack readable ban
texts, and none was written from weak sources. No scores or timelines changed.

## Finland 1966: entry upgraded (no article yet)

`finland-ban-1966` gains two sources and a clarifying second sentence, both
cited per-sentence. New verified point: the 1966 ban came by decree, while
drug control entered the criminal law only with the 1972 Narcotics Act.

Sources actually read:

- Pekka Hakkarainen & Heini Kainulainen, "Drug Use, Public Debate and
  Increasing Pressures for a Drug Policy Reform in Finland" (Stockholm
  University Press, 2021), full chapter PDF read via reference-global
  mirror of DOI 10.16993/bbo.c: "drug control was included in the criminal
  law for the first time at the beginning of the 1970s, when the 1972
  Narcotics Act was enacted"; 1971 vote mechanics as already used in the
  1972 article. No 1966-decree substance in the chapter.
- Finnish Wikipedia "Kannabis Suomessa" (read via API extracts):
  "Kannabis kriminalisoitiin asetuksella Suomessa vuonna 1966."

Still missing: the 1966 decree's number and text. Finlex's 1966 statute
index is reachable but shows only the ten most-searched statutes; the
/full search is client-rendered with no visible API; the treaty-series
route guessed for the Single Convention implementation 404s. The decree
number is the precise blocker for a Finland 1966 article.

## Leads exhausted this pass (documented, not forced)

- Duvall, The African Roots of Marijuana (Tunisia 1875): Google Books
  snippet API reports the volume as not searchable. Article still needs
  the book.
- Chad/AEF 1926: The Conversation piece (read) links the Gallica folio for
  the 1926 arrêté, but all Gallica endpoints (page text, SRU, IIIF) return
  Cloudflare 403 to non-browser fetchers. The arrêté text stays unread.
- Syria/Lebanon 1934: the same piece cites a 22 Nov 1934 L'Avenir du Tonkin
  item via RetroNews, whose viewer shell loads but the article text sits
  behind login. Our Syria 1943 (Quwatli) entry is unaffected.
- Romania 1928: no primary or strong secondary surfaced.
- Portugal 1926: Portuguese Wikipedia covers 2001 decriminalisation and the
  empire (Goa, Brazil), nothing on 1926.
- Finland side finds: OAPEN search migrated, Stockholm UP site 403s, TalTech
  bachelor's thesis (Nykänen 2022) has no 1966 history — all correctly
  passed over.

## Verification and tree note

YAML parses; history:test 40/40; full build passes. Committed only my
`finland-ban-1966` hunk plus this note; concurrent-writer edits untouched.
