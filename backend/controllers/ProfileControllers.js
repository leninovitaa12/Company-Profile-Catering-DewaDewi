const { Profile } = require("../models");
const fs = require("fs");
const path = require("path");

const saveProfile = async (req, res) => {
  try {
    const { nohp, about, alamat } = req.body;
    let imageUrl;

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/public/image/${
        req.file.filename
      }`;
    }

    let profile = await Profile.findOne();

    if (profile) {
      const updates = {};
      if (nohp !== undefined) updates.nohp = nohp;
      if (about !== undefined) updates.about = about;
      if (alamat !== undefined) updates.alamat = alamat;

      if (imageUrl) {
        updates.image = imageUrl;

        const oldFilename = path.basename(profile.image);
        const oldImagePath = path.join(
          __dirname,
          "../public/image/",
          oldFilename
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Gambar lama ${oldFilename} dihapus.`);
        }
      }

      await profile.update(updates);
      return res
        .status(200)
        .json({ message: "Profile berhasil diperbarui", data: profile });
    } else {
      if (!imageUrl || !nohp || !about || !alamat) {
        return res
          .status(400)
          .json({ error: "Field wajib tidak lengkap untuk membuat profile." });
      }

      const newProfile = await Profile.create({
        nohp,
        image: imageUrl,
        about,
        alamat,
      });

      return res
        .status(201)
        .json({ message: "Profile berhasil dibuat", data: newProfile });
    }
  } catch (error) {
    console.error("Save Profile Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
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
