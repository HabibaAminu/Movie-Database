import React, { useEffect, useState } from "react";
import useMovieStore from "../store/useMovieStore";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const { movies, fetchMovies, recommendedMovies, fetchRecommendedMovies, searchMovies, loading } = useMovieStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) searchMovies(query);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {recommendedMovies.length > 0 && (
        <motion.div variants={fadeIn} className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Recommended Movies</h2>
          <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerStagger}
            initial="hidden"
            animate="visible"
          >
            {recommendedMovies.map((movie) => (
              <motion.div key={movie.imdbID} variants={fadeIn}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {movies.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
          variants={containerStagger}
          initial="hidden"
          animate="visible"
        >
          {movies.map((movie) => (
            <motion.div key={movie.imdbID} variants={fadeIn}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        !loading && <p className="text-center text-gray-500 mt-6">No movies found matching your search.</p>
      )}

      {loading && (
        <motion.p
          className="text-center text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      )}
    </motion.div>
  );
};

export default Home;