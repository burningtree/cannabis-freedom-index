const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { summarize, inspect, render } = require('./books-status.cjs');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const fixture = (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cfi-books-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'books'));
  fs.writeFileSync(path.join(root, 'books', 'sample.pdf'), 'edition one');
  return { root, book: { id: 'sample', title: 'Sample', local_file: 'books/sample.pdf', sha256: sha('edition one'), chapters: [] } };
};
test('full, partial and indexed units stay separate; reused targets count once', () => {
  const summary = summarize({ chapters: [
    {status:'read', applied_to:['articles/a.md']},
    {status:'selected_pages_read', applied_to:['articles/a.md', 'changes.yaml#a']},
    {status:'selected_sections_read'}, {status:'indexed_only'}
  ] });
  assert.deepEqual(summary, { total:4, read:1, partial:2, indexed:1, applied:['articles/a.md','changes.yaml#a'], illustrations:0 });
  assert.equal(summarize({}).total, 0);
});
test('detects new books and changed editions without treating missing files as lost coverage', t => {
  const {root,book} = fixture(t);
  fs.writeFileSync(path.join(root, 'books', 'new.epub'), 'new');
  fs.writeFileSync(path.join(root, 'books', '.DS_Store'), 'ignore');
  let result = inspect(root, [book]);
  assert.deepEqual(result.uncatalogued, ['new.epub']);
  assert.equal(result.rows[0].file, 'matches recorded hash');
  fs.writeFileSync(path.join(root, 'books', 'sample.pdf'), 'edition two');
  assert.match(inspect(root,[book]).issues[0], /SHA-256/);
  fs.unlinkSync(path.join(root, 'books', 'sample.pdf'));
  result = inspect(root,[book]);
  assert.equal(result.rows[0].file, 'missing locally');
  assert.equal(result.issues.length, 0);
});
test('rejects duplicate identities, unknown statuses and paths outside the library', t => {
  const {root,book} = fixture(t);
  assert.throws(() => inspect(root,[book,book]), /duplicate book ID/);
  assert.throws(() => inspect(root,[{...book, local_file:'books/../sample.pdf'}]), /Invalid local_file/);
  assert.throws(() => inspect(root,[{...book,chapters:[{title:'One',status:'done'}]}]), /Unknown chapter status/);
});
test('flags unsupported reading claims and preserves their precise locators in the report', t => {
  const {root,book} = fixture(t);
  book.chapters = [{title:'One | Two',status:'selected_pages_read'}];
  assert.match(inspect(root,[book]).issues[0], /lacks a reading locator/);
  book.chapters[0].pages_reviewed = '12–15';
  const result = inspect(root,[book]);
  assert.equal(result.issues.length,0);
  const output = render(result);
  assert.match(output,/One \\\| Two/);
  assert.match(output,/pp\. 12–15/);
  assert.match(output,/<a id="sample"><\/a>\n\n## Sample/);
  assert.match(output,/not percentages of pages/);
});
