const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Get All Accounts Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Get account by ID
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Akun tidak ditemukan." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Account Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Create new account (role selalu admin)
const createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Nama, email, dan password wajib diisi." });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email sudah digunakan." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Akun berhasil dibuat.",
      user: { id: user.id, name, email, role: "admin" },
    });
  } catch (error) {
    console.error("Create Account Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Update account (role tidak bisa diubah)
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Akun tidak ditemukan." });
    }

    const updateData = { name, email };

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    await user.update(updateData);
    res.status(200).json({ message: "Akun berhasil diperbarui." });
  } catch (error) {
    console.error("Update Account Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Akun tidak ditemukan." });
    }

    await user.destroy();
    res.status(200).json({ message: "Akun berhasil dihapus." });
  } catch (error) {
    console.error("Delete Account Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const updateSelfAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Authentikasi Invalid." });
    }

    const updateData = { name, email };

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    await user.update(updateData);
    res.status(200).json({ message: "Akun berhasil diperbarui." });
  } catch (error) {
    console.error("Update Account Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  updateSelfAccount,
};
