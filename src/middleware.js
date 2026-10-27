// Runs over every page as it is built. The term layer (src/lib/terms.js) marks a word once per text,
// but a page can hold several separately rendered texts: a history entry's summary and its article,
// say. Here every word keeps only its first mark on the page; later marks become plain text again.
import { defineMiddleware } from "astro:middleware";

const TERM = /<(a|span)\b([^>]*\bclass="term term-([lg])"[^>]*)>([^<]*)<\/\1>/g;
const keyOf = (attrs, kind) => (kind === "l" ? attrs.match(/\bhref="([^"]*)"/)?.[1] : attrs.match(/\bdata-title="([^"]*)"/)?.[1]);

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get("content-type")?.includes("text/html")) return response;
  const html = await response.text();
  const seen = new Set();
  const out = html.replace(TERM, (all, _tag, attrs, kind, text) => {
    const key = `${kind}:${keyOf(attrs, kind)}`;
    if (seen.has(key)) return text;
    seen.add(key);
    return all;
  });
  return new Response(out, { status: response.status, statusText: response.statusText, headers: response.headers });
});
