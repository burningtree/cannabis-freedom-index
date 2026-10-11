// The counted results of the current survey edition, as published on /survey/. Counts only:
// no single answer and no free text. While the file is marked "mock" the numbers are invented.
import { results } from "../../lib/survey.js";
import { file } from "../../lib/exports.js";

export const GET = () => file(JSON.stringify(results), "application/json");
