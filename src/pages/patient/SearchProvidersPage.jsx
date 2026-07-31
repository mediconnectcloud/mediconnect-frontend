import { useEffect, useState } from "react";
import { getProviders } from "../../api/providers";
import ProviderCard from "../../components/ProviderCard";
import Loading from "../../components/Loading";
import Button from "../../components/Button";

const CITIES = ["", "Hamilton", "Auckland", "Wellington"];

export default function SearchProvidersPage() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function runSearch(e) {
    if (e) e.preventDefault();
    setLoading(true);
    const results = await getProviders({ city, query });
    setProviders(results);
    setLoading(false);
  }

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <h1>Find a clinic</h1>

      <form className="search-bar" onSubmit={runSearch}>
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

      {loading && <Loading text="Searching..." />}

      {!loading && providers.length === 0 && <p className="muted">No providers match that search.</p>}

      <div className="grid">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
