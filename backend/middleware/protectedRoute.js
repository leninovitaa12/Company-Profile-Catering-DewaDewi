const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

const verifyJwtToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
};

const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Akses ditolak, harap login terlebih dahulu." });
  }

  let user = await verifyJwtToken(token);

  if (!user) {
    return res
      .status(401)
      .json({ error: "Token tidak valid atau kadaluarsa." });
  }

  req.user = user;
  next();
};

const checkRoot = (req, res, next) => {
  if (req.user?.role !== "super-admin") {
    return res
      .status(403)
      .json({ error: "Akses dibatasi hanya untuk super-admin." });
  }
  next();
};

module.exports = { protectedRoute, checkRoot };
