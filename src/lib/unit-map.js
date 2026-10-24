// A federation's map, drawn at build time: its states, provinces or territories coloured by score,
// shown above their ranked list on the country's profile. Shapes come from src/data/subunits.geo.json
// (keyed "us/ca"), the same ones the home page's map draws with its "show states" switch.
import { geoAlbersUsa, geoConicConformal, geoConicEqualArea, geoNaturalEarth1, geoPath } from "d3-geo";
import shapes from "../data/subunits.geo.json";

// Each country in the projection its own maps use; the US with Alaska and Hawaii set in below.
const PROJECTIONS = {
  us: () => geoAlbersUsa(),
  ca: () => geoConicConformal().rotate([91.87, 0]).parallels([49, 77]),
  au: () => geoConicEqualArea().rotate([-132, 0]).parallels([-18, -36]),
};

// width × height: the box the map is fitted into. Returns null when no shape exists for the country.
// Each shape is { unit, d } in the order of `units`; a unit too small to see (DC, the ACT) also gets a dot.
export function unitMap(slug, units, width = 640, height = 400) {
  const features = units
    .map((unit) => ({ unit, f: shapes.features.find((f) => f.id === `${slug}/${unit.id}`) }))
    .filter((x) => x.f);
  if (!features.length) return null;
  const projection = (PROJECTIONS[slug] ?? geoNaturalEarth1)();
  projection.fitSize([width, height], { type: "FeatureCollection", features: features.map((x) => x.f) });
  const path = geoPath(projection).digits(1);
  const drawn = features.map(({ unit, f }) => ({ unit, f, d: path(f) })).filter((x) => x.d);
  // shrink the box to what was drawn, so a wide country leaves no empty band
  const [[x0, y0], [x1, y1]] = path.bounds({ type: "FeatureCollection", features: drawn.map((x) => x.f) });
  const pad = 4;
  const viewBox = [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad].map((n) => +n.toFixed(1)).join(" ");
  const dots = drawn.filter((x) => path.area(x.f) < 20).map(({ unit, f }) => {
    const [x, y] = path.centroid(f);
    return { unit, x: +x.toFixed(1), y: +y.toFixed(1) };
  });
  return { viewBox, shapes: drawn.map(({ unit, d }) => ({ unit, d })), dots };
}
