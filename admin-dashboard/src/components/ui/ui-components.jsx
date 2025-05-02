"use client";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hook/useLogout";
import {
  HomeIcon,
  TestimoniIcon,
  ProductIcon,
  AccountIcon,
  LogoutIcon,
  ProfilIcon,
} from "./icons";
import { useState } from "react";

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
    outline:
      "bg-transparent border border-[#D36B00] text-[#D36B00] hover:bg-[#D36B00] hover:text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg",
  };

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
  );
};

// LogoutButton Component
export const LogoutButton = ({ className = "", isMobile = false }) => {
  const { logout, loading } = useLogout() || {};
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal konfirmasi

  // Fungsi untuk menangani klik logout, membuka modal konfirmasi
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menangani konfirmasi logout (ya)
  const handleLogoutConfirm = () => {
    if (logout) {
      logout(); // Melakukan logout
    }
    setIsModalOpen(false); // Menutup modal setelah logout
  };

  // Fungsi untuk menutup modal jika cancel
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleLogoutClick} // Menampilkan modal ketika tombol logout diklik
        className={`flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors ${
          isMobile ? "px-3 py-1" : "p-2 w-full"
        } ${className}`}
        disabled={loading}
      >
        <LogoutIcon />
        {!isMobile && <span>{loading ? "Logging out..." : "Logout"}</span>}
      </button>

      {/* Modal Konfirmasi Logout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-center">
              Are you sure you want to logout?
            </h3>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm} // Mengonfirmasi logout
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleModalClose} // Menutup modal tanpa logout
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Card Component
export const Card = ({
  title,
  children,
  className = "",
  actions,
  icon,
  variant = "default",
}) => {
  const variants = {
    default: "",
    stat: "hover:shadow-lg transition-shadow",
    content: "p-6",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${variants[variant]} ${className}`}
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
    </div>
  );
};

// StatCard Component
export const StatCard = ({ title, value, icon, color = "bg-blue-100" }) => {
  return (
    <Card variant="stat">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-[#42032C]">{value}</h3>
        </div>
        <div className={`p-3 ${color} rounded-full`}>{icon}</div>
      </div>
    </Card>
  );
};

// ContentCard Component
export const ContentCard = ({ title, children, className = "" }) => {
  return (
    <Card variant="content" className={className}>
      <h3 className="text-xl font-semibold text-[#42032C] mb-4">{title}</h3>
      {children}
    </Card>
  );
};

// PageHeader Component
export const PageHeader = ({ title, icon, actions }) => {
  const { authUser } = useAuthContext();
  const { logout, loading } = useLogout();

  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal konfirmasi

  // Fungsi untuk membuka modal konfirmasi
  const handleLogoutClick = () => {
    setIsModalOpen(true); // Menampilkan modal
  };

  // Fungsi untuk menangani logout setelah konfirmasi (Yes)
  const handleLogoutConfirm = () => {
    if (logout) {
      logout(); // Logout jika Yes
    }
    setIsModalOpen(false); // Tutup modal
  };

  // Fungsi untuk menutup modal tanpa logout (Cancel)
  const handleModalClose = () => {
    setIsModalOpen(false); // Tutup modal jika Cancel
  };

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
              <span className="font-medium text-sm">
                {authUser?.email || "admin@example.com"}
              </span>
            </div>
            {actions}
          </div>
          <button
            onClick={handleLogoutClick} // Menampilkan modal saat tombol logout diklik
            className="md:hidden flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
            disabled={loading}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg text-black font-semibold text-center">
              Are you sure you want to logout?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm} // Konfirmasi logout
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleModalClose} // Menutup modal tanpa logout
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

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
  );
};

// SidebarMenuItem Component
export const SidebarMenuItem = ({ icon, label, to, isActive, onClick }) => {
  const Component = to ? Link : "div";

  return (
    <Component
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
        isActive
          ? "bg-[#D36B00] cursor-default"
          : "hover:bg-[#D36B00] transition-colors"
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </Component>
  );
};

// Sidebar Component
export const Sidebar = ({ activePage }) => {
  const { authUser } = useAuthContext();
  const { logout, loading } = useLogout();

  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal konfirmasi logout

  // Fungsi untuk membuka modal konfirmasi
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menangani logout setelah konfirmasi (Yes)
  const handleLogoutConfirm = () => {
    if (logout) {
      logout();
    }
    setIsModalOpen(false);
  };

  // Fungsi untuk menutup modal tanpa logout (Cancel)
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Menu Item Component
  const MenuItem = ({ to, icon, label, isActive }) => {
    const Component = isActive ? "div" : Link;
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
    );
  };

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
    );
  };

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
          <MenuItem
            to="/"
            icon={<HomeIcon />}
            label="Dashboard"
            isActive={activePage === "dashboard"}
          />
          <MenuItem
            to="/profil"
            icon={<ProfilIcon />}
            label="Profil"
            isActive={activePage === "profil"}
          />
          <MenuItem
            to="/testimoni"
            icon={<TestimoniIcon />}
            label="Testimoni"
            isActive={activePage === "testimoni"}
          />
          <MenuItem
            to="/product"
            icon={<ProductIcon />}
            label="Produk"
            isActive={activePage === "product"}
          />

          {authUser?.role === "super-admin" && (
            <>
              <Separator label="Admin" />
              <MenuItem
                to="/account"
                icon={<AccountIcon />}
                label="Akun"
                isActive={activePage === "account"}
              />
            </>
          )}
        </nav>

        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={handleLogoutClick} // Menampilkan modal konfirmasi
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
              activePage === "dashboard"
                ? "text-[#D36B00] font-bold"
                : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <HomeIcon />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>

          <Link
            to="/profil"
            className={`flex flex-col items-center p-2 ${
              activePage === "profil"
                ? "text-[#D36B00] font-bold"
                : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <ProfilIcon />
            <span className="text-xs mt-1">Profil</span>
          </Link>

          <Link
            to="/testimoni"
            className={`flex flex-col items-center p-2 ${
              activePage === "testimoni"
                ? "text-[#D36B00] font-bold"
                : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <TestimoniIcon />
            <span className="text-xs mt-1">Testimoni</span>
          </Link>

          <Link
            to="/product"
            className={`flex flex-col items-center p-2 ${
              activePage === "product"
                ? "text-[#D36B00] font-bold"
                : "text-gray-600 hover:text-[#D36B00]"
            }`}
          >
            <ProductIcon />
            <span className="text-xs mt-1">Produk</span>
          </Link>

          {authUser?.role === "super-admin" && (
            <Link
              to="/account"
              className={`flex flex-col items-center p-2 ${
                activePage === "account"
                  ? "text-[#D36B00] font-bold"
                  : "text-gray-600 hover:text-[#D36B00]"
              }`}
            >
              <AccountIcon />
              <span className="text-xs mt-1">Akun</span>
            </Link>
          )}
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg text-black font-semibold text-center">
              Are you sure you want to logout?
            </h3>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm} // Konfirmasi logout
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleModalClose} // Menutup modal tanpa logout
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to format date
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
