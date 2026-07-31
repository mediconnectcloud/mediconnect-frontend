import { useEffect, useState } from "react";
import { getDoctorsByProvider } from "../../api/doctors";
import { getSlotsByDoctor, addSlot, blockSlot } from "../../api/slots";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const DEMO_PROVIDER_ID = "PRV-101";

export default function ManageSlotsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function load() {
      const docs = await getDoctorsByProvider(DEMO_PROVIDER_ID);
      setDoctors(docs);
      if (docs.length > 0) setSelectedDoctorId(docs[0].id);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadSlots() {
      if (!selectedDoctorId) return;
      const data = await getSlotsByDoctor(selectedDoctorId);
      setSlots(data);
    }
    loadSlots();
  }, [selectedDoctorId]);

  async function handleAddSlot(e) {
    e.preventDefault();
    if (!date || !time) return;
    await addSlot({ doctorId: selectedDoctorId, date, time });
    setDate("");
    setTime("");
    const data = await getSlotsByDoctor(selectedDoctorId);
    setSlots(data);
  }

  async function handleBlock(id) {
    await blockSlot(id);
    const data = await getSlotsByDoctor(selectedDoctorId);
    setSlots(data);
  }

  if (loading) return <Loading />;

  return (
    <div className="page">
      <h1>Manage Slots</h1>

      <label>
        Doctor
        <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <Card className="form-card">
        <h2>Add a slot</h2>
        <form className="form form--row" onSubmit={handleAddSlot}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          <Button type="submit">Add slot</Button>
        </form>
      </Card>

      <div className="grid">
        {slots.map((slot) => (
          <Card key={slot.id}>
            <p>
              {slot.date} at {slot.time}
            </p>
            <p>
              Status: <span className="badge">{slot.status}</span>
            </p>
            {slot.status === "available" && (
              <Button variant="secondary" onClick={() => handleBlock(slot.id)}>
                Block this slot
              </Button>
            )}
          </Card>
        ))}
        {slots.length === 0 && <p className="muted">No slots yet for this doctor.</p>}
      </div>
    </div>
  );
}
