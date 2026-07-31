// Small, dependency-free date helpers. If date handling grows more
// complex later, this is the one file to swap for a library like date-fns.

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-08-03" -> "Mon, 3 Aug 2026"
export function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

// "14:30" -> "2:30 PM"
export function formatTime(time24) {
  if (!time24) return "";
  const [hoursStr, minutes] = time24.split(":");
  const hours = Number(hoursStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${minutes} ${period}`;
}

// True if the given ISO date is today or later
export function isUpcoming(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${isoDate}T00:00:00`) >= today;
}
