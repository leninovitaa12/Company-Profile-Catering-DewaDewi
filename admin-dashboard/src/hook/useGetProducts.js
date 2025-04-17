import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useGetProductsAdmin = (name = "", page = 1) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const apiUrl = useApiUrl();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(name && { name }),
        page,
      }).toString();

      const res = await axios.get(`${apiUrl}/api/product/?${queryParams}`);
      const data = res.data;

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [name, page]);

  return { products, total, loading, refetch: fetchProducts };
};

export default useGetProductsAdmin;
