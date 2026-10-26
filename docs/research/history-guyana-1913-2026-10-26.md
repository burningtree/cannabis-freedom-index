# Research pass: Guyana 1913 article, entry corrected to warehouse model

Research checked on 26 October 2026. The 1913 entry's self-contradictory
description (prohibition claim vs Mills's warehouse account) is resolved in
favour of the read primary scholarship, with a new properly sourced
article; a 1948 UN order read in full supplies the article's ending. No
scores, profiles or timelines changed.

## What was verified (all sources actually read)

### Mills, Cannabis Britannica (local PDF, read in full relevant passages)

- The Indian Hemp Ordinance of British Guiana 1913 and Trinidad's Ganja
  Ordinance 1915 both set up bonded-warehouse and licence-fee systems for
  imported cannabis on the Bengal model recommended by the Indian Hemp
  Drugs Commission; Guiana took the West Indian initiative. Cited to PRO
  HO 144/6073, 29 April 1924. Framed as tax-and-control ("a slice of the
  profits of the drug trade"), not prohibition of use.
- This contradicts the entry's old first sentence (prohibition of growing
  and possession, from Wikipedia). Entry rewritten: retitled to the
  warehouse measure, licensing description with per-sentence citations,
  Wiki source removed, Mills locator sharpened. Category stays `ban` (the
  colony's first import restriction; cf. the 1861 licensing entry also
  being `ban`), and the partial `before` scores are untouched — they fit a
  licensing regime better than a ban.
- New `articles/guyana-indian-hemp-ordinance-1913.md` (355 words, 4
  sections, all 3 sources cited): the Bengal template and "slice of the
  profits" motive from Mills; 1861 anticipatory licensing, migrant numbers
  and the ganja complex from the Banks chapter (local EPUB, re-read);
  Trinidad 1915 copy; 1937 Ordinance and 1948 order from the UN filing;
  links to the 1861 and 2022 entries and /country/gy/.

### UN E/NL.1948/42 (British Guiana, read in full via UN Digital Library)

- Order in Council No. 28 of 1948, made 25 May 1948 under s.10(3) of the
  Dangerous Drugs Ordinance No. 10 of 1937: Part IV extended to amidone,
  desomorphine, metopon, pethidine and non-external Indian-hemp
  extract/tincture preparations. Added as article source [3]; the 1937
  entry itself was left untouched (already accurate).

## Dead ends recorded, not forced

- The 1913 ordinance text and the 1924 Home Office file (PRO HO
  144/6073) are not readable online; Mills's account is the cited
  evidence. No claim made about growing/possession provisions either way.
- Gallica remains 403 from here (Madagascar JO lane closed). USVI 1937
  and Denmark 1969 lanes need nothing (already primary-sourced).

## Verification and files

- `node -e` YAML load of changes.yaml clean (run before build).
- `npm run build`, `npm run history:test`, `npm run answers:test` all green;
  rendered `/history/guyana-indian-hemp-ordinance-1913/` citation marks
  checked.
- Commit limited to own work: the 1913 hunk in changes.yaml, the new
  article, this note. Foreign staged/worktree files excluded and preserved.
