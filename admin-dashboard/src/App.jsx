import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import LoginAdmin from "./components/LoginAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import ForgotPassword from "./components/ForgotPassword";
import Testimoni from "./components/Testimoni";
import Product from "./components/Product";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import Layout from "./Layout";
import ProfileSection from "./components/ProfileSection";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* Rute Login */}
      <Route
        path="/login"
        element={
          authUser ? (
            <Navigate to="/" />
          ) : (
            <Layout>
              <LoginAdmin />
            </Layout>
          )
        }
      />
      {/* Rute Dashboard */}
      <Route
        path="/"
        element={
          authUser ? (
            <Layout>
              <DashboardAdmin />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Rute Forgot Password */}
      <Route
        path="/forgot-password"
        element={
          authUser ? (
            <Navigate to="/" />
          ) : (
            <Layout>
              <ForgotPassword />
            </Layout>
          )
        }
      />
      {/* Rute Profile */}
      <Route
        path="/profil"
        element={
          authUser ? (
            <Layout>
              <ProfileSection />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Rute Testimoni */}
      <Route
        path="/testimoni"
        element={
          authUser ? (
            <Layout>
              <Testimoni />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Rute Product */}
      <Route
        path="/product"
        element={
          authUser ? (
            <Layout>
              <Product />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Akun Product */}
      <Route
        path="/account"
        element={
          authUser ? (
            <Layout>
              <SuperAdminDashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
