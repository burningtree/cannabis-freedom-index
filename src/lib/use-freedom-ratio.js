// A zero index has no finite quotient. Do not add a pseudocount to the score.
export function useFreedomRatio(prevalence, score) {
  if (!Number.isFinite(prevalence) || !Number.isFinite(score) || score <= 0) return null;
  return +(prevalence / score).toFixed(2);
}
