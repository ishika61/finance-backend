const router = require("express").Router();
const {
  register,
  login,
  updateStatus
} = require("../controllers/userController");

const { auth } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

// Admin only
router.patch("/:id/status", auth, authorize("admin"), updateStatus);

module.exports = router;