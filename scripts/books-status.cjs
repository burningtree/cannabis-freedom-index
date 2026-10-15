// docs/books.yaml is the research record; books/ remains a private local library.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const yaml = require('js-yaml');
const ROOT = path.resolve(__dirname, '..');
const STATUSES = new Set(['indexed_only', 'read', 'selected_pages_read', 'selected_sections_read']);
const md = value => String(value instanceof Date ? value.toISOString().slice(0, 10) : Array.isArray(value) ? value.join('; ') : value ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

function summarize(book) {
  const chapters = book.chapters || [];
  const read = chapters.filter(c => c.status === 'read').length;
  const partial = chapters.filter(c => c.status.startsWith('selected_')).length;
  const applied = [...new Set(chapters.flatMap(c => c.applied_to || []))];
  return { total: chapters.length, read, partial, indexed: chapters.length - read - partial,
    applied, illustrations: (book.illustrations || []).length };
}

function inspect(root, books) {
  const issues = [], seen = new Set(), files = new Set();
  const rows = books.map(book => {
    if (!book.id || seen.has(book.id)) throw new Error(`Missing/duplicate book ID: ${book.id}`);
    seen.add(book.id);
    if (book.metadata_status && !['verified', 'awaiting_verification'].includes(book.metadata_status))
      throw new Error(`Unknown metadata_status: ${book.id}`);
    if (!book.local_file || !/^books\/[^/]+\.(pdf|epub)$/i.test(book.local_file))
      throw new Error(`Invalid local_file: ${book.id}`);
    if (files.has(book.local_file)) throw new Error(`Duplicate local_file: ${book.local_file}`);
    files.add(book.local_file);
    for (const chapter of book.chapters || []) {
      if (!STATUSES.has(chapter.status)) throw new Error(`Unknown chapter status in ${book.id}: ${chapter.status}`);
      if (!chapter.title) throw new Error(`Chapter title missing in ${book.id}`);
      if (chapter.status !== 'indexed_only' && !chapter.pages_reviewed && !chapter.sections_reviewed)
        issues.push(`${book.id}: reviewed chapter lacks a reading locator: ${chapter.title}`);
    }
    const local = path.join(root, book.local_file);
    let file = 'missing locally';
    if (fs.existsSync(local)) {
      const hash = crypto.createHash('sha256').update(fs.readFileSync(local)).digest('hex');
      file = hash === book.sha256 ? 'matches recorded hash' : 'HASH CHANGED / not recorded';
      if (hash !== book.sha256) issues.push(`${book.id}: local file differs from recorded SHA-256`);
    }
    return { book, ...summarize(book), file };
  });
  const dir = path.join(root, 'books');
  const uncatalogued = fs.existsSync(dir) ? fs.readdirSync(dir)
    .filter(f => /\.(pdf|epub)$/i.test(f) && !files.has(`books/${f}`)).sort() : [];
  return { rows, issues, uncatalogued };
}

function render({ rows, issues, uncatalogued }) {
  const lines = ['# Book research coverage', '',
    'Generated from [books.yaml](books.yaml) and the local `books/` inventory. Refresh with `npm run books:report`; inspect without writing with `npm run books:status`.', '',
    '**Read** means the recorded chapter was read; **partial** means only the named pages or sections were examined; **indexed** means a contents entry only. Counts include introductions where catalogued. They are not percentages of pages or proof that a whole book is covered. Applied targets count distinct recorded content/event references, not independent findings.', '',
    `**${rows.length} catalogued books**; ${rows.filter(r => r.read + r.partial > 0).length} with recorded substantive reading; ${rows.filter(r => r.book.metadata_status === 'awaiting_verification').length} awaiting bibliography verification.`, '',
    '| Book | Bibliography | Fully read / listed units | Partial | Indexed only | Applied targets | Illustrations | Local file |',
    '|---|---|---:|---:|---:|---:|---:|---|'];
  for (const row of rows) lines.push(`| [${md(row.book.title)}](#${row.book.id}) | ${md(row.book.metadata_status || 'verified')} | ${row.total ? `${row.read} / ${row.total}` : 'not indexed'} | ${row.partial} | ${row.indexed} | ${row.applied.length} | ${row.illustrations} | ${row.file} |`);
  lines.push('', '## Inventory alerts', '');
  lines.push(...(uncatalogued.length ? uncatalogued.map(f => `- New book awaiting cataloguing: \`${f}\``) : ['No uncatalogued PDF/EPUB files in this snapshot.']));
  lines.push(...issues.map(i => `- ${i}`));
  lines.push('', 'Missing local books are expected on other checkouts. A changed hash requires edition/page-map review; never carry progress silently to a replacement file.', '');
  for (const row of rows) {
    const b = row.book;
    lines.push(`<a id="${b.id}"></a>`, '', `## ${b.title}`, '', `- **ID:** \`${b.id}\``, `- **Local file:** \`${b.local_file}\``, `- **Last recorded review:** ${md(b.reviewed || 'none')}`, `- **Coverage:** ${md(b.coverage || 'Not examined.')}`);
    if (b.follow_up) lines.push(`- **Next:** ${md(b.follow_up)}`);
    if (b.research_notes?.length) lines.push(`- **Reading notes:** ${b.research_notes.map(f => `[${path.basename(f)}](${f.replace(/^docs\//, '')})`).join(', ')}`);
    if (b.chapters?.length) {
      lines.push('', '| Chapter / unit | Status | Actually examined | Applied to | Next research |', '|---|---|---|---|---|');
      for (const c of b.chapters) lines.push(`| ${md(c.number ? `${c.number}. ${c.title}` : c.title)} | ${md(c.status)} | ${md(c.pages_reviewed ? `pp. ${c.pages_reviewed}` : Array.isArray(c.sections_reviewed) ? c.sections_reviewed.join('; ') : c.sections_reviewed || '—')} | ${md((c.applied_to || []).join('; ') || '—')} | ${md(c.follow_up || '—')} |`);
    }
    if (b.illustrations?.length) {
      lines.push('', '### Illustration provenance', '');
      for (const fig of b.illustrations) lines.push(`- [${md(fig.title)}](../${fig.asset}) — ${md(fig.locator)}. ${md(fig.credit)}. ${md(fig.extraction)}. Rights: ${md(fig.rights)}.`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

if (require.main === module) {
  try {
    const books = yaml.load(fs.readFileSync(path.join(ROOT, 'docs/books.yaml'), 'utf8')).books;
    const result = inspect(ROOT, books);
    const report = render(result);
    const target = path.join(ROOT, 'docs/BOOK-RESEARCH.md');
    if (process.argv.includes('--write')) { fs.writeFileSync(target, report); console.log('Updated docs/BOOK-RESEARCH.md'); }
    else if (process.argv.includes('--check')) {
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== report) throw new Error('Book report is stale: run npm run books:report');
      if (result.issues.length || result.uncatalogued.length) throw new Error('Book inventory has alerts; inspect npm run books:status');
      console.log('Book catalogue and report agree with local inventory.');
    } else if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
    else console.log(report);
  } catch (err) { console.error(err.message); process.exitCode = 1; }
}
module.exports = { summarize, inspect, render };
