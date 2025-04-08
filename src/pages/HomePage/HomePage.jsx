"use client";

import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import "./HomePage.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Не вдалося завантажити популярні фільми");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main className="home-page">
      <h1 className="page-title">Популярні сьогодні</h1>

      {loading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && trendingMovies.length > 0 && (
        <MovieList movies={trendingMovies} />
      )}
    </main>
  );
};

export default HomePage;
