"use client"

import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import Sidebar from "../components/ui/sidebar"
import PageHeader from "../components/ui/page-header"
import Card from "../components/ui/card"
import Button from "../components/ui/button"
import { ProductIcon, PlusIcon } from "../components/icons"
import ProductAdd from "./ProductAdd"
import ProductItem from "./ProductItem"

const Product = () => {
  const { authUser } = useAuthContext()
  const [showAddForm, setShowAddForm] = useState(false)
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
      <Sidebar activePage="product" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Manajemen Produk"
          icon={<ProductIcon />}
          actions={
            <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "Tutup Form" : "Tambah Produk"}
            </Button>
          }
        />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Add Product Form */}
            {showAddForm && (
              <Card title="Tambah Produk Baru" className="border border-[#D36B00]/20">
                <ProductAdd onClose={() => setShowAddForm(false)} />
              </Card>
            )}

            {/* Product List */}
            <Card title="Daftar Produk">
              <ProductItem onEdit={() => setShowAddForm(true)} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
