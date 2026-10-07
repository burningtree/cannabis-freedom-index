import { priceRows, toCsv, file } from "../../lib/exports.js";

export const GET = () => file(toCsv(priceRows), "text/csv");
