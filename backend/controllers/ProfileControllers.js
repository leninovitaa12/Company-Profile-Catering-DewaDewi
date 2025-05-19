const { Profile } = require("../models");
const fs = require("fs");
const path = require("path");

const saveProfile = async (req, res) => {
  try {
    const { nohp, about, alamat } = req.body;

    const makeImageUrl = (filename) =>
      `${req.protocol}://${req.get("host")}/public/image/${filename}`;

    const imageFields = ["image", "image1", "image2", "image3"];
    const imageUrls = {};

    // Ambil semua URL gambar baru dari req.files
    for (const field of imageFields) {
      if (req.files?.[field]?.[0]) {
        imageUrls[field] = makeImageUrl(req.files[field][0].filename);
      }
    }

    let profile = await Profile.findOne();

    if (profile) {
      const updates = {};
      if (nohp !== undefined) updates.nohp = nohp;
      if (about !== undefined) updates.about = about;
      if (alamat !== undefined) updates.alamat = alamat;

      for (const field of imageFields) {
        if (imageUrls[field]) {
          updates[field] = imageUrls[field]; // gunakan nama field sesuai model

          const oldUrl = profile[field]; // ambil URL lama dari DB
          if (oldUrl) {
            const oldFilename = path.basename(oldUrl);
            const oldPath = path.join(
              __dirname,
              "../public/image",
              oldFilename
            );
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
              console.log(`Gambar lama ${oldFilename} dihapus.`);
            }
          }
        }
      }

      await profile.update(updates);

      return res.status(200).json({
        message: "Profile berhasil diperbarui",
        data: profile,
      });
    } else {
      // Cek apakah semua field wajib diisi
      if (!nohp || !about || !alamat || !imageUrls.image) {
        return res.status(400).json({
          error: "Field wajib tidak lengkap untuk membuat profile.",
        });
      }

      const newProfile = await Profile.create({
        nohp,
        about,
        alamat,
        image: imageUrls.image,
        image1: imageUrls.image1 || null,
        image2: imageUrls.image2 || null,
        image3: imageUrls.image3 || null,
      });

      return res.status(201).json({
        message: "Profile berhasil dibuat",
        data: newProfile,
      });
    }
  } catch (error) {
    console.error("Save Profile Error:", error.message);
    return res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  saveProfile,
  getProfile,
};
