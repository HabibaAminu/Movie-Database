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
      whileTap={{ scale: 0.97 }}
      className="relative border rounded-2xl p-3 shadow-md hover:shadow-lg transition-all bg-white"
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition z-10"
        aria-label="Toggle Favorite"
      >
        {isFavorite ? (
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        ) : (
          <HeartOff className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Movie Poster and Info */}
      <Link to={`/movie/${movie.imdbID}`}>
        <motion.img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-56 sm:h-64 object-cover rounded-xl"
          whileHover={{ scale: 1.01 }}
        />
        <h3 className="text-base sm:text-lg font-semibold mt-2 truncate">{movie.Title}</h3>
        <p className="text-gray-500 text-sm sm:text-base">{movie.Year}</p>
      </Link>
    </motion.div>
  );
};

export default MovieCard;