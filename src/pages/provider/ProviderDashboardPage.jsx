import { useProviderBookings } from "../../hooks/useProviderBookings";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function ProviderDashboardPage() {
  const { bookings, loading } = useProviderBookings();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h1>Provider Dashboard</h1>
      <p className="muted">Showing bookings for Hamilton East Health Centre (demo data).</p>

      <div className="stats-row">
        <Card>
          <p className="muted">Total bookings</p>
          <p className="stat">{bookings.length}</p>
        </Card>
        <Card>
          <p className="muted">Confirmed</p>
          <p className="stat">{bookings.filter((b) => b.status === "confirmed").length}</p>
        </Card>
        <Card>
          <p className="muted">Cancelled</p>
          <p className="stat">{bookings.filter((b) => b.status === "cancelled").length}</p>
        </Card>
      </div>

      <h2>Bookings</h2>
      <div className="grid">
        {bookings.map((b) => (
          <Card key={b.id}>
            <h3>{b.doctorName}</h3>
            <p>
              {b.date} at {b.time}
            </p>
            <p>
              Status: <span className="badge">{b.status}</span>
            </p>
          </Card>
        ))}
        {bookings.length === 0 && <EmptyState message="No bookings yet." />}
      </div>
    </div>
  );
}
