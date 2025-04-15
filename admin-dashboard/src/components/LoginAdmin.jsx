import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hook/useLogin";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1EFDC]">
      <div className="bg-white rounded-xl shadow-2xl flex overflow-hidden max-w-4xl">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#42032C] to-[#D36B00] flex flex-col justify-center items-center p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-lg">Silakan masuk untuk mengakses dashboard admin.</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-10">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center">Login Admin</h2>
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
            <div className="mb-5">
              <label className="block text-[#42032C] font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password Anda"
                className="w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#D36B00] hover:bg-[#42032C] transition text-white rounded-lg font-bold"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <p className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-[#42032C] hover:text-[#D36B00] font-semibold transition"
              >
                Lupa Password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
