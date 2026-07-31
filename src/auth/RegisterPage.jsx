import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ username, role: "patient" });
      navigate("/search");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page--narrow">
      <Card>
        <h1>Register</h1>
        <p className="muted">Dummy registration - creates a Patient account.</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <ErrorMessage message={error} />}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Card>
    </div>
  );
}
