import { fakeDelay } from "../api/fakeDelay";
import { providers, bookings } from "../data/db";
// import apiClient from "../api/apiClient";
// import endpoints from "../api/endpoints";

export async function getStats() {
  return fakeDelay({
    totalProviders: providers.filter((p) => p.status === "approved").length,
    pendingProviders: providers.filter((p) => p.status === "pending").length,
    totalBookings: bookings.length,
  });
  // Real version:
  // const { data } = await apiClient.get(endpoints.adminStats);
  // return data;
}
