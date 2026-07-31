import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBookAppointment } from "../../hooks/useBookAppointment";
import SlotCard from "../../components/SlotCard";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { doctor, slots, loading, booking, error, confirmed, confirmSlot } =
    useBookAppointment(doctorId);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <EmptyState message="Doctor not found." />;

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
        {slots.length === 0 && <EmptyState message="No slots have been set up yet." />}
      </div>

      {error && <ErrorMessage message={error} />}

      <Button
        onClick={() => confirmSlot(selectedSlot.id)}
        disabled={!selectedSlot || booking}
      >
        {booking ? "Confirming..." : "Confirm booking"}
      </Button>
    </div>
  );
}
