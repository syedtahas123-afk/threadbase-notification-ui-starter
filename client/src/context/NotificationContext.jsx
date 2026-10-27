import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { notificationReducer, initialState } from "../reducers/notificationReducer.js";
import apiClient from "../services/apiClient.js";
const NotificationContext = createContext(null);
export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  useEffect(() => { if (!user) return; apiClient.get("/api/notifications").then(res => dispatch({ type: "LOAD_NOTIFICATIONS", payload: res.data })).catch(err => console.error("[NotificationProvider] fetch error:", err)); }, [user]);
  return <NotificationContext.Provider value={{ state, dispatch }}>{children}</NotificationContext.Provider>;
}
export function useNotifications() { return useContext(NotificationContext); }