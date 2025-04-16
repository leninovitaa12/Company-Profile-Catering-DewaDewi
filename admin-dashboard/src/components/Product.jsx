"use client"

import { useState, useRef } from "react"
import useLogout from "../hook/useLogout" // Adjust path as needed

// Simple SVG icons as components
const EditIcon = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
)

const TrashIcon = () => (
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
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
)

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
)

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

const Product = () => {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productImage, setProductImage] = useState(null)
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)

  // Use the logout hook
  const { logout, isPending = false } = useLogout() || {}

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
  }

  const handleEditImageChange = (e) => {
    if (editingProduct && e.target.files[0]) {
      setEditingProduct({
        ...editingProduct,
        image: e.target.files[0],
      })
    }
  }

  const resetForm = () => {
    setProductName("")
    setProductDescription("")
    setProductImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddProduct = () => {
    if (!productName.trim()) {
      alert("Nama produk tidak boleh kosong!")
      return
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      description: productDescription,
      image: productImage,
      createdAt: new Date(),
    }

    setProducts([...products, newProduct])
    resetForm()
  }

  const handleEditClick = (product) => {
    setEditingProduct({ ...product })
    setIsEditing(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct.name.trim()) {
      alert("Nama produk tidak boleh kosong!")
      return
    }

    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)))
    setIsEditing(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditingProduct(null)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header with logout button */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Produk</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <span className="w-[18px] h-[18px]">
            <LogoutIcon />
          </span>
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Add Product Form */}
      <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Tambah Produk Baru</h3>
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

          <div>
            <button
              className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2"
              onClick={handleAddProduct}
            >
              Tambah Produk
            </button>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Produk</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="editProductName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Produk
                </label>
                <input
                  id="editProductName"
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                />
              </div>

              <div>
                <label htmlFor="editProductDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Produk
                </label>
                <textarea
                  id="editProductDescription"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2.5 w-full h-24 focus:ring-[#D36B00] focus:border-[#D36B00] outline-none resize-none"
                />
              </div>

              <div>
                <label htmlFor="editProductImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar Produk
                </label>
                <div className="flex items-center">
                  <input
                    id="editProductImage"
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleEditImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="editProductImage"
                    className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-[18px] h-[18px]">
                      <ImageIcon />
                    </span>
                    Ganti Gambar
                  </label>
                </div>
                {editingProduct.image && (
                  <div className="mt-2 flex items-center gap-4">
                    <div className="relative w-16 h-16 border rounded-md overflow-hidden">
                      <img
                        src={URL.createObjectURL(editingProduct.image) || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                  onClick={cancelEdit}
                >
                  Batal
                </button>
                <button
                  className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2 px-4 rounded-lg transition-colors"
                  onClick={handleUpdateProduct}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-5">Daftar Produk</h3>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {product.image && (
                  <div className="relative aspect-video">
                    <img
                      src={URL.createObjectURL(product.image) || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
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
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        title="Edit"
                      >
                        <span className="w-[18px] h-[18px] text-gray-700">
                          <EditIcon />
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        title="Hapus"
                      >
                        <span className="w-[18px] h-[18px] text-red-600">
                          <TrashIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500">Belum ada produk yang ditambahkan.</p>
            <p className="text-sm text-gray-400 mt-1">Tambahkan produk pertama Anda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
