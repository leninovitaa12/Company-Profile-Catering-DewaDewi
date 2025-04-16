import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useApiUrl from '../hook/useApiUrl';

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
        setError('');
      } else {
        setError('Email tidak ditemukan.');
        setMessage('');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim permintaan.');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1EFDC]">
      <div className="bg-white rounded-xl shadow-2xl flex overflow-hidden max-w-4xl">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#42032C] to-[#D36B00] flex flex-col justify-center items-center p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Lupa Password?</h1>
          <p className="text-lg">Masukkan email Anda untuk mendapatkan permintaan reset password.</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-10">
          <form className="w-full" onSubmit={handleForgotPassword}>
            <h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center">Reset Password</h2>
            {message && <p className="text-green-600 text-center mb-4">{message}</p>}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-5">
              <label className="block text-[#42032C] font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#D36B00] hover:bg-[#42032C] transition text-white rounded-lg font-bold"
            >
              Kirim Permintaan
            </button>
            <p className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#42032C] hover:text-[#D36B00] font-semibold transition"
              >
                Kembali ke Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
