import Movie from "../models/movie.model.js";
import Theater from "../models/theater.model.js";
import Show from "../models/show.model.js";

// ➕ Add Movie
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie" });
  }
};

// ➕ Add Theater
export const addTheater = async (req, res) => {
  try {
    const theater = await Theater.create(req.body);
    res.status(201).json(theater);
  } catch (error) {
    res.status(500).json({ message: "Failed to add theater" });
  }
};

// ➕ Add Show
export const addShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: "Failed to add show" });
  }
};

// 📊 Dashboard Stats
export const getDashboardStats = async (req, res) => {
  const movieCount = await Movie.countDocuments();
  const theaterCount = await Theater.countDocuments();
  const showCount = await Show.countDocuments();

  res.json({
    movieCount,
    theaterCount,
    showCount,
  });
};
