// This file is a stand-in for the real backend/database.
// Everything here lives only in memory, so refreshing the page resets it.
// Once the real API (API Gateway + DynamoDB) is ready, only the files in
// src/api/ need to change - pages never talk to this file directly.

export const providers = [
  {
    id: "PRV-101",
    name: "Hamilton East Health Centre",
    type: "Clinic",
    city: "Hamilton",
    address: "12 Grey Street, Hamilton East",
    phone: "07 855 1234",
    hours: "Mon-Fri 8:00am - 6:00pm",
    status: "approved",
  },
  {
    id: "PRV-102",
    name: "Waikato Family Dental",
    type: "Dental",
    city: "Hamilton",
    address: "45 Anglesea Street, Hamilton Central",
    phone: "07 839 4455",
    hours: "Mon-Sat 9:00am - 5:00pm",
    status: "approved",
  },
  {
    id: "PRV-103",
    name: "Chartwell Physiotherapy",
    type: "Physiotherapy",
    city: "Hamilton",
    address: "8 Comries Road, Chartwell",
    phone: "07 855 7788",
    hours: "Mon-Fri 7:30am - 7:00pm",
    status: "approved",
  },
  {
    id: "PRV-104",
    name: "Auckland City Medical",
    type: "Clinic",
    city: "Auckland",
    address: "22 Queen Street, Auckland Central",
    phone: "09 300 1122",
    hours: "Mon-Fri 8:00am - 8:00pm",
    status: "approved",
  },
  {
    id: "PRV-105",
    name: "Newtown Wellness Clinic",
    type: "Clinic",
    city: "Wellington",
    address: "5 Riddiford Street, Newtown",
    phone: "04 389 6677",
    hours: "Mon-Fri 8:30am - 5:30pm",
    status: "pending",
  },
];

export const doctors = [
  { id: "DOC-12", providerId: "PRV-101", name: "Dr. Sarah Lee", specialization: "General Practice", fee: 55 },
  { id: "DOC-13", providerId: "PRV-101", name: "Dr. Amit Verma", specialization: "General Practice", fee: 55 },
  { id: "DOC-14", providerId: "PRV-102", name: "Dr. Grace Wilson", specialization: "Dentistry", fee: 90 },
  { id: "DOC-15", providerId: "PRV-103", name: "Dr. Noah Campbell", specialization: "Physiotherapy", fee: 70 },
  { id: "DOC-16", providerId: "PRV-104", name: "Dr. Priya Nair", specialization: "General Practice", fee: 60 },
];

export const slots = [
  { id: "SLT-1", doctorId: "DOC-12", date: "2026-08-03", time: "09:00", status: "available" },
  { id: "SLT-2", doctorId: "DOC-12", date: "2026-08-03", time: "09:20", status: "available" },
  { id: "SLT-3", doctorId: "DOC-12", date: "2026-08-03", time: "09:40", status: "booked" },
  { id: "SLT-4", doctorId: "DOC-12", date: "2026-08-04", time: "10:00", status: "available" },
  { id: "SLT-5", doctorId: "DOC-13", date: "2026-08-03", time: "11:00", status: "available" },
  { id: "SLT-6", doctorId: "DOC-14", date: "2026-08-05", time: "14:00", status: "available" },
  { id: "SLT-7", doctorId: "DOC-14", date: "2026-08-05", time: "14:30", status: "available" },
  { id: "SLT-8", doctorId: "DOC-15", date: "2026-08-04", time: "15:00", status: "available" },
  { id: "SLT-9", doctorId: "DOC-16", date: "2026-08-06", time: "09:30", status: "available" },
];

export const bookings = [
  {
    id: "BKG-9001",
    patientUsername: "patient",
    doctorId: "DOC-12",
    doctorName: "Dr. Sarah Lee",
    providerName: "Hamilton East Health Centre",
    date: "2026-08-03",
    time: "09:40",
    status: "confirmed",
  },
];

let nextSlotId = 10;
let nextBookingId = 9002;

export function makeSlotId() {
  return `SLT-${nextSlotId++}`;
}

export function makeBookingId() {
  return `BKG-${nextBookingId++}`;
}
