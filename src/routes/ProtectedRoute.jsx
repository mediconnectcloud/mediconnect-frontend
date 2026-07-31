import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any page that should only be visible to a logged-in user with a
// specific role, e.g.:
//   <ProtectedRoute role="provider"><ProviderDashboardPage /></ProtectedRoute>
export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
