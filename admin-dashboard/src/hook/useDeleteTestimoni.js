import { useState } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useDeleteTestimoni = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const apiUrl = useApiUrl();

  const deleteTestimoni = async (id) => {
    setLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      const res = await axios.delete(`${apiUrl}/api/testimoni/${id}`, {
        withCredentials: true, // Menambahkan credentials (cookies, authorization header, dll.)
      });

      setSuccessData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.error || "Gagal menghapus testimoni";
      setError(message);
      console.error("Delete Testimoni Error:", message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTestimoni, loading, error, successData };
};

export default useDeleteTestimoni;
