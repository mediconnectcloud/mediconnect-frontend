import { useCallback, useEffect, useState } from "react";
import { getMyBookings, updateBookingStatus } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export function useMyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const data = await getMyBookings(user.username);
    setBookings(data);
    setLoading(false);
  }, [user.username]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function cancelBooking(id) {
    await updateBookingStatus(id, "cancelled");
    reload();
  }

  return { bookings, loading, cancelBooking };
}
