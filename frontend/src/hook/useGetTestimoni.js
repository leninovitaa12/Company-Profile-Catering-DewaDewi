import { useState, useEffect } from "react";
import useApiUrl from "./useApiUrl";

const useGetTestimoni = (page = 1) => {
  const [testimonis, setTestimonis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const apiUrl = useApiUrl();

  const fetchTestimonis = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/testimoni?page=${page}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch testimonis");
      }

      const data = await res.json();

      setTestimonis(data.testimonis || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error(error.message || "Failed to fetch testimonis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonis();
  }, [page]);

  return { testimonis, total, loading, refetch: fetchTestimonis };
};

export default useGetTestimoni;
