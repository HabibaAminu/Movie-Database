import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import useMovieStore from "../store/useMovieStore";

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useMovieStore();
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95, rotate: -1 }}
      className="relative border p-3 rounded-lg shadow-md hover:shadow-lg transition-all bg-white"
    >
      {/* Toggle Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:scale-105 transition"
        aria-label="Toggle Favorite"
      >
        {isFavorite ? (
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        ) : (
          <HeartOff className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Card Link */}
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
        <p className="text-gray-500">{movie.Year}</p>
      </Link>
    </motion.div>
  );
};

export default MovieCard;