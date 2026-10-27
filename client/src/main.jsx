import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import App from "./App.jsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><QueryClientProvider client={queryClient}><AuthProvider><NotificationProvider><App /></NotificationProvider></AuthProvider></QueryClientProvider></React.StrictMode>
);