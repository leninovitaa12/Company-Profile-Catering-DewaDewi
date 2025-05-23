"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthContext } from "../context/AuthContext"
import {
  Sidebar,
  PageHeader,
  Card,
  StatCard,
  Button,
  Modal,
  Input,
  ConfirmDialog,
} from "../components/ui/ui-components"
import { AccountIcon, PlusIcon, ShieldIcon, UserIcon } from "../components/ui/icons"
import toast from "react-hot-toast"

// Import hooks untuk koneksi database
import useGetAdmins from "../hook/useGetAdmins"
import useCreateAdmin from "../hook/useCreateAdmin"
import useUpdateAdmin from "../hook/useUpdateAdmin"
import useDeleteAdmin from "../hook/useDeleteAdmin"

const SuperAdminDashboard = () => {
  const { authUser } = useAuthContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("admin")
  const [oldPassword, setOldPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAdminId, setSelectedAdminId] = useState(null)

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

  // Menggunakan hooks untuk koneksi database
  const { admins, loading: adminsLoading, error: adminsError, refetch } = useGetAdmins()
  const { createAdmin, loading: createLoading } = useCreateAdmin()
  const { updateAdmin, loading: updateLoading } = useUpdateAdmin()
  const { deleteAdmin, loading: deleteLoading } = useDeleteAdmin()

  // If user is not a super-admin, show 401 error
  if (authUser.role !== "super-admin")
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-[#F1EFDC]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center p-8 bg-white rounded-lg shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="text-red-600 text-6xl mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            401
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-red-600 mb-2"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          >
            Akses Ditolak
          </motion.h1>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ y: -5 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button variant="danger" onClick={() => (window.location.href = "/")}>
              Kembali ke Login
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )

  // Open modal function
  const openModal = (admin = null) => {
    if (admin) {
      setSelectedAdmin(admin)
      setName(admin.name)
      setEmail(admin.email)
      setRole(admin.role)
      // Reset password fields
      setPassword("")
      setConfirmPassword("")
      setOldPassword("")
    } else {
      setSelectedAdmin(null)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setRole("admin")
      setOldPassword("")
    }
    setIsModalOpen(true)
    setErrorMessage("")
  }

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false)
    setErrorMessage("")
  }

  const openDeleteModal = (id) => {
    setSelectedAdminId(id)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedAdminId(null)
    setIsDeleteModalOpen(false)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAdminId) return
    try {
      await deleteAdmin(selectedAdminId)
      refetch()
      toast.success("Admin berhasil dihapus!")
    } catch (error) {
      toast.error("Gagal menghapus admin!")
    } finally {
      closeDeleteModal()
    }
  }

  // Update user function
  const handleUpdateUser = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!")
      return
    }

    if (!name || !email || !role) {
      setErrorMessage("Semua field harus diisi!")
      return
    }

    // Prepare data for update
    const updateData = { name, email, role }
    if (password) {
      updateData.password = password
    }

    const result = await updateAdmin(selectedAdmin.id, updateData)
    if (result) {
      refetch() // Refresh data setelah berhasil update
      closeModal()
      toast.success("Admin berhasil diperbarui!")
    }
  }

  // Function to create a new user
  const handleCreateUser = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!")
      return
    }
    if (!name || !email || !password || !role) {
      setErrorMessage("Semua field harus diisi!")
      return
    }

    const newAdmin = { name, email, password, role }
    const result = await createAdmin(newAdmin)
    if (result) {
      refetch() // Refresh data setelah berhasil menambahkan
      closeModal()
      toast.success("Admin berhasil ditambahkan!")
    }
  }

  return (
    <motion.div
      className="flex w-full max-w-[100vw] overflow-x-auto overflow-y-hidden min-h-screen bg-[#F1EFDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        title="Konfirmasi Penghapusan"
        message="Apakah Anda yakin ingin menghapus Akun ini?"
        onConfirm={handleDeleteConfirm}
        onCancel={closeDeleteModal}
      />

      {/* Sidebar */}
      <Sidebar activePage="account" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Super Admin Dashboard"
          icon={<ShieldIcon />}
          actions={
            <Button
              variant="primary"
              size="sm"
              icon={<PlusIcon />}
              onClick={() => openModal()}
              className="w-full sm:w-auto"
            >
              Tambah Admin
            </Button>
          }
        />

        <motion.div
          className="flex-1 w-full p-4 mx-auto md:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto w-full space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Total Admin"
                  value={adminsLoading ? "..." : admins.length}
                  icon={<UserIcon />}
                  color="bg-blue-100"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <StatCard
                  title="Super Admin"
                  value={adminsLoading ? "..." : admins.filter((admin) => admin.role === "super-admin").length}
                  icon={<ShieldIcon />}
                  color="bg-purple-100"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <StatCard
                  title="Regular Admin"
                  value={adminsLoading ? "..." : admins.filter((admin) => admin.role === "admin").length}
                  icon={<UserIcon />}
                  color="bg-green-100"
                />
              </motion.div>
            </div>

            {/* Admin List */}
            <motion.div variants={itemVariants}>
              <Card title="Manajemen Admin" icon={<AccountIcon />} className="w-full max-w-full overflow-hidden">
                {adminsLoading ? (
                  <div className="p-8 text-center">
                    <motion.div
                      className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D36B00]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <p className="text-gray-500 mt-2">Memuat data admin...</p>
                  </div>
                ) : adminsError ? (
                  <div className="p-8 text-center">
                    <p className="text-red-500">{adminsError}</p>
                    <Button variant="primary" size="sm" onClick={refetch} className="mt-4">
                      Coba Lagi
                    </Button>
                  </div>
                ) : (
                  <div className="relative overflow-x-auto">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<PlusIcon />}
                      className="md:hidden mb-4 w-full"
                      onClick={() => openModal()}
                    >
                      Tambah Admin
                    </Button>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {admins.map((admin) => (
                              <motion.tr
                                key={admin.id}
                                className="bg-white border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ backgroundColor: "rgba(211, 107, 0, 0.05)" }}
                              >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                  {admin.name}
                                </th>
                                <td className="px-6 py-4">{admin.email}</td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      admin.role === "super-admin"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {admin.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openModal(admin)}
                                      className="text-sm"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => openDeleteModal(admin.id)}
                                      className="text-sm"
                                      disabled={deleteLoading}
                                    >
                                      {deleteLoading ? "Menghapus..." : "Hapus"}
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal untuk Add/Edit User */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedAdmin ? "Edit Admin" : "Buat Admin Baru"}
        footer={
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-end">
            <Button variant="secondary" onClick={closeModal} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={selectedAdmin ? handleUpdateUser : handleCreateUser}
              disabled={createLoading || updateLoading}
              className="w-full sm:w-auto"
            >
              {createLoading || updateLoading ? "Memproses..." : selectedAdmin ? "Simpan Perubahan" : "Buat Admin"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            id="name"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="password"
            label={selectedAdmin ? "Password Baru (kosongkan jika tidak ingin mengubah)" : "Password"}
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!selectedAdmin}
          />

          <Input
            id="confirmPassword"
            label="Konfirmasi Password"
            type="password"
            placeholder="Masukkan password yang sama"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={!selectedAdmin || password !== ""}
          />

          {errorMessage && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errorMessage}
            </motion.div>
          )}
        </div>
      </Modal>
    </motion.div>
  )
}

export default SuperAdminDashboard
