import { useEffect, useState } from "react";
import { getProviderById } from "../services/providerService";
import { getDoctorsByProvider } from "../services/doctorService";

export function useProviderDetails(providerId) {
  const [provider, setProvider] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [providerData, doctorsData] = await Promise.all([
          getProviderById(providerId),
          getDoctorsByProvider(providerId),
        ]);
        if (!cancelled) {
          setProvider(providerData);
          setDoctors(doctorsData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [providerId]);

  return { provider, doctors, loading, error };
}
