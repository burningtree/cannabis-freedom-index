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

const FORMATS = { percent: (v) => `${v}%`, decimal: (v) => v.toFixed(2), rate: (v) => (v < 10 ? v.toFixed(1) : String(Math.round(v))) };
const fileStats = (raw) => ({ bytes: raw.length, sha256: createHash("sha256").update(raw).digest("hex") });

// every definition whose file exists, with its figures by country file name: { de: { … }, … };
// `total` is how many places the file covers, `count` how many of them have a country file
const loaded = (await getCollection("datasets")).flatMap(({ data: def }) => {
  const path = `datasets/${def.file}`;
  if (!fs.existsSync(path)) {
    console.warn(`[datasets] ${path} is missing: "${def.id}" is left out of the site`);
    return [];
  }
  const raw = fs.readFileSync(path);
  let rows = readCsv(raw.toString("utf8"));
  // what the sources page says about the file itself
  const years = def.year ? rows.map((r) => +r[def.year.column]).filter(Number.isFinite) : [];
  const fileInfo = {
    ...fileStats(raw),
    original: def.original && fileStats(fs.readFileSync(`datasets/${def.original}`)),
    rows: rows.length, columns: Object.keys(rows[0] ?? {}).length,
    years: years.length ? [Math.min(...years), Math.max(...years)] : null,
  };
  // a file with a row per country and year: keep the latest year, or with `keep: all` each
  // country's whole series, oldest first
  const series = def.year?.keep === "all";
  if (def.year && !series) {
    const latest = Math.max(...rows.map((r) => +r[def.year.column]).filter(Number.isFinite));
    rows = rows.filter((r) => +r[def.year.column] === latest);
  }
  const values = {}, missed = [];
  for (const r of rows) {
    const key = r[def.country.column];
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
    if (def.map && figures[def.map.field] == null) continue;
    const row = { ...figures, ...(def.year && { year: +r[def.year.column] }) };
    if (series) (values[id] ??= []).push(row);
    else values[id] = row;
  }
  if (series) for (const list of Object.values(values)) list.sort((a, b) => a.year - b.year);
  if (missed.length) console.warn(`[datasets] ${def.file}: no country file for ${missed.join("; ")}. Add an alias in datasets/datasets.yaml if one exists.`);
  return [{ ...def, values, fileInfo, count: Object.keys(values).length, total: new Set(rows.map((r) => r[def.country.column])).size, map: def.map && { ...def.map, value: (d, c) => (def.map.per ? (d[def.map.field] / c.population) * def.map.per : d[def.map.field]), format: FORMATS[def.map.format] } }];
});

export const DATASETS = Object.fromEntries(loaded.map((d) => [d.id, d]));
// the ones with a map view of their own (the Society group); cannabis use has the Use group
export const MAPPED = loaded.filter((d) => d.map);
export const DATASET_KEYS = Object.keys(DATASETS);

// One country's figures from every dataset that covers it: { pew_marijuana: { … }, hfi: { … } }
export const datasetsOf = (slug) => Object.fromEntries(loaded.filter((d) => d.values[slug]).map((d) => [d.id, d.values[slug]]));

// What the map script needs, without functions: for each dataset its label, steps and texts.
export const datasetScales = Object.fromEntries(MAPPED.map((d) => [d.id,
  { label: d.map.label, missing: d.map.missing, steps: d.map.steps, sub: d.map.sub, note: d.map.note, total: d.total }]));

// A country's map figure for each dataset (absent = not covered), plus the others the hover box shows.
export const datasetMapValues = (c) => Object.fromEntries(MAPPED
  .filter((d) => c.datasets[d.id])
  .map((d) => [d.id, { v: d.map.value(c.datasets[d.id], c), t: d.map.format(d.map.value(c.datasets[d.id], c)), ...c.datasets[d.id] }]));
