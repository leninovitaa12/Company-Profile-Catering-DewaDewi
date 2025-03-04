const express = require("express");
const { protectedRoute } = require("../middleware/protectedRoute");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const { uploadImage, compressAndSaveImage } = require("../lib/uploadImage");

const router = express.Router();

router.post(
  "/",
  protectedRoute,
  uploadImage.single("image"),
  compressAndSaveImage,
  createProduct
);
router.get("/", getProducts);
router.put(
  "/:id",
  protectedRoute,
  uploadImage.single("image"),
  compressAndSaveImage,
  updateProduct
);
router.delete("/:id", protectedRoute, deleteProduct);

module.exports = router;
