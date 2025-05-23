"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthContext } from "../context/AuthContext"
import { Sidebar, PageHeader, Card, Button } from "../components/ui/ui-components"
import { ProductIcon, PlusIcon } from "../components/ui/icons"
import ProductAdd from "../components/ProductAdd"
import ProductItem from "../components/ProductItem"
import ProductEdit from "../components/ProductEdit"
import useGetProductsAdmin from "../hook/useGetProducts"

const Product = () => {
  const { authUser } = useAuthContext()
  const { products, loading, refetch } = useGetProductsAdmin()
  const [showAddForm, setShowAddForm] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  }

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const handleEdit = (product) => {
    setProductToEdit(product)
    setShowAddForm(false)
  }

  return (
    <motion.div
      className="flex min-h-screen bg-[#F1EFDC]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
              onClick={() => {
                setShowAddForm(!showAddForm)
                setProductToEdit(null)
              }}
              className="bg-[#D36B00] hover:bg-[#42032C] text-white"
            >
              {showAddForm ? "Tutup Form" : "Tambah Produk"}
            </Button>
          }
        />

        <motion.div className="flex-1 p-4 md:p-6" variants={itemVariants}>
          <div className="max-w-6xl mx-auto space-y-6">
            <AnimatePresence mode="wait">
              {showAddForm && (
                <motion.div
                  key="add-form"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Tambah Produk Baru" className="border border-[#D36B00]/20">
                    <ProductAdd refetch={refetch} onClose={() => setShowAddForm(false)} />
                  </Card>
                </motion.div>
              )}

              {productToEdit && (
                <motion.div
                  key="edit-form"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductEdit setProductToEdit={setProductToEdit} product={productToEdit} refetch={refetch} />
                </motion.div>
              )}

              {!showAddForm && !productToEdit && (
                <motion.div
                  key="product-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Daftar Produk">
                    <ProductItem products={products} loading={loading} refetch={refetch} onEdit={handleEdit} />
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Product
