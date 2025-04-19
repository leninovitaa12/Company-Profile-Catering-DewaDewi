"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import useApiUrl from "./useApiUrl"

const useCreateAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl = useApiUrl()

  const createAdmin = async (adminData) => {
    setLoading(true)
    try {
      const { data } = await axios.post(`${apiUrl}/api/account`, adminData, {
        withCredentials: true,
      })
      toast.success("Admin berhasil ditambahkan")
      setError(null)
      return data
    } catch (error) {
      console.error("Error creating admin:", error)
      const errorMessage = error.response?.data?.error || "Gagal menambahkan admin"
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { createAdmin, loading, error }
}

export default useCreateAdmin
