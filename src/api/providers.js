import { fakeDelay } from "./fakeDelay";
import { providers } from "../data/db";

// GET /providers?city=...&query=...
export async function getProviders({ city = "", query = "" } = {}) {
  let result = providers.filter((p) => p.status === "approved");

  if (city.trim()) {
    result = result.filter((p) => p.city.toLowerCase() === city.trim().toLowerCase());
  }
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    );
  }
  return fakeDelay(result);
}

// GET /providers/:id
export async function getProviderById(id) {
  const found = providers.find((p) => p.id === id);
  return fakeDelay(found || null);
}

// Used by the Admin dashboard
export async function getPendingProviders() {
  return fakeDelay(providers.filter((p) => p.status === "pending"));
}

export async function setProviderStatus(id, status) {
  const found = providers.find((p) => p.id === id);
  if (found) found.status = status;
  return fakeDelay(found || null);
}
