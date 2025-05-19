import { useEffect, useState } from "react";
import axios from "axios";
import useApiUrl from "./useApiUrl";

const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = useApiUrl();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/profile/logs`)
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal memuat log");
        setLoading(false);
      });
  }, []);

  return { logs, loading, error };
};

export default useLogs;
