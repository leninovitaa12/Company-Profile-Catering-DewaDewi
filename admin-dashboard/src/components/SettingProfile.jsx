"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { PageHeader, Sidebar, Button } from "../components/ui/ui-components"
import { ProfilIcon } from "../components/ui/icons"
import useApiUrl from "../hook/useApiUrl"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"

const SettingProfile = () => {
  const { authUser, setAuthUser } = useAuthContext()

  const apiUrl = useApiUrl()
  const [name, setName] = useState(authUser.name)
  const [email, setEmail] = useState(authUser.email)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [loading, setLoading] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const saveSettingProfile = async (data) => {
    const endpoint = `${apiUrl}/api/auth/editself`
    return await axios.put(endpoint, data, {
      withCredentials: true,
    })
  }

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.warning("Semua field wajib diisi!")
      return
    }

    if (password && password !== passwordConfirmation) {
      toast.warning("Konfirmasi password tidak cocok!")
      return
    }

    const data = {
      name,
      email,
      ...(password ? { password, passwordConfirmation } : {}),
    }

    setLoading(true)
    try {
      const response = await saveSettingProfile(data)
      console.log("✅ Response:", response.data)

      const updatedUser = { ...authUser, name, email }
      setAuthUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      toast.success("Profil berhasil disimpan")
    } catch (error) {
      console.error("❌ Error:", error)
      toast.error(error.response?.data?.message || "Gagal menyimpan profil")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="flex min-h-screen bg-[#F1EFDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar activePage="setting" />
      <div className="flex-1">
        <PageHeader title="Manajemen Akun" icon={<ProfilIcon />} />
        <motion.div
          className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <motion.input
              id="nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama"
              className="border border-gray-300 rounded-lg p-2 w-full"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <motion.input
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <motion.input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password jika ingin mengubah saja"
              className="border border-gray-300 rounded-lg p-2 w-full"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="passwordc" className="block text-sm font-medium text-gray-700 mb-1">
              Password Confirmation
            </label>
            <motion.input
              id="passwordc"
              value={passwordConfirmation}
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Masukkan Password jika ingin mengubah saja"
              className="border border-gray-300 rounded-lg p-2 w-full"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div className="flex justify-center" variants={itemVariants}>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Memproses..." : "Simpan Profil Saya"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SettingProfile
