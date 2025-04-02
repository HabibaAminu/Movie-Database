import { useState } from "react";
import useMovieStore from "../store/useMovieStore";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { movies, searchMovies, loading } = useMovieStore();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) searchMovies(query);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
