import { create } from "zustand";
import { fetchMovies, fetchMovieDetails } from "../services/api";

const useMovieStore = create((set, get) => ({
  movies: [],
  recommendedMovies: [],
  selectedMovie: null,
  loading: false,
  movieCache: {},
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

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
      const keywords = ["Avengers", "Matrix", "Harry Potter", "Star Wars", "Spider-Man"];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  
      const response = await fetchMovies(randomKeyword);
      console.log("Recommended Movies using keyword:", randomKeyword);
  
      set({ recommendedMovies: response.Search || [], loading: false });
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
      set({ recommendedMovies: [], loading: false });
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

  toggleFavorite: (movie) => {
    const favorites = get().favorites;
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  },
}));

export default useMovieStore;