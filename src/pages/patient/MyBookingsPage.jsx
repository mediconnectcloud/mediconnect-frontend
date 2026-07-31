import { useMyBookings } from "../../hooks/useMyBookings";
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function MyBookingsPage() {
  const { bookings, loading, cancelBooking } = useMyBookings();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h1>My Bookings</h1>

      {bookings.length === 0 && <EmptyState message="You have no bookings yet." />}

      <div className="grid">
        {bookings.map((b) => (
          <Card key={b.id}>
            <h3>{b.doctorName}</h3>
            <p className="muted">{b.providerName}</p>
            <p>
              {b.date} at {b.time}
            </p>
            <p>
              Status: <span className="badge">{b.status}</span>
            </p>
            {b.status === "confirmed" && (
              <Button variant="secondary" onClick={() => cancelBooking(b.id)}>
                Cancel
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
