const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/jpg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP are allowed."
      ),
      false
    );
  }
};

// Handle up to 4 images with specific field names
const uploadMultipleImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);

const compressAndSaveMultipleImage = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) return next();

  const allFields = ["image", "image1", "image2", "image3"];
  const outputDir = path.join(__dirname, "../public/image");

  try {
    for (const field of allFields) {
      const fileArr = req.files[field];
      if (fileArr && fileArr[0]) {
        const file = fileArr[0];
        const sanitizedFilename = file.originalname.replace(/\s+/g, "-");
        const filename = `${Date.now()}-${field}-${sanitizedFilename}.webp`;
        const filePath = path.join(outputDir, filename);

        await sharp(file.buffer)
          .resize(1200, 1200, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFormat("webp", { quality: 80 })
          .toFile(filePath);

        req.files[field][0].path = filePath;
        req.files[field][0].filename = filename;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadMultipleImage,
  compressAndSaveMultipleImage,
};
