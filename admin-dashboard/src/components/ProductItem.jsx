import { toast } from "react-toastify";
import useDeleteProduct from "../hook/useDeleteProduct";
import ProductEdit from "./ProductEdit"; // Import ProductEdit
import { useState } from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Tidak menampilkan modal jika isOpen false

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Konfirmasi Penghapusan
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Apakah Anda yakin ingin menghapus product ini?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
            onClick={onCancel} // Tombol Batal
          >
            Batal
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={onConfirm} // Tombol Konfirmasi
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

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
);

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
);

const ProductItem = ({ products, loading, refetch }) => {
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct();
  const [productToEdit, setProductToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleEditClick = (product) => {
    setProductToEdit(product); // Menyimpan produk yang ingin diedit
  };

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProductId) return;
    try {
      await deleteProduct(selectedProductId);
      refetch();
    } catch (error) {
      toast.error("Gagal menghapus produk!");
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="mt-8 p-5 mx-auto">
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />
      {/* Menampilkan form edit jika isEditing true */}
      {productToEdit && (
        <ProductEdit
          setProductToEdit={setProductToEdit}
          product={productToEdit}
          refetch={refetch}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-500">Memuat produk...</p>
      ) : products.length > 0 && !productToEdit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {product.image && (
                <div className="relative aspect-video">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>
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
                      onClick={() => openDeleteModal(product.id)}
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
          <p className="text-sm text-gray-400 mt-1">
            Tambahkan produk pertama Anda.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
