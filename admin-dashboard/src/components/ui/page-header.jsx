"use client"

import useLogout from "../../hook/useLogout"
import { useAuthContext } from "../../context/AuthContext"

export const PageHeader = ({ title, icon, actions }) => {
  const { authUser } = useAuthContext()
  const { logout, loading } = useLogout()

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  return (
    <header className="bg-[#42032C] text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {icon && <span className="text-[#D36B00]">{icon}</span>}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="bg-[#D36B00]/20 px-3 py-1 rounded-full">
              <span className="font-medium text-sm">{authUser.email || "admin@example.com"}</span>
            </div>
            {actions}
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </button>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
