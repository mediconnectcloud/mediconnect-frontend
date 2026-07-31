import { useState } from "react";
import { useProviderDoctors } from "../../hooks/useProviderDoctors";
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { isRequired, isValidFee } from "../../utils/validators";

export default function ManageDoctorsPage() {
  const { doctors, loading, create, remove } = useProviderDoctors();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    if (!isRequired(name) || !isValidFee(fee || 0)) return;
    await create({ name, specialization, fee });
    setName("");
    setSpecialization("");
    setFee("");
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
        <LoadingSpinner />
      ) : (
        <div className="grid">
          {doctors.map((doc) => (
            <Card key={doc.id}>
              <h3>{doc.name}</h3>
              <p className="muted">{doc.specialization}</p>
              <p>Fee: ${doc.fee}</p>
              <Button variant="secondary" onClick={() => remove(doc.id)}>
                Remove
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
