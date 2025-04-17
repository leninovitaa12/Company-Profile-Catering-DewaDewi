import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useApiUrl from "./useApiUrl";

const usePinReset = () => {
  const [loadings, setLoadings] = useState(false);
  const [onPin, setOnPin] = useState(false);
  const apiUrl = useApiUrl();

  const getPin = async ({ email }) => {
    const success = handleInputerrors({ email });
    if (!success) return;

    setLoadings(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/pin-reset`,
        {
          email,
        },
        { withCredentials: true }
      );

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(data.message);
      setOnPin(true);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoadings(false);
    }
  };

  return { loadings, getPin, onPin };
};
export default usePinReset;

const handleInputerrors = ({ email }) => {
  if (!email) {
    toast.error("Fill all fields!");
    return false;
  }
  return true;
};
