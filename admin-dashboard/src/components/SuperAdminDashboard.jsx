"use client";

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  Sidebar,
  PageHeader,
  Card,
  StatCard,
  Button,
} from "../components/ui/ui-components";
import {
  AccountIcon,
  PlusIcon,
  ShieldIcon,
  UserIcon,
} from "../components/ui/icons";

// Import hooks untuk koneksi database
import useGetAdmins from "../hook/useGetAdmins";
import useCreateAdmin from "../hook/useCreateAdmin";
import useUpdateAdmin from "../hook/useUpdateAdmin";
import useDeleteAdmin from "../hook/useDeleteAdmin";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Tidak menampilkan modal jika isOpen false

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Konfirmasi Penghapusan
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Apakah Anda yakin ingin menghapus Akun ini?
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

const SuperAdminDashboard = () => {
  const { authUser } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  // Menggunakan hooks untuk koneksi database
  const {
    admins,
    loading: adminsLoading,
    error: adminsError,
    refetch,
  } = useGetAdmins();
  const { createAdmin, loading: createLoading } = useCreateAdmin();
  const { updateAdmin, loading: updateLoading } = useUpdateAdmin();
  const { deleteAdmin, loading: deleteLoading } = useDeleteAdmin();

  // If user is not a super-admin, show 401 error
  if (authUser.role !== "super-admin")
    return (
      <div className="flex items-center justify-center h-screen bg-[#F1EFDC]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-6xl mb-4">401</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Akses Ditolak
          </h1>
          <p className="text-gray-600 mb-4">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
          <Button variant="danger" onClick={() => (window.location.href = "/")}>
            Kembali ke Login
          </Button>
        </div>
      </div>
    );

  // Open modal function
  const openModal = (admin = null) => {
    if (admin) {
      setSelectedAdmin(admin);
      setName(admin.name);
      setEmail(admin.email);
      setRole(admin.role);
      // Reset password fields
      setPassword("");
      setConfirmPassword("");
      setOldPassword("");
    } else {
      setSelectedAdmin(null);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("admin");
      setOldPassword("");
    }
    setIsModalOpen(true);
    setErrorMessage("");
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const openDeleteModal = (id) => {
    setSelectedAdminId(id);
    setIsModalOpen2(true);
  };

  const closeDeleteModal = () => {
    setSelectedAdminId(null);
    setIsModalOpen2(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAdminId) return;
    try {
      await deleteAdmin(selectedAdminId);
      refetch();
    } catch (error) {
      toast.error("Gagal menghapus produk!");
    } finally {
      closeDeleteModal();
    }
  };

  // Update user function
  const handleUpdateUser = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (!name || !email || !role) {
      setErrorMessage("Semua field harus diisi!");
      return;
    }

    // Prepare data for update
    const updateData = { name, email, role };
    if (password) {
      updateData.password = password;
    }

    const result = await updateAdmin(selectedAdmin.id, updateData);
    if (result) {
      refetch(); // Refresh data setelah berhasil update
      closeModal();
    }
  };

  // Function to create a new user
  const handleCreateUser = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok!");
      return;
    }
    if (!name || !email || !password || !role) {
      setErrorMessage("Semua field harus diisi!");
      return;
    }

    const newAdmin = { name, email, password, role };
    const result = await createAdmin(newAdmin);
    if (result) {
      refetch(); // Refresh data setelah berhasil menambahkan
      closeModal();
    }
  };

  return (
    <div className="flex w-full max-w-[100vw] overflow-x-auto overflow-y-hidden min-h-screen bg-[#F1EFDC]">
      <ConfirmModal
        isOpen={isModalOpen2}
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
            >
              Tambah Admin
            </Button>
          }
        />

        <div className="flex-1 w-full p-4 mx-auto md:p-6">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Admin"
                value={adminsLoading ? "..." : admins.length}
                icon={<UserIcon />}
                color="bg-blue-100"
              />

              <StatCard
                title="Super Admin"
                value={
                  adminsLoading
                    ? "..."
                    : admins.filter((admin) => admin.role === "super-admin")
                        .length
                }
                icon={<ShieldIcon />}
                color="bg-purple-100"
              />

              <StatCard
                title="Regular Admin"
                value={
                  adminsLoading
                    ? "..."
                    : admins.filter((admin) => admin.role === "admin").length
                }
                icon={<UserIcon />}
                color="bg-green-100"
              />
            </div>

            {/* Admin List */}
            <Card
              title="Manajemen Admin"
              icon={<AccountIcon />}
              className="w-full max-w-full overflow-hidden"
            >
              {adminsLoading ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Memuat data admin...</p>
                </div>
              ) : adminsError ? (
                <div className="p-8 text-center">
                  <p className="text-red-500">{adminsError}</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={refetch}
                    className="mt-4"
                  >
                    Coba Lagi
                  </Button>
                </div>
              ) : (
                <div className="relative overflow-x-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<PlusIcon />}
                    className="md:hidden"
                    onClick={() => openModal()}
                  >
                    Tambah Admin
                  </Button>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      {admins.map((admin) => (
                        <tr
                          key={admin.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Modal untuk Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
            <div className="bg-[#42032C] text-white p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">
                {selectedAdmin ? "Edit Admin" : "Buat Admin Baru"}
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  />
                </div>

                {/* Password input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedAdmin
                      ? "Password Baru (kosongkan jika tidak ingin mengubah)"
                      : "Password"}
                  </label>
                  <input
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                    required={!selectedAdmin} // Wajib diisi untuk admin baru
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan password yang sama"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                    required={!selectedAdmin || password !== ""} // Wajib diisi jika admin baru atau password diubah
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#D36B00] focus:border-[#D36B00] outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div> */}

                {errorMessage && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeModal}>
                Batal
              </Button>
              <Button
                variant="primary"
                onClick={selectedAdmin ? handleUpdateUser : handleCreateUser}
                disabled={createLoading || updateLoading}
              >
                {createLoading || updateLoading
                  ? "Memproses..."
                  : selectedAdmin
                  ? "Simpan Perubahan"
                  : "Buat Admin"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
