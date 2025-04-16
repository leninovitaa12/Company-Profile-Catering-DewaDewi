import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext"; // Hook untuk menggunakan context
import useApiUrl from "./useApiUrl";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();  // Mendapatkan setter untuk authUser
  const apiUrl = useApiUrl();
  const navigate = useNavigate();  // Fungsi navigate untuk pengalihan

  // Fungsi login
  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) {
      return;
    }
  
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });
  
      // Jika ada error dari server (dari backend)
      if (data.error) {
        throw new Error(data.error);  // Lemparkan error untuk ditangani di bagian berikutnya
      }
  
      // Jika login berhasil, simpan user di localStorage dan setAuthUser di context
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthUser(data.user);
  
      // Navigasi ke halaman berdasarkan role pengguna
      if (data.user.role === "superuser") {
        navigate("/superuser-dashboard");
      } else if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        toast.error("Role pengguna tidak ditemukan!");
      }
  
      toast.success("SignIn Successfully");
    } catch (error) {
      // Menampilkan error yang diterima dari backend atau server
      toast.error(error.response?.data?.error || error.message);  // Tampilkan pesan error
    } finally {
      setLoading(false);
    }
  };  

  // Fungsi pengecekan input
  const handleInputErrors = (email, password) => {
    if (!email || !password) {
      toast.error("Fill all fields!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }
    return true;
  };

  // Fungsi untuk handle form submit
  const handleSubmit = async (e, email, password) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!email || !password) {
      toast.error("Email dan password wajib diisi!");  // Menampilkan pesan error jika form tidak lengkap
      return;
    }
    await login(email, password);  // Panggil login untuk memproses autentikasi
  };

  return { handleSubmit, loading };  // Mengembalikan handleSubmit dan loading
};

export default useLogin;
