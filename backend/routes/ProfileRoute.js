const express = require("express");
const router = express.Router();
const { uploadImage, compressAndSaveImage } = require("../lib/uploadImage");
const {
  saveProfile,
  getProfile,
} = require("../controllers/ProfileControllers");
const { protectedRoute } = require("../middleware/protectedRoute");

router.post(
  "/",
  protectedRoute,
  uploadImage,
  compressAndSaveImage,
  saveProfile
);
router.get("/", getProfile);

module.exports = router;
