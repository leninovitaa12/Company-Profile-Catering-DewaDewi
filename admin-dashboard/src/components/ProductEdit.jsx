"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import useUpdateProduct from "../hook/useUpdateProduct"
import { ImageIcon } from "../components/ui/icons"
import { Button, Input, TextArea, ImageUpload } from "../components/ui/ui-components"

const ProductEdit = ({ setProductToEdit, product, refetch }) => {
  const [productName, setProductName] = useState(product.name || "")
  const [productDescription, setProductDescription] = useState(product.description || "")
  const [productImage, setProductImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(product.image || null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const { updateProduct } = useUpdateProduct()

  useEffect(() => {
    if (product.image) {
      setImagePreview(product.image)
    }
  }, [product])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const resetForm = () => {
    setProductName("")
    setProductDescription("")
    setProductImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleEditProduct = async () => {
    if (!productName.trim()) {
      toast.warning("Nama produk tidak boleh kosong!")
      return
    }

    const updatedData = {
      name: productName,
      description: productDescription,
      image: productImage,
    }

    try {
      setLoading(true)
      await updateProduct(product.id, updatedData)
      resetForm()
      await refetch()
      toast.success("Produk berhasil diperbarui", {
        toastId: "edit-success",
      })
      setProductToEdit(null)
    } catch (error) {
      console.error("Gagal mengedit produk:", error)
      toast.error("Gagal mengedit produk", {
        toastId: "edit-error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex justify-center items-center mb-6 border-b pb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Edit Produk</h2>
      </motion.div>

      <motion.button
        className="text-white bg-[#D36B00] hover:bg-[#B25800] focus:outline-none focus:ring-2 focus:ring-[#D36B00] focus:ring-offset-2 rounded-lg px-6 py-3 mb-4 border border-transparent"
        onClick={() => setProductToEdit(null)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Kembali
      </motion.button>

      <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
        <div className="space-y-4">
          <Input
            id="productName"
            label="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Masukkan nama produk"
          />

          <TextArea
            id="productDescription"
            label="Deskripsi Produk"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Masukkan deskripsi produk"
            rows={4}
          />

          <ImageUpload
            id="productImage"
            label="Gambar Produk"
            onChange={handleImageChange}
            preview={imagePreview}
            buttonText={productImage ? productImage.name : "Pilih Gambar Produk"}
            fileInputRef={fileInputRef}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center w-full"
          >
            <Button
              onClick={handleEditProduct}
              disabled={loading}
              icon={<ImageIcon />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {loading ? "Memproses..." : "Simpan Perubahan"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductEdit
