import { useState } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useEditTestimoni = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const apiUrl = useApiUrl();

  const editTestimoni = async (id, formData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${apiUrl}/api/testimoni/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setIsEditing(false);
      return response.data;
    } catch (err) {
      setError("Gagal mengedit testimoni");
      console.error("Error editing testimoni:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);

  return {
    editTestimoni,
    isEditing,
    startEditing,
    cancelEditing,
    loading,
    error,
  };
};

export default useEditTestimoni;
