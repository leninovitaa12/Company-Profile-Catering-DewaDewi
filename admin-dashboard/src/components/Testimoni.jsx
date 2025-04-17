"use client"
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hook/useLogout";
import { useAuthContext } from "../context/AuthContext";
import TestimoniAdd from "./TestimoniAdd";
import TestimoniItem from "./TestimoniItem";
import useGetTestimoni from "../hook/useGetTestimoni";

import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import Sidebar from "../components/ui/sidebar"
import PageHeader from "../components/ui/page-header"
import Card from "../components/ui/card"
import Button from "../components/ui/button"
import { TestimoniIcon, PlusIcon } from "../components/icons"
import TestimoniAdd from "./TestimoniAdd"
import TestimoniItem from "./TestimoniItem"

const Testimoni = () => {
  const { authUser } = useAuthContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const { logout, loading } = useLogout();

  const { testimonis, loadings, error, refetch } = useGetTestimoni();

  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <Sidebar activePage="testimoni" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Manajemen Testimoni"
          icon={<TestimoniIcon />}
          actions={
            <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "Tutup Form" : "Tambah Testimoni"}
            </Button>
          }
        />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Add Testimoni Form */}
            {showAddForm && (
              <Card title="Tambah Testimoni Baru" className="border border-[#D36B00]/20">
                <TestimoniAdd onSuccess={() => setShowAddForm(false)} />
              </Card>
            )}

            {/* Testimoni List */}
            <Card title="Daftar Testimoni">
              <TestimoniItem />
            </Card>
          </div>
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
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        {/* post */}
        <TestimoniAdd refetch={refetch} />
        {/* get */}
        <TestimoniItem
          testimonis={testimonis}
          loading={loadings}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  )
}

export default Testimoni
