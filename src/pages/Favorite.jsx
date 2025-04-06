import React from "react";
import useMovieStore from "../store/useMovieStore";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Favorites = () => {
  const { favorites } = useMovieStore();

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold mb-6">Your Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          >
          {favorites.map((movie) => (
            <motion.div key={movie.imdbID} variants={fadeIn}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Favorites;