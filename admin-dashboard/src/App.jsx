import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";  // Jangan import BrowserRouter di sini
import { useAuthContext } from "./context/AuthContext";
import LoginAdmin from "./components/LoginAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import ForgotPassword from "./components/ForgotPassword";
import Testimoni from "./components/Testimoni";
import Product from "./components/Product";
import SuperUserDashboard from "./components/SuperUserDashboard";
import { useNavigate } from 'react-router-dom';

function App() {
  const { authUser } = useAuthContext(); // Mendapatkan user yang sedang login
  const navigate = useNavigate(); // Mendapatkan fungsi navigate

  useEffect(() => {
    // Jika sudah login, arahkan ke dashboard
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]); // Menambahkan authUser dan navigate sebagai dependensi

  return (
    <Routes>
      {/* Rute Login */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/dashboard" replace /> : <LoginAdmin />}
      />
      {/* Rute Dashboard */}
      <Route path="/dashboard" 
      element={authUser ? <DashboardAdmin /> : <Navigate to="/login" replace />} />
      {/* Rute Forgot Password */}
      <Route
        path="/forgot-password"
        element={authUser ? <Navigate to="/dashboard" replace /> : <ForgotPassword />}
      />
      {/* Rute Testimoni */}
      <Route
        path="/testimoni"
        element={authUser ? <Testimoni /> : <Navigate to="/login" replace />}
      />
      {/* Rute Product */}
      <Route
        path="/product"
        element={authUser ? <Product /> : <Navigate to="/login" replace />}
      />
      {/* Rute Super User Dashboard */}
      <Route
        path="/superuser-dashboard"
        element={authUser?.role === "superuser" ? <SuperUserDashboard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
