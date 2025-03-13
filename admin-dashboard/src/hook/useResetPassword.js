import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useApiUrl from "./useApiUrl.js";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = useApiUrl();

  const resetPassword = async ({ email, pin, password, confirmPassword }) => {
    const success = handleInputerrors({
      email,
      pin,
      password,
      confirmPassword,
    });

    if (!success) return;

    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        email,
        pin,
        password,
        confirmPassword,
      });

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Reset Password Successfully");
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};
export default useResetPassword;

const handleInputerrors = ({ email, pin, password, confirmPassword }) => {
  if (!email || !pin || !password || !confirmPassword) {
    toast.error("Fill all fields!");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Confirm password does not match!");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters!");
    return false;
  }
  return true;
};
