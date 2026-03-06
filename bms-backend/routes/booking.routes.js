import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Booking from "../models/booking.model.js";

const router = express.Router();

// Get user bookings
router.get("/my-bookings", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "show",
      populate: ["movie", "theater"],
    })
    .sort({ createdAt: -1 });

  res.json(bookings);
});

export default router;
