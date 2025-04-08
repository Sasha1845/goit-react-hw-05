import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjEyMjliOGI3MmUwYzhlZDlhNmQ4NDAxNzMwYmFhMyIsIm5iZiI6MTc0NDEwMjc0OS4zODYsInN1YiI6IjY3ZjRlNTVkMjQwZTY1OTk2ODk5MmM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLz1jyUDdvEy3gnvmU8iqytQc-_U_c4cHGpUf8dZvy8";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day?language=uk-UA");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(
      `/search/movie?query=${query}&include_adult=false&language=uk-UA&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}?language=uk-UA`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits?language=uk-UA`);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(
      `/movie/${movieId}/reviews?language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export default api;
