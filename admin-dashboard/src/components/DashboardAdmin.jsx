"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import useLogout from "../hook/useLogout"
import { useAuthContext } from "../context/AuthContext"

// Simple SVG icons as components
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const TestimoniIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const ProductIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7.5 4.27 9 5.15"></path>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
    <path d="m3.3 7 8.7 5 8.7-5"></path>
    <path d="M12 22V12"></path>
  </svg>
)

const AccountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
)

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

const DashboardAdmin = () => {
  const { authUser } = useAuthContext()
  const [content, setContent] = useState(
    `Ini adalah konten dashboard ${authUser.role}. Anda dapat mengedit konten ini sesuai kebutuhan. Gunakan tombol Edit untuk mengubah teks ini.`,
  )
  const [isEditing, setIsEditing] = useState(false)
  const { logout, loading } = useLogout()

  // Stats data
  const stats = [
    { title: "Total Produk", value: "24", icon: <ProductIcon />, color: "bg-blue-100" },
    { title: "Testimoni", value: "12", icon: <TestimoniIcon />, color: "bg-green-100" },
    { title: "Pengguna", value: "5", icon: <AccountIcon />, color: "bg-purple-100" },
  ]

  // Fungsi logout
  const handleLogout = async () => {
    await logout()
  }

  // Fungsi untuk mengubah konten
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  // Fungsi untuk toggle mode edit
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <div className="w-64 bg-[#42032C] text-white min-h-screen p-4 hidden md:block">
        <div className="flex items-center justify-center mb-8 pt-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2">
          <div className="bg-[#D36B00] rounded-lg p-2 flex items-center space-x-3">
            <HomeIcon />
            <span>Dashboard</span>
          </div>

          <Link
            to="/testimoni"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
          >
            <TestimoniIcon />
            <span>Testimoni</span>
          </Link>

          <Link
            to="/product"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
          >
            <ProductIcon />
            <span>Produk</span>
          </Link>

          {authUser.role === "super-admin" && (
            <Link
              to="/account"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
            >
              <AccountIcon />
              <span>Akun</span>
            </Link>
          )}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w flex items-center justif space-x-2 bg-red-400 hover:bg-red-50 text-white p-2 rounded-lg transition-colors"
            disabled={loading}
          >
            <LogoutIcon />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-[#42032C] text-white p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Dashboard {authUser.role}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="font-medium">{authUser.email || "admin@example.com"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
              disabled={loading}
            >
              <LogoutIcon />
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white p-2 shadow-md">
          <div className="flex justify-between">
            <Link to="/testimoni" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
              <TestimoniIcon />
              <span className="text-xs mt-1">Testimoni</span>
            </Link>

            <Link to="/product" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
              <ProductIcon />
              <span className="text-xs mt-1">Produk</span>
            </Link>

            {authUser.role === "super-admin" && (
              <Link to="/account" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
                <AccountIcon />
                <span className="text-xs mt-1">Akun</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#42032C] mb-4">Selamat Datang, {authUser.name || "Admin"}!</h2>
            <p className="text-gray-600">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-[#42032C]">{stat.value}</h3>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-full`}>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#42032C]">Konten Dashboard</h3>
              <button
                onClick={toggleEdit}
                className="flex items-center space-x-2 bg-[#D36B00] hover:bg-[#42032C] text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <EditIcon />
                <span>{isEditing ? "Simpan" : "Edit"}</span>
              </button>
            </div>

            <div className="mt-4">
              {isEditing ? (
                <textarea
                  value={content}
                  onChange={handleChangeContent}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none min-h-[150px]"
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin
