import React, { useRef, useState } from "react";
import useDeleteTestimoni from "../hook/useDeleteTestimoni"; // Import hook delete
import useEditTestimoni from "../hook/useEditTestimoni"; // Import hook edit

const CalendarIcon = () => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const TrashIcon = () => (
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
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const RefreshIcon = () => (
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
    <path d="M21 2v6h-6"></path>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
    <path d="M3 22v-6h6"></path>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
  </svg>
);

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const TestimoniItem = ({ testimonis, loading, error, refetch }) => {
  const [sortOption, setSortOption] = useState("latest");
  const replaceFileInputRef = useRef(null);

  const {
    deleteTestimoni,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteTestimoni();
  const {
    editTestimoni,
    loading: editLoading,
    error: editError,
  } = useEditTestimoni(); // Hook edit

  const [selectedFile, setSelectedFile] = useState(null); // Untuk menyimpan file yang dipilih
  const [previewImage, setPreviewImage] = useState(null); // Untuk menyimpan preview gambar yang dipilih
  const [editingTestimoniId, setEditingTestimoniId] = useState(null); // Menyimpan ID testimoni yang sedang diedit

  const sortedImages = [...testimonis].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOption === "latest" ? dateB - dateA : dateA - dateB;
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleReplaceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Set preview image after file is selected
    }
  };

  const handleReplace = (id) => {
    replaceFileInputRef.current?.click();
    setEditingTestimoniId(id); // Set ID testimoni yang sedang diedit
  };

  const handleSaveChanges = async () => {
    if (!selectedFile || !editingTestimoniId) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    const result = await editTestimoni(editingTestimoniId, formData);
    if (result) {
      alert("Testimoni berhasil diperbarui!");
      refetch(); // Refetch data setelah update
      setSelectedFile(null); // Reset file dan preview setelah simpan
      setPreviewImage(null); // Reset preview image
      setEditingTestimoniId(null); // Reset ID testimoni yang sedang diedit
    }
  };

  const handleCancelChanges = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setEditingTestimoniId(null); // Reset ID testimoni yang sedang diedit
  };

  const handleDelete = async (id) => {
    const result = await deleteTestimoni(id);
    if (result) {
      alert("Testimoni berhasil dihapus!");
      refetch(); // Refetch data setelah penghapusan
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Galeri Testimoni
        </h3>
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
          <CalendarIcon />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="bg-transparent focus:outline-none text-gray-700"
          >
            <option value="latest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </div>
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
      ) : sortedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={previewImage || image.image} // Gunakan previewImage jika ada, jika tidak gunakan gambar asli
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
                    onClick={() => handleReplace(image.id)} // Tombol untuk mengganti gambar
                  >
                    <RefreshIcon />
                    Ganti Foto
                  </button>
                  <button
                    className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md text-sm transition-colors"
                    onClick={() => handleDelete(image.id)}
                    disabled={deleteLoading} // Disabled saat sedang loading
                  >
                    <TrashIcon />
                    {deleteLoading ? "Menghapus..." : "Hapus Testimoni"}
                  </button>
                </div>
                {/* Tombol Simpan dan Batal muncul setelah file dipilih */}
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
          <p className="text-gray-500">
            Belum ada foto testimoni yang diunggah.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Unggah foto testimoni pertama Anda.
          </p>
        </div>
      )}
      {selectedFile && (
        <div className="mt-4 text-center">
          {/* <h4 className="text-sm text-gray-700">Preview Gambar:</h4>
          <img
            src={previewImage}
            alt="Preview"
            className="mx-auto mt-2 w-64 h-64 object-cover rounded-md"
          /> */}
        </div>
      )}
    </div>
  );
};

export default TestimoniItem;
