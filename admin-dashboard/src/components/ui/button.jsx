"use client"

import { useLogout } from "/hook/useLogout"

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  disabled = false,
  type = "button",
  fullWidth = false,
}) => {
  const variants = {
    primary: "bg-[#D36B00] hover:bg-[#42032C] text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline: "bg-transparent border border-[#D36B00] text-[#D36B00] hover:bg-[#D36B00] hover:text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  }

  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

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
        isMobile ? "px-3 py-1" : "p-2 w-full"
      } ${className}`}
      disabled={loading}
    >
      <LogoutIcon />
      {!isMobile && <span>{loading ? "Logging out..." : "Logout"}</span>}
    </button>
  )
}

export default Button
