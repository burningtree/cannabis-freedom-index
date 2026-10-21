// Outside datasets: the CSV files in /datasets, read as they are at build time, as described in
// datasets/datasets.yaml. They are shown beside the index, on the map and on the profiles, and
// are never part of the score. Nothing is copied into the country files.
import fs from "node:fs";
import { createHash } from "node:crypto";
import { getCollection } from "astro:content";

// a plain CSV reader: quoted fields may hold commas, line breaks and doubled quotes
function readCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  const head = rows.shift().map((h) => h.trim());
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()])));
}

// country file names, and the name each file gives, for datasets that name countries
const countryFiles = await getCollection("countries");
const ids = new Set(countryFiles.map((e) => e.id));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
const byName = new Map(countryFiles.map((e) => [norm(e.data.name), e.id]));

const FORMATS = { number: (v) => v.toLocaleString("en-GB"), percent: (v) => `${v}%`, decimal: (v) => v.toFixed(2), rate: (v) => (v < 10 ? v.toFixed(1) : String(Math.round(v))) };
const originalsOf = (def) => [def.original ?? []].flat();
const fileStats = (raw) => ({ bytes: raw.length, sha256: createHash("sha256").update(raw).digest("hex") });

// the order of datasets.yaml, which the collection does not keep
const defsText = fs.readFileSync("datasets/datasets.yaml", "utf8");
const place = (id) => defsText.indexOf(`- id: ${id}\n`);
// The files of a dataset: one, or one per edition ({ file, edition }) for a dataset published
// as a new file each time, such as a yearly survey. An edition's rows take its year unless the
// file has a year column of its own.
const filesOf = (def) => (typeof def.file === "string" ? [{ file: def.file }] : def.file);
// Every definition whose files exist, with its figures by country file name as a series, oldest
// first: { de: [{ year: 2021, … }, { year: 2024, … }], … }. A dataset with no years has one row
// per country. `total` is how many places the files cover, `count` how many have a country file.
const loaded = (await getCollection("datasets")).flatMap(({ data: def }) => {
  const files = filesOf(def);
  const absent = files.filter((f) => !fs.existsSync(`datasets/${f.file}`));
  if (absent.length) {
    console.warn(`[datasets] ${absent.map((f) => `datasets/${f.file}`).join(", ")} missing: "${def.id}" is left out of the site`);
    return [];
  }
  const values = {}, missed = [], places = new Set();
  const fileInfo = { files: [], originals: originalsOf(def).map((name) => ({ name, ...fileStats(fs.readFileSync(`datasets/${name}`)) })) };
  for (const { file, edition } of files) {
    const path = `datasets/${file}`;
    const raw = fs.readFileSync(path);
    const rows = readCsv(raw.toString("utf8"));
    const yearOf = (r) => (def.year ? (r[def.year.column] === "" ? undefined : +r[def.year.column]) : edition);
    const years = rows.map(yearOf).filter(Number.isFinite);
    // what the sources page says about the file itself
    fileInfo.files.push({ name: file, edition, ...fileStats(raw), rows: rows.length, columns: Object.keys(rows[0] ?? {}).length,
      years: years.length ? [Math.min(...years), Math.max(...years)] : null });
    for (const r of rows) {
      const key = r[def.country.column];
      if (!key) continue; // a row kept for a place with no country file, such as a former state
      places.add(key);
      const id = def.country.aliases[key] ?? (def.country.by === "id" ? key.toLowerCase() : byName.get(norm(key)));
      if (!id || !ids.has(id)) { missed.push(key); continue; }
      const figures = {};
      for (const [name, { column, decimals, type }] of Object.entries(def.fields)) {
        if (!(column in r)) throw new Error(`${path}: no column "${column}" (field "${name}" in datasets.yaml)`);
        if (type === "boolean") { if (r[column] === "true") figures[name] = true; continue; }
        if (type === "text") { if (r[column] !== "") figures[name] = r[column]; continue; }
        if (r[column] === "" || isNaN(+r[column])) continue;
        figures[name] = decimals == null ? +r[column] : +(+r[column]).toFixed(decimals);
      }
      const year = yearOf(r);
      (values[id] ??= []).push({ ...figures, ...(year != null && { year }) });
    }
  }
  // oldest first; a row without a year (a regional estimate) stands alone
  for (const list of Object.values(values)) list.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
  if (missed.length) console.warn(`[datasets] ${def.id}: no country file for ${[...new Set(missed)].join("; ")}. Add an alias in datasets/datasets.yaml if one exists.`);
  const allYears = fileInfo.files.flatMap((f) => f.years ?? []);
  fileInfo.years = allYears.length ? [Math.min(...allYears), Math.max(...allYears)] : null;
  return [{ ...def, files: fileInfo.files.map((f) => f.name), values, fileInfo, count: Object.keys(values).length, total: places.size,
    map: def.map && { ...def.map, value: (d, c) => (def.map.per ? (d[def.map.field] / c.population) * def.map.per : d[def.map.field]), format: FORMATS[def.map.format] } }];
});

loaded.sort((a, b) => place(a.id) - place(b.id));
export const DATASETS = Object.fromEntries(loaded.map((d) => [d.id, d]));
// the ones with a map view of their own (the Society group); cannabis use has the Use group
export const MAPPED = loaded.filter((d) => d.map);
export const DATASET_KEYS = Object.keys(DATASETS);

// One country's series from every dataset that covers it: { hfi: [{ year: 2000, … }, …], … }
export const datasetsOf = (slug) => Object.fromEntries(loaded.filter((d) => d.values[slug]).map((d) => [d.id, d.values[slug]]));
// One country's latest figures from every dataset that covers it: { hfi: { year: 2023, … }, … }
export const latestOf = (slug) => Object.fromEntries(loaded.filter((d) => d.values[slug]).map((d) => [d.id, d.values[slug].at(-1)]));

// The first and last year a dataset's map figure has, if it has more than one year: [from, to].
export const yearsOf = (d) => {
  const years = new Set(Object.values(d.values).flatMap((rows) => rows.filter((r) => r.year != null && r[d.map.field] != null).map((r) => r.year)));
  return years.size > 1 ? [Math.min(...years), Math.max(...years)] : null;
};

// How many countries have a figure in each year from the first to the last: [12, 0, 15, …], for the
// bars of the year control. Null for a dataset with a single year.
const coverageOf = (d) => {
  const years = yearsOf(d);
  if (!years) return null;
  const counts = new Array(years[1] - years[0] + 1).fill(0);
  for (const rows of Object.values(d.values)) for (const r of rows) if (r.year != null && r[d.map.field] != null) counts[r.year - years[0]]++;
  return counts;
};

// What the map script needs, without functions: for each dataset its label, steps and texts,
// and for a dataset with several years their range and how far back the slider looks for a
// country's figure (`window`, in years).
export const datasetScales = Object.fromEntries(MAPPED.map((d) => [d.id,
  { label: d.map.label, missing: d.map.missing, steps: d.map.steps, sub: d.map.sub, note: d.map.note, total: d.total,
    years: yearsOf(d), coverage: coverageOf(d), window: d.map.window ?? 5 }]));

// A country's map figure for each dataset (absent = not covered), plus the others the hover box shows.
// A series is shown by its latest year, and only if that year is no older than `map.since`.
const mapRow = (d, series) => {
  const row = series.findLast((r) => r[d.map.field] != null);
  return row && (!d.map.since || row.year >= d.map.since) ? row : null;
};
export const datasetMapValues = (c) => Object.fromEntries(MAPPED
  .map((d) => [d, c.series[d.id] && mapRow(d, c.series[d.id])])
  .filter(([, row]) => row)
  .map(([d, row]) => [d.id, { v: d.map.value(row, c), t: d.map.format(d.map.value(row, c)), ...row }]));
