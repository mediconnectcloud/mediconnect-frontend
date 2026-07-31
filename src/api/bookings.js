import { fakeDelay } from "./fakeDelay";
import { bookings, doctors, providers, slots, makeBookingId } from "../data/db";
import { markSlotBooked } from "./slots";

// POST /bookings
// This mirrors the real DynamoDB transaction described in the architecture
// plan: check the slot, mark it booked, then create the booking record.
export async function createBooking({ patientUsername, slotId }) {
  const slot = slots.find((s) => s.id === slotId);
  if (!slot || slot.status !== "available") {
    throw new Error("Sorry, that slot is no longer available.");
  }
  const doctor = doctors.find((d) => d.id === slot.doctorId);
  const provider = doctor ? providers.find((p) => p.id === doctor.providerId) : null;

  await markSlotBooked(slot.id);

  const newBooking = {
    id: makeBookingId(),
    patientUsername,
    doctorId: doctor?.id,
    doctorName: doctor?.name || "Unknown doctor",
    providerName: provider?.name || "Unknown provider",
    date: slot.date,
    time: slot.time,
    status: "confirmed",
  };
  bookings.push(newBooking);
  return fakeDelay(newBooking, 500);
}

// GET /bookings/mine
export async function getMyBookings(patientUsername) {
  return fakeDelay(bookings.filter((b) => b.patientUsername === patientUsername));
}

// GET /providers/:providerId/bookings
export async function getBookingsForProvider(providerId) {
  const providerDoctorIds = doctors.filter((d) => d.providerId === providerId).map((d) => d.id);
  return fakeDelay(bookings.filter((b) => providerDoctorIds.includes(b.doctorId)));
}

// PATCH /bookings/:id
export async function updateBookingStatus(id, status) {
  const found = bookings.find((b) => b.id === id);
  if (found) found.status = status;
  return fakeDelay(found || null);
}
