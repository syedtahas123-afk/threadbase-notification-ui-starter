import { useCallback } from "react";
import { useSSE } from "../hooks/useSSE.js";
import { useNotifications } from "../context/NotificationContext.jsx";
import NavBar from "./NavBar.jsx";
export default function AppShell({ children }) {
  const { dispatch } = useNotifications();
  const handleMessage = useCallback((data) => dispatch({ type: "ADD_NOTIFICATION", payload: data }), [dispatch]);
  useSSE("/api/notifications/stream", handleMessage);
  return <div><NavBar /><main style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem" }}>{children}</main></div>;
}