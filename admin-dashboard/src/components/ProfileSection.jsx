"use client"

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import useProfile from "../hook/useProfile";
import { PageHeader, Sidebar } from "./ui/ui-components";
import { ProfilIcon, ImageIcon } from "./ui/icons"; // Import icons

const ProfileSection = () => {
  const { profile, loading, error, saveProfile } = useProfile();
  const [nohp, setNohp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile) {
      setNohp(profile.nohp || "");
      setAlamat(profile.alamat || "");
      setAbout(profile.about || "");
      setImagePreview(profile.image || null);
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    // Memastikan semua field wajib diisi
    if (!nohp || !alamat || !about) {
      toast.warning("Semua field wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("nohp", nohp);
    formData.append("alamat", alamat);
    formData.append("about", about);
    if (image) formData.append("image", image);

    try {
      await saveProfile(formData);
      toast.success("Profil berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan profil");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      <Sidebar activePage="profil" />
      <div className="flex-1">
        <PageHeader title="Manajemen Profil" icon={<ProfilIcon />} />
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6 mt-6">
          {/* Profile form */}
          <div>
            <label
              htmlFor="nohp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor HP
            </label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <span className="bg-gray-100 px-3 py-2.5 text-sm text-gray-700 flex items-center">
                +62
              </span>
              <input
                id="nohp"
                type="text"
                value={nohp}
                onChange={(e) => setNohp(e.target.value.replace(/^0+/, ""))}
                placeholder="81234567890"
                className="flex-1 p-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat
            </label>
            <textarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Masukkan alamat"
              className="border border-gray-300 rounded-lg p-2.5 w-full h-24 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tentang Saya
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Deskripsi singkat"
              className="border border-gray-300 rounded-lg p-2.5 w-full h-24 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gambar Profil
            </label>
            <div className="flex items-center">
              <input
                id="image"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="image"
                className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50"
              >
                <span className="w-[18px] h-[18px]">
                  <ImageIcon />
                </span>
                {image ? image.name : "Pilih Gambar Profil"}
              </label>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#D36B00] hover:bg-[#42032C] text-white py-2.5 px-6 rounded-lg transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Simpan Profil"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
