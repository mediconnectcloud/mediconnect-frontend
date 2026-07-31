import { fakeDelay } from "./fakeDelay";
import { doctors } from "../data/db";

// GET /providers/:providerId/doctors
export async function getDoctorsByProvider(providerId) {
  return fakeDelay(doctors.filter((d) => d.providerId === providerId));
}

// GET /doctors/:id
export async function getDoctorById(id) {
  return fakeDelay(doctors.find((d) => d.id === id) || null);
}

// POST /doctors
export async function addDoctor({ providerId, name, specialization, fee }) {
  const newDoctor = {
    id: `DOC-${Math.floor(Math.random() * 9000) + 1000}`,
    providerId,
    name,
    specialization,
    fee: Number(fee) || 0,
  };
  doctors.push(newDoctor);
  return fakeDelay(newDoctor);
}

// DELETE /doctors/:id
export async function removeDoctor(id) {
  const index = doctors.findIndex((d) => d.id === id);
  if (index !== -1) doctors.splice(index, 1);
  return fakeDelay({ success: true });
}
