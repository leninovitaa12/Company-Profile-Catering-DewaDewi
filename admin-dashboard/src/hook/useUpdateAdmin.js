"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import useApiUrl from "./useApiUrl"

const useUpdateAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl = useApiUrl()

  const updateAdmin = async (id, adminData) => {
    setLoading(true)
    try {
      const { data } = await axios.put(`${apiUrl}/api/account/${id}`, adminData, {
        withCredentials: true,
      })
      toast.success("Admin berhasil diperbarui")
      setError(null)
      return data
    } catch (error) {
      console.error("Error updating admin:", error)
      const errorMessage = error.response?.data?.error || "Gagal memperbarui admin"
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { updateAdmin, loading, error }
}

export default useUpdateAdmin
