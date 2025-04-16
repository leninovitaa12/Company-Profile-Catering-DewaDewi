import { Link } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hook/useLogout"; // Mengimpor hook useLogout
import { useAuthContext } from "../context/AuthContext";

const DashboardAdmin = () => {
  const { authUser } = useAuthContext();
  const [content, setContent] = useState(
    `Ini adalah konten dashboard ${authUser.role}.`
  );
  const [isEditing, setIsEditing] = useState(false);
  const { logout, loading } = useLogout(); // Menggunakan useLogout untuk logout

  // Fungsi logout
  const handleLogout = async () => {
    await logout(); // Menjalankan logout dari hook useLogout
  };

  // Fungsi untuk mengubah konten
  const handleChangeContent = (e) => {
    setContent(e.target.value); // Mengubah konten ketika input berubah
  };

  // Fungsi untuk toggle mode edit
  const toggleEdit = () => {
    setIsEditing(!isEditing); // Menyalakan atau mematikan mode edit
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EFDC]">
      <div className="bg-[#42032C] text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Dashboard {authUser.role}</h1>
        <button
          onClick={handleLogout}
          className="bg-[#D36B00] hover:bg-[#42032C] text-white p-2 rounded mt-3"
          disabled={loading} // Menonaktifkan tombol jika sedang loading
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="flex-1 p-5">
        <div className="flex space-x-5">
          <Link to="/testimoni" className="text-[#D36B00] hover:text-[#42032C]">
            Testimoni
          </Link>
          <Link to="/product" className="text-[#D36B00] hover:text-[#42032C]">
            Produk
          </Link>
          {authUser.role === "super-admin" && (
            <Link to="/account" className="text-[#D36B00] hover:text-[#42032C]">
              Akun
            </Link>
          )}
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-semibold">Konten Dashboard:</h2>
          <div className="mt-3">
            {isEditing ? (
              <textarea
                value={content}
                onChange={handleChangeContent}
                className="w-full p-3 border rounded"
                rows="4"
              />
            ) : (
              <p>{content}</p>
            )}

            <button
              onClick={toggleEdit}
              className="mt-3 bg-[#D36B00] hover:bg-[#42032C] text-white p-2 rounded"
            >
              {isEditing ? "Simpan" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
