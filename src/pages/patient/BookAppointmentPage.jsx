import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../../api/doctors";
import { getSlotsByDoctor } from "../../api/slots";
import { createBooking } from "../../api/bookings";
import { useAuth } from "../../context/AuthContext";
import SlotCard from "../../components/SlotCard";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
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

  async function handleConfirm() {
    if (!selectedSlot) return;
    setBooking(true);
    setError("");
    try {
      const result = await createBooking({
        patientUsername: user.username,
        slotId: selectedSlot.id,
      });
      setConfirmed(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setBooking(false);
    }
  }

  if (loading) return <Loading />;
  if (!doctor) return <p>Doctor not found.</p>;

  if (confirmed) {
    return (
      <div className="page page--narrow">
        <h1>Booking confirmed</h1>
        <p>
          Your appointment with <strong>{confirmed.doctorName}</strong> at{" "}
          <strong>{confirmed.providerName}</strong> is confirmed for{" "}
          <strong>
            {confirmed.date} at {confirmed.time}
          </strong>
          .
        </p>
        <Button onClick={() => navigate("/my-bookings")}>Go to My Bookings</Button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Book with {doctor.name}</h1>
      <p className="muted">
        {doctor.specialization} - ${doctor.fee} consultation fee
      </p>

      <h2>Pick a time slot</h2>
      <div className="slot-grid">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            selected={selectedSlot?.id === slot.id}
            onSelect={setSelectedSlot}
          />
        ))}
        {slots.length === 0 && <p className="muted">No slots have been set up yet.</p>}
      </div>

      {error && <p className="error">{error}</p>}

      <Button onClick={handleConfirm} disabled={!selectedSlot || booking}>
        {booking ? "Confirming..." : "Confirm booking"}
      </Button>
    </div>
  );
}
