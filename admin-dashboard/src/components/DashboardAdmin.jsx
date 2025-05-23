"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useAuthContext } from "../context/AuthContext"
import { Sidebar, PageHeader, Card, ContentCard } from "../components/ui/ui-components"
import { HomeIcon, TestimoniIcon, ProductIcon, CalendarIcon, UserIcon, ShieldIcon } from "../components/ui/icons"
import useGetAdmins from "../hook/useGetAdmins"
import useGetProductsAdmin from "../hook/useGetProducts"
import useGetTestimoni from "../hook/useGetTestimoni"

// Custom hook to calculate time ago (e.g., "5 hours ago")
const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    if (!timestamp) return

    const calculateTimeAgo = () => {
      const diffInMilliseconds = new Date() - new Date(timestamp)
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      const diffInHours = Math.floor(diffInMinutes / 60)
      const diffInDays = Math.floor(diffInHours / 24)

      let timeString = ""
      if (diffInMinutes < 1) {
        timeString = `${diffInSeconds} detik yang lalu`
      } else if (diffInMinutes < 60) {
        timeString = `${diffInMinutes} menit yang lalu`
      } else if (diffInHours < 24) {
        timeString = `${diffInHours} jam yang lalu`
      } else {
        timeString = `${diffInDays} hari yang lalu`
      }

      setTimeAgo(timeString)
    }

    calculateTimeAgo()
    const interval = setInterval(calculateTimeAgo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [timestamp])

  return timeAgo
}

// Animated counter component
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const inView = useInView(countRef, { once: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = Number.parseInt(value)
      if (!end) return

      // Get animation duration based on value size
      const incrementTime = (duration * 1000) / end

      // Don't use intervals for small numbers
      if (end < 30) {
        const timer = setInterval(() => {
          start += 1
          setCount(start)
          if (start === end) clearInterval(timer)
        }, incrementTime)

        return () => clearInterval(timer)
      }

      // For larger numbers, use a smoother animation
      const timer = setTimeout(() => {
        setCount(end)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [inView, value, duration])

  return <span ref={countRef}>{count}</span>
}

// Date and time component
const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const formattedDate = dateTime.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = dateTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex flex-col">
      <motion.p
        className="text-gray-600"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3">
          <CalendarIcon className="w-5 h-5" />
          {formattedDate}
        </span>
      </motion.p>
      <motion.p
        className="text-gray-500 text-sm"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3">
          <span className="w-5 h-5 flex items-center justify-center">🕒</span>
          {formattedTime}
        </span>
      </motion.p>
    </div>
  )
}

// Quick action button component
const QuickActionButton = ({ icon, label, onClick, color = "bg-[#D36B00]" }) => {
  return (
    <motion.button
      className={`flex flex-col items-center justify-center p-4 ${color} text-white rounded-lg shadow-md hover:shadow-lg w-32 h-32`}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-center">{label}</span>
    </motion.button>
  )
}

const DashboardAdmin = () => {
  const { authUser } = useAuthContext()

  // Fetch data produk dan testimoni
  const { admins, loading: adminsLoading, error: adminsError, refetch } = useGetAdmins()
  const { products, loading: productsLoading, refetch: refetchProducts } = useGetProductsAdmin()
  const { testimonis, loadings: testimonisLoading, refetch: refetchTestimonis } = useGetTestimoni()

  // Get the latest product and latest testimonial
  const latestProduct = products?.[0] || {}
  const latestTestimoni = testimonis?.[0] || {}

  // Get the "time ago" for the latest product and testimonial
  const latestProductTime = useTimeAgo(latestProduct.createdAt)
  const latestTestimoniTime = useTimeAgo(latestTestimoni.createdAt)

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

  const stats = [
    {
      title: "Total Produk",
      value: productsLoading ? "..." : products?.length || "0",
      icon: <ProductIcon />,
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Testimoni",
      value: testimonisLoading ? "..." : testimonis?.length || "0",
      icon: <TestimoniIcon />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Admin",
      value: adminsLoading ? "..." : (admins?.filter((admin) => admin.role === "admin").length ?? "0"),
      icon: <UserIcon />,
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "Super Admin",
      value: adminsLoading ? "..." : (admins?.filter((admin) => admin.role === "super-admin").length ?? "0"),
      icon: <ShieldIcon />,
      color: "bg-amber-100",
      textColor: "text-amber-700",
    },
  ]

  // Recent activities with more details
  const activities = [
    {
      action: "Produk baru ditambahkan",
      time: latestProductTime,
      icon: <ProductIcon />,
      details: latestProduct.name ? `"${latestProduct.name}"` : "",
      color: "text-blue-600",
    },
    {
      action: "Testimoni baru diterima",
      time: latestTestimoniTime,
      icon: <TestimoniIcon />,
      details: "Dari pelanggan",
      color: "text-green-600",
    },
    {
      action: "Login terakhir",
      time: "Hari ini",
      icon: <UserIcon />,
      details: authUser?.email || "admin@example.com",
      color: "text-purple-600",
    },
  ]

  // Quick actions
  const quickActions = [
    { icon: "📦", label: "Tambah Produk", color: "bg-[#D36B00]", path: "/product" },
    { icon: "📸", label: "Tambah Testimoni", color: "bg-[#42032C]", path: "/testimoni" },
    { icon: "👤", label: "Edit Profil", color: "bg-[#D36B00]", path: "/profil" },
  ]

  return (
    <motion.div
      className="flex min-h-screen bg-[#F1EFDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader title="Dashboard Admin" icon={<HomeIcon />} actions={null} />

        <motion.div className="flex-1 p-4 md:p-6" variants={containerVariants} initial="hidden" animate="visible">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Welcome Card */}
            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <motion.h2
                      className="text-2xl font-bold text-[#42032C]"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="inline-block"
                      >
                        👋
                      </motion.span>{" "}
                      Selamat Datang, {authUser.name || "Admin"}!
                    </motion.h2>
                    <DateTimeDisplay />
                  </div>

                  <motion.div
                    className="flex items-center gap-2 bg-[#42032C]/10 px-4 py-2 rounded-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-[#42032C]">
                      Status: <span className="text-green-600">Online</span>
                    </span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Card className="border border-gray-100 h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <h3 className={`text-3xl font-bold ${stat.textColor}`}>
                          {!isNaN(stat.value) && stat.value !== "..." ? (
                            <AnimatedCounter value={stat.value} />
                          ) : (
                            stat.value
                          )}
                        </h3>
                      </div>
                      <motion.div
                        className={`p-3 ${stat.color} rounded-full`}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <ContentCard title="Aksi Cepat">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <QuickActionButton
                        icon={action.icon}
                        label={action.label}
                        color={action.color}
                        onClick={() => (window.location.href = action.path)}
                      />
                    </motion.div>
                  ))}
                </div>
              </ContentCard>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Dashboard Content */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <ContentCard title="Informasi Dashboard">
                  <motion.div
                    className="bg-gradient-to-br from-[#42032C]/5 to-[#D36B00]/5 p-5 rounded-lg border border-gray-200"
                    whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className="text-lg font-semibold mb-3 text-[#42032C]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Ringkasan Sistem
                    </motion.h3>

                    <motion.p
                      className="text-gray-700 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Selamat datang di dashboard admin. Dari sini Anda dapat mengelola produk, testimoni, dan melihat
                      statistik penting tentang bisnis Anda.
                    </motion.p>

                    <motion.div
                      className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-[#D36B00] mb-1">Produk Terbaru</h4>
                        <p className="text-sm text-gray-600 truncate">{latestProduct.name || "Belum ada produk"}</p>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-[#D36B00] mb-1">Status Sistem</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                          Semua sistem berjalan normal
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </ContentCard>
              </motion.div>

              {/* Recent Activities */}
              <motion.div variants={itemVariants}>
                <ContentCard title="Aktivitas Terbaru">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm min-h-[80px]"
                          initial={{ opacity: 0, y: 10, x: 10 }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(211, 107, 0, 0.05)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div
                            className={`p-2 bg-white rounded-full shadow-sm ${activity.color} flex items-center justify-center w-10 h-10`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex flex-col justify-center flex-1 min-h-[60px]">
                            <p className="text-gray-800 font-medium leading-tight">{activity.action}</p>
                            {activity.details && (
                              <p className="text-gray-600 text-sm leading-snug">{activity.details}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">{activity.time || "Baru saja"}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ContentCard>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardAdmin
