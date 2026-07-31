import { fakeDelay } from "./fakeDelay";
import { providers, bookings } from "../data/db";

// GET /admin/stats
export async function getStats() {
  return fakeDelay({
    totalProviders: providers.filter((p) => p.status === "approved").length,
    pendingProviders: providers.filter((p) => p.status === "pending").length,
    totalBookings: bookings.length,
  });
}
