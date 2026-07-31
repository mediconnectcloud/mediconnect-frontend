import { useParams, Link } from "react-router-dom";
import { useProviderDetails } from "../../hooks/useProviderDetails";
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function ProviderDetailsPage() {
  const { id } = useParams();
  const { provider, doctors, loading } = useProviderDetails(id);

  if (loading) return <LoadingSpinner />;
  if (!provider) return <EmptyState message="Provider not found." />;

  return (
    <div className="page">
      <h1>{provider.name}</h1>
      <p className="muted">
        {provider.type} - {provider.city}
      </p>
      <p>{provider.address}</p>
      <p>{provider.phone}</p>
      <p className="muted">{provider.hours}</p>

      <h2>Doctors</h2>
      <div className="grid">
        {doctors.map((doc) => (
          <Card key={doc.id}>
            <h3>{doc.name}</h3>
            <p className="muted">{doc.specialization}</p>
            <p>Consultation fee: ${doc.fee}</p>
            <Link to={`/book/${doc.id}`}>
              <Button>Book appointment</Button>
            </Link>
          </Card>
        ))}
        {doctors.length === 0 && <EmptyState message="No doctors listed yet." />}
      </div>
    </div>
  );
}
