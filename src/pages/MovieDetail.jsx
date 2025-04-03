import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

const MovieDetail = () => {
  const { id } = useParams();
  const { selectedMovie, getMovieDetails, loading } = useMovieStore();

  useEffect(() => {
    getMovieDetails(id);
  }, [id, getMovieDetails]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!selectedMovie)
    return <p className="text-center text-gray-500">Movie not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={selectedMovie.Poster}
          alt={selectedMovie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{selectedMovie.Title}</h1>
          <p className="text-gray-500">
            {selectedMovie.Year} • {selectedMovie.Genre}
          </p>
          <p className="mt-3 text-gray-700">{selectedMovie.Plot}</p>
          <div className="mt-4">
            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <strong>IMDb Rating:</strong> ⭐ {selectedMovie.imdbRating}
            </p>
            <button
        onClick={() => addToWatchlist(selectedMovie)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add to Watchlist
      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;