import AppShell from "./components/AppShell.jsx";
import { useAuth } from "./auth/AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  const { user } = useAuth();
  if (!user) return <LoginPage />;
  return <AppShell><HomePage /></AppShell>;
}