// Download: panel.csv — every place in every year
import { panelRows, toCsv, file } from "../../lib/exports.js";

export const GET = () => file(toCsv(panelRows), "text/csv");
