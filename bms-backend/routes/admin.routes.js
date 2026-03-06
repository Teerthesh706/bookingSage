import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  addMovie,
  addTheater,
  addShow,
  getDashboardStats,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/movie", protect, isAdmin, addMovie);
router.post("/theater", protect, isAdmin, addTheater);
router.post("/show", protect, isAdmin, addShow);
router.get("/stats", protect, isAdmin, getDashboardStats);

export default router;
