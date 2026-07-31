import { NavLink } from "react-router-dom";

// items: [{ to: "/provider/dashboard", label: "Dashboard" }, ...]
export default function Sidebar({ items }) {
  return (
    <nav className="sidebar">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => "sidebar__link" + (isActive ? " sidebar__link--active" : "")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
