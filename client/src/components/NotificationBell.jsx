import { useNotifications } from "../context/NotificationContext.jsx";
export default function NotificationBell() {
  return <div style={{ position: "relative" }}><button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: "#fff" }} aria-label="Notifications">🔔</button></div>;
}