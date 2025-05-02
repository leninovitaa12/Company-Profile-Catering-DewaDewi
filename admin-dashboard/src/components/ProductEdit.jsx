import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import useUpdateProduct from "../hook/useUpdateProduct"; // Menggunakan hook untuk update produk

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
);

const ProductEdit = ({ setProductToEdit, product, refetch }) => {
  const [productName, setProductName] = useState(product.name || "");
  const [productDescription, setProductDescription] = useState(
    product.description || ""
  );
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { updateProduct } = useUpdateProduct(); // Menggunakan hook untuk update produk

  useEffect(() => {
    if (product.image) {
      setProductImage(product.image); // Set image jika ada gambar yang sudah ter-upload
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditProduct = async () => {
    if (!productName.trim()) {
      alert("Nama produk tidak boleh kosong!");
      return;
    }

    const updatedData = {
      name: productName,
      description: productDescription,
      image: productImage,
    };

    try {
      setLoading(true);
      await updateProduct(product.id, updatedData);
      resetForm();
      await refetch();
      toast.success("Produk berhasil diperbarui");
      setProductToEdit();
    } catch (error) {
      console.error("Gagal mengedit produk:", error);
      toast.error("Gagal mengedit produk");
    } finally {
      setLoading(false);
    }
  };

  const renderImagePreview = () => {
    if (productImage) {
      // Jika productImage adalah file (diupload oleh user)
      if (productImage instanceof File) {
        return (
          <div className="mt-2 flex items-center gap-4">
            <div className="relative w-16 h-16 border rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(productImage)} // Membuat URL objek untuk file yang di-upload
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>{(productImage.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        );
      }
    } else if (product.image) {
      // Jika productImage kosong, tampilkan gambar yang sudah ada dari produk
      return (
        <div className="mt-2 flex items-center gap-4">
          <div className="relative w-16 h-16 border rounded-md overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"} // Gambar produk yang sudah ada
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-gray-600">
            <p>{(product.image.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-3xl font-bold text-gray-800">Edit Produk</h2>
        </div>

        <button
          className="text-black bg-white rounded-lg px-4 py-2 mb-4 border"
          onClick={() => setProductToEdit(null)} // Menutup form edit atau mengembalikan ke daftar produk
        >
          Kembali
        </button>

        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Edit Produk</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              {renderImagePreview()}
            </div>

            <div>
              <button
                className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2"
                onClick={handleEditProduct}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
