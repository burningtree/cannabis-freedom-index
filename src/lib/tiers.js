// Score bands, shared by the build and the browser. Colours are the --t0…--t5 CSS variables.
export const TIERS = [
  { min: 60, name: "Free" },
  { min: 40, name: "Legal with limits" },
  { min: 25, name: "Tolerant" },
  { min: 15, name: "Restrictive" },
  { min: 5, name: "Prohibition" },
  { min: 0, name: "Severe prohibition" },
];

export const tierIndex = (v) => TIERS.length - 1 - TIERS.findIndex((t) => v >= t.min);
export const tierOf = (v) => TIERS.find((t) => v >= t.min);
export const tierColor = (v) => `var(--t${tierIndex(v)})`;
