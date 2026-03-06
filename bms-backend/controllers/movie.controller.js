import Movie from "../models/movie.model.js";
import Show from "../models/show.model.js";
import Theater from "../models/theater.model.js";

export const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

// export const getTheatersByCityAndMovie = async (req, res) => {
//   const { movieId, city } = req.query;

//   const shows = await Show.find({ movie: movieId }).populate("theater");

//   const filteredShows = shows.filter(
//     (show) => show.theater.city.toLowerCase() === city.toLowerCase(),
//   );

//   res.json(filteredShows);
// };

// ________________________________________________________________

// export const getTheatersByCityAndMovie = async (req, res) => {
//   const { movieId, city } = req.query;

//   const shows = await Show.find({ movie: movieId }).populate({
//     path: "theater",
//     match: { city: new RegExp(`^${city}$`, "i") },
//   });

//   const filtered = shows.filter((show) => show.theater);

//   res.json(filtered);
// };

import mongoose from "mongoose";

export const getTheatersByCityAndMovie = async (req, res) => {
  try {
    const { movieId, city } = req.query;

    if (!movieId || !city) {
      return res.status(400).json({ message: "movieId and city required" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movieId" });
    }

    const shows = await Show.find({
      movie: movieId,
    }).populate("theater");

    const filtered = shows.filter(
      (show) =>
        show.theater && show.theater.city.toLowerCase() === city.toLowerCase(),
    );

    const uniqueTheaters = [];
    const seen = new Set();

    filtered.forEach((show) => {
      const id = show.theater._id.toString();
      if (!seen.has(id)) {
        seen.add(id);
        uniqueTheaters.push(show.theater);
      }
    });

    res.json(uniqueTheaters);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};