import { useAuth } from "../auth/AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";
export default function NavBar() {
  const { user, logout } = useAuth();
  return <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".75rem 1.5rem", background: "#1e1b4b", color: "#fff" }}>
    <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Threadbase</span>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {user && <span style={{ fontSize: ".85rem", color: "#c7d2fe" }}>Hi, {user.username}</span>}
      <NotificationBell />
      {user && <button onClick={logout} style={{ background: "none", border: "1px solid #6366f1", color: "#a5b4fc", padding: ".3rem .8rem", borderRadius: 6, cursor: "pointer" }}>Log out</button>}
    </div>
  </nav>;
}