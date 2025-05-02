import React, { useRef, useState } from "react"
import useDeleteTestimoni from "../hook/useDeleteTestimoni"
import useEditTestimoni from "../hook/useEditTestimoni"
import { toast } from "react-toastify"

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
)

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2v6h-6"></path>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
    <path d="M3 22v-6h6"></path>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
  </svg>
)

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Penghapusan</h3>
        <p className="text-sm text-gray-600 mb-4">Apakah Anda yakin ingin menghapus testimoni ini?</p>
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md" onClick={onCancel}>Batal</button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  )
}

const TestimoniItem = ({ testimonis, loading, error, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const replaceFileInputRef = useRef(null)
  const [testimoniIdToDelete, setTestimoniIdToDelete] = useState(null)

  const { deleteTestimoni, loading: deleteLoading } = useDeleteTestimoni()
  const { editTestimoni, loading: editLoading } = useEditTestimoni()

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [editingTestimoniId, setEditingTestimoniId] = useState(null)

  const handleReplaceImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleReplace = (id) => {
    replaceFileInputRef.current?.click()
    setEditingTestimoniId(id)
  }

  const handleSaveChanges = async () => {
    if (!selectedFile || !editingTestimoniId) return

    const formData = new FormData()
    formData.append("image", selectedFile)
    const result = await editTestimoni(editingTestimoniId, formData)
    if (result) {
      toast.success("Testimoni berhasil diperbarui!")
      refetch()
      setSelectedFile(null)
      setPreviewImage(null)
      setEditingTestimoniId(null)
    }
  }

  const handleCancelChanges = () => {
    setSelectedFile(null)
    setPreviewImage(null)
    setEditingTestimoniId(null)
  }

  const handleDelete = (id) => {
    setTestimoniIdToDelete(id)
    setIsModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false)
    setTestimoniIdToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (testimoniIdToDelete) {
      const result = await deleteTestimoni(testimoniIdToDelete)
      if (result) {
        toast.success("Testimoni berhasil dihapus!")
        refetch()
        closeDeleteModal()
      } else {
        toast.error("Gagal menghapus testimoni!")
      }
    }
  }

  return (
    <div className="mt-8">
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceImageChange}
        className="hidden"
        accept="image/*"
      />
      {loading ? (
        <p className="text-gray-500">Memuat testimoni...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : testimonis.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {testimonis.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={previewImage || image.image}
                  alt="Testimoni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                  <CalendarIcon />
                  {formatDate(image.createdAt)}
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm transition-colors"
                    onClick={() => handleReplace(image.id)}
                  >
                    <RefreshIcon />
                    Ganti Foto
                  </button>
                  <button
                    className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md text-sm transition-colors"
                    onClick={() => handleDelete(image.id)}
                    disabled={deleteLoading}
                  >
                    <TrashIcon />
                    {deleteLoading ? "Menghapus..." : "Hapus Testimoni"}
                  </button>
                </div>
                {selectedFile && editingTestimoniId === image.id && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                    >
                      Simpan Perubahan
                    </button>
                    <button
                      onClick={handleCancelChanges}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
          <p className="text-gray-500">Belum ada foto testimoni yang diunggah.</p>
          <p className="text-sm text-gray-400 mt-1">Unggah foto testimoni pertama Anda.</p>
        </div>
      )}
      {/* Modal Konfirmasi */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />
    </div>
  )
}

export default TestimoniItem
