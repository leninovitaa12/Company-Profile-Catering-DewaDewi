"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import useResetPassword from "../hook/useResetPassword"
import usePinReset from "../hook/usePinReset"
import { Input, Button } from "../components/ui/ui-components"

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    pin: "",
    password: "",
    confirmPassword: "",
  })
  const { loadings, getPin, onPin } = usePinReset()
  const { loading, resetPassword } = useResetPassword()

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

  const handleSubmitGetPin = async (e) => {
    e.preventDefault()
    await getPin(inputs)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword(inputs)
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#F1EFDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white flex-col md:flex-row rounded-xl shadow-2xl flex overflow-hidden max-w-4xl w-full m-4"
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
            className="text-xl md:text-5xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Lupa Password?
          </motion.h1>
          <motion.p
            className="md:text-lg text-center md:text-justify"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Masukkan email Anda untuk mendapatkan permintaan reset password.
          </motion.p>
        </motion.div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-10">
          <AnimatePresence mode="wait">
            {!onPin ? (
              <motion.form
                className="w-full"
                onSubmit={handleSubmitGetPin}
                key="get-pin"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center" variants={itemVariants}>
                  Reset Password
                </motion.h2>

                <motion.div variants={itemVariants}>
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    required
                    placeholder="Masukkan email Anda"
                  />
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" fullWidth disabled={loadings}>
                    {loadings ? "Memproses..." : "Kirim Permintaan"}
                  </Button>
                </motion.div>

                <motion.p className="mt-4 text-center" variants={itemVariants}>
                  <Link to={"/login"} className="text-[#42032C] hover:text-[#D36B00] font-semibold transition">
                    Kembali ke Login
                  </Link>
                </motion.p>
              </motion.form>
            ) : (
              <motion.form
                className="w-full"
                onSubmit={handleSubmit}
                key="reset-password"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.h2 className="text-3xl font-bold text-[#42032C] mb-8 text-center" variants={itemVariants}>
                  Reset Password
                </motion.h2>

                <motion.p className="font-bold text-[#42032C] mb-8 text-center" variants={itemVariants}>
                  Masukkan Pin dan Password
                </motion.p>

                <motion.div variants={itemVariants}>
                  <Input
                    id="pin"
                    label="Pin"
                    type="text"
                    value={inputs.pin}
                    onChange={(e) => setInputs({ ...inputs, pin: e.target.value })}
                    required
                    placeholder="Masukkan Pin Anda"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    required
                    placeholder="Masukkan password Anda"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Input
                    id="confirmPassword"
                    label="Password Confirmation"
                    type="password"
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                    required
                    placeholder="Konfirmasi password Anda"
                  />
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" fullWidth disabled={loading}>
                    {loading ? "Memproses..." : "Kirim"}
                  </Button>
                </motion.div>

                <motion.p className="mt-4 text-center" variants={itemVariants}>
                  <Link to={"/login"} className="text-[#42032C] hover:text-[#D36B00] font-semibold transition">
                    Kembali ke Login
                  </Link>
                </motion.p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ForgotPassword
