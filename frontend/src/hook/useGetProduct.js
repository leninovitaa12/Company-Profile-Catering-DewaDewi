import { useState, useEffect } from "react";
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

      const res = await fetch(`${apiUrl}/api/product/?${queryParams}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.log(error.message || "Failed to fetch products");
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
