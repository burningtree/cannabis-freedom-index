// Iconoir icons of the search dialog (Base.astro). A row of /search.json names its icon in `ic`;
// the layout puts every icon named here into the page once, for the dialog's script to copy.
import { CHANGE_CATEGORIES } from "./segment-ids.js";

// the small sign beside the kind of result on the right
export const RESULT_KIND_ICONS = { c: "iconoir:map-pin", p: "iconoir:page", u: "iconoir:palette", a: "iconoir:journal", h: "iconoir:clock-rotate-right" };

// the pages, by their address under the site root
export const PAGE_ICONS = {
  "#map": "iconoir:map", "#rankings": "iconoir:numbered-list-left", "#methodology": "iconoir:flask",
  "history/": "iconoir:clock-rotate-right", "can-i/": "iconoir:chat-bubble-question", "compare/": "iconoir:git-compare",
  "data/": "iconoir:download", "score-changes/": "iconoir:list", "changelog/": "iconoir:git-commit", "articles/": "iconoir:journal", "about/": "iconoir:info-circle",
  "did-you-know/": "iconoir:light-bulb", "survey/": "iconoir:graph-up", "survey/take/": "iconoir:edit-pencil",
  "culture/": "iconoir:palette", "culture/people/": "iconoir:community", "culture/stories/": "iconoir:book", "sources/": "iconoir:bookmark-book",
  "glossary/": "iconoir:book-stack", "charts/": "iconoir:stats-report", "map/": "iconoir:map", "map/poster/": "iconoir:media-image",
};
// pages that come in families: a part of the cultural atlas, a map view, a history period, a history tag, an exhibition
export const CULTURE_SECTION_ICON = "iconoir:palette", MAP_VIEW_ICON = "iconoir:map", PERIOD_ICON = "iconoir:calendar", TAG_ICON = "iconoir:hashtag", EXHIBITION_ICON = "iconoir:frame-alt";

export const SEARCH_ICONS = [...new Set([
  ...Object.values(RESULT_KIND_ICONS), ...Object.values(PAGE_ICONS), CULTURE_SECTION_ICON, MAP_VIEW_ICON, PERIOD_ICON, TAG_ICON, EXHIBITION_ICON,
  ...Object.values(CHANGE_CATEGORIES).map((k) => k.icon),
])];
