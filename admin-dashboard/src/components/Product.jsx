"use client"

import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { Sidebar, PageHeader, Card, Button } from "../components/ui/ui-components"
import { ProductIcon, PlusIcon } from "../components/ui/icons"
import ProductAdd from "./ProductAdd"
import ProductItem from "./ProductItem"
import useGetProductsAdmin from "../hook/useGetProducts"

const Product = () => {
  const { authUser } = useAuthContext()
  const { products, loading, refetch } = useGetProductsAdmin();
  const [showAddForm, setShowAddForm] = useState(false)

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
            <Button
              variant="primary"
              size="sm"
              icon={<PlusIcon />}
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#D36B00] hover:bg-[#42032C] text-white"
            >
              {showAddForm ? "Tutup Form" : "Tambah Produk"}
            </Button>
          }
        />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {showAddForm ? (
              /* Show only ProductAdd when showAddForm is true */
              <Card title="Tambah Produk Baru" className="border border-[#D36B00]/20">
                <ProductAdd refetch={refetch} onClose={() => setShowAddForm(false)} />
              </Card>
            ) : (
              /* Show ProductItem when showAddForm is false */
              <Card title="Daftar Produk">
                <ProductItem products={products} loading={loading} refetch={refetch} onEdit={() => setShowAddForm(true)} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
