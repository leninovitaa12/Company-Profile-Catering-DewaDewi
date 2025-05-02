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

const uploadImageW = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
}).single("image");

// Fungsi untuk membuat watermark teks SVG
const generateTextWatermark = (text, width) => {
  return Buffer.from(`
    <svg width="${width}" height="100">
      <style>
        .title { fill: white; font-size: 50px; font-weight: bold; opacity: 0.5; }
      </style>
      <text x="10" y="50" class="title">${text}</text>
    </svg>
  `);
};

const compressAndSaveImageW = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const sanitizedFilename = req.file.originalname.replace(/\s+/g, "-");
    const filename = `${Date.now()}-${sanitizedFilename}.webp`;
    const filePath = path.join(__dirname, "../public/image", filename);

    // Proses gambar pertama (resize) untuk mendapatkan metadata
    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();

    // Generate watermark berdasarkan lebar gambar
    const watermark = generateTextWatermark(
      "cateringdewadewimadiun.com",
      metadata.width
    );

    // Resize + Compress + Tambah Watermark
    await image
      .resize(1200, 1200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .composite([{ input: watermark, gravity: "southeast" }]) // watermark di kanan bawah
      .toFormat("webp", { quality: 80 })
      .toFile(filePath);

    req.file.path = filePath;
    req.file.filename = filename;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImageW, compressAndSaveImageW };
