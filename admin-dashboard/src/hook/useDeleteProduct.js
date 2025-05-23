import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = useApiUrl();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${apiUrl}/api/product/${id}`, {
        withCredentials: true,
      });

      toast.success("Produk Berhasil dihapus!");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Gagal menghapus produk"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;
