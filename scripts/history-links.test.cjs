// Every reference to a history entry must find it in changes.yaml: an article (articles/<id>.md is
// the long read of entry <id>), a culture entry's `history` and `history_cards`, and every link to
// /history/<id>/ in a profile, article, culture entry or page introduction. A build stops on a
// broken one; this test names them all at once, in a second, before the build starts.
// The usual cause is order: write the history entry in changes.yaml first, then the article or
// the link (docs/EXPAND-COUNTRY.md, "Articles").
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const y = require("js-yaml");

const ids = new Set([...fs.readFileSync("changes.yaml", "utf8").matchAll(/^- id: ([^\s#]+)/gm)].map((m) => m[1]));
// the history pages that are not entries
const PAGES = new Set(["period", "kind", "tag"]);
const walk = (dir, ext) => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name), ext) : e.name.endsWith(ext) ? [path.join(dir, e.name)] : []) : [];
const frontMatter = (file) => { const m = /^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(file, "utf8")); return m ? y.load(m[1]) ?? {} : {}; };
const FIX = "Write the history entry in changes.yaml first, or correct the id; an article's file name is its entry's id.";

test("every article belongs to a history entry", () => {
  const orphans = walk("articles", ".md").map((f) => path.basename(f, ".md")).filter((id) => !ids.has(id));
  assert.deepEqual(orphans.map((id) => `articles/${id}.md`), [], `No history entry for these articles. ${FIX}`);
});

test("culture entries list only history entries that exist", () => {
  const missing = walk("culture", ".md").flatMap((f) => {
    const d = frontMatter(f);
    return [...(d.history ?? []), ...(d.history_cards ?? [])].filter((id) => !ids.has(id)).map((id) => `${f}: ${id}`);
  });
  assert.deepEqual([...new Set(missing)], [], `Culture entries name history entries that do not exist. ${FIX}`);
});

test("every link to /history/<id>/ leads to an entry", () => {
  const files = [...walk("countries", ".yaml"), ...walk("articles", ".md"), ...walk("culture", ".md"), ...walk("context", ".md"), ...walk("datasets/intros", ".md")];
  const missing = files.flatMap((f) => [...fs.readFileSync(f, "utf8").matchAll(/(?<![\w.])\/history\/([a-z0-9][a-z0-9-]*)\/?(?=[)#"'\s]|$)/g)]
    .map((m) => m[1]).filter((id) => !PAGES.has(id) && !ids.has(id)).map((id) => `${f}: /history/${id}/`));
  assert.deepEqual([...new Set(missing)], [], `Links to history entries that do not exist. ${FIX}`);
});
