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

const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("image");

const compressAndSaveImage = (req, res, next) => {
  if (!req.file) return next();

  const filename = `${Date.now()}-${req.file.originalname}`;

  const filePath = path.join(__dirname, "../public/image", filename);

  let image = sharp(req.file.buffer)
    .resize(1200, 1200, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("webp", { quality: 80 });
  image.toFile(filePath, (err, info) => {
    if (err) {
      return next(err);
    }
    req.file.path = filePath;
    req.file.filename = filename;
    next();
  });
};

module.exports = { uploadImage, compressAndSaveImage };
