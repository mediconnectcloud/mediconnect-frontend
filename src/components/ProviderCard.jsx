import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

export default function ProviderCard({ provider }) {
  return (
    <Card className="provider-card">
      <div>
        <h3>{provider.name}</h3>
        <p className="muted">
          {provider.type} - {provider.city}
        </p>
        <p>{provider.address}</p>
        <p className="muted">{provider.hours}</p>
      </div>
      <Link to={`/providers/${provider.id}`}>
        <Button>View details</Button>
      </Link>
    </Card>
  );
}
