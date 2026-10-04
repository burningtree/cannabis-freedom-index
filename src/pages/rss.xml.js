// RSS feed of changes that moved a country's score, newest first.
import { SITE, scoreChanges, dateTime } from "../lib/exports.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET({ site }) {
  const root = (site?.href ?? SITE + "/").replace(/\/$/, "") + import.meta.env.BASE_URL;
  const items = scoreChanges.slice(0, 50).map((ch) => {
    const delta = ch.score.after - ch.score.before;
    const link = `${root}history/${ch.id}/`;
    return `    <item>
      <title>${esc(`${ch.title} (${ch.score.before} → ${ch.score.after})`)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(dateTime(ch.date)).toUTCString()}</pubDate>
      <category>${esc(ch.kind.label)}</category>
      <description>${esc(`${ch.description} Index score ${ch.score.before} → ${ch.score.after} (${delta >= 0 ? "+" : "−"}${Math.abs(delta)}). Source: ${ch.source[0]}.`)}</description>
    </item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cannabis Freedom Index: score changes</title>
    <link>${root}changelog/</link>
    <atom:link href="${root}rss.xml" rel="self" type="application/rss+xml"/>
    <description>Laws and rulings that moved a country's score on the Cannabis Freedom Index.</description>
    <language>en</language>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
