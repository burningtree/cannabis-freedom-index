// Download: history.json
import { historyRows, file } from "../../lib/exports.js";

export const GET = () => file(JSON.stringify(historyRows, null, 1), "application/json");
