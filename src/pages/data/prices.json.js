import { priceRows, file } from "../../lib/exports.js";

export const GET = () => file(JSON.stringify(priceRows, null, 1), "application/json");
