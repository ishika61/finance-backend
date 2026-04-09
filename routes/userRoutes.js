const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateStatus
} = require("../controllers/userController");

const { auth } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Admin only - update user active/inactive status
router.patch("/:id/status", auth, authorize("admin"), updateStatus);

module.exports = router;