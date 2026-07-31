import { useEffect, useState } from "react";
import { getDoctorsByProvider } from "../services/doctorService";
import { getSlotsByDoctor, addSlot, blockSlot } from "../services/slotService";

const DEMO_PROVIDER_ID = "PRV-101";

export function useProviderSlots() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const docs = await getDoctorsByProvider(DEMO_PROVIDER_ID);
      setDoctors(docs);
      if (docs.length > 0) setSelectedDoctorId(docs[0].id);
      setLoading(false);
    }
    load();
  }, []);

  async function reloadSlots() {
    if (!selectedDoctorId) return;
    const data = await getSlotsByDoctor(selectedDoctorId);
    setSlots(data);
  }

  useEffect(() => {
    reloadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoctorId]);

  async function create({ date, time }) {
    await addSlot({ doctorId: selectedDoctorId, date, time });
    reloadSlots();
  }

  async function block(id) {
    await blockSlot(id);
    reloadSlots();
  }

  return { doctors, selectedDoctorId, setSelectedDoctorId, slots, loading, create, block };
}
