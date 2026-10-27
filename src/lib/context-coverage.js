// Research coverage is separate from a country's legal freedom score. A category is
// addressed by cited content or an explicit, cited explanation that it does not apply.
import { CONTEXT_RESEARCH_IDS } from "./segment-ids.js";
import { stripCites } from "./cite.js";

const PLACEHOLDER = /^(?:none(?: found)?|n\/?a|not applicable|unknown|no data|not (?:found|documented)|no (?:information|data)(?: (?:found|available))?)[.!]?$/i;
export const hasContextExplanation = (text) => {
  if (typeof text !== "string") return false;
  const plain = stripCites(text).trim();
  return Boolean(plain) && !PLACEHOLDER.test(plain);
};

export function contextCoverage(profile, categories = CONTEXT_RESEARCH_IDS.map(key => [key, key])) {
  const valid = (block) => hasContextExplanation(block?.text) && Array.isArray(block.sources)
    && block.sources.length > 0 && block.sources.every(key => Boolean(profile.sources?.[key]));
  const sections = categories.map(([key, label]) => {
    const content = profile.context?.[key];
    const exception = profile.context_not_applicable?.[key];
    if (content && exception) return { key, label, state: "incomplete", reason: "Choose context content or a not-applicable explanation", sources: [] };
    if (content) {
      const blocks = Array.isArray(content) ? content : [content];
      const filled = blocks.length > 0 && blocks.every(valid);
      return { key, label, state: filled ? "filled" : "incomplete", reason: filled ? "" : "Needs an explanation and valid sources", sources: [] };
    }
    if (exception && valid(exception)) {
      return { key, label, state: "not_applicable", reason: stripCites(exception.text), sources: exception.sources };
    }
    return { key, label, state: exception ? "incomplete" : "missing", reason: exception ? "The not-applicable explanation needs valid sources" : "Not yet researched", sources: [] };
  });
  const filled = sections.filter(s => s.state === "filled").length;
  const notApplicable = sections.filter(s => s.state === "not_applicable").length;
  const covered = filled + notApplicable;
  return { sections, filled, notApplicable, covered, total: sections.length, missing: sections.length - covered, pct: sections.length ? Math.floor(100 * covered / sections.length) : 0 };
}
