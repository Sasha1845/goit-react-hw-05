"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await searchMovies(query);

        if (moviesData.length === 0) {
          toast.error(`Нічого не знайдено за запитом "${query}"`);
        }

        setMovies(moviesData);
      } catch (error) {
        console.error("Error searching movies:", error);
        setError("Не вдалося виконати пошук фільмів");
        toast.error("Помилка при пошуку фільмів");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      toast.error("Введіть назву фільму для пошуку");
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <main className="movies-page">
      <h1 className="page-title">Пошук фільмів</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введіть назву фільму..."
        />
        <button type="submit" className="search-button">
          Пошук
        </button>
      </form>

      {loading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && query && movies.length > 0 && (
        <>
          <h2 className="results-title">Результати пошуку для "{query}"</h2>
          <MovieList movies={movies} />
        </>
      )}

      {!loading && !error && query && movies.length === 0 && (
        <div className="no-results">
          Нічого не знайдено за запитом "{query}"
        </div>
      )}
    </main>
  );
};

export default MoviesPage;
