// Every real backend URL path lives here and nowhere else. When the
// backend is ready, services/ import from this file instead of writing
// paths inline - if a path changes, it changes in exactly one place.
const endpoints = {
  providers: "/providers",
  providerById: (id) => `/providers/${id}`,
  doctorsByProvider: (providerId) => `/providers/${providerId}/doctors`,
  doctorById: (id) => `/doctors/${id}`,
  slotsByDoctor: (doctorId) => `/doctors/${doctorId}/slots`,
  bookings: "/bookings",
  myBookings: "/bookings/mine",
  bookingById: (id) => `/bookings/${id}`,
  adminStats: "/admin/stats",
  adminPendingProviders: "/admin/providers/pending",
};

export default endpoints;
