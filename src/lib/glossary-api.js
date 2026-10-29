// Public vocabulary from the same sourced glossary, atlas and country data as the site.
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const frontmatter = (file) => yaml.load(fs.readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "") ?? {};
const clean = (value) => String(value ?? "").replace(/\s*\([^)]*\)$/, "").trim();
const ambiguous = new Set(["pot", "grass", "high", "joint", "flower", "tea", "j", "jay", "dope", "accession", "hybrid", "bang", "resin", "résine"]);
const cannabisGlossary = new Set(["prensado", "chira", "THC", "HHC", "cannabinoid", "edibles", "concentrates"]);

export function glossaryAPI(root = process.cwd()) {
  const entries = [], words = new Set();
  const add = (forms) => {
    for (const value of forms) {
      const word = clean(value);
      if (word.length > 1 && !ambiguous.has(word.toLowerCase())) words.add(word);
    }
  };
  const glossary = yaml.load(fs.readFileSync(path.join(root, "glossary.yaml"), "utf8")) ?? [];
  for (const item of glossary) {
    entries.push({ kind: "glossary", ...item });
    if (cannabisGlossary.has(item.id)) add([item.id, ...(item.also ?? [])]);
  }
  const dir = path.join(root, "culture/language");
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".md")).sort()) {
    const item = frontmatter(path.join(dir, file));
    entries.push({ kind: "language", id: file.slice(0, -3), title: item.title, text: item.summary, also: item.also ?? [], spelling: item.spelling ?? [], sources: item.sources ?? [], url: `/culture/language/${file.slice(0, -3)}/` });
    add([item.title, ...(item.also ?? []), ...(item.spelling ?? []).flatMap(s => [s.text, ...(!/^[\[/]/.test(s.say ?? "") ? [s.say] : [])])]);
  }
  function countries(dir, prefix = "") {
    for (const file of fs.readdirSync(dir, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name))) {
      if (file.isDirectory()) { countries(path.join(dir, file.name), prefix + file.name + "/"); continue; }
      if (!file.name.endsWith(".yaml")) continue;
      const item = yaml.load(fs.readFileSync(path.join(dir, file.name), "utf8"));
      for (const word of item?.words ?? []) {
        entries.push({ kind: "country-word", country: (prefix + file.name.slice(0,-5)).replace(/\/index$/, ""), ...word, sources: (word.sources ?? []).map(id => ({ id, ...item.sources?.[id] })) });
        add([word.word]);
      }
    }
  }
  countries(path.join(root, "countries"));
  // Productive inflections: konopy/konopí/konopím, marihuanu/marihuany, etc.
  // A prefix matches only at a Unicode word start; it never matches inside another word.
  const prefixes = ["konop", "marihuan", "marijuan", "mariguan", "cannabi", "kanabi", "коноп", "марихуан", "гашиш"];
  return { version: 1, entries, recognition: { words: [...words].sort((a,b) => a.localeCompare(b)), prefixes, ambiguous: [...ambiguous].sort() } };
}
