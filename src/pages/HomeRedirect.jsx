import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLE_HOME } from "../utils/constants";

export default function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[user.role]} replace />;
}
