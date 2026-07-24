import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 10, // Maximum 10 requests per 15 minutes

  message: {
    message: "Too many requests. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});
