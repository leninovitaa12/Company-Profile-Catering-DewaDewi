import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginAdmin.css"; // Import file CSS
import useLogin from "../hook/useLogin";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-admin-container">
      <div className="login-admin-left">
        <h1>Selamat Datang</h1>
        <p>Silakan masuk untuk mengakses dashboard admin.</p>
      </div>
      <div className="login-admin-right">
        <div className="login-admin-box">
          <h2>Login Admin</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan email Anda"
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password Anda"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="forgot-password-link">
            <Link to="/forgot-password">Lupa Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
