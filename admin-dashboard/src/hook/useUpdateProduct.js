import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = useApiUrl();

  const updateProduct = async (id, updatedData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Hanya tambahkan field yang memiliki nilai
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          formData.append(key, updatedData[key]);
        }
      });

      const res = await axios.put(`${apiUrl}/api/product/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully!");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to update product"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading };
};

export default useUpdateProduct;
