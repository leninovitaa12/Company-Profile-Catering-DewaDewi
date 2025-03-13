import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginAdmin from "./components/LoginAdmin.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Layout from "./Layout";
import { useAuthContext } from "./context/AuthContext.jsx";
import Test from "./components/Test.jsx";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Test /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginAdmin />}
          />
          <Route
            path="/forgot-password"
            element={authUser ? <Navigate to="/" /> : <ForgotPassword />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
