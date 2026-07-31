import { fakeDelay } from "../api/fakeDelay";
import { slots, makeSlotId } from "../data/db";
// import apiClient from "../api/apiClient";
// import endpoints from "../api/endpoints";

export async function getSlotsByDoctor(doctorId) {
  return fakeDelay(
    slots
      .filter((s) => s.doctorId === doctorId)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  );
  // Real version:
  // const { data } = await apiClient.get(endpoints.slotsByDoctor(doctorId));
  // return data;
}

export async function addSlot({ doctorId, date, time }) {
  const newSlot = { id: makeSlotId(), doctorId, date, time, status: "available" };
  slots.push(newSlot);
  return fakeDelay(newSlot);
  // Real version:
  // const { data } = await apiClient.post(endpoints.slotsByDoctor(doctorId), { date, time });
  // return data;
}

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
