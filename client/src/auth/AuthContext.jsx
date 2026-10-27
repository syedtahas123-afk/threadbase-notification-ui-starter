import { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient.js";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("tb_user")) || null; } catch { return null; } });
  const [token, setToken] = useState(() => localStorage.getItem("tb_token") || null);
  async function login(username, password) {
    const res = await apiClient.post("/auth/login", { username, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem("tb_token", t); localStorage.setItem("tb_user", JSON.stringify(u));
    setToken(t); setUser(u); return u;
  }
  function logout() { localStorage.removeItem("tb_token"); localStorage.removeItem("tb_user"); setToken(null); setUser(null); }
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }