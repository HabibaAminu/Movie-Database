import axios from "axios";
import { API_KEY, BASE_URL } from "../config";

// Fetch movies by search query
export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=74b94e8f`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
