// Download: history.csv
import { historyRows, toCsv, file } from "../../lib/exports.js";

export const GET = () => file(toCsv(historyRows), "text/csv");
