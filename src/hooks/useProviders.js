import { useCallback, useEffect, useState } from "react";
import { getProviders } from "../services/providerService";

// Wraps the provider search call with loading/error state, so a page
// just does: const { providers, loading, search } = useProviders();
export function useProviders(initialFilters = {}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = useCallback(async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const results = await getProviders(filters);
      setProviders(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { providers, loading, error, search };
}
