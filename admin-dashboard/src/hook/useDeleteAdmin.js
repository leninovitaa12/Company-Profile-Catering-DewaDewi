"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import useApiUrl from "./useApiUrl"

const useDeleteAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl = useApiUrl()

  const deleteAdmin = async (id) => {
    setLoading(true)
    try {
      const { data } = await axios.delete(`${apiUrl}/api/account/${id}`, {
        withCredentials: true,
      })
      toast.success("Admin berhasil dihapus")
      setError(null)
      return data
    } catch (error) {
      console.error("Error deleting admin:", error)
      const errorMessage = error.response?.data?.error || "Gagal menghapus admin"
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { deleteAdmin, loading, error }
}

export default useDeleteAdmin
