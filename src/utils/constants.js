export const ROLES = {
  PATIENT: "patient",
  PROVIDER: "provider",
  ADMIN: "admin",
};

export const ROLE_HOME = {
  [ROLES.PATIENT]: "/search",
  [ROLES.PROVIDER]: "/provider/dashboard",
  [ROLES.ADMIN]: "/admin",
};

export const BOOKING_STATUS = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no-show",
};

export const CITIES = ["", "Hamilton", "Auckland", "Wellington"];
