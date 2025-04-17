import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const usePostProduct = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = useApiUrl();

  const postProduct = async (productData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/product/`, productData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully!");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to create product"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postProduct, loading };
};

export default usePostProduct;
