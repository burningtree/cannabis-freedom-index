// The context topics as pages of their own (/context/ and /context/<key>/): for each topic, every
// place with what its profile says, the status it carries where the topic has one, how far the
// research has got, and a colour for the world map. Built from the country files through
// countries.js (texts and statuses) and research.js (written, not applicable or missing).
import { CONTEXT, CONTEXT_ICONS, places, REC_LABEL, REC_HELP, MED_LABEL, MED_HELP } from "./countries.js";
import { STATUS_SECTIONS, PLANTING_STATUS } from "./segment-ids.js";
import { research } from "./research.js";
import { viewByMetric } from "./map-views.js";

const researchOf = new Map(research.map((r) => [r.slug, r]));
// a tone of the status chips (s-legal …) as a map colour, the same scale as the chips' dots
const TONE = { legal: 5, yes: 5, partial: 4, decrim: 3, limited: 3, illegal: 0, no: 0, death: 0 };
const toneTier = (tone) => (tone in TONE ? TONE[tone] : null);

// The opening of a section's text, cut at a sentence end near `max` characters: the table's summary.
const excerpt = (text, max = 230) => {
  if (!text) return "";
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  return end > max * 0.45 ? cut.slice(0, end + 1) : `${cut.replace(/\s+\S*$/, "")}…`;
};

// How a topic's places are grouped and coloured. A topic with a status (clubs, driving, the hemp
// limit…) is mapped by it; recreational and medical by the country's legal status; seeds and
// clones by the seed status; the death penalty marks where the law provides for it; the rest
// show how far the research has got.
function scheme(key) {
  if (STATUS_SECTIONS[key]) {
    const sec = STATUS_SECTIONS[key];
    return {
      kind: "status", title: sec.name,
      values: Object.entries(sec.statuses).map(([value, s]) => ({ value, label: s.label, help: s.help, tone: s.tone, tier: sec.tiers[value] ?? null })),
      of: (c) => c[key] ?? null,
    };
  }
  if (key === "recreational") return {
    kind: "status", title: "Recreational status",
    values: Object.entries(REC_LABEL).map(([value, label]) => ({ value, label, help: REC_HELP[value], tone: value, tier: toneTier(value) })),
    of: (c) => c.rec,
  };
  if (key === "medical") return {
    kind: "status", title: "Medical status",
    values: Object.entries(MED_LABEL).map(([value, label]) => ({ value, label, help: MED_HELP[value], tone: value, tier: toneTier(value) })),
    of: (c) => c.med,
  };
  if (key === "planting") return {
    kind: "status", title: "Seeds",
    values: Object.entries(PLANTING_STATUS).map(([value, s]) => ({ value, label: s.label, help: s.help[0], tone: s.tone, tier: toneTier(s.tone) })),
    of: (c) => c.planting?.seeds ?? null,
  };
  return { kind: "coverage" };
}

// the interactive map view for a topic, where the home page's map can show it
const MAP_METRIC = { recreational: "status:rec", medical: "status:med", planting: "plant:seeds", culture: "culture" };
const mapView = (key) => viewByMetric[MAP_METRIC[key] ?? `status:${key}`] ?? null;

export const contextTopics = CONTEXT.filter(([key]) => key !== "products").map(([key, name, help]) => {
  const sc = scheme(key);
  const rows = places.map((c) => {
    const block = c.details.context.find((x) => x?.key === key) ?? null;
    const section = researchOf.get(c.slug)?.contextCoverage.sections.find((s) => s.key === key);
    const state = section?.state === "filled" || section?.state === "not_applicable" ? section.state : block ? "filled" : "missing";
    const value = sc.kind === "status" ? sc.of(c) : null;
    const status = value != null ? sc.values.find((v) => v.value === value) ?? null : null;
    const text = block ? (block.items ? block.items.map((it) => it.title).join(" · ") : block.t) : "";
    return { c, state, status, summary: excerpt(text), reason: state === "not_applicable" ? section.reason : "" };
  }).sort((a, b) => a.c.name.localeCompare(b.c.name));
  const count = (state) => rows.filter((r) => r.state === state).length;
  const statuses = sc.kind === "status"
    ? sc.values.map((v) => ({ ...v, rows: rows.filter((r) => r.status?.value === v.value) })).filter((v) => v.rows.length)
    : [];
  return {
    key, name, help, icon: CONTEXT_ICONS[key], slug: key.replace(/_/g, "-"),
    scheme: sc, statuses, rows,
    filled: count("filled"), notApplicable: count("not_applicable"), missing: count("missing"), total: rows.length,
    unknown: sc.kind === "status" ? rows.filter((r) => !r.status).length : 0,
    mapView: mapView(key),
  };
});

// The map colour of a place on a topic's map, as a CSS colour: a status tier on the --t scale, the
// accent blue where the topic is written, grey where it is explained as not applicable.
export const mapFill = (topic, row) => {
  if (!row) return "var(--map-none)";
  if (topic.key === "death_penalty") return row.state === "filled" ? "var(--t0)" : row.state === "not_applicable" ? "var(--map-na)" : "var(--map-none)";
  if (topic.scheme.kind === "status") return row.status?.tier != null ? `var(--t${row.status.tier})` : "var(--map-none)";
  return row.state === "filled" ? "var(--u3)" : row.state === "not_applicable" ? "var(--map-na)" : "var(--map-none)";
};
