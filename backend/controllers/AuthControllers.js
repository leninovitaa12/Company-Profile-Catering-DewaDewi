const bcrypt = require("bcryptjs");
const { Pin, User } = require("../models/index.js");
const tokenAndCookie = require("../lib/getToken.js");
require("dotenv").config();
const nodemailer = require("nodemailer");

const createdUser = async (req, res) => {
  try {
    const name = "satu";
    const email = "dira@gmail.com";
    const password = "wardah26";

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah digunakan!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    tokenAndCookie(newUser.id, res);

    res.status(201).json("Akun berhasil dibuat");
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email salah!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Password salah!" });
    }
    tokenAndCookie(user.id, res);
    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Berhasil logout!" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

const generateRandomPin = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createPinWithExpiry = async (email, pin) => {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  try {
    await Pin.destroy({
      where: { email },
    });
    const pinEntry = await Pin.create({
      pin,
      email,
      expiresAt,
    });
    console.log("PIN saved:", pinEntry);
    return pin;
  } catch (error) {
    console.error("Error saving PIN:", error);
    throw new Error("Failed to create PIN.");
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPin = async (req, res) => {
  const { email } = req.body;
  let { name } = req.body;

  try {
    if (!name) {
      const user = await User.findOne({ where: { email } });
      name = user ? user.name : "User";
    }

    const pin = generateRandomPin();

    const mailOptions = {
      from: `DewaDewi <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Hello ${name}, Your Confirmation Code`,
      html: `
          <p>Dear ${name},</p>
          <p>Your confirmation code is: <strong>${pin}</strong></p>
          <p>Please do not share this code with anyone. The confirmation code is valid for <strong>10 minutes</strong>.</p>
          <p>Thank you!</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    await createPinWithExpiry(email, pin);
    res.status(200).json({ message: "Code sent to Email successfully!", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending code", error });
  }
};

const validatePassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ error: "Password wajib diisi untuk pendaftaran manual." });
  }

  if (password != confirmPassword) {
    return res.status(400).json({ error: "Password tidak cocok!" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password harus memiliki minimal 6 karakter, termasuk huruf besar, huruf kecil, dan angka.",
    });
  }

  next();
};

const getUser = async (req, res) => {
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Semua field harus diisi!" });
    }

    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ error: "Konfirmasi password tidak cocok!" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ password: hashedPassword });
    res.status(200).json({ message: "Password berhasil diperbarui!" });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  login,
  logout,
  sendPin,
  getUser,
  validatePassword,
  resetPassword,
  createdUser,
};
