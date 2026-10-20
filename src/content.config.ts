// Where the site's data comes from, and what a valid file looks like.
// The build fails with a clear message if a file in /countries breaks these rules.
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { SEGMENT_IDS, CONTEXT_IDS, CHANGE_CATEGORIES, CHANGE_TAGS, PLANTING_STATUS, PLANTING_TRADE, STATUS_SECTIONS } from "./lib/segment-ids.js";

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
// seeds and clones: the same cited text, plus for each a status for having and planting them
// (PLANTING_STATUS) and one for selling or handing them on (PLANTING_TRADE)
const plantingStatus = z.enum(Object.keys(PLANTING_STATUS) as [string, ...string[]]);
const plantingTrade = z.enum(Object.keys(PLANTING_TRADE) as [string, ...string[]]);
const planting = z.object({ seeds: plantingStatus, seeds_trade: plantingTrade, clones: plantingStatus, clones_trade: plantingTrade, text: z.string().min(1), sources: z.array(z.string()) }).strict();
// clubs, driving, visitors: the cited text plus one status from that section's vocabulary (STATUS_SECTIONS)
const statusSections = Object.fromEntries(Object.entries(STATUS_SECTIONS).map(([key, section]) => [key,
  z.object({ status: z.enum(Object.keys(section.statuses) as [string, ...string[]]), text: z.string().min(1), sources: z.array(z.string()) }).strict().optional()]));
const status = {
  // "death": illegal, and the law allows the death penalty for cannabis offences, in practice trafficking.
  recreational: z.enum(["legal", "partial", "decriminalised", "illegal", "death"]),
  // "legal": an established patient route for cannabis or cannabis-based medicine.
  // "limited": case-specific or pharmaceutical-only access, or legal authority limited to a pilot,
  // one region, research/production, or a framework that is not yet operational.
  // "none": no legal medical use; a proposal, CBD/hemp alone, or a future programme does not qualify.
  medical: z.enum(["legal", "limited", "none"]),
};

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
      scores: perSegment(score),
      segments: perSegment(cited),
      // the four standard sections, plus `death_penalty` where the law provides for one and,
      // where they have been researched, `planting` (seeds and clones), the sections with a status
      // (`clubs`, `driving`, `visitors`), `black_market` (the illegal market) and `arrests`
      // (arrests and prisoners, as far as the country publishes them)
      context: z.object({ death_penalty: cited.optional(), planting: planting.optional(), ...statusSections, black_market: cited.optional(), arrests: cited.optional(), ...Object.fromEntries(CONTEXT_IDS.map((id) => [id, cited])) }).strict(),
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
      const blocks = { ...data.segments, ...data.context } as Record<string, { sources: string[] }>;
      for (const [name, block] of Object.entries(blocks)) {
        for (const key of block.sources) {
          if (!(key in data.sources)) ctx.addIssue({ code: "custom", message: `"${name}" cites unknown source "${key}"` });
        }
      }
    }),
});

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
      scores: perSegment(score),
      segments: perSegment(z.string().min(1)),
      sources: z.array(source),
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
      note: z.string().min(1).optional(),
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
const datasets = defineCollection({
  loader: file("datasets/datasets.yaml"),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9_]+$/),
      file: z.string().regex(/^[\w.-]+\.csv$/),
      rail: z.boolean().default(false), // also shown in the profile's side column
      // how it reads in the profile's Datasets tab: {field} templates, see datasets.yaml
      profile: z.object({ headline: z.string().min(1), details: z.string().optional(), years: z.array(z.number().int()).optional() }).strict(),
      origin: z.string().min(1), // how the file was made: downloaded as published or transcribed, and when
      original: z.string().regex(/^[\w.-]+\.(xlsx|xls|csv)$/).optional(), // the publisher's file an extract was made from
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
      country: z.object({ column: z.string().min(1), by: z.enum(["id", "name"]), aliases: z.record(z.string(), z.string()).default({}) }).strict(),
      year: z.object({ column: z.string().min(1), keep: z.enum(["latest", "all"]).default("latest") }).strict().optional(),
      fields: z.record(z.string(), column),
      pages: z.array(z.object({ label: z.string().min(1), path: z.string() }).strict()).optional(),
      also: z.string().min(1).optional(),
      map: z.object({
        field: z.string(), format: z.enum(["percent", "decimal", "rate"]),
        per: z.number().positive().optional(), group: z.enum(["Use", "Society", "Law"]).default("Society"),
        slug: z.string().regex(/^[a-z0-9-]+$/), label: z.string(), missing: z.string(),
        steps: z.array(z.tuple([z.number(), z.string()])).length(5),
        title: z.string(), lede: z.string(), sub: z.string(), note: z.string(),
      }).strict().optional(),
    })
    .strict()
    .refine((d) => !d.map || d.map.field in d.fields, { message: "map.field must be one of the fields" }),
});

export const collections = { countries, units, segments, changes, prices, articles, culture, datasets };
