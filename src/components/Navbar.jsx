import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";

// Top navbar used by MainLayout (public pages + Patient pages).
// Provider/Admin navigation lives in the Sidebar inside DashboardLayout instead.
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
        <img src={logo} alt="" width="24" height="24" />
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
