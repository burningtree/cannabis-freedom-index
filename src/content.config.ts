// Where the site's data comes from, and what a valid file looks like.
// The build fails with a clear message if a file in /countries breaks these rules.
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { isMixedCannabisPrice } from "./lib/price-selection.js";
import { TREATMENT, parseAmount, parseDuration } from "./lib/penalties.js";
import { SEGMENT_IDS, CONTEXT_IDS, OPTIONAL_CONTEXT_IDS, CONTEXT_RESEARCH_IDS, sectionSources, CHANGE_CATEGORIES, CHANGE_TAGS, PLANTING_STATUS, PLANTING_TRADE, STATUS_SECTIONS } from "./lib/segment-ids.js";
import { hasContextExplanation } from "./lib/context-coverage.js";

const score = z.number().int().min(0).max(10);
const perSegment = <T extends z.ZodTypeAny>(value: T) =>
  z.object(Object.fromEntries(SEGMENT_IDS.map((id) => [id, value])) as Record<string, T>).strict();
// A source may be a webpage or a publication with no public URL. The bibliographic fields let
// books and chapters be cited precisely instead of inventing a link or hiding everything in title.
const source = z.object({
  type: z.enum(["web", "book", "chapter", "journal", "report", "law", "other"]).optional(),
  title: z.string().min(1),
  url: z.string().url().optional(),
  authors: z.array(z.string().min(1)).optional(),
  editors: z.array(z.string().min(1)).optional(),
  container: z.string().min(1).optional(),
  publisher: z.string().min(1).optional(),
  year: z.number().int().min(1000).max(3000).optional(),
  isbn: z.string().min(1).optional(),
  locator: z.string().min(1).optional(),
}).strict();
const webSource = source.refine((s) => Boolean(s.url), { message: "price sources need a URL" });
const cited = z.object({ text: z.string().min(1), sources: z.array(z.string()) }).strict();
// a penalty step of a segment (src/lib/penalties.js): an amount ("30 g", "1 oz", "5 plants") or a
// `label` for a step that is not about an amount, what the law does, and its maximum prison and fine
const amount = z.string().refine((s) => parseAmount(s), { message: 'an amount such as "5 g", "1 oz" or "5 plants"' });
const penalty = z.object({
  upto: amount.optional(), over: amount.optional(), label: z.string().min(1).optional(),
  repeat: z.number().int().min(2).optional(),
  treatment: z.enum(Object.keys(TREATMENT) as [string, ...string[]]),
  term: z.string().min(1).optional(),
  prison: z.string().refine((s) => parseDuration(s), { message: 'a duration such as "5 days" or "2 years"' }).optional(),
  prison_min: z.string().refine((s) => parseDuration(s), { message: 'a duration such as "6 months"' }).optional(), // alone: "at least"
  caning: z.tuple([z.number().int().positive(), z.number().int().positive()]).optional(), // [fewest, most] strokes
  death: z.literal(true).optional(),
  fine: z.number().positive().optional(),
  fine_min: z.number().positive().optional(), // a minimum fine; alone it reads "at least"
  note: z.string().min(1).optional(),
}).strict().refine((r) => r.upto || r.over || r.label, { message: "a penalty step needs upto, over or a label" });
// a segment: its cited text, and for possession and cultivation optionally the penalty steps
const segment = cited.extend({ currency: z.string().regex(/^[A-Z]{3}$/).optional(), penalties: z.array(penalty).min(1).optional() })
  .refine((s) => !s.penalties?.some((r) => r.fine || r.fine_min) || s.currency, { message: "penalties with a fine need a currency" });
// a country spotlight: one thing that makes cannabis different there, with a short title
const spotlight = z.object({ title: z.string().min(1), text: z.string().min(1), sources: z.array(z.string()) }).strict();
// seeds and clones: the same cited text, plus for each a status for having and planting them
// (PLANTING_STATUS) and one for selling or handing them on (PLANTING_TRADE)
const plantingStatus = z.enum(Object.keys(PLANTING_STATUS) as [string, ...string[]]);
const plantingTrade = z.enum(Object.keys(PLANTING_TRADE) as [string, ...string[]]);
const planting = z.object({ seeds: plantingStatus, seeds_trade: plantingTrade, clones: plantingStatus, clones_trade: plantingTrade, text: z.string().min(1), sources: z.array(z.string()) }).strict();
// clubs, driving, visitors: the cited text plus one status from that section's vocabulary (STATUS_SECTIONS)
// a filled hemp, industry or research section must also carry its status chip; only the whole
// section may be left out
const statusSections = Object.fromEntries(Object.entries(STATUS_SECTIONS).map(([key, section]) => {
  const status = z.enum(Object.keys(section.statuses) as [string, ...string[]]);
  const block = z.object({ status, text: z.string().min(1), sources: z.array(z.string()) }).strict();
  return [key, (CONTEXT_IDS as string[]).includes(key) ? block : block.optional()];
}));
const status = {
  // "death": illegal, and the law allows the death penalty for cannabis offences, in practice trafficking.
  recreational: z.enum(["legal", "partial", "decriminalised", "illegal", "death"]),
  // "legal": an established patient route for cannabis or cannabis-based medicine.
  // "limited": a specific patient treatment route, including individual authorisation, approved
  // medicines, regional/pilot schemes or an enacted patient framework not yet operational.
  // "none": no patient route verified; research/export licences, proposals or CBD/hemp alone do not qualify.
  medical: z.enum(["legal", "limited", "none"]),
};

// The quick answers a profile states itself, where its scores would say it wrong (src/lib/answers.js):
// { carry: { answer: limited, text: "…" }, … }. "What if I'm caught?" is not a yes/no question,
// so its answer also needs a `label` ("A penalty", "Prison").
const answerOf = z.object({ answer: z.enum(["yes", "limited", "no"]), label: z.string().min(1).optional(), text: z.string().min(1) }).strict();
const answers = z
  .object({ carry: answerOf.optional(), grow: answerOf.optional(), buy: answerOf.optional(), public: answerOf.optional(), caught: answerOf.optional() })
  .strict()
  .refine((a) => !a.caught || a.caught.label, { message: 'answers.caught needs a label ("Nothing", "A penalty", …)' })
  .optional();

// countries/de.yaml, or countries/us/index.yaml for a federation → id "de", "us"
const countries = defineCollection({
  loader: glob({
    base: "./countries",
    pattern: ["*.yaml", "*/index.yaml"],
    generateId: ({ entry }) => entry.replace(/(\/index)?\.yaml$/, ""),
  }),
  schema: z
    .object({
      name: z.string().min(1),
      region: z.enum(["Africa", "Asia", "Europe", "North America", "South America", "Oceania"]),
      iso_numeric: z.number().int().optional(), // matches the country to its shape on the map
      // A territory that governs itself but is not generally recognised as a state. It gets a page
      // and a score, but no rank, and it is left out of the world averages. `part_of` is the file
      // name of the country it is internationally regarded as part of.
      disputed: z.object({ part_of: z.string().regex(/^[a-z]{2}$/), note: z.string().min(1) }).strict().optional(),
      // A dependency with its own laws, outside the country that answers for it internationally
      // (a Crown Dependency or an overseas territory). Shown and scored like a disputed territory:
      // a page, no rank, no part in the averages. `of` is that country's file name; `kind` is how
      // the place is described ("Crown Dependency", "British Overseas Territory").
      dependency: z.object({ of: z.string().regex(/^[a-z]{2}$/), kind: z.string().min(1), note: z.string().min(1) }).strict().optional(),
      flag: z.string().optional(), // an emoji to show when the two-letter code has no flag of its own
      ...status,
      updated: z.coerce.date(),
      // set by hand, once someone has gone through the country and found nothing left to add:
      // only then can the research page show 100% (see src/lib/research.js)
      complete: z.coerce.date().optional(),
      summary: z.string().min(1),
      // the search-result description, where the generated one (src/lib/seo.js) would say it wrong
      seo_description: z.string().min(50).max(300).optional(),
      scores: perSegment(score),
      answers,
      segments: perSegment(segment),
      // the three standard sections, plus `death_penalty` where the law provides for one and,
      // where they have been researched, `planting` (seeds and clones), the sections with a status
      // (`clubs`, `driving`, `visitors`), the plain optional ones (OPTIONAL_CONTEXT_IDS) and the
      // list of `spotlights`
      context: z.object({ death_penalty: cited.optional(), planting: planting.optional(), ...Object.fromEntries(OPTIONAL_CONTEXT_IDS.map((id) => [id, cited.optional()])), spotlights: z.array(spotlight).min(1).optional(), ...Object.fromEntries(CONTEXT_IDS.map((id) => [id, cited])), ...statusSections }).strict(),
      // Research-only exceptions: absence of evidence is a gap, not an exception.
      context_not_applicable: z.object(Object.fromEntries(CONTEXT_RESEARCH_IDS.map(id => [id,
        z.object({ text: z.string().refine(hasContextExplanation, { message: "explain why this category does not apply" }), sources: z.array(z.string()).min(1) }).strict().optional(),
      ]))).strict().optional(),
      // The words people in the country use for cannabis, as they write them, best known first. Shown
      // in the profile's opening; `atlas` links one to its entry in culture/language/<atlas>.md.
      words: z.array(z.object({
        word: z.string().min(1), // as written in its own script: "tráva"
        lang: z.string().min(1), // "Czech", "Canadian French"
        say: z.string().min(1).optional(), // a pronunciation or romanisation: "[traːva]"
        meaning: z.string().min(1).optional(), // what it says, or where it is used: "grass; slang"
        atlas: z.string().regex(/^[a-z0-9-]+$/).optional(),
        sources: z.array(z.string()).min(1),
      }).strict()).min(1).optional(),
      sources: z.record(z.string(), source),
      subunits: z
        .object({
          label: z.string(), // "State"
          plural: z.string(), // "states"
          intro: z.string(),
          sources: z.array(source),
        })
        .strict()
        .optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      // Every source key cited by a segment must be defined under `sources`.
      if (data.recreational === "death" && !data.context.death_penalty) {
        ctx.addIssue({ code: "custom", message: 'a country marked "recreational: death" needs a context.death_penalty section' });
      }
      const blocks = { ...data.segments, ...data.context } as Record<string, unknown>;
      for (const w of data.words ?? []) {
        for (const key of w.sources) if (!(key in data.sources)) ctx.addIssue({ code: "custom", message: `the word "${w.word}" cites unknown source "${key}"` });
      }
      for (const [name, block] of Object.entries(data.context_not_applicable ?? {})) {
        if (data.context[name]) ctx.addIssue({ code: "custom", message: `"${name}" has context content and a not-applicable explanation; choose one` });
        for (const key of block.sources) {
          if (!(key in data.sources)) ctx.addIssue({ code: "custom", message: `"context_not_applicable.${name}" cites unknown source "${key}"` });
        }
      }
      for (const [name, block] of Object.entries(blocks)) {
        for (const key of sectionSources(block)) {
          if (!(key in data.sources)) ctx.addIssue({ code: "custom", message: `"${name}" cites unknown source "${key}"` });
        }
      }
    }),
});

// A state's or province's own context: the same sections as a country's, each optional. Its sources
// are numbers into the file's numbered `sources` list (as its segments cite [@2]); a section it does
// not write is shown from its country, marked as national. Statuses use the country vocabularies.
const unitBlock = z.object({
  text: z.string().min(1),
  sources: z.array(z.number().int().positive()).optional(),
  status: z.string().optional(),
  seeds: plantingStatus.optional(), seeds_trade: plantingTrade.optional(), clones: plantingStatus.optional(), clones_trade: plantingTrade.optional(),
}).strict();
const UNIT_SECTIONS = ["death_penalty", "planting", ...Object.keys(STATUS_SECTIONS), ...OPTIONAL_CONTEXT_IDS, ...CONTEXT_IDS];
const unitContext = z.object({
  ...Object.fromEntries([...new Set(UNIT_SECTIONS)].map((k) => [k, unitBlock.optional()])),
  spotlights: z.array(z.object({ title: z.string().min(1), text: z.string().min(1), sources: z.array(z.number().int().positive()).optional() }).strict()).min(1).optional(),
}).strict()
  .superRefine((ctx, issue) => {
    for (const [key, section] of Object.entries(STATUS_SECTIONS)) {
      const st = (ctx as Record<string, { status?: string } | undefined>)[key]?.status;
      if (st && !(st in section.statuses)) issue.addIssue({ code: "custom", message: `context.${key}.status "${st}" is not one of ${Object.keys(section.statuses).join(", ")}` });
    }
  });
// a state's segment: its plain text, or the text with a penalty table
const unitSegment = z.union([z.string().min(1), z.object({ text: z.string().min(1), currency: z.string().regex(/^[A-Z]{3}$/).optional(), penalties: z.array(penalty).min(1).optional() }).strict()]);

// countries/us/ca.yaml → id "us/ca"
const units = defineCollection({
  loader: glob({
    base: "./countries",
    pattern: ["*/*.yaml", "!*/index.yaml"],
    generateId: ({ entry }) => entry.replace(/\.yaml$/, ""),
  }),
  schema: z
    .object({
      name: z.string().min(1),
      ...status,
      updated: z.coerce.date(),
      summary: z.string().min(1),
      seo_description: z.string().min(50).max(300).optional(),
      scores: perSegment(score),
      answers,
      segments: perSegment(unitSegment),
      sources: z.array(source),
      context: unitContext.optional(),
      // optional: how many people used cannabis in the past year, from the country's own survey.
      // The age band is the survey's (NSDUH 12+, Canadian Cannabis Survey 16+, NDSHS 14+), so it is
      // shown with the figure and not compared with the countries' 15–64.
      use: z
        .object({
          share: z.number().min(0).max(100), // per cent
          ages: z.string().min(1), // e.g. "12+"
          year: z.string().min(4), // survey year or years, e.g. "2022–2023"
          users: z.number().int().positive().optional(), // people, where the survey gives a count
          note: z.string().min(1).optional(), // e.g. when the survey publishes several parts together
          source: source,
        })
        .strict()
        .optional(),
    })
    .strict(),
});

// segments.yaml — the six scored segments
const segments = defineCollection({
  loader: file("segments.yaml"),
  schema: z
    .object({
      id: z.enum(SEGMENT_IDS as [string, ...string[]]),
      name: z.string(),
      weight: z.number().int().positive(),
      description: z.string(),
      levels: z.array(z.object({ score, text: z.string() }).strict()),
    })
    .strict(),
});

// changes.yaml — developments that moved a country's score
const changes = defineCollection({
  loader: file("changes.yaml"),
  schema: z
    .object({
      id: z.string(),
      date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, "use YYYY-MM-DD, YYYY-MM or YYYY"),
      category: z.enum(Object.keys(CHANGE_CATEGORIES) as [string, ...string[]]), // what kind of event it is; see segment-ids.js
      // A change has `country` and `before`. Without `before` the entry is context that moves no
      // score: a report or ruling in that country, or with no `country` a treaty or UN decision.
      country: z.string().regex(/^[a-z]{2}$/).optional(), // file name in /countries
      // optional: the state, province or territory the entry is mainly about, a file name in
      // /countries/<country>/ (e.g. "on" with country "ca"). It still belongs to the country.
      subunit: z.string().regex(/^[a-z]{2,3}$/).optional(),
      title: z.string().min(1),
      description: z.string().min(1),
      before: perSegment(score).optional(), // segment scores before the change
      // true when no first law is known for the country: the change is assumed to have happened
      // at some point between the 1925 and 1961 treaties, and `date` is the start of that window
      estimate: z.boolean().optional(),
      // the years an estimated change is assumed to fall between, when better than the default window
      window: z.tuple([z.number().int(), z.number().int()]).optional(),
      // true once the entry's date and event have been compared with a source that was actually
      // read. Without it the entry is listed as "not yet checked": it may rest on memory.
      checked: z.boolean().optional(),
      related: z.array(z.string()).optional(), // ids of other entries that tell the same story; shown as related on both pages
      // optional tags for grouping deeper than `category`; keys of CHANGE_TAGS in segment-ids.js
      tags: z.array(z.enum(Object.keys(CHANGE_TAGS) as [string, ...string[]])).min(1).optional(),
      // 1–10, set by hand only where the computed ranking in scripts/article-backlog.cjs is wrong;
      // it decides which entries get articles first and is not shown on the site
      importance: z.number().int().min(1).max(10).optional(),
      // why a ban, tightening, easing, legalisation, medical or death-penalty entry moves no score;
      // marks it as reviewed for scripts/score-triage.cjs and is not shown on the site
      unscored: z.string().min(1).optional(),
      sources: z.array(source).min(1), // the more the better; the first is shown where there is room for one
    })
    .strict()
    .refine((ch) => ch.country || !ch.before, { message: "`before` needs a `country`" })
    .refine((ch) => ch.country || !ch.subunit, { message: "`subunit` needs a `country`" }),
});

// prices.yaml — one sourced flower-price observation. Add older observations at any time;
// the site derives the latest street and medical value for every country.
const prices = defineCollection({
  loader: file("prices.yaml"),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      country: z.string().regex(/^[a-z]{2}$/),
      date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, "use YYYY-MM-DD, YYYY-MM or YYYY"),
      market: z.enum(["street", "medical"]),
      currency: z.string().regex(/^[A-Z]{3}$/),
      price: z.number().positive(), // price per gram in `currency`
      usd: z.number().positive(),   // same observation normalised to USD per gram
      note: z.string().min(1).refine((note) => !isMixedCannabisPrice(note), "Mixed or unspecified herb/resin prices do not belong in the flower-price dataset").optional(),
      comparison: z.boolean().default(true), // false retains the observation but excludes country price comparisons
      source: webSource,
    })
    .strict(),
});

// A picture with who made it and under which licence: the lead image of an article or culture entry.
// `src` is a file in src/assets, given relative to the Markdown file, so that Astro can optimise it.
const picture = (image: () => z.ZodTypeAny) => z.object({ src: image(), alt: z.string().min(1), caption: z.string().optional(), aspect_ratio: z.number().positive().optional(), position: z.enum(["center", "top", "right", "bottom", "left"]).optional(), fit: z.enum(["cover", "contain"]).optional(), credit: z.string().min(1), credit_url: z.string().url().optional(), license_url: z.string().url().optional() }).strict();

// articles/<change id>.md: an optional long read for a history entry. The entry in changes.yaml
// keeps its title and short description; the article adds the full story in Markdown, an
// optional lead image with its credit, further sources, and who wrote it and when.
const articles = defineCollection({
  loader: glob({ base: "./articles", pattern: "*.md" }),
  schema: ({ image }) => z
    .object({
      image: picture(image).optional(),
      model: z.string().min(1).optional(), // which model wrote it, with its effort where known: "opus-5.5", "gpt-5.6-sol-medium"
      written: z.coerce.date().optional(), // the day it was written
      sources: z.array(source).default([]),
    })
    .strict(),
});

// culture/<section>/<slug>.md: one entry of the cultural atlas, a word for cannabis (language) or
// a custom around it (traditions). The Markdown is the explanation; the front matter says where
// it is said or practised and which history entries it touches, so that the pages can link both ways.
const culture = defineCollection({
  loader: glob({ base: "./culture", pattern: "*/*.md" }),
  schema: ({ image }) => z
    .object({
      title: z.string().min(1),
      summary: z.string().min(1), // one or two sentences, shown on cards and under the title
      origin: z.string().min(1).optional(), // language: where the word comes from, in a few words; people: what they were
      life: z.string().min(1).optional(), // people: the years of their life, "1892–1975"
      also: z.array(z.string().min(1)).optional(), // other spellings and related words
      // how the word is written where it is used: the spelling in its own script, the language, and
      // optionally how it is said (IPA or a romanisation)
      spelling: z.array(z.object({ text: z.string().min(1), lang: z.string().min(1), say: z.string().min(1).optional() }).strict()).optional(),
      countries: z.array(z.string().regex(/^[a-z]{2}$/)).min(1), // file names in /countries, the most closely tied first
      history: z.array(z.string()).default([]), // ids in changes.yaml
      history_cards: z.array(z.string()).default([]), // events specifically about this subject; reverse cards on history pages
      // other atlas entries to show beside this one, as "<section>/<slug>", closest first.
      // Links in the text and shared history entries add more on their own; see docs/CULTURE.md.
      related: z.array(z.string().regex(/^(language|traditions|people)\/[a-z0-9-]+$/)).default([]),
      image: picture(image).optional(),
      // the entry's rank among the most important of its part (1 = first); see docs/CULTURE.md.
      // Featured entries lead the Culture page and their section; the rest follow alphabetically.
      featured: z.number().int().positive().optional(),
      model: z.string().min(1).optional(),
      written: z.coerce.date().optional(),
      sources: z.array(source).min(1),
    })
    .strict(),
});

// datasets/datasets.yaml — what each outside dataset (a CSV in /datasets) is and how to read it;
// src/lib/datasets.js reads the CSVs themselves
const column = z.object({
  column: z.string().min(1), decimals: z.number().int().min(0).optional(), type: z.enum(["number", "boolean", "text"]).default("number"), about: z.string().min(1).optional(),
  format: z.enum(["number", "percent", "decimal", "rank", "text"]).optional(), values: z.record(z.string(), z.string()).optional(),
}).strict();
const csvFile = z.string().regex(/^[\w.-]+\.csv$/);
const originalFile = z.string().regex(/^[\w.-]+\.(xlsx|xls|csv|xml)$/);
const datasets = defineCollection({
  loader: file("datasets/datasets.yaml"),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9_]+$/),
      // one CSV, or one per edition of a dataset published as a new file each time
      file: z.union([csvFile, z.array(z.object({ file: csvFile, edition: z.number().int() }).strict()).min(1)]),
      rail: z.boolean().default(false), // also shown in the profile's opening, "Cannabis in …"
      // how it reads in the profile's Datasets section: {field} templates, see datasets.yaml
      // optional for a worldwide dataset (no `country`), which no profile shows
      profile: z.object({ headline: z.string().min(1), details: z.string().optional(), years: z.array(z.number().int()).optional(), each: z.string().optional() }).strict().optional(),
      origin: z.string().min(1), // how the file was made: downloaded as published or transcribed, and when
      // the publisher's file (or files) an extract was made from
      original: z.union([originalFile, z.array(originalFile).min(1)]).optional(),
      name: z.string().min(1),
      publisher: z.string().min(1),
      credit: z.string().min(1).optional(), // a short name for the publisher
      title: z.string().min(1),
      url: z.string().url(),
      data_url: z.string().url().optional(),
      data_label: z.string().min(1).optional(),
      when: z.string().min(1),
      about: z.string().min(1),
      notes: z.record(z.string(), z.string()).default({}), // by country file name
      // which column names the country; left out for a worldwide dataset, whose rows are kept as they are
      country: z.object({
        column: z.string().min(1), by: z.enum(["id", "name"]),
        aliases: z.record(z.string(), z.string()).default({}),
        unprofiled: z.array(z.string().min(1)).default([]), // known source places without a standalone profile
      }).strict().optional(),
      year: z.object({ column: z.string().min(1) }).strict().optional(), // a column with the year of each row
      fields: z.record(z.string(), column),
      pages: z.array(z.object({ label: z.string().min(1), path: z.string() }).strict()).optional(),
      also: z.string().min(1).optional(),
      map: z.object({
        field: z.string(), format: z.enum(["number", "percent", "decimal", "rate"]),
        per: z.number().positive().optional(), group: z.enum(["Use", "Society", "Law", "Context"]).default("Society"),
        since: z.number().int().optional(), // a series: its latest year must be this recent to be shown
        window: z.number().int().positive().optional(), // the year slider: how many years back a figure still counts (5)
        slug: z.string().regex(/^[a-z0-9-]+$/), label: z.string(), missing: z.string(),
        steps: z.array(z.tuple([z.number(), z.string()])).length(5),
        title: z.string(), lede: z.string(), sub: z.string(), note: z.string(),
      }).strict().optional(),
    })
    .strict()
    .refine((d) => !d.map || d.map.field in d.fields, { message: "map.field must be one of the fields" }),
});

// glossary.yaml: words a reader may not know, explained on hover in every text (src/lib/terms.js)
const glossary = defineCollection({
  loader: file("glossary.yaml"),
  schema: z.object({ id: z.string().min(1), also: z.array(z.string().min(1)).optional(), text: z.string().min(10) }).strict(),
});

export const collections = { countries, units, segments, changes, prices, articles, culture, datasets, glossary };
