"use client"

import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import usePostProduct from "../hook/usePostProduct"
import { ImageIcon } from "../components/ui/icons"
import { Button, Input, TextArea, ImageUpload } from "../components/ui/ui-components"

const ProductAdd = ({ refetch, onClose }) => {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productImage, setProductImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const { postProduct, loading } = usePostProduct()

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

  const handleAddProduct = async () => {
    // Validate all fields
    if (!productName.trim()) {
      toast.warning("Nama produk tidak boleh kosong!")
      return
    }
    if (!productDescription.trim()) {
      toast.warning("Deskripsi produk tidak boleh kosong!")
      return
    }
    if (!productImage) {
      toast.warning("Gambar produk wajib diunggah!")
      return
    }

    const formData = new FormData()
    formData.append("name", productName)
    formData.append("description", productDescription)
    formData.append("image", productImage)

    try {
      await postProduct(formData)
      resetForm()
      onClose()
      await refetch()
      toast.success("Menambahkan Produk Berhasil")
    } catch (error) {
      console.error("Failed to add product:", error)
      toast.error("Gagal menambahkan produk")
    }
  }

  return (
    <motion.div
      className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          className="flex justify-center mt-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Button
            onClick={handleAddProduct}
            disabled={loading}
            icon={<ImageIcon />}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {loading ? "Memproses..." : "Tambah Produk"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductAdd
