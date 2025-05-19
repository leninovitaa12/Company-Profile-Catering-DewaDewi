"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import useDeleteProduct from "../hook/useDeleteProduct"
import { EditIcon, TrashIcon } from "../components/ui/icons"
import { ConfirmDialog } from "../components/ui/ui-components"

const ProductItem = ({ products, loading, refetch, onEdit }) => {
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct()
  const [productToEdit, setProductToEdit] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const handleEditClick = (product) => {
    setProductToEdit(product)
    onEdit(product)
  }

  const openDeleteModal = (id) => {
    setSelectedProductId(id)
    setIsModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedProductId(null)
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedProductId) return
    try {
      await deleteProduct(selectedProductId)
      refetch()
      toast.success("Produk berhasil dihapus!")
    } catch (error) {
      toast.error("Gagal menghapus produk!")
    } finally {
      closeDeleteModal()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="mt-8 p-5 mx-auto">
      <ConfirmDialog
        isOpen={isModalOpen}
        title="Konfirmasi Penghapusan"
        message="Apakah Anda yakin ingin menghapus product ini?"
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D36B00]"></div>
        </div>
      ) : products.length > 0 && !productToEdit ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {product.image && (
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(product.createdAt).toLocaleDateString("id-ID")}
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditClick(product)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                      title="Edit"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="w-[18px] h-[18px] text-gray-700">
                        <EditIcon />
                      </span>
                    </motion.button>
                    <motion.button
                      onClick={() => openDeleteModal(product.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-md"
                      title="Hapus"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="w-[18px] h-[18px] text-red-600">
                        <TrashIcon />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </div>
  )
}

export default ProductItem
