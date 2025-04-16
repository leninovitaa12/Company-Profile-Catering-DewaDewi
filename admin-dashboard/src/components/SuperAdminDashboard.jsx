"use client"

import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import useLogout from "../hook/useLogout"
import { toast } from "react-toastify"

// Simple SVG icons as components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

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
  const [password, setPassword] = useState("") // Password field
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("admin")
  const [oldPassword, setOldPassword] = useState("") // Old password field
  const [errorMessage, setErrorMessage] = useState("")

  // Using the logout hook
  const { logout } = useLogout()

  // Logout function
  const handleLogout = () => {
    logout()
  }

  // If user is not a super-admin, show 401 error
  if (authUser.role !== "super-admin")
    return (
      <div className="flex items-center justify-center h-screen bg-[#F1EFDC]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-6xl mb-4">401</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Kembali ke Login
          </button>
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
      setOldPassword("") // Reset old password when creating new user
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
      admin.email === selectedAdmin.email
        ? { ...admin, name, email, password, role }
        : admin
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
    closeModal()
  }

  return (
    <div className="min-h-screen bg-[#F1EFDC]">
      {/* Header */}
      <header className="bg-[#42032C] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldIcon />
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Admin</p>
                <h3 className="text-3xl font-bold text-[#42032C]">{admins.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UserIcon />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Super Admin</p>
                <h3 className="text-3xl font-bold text-[#42032C]">
                  {admins.filter((admin) => admin.role === "super-admin").length}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <ShieldIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#42032C]">Manajemen Admin</h2>
            <button
              onClick={() => openModal()}
              className="flex items-center space-x-2 bg-[#D36B00] hover:bg-[#42032C] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon />
              <span>Tambah Admin</span>
            </button>
          </div>

          {/* Admin List */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Nama</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 border-b">{admin.name}</td>
                    <td className="py-3 px-4 border-b">{admin.email}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${admin.role === "super-admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => handleDeleteUser(admin.email)}
                        className="text-red-500 hover:text-red-700 mr-2"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => openModal(admin)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal untuk Add User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
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

                {/* Password input stays empty */}
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

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={selectedAdmin ? handleUpdateUser : handleCreateUser}
                className="px-4 py-2 bg-[#D36B00] hover:bg-[#42032C] text-white rounded-lg transition-colors"
              >
                {selectedAdmin ? "Simpan Perubahan" : "Buat Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminDashboard
