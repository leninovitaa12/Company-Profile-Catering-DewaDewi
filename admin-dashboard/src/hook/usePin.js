import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useApiUrl from "./useApiUrl";

const usePin = () => {
  const [loadings, setLoadings] = useState(false);
  const [onPin, setOnPin] = useState(false);
  const apiUrl = useApiUrl();

  const getPin = async ({ name, email, password, confirmPassword }) => {
    const success = handleInputerrors({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!success) return;

    setLoadings(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/pin`,
        {
          name,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(error.message || "email tidak tersedia!");
        throw new Error(data.error);
      }
      toast.success(data.message);
      setOnPin(true);
    } catch (error) {
      toast.error(error.message || "email tidak tersedia!");
    } finally {
      setLoadings(false);
    }
  };

  return { loadings, getPin, onPin };
};
export default usePin;

const handleInputerrors = ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !confirmPassword) {
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
