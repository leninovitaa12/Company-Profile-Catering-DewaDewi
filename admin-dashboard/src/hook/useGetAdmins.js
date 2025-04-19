"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import useApiUrl from "./useApiUrl"

const useGetAdmins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = useApiUrl()

  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${apiUrl}/api/account`, {
        withCredentials: true,
      })
      setAdmins(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching admins:", error)
      setError(error.response?.data?.error || "Gagal mengambil data admin")
      toast.error(error.response?.data?.error || "Gagal mengambil data admin")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return { admins, loading, error, refetch: fetchAdmins }
}

export default useGetAdmins
