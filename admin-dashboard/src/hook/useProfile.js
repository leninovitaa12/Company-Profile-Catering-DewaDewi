import { useState, useEffect } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

axios.defaults.withCredentials = true;

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = useApiUrl()


  // GET Profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/profile`);
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Gagal memuat profil.");
    } finally {
      setLoading(false);
    }
  };

  // POST or UPDATE Profile
  const saveProfile = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(response.data.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Gagal menyimpan profil.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    saveProfile,
  };
};

export default useProfile;
