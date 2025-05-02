const express = require("express");
const { protectedRoute } = require("../middleware/protectedRoute");

const { uploadImageW, compressAndSaveImageW } = require("../lib/uploadImageW");
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
  uploadImageW,
  compressAndSaveImageW,
  createTestimoni
);
router.get("/", getTestimoni);
router.put(
  "/:id",
  protectedRoute,
  uploadImageW,
  compressAndSaveImageW,
  updateTestimoni
);
router.delete("/:id", protectedRoute, deleteTestimoni);

module.exports = router;
