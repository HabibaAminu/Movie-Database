import { create } from "zustand";
import { fetchMovies, fetchMovieDetails } from "../services/api";

const useMovieStore = create((set, get) => ({
  movies: [],
  recommendedMovies: [],
  selectedMovie: null,
  loading: false,
  movieCache: {},
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],

  fetchMovies: async () => {
    try {
      const response = await fetchMovies()
      console.log("All movies:",  response);
      set({ movies: response || [] });
    } catch (error) {
      console.error("Error fetching all movies:", error);
      set({ movies: [] });
    }
  },

   // Fetch recommended movies on first load
   fetchRecommendedMovies: async () => {
    set({ loading: true });
    try {
      const response = await fetchMovies("Batman", 1); // Example: Fetch Batman movies
      console.log("Recommended Movies API Response:", response); 
      set({ recommendedMovies: response.Search || [], loading: false });
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
      set({ recommendedMovies: [], loading: false }); // Ensure fallback to empty array
    }
  },

  searchMovies: async (query) => {
    set({ loading: true });
    const results = await fetchMovies(query);
    set({ movies: results, loading: false });
  },

  getMovieDetails: async (id) => {
    if (get().movieCache[id]) {
      set({ selectedMovie: get().movieCache[id] });
      return;
    }
    set({ loading: true });
    const details = await fetchMovieDetails(id);
    set((state) => ({
      selectedMovie: details,
      loading: false,
      movieCache: { ...state.movieCache, [id]: details },
    }));
  },

  addToWatchlist: (movie) => {
    const updatedList = [...get().watchlist, movie];
    set({ watchlist: updatedList });
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  },

  removeFromWatchlist: (id) => {
    const updatedList = get().watchlist.filter((movie) => movie.imdbID !== id);
    set({ watchlist: updatedList });
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  },
}));

export default useMovieStore;