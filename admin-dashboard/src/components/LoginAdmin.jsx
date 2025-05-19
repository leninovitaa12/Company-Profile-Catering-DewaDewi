"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import useLogin from "../hook/useLogin"
import { Input, Button } from "../components/ui/ui-components"

const LoginAdmin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading, error } = useLogin()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Email dan password wajib diisi!")
      return
    }
    await login(email, password)
  }

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-[#F1EFDC] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full md:w-1/2 bg-gradient-to-br from-[#42032C] to-[#D36B00] flex flex-col justify-center items-center p-8 text-white"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Selamat Datang
          </motion.h1>
          <motion.p
            className="text-md md:text-lg text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Silakan masuk untuk mengakses dashboard admin.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10"
          variants={containerVariants}
        >
          <form className="w-full max-w-md" onSubmit={(e) => handleSubmit(e, email, password)}>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[#42032C] mb-8 text-center"
              variants={itemVariants}
            >
              Login Admin
            </motion.h2>

            <motion.div variants={itemVariants}>
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan email Anda"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password Anda"
              />
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </motion.div>

            {error && (
              <motion.p className="text-red-500 text-center mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            )}

            <motion.p className="mt-4 text-center" variants={itemVariants}>
              <Link to="/forgot-password" className="text-[#42032C] hover:text-[#D36B00] font-semibold transition">
                Lupa Password?
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoginAdmin
