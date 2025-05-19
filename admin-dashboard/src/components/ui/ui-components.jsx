"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import useLogout from "../../hook/useLogout"
import { motion, AnimatePresence } from "framer-motion"
import {
  HomeIcon,
  TestimoniIcon,
  ProductIcon,
  AccountIcon,
  LogoutIcon,
  ProfilIcon,
  SettingProfileIcon,
  ImageIcon,
} from "./icons"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
}

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
}

// Button Component
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
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}

// LogoutButton Component
export const LogoutButton = ({ className = "", isMobile = false }) => {
  const { logout, loading } = useLogout() || {}
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    if (logout) {
      logout()
    }
    setIsModalOpen(false)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <motion.button
        onClick={handleLogoutClick}
        className={`flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white rounded-lg ${
          isMobile ? "px-3 py-1" : "p-2 w-full"
        } ${className}`}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoutIcon />
        {!isMobile && <span>{loading ? "Logging out..." : "Logout"}</span>}
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-center">Are you sure you want to logout?</h3>
              <div className="mt-4 flex justify-center gap-4">
                <Button onClick={handleLogoutConfirm} variant="danger">
                  Yes
                </Button>
                <Button onClick={handleModalClose} variant="secondary">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Card Component
export const Card = ({ title, children, className = "", actions, icon, variant = "default" }) => {
  const variants = {
    default: "",
    stat: "hover:shadow-lg transition-shadow",
    content: "p-6",
  }

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${variants[variant]} ${className}`}
      variants={scaleUp}
      initial="hidden"
      animate="visible"
    >
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[#D36B00]">{icon}</span>}
            <h3 className="text-lg font-semibold text-[#42032C]">{title}</h3>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={variant === "content" ? "p-0" : "p-4"}>{children}</div>
    </motion.div>
  )
}

// StatCard Component
export const StatCard = ({ title, value, icon, color = "bg-blue-100" }) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card variant="stat">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-3xl font-bold text-[#42032C]">{value}</h3>
          </div>
          <motion.div
            className={`p-3 ${color} rounded-full`}
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

// ContentCard Component
export const ContentCard = ({ title, children, className = "" }) => {
  return (
    <Card variant="content" className={className}>
      <h3 className="text-xl font-semibold text-[#42032C] mb-4">{title}</h3>
      {children}
    </Card>
  )
}

// PageHeader Component
export const PageHeader = ({ title, icon, actions }) => {
  const { authUser } = useAuthContext()
  const { logout, loading } = useLogout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    if (logout) {
      logout()
    }
    setIsModalOpen(false)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <motion.header
      className="bg-[#42032C] text-white p-4 shadow-md sticky top-0 z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div className="flex items-center space-x-3" variants={slideIn} initial="hidden" animate="visible">
          {icon && <span className="text-[#D36B00]">{icon}</span>}
          <h1 className="text-2xl font-bold">{title}</h1>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.div
            className="hidden md:flex items-center space-x-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-[#D36B00]/20 px-3 py-1 rounded-full">
              <span className="font-medium text-sm">{authUser?.email || "admin@example.com"}</span>
            </div>
            {actions}
          </motion.div>
          <Link
            to={"/setting"}
            className="md:hidden flex items-center justify-center bg-white/20 text-white p-2 rounded-lg transition-colors"
          >
            <SettingProfileIcon />
          </Link>
          <motion.button
            onClick={handleLogoutClick}
            className="md:hidden flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
            disabled={loading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LogoutIcon />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <p className="text-lg text-black font-semibold text-center">Are you sure you want to logout?</p>
              <div className="mt-4 flex justify-center gap-4">
                <Button onClick={handleLogoutConfirm} variant="danger">
                  Yes
                </Button>
                <Button onClick={handleModalClose} variant="secondary">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// SidebarSeparator Component
export const SidebarSeparator = ({ label }) => {
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

// SidebarMenuItem Component
export const SidebarMenuItem = ({ icon, label, to, isActive, onClick }) => {
  const Component = to ? Link : "div"

  return (
    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <Component
        to={to}
        onClick={onClick}
        className={`flex items-center space-x-3 p-2 rounded-lg ${
          isActive ? "bg-[#D36B00] cursor-default" : "hover:bg-[#D36B00] transition-colors"
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span>{label}</span>
      </Component>
    </motion.div>
  )
}

// Sidebar Component
export const Sidebar = ({ activePage }) => {
  const { authUser } = useAuthContext()
  const { logout, loading } = useLogout()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    if (logout) {
      logout()
    }
    setIsModalOpen(false)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Menu Item Component
  const MenuItem = ({ to, icon, label, isActive }) => {
    const Component = isActive ? "div" : Link
    return (
      <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
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
      </motion.div>
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
      <motion.div
        className="w-64 bg-[#42032C] text-white min-h-screen p-4 hidden md:flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex items-center justify-center mb-8 pt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="text-center">
            <h1 className="text-xl font-bold">Menu Admin</h1>
            <motion.div
              className="h-1 w-16 bg-[#D36B00] mx-auto mt-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.4, duration: 0.3 }}
            />
          </div>
        </motion.div>

        <nav className="space-y-2 flex-1">
          <MenuItem to="/" icon={<HomeIcon />} label="Dashboard" isActive={activePage === "dashboard"} />
          <MenuItem to="/profil" icon={<ProfilIcon />} label="Profil" isActive={activePage === "profil"} />
          <MenuItem to="/testimoni" icon={<TestimoniIcon />} label="Testimoni" isActive={activePage === "testimoni"} />
          <MenuItem to="/product" icon={<ProductIcon />} label="Produk" isActive={activePage === "product"} />
          <MenuItem to="/setting" icon={<SettingProfileIcon />} label="Setting" isActive={activePage === "setting"} />

          {authUser?.role === "super-admin" && (
            <>
              <Separator label="Admin" />
              <MenuItem to="/account" icon={<AccountIcon />} label="Akun" isActive={activePage === "account"} />
            </>
          )}
        </nav>

        <motion.div
          className="mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button onClick={handleLogoutClick} variant="danger" fullWidth icon={<LogoutIcon />} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </motion.div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden bg-white p-2 shadow-md fixed bottom-0 left-0 right-0 z-10"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
            to="/profil"
            className={`flex flex-col items-center p-2 ${
              activePage === "profil" ? "text-[#D36B00] font-bold" : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <ProfilIcon />
            <span className="text-xs mt-1">Profil</span>
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

          {authUser?.role === "super-admin" && (
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
      </motion.div>

      {/* Modal Konfirmasi Logout */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg text-black font-semibold text-center">Are you sure you want to logout?</h3>
              <div className="mt-4 flex justify-center gap-4">
                <Button onClick={handleLogoutConfirm} variant="danger">
                  Yes
                </Button>
                <Button onClick={handleModalClose} variant="secondary">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Helper function to format date
export const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="bg-[#42032C] text-white p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
            {footer && <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Input Component
export const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <motion.input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00] focus:ring-1 focus:ring-[#D36B00] transition-all duration-200 ${className} ${error ? "border-red-500" : ""}`}
        whileFocus={{ scale: 1.01 }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

// TextArea Component
export const TextArea = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  rows = 4,
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <motion.textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 border border-[#E6D2AA] rounded-lg bg-[#F1EFDC] text-[#42032C] focus:outline-none focus:border-[#D36B00] focus:ring-1 focus:ring-[#D36B00] transition-all duration-200 resize-none ${className} ${error ? "border-red-500" : ""}`}
        whileFocus={{ scale: 1.01 }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

// ImageUpload Component
export const ImageUpload = ({ label, id, onChange, preview, buttonText, className = "", fileInputRef }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input id={id} type="file" ref={fileInputRef} onChange={onChange} className="hidden" accept="image/*" />
        <motion.label
          htmlFor={id}
          className={`flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 ${className}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ImageIcon />
          {buttonText}
        </motion.label>
      </div>
      {preview && (
        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
        </motion.div>
      )}
    </div>
  )
}

// ConfirmDialog Component
export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{message}</p>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={onCancel}>
                Batal
              </Button>
              <Button variant="danger" onClick={onConfirm}>
                Hapus
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
