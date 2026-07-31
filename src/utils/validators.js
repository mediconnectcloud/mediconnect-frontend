export function isRequired(value) {
  return String(value ?? "").trim().length > 0;
}

export function isValidFee(value) {
  const n = Number(value);
  return !Number.isNaN(n) && n >= 0;
}

// Basic sanity check only - real email verification happens through
// Cognito once it's wired up.
export function isLikelyEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
