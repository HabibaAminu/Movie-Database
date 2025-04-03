import React, { useEffect, useState } from "react";
import useMovieStore from "../store/useMovieStore";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const Home = () => {
  // To Fetch movies state from Zustand
  const { movies, fetchMovies, recommendedMovies, fetchRecommendedMovies, searchMovies, loading } = useMovieStore();
  const [query, setQuery] = useState("");

  // To Prefetch recommended movies on first load
  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies(); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) searchMovies(query);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {/* Show Recommended Movies on default if No Search */}
      {recommendedMovies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* Show Search Results */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No movies found matching your search.</p>
      )}

      {loading && <p className="text-center text-gray-500">Loading...</p>}
    </div>
  );
};

export default Home;