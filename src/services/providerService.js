import { fakeDelay } from "../api/fakeDelay";
import { providers } from "../data/db";
// import apiClient from "../api/apiClient";
// import endpoints from "../api/endpoints";

// DUMMY implementation, backed by src/data/db.js. Once the real backend
// exists, swap each function body for the commented-out apiClient call
// below it - callers (hooks/pages) do not change.

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

  // Real version:
  // const { data } = await apiClient.get(endpoints.providers, { params: { city, query } });
  // return data;
}

export async function getProviderById(id) {
  const found = providers.find((p) => p.id === id);
  return fakeDelay(found || null);

  // Real version:
  // const { data } = await apiClient.get(endpoints.providerById(id));
  // return data;
}

export async function getPendingProviders() {
  return fakeDelay(providers.filter((p) => p.status === "pending"));

  // Real version:
  // const { data } = await apiClient.get(endpoints.adminPendingProviders);
  // return data;
}

export async function setProviderStatus(id, status) {
  const found = providers.find((p) => p.id === id);
  if (found) found.status = status;
  return fakeDelay(found || null);

  // Real version:
  // const { data } = await apiClient.patch(endpoints.providerById(id), { status });
  // return data;
}
