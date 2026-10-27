import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
export default function LoginPage() {
  const { login } = useAuth(); const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState("");
  async function handleSubmit(e) { e.preventDefault(); setError(""); try { await login(username, password); } catch { setError("Invalid username or password."); } }
  return <div style={{ maxWidth: 360, margin: "6rem auto", padding: "2rem", background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,.08)" }}>
    <h2 style={{ marginBottom: "1.5rem", color: "#1e1b4b" }}>Sign in to Threadbase</h2>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required style={{ padding: ".6rem .8rem", border: "1px solid #cbd5e1", borderRadius: 8 }} />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required style={{ padding: ".6rem .8rem", border: "1px solid #cbd5e1", borderRadius: 8 }} />
      {error && <p style={{ color: "#ef4444", fontSize: ".85rem" }}>{error}</p>}
      <button type="submit" style={{ padding: ".65rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Sign in</button>
    </form>
    <p style={{ marginTop: "1rem", fontSize: ".8rem", color: "#64748b" }}>Demo: ada / password · linus / password</p>
  </div>;
}