// Where the site's data comes from, and what a valid file looks like.
// The build fails with a clear message if a file in /countries breaks these rules.
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { SEGMENT_IDS, CONTEXT_IDS } from "./lib/segment-ids.js";

const score = z.number().int().min(0).max(10);
const perSegment = <T extends z.ZodTypeAny>(value: T) =>
  z.object(Object.fromEntries(SEGMENT_IDS.map((id) => [id, value])) as Record<string, T>).strict();
const source = z.object({ title: z.string().min(1), url: z.string().url() }).strict();
const cited = z.object({ text: z.string().min(1), sources: z.array(z.string()) }).strict();
const status = {
  recreational: z.enum(["legal", "partial", "decriminalised", "illegal"]),
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
      ...status,
      updated: z.coerce.date(),
      summary: z.string().min(1),
      scores: perSegment(score),
      segments: perSegment(cited),
      context: z.object(Object.fromEntries(CONTEXT_IDS.map((id) => [id, cited]))).strict(),
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
      date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "use YYYY-MM-DD or YYYY-MM"),
      country: z.string().regex(/^[a-z]{2}$/), // file name in /countries
      title: z.string().min(1),
      description: z.string().min(1),
      before: perSegment(score), // segment scores before the change
      source,
    })
    .strict(),
});

export const collections = { countries, units, segments, changes };
