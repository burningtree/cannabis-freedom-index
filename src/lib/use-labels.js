// A prevalence rate belongs to its source age band; it is not automatically an adult rate.
export const useAges = (use) => use.ages ? use.ages.replaceAll("-", "–") : "15–64 (assumed)";
export const USE_COMPARISON_NOTE = "Survey ages and years vary, and some surveys include children. Rates are not age-standardised; do not compare countries directly.";
export const useShareLabel = (use) => `${use.prevalence}% of people aged ${useAges(use)}`;
