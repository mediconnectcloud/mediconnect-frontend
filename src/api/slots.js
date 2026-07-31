import { fakeDelay } from "./fakeDelay";
import { slots, makeSlotId } from "../data/db";

// GET /doctors/:doctorId/slots
export async function getSlotsByDoctor(doctorId) {
  return fakeDelay(
    slots
      .filter((s) => s.doctorId === doctorId)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  );
}

// POST /slots
export async function addSlot({ doctorId, date, time }) {
  const newSlot = { id: makeSlotId(), doctorId, date, time, status: "available" };
  slots.push(newSlot);
  return fakeDelay(newSlot);
}

// PATCH /slots/:id  (block a slot so it can't be booked)
export async function blockSlot(id) {
  const found = slots.find((s) => s.id === id);
  if (found) found.status = "blocked";
  return fakeDelay(found || null);
}

export async function markSlotBooked(id) {
  const found = slots.find((s) => s.id === id);
  if (found) found.status = "booked";
  return fakeDelay(found || null);
}
