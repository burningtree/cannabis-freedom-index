// Land neighbours: two countries are neighbours when their shapes on the site's world map
// (world-atlas, Natural Earth 1:50m) share a border line. Sea borders do not count.
import { neighbors } from "topojson-client";
import worldText from "world-atlas/countries-50m.json?raw";
import { countries } from "./countries.js";

const atlas = JSON.parse(worldText);
const geoms = atlas.objects.countries.geometries;
const byNum = new Map(countries.filter((c) => c.num != null).map((c) => [String(+c.num), c]));

// country id → the ids of its land neighbours
export const neighboursOf = new Map(countries.map((c) => [c.id, []]));
neighbors(geoms).forEach((list, i) => {
  const a = byNum.get(String(+geoms[i].id));
  if (!a) return;
  for (const j of list) {
    const b = byNum.get(String(+geoms[j].id));
    if (b && b !== a && !neighboursOf.get(a.id).includes(b.id)) neighboursOf.get(a.id).push(b.id);
  }
});
