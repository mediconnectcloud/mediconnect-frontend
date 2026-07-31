import { useCallback, useEffect, useState } from "react";
import { getStats } from "../services/adminService";
import { getPendingProviders, setProviderStatus } from "../services/providerService";

export function useAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const [statsData, pendingData] = await Promise.all([getStats(), getPendingProviders()]);
    setStats(statsData);
    setPending(pendingData);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function decide(id, status) {
    await setProviderStatus(id, status);
    reload();
  }

  return { stats, pending, loading, decide };
}
