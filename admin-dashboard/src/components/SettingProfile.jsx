"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { PageHeader, Sidebar } from "./ui/ui-components";
import { ProfilIcon, ImageIcon } from "./ui/icons";
import useApiUrl from "../hook/useApiUrl";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const SettingProfile = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const apiUrl = useApiUrl();
  const [name, setName] = useState(authUser.name);
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const saveSettingProfile = async (data) => {
    const endpoint = `${apiUrl}/api/auth/editself`;
    return await axios.put(endpoint, data, {
      withCredentials: true,
    });
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.warning("Semua field wajib diisi!");
      return;
    }

    if (password && password !== passwordConfirmation) {
      toast.warning("Konfirmasi password tidak cocok!");
      return;
    }

    const data = {
      name,
      email,
      ...(password ? { password, passwordConfirmation } : {}),
    };

    setLoading(true);
    try {
      const response = await saveSettingProfile(data);
      console.log("✅ Response:", response.data);
      console.log("✅ Response:", response.error);

      const updatedUser = { ...authUser, name, email };
      setAuthUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profil berhasil disimpan");
    } catch (error) {
      console.error("❌ Error:", error);
      console.error("❌ Error response:", error.error);
      toast.error(error.response?.data?.message || "Gagal menyimpan profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      <Sidebar activePage="setting" />
      <div className="flex-1">
        <PageHeader title="Manajemen Profil" icon={<ProfilIcon />} />
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-6">
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama
            </label>
            <input
              id="nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password jika ingin mengubah saja"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="passwordc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password Conformation
            </label>
            <input
              id="passwordc"
              value={passwordConfirmation}
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Masukkan Password jika ingin mengubah saja"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2.5 px-6 rounded-lg transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Simpan Profil Saya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingProfile;
