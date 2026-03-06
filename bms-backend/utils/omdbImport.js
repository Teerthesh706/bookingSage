import axios from "axios";
import Movie from "../models/movie.model.js";

export const importMoviesFromOMDB = async () => {
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: "batman", // you can change search term
      },
    });

    const movies = response.data.Search;

    const formattedMovies = movies.map((movie) => ({
      title: movie.Title,
      description: "No description available",
      poster: movie.Poster !== "N/A" ? movie.Poster : "",
      duration: movie.Runtime,
      language: movie.Langugage,
      genre: ["Action"],
      releaseDate: movie.Year[1],
    }));

    await Movie.insertMany(formattedMovies);

    console.log("Movies imported successfully!");
  } catch (error) {
    console.error("Import error:", error.message);
  }
};
