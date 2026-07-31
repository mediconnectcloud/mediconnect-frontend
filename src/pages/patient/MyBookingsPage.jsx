import { useEffect, useState } from "react";
import { getMyBookings, updateBookingStatus } from "../../api/bookings";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getMyBookings(user.username);
    setBookings(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCancel(id) {
    await updateBookingStatus(id, "cancelled");
    load();
  }

  if (loading) return <Loading />;

  return (
    <div className="page">
      <h1>My Bookings</h1>

      {bookings.length === 0 && <p className="muted">You have no bookings yet.</p>}

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
              <Button variant="secondary" onClick={() => handleCancel(b.id)}>
                Cancel
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
