import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useResetPassword from "../hook/useResetPassword";
import usePinReset from "../hook/usePinReset";

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    pin: "",
    password: "",
    confirmPassword: "",
  });
  const { loadings, getPin, onPin } = usePinReset();
  const { loading, resetPassword } = useResetPassword();

  const handleSubmitGetPin = async (e) => {
    e.preventDefault();
    await getPin(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(inputs);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#F1EFDC]">
      <div className="bg-white flex-col md:flex-row rounded-xl shadow-2xl flex overflow-hidden max-w-4xl">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#42032C] to-[#D36B00] flex flex-col justify-center items-center p-8 text-white">
          <h1 className="text-xl md:text-5xl font-bold mb-4">Lupa Password?</h1>
          <p className="md:text-lg text-center md:text-justify">
            Masukkan email Anda untuk mendapatkan permintaan reset password.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-10">
          {!onPin && (
            <form className="w-full" onSubmit={handleSubmitGetPin}>
              <h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center">
                Reset Password
              </h2>
              <div className="mb-5">
                <label className="block text-[#42032C] font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
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
                <Link
                  to={"/login"}
                  className="text-[#42032C] hover:text-[#D36B00] font-semibold transition"
                >
                  Kembali ke Login
                </Link>
              </p>
            </form>
          )}

          {onPin && (
            <form className="w-full" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center">
                Reset Password
              </h2>
              <p className="font-bold text-[#42032C] mb-8 text-center">
                Masukkan Pin dan Password
              </p>
              <div className="mb-5">
                <label className="block text-[#42032C] font-semibold mb-2">
                  Pin
                </label>
                <input
                  type="text"
                  value={inputs.pin}
                  onChange={(e) =>
                    setInputs({ ...inputs, pin: e.target.value })
                  }
                  required
                  placeholder="Masukkan Pin Anda"
                  className="w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00]"
                />
                <label className="block text-[#42032C] font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  required
                  placeholder="Masukkan password Anda"
                  className="w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00]"
                />
                <label className="block text-[#42032C] font-semibold mb-2">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Konfirmasi password Anda"
                  className="w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#D36B00] hover:bg-[#42032C] transition text-white rounded-lg font-bold"
              >
                Kirim
              </button>
              <p className="mt-4 text-center">
                <Link
                  to={"/login"}
                  className="text-[#42032C] hover:text-[#D36B00] font-semibold transition"
                >
                  Kembali ke Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
