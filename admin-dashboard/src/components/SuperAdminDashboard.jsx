"use client"

import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import Sidebar from "../components/ui/sidebar"
import PageHeader from "../components/ui/page-header"
import Card, { StatCard } from "../components/ui/card"
import Button from "../components/ui/button"
import { AccountIcon, PlusIcon, ShieldIcon, UserIcon } from "../components/icons"

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([
    { name: "Admin Satu", email: "admin1@example.com", password: "password123", role: "admin" },
    { name: "Admin Dua", email: "admin2@example.com", password: "password123", role: "admin" },
  ])
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

  // If user is not a super-admin, show 401 error
  if (authUser.role !== "super-admin")
    return (
      <div className="flex items-center justify-center h-screen bg-[#F1EFDC]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-6xl mb-4">401</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          <Button variant="danger" onClick={() => (window.location.href = "/")}>
            Kembali ke Login
          </Button>
        </div>
      </div>
    )

  // Open modal function
  const openModal = (admin = null) => {
    if (admin) {
      setSelectedAdmin(admin)
      setName(admin.name)
      setEmail(admin.email)
      setRole(admin.role)
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
  }

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false)
    setErrorMessage("")
  }

  // Delete user function
  const handleDeleteUser = (email) => {
    setAdmins(admins.filter((admin) => admin.email !== email))
    toast.success("Admin berhasil dihapus")
  }

  // Update user function
  const handleUpdateUser = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!")
      return
    }

    // Validate if the old password matches the current password
    if (oldPassword !== selectedAdmin.password) {
      setErrorMessage("Password lama tidak cocok!")
      return
    }

    if (!name || !email || !role) {
      setErrorMessage("Semua field harus diisi!")
      return
    }

    // Update the admin information
    const updatedAdmins = admins.map((admin) =>
      admin.email === selectedAdmin.email ? { ...admin, name, email, password, role } : admin,
    )
    setAdmins(updatedAdmins)
    toast.success("Admin berhasil diperbarui")
    closeModal()
  }

  // Function to create a new user
  const handleCreateUser = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!")
      return
    }
    if (!name || !email || !role) {
      setErrorMessage("Semua field harus diisi!")
      return
    }
    const newAdmin = { name, email, password, role }
    setAdmins([...admins, newAdmin])
    toast.success("Admin berhasil ditambahkan")
    closeModal()
  }

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <Sidebar activePage="account" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Super Admin Dashboard"
          icon={<ShieldIcon />}
          actions={
            <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={() => openModal()}>
              Tambah Admin
            </Button>
          }
        />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Total Admin" value={admins.length} icon={<UserIcon />} color="bg-blue-100" />

              <StatCard
                title="Super Admin"
                value={admins.filter((admin) => admin.role === "super-admin").length}
                icon={<ShieldIcon />}
                color="bg-purple-100"
              />

              <StatCard
                title="Regular Admin"
                value={admins.filter((admin) => admin.role === "admin").length}
                icon={<UserIcon />}
                color="bg-green-100"
              />
            </div>

            {/* Admin List */}
            <Card title="Manajemen Admin" icon={<AccountIcon />}>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Nama</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {admins.map((admin, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">{admin.name}</td>
                        <td className="py-3 px-4">{admin.email}</td>
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openModal(admin)} className="text-sm">
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteUser(admin.email)}
                              className="text-sm"
                            >
                              Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal untuk Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
            <div className="bg-[#42032C] text-white p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">{selectedAdmin ? "Edit Admin" : "Buat Admin Baru"}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                {/* Old Password */}
                {selectedAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
                    <input
                      type="password"
                      placeholder="Masukkan password lama"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                    />
                  </div>
                )}

                {/* Password input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <input
                    type="password"
                    placeholder="Masukkan password yang sama"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm">{errorMessage}</div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeModal}>
                Batal
              </Button>
              <Button variant="primary" onClick={selectedAdmin ? handleUpdateUser : handleCreateUser}>
                {selectedAdmin ? "Simpan Perubahan" : "Buat Admin"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminDashboard
