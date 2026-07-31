import { useEffect, useState } from "react";
import { getPendingProviders, setProviderStatus } from "../../api/providers";
import { getStats } from "../../api/admin";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [statsData, pendingData] = await Promise.all([getStats(), getPendingProviders()]);
    setStats(statsData);
    setPending(pendingData);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDecision(id, status) {
    await setProviderStatus(id, status);
    load();
  }

  if (loading) return <Loading />;

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      <div className="stats-row">
        <Card>
          <p className="muted">Approved providers</p>
          <p className="stat">{stats.totalProviders}</p>
        </Card>
        <Card>
          <p className="muted">Pending approval</p>
          <p className="stat">{stats.pendingProviders}</p>
        </Card>
        <Card>
          <p className="muted">Total bookings</p>
          <p className="stat">{stats.totalBookings}</p>
        </Card>
      </div>

      <h2>Providers awaiting approval</h2>
      <div className="grid">
        {pending.map((p) => (
          <Card key={p.id}>
            <h3>{p.name}</h3>
            <p className="muted">
              {p.type} - {p.city}
            </p>
            <p>{p.address}</p>
            <div className="button-row">
              <Button onClick={() => handleDecision(p.id, "approved")}>Approve</Button>
              <Button variant="secondary" onClick={() => handleDecision(p.id, "rejected")}>
                Reject
              </Button>
            </div>
          </Card>
        ))}
        {pending.length === 0 && <p className="muted">No providers waiting for approval.</p>}
      </div>
    </div>
  );
}
