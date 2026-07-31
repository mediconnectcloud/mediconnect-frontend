import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role, name } | null

  async function login({ username, role }) {
    const loggedInUser = await authService.login({ username, role });
    // A real token would come back from Cognito here. Stored under this
    // key so apiClient.js can attach it to every request automatically.
    window.sessionStorage.setItem("mediconnect_token", `dummy-token-${loggedInUser.username}`);
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function register({ username, role }) {
    const newUser = await authService.register({ username, role });
    window.sessionStorage.setItem("mediconnect_token", `dummy-token-${newUser.username}`);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    window.sessionStorage.removeItem("mediconnect_token");
    setUser(null);
  }

  const value = { user, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
