"use client"

import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import useLogout from "../../hook/useLogout"

// Icons
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

export const Sidebar = ({ activePage }) => {
  const { authUser } = useAuthContext()
  const { logout, loading } = useLogout()

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  const MenuItem = ({ to, icon, label, isActive }) => {
    const Component = isActive ? "div" : Link
    return (
      <Component
        to={!isActive ? to : undefined}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-[#D36B00] text-white font-medium shadow-md"
            : "hover:bg-[#D36B00] hover:text-white hover:shadow-md text-white/90"
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span>{label}</span>
      </Component>
    )
  }

  // Separator component for sidebar sections
  const Separator = ({ label }) => {
    return (
      <div className="my-3">
        {label ? (
          <div className="flex items-center gap-2 px-2">
            <div className="h-px bg-white/20 flex-grow"></div>
            <span className="text-xs text-white/60 font-medium">{label}</span>
            <div className="h-px bg-white/20 flex-grow"></div>
          </div>
        ) : (
          <div className="h-px bg-white/20 mx-2"></div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 bg-[#42032C] text-white min-h-screen p-4 hidden md:flex flex-col">
        <div className="flex items-center justify-center mb-8 pt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">Menu Admin</h1>
            <div className="h-1 w-16 bg-[#D36B00] mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <MenuItem to="/" icon={<HomeIcon />} label="Dashboard" isActive={activePage === "dashboard"} />
          <MenuItem to="/testimoni" icon={<TestimoniIcon />} label="Testimoni" isActive={activePage === "testimoni"} />
          <MenuItem to="/product" icon={<ProductIcon />} label="Produk" isActive={activePage === "product"} />

          {authUser.role === "super-admin" && (
            <>
              <Separator label="Admin" />
              <MenuItem to="/account" icon={<AccountIcon />} label="Akun" isActive={activePage === "account"} />
            </>
          )}
        </nav>

        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            <LogoutIcon />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white p-2 shadow-md fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-between">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              activePage === "dashboard" ? "text-[#D36B00] font-bold" : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <HomeIcon />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>

          <Link
            to="/testimoni"
            className={`flex flex-col items-center p-2 ${
              activePage === "testimoni" ? "text-[#D36B00] font-bold" : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <TestimoniIcon />
            <span className="text-xs mt-1">Testimoni</span>
          </Link>

          <Link
            to="/product"
            className={`flex flex-col items-center p-2 ${
              activePage === "product" ? "text-[#D36B00] font-bold" : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <ProductIcon />
            <span className="text-xs mt-1">Produk</span>
          </Link>

          {authUser.role === "super-admin" && (
            <Link
              to="/account"
              className={`flex flex-col items-center p-2 ${
                activePage === "account" ? "text-[#D36B00] font-bold" : "text-gray-600 hover:text-[#D36B00]"
              }`}
            >
              <AccountIcon />
              <span className="text-xs mt-1">Akun</span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

// Export icons for use in other components
export { HomeIcon, TestimoniIcon, ProductIcon, AccountIcon, LogoutIcon }

export default Sidebar
