import { useState } from "react";
import { useProviders } from "../../hooks/useProviders";
import ProviderCard from "../../components/ProviderCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import { CITIES } from "../../utils/constants";

export default function SearchProvidersPage() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const { providers, loading, error, search } = useProviders();

  function handleSubmit(e) {
    e.preventDefault();
    search({ city, query });
  }

  return (
    <div className="page">
      <h1>Find a clinic</h1>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          placeholder="Search by name or specialty"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c || "All cities"}
            </option>
          ))}
        </select>
        <Button type="submit">Search</Button>
      </form>

      {loading && <LoadingSpinner text="Searching..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && providers.length === 0 && (
        <EmptyState message="No providers match that search." />
      )}

      <div className="grid">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
