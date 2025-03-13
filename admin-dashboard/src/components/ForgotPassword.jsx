import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css'; // Import file CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      if (response.data.success) {
        setMessage('Permintaan reset password telah dikirim ke email Anda.');
      } else {
        setError('Email tidak ditemukan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim permintaan.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <h1>Lupa Password?</h1>
        <p>Masukkan email Anda untuk mendapatkan permintaan reset password.</p>
      </div>
      <div className="forgot-password-right">
        <div className="forgot-password-box">
          <h2>Reset Password</h2>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleForgotPassword}>
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
            <button type="submit" className="submit-button">
              Kirim Permintaan
            </button>
          </form>
          <p className="back-to-login">
            <button onClick={() => navigate('/')}>Kembali ke Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;