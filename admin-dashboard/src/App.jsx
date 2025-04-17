import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import LoginAdmin from "./components/LoginAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import ForgotPassword from "./components/ForgotPassword";
import Testimoni from "./components/Testimoni";
import Product from "./components/Product";
import SuperAdminDashboard from "./components/SuperAdminDashboard";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* Rute Login */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <LoginAdmin />}
      />
      {/* Rute Dashboard */}
      <Route
        path="/"
        element={authUser ? <DashboardAdmin /> : <Navigate to="/login" />}
      />
      {/* Rute Forgot Password */}
      <Route
        path="/forgot-password"
        element={authUser ? <Navigate to="/" /> : <ForgotPassword />}
      />
      {/* Rute Testimoni */}
      <Route
        path="/testimoni"
        element={authUser ? <Testimoni /> : <Navigate to="/login" />}
      />
      {/* Rute Product */}
      <Route
        path="/product"
        element={authUser ? <Product /> : <Navigate to="/login" />}
      />
      {/* Akun Product */}
      <Route
        path="/account"
        element={authUser ? <SuperAdminDashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
