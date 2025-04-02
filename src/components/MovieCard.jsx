import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="border p-3 rounded-lg shadow-md hover:shadow-lg transition-all">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
      <p className="text-gray-500">{movie.Year}</p>
    </Link>
  );
};

export default MovieCard;