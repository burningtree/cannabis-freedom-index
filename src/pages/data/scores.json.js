// Download: scores.json
import { scoreRows, file } from "../../lib/exports.js";

export const GET = () => file(JSON.stringify(scoreRows, null, 1), "application/json");
