import { useEffect, useState } from "react";
import API from "../apis";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await API.get("/movies");
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return movies;
};

export default useMovies;
