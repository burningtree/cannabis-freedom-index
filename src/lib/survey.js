// State of Cannabis: the questionnaire of the current edition (survey/<year>.yaml) and its counted
// results (survey/results-<year>.json, written by scripts/survey-mock.cjs or survey-collect.cjs).
// The form and the results page are both built from these two files.
import yaml from "js-yaml";
import raw from "../../survey/2026.yaml?raw";
import results from "../../survey/results-2026.json";

import rawMoney from "../../survey/currencies.yaml?raw";

export const survey = yaml.load(raw);
// currencies a price may be given in, and the one suggested for each country
const money = yaml.load(rawMoney);
export const currencies = Object.keys(money.per_eur).sort((a, b) => (b === "USD") - (a === "USD") || (b === "EUR") - (a === "EUR") || a.localeCompare(b)).map((code) => [code, money.names[code] ?? code]);
export const currencyOf = Object.fromEntries(Object.entries(money.country).flatMap(([code, ids]) => ids.map((id) => [id, code])));
export const ratesDate = money.date;
export { results };
// every question that is counted, in order, with the section it belongs to
export const counted = survey.sections.flatMap((s) => s.questions.filter((q) => !["text", "region", "city"].includes(q.type)).map((q) => ({ ...q, section: s.id })));
// what the form needs to know to send answers: nothing secret
export const submitConfig = { edition: survey.edition, min_age: survey.min_age, open: survey.open && Boolean(survey.nostr.pubkey) && survey.nostr.relays.length > 0, ...survey.nostr };
