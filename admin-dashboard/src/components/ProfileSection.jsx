"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import useProfile from "../hook/useProfile"
import { PageHeader, Sidebar, Button, ImageUpload } from "../components/ui/ui-components"
import { ProfilIcon } from "../components/ui/icons"

const ProfileSection = () => {
  const { profile, loading, error, saveProfile } = useProfile()
  const [nohp, setNohp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [about, setAbout] = useState("")

  const [image, setImage] = useState(null)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

  const [imagePreview, setImagePreview] = useState(null)
  const [imagePreview1, setImagePreview1] = useState(null)
  const [imagePreview2, setImagePreview2] = useState(null)
  const [imagePreview3, setImagePreview3] = useState(null)

  const fileInputRefs = {
    image: useRef(null),
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
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

  useEffect(() => {
    if (profile) {
      setNohp(profile.nohp || "")
      setAlamat(profile.alamat || "")
      setAbout(profile.about || "")
      setImagePreview(profile.image || null)
      setImagePreview1(profile.image1 || null)
      setImagePreview2(profile.image2 || null)
      setImagePreview3(profile.image3 || null)
    }
  }, [profile])

  const handleImageChange = (e, field) => {
    const file = e.target.files[0]
    if (!file) return

    if (field === "image") {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    } else if (field === "image1") {
      setImage1(file)
      setImagePreview1(URL.createObjectURL(file))
    } else if (field === "image2") {
      setImage2(file)
      setImagePreview2(URL.createObjectURL(file))
    } else if (field === "image3") {
      setImage3(file)
      setImagePreview3(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!nohp || !alamat || !about) {
      toast.warning("Semua field wajib diisi!")
      return
    }

    const formData = new FormData()
    formData.append("nohp", nohp)
    formData.append("alamat", alamat)
    formData.append("about", about)

    if (image) formData.append("image", image)
    if (image1) formData.append("image1", image1)
    if (image2) formData.append("image2", image2)
    if (image3) formData.append("image3", image3)

    try {
      await saveProfile(formData)
      toast.success("Profil berhasil disimpan")
    } catch {
      toast.error("Gagal menyimpan profil")
    }
  }

  return (
    <motion.div
      className="flex min-h-screen bg-[#F1EFDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar activePage="profil" />
      <div className="flex-1">
        <PageHeader title="Manajemen Profil" icon={<ProfilIcon />} />
        <motion.div
          className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="nohp" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor HP
            </label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <motion.span
                className="bg-gray-100 px-3 py-2.5 text-sm text-gray-700 flex items-center"
                whileHover={{ backgroundColor: "#f3f4f6" }}
              >
                +62
              </motion.span>
              <motion.input
                id="nohp"
                type="text"
                value={nohp}
                onChange={(e) => setNohp(e.target.value.replace(/^0+/, ""))}
                placeholder="81234567890"
                className="flex-1 p-2.5 text-sm outline-none"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <motion.textarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Masukkan alamat"
              className="border border-gray-300 rounded-lg p-2.5 w-full h-24 resize-none"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              Tentang Saya
            </label>
            <motion.textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Deskripsi singkat"
              className="border border-gray-300 rounded-lg p-2.5 w-full h-24 resize-none"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* Upload Gambar */}
          <motion.div variants={itemVariants}>
            <ImageUpload
              id="image"
              label="Gambar Profil"
              onChange={(e) => handleImageChange(e, "image")}
              preview={imagePreview}
              buttonText="Pilih Gambar Profil"
              fileInputRef={fileInputRefs.image}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageUpload
              id="image1"
              label="Gambar carrousel 1"
              onChange={(e) => handleImageChange(e, "image1")}
              preview={imagePreview1}
              buttonText="Pilih Gambar Carousel 1"
              fileInputRef={fileInputRefs.image1}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageUpload
              id="image2"
              label="Gambar carrousel 2"
              onChange={(e) => handleImageChange(e, "image2")}
              preview={imagePreview2}
              buttonText="Pilih Gambar Carousel 2"
              fileInputRef={fileInputRefs.image2}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageUpload
              id="image3"
              label="Gambar carrousel 3"
              onChange={(e) => handleImageChange(e, "image3")}
              preview={imagePreview3}
              buttonText="Pilih Gambar Carousel 3"
              fileInputRef={fileInputRefs.image3}
            />
          </motion.div>

          <motion.div className="flex justify-center w-full mt-6" variants={itemVariants}>
            <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto min-w-[200px]">
              {loading ? "Memproses..." : "Simpan Profil"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfileSection
