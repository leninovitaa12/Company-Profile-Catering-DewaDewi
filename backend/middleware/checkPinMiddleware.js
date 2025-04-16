const rateLimit = require("express-rate-limit");
const { Pin } = require("../models/index.js");
const { Op } = require("sequelize");

const checkPinMiddleware = async (req, res, next) => {
  const { email, pin } = req.body;

  try {
    const pinEntry = await Pin.findOne({
      where: {
        email,
        pin,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!pinEntry) {
      return res.status(400).json({ error: "Invalid or expired PIN." });
    }

    req.pinEntry = pinEntry;
    next();
  } catch (error) {
    console.error("Error verifying PIN:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const pinRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 menit
  max: 5,
  message: "Terlalu banyak percobaan, silakan coba lagi setelah 5 menit.",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({ error: options.message });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  checkPinMiddleware,
  pinRateLimiter,
};
