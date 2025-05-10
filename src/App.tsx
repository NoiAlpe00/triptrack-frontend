import "./App.css";
import CustomNavbar from "./components/Navbar";
import { useIsAuthenticated } from "react-auth-kit";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/Routes/ProtectedRoutes";
import AdminPage from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Reports from "./pages/Reports";
import Driver from "./pages/Driver";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isAuthenticated() && !isLoginPage && <CustomNavbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRoles={["Admin"]}>
              <AdminPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoutes allowedRoles={["Admin"]}>
              <Reports />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoutes allowedRoles={["Admin", "Driver"]}>
              <Driver />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoutes allowedRoles={["Requisitioner", "Admin", "Guard", "Head"]}>
              <Trips />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["Admin", "Requisitioner", "Head"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
