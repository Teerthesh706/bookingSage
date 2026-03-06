import express from "express";
import {
  getMovies,
  getMovieById,
  getTheatersByCityAndMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/shows/by-city", getTheatersByCityAndMovie);
router.get("/:id", getMovieById);

export default router;
