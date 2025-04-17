const express = require("express");
const { protectedRoute } = require("../middleware/protectedRoute");

const { uploadImage, compressAndSaveImage } = require("../lib/uploadImage");
const {
  createTestimoni,
  updateTestimoni,
  getTestimoni,
  deleteTestimoni,
} = require("../controllers/TestimoniControllers");

const router = express.Router();

router.post(
  "/",
  protectedRoute,
  uploadImage,
  compressAndSaveImage,
  createTestimoni
);
router.get("/", getTestimoni);
router.put(
  "/:id",
  protectedRoute,
  uploadImage,
  compressAndSaveImage,
  updateTestimoni
);
router.delete("/:id", protectedRoute, deleteTestimoni);

module.exports = router;
