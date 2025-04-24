import { useState } from "react";
import useApiUrl from "./useApiUrl";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = useApiUrl();

  // GET Profile using fetch
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/profile/`);
      if (!response.ok) {
        throw new Error("Gagal memuat profil.");
      }
      const data = await response.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Gagal memuat profil.");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,  // Kembalikan fetchProfile agar bisa dipanggil di komponen
  };
};

export default useProfile;
