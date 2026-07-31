import { useEffect, useState } from "react";
import { getDoctorById } from "../services/doctorService";
import { getSlotsByDoctor } from "../services/slotService";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export function useBookAppointment(doctorId) {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [doctorData, slotsData] = await Promise.all([
        getDoctorById(doctorId),
        getSlotsByDoctor(doctorId),
      ]);
      setDoctor(doctorData);
      setSlots(slotsData);
      setLoading(false);
    }
    load();
  }, [doctorId]);

  async function confirmSlot(slotId) {
    setBooking(true);
    setError("");
    try {
      const result = await createBooking({ patientUsername: user.username, slotId });
      setConfirmed(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setBooking(false);
    }
  }

  return { doctor, slots, loading, booking, error, confirmed, confirmSlot };
}
