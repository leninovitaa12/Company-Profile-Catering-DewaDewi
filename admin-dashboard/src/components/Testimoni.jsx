"use client";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hook/useLogout";
import { useAuthContext } from "../context/AuthContext";

// Simple SVG icons as components
// Simple SVG icons as components
const HomeIcon = () => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const TestimoniIcon = () => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const ProductIcon = () => (
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
    <path d="m7.5 4.27 9 5.15"></path>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
    <path d="m3.3 7 8.7 5 8.7-5"></path>
    <path d="M12 22V12"></path>
  </svg>
)

const AccountIcon = () => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" x2="12" y1="3" y2="15"></line>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2v6h-6"></path>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
    <path d="M3 22v-6h6"></path>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Testimoni = () => {
  const { authUser } = useAuthContext();
  const [testimoniImage, setTestimoniImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const fileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);
  const [imageToReplace, setImageToReplace] = useState(null);
  const { logout, loading } = useLogout()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        file,
        date: new Date(),
        id: Date.now(),
      };
      setTestimoniImage(newImage);
    }
  };

  const handleLogout = () => {
    if (logout) {
      logout(); // Using logout function from context
    }
  };

  const handleReplaceImageChange = (e) => {
    const file = e.target.files[0];
    if (file && imageToReplace) {
      setUploadedImages((prevImages) =>
        prevImages.map((image) => (image.id === imageToReplace ? { ...image, file, date: new Date() } : image))
      );
      setImageToReplace(null);
    }
  };

  const handleUpload = () => {
    if (testimoniImage) {
      setUploadedImages((prevImages) => [...prevImages, testimoniImage]);
      setTestimoniImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = (id) => {
    setUploadedImages(uploadedImages.filter((image) => image.id !== id));
  };

  const handleReplace = (id) => {
    setImageToReplace(id);
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.click();
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedImages = [...uploadedImages].sort((a, b) => {
    if (sortOption === "latest") {
      return b.date - a.date;
    } else {
      return a.date - b.date;
    }
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
          {/* Sidebar */}
          <div className="w-64 bg-[#42032C] text-white min-h-screen p-4 hidden md:block">
            <div className="flex items-center justify-center mb-8 pt-4">
              <h1 className="text-xl font-bold">Menu Admin</h1>
            </div>
            <nav className="space-y-2">
            <Link
                to="/"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
              >
                <HomeIcon />
                <span>Dashboard</span>
              </Link>
              <div className="bg-[#D36B00] rounded-lg p-2 flex items-center space-x-3">
                <TestimoniIcon />
                <span>Testimoni</span>
              </div>
              <Link
                to="/product"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
              >
                <ProductIcon />
                <span>Produk</span>
              </Link>
    
              {authUser.role === "super-admin" && (
                <Link
                  to="/account"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D36B00] transition-colors"
                >
                  <AccountIcon />
                  <span>Akun</span>
                </Link>
              )}
            </nav>
    
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleLogout}
                className="w flex items-center justif space-x-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                disabled={loading}
              >
                <LogoutIcon />
                <span>{loading ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </div>
    {/* Mobile Navigation */}
            <div className="md:hidden bg-white p-2 shadow-md">
              <div className="flex justify-between">
                <Link to="/testimoni" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
                  <TestimoniIcon />
                  <span className="text-xs mt-1">Testimoni</span>
                </Link>
    
                <Link to="/product" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
                  <ProductIcon />
                  <span className="text-xs mt-1">Produk</span>
                </Link>
    
                {authUser.role === "super-admin" && (
                  <Link to="/account" className="flex flex-col items-center p-2 text-[#D36B00] hover:text-[#42032C]">
                    <AccountIcon />
                    <span className="text-xs mt-1">Akun</span>
                  </Link>
                )}
              </div>
            </div>
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center mb-6 border-b pb-3">
          <h2 className="text-3xl font-bold text-gray-800">Upload Testimoni</h2>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative flex-1 w-full">
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              <label htmlFor="testimoni-upload" className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full">
                {testimoniImage ? testimoniImage.file.name : "Pilih Foto Testimoni"}
              </label>
            </div>

            <button
              className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all ${testimoniImage ? "bg-[#D36B00] hover:bg-[#B25800] text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
              onClick={handleUpload}
              disabled={!testimoniImage}
            >
              Upload Testimoni
            </button>
          </div>

          {testimoniImage && (
            <div className="mt-4 flex items-center gap-4">
              <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                <img src={URL.createObjectURL(testimoniImage.file)} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{testimoniImage.file.name}</p>
                <p>{(testimoniImage.file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">Galeri Testimoni</h3>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
              <CalendarIcon />
              <select value={sortOption} onChange={handleSortChange} className="bg-transparent focus:outline-none text-gray-700">
                <option value="latest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>
          </div>

          <input type="file" ref={replaceFileInputRef} onChange={handleReplaceImageChange} className="hidden" accept="image/*" />

          {sortedImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sortedImages.map((image) => (
                <div key={image.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-square">
                    <img src={URL.createObjectURL(image.file)} alt="Testimoni" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <CalendarIcon />
                      {formatDate(image.date)}
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
                      >
                        <TrashIcon />
                      </button>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default Testimoni;
