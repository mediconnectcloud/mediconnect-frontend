import { useCallback, useEffect, useState } from "react";
import { getSlotsByDoctor } from "../services/slotService";

export function useSlots(doctorId) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const data = await getSlotsByDoctor(doctorId);
    setSlots(data);
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { slots, loading, reload };
}
