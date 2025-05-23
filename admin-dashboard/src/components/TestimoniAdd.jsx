"use client"

import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import usePostTestimoni from "../hook/usePostTestimoni"
import { UploadIcon } from "../components/ui/icons"
import { Button } from "../components/ui/ui-components"

const TestimoniAdd = ({ onSuccess, refetch }) => {
  const [testimoniImage, setTestimoniImage] = useState(null)
  const fileInputRef = useRef(null)

  const { postTestimoni, loading, error } = usePostTestimoni()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setTestimoniImage({ file })
    }
  }

  const handleUpload = async () => {
    if (testimoniImage) {
      const result = await postTestimoni(testimoniImage.file)
      if (result) {
        toast.success("Testimoni berhasil diunggah!")
        setTestimoniImage(null)
        onSuccess()
        refetch()
      }
    } else {
      toast.warning("Silakan pilih gambar testimoni terlebih dahulu")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-center items-center mb-6 border-b pb-3">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Upload Testimoni
        </motion.h2>
      </div>
      <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="file"
              id="testimoni-upload"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <motion.label
              htmlFor="testimoni-upload"
              className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {testimoniImage ? testimoniImage.file.name : "Pilih Foto Testimoni"}
            </motion.label>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!testimoniImage || loading}
            variant={testimoniImage ? "primary" : "secondary"}
            icon={<UploadIcon />}
            className="w-full md:w-auto"
          >
            {loading ? "Mengunggah..." : "Upload Testimoni"}
          </Button>
        </div>

        {testimoniImage && (
          <motion.div
            className="mt-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-24 h-24 border rounded-md overflow-hidden">
              <motion.img
                src={URL.createObjectURL(testimoniImage.file)}
                alt="Preview"
                className="w-full h-full object-cover"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{testimoniImage.file.name}</p>
              <p>{(testimoniImage.file.size / 1024).toFixed(2)} KB</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="text-red-500 mt-4 p-3 bg-red-50 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default TestimoniAdd