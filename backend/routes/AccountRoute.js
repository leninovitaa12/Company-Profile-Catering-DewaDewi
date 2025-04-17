const express = require("express");
const { protectedRoute, checkRoot } = require("../middleware/protectedRoute");
const {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/AccountControllers");

const router = express.Router();

router.post("/", protectedRoute, checkRoot, createAccount);
router.get("/", protectedRoute, checkRoot, getAllAccounts);
router.put("/:id", protectedRoute, checkRoot, updateAccount);
router.delete("/:id", protectedRoute, checkRoot, deleteAccount);

module.exports = router;
