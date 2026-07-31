import { useCallback, useEffect, useState } from "react";
import { getDoctorsByProvider, addDoctor, removeDoctor } from "../services/doctorService";

// DEMO_PROVIDER_ID stands in for "the provider's own clinic" until
// provider accounts are wired up to a real providerId from Cognito/DynamoDB.
const DEMO_PROVIDER_ID = "PRV-101";

export function useProviderDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const data = await getDoctorsByProvider(DEMO_PROVIDER_ID);
    setDoctors(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function create(doctor) {
    await addDoctor({ providerId: DEMO_PROVIDER_ID, ...doctor });
    reload();
  }

  async function remove(id) {
    await removeDoctor(id);
    reload();
  }

  return { doctors, loading, create, remove, providerId: DEMO_PROVIDER_ID };
}
