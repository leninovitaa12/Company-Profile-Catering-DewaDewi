import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import useApiUrl from "./useApiUrl";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const apiUrl = useApiUrl();

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user");
      setAuthUser(null);
      toast.success("Logged Out");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
