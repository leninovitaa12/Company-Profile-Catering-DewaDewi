"use client"

import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import useDeleteTestimoni from "../hook/useDeleteTestimoni"
import useEditTestimoni from "../hook/useEditTestimoni"
import { CalendarIcon, TrashIcon, RefreshIcon } from "../components/ui/icons"
import { ConfirmDialog } from "../components/ui/ui-components"

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
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
    <div className="mt-8">
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceImageChange}
        className="hidden"
        accept="image/*"
      />

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D36B00]"></div>
        </div>
      ) : error ? (
        <motion.div
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>{error}</p>
          <button onClick={refetch} className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors">
            Coba lagi
          </button>
        </motion.div>
      ) : testimonis.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonis.map((image) => (
            <motion.div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={previewImage && editingTestimoniId === image.id ? previewImage : image.image}
                  alt="Testimoni"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                  <CalendarIcon />
                  {formatDate(image.createdAt)}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm"
                    onClick={() => handleReplace(image.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <RefreshIcon />
                    Ganti Foto
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md text-sm"
                    onClick={() => handleDelete(image.id)}
                    disabled={deleteLoading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <TrashIcon />
                    {deleteLoading ? "Menghapus..." : "Hapus"}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {selectedFile && editingTestimoniId === image.id && (
                    <motion.div
                      className="flex gap-2 mt-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <motion.button
                        onClick={handleSaveChanges}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Simpan Perubahan
                      </motion.button>
                      <motion.button
                        onClick={handleCancelChanges}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Batal
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-500">Belum ada foto testimoni yang diunggah.</p>
          <p className="text-sm text-gray-400 mt-1">Unggah foto testimoni pertama Anda.</p>
        </motion.div>
      )}

      <ConfirmDialog
        isOpen={isModalOpen}
        title="Konfirmasi Penghapusan"
        message="Apakah Anda yakin ingin menghapus testimoni ini?"
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />
    </div>
  )
}

export default TestimoniItem
