import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = useApiUrl();

  const deleteProduct = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) return;

    setLoading(true);
    try {
      const res = await axios.delete(`${apiUrl}/api/product/${id}`, {
        withCredentials: true,
      });

      toast.success("Product deleted successfully!");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete product"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;
