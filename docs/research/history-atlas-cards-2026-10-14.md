# Focused atlas cards on history pages

The user requested event-specific cards, using the first Cannabis Cup as the example: The Cannabis Cup belongs there; Indica and sativa and Kush are background references.

Added optional `history_cards` to Culture metadata, defaulting to no cards. It is a curated subset of `history`, validated against known history entries and the entry's own history list. `history` and prose links continue to serve the atlas reader, while only `history_cards` provides reverse cards on history pages. Removed automatic promotion of incidental culture links inside history article prose.

Reviewed the 379 existing metadata associations and selected 95 direct subject associations across 36 atlas entries. Examples:

- First Cannabis Cup → The Cannabis Cup only.
- Ruigoord's preservation and Highlife event → Ruigoord.
- Metelkova occupation → Metelkova; Slovenia's general referendum supplies no Metelkova card.
- Paris club → Club des Hashischins; the generic Hashish word no longer appears there.
- Chinese burial studies → Cannabis in the graves of Xinjiang, rather than the Daoist censer or Scythian custom.
- Christiania's blockade, gang takeover and closure → Pusher Street; Denmark's general ban and medical pilot do not.
- Religious rulings and exemptions → Rastafari; general cultivation or medical changes do not automatically qualify.
- Generic US drug acts no longer collect Pot, Dope, Grass, Pakalōlō or Brick weed cards merely because those entries cite the law.

Atlas entries without a directly corresponding event retain their ordinary history citations, country placement, related links and pictures. No events, scores or article text were removed.

Verification: final build passed (2,764 pages). Every generated history page's atlas-card set was compared with the curated metadata; no incidental cards remain. Browser checked first Cannabis Cup (one card), Ruigoord, Metelkova, Paris circle and Jirzankal (one specific card each), plus the general US Controlled Substances Act and Danish medical pilot (no cards). `git diff --check` passed. History-to-history related suggestions also now use the focused card associations.
