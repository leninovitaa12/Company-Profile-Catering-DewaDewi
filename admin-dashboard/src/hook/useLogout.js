"use client"

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import useApiUrl from "./useApiUrl";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false); // to track if the logout process is pending
  const [error, setError] = useState(null); // for capturing any errors
  const { setAuthUser } = useAuthContext(); // to clear the authenticated user from context
  const apiUrl = useApiUrl(); // assuming this provides the base API URL

  const logout = async () => {
    setIsPending(true);
    setError(null); // Reset previous errors

    try {
      // Make API call to logout
      const { data } = await axios.post(
        `${apiUrl}/api/auth/logout`, 
        {}, 
        { withCredentials: true }
      );

      if (data.error) {
        throw new Error(data.error); // Handle API errors
      }

      // Clear user data on successful logout
      localStorage.removeItem("user"); // Remove user info from localStorage
      setAuthUser(null); // Update the context
      toast.success("Logged out successfully");

    } catch (err) {
      // Handle errors during logout
      toast.error(err.response?.data?.error || err.message);
      setError(err.message); // Update the error state
    } finally {
      setIsPending(false); // End the loading state
    }
  };

  return { logout, isPending, error };
};

export default useLogout;
