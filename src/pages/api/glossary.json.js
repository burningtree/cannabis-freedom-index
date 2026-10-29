import { glossaryAPI } from "../../lib/glossary-api.js";

export function GET() {
  return new Response(JSON.stringify(glossaryAPI()), { headers: { "Content-Type": "application/json; charset=utf-8" } });
}
