import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
export function useSSE(url, onMessage) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const source = new EventSource(url, { withCredentials: true });
    source.onmessage = (event) => { try { onMessage(JSON.parse(event.data)); } catch { console.error("[useSSE] parse error:", event.data); } };
    source.onerror = (err) => console.error("[useSSE] error:", err);
    return () => source.close();
  }, [url, user, onMessage]);
}