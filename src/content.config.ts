// Where the site's data comes from, and what a valid file looks like.
// The build fails with a clear message if a file in /countries breaks these rules.
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { SEGMENT_IDS, CONTEXT_IDS, CHANGE_CATEGORIES } from "./lib/segment-ids.js";

const score = z.number().int().min(0).max(10);
const perSegment = <T extends z.ZodTypeAny>(value: T) =>
  z.object(Object.fromEntries(SEGMENT_IDS.map((id) => [id, value])) as Record<string, T>).strict();
const source = z.object({ title: z.string().min(1), url: z.string().url() }).strict();
const cited = z.object({ text: z.string().min(1), sources: z.array(z.string()) }).strict();
const status = {
  // "death": illegal, and the law allows the death penalty for cannabis offences, in practice trafficking.
  recreational: z.enum(["legal", "partial", "decriminalised", "illegal", "death"]),
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
      flag: z.string().optional(), // an emoji to show when the two-letter code has no flag of its own
      // Population by year: a snapshot every ten years from 1900 (Our World in Data) and the
      // latest figure (World Bank). It weights the population-weighted world average.
      population: z.record(z.string().regex(/^\d{4}$/), z.number().int().positive()),
      // People who used cannabis in the past year. `prevalence` is the share of 15–64-year-olds,
      // from the survey of `year` (UNODC World Drug Report figures); `users` is that share of the
      // country's 15–64 population today. Where there is no survey, `estimate: true` and the
      // prevalence is the median of the surveyed countries in the same region.
      cannabis_use: z.object({
        prevalence: z.number().min(0).max(100),
        year: z.number().int().optional(),
        estimate: z.boolean().optional(),
        users: z.number().int().nonnegative(),
      }).strict(),
      ...status,
      updated: z.coerce.date(),
      summary: z.string().min(1),
      scores: perSegment(score),
      segments: perSegment(cited),
      // the four standard sections, plus `death_penalty` where the law provides for one
      context: z.object({ death_penalty: cited.optional(), ...Object.fromEntries(CONTEXT_IDS.map((id) => [id, cited])) }).strict(),
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
      if ((data.recreational === "death") !== Boolean(data.context.death_penalty)) {
        ctx.addIssue({ code: "custom", message: 'a country marked "recreational: death" needs a context.death_penalty section, and only such a country may have one' });
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
      sources: z.array(source).min(1), // the more the better; the first is shown where there is room for one
    })
    .strict()
    .refine((ch) => ch.country || !ch.before, { message: "`before` needs a `country`" }),
});

export const collections = { countries, units, segments, changes };
