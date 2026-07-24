import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";
const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.post("/verify-email", verifyEmail);
router.get("/me", protect, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});
router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

export default router;
