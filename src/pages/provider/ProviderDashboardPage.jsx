import { useEffect, useState } from "react";
import { getBookingsForProvider } from "../../api/bookings";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

// DUMMY: in the real app the provider's own providerId would come from
// their account/profile. Hardcoded here since there is no backend yet.
const DEMO_PROVIDER_ID = "PRV-101";

export default function ProviderDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBookingsForProvider(DEMO_PROVIDER_ID);
      setBookings(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Loading />;

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
        {bookings.length === 0 && <p className="muted">No bookings yet.</p>}
      </div>
    </div>
  );
}
