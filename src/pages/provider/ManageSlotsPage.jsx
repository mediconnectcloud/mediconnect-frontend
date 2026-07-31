import { useState } from "react";
import { useProviderSlots } from "../../hooks/useProviderSlots";
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function ManageSlotsPage() {
  const { doctors, selectedDoctorId, setSelectedDoctorId, slots, loading, create, block } =
    useProviderSlots();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function handleAddSlot(e) {
    e.preventDefault();
    if (!date || !time) return;
    await create({ date, time });
    setDate("");
    setTime("");
  }

  if (loading) return <LoadingSpinner />;

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
              <Button variant="secondary" onClick={() => block(slot.id)}>
                Block this slot
              </Button>
            )}
          </Card>
        ))}
        {slots.length === 0 && <EmptyState message="No slots yet for this doctor." />}
      </div>
    </div>
  );
}
