"use client"

import { useState, useRef } from "react"
import { toast } from "react-toastify"
import usePostProduct from "../hook/usePostProduct" // Importing the hook

const ImageIcon = () => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
)

const ProductAdd = ({ onClose }) => {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productImage, setProductImage] = useState(null)
  const fileInputRef = useRef(null)
  const { postProduct, loading } = usePostProduct() // Using the custom hook for postProduct and loading

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
  }

  const resetForm = () => {
    setProductName("")
    setProductDescription("")
    setProductImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddProduct = async () => {
    if (!productName.trim()) {
      alert("Nama produk tidak boleh kosong!")
      return
    }

    const formData = new FormData()
    formData.append("name", productName)
    formData.append("description", productDescription)
    if (productImage) {
      formData.append("image", productImage)
    }

    try {
      await postProduct(formData)
      resetForm()
      onClose() // Use onClose instead of setAdd
      toast.success("Menambahkan Produk Berhasil")
    } catch (error) {
      console.error("Failed to add product:", error)
    }
  }

  return (
    <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Masukkan nama produk"
            className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
          />
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Produk
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Masukkan deskripsi produk"
            className="border border-gray-300 rounded-lg p-2.5 w-full h-24 focus:ring-[#D36B00] focus:border-[#D36B00] outline-none resize-none"
          />
        </div>

        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Produk
          </label>
          <div className="flex items-center">
            <input
              id="productImage"
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="productImage"
              className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-[18px] h-[18px]">
                <ImageIcon />
              </span>
              {productImage ? productImage.name : "Pilih Gambar Produk"}
            </label>
          </div>
          {productImage && (
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-16 h-16 border rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(productImage) || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>{(productImage.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2"
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Tambah Produk"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductAdd
