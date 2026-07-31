import { fakeDelay } from "../api/fakeDelay";
import { doctors } from "../data/db";
// import apiClient from "../api/apiClient";
// import endpoints from "../api/endpoints";

export async function getDoctorsByProvider(providerId) {
  return fakeDelay(doctors.filter((d) => d.providerId === providerId));
  // Real version:
  // const { data } = await apiClient.get(endpoints.doctorsByProvider(providerId));
  // return data;
}

export async function getDoctorById(id) {
  return fakeDelay(doctors.find((d) => d.id === id) || null);
  // Real version:
  // const { data } = await apiClient.get(endpoints.doctorById(id));
  // return data;
}

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
  // Real version:
  // const { data } = await apiClient.post(endpoints.doctorsByProvider(providerId), { name, specialization, fee });
  // return data;
}

export async function removeDoctor(id) {
  const index = doctors.findIndex((d) => d.id === id);
  if (index !== -1) doctors.splice(index, 1);
  return fakeDelay({ success: true });
  // Real version:
  // await apiClient.delete(endpoints.doctorById(id));
  // return { success: true };
}
