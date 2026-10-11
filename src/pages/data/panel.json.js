// Download: panel.json — every place in every year (compact: it is a large file)
import { panelRows, file } from "../../lib/exports.js";

export const GET = () => file(JSON.stringify(panelRows), "application/json");
