"use client";

import { useState } from "react";
import useLogout from "../hook/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProductAdd from "./ProductAdd.jsx";
import ProductItem from "./ProductItem.jsx";

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
);

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
);

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
);

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
);

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
);

const Product = () => {
  const { authUser } = useAuthContext();

  const [add, setAdd] = useState(false);

  const { logout, loading } = useLogout();

  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <div className="w-64 bg-[#42032C] text-white min-h-screen p-4 hidden md:block">
        <div className="flex items-center justify-center mb-8 pt-4">
          <h1 className="text-xl font-bold">Menu Admin</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/testimoni"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
          >
            <TestimoniIcon />
            <span>Testimoni</span>
          </Link>
          <div className="bg-[#D36B00] rounded-lg p-2 flex items-center space-x-3">
            <ProductIcon />
            <span>Produk</span>
          </div>
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
            className="w flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
            disabled={loading}
          >
            <LogoutIcon />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden bg-white p-2 shadow-md">
        <div className="flex justify-between">
          <Link
            to="/testimoni"
            className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]"
          >
            <TestimoniIcon />
            <span className="text-xs mt-1">Testimoni</span>
          </Link>

          <Link
            to="/product"
            className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]"
          >
            <ProductIcon />
            <span className="text-xs mt-1">Produk</span>
          </Link>

          {authUser.role === "super-admin" && (
            <Link
              to="/account"
              className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]"
            >
              <AccountIcon />
              <span className="text-xs mt-1">Akun</span>
            </Link>
          )}
        </div>
      </div>
      {/* Add Product Form */}
      {add && <ProductAdd setAdd={setAdd} />}

      {/* Product List */}
      {!add && <ProductItem setAdd={setAdd} />}
    </div>
  );
};

export default Product;
