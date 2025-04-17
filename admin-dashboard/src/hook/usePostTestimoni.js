import { useState } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const usePostTestimoni = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const apiUrl = useApiUrl();

  const postTestimoni = async (file) => {
    setLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`${apiUrl}/api/testimoni`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setSuccessData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.error || "Gagal mengunggah testimoni";
      setError(message);
      console.error("Post Testimoni Error:", message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postTestimoni, loading, error, successData };
};

export default usePostTestimoni;
