// Simulates the small delay a real network call would have.
// Every dummy API function below "awaits" this so the pages already
// behave the way they will once they're wired up to the real backend
// (loading states, etc. all still work correctly).
export function fakeDelay(data, ms = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
