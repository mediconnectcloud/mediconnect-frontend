import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { ROLE_HOME } from "../utils/constants";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login({ username, role });
      navigate(ROLE_HOME[user.role]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page--narrow">
      <Card>
        <h1>Log in</h1>
        <p className="muted">
          Dummy login - any username/password works. Pick a role to see that part of the app.
        </p>

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

          <label>
            Log in as
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error && <ErrorMessage message={error} />}

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="muted">
          No account? <Link to="/register">Register as a patient</Link>
        </p>
      </Card>
    </div>
  );
}
