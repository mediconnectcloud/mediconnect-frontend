import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function AdminDashboardPage() {
  const { stats, pending, loading, decide } = useAdminDashboard();

  if (loading) return <LoadingSpinner />;

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
              <Button onClick={() => decide(p.id, "approved")}>Approve</Button>
              <Button variant="secondary" onClick={() => decide(p.id, "rejected")}>
                Reject
              </Button>
            </div>
          </Card>
        ))}
        {pending.length === 0 && <EmptyState message="No providers waiting for approval." />}
      </div>
    </div>
  );
}
