import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useGetTestimoni = (page = 1) => {
  const [testimonis, setTestimonis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const apiUrl = useApiUrl();

  const fetchTestimoni = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/testimoni?page=${page}`);
      setTestimonis(res.data.testimonis || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching testimonis:", err.message);
      setError("Gagal mengambil data testimoni");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, page]);

  // Use useEffect to fetch data initially
  useEffect(() => {
    fetchTestimoni();
  }, [fetchTestimoni]);

  // Function to trigger refetch
  const refetch = () => {
    fetchTestimoni();
  };

  return { testimonis, total, loading, error, refetch };
};

export default useGetTestimoni;
