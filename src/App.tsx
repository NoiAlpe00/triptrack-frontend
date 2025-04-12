import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomNavbar from './components/Navbar';
import { useIsAuthenticated } from 'react-auth-kit';
import { useLocation, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoutes from './utils/Routes/ProtectedRoutes';
import AdminPage from './pages/Admin';
import GuardPage from './pages/Guard';
import StaffPage from './pages/Staff';

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
          path="/guard"
          element={
            <ProtectedRoutes allowedRoles={["Guard", "Admin"]}>
              <GuardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoutes allowedRoles={["Staff", "Admin"]}>
              <StaffPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<h2>Welcome Home</h2>} />
      </Routes>
    </>
  );
}

