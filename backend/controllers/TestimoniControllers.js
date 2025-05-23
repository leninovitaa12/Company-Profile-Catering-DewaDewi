const { Sequelize } = require("sequelize");
const { Testimoni } = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const myLogger = require("../lib/myLogger.js");

const createTestimoni = async (req, res) => {
  const { name: userName } = req.user;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Gambar wajib diunggah." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/public/image/${
      req.file.filename
    }`;

    const newTestimoni = await Testimoni.create({
      image: imageUrl,
    });

    myLogger(`Testimoni baru ditambahkan`, `Oleh ${userName}`);

    res.status(201).json(newTestimoni);
  } catch (error) {
    console.error("Create Testimoni Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const getTestimoni = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const testimonis = await Testimoni.findAll({
      order: [[Sequelize.literal("RAND()")]],
      limit,
      offset,
    });

    res.status(200).json({
      page: Number(page),
      perPage: limit,
      total: testimonis.length,
      testimonis,
    });
  } catch (error) {
    console.error("Get Testimoni Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const updateTestimoni = async (req, res) => {
  const { name: userName } = req.user;
  try {
    const { id } = req.params;
    const testimoni = await Testimoni.findByPk(id);

    if (!testimoni) {
      return res.status(404).json({ error: "Testimoni tidak ditemukan." });
    }

    let imageUrl = testimoni.image;

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/public/image/${
        req.file.filename
      }`;

      const filename = path.basename(testimoni.image);
      const imagePath = path.join(__dirname, "../public/image/", filename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Gambar ${filename} berhasil dihapus.`);
      } else {
        console.log(`Gambar ${filename} tidak ditemukan.`);
      }
    }

    await testimoni.update({ image: imageUrl });

    myLogger(`Testimoni diperbarui`, `Oleh ${userName}`);

    res.status(200).json(testimoni);
  } catch (error) {
    console.error("Update Testimoni Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const deleteTestimoni = async (req, res) => {
  const { name: userName } = req.user;
  try {
    const { id } = req.params;
    const testimoni = await Testimoni.findByPk(id);

    if (!testimoni) {
      return res.status(404).json({ error: "Testimoni tidak ditemukan." });
    }

    if (testimoni.image) {
      const filename = path.basename(testimoni.image);
      const imagePath = path.join(__dirname, "../public/image/", filename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Gambar ${filename} berhasil dihapus.`);
      } else {
        console.log(`Gambar ${filename} tidak ditemukan.`);
      }
    }

    await testimoni.destroy();

    myLogger(`Testimoni dihapus`, `Oleh ${userName}`);

    res.status(200).json({ message: "Testimoni berhasil dihapus." });
  } catch (error) {
    console.error("Delete Testimoni Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  createTestimoni,
  getTestimoni,
  updateTestimoni,
  deleteTestimoni,
};
