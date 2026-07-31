import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProviderById } from "../../api/providers";
import { getDoctorsByProvider } from "../../api/doctors";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

export default function ProviderDetailsPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [providerData, doctorsData] = await Promise.all([
        getProviderById(id),
        getDoctorsByProvider(id),
      ]);
      setProvider(providerData);
      setDoctors(doctorsData);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <Loading />;
  if (!provider) return <p>Provider not found.</p>;

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
        {doctors.length === 0 && <p className="muted">No doctors listed yet.</p>}
      </div>
    </div>
  );
}
