import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.svg";

const NAV_ITEMS = {
  provider: [
    { to: "/provider/dashboard", label: "Dashboard" },
    { to: "/provider/doctors", label: "Manage Doctors" },
    { to: "/provider/slots", label: "Manage Slots" },
  ],
  admin: [{ to: "/admin", label: "Admin Dashboard" }],
};

// Sidebar-style layout for Provider and Admin pages - these are internal
// "back office" screens, so a persistent sidebar suits them better than
// the top navbar patients see (see the Frontend Architecture doc, section 3).
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const items = NAV_ITEMS[user?.role] || [];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">
        <Link to="/" className="navbar__brand navbar__brand--sidebar">
          <img src={logo} alt="" width="24" height="24" />
          MediConnect
        </Link>
        <Sidebar items={items} />
      </aside>

      <div className="dashboard-layout__body">
        <header className="dashboard-layout__topbar">
          <span className="navbar__user">
            {user?.name} <span className="badge">{user?.role}</span>
            <button className="link-button" onClick={handleLogout}>
              Log out
            </button>
          </span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
