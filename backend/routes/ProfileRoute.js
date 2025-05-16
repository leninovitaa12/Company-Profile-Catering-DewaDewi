const express = require("express");
const router = express.Router();
const {
  uploadMultipleImage,
  compressAndSaveMultipleImage,
} = require("../lib/uploadMultipleImage");
const {
  saveProfile,
  getProfile,
} = require("../controllers/ProfileControllers");
const { protectedRoute } = require("../middleware/protectedRoute");

router.post(
  "/",
  protectedRoute,
  uploadMultipleImage,
  compressAndSaveMultipleImage,
  saveProfile
);
router.get("/", getProfile);

module.exports = router;
