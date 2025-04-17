"use client"

import { useLogout } from "../../hook/useLogout"

export const LogoutButton = ({ className = "", isMobile = false }) => {
  const { logout, loading } = useLogout() || {}

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  const LogoutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={isMobile ? "18" : "24"}
      height={isMobile ? "18" : "24"}
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

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors ${
        isMobile ? "px-3 py-1" : "p-2 w"
      } ${className}`}
      disabled={loading}
    >
      <LogoutIcon />
      {!isMobile && <span>{loading ? "Logging out..." : "Logout"}</span>}
    </button>
  )
}

export default LogoutButton
