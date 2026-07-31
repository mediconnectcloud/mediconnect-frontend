import { useEffect, useState } from "react";
import { getDoctorsByProvider, addDoctor, removeDoctor } from "../../api/doctors";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const DEMO_PROVIDER_ID = "PRV-101";

export default function ManageDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");

  async function load() {
    setLoading(true);
    const data = await getDoctorsByProvider(DEMO_PROVIDER_ID);
    setDoctors(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await addDoctor({ providerId: DEMO_PROVIDER_ID, name, specialization, fee });
    setName("");
    setSpecialization("");
    setFee("");
    load();
  }

  async function handleRemove(id) {
    await removeDoctor(id);
    load();
  }

  return (
    <div className="page">
      <h1>Manage Doctors</h1>

      <Card className="form-card">
        <h2>Add a doctor</h2>
        <form className="form form--row" onSubmit={handleAdd}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input
            placeholder="Specialisation"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <input
            placeholder="Fee ($)"
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </Card>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid">
          {doctors.map((doc) => (
            <Card key={doc.id}>
              <h3>{doc.name}</h3>
              <p className="muted">{doc.specialization}</p>
              <p>Fee: ${doc.fee}</p>
              <Button variant="secondary" onClick={() => handleRemove(doc.id)}>
                Remove
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
