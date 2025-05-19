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

const fs = require("fs");
const path = require("path");

router.post(
  "/",
  protectedRoute,
  uploadMultipleImage,
  compressAndSaveMultipleImage,
  saveProfile
);
router.get("/", getProfile);

router.get("/logs", (req, res) => {
  const logPath = path.join(__dirname, "../public/log.json");

  if (!fs.existsSync(logPath)) {
    return res.json([]);
  }

  const logs = JSON.parse(fs.readFileSync(logPath, "utf-8"));
  res.json(logs);
});

module.exports = router;
