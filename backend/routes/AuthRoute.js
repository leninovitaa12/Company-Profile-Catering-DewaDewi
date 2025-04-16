const express = require("express");
const {
  checkPinMiddleware,
  pinRateLimiter,
} = require("../middleware/checkPinMiddleware.js");
const {
  createdUser,
  login,
  logout,
  sendPin,
  getUser,
  validatePassword,
  resetPassword,
  createUserWithRole, // Pastikan untuk mengimpor fungsi createUserWithRole
} = require("../controllers/AuthControllers.js");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");
const { protectedRoute } = require("../middleware/protectedRoute.js");

const router = express.Router();

router.get("/createuser", createdUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/pin", validatePassword, sendPin);
router.post("/pin-reset", sendPin);
router.post(
  "/reset-password",
  pinRateLimiter,
  checkPinMiddleware,
  validatePassword,
  resetPassword
);

// Rute untuk membuat pengguna dengan role admin atau superuser
router.post("/create-user", createUserWithRole);  // Menambahkan rute create-user

router.get("/check", protectedRoute, getUser);

module.exports = router;
