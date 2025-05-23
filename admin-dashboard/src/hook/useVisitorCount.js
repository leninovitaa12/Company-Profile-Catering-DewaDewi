"use client"

import { useState, useEffect } from "react"

const useVisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulasi pengambilan data pengunjung dari localStorage
    const getVisitorCount = () => {
      setLoading(true)
      try {
        // Cek apakah ada data pengunjung di localStorage
        let count = localStorage.getItem("visitorCount")

        if (!count) {
          // Jika belum ada, inisialisasi dengan nilai awal
          count = Math.floor(Math.random() * 100) + 50 // Simulasi 50-150 pengunjung
          localStorage.setItem("visitorCount", count)
        }

        // Increment jumlah pengunjung setiap kali dashboard dibuka
        // (simulasi pengunjung baru)
        const newCount = Number.parseInt(count) + 1
        localStorage.setItem("visitorCount", newCount.toString())

        setVisitorCount(newCount)
      } catch (error) {
        console.error("Error getting visitor count:", error)
        setVisitorCount(0)
      } finally {
        setLoading(false)
      }
    }

    getVisitorCount()
  }, [])

  return { visitorCount, loading }
}

export default useVisitorCount
