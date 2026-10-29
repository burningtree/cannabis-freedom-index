// The Cannabis Enforcement Tracker, the companion site that records raids, seizures, eradication,
// arrests, prosecutions and sentences (tracker.cannabisfreedom.fyi). Its reports are copied into
// src/data/tracker.json by scripts/sync-tracker.mjs, for the Enforcement section of each profile and
// for the redirects of history entries that moved there.
import data from "../data/tracker.json";

export const TRACKER = "https://tracker.cannabisfreedom.fyi";
// the tracker's report types, with its labels and marker colours (src/lib/types.js there)
export const TRACKER_TYPES = {
  eradication: { label: "Eradication", color: "#e8743b" },
  seizure: { label: "Seizure", color: "#e3b341" },
  raid: { label: "Raid", color: "#e0565b" },
  arrest: { label: "Arrest", color: "#c23a4a" },
  prosecution: { label: "Prosecution", color: "#a56cc1" },
  sentence: { label: "Sentence", color: "#6b8fd6" },
  execution: { label: "Execution", color: "#f2f0e9" },
  death: { label: "Death", color: "#8f8d85" },
};
export const trackerReports = data.reports;
export const trackerReportUrl = (r) => `${TRACKER}/report/${r.id}/`;
export const trackerCountryUrl = (id) => `${TRACKER}/country/${id}/`;
// a country's reports, newest first; a country includes its states' ("us" lists "us/ca")
export const enforcementOf = (id) => data.reports.filter((r) => r.country === id || r.country.startsWith(`${id}/`));
// history entries that moved to the tracker: { id: the report's address there }
export const movedToTracker = Object.fromEntries(data.reports.filter((r) => r.cfi_id).map((r) => [r.cfi_id, trackerReportUrl(r)]));
