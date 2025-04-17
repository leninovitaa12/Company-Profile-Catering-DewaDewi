import React, { useRef, useState } from "react";
import usePostTestimoni from "../hook/usePostTestimoni";

const UploadIcon = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" x2="12" y1="3" y2="15"></line>
  </svg>
);

const TestimoniAdd = () => {
  const [testimoniImage, setTestimoniImage] = useState(null);
  const fileInputRef = useRef(null);

  const { postTestimoni, loading, error, successData } = usePostTestimoni();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTestimoniImage({ file });
    }
  };

  const handleUpload = async () => {
    if (testimoniImage) {
      const result = await postTestimoni(testimoniImage.file);
      if (result) {
        // Setujui apa yang perlu dilakukan setelah upload sukses (misalnya reset atau tampilkan pesan sukses)
        alert("Testimoni berhasil diunggah!");
        setTestimoniImage(null); // reset image setelah upload sukses
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mb-6 border-b pb-3">
        <h2 className="text-3xl font-bold text-gray-800">Upload Testimoni</h2>
      </div>
      <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            {/* Menambahkan id untuk input dan menyesuaikan htmlFor pada label */}
            <input
              type="file"
              id="testimoni-upload" // Tambahkan id di sini
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="testimoni-upload" // Sesuaikan dengan id input
              className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full"
            >
              {testimoniImage
                ? testimoniImage.file.name
                : "Pilih Foto Testimoni"}
            </label>
          </div>

          <button
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
              testimoniImage
                ? "bg-[#D36B00] hover:bg-[#B25800] text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleUpload}
            disabled={!testimoniImage || loading}
          >
            {loading ? "Mengunggah..." : "Upload Testimoni"}
          </button>
        </div>

        {testimoniImage && (
          <div className="mt-4 flex items-center gap-4">
            <div className="relative w-24 h-24 border rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(testimoniImage.file)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{testimoniImage.file.name}</p>
              <p>{(testimoniImage.file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </>
  );
};

export default TestimoniAdd;
