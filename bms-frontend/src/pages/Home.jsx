import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const movies = useMovies();

  return (
    <div className="p-10">
      <h2 className="text-2xl text-white/80 font-bold mb-6">Now Showing</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-center justify-items-center ">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
