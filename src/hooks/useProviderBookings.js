import { useEffect, useState } from "react";
import { getBookingsForProvider } from "../services/bookingService";

const DEMO_PROVIDER_ID = "PRV-101";

export function useProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBookingsForProvider(DEMO_PROVIDER_ID);
      setBookings(data);
      setLoading(false);
    }
    load();
  }, []);

  return { bookings, loading };
}
