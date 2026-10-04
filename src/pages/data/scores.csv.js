// Download: scores.csv
import { scoreRows, toCsv, file } from "../../lib/exports.js";

export const GET = () => file(toCsv(scoreRows), "text/csv");
