import { createContext, useContext, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role, name } | null

  async function login({ username, role }) {
    const loggedInUser = await authApi.login({ username, role });
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function register({ username, role }) {
    const newUser = await authApi.register({ username, role });
    setUser(newUser);
    return newUser;
  }

  function logout() {
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
