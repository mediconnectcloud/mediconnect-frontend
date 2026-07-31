import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        MediConnect
      </Link>

      <nav className="navbar__links">
        {!user && (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === "patient" && (
          <>
            <Link to="/search">Search</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        )}

        {user && user.role === "provider" && (
          <>
            <Link to="/provider/dashboard">Dashboard</Link>
            <Link to="/provider/doctors">Doctors</Link>
            <Link to="/provider/slots">Slots</Link>
          </>
        )}

        {user && user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

        {user && (
          <span className="navbar__user">
            {user.name} <span className="badge">{user.role}</span>
            <button className="link-button" onClick={handleLogout}>
              Log out
            </button>
          </span>
        )}
      </nav>
    </header>
  );
}
