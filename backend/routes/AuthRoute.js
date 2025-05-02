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
} = require("../controllers/AuthControllers.js");
const { protectedRoute } = require("../middleware/protectedRoute.js");

const router = express.Router();

// ✅ Ini HARUS diubah dari GET ke POST dan jangan hardcoded
router.get("/createuser", createdUser); // ❌ Salah (GET dan hardcoded)

router.post("/login", pinRateLimiter, login);
router.post("/logout", logout);
router.post("/pin-reset", sendPin);
router.post(
  "/reset-password",
  pinRateLimiter,
  checkPinMiddleware,
  validatePassword,
  resetPassword
);

router.get("/check", protectedRoute, getUser);

module.exports = router;
