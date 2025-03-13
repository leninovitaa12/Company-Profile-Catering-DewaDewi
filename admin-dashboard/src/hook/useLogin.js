import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import useApiUrl from "./useApiUrl";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const apiUrl = useApiUrl();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("SignIn Successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
export default useLogin;

const handleInputErrors = (email, password) => {
  if (!email || !password) {
    toast.error("Fill all fields!");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters!");
    return false;
  }
  return true;
};
