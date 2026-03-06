import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, ArrowRight, Clock } from "lucide-react";

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#0f1629] rounded-2xl overflow-hidden border border-[#1d8fff]/10 hover:border-[#1d8fff]/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#1d8fff]/10"
    >
      {/* Poster Image */}
      <Link
        to={`/movie/${movie._id}`}
        className="block relative aspect-[2/3] overflow-hidden"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-[#0f1629]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Hover Book Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.div
            // initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="bg-[#1d8fff] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-xl shadow-[#1d8fff]/50 backdrop-blur-sm z-10"
          >
            <Ticket size={18} />
            <span>Book Now</span>
          </motion.div>
        </div>

        {/* Duration Badge */}
        {movie.duration && (
          <div className="absolute top-3 right-3 bg-[#0f1629]/80 backdrop-blur-md border border-[#1d8fff]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Clock size={12} className="text-[#1d8fff]" />
            <span className="text-[#EEEEEE] text-xs font-medium">
              {movie.duration}m
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <Link to={`/movie/${movie._id}`}>
          <h3 className="font-bold text-lg text-[#EEEEEE] group-hover:text-[#1d8fff] transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </Link>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5">
          {movie.genre?.slice(0, 3).map((g, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-[#1d8fff]/10 border border-[#1d8fff]/20 rounded-md text-[#1d8fff] text-xs font-medium"
            >
              {g}
            </span>
          ))}
          {movie.genre?.length > 3 && (
            <span className="px-2.5 py-1 bg-[#1d8fff]/5 border border-[#1d8fff]/10 rounded-md text-[#EEEEEE]/50 text-xs font-medium">
              +{movie.genre.length - 3}
            </span>
          )}
        </div>

        {/* View Details Link */}
        <Link
          to={`/movie/${movie._id}`}
          className="flex items-center gap-2 text-[#EEEEEE]/60 hover:text-[#1d8fff] transition-colors text-sm font-medium group/link pt-2"
        >
          <span>View Details</span>
          <ArrowRight
            size={14}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1d8fff]/5 to-transparent" />
      </div>
    </motion.div>
  );
};

export default MovieCard;