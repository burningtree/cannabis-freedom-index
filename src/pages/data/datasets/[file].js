// Download: the outside datasets exactly as they are in /datasets (each CSV, byte for byte, and
// datasets.yaml, which says how the site reads them). Listed on the sources page.
import fs from "node:fs";
import { DATASETS } from "../../../lib/datasets.js";

const TYPES = { csv: "text/csv", yaml: "text/yaml", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", xls: "application/vnd.ms-excel" };
const TEXT = new Set(["csv", "yaml"]);

export const getStaticPaths = () => ["datasets.yaml", ...Object.values(DATASETS).flatMap((d) => [d.file, d.original].filter(Boolean))].map((file) => ({ params: { file } }));

export const GET = ({ params }) => new Response(fs.readFileSync(`datasets/${params.file}`), {
  headers: { "Content-Type": ((ext) => TEXT.has(ext) ? `${TYPES[ext]}; charset=utf-8` : TYPES[ext])(params.file.split(".").pop()) },
});
